import { db } from "@/lib/db/client"
import { components, categories, componentTags, tags, componentViews, users } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { nanoid } from "nanoid"

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  const [row] = await db.select({
    component: components,
    category: categories,
  }).from(components)
  .leftJoin(categories, eq(components.categoryId, categories.id))
  .where(eq(components.slug, slug))
  .limit(1)

  if (!row) return Response.json({ error: "Not found" }, { status: 404 })

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
  if (!user || user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 })

  const { slug } = await params
  const body = await req.json()

  const [existing] = await db.select().from(components).where(eq(components.slug, slug)).limit(1)
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 })

  const [updated] = await db.update(components).set({
    title: body.title ?? existing.title,
    slug: body.slug ?? existing.slug,
    description: body.description ?? existing.description,
    categoryId: body.categoryId ?? existing.categoryId,
    htmlCode: body.htmlCode ?? existing.htmlCode,
    cssCode: body.cssCode ?? existing.cssCode,
    jsCode: body.jsCode ?? existing.jsCode,
    featured: body.featured ?? existing.featured,
    published: body.published ?? existing.published,
    updatedAt: new Date(),
  }).where(eq(components.id, existing.id)).returning()

  // Update tags if provided
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
  if (!user || user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 })

  const { slug } = await params
  const [existing] = await db.select().from(components).where(eq(components.slug, slug)).limit(1)
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 })

  await db.delete(components).where(eq(components.id, existing.id))
  return Response.json({ ok: true })
}
