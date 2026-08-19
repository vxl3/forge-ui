import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core"
import { relations } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["user", "admin"] }).notNull().default("user"),
  avatar: text("avatar"),
  bio: text("bio"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export const categories = sqliteTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull().default(""),
  icon: text("icon").notNull().default("box"),
  color: text("color").notNull().default("#6366f1"),
  status: text("status", { enum: ["active", "hidden"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export const tags = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  color: text("color"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export const components = sqliteTable("components", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  categoryId: text("category_id").notNull().references(() => categories.id),
  htmlCode: text("html_code").notNull(),
  cssCode: text("css_code").notNull().default(""),
  jsCode: text("js_code").notNull().default(""),
  authorId: text("author_id").references(() => users.id),
  license: text("license").notNull().default("MIT"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  views: integer("views").notNull().default(0),
  copies: integer("copies").notNull().default(0),
  likesCount: integer("likes_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export const componentTags = sqliteTable("component_tags", {
  componentId: text("component_id").notNull().references(() => components.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.componentId, t.tagId] })
}))

export const likes = sqliteTable("likes", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  componentId: text("component_id").notNull().references(() => components.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.componentId] })
}))

export const favorites = sqliteTable("favorites", {
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  componentId: text("component_id").notNull().references(() => components.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.componentId] })
}))

export const componentViews = sqliteTable("component_views", {
  id: text("id").primaryKey(),
  componentId: text("component_id").notNull().references(() => components.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id),
  ipHash: text("ip_hash"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export const copies = sqliteTable("copies", {
  id: text("id").primaryKey(),
  componentId: text("component_id").notNull().references(() => components.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
})

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
})

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  components: many(components)
}))

export const componentsRelations = relations(components, ({ one, many }) => ({
  category: one(categories, { fields: [components.categoryId], references: [categories.id] }),
  author: one(users, { fields: [components.authorId], references: [users.id] }),
  componentTags: many(componentTags),
  likes: many(likes),
  favorites: many(favorites),
}))

export const componentTagsRelations = relations(componentTags, ({ one }) => ({
  component: one(components, { fields: [componentTags.componentId], references: [components.id] }),
  tag: one(tags, { fields: [componentTags.tagId], references: [tags.id] }),
}))

export type User = typeof users.$inferSelect
export type Category = typeof categories.$inferSelect
export type Tag = typeof tags.$inferSelect
export type Component = typeof components.$inferSelect
