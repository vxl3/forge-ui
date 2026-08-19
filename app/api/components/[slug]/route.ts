import { db, sqlite } from "@/lib/db/client"
import { components, categories, componentTags, tags, componentViews } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { nanoid } from "nanoid"

async function ensureSeeded() {
  try {
    const row = (sqlite as any).prepare("SELECT COUNT(*) as c FROM categories").get() as any
    if (!row || row.c === 0) {
      console.log("[API] DB empty, seeding now...")
      const { seedIfNeeded } = await import("@/lib/seed/run")
      await seedIfNeeded()
      console.log("[API] Seed completed")
    }
  } catch (e) {
    console.log("[API] Seed check failed", e)
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Ensure DB seeded for Vercel cold start
  await ensureSeeded()

  const [row] = await db.select({
    component: components,
    category: categories,
  }).from(components)
  .leftJoin(categories, eq(components.categoryId, categories.id))
  .where(eq(components.slug, slug))
  .limit(1)

  if (!row) {
    // Try one more time after seed
    await ensureSeeded()
    const [retry] = await db.select({
      component: components,
      category: categories,
    }).from(components)
    .leftJoin(categories, eq(components.categoryId, categories.id))
    .where(eq(components.slug, slug))
    .limit(1)
    if (!retry) return Response.json({ error: "Not found" }, { status: 404 })
    // Increment view
    db.update(components).set({ views: sql`${components.views} + 1` }).where(eq(components.id, retry.component.id)).execute().catch(()=>{})
    const compTags = await db.select({ tag: tags })
      .from(componentTags)
      .leftJoin(tags, eq(componentTags.tagId, tags.id))
      .where(eq(componentTags.componentId, retry.component.id))
    return Response.json({
      ...retry.component,
      category: retry.category,
      tags: compTags.map(ct => ct.tag).filter(Boolean)
    })
  }

  // Increment view (non-blocking)
  db.update(components).set({ views: sql`${components.views} + 1` }).where(eq(components.id, row.component.id)).execute().catch(()=>{})
  db.insert(componentViews).values({
    id: nanoid(),
    componentId: row.component.id,
    createdAt: new Date(),
  }).execute().catch(()=>{})

  const compTags = await db.select({ tag: tags })
    .from(componentTags)
    .leftJoin(tags, eq(componentTags.tagId, tags.id))
    .where(eq(componentTags.componentId, row.component.id))

  return Response.json({
    ...row.component,
    category: row.category,
    tags: compTags.map(ct => ct.tag).filter(Boolean)
  })
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { getCurrentUser } = await import("@/lib/auth/guard")
  const user = await getCurrentUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { slug } = await params
  const body = await req.json()

  const [existing] = await db.select().from(components).where(eq(components.slug, slug)).limit(1)
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 })

  if (user.role !== "admin" && existing.authorId !== user.id) {
    return Response.json({ error: "Forbidden - not owner" }, { status: 403 })
  }

  const [updated] = await db.update(components).set({
    title: body.title ?? existing.title,
    slug: body.slug ?? existing.slug,
    description: body.description ?? existing.description,
    categoryId: body.categoryId ?? existing.categoryId,
    htmlCode: body.htmlCode ?? existing.htmlCode,
    cssCode: body.cssCode ?? existing.cssCode,
    jsCode: body.jsCode ?? existing.jsCode,
    featured: user.role === "admin" ? (body.featured ?? existing.featured) : existing.featured,
    published: body.published ?? existing.published,
    updatedAt: new Date(),
  }).where(eq(components.id, existing.id)).returning()

  if (body.tags) {
    await db.delete(componentTags).where(eq(componentTags.componentId, existing.id))
    for (const tid of body.tags) {
      await db.insert(componentTags).values({ componentId: existing.id, tagId: tid }).onConflictDoNothing()
    }
  }

  return Response.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { getCurrentUser } = await import("@/lib/auth/guard")
  const user = await getCurrentUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { slug } = await params
  const [existing] = await db.select().from(components).where(eq(components.slug, slug)).limit(1)
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 })

  if (user.role !== "admin" && existing.authorId !== user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 })
  }

  await db.delete(components).where(eq(components.id, existing.id))
  return Response.json({ ok: true })
}
