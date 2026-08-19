import * as schema from "./schema"
import path from "path"
import fs from "fs"

// Vercel has read-only filesystem, only /tmp is writable
const isVercel = !!process.env.VERCEL
const dbPath = isVercel ? path.join("/tmp", "data.db") : path.join(process.cwd(), "data.db")

// Ensure directory exists for non-vercel case
try {
  const dir = path.dirname(dbPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
} catch (e) {
  console.warn("Could not ensure DB dir:", e)
}

function createDbInstance() {
  let sqlite: any
  try {
    const Database = require("better-sqlite3")
    sqlite = new Database(dbPath)
    try {
      sqlite.pragma("journal_mode = WAL")
    } catch {}
    console.log(`[DB] Connected to SQLite at ${dbPath}`)
  } catch (err) {
    console.error("[DB] better-sqlite3 failed at primary path, trying memory:", err)
    try {
      const Database = require("better-sqlite3")
      sqlite = new Database(":memory:")
      console.log("[DB] Using in-memory SQLite fallback")
    } catch (e2) {
      console.error("[DB] Memory fallback also failed:", e2)
      throw e2
    }
  }

  const { drizzle } = require("drizzle-orm/better-sqlite3")
  const db = drizzle(sqlite, { schema })

  // Initialize tables
  try {
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
    console.log("[DB] Tables ensured")
  } catch (e) {
    console.error("[DB] Failed to create tables:", e)
  }

  // Check if need seed
  try {
    const row = sqlite.prepare("SELECT COUNT(*) as c FROM categories").get() as any
    if (!row || row.c === 0) {
      console.log("[DB] Empty categories, scheduling seed...")
      setTimeout(() => {
        import("../seed/run").then(mm => mm.seedIfNeeded().catch(err => console.error("[DB] Seed error", err))).catch(() => {})
      }, 1000)
    }
  } catch (e) {
    console.log("[DB] Seed check failed (may be first run):", e)
  }

  return { sqlite, db }
}

// Global singleton to survive hot reload in dev and avoid multiple DB opens
const globalForDb = globalThis as unknown as { __forgeDb?: ReturnType<typeof createDbInstance> }

if (!globalForDb.__forgeDb) {
  globalForDb.__forgeDb = createDbInstance()
}

export const db = globalForDb.__forgeDb.db as any
export const sqlite = globalForDb.__forgeDb.sqlite as any

export type DB = typeof db
