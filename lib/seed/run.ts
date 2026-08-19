import { db } from "../db/client"
import { categories, tags, components, componentTags, users } from "../db/schema"
import { categoriesSeed, tagsSeed, componentsSeed } from "./data"
import { nanoid } from "nanoid"
import { hashPassword } from "../auth/password"
import { eq } from "drizzle-orm"

export async function seedIfNeeded() {
  try {
    const existingCats = await db.select().from(categories).limit(1)
    if (existingCats.length > 0) {
      console.log("DB already seeded, skipping")
      return
    }

    console.log("🌱 Seeding database...")

    // Seed admin user
    const adminId = nanoid()
    const adminEmail = process.env.ADMIN_EMAIL || "admin@forgeui.com"
    const adminPass = process.env.ADMIN_PASSWORD || "admin123"

    const [existingAdmin] = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1)
    let adminUserId = adminId
    if (!existingAdmin) {
      const hash = await hashPassword(adminPass)
      await db.insert(users).values({
        id: adminId,
        email: adminEmail,
        username: "admin",
        passwordHash: hash,
        role: "admin",
        bio: "ForgeUI Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`👑 Admin created: ${adminEmail} / ${adminPass}`)
    } else {
      adminUserId = existingAdmin.id
    }

    // Categories
    for (const cat of categoriesSeed) {
      await db.insert(categories).values({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        color: cat.color,
        status: "active",
        createdAt: new Date(),
      }).onConflictDoNothing()
    }

    // Tags
    for (const t of tagsSeed) {
      await db.insert(tags).values({
        id: t.id,
        name: t.name,
        slug: t.slug,
        color: (t as any).color || null,
        createdAt: new Date(),
      }).onConflictDoNothing()
    }

    // Components
    for (const comp of componentsSeed) {
      const id = nanoid()
      await db.insert(components).values({
        id,
        title: comp.title,
        slug: comp.slug,
        description: comp.description,
        categoryId: comp.categoryId,
        htmlCode: comp.html,
        cssCode: comp.css,
        jsCode: comp.js,
        authorId: adminUserId,
        license: "MIT",
        featured: comp.featured ? true : false,
        published: true,
        views: Math.floor(Math.random() * 5000) + 100,
        copies: Math.floor(Math.random() * 800) + 10,
        likesCount: Math.floor(Math.random() * 300) + 5,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
        updatedAt: new Date(),
      }).onConflictDoNothing()

      // Tags links - need to get id after insert. Since id is random, we just inserted, we need to query?
      // Simpler: use slug to find
      const inserted = await db.select().from(components).where(eq(components.slug, comp.slug)).limit(1)
      if (inserted.length > 0) {
        for (const tagSlug of comp.tags) {
          const [tagRow] = await db.select().from(tags).where(eq(tags.id, tagSlug)).limit(1)
          if (tagRow) {
            await db.insert(componentTags).values({
              componentId: inserted[0].id,
              tagId: tagRow.id,
            }).onConflictDoNothing()
          }
        }
      }
    }

    console.log("✅ Seeding completed: ", componentsSeed.length, "components")
  } catch (e) {
    console.error("Seed error", e)
  }
}
