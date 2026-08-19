import { db, sqlite } from "@/lib/db/client"
import { components, categories, componentTags, tags } from "@/lib/db/schema"
import { eq, desc, like, or, and, sql } from "drizzle-orm"
import { z } from "zod"

async function ensureSeeded() {
  try {
    const row = (sqlite as any).prepare("SELECT COUNT(*) as c FROM categories").get() as any
    if (!row || row.c === 0) {
      console.log("[API] DB empty in /api/components, seeding...")
      const { seedIfNeeded } = await import("@/lib/seed/run")
      await seedIfNeeded()
      console.log("[API] Seed done for /api/components")
    }
  } catch (e) {
    console.log("[API] Seed check error", e)
  }
}

export async function GET(req: Request) {
  await ensureSeeded()

  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search")?.trim()
  const category = searchParams.get("category")
  const tag = searchParams.get("tag")
  const sort = searchParams.get("sort") || "latest"
  const featured = searchParams.get("featured")
  const page = parseInt(searchParams.get("page") || "1")
  const limit = Math.min(parseInt(searchParams.get("limit") || "24"), 100)
  const offset = (page - 1) * limit

  let query = db.select({
    component: components,
    category: categories,
  }).from(components)
  .leftJoin(categories, eq(components.categoryId, categories.id))
  .$dynamic()

  let conditions: any[] = [eq(components.published, true)]

  if (search) {
    conditions.push(
      or(
        like(components.title, `%${search}%`),
        like(components.description, `%${search}%`),
        like(components.slug, `%${search}%`)
      )
    )
  }

  if (category && category !== "all") {
    conditions.push(eq(categories.slug, category))
  }

  if (featured === "true") {
    conditions.push(eq(components.featured, true))
  }

  let orderBy
  switch (sort) {
    case "popular":
      orderBy = desc(components.views)
      break
    case "most-liked":
      orderBy = desc(components.likesCount)
      break
    case "most-copied":
      orderBy = desc(components.copies)
      break
    case "trending":
      orderBy = desc(sql`${components.views} + ${components.likesCount} * 5`)
      break
    default:
      orderBy = desc(components.createdAt)
  }

  const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0]

  const results = await (query as any)
    .where(whereClause)
    .orderBy(orderBy)
    .limit(limit)
    .offset(offset)

  let filtered = results
  if (tag) {
    const tagged = await db.select({ compId: componentTags.componentId })
      .from(componentTags)
      .leftJoin(tags, eq(componentTags.tagId, tags.id))
      .where(eq(tags.slug, tag))
    const ids = new Set(tagged.map((t: any) => t.compId))
    filtered = results.filter((r: any) => ids.has(r.component.id))
  }

  const enriched = await Promise.all(filtered.map(async (row: any) => {
    const compTags = await db.select({ tag: tags })
      .from(componentTags)
      .leftJoin(tags, eq(componentTags.tagId, tags.id))
      .where(eq(componentTags.componentId, row.component.id))
    return {
      ...row.component,
      category: row.category,
      tags: compTags.map((ct: any) => ct.tag).filter(Boolean),
    }
  }))

  return Response.json({
    data: enriched,
    pagination: { page, limit, hasMore: results.length === limit }
  })
}

const componentSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  description: z.string().min(10),
  categoryId: z.string(),
  htmlCode: z.string().min(1),
  cssCode: z.string().optional().default(""),
  jsCode: z.string().optional().default(""),
  license: z.string().optional().default("MIT"),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  tags: z.array(z.string()).optional().default([]),
})

export async function POST(req: Request) {
  try {
    const { getCurrentUser } = await import("@/lib/auth/guard")
    const user = await getCurrentUser()
    if (!user) return Response.json({ error: "Please login to publish" }, { status: 401 })

    const body = await req.json()
    const parsed = componentSchema.safeParse(body)
    if (!parsed.success) return Response.json({ error: parsed.error.issues[0].message }, { status: 400 })

    const { tags: tagIds, ...rest } = parsed.data
    const { nanoid } = await import("nanoid")
    const id = nanoid()

    const baseSlug = rest.slug.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || rest.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
    const finalSlug = `${baseSlug}-${nanoid(4).toLowerCase()}`

    const [comp] = await db.insert(components).values({
      id,
      title: rest.title,
      slug: finalSlug,
      description: rest.description,
      categoryId: rest.categoryId,
      htmlCode: rest.htmlCode,
      cssCode: rest.cssCode || "",
      jsCode: rest.jsCode || "",
      authorId: user.id,
      license: rest.license,
      featured: user.role === "admin" ? (rest.featured || false) : false,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    if (tagIds && tagIds.length > 0) {
      for (const tid of tagIds) {
        await db.insert(componentTags).values({ componentId: id, tagId: tid }).onConflictDoNothing()
      }
    }

    return Response.json(comp, { status: 201 })
  } catch (e: any) {
    console.error("POST /api/components error", e)
    if (e.message?.includes("UNIQUE constraint")) {
      return Response.json({ error: "Slug already exists, try different title" }, { status: 409 })
    }
    return Response.json({ error: "Server error: " + e.message }, { status: 500 })
  }
}
