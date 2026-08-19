import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"
import * as schema from "./schema"
import path from "path"
import fs from "fs"

const dbPath = path.join(process.cwd(), "data.db")

// Ensure directory exists
const dir = path.dirname(dbPath)
if (!fs.existsSync(dir) && dir !== process.cwd()) {
  fs.mkdirSync(dir, { recursive: true })
}

const sqlite = new Database(dbPath)
sqlite.pragma("journal_mode = WAL")

export const db = drizzle(sqlite, { schema })

// Initialize tables manually if not exists (fallback for no migrations)
sqlite.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  avatar TEXT,
  bio TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'box',
  color TEXT NOT NULL DEFAULT '#6366f1',
  status TEXT NOT NULL DEFAULT 'active',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS components (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  html_code TEXT NOT NULL,
  css_code TEXT NOT NULL DEFAULT '',
  js_code TEXT NOT NULL DEFAULT '',
  author_id TEXT REFERENCES users(id),
  license TEXT NOT NULL DEFAULT 'MIT',
  featured INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  views INTEGER NOT NULL DEFAULT 0,
  copies INTEGER NOT NULL DEFAULT 0,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS component_tags (
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (component_id, tag_id)
);

CREATE TABLE IF NOT EXISTS likes (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, component_id)
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, component_id)
);

CREATE TABLE IF NOT EXISTS component_views (
  id TEXT PRIMARY KEY,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id),
  ip_hash TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS copies (
  id TEXT PRIMARY KEY,
  component_id TEXT NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  user_id TEXT REFERENCES users(id),
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`)

export type DB = typeof db
