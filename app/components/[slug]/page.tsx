import { db, sqlite } from "@/lib/db/client"
import { components, categories, componentTags, tags } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { ComponentDetail } from "./detail-client"
import { getCurrentUser } from "@/lib/auth/guard"

async function ensureSeeded() {
  try {
    const row = (sqlite as any).prepare("SELECT COUNT(*) as c FROM categories").get() as any
    if (!row || row.c === 0) {
      const { seedIfNeeded } = await import("@/lib/seed/run")
      await seedIfNeeded()
    }
  } catch {}
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    await ensureSeeded()
    const [row] = await db.select().from(components).where(eq(components.slug, slug)).limit(1)
    if (!row) return { title: "Not found" }
    return {
      title: `${row.title} — ForgeUI`,
      description: row.description,
    }
  } catch {
    return { title: "ForgeUI" }
  }
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  await ensureSeeded()

  const [row] = await db.select({
    component: components,
    category: categories,
  }).from(components)
  .leftJoin(categories, eq(components.categoryId, categories.id))
  .where(eq(components.slug, slug))
  .limit(1)

  if (!row) notFound()

  const compTags = await db.select({ tag: tags })
    .from(componentTags)
    .leftJoin(tags, eq(componentTags.tagId, tags.id))
    .where(eq(componentTags.componentId, row.component.id))

  const user = await getCurrentUser()

  let liked = false
  let favorited = false
  if (user) {
    const { likes, favorites } = await import("@/lib/db/schema")
    const { and } = await import("drizzle-orm")
    const [likeRow] = await db.select().from(likes).where(and(eq(likes.userId, user.id), eq(likes.componentId, row.component.id))).limit(1)
    const [favRow] = await db.select().from(favorites).where(and(eq(favorites.userId, user.id), eq(favorites.componentId, row.component.id))).limit(1)
    liked = !!likeRow
    favorited = !!favRow
  }

  return <ComponentDetail component={{ ...row.component, category: row.category, tags: compTags.map(ct => ct.tag).filter(Boolean) }} initialLiked={liked} initialFavorited={favorited} user={user as any} />
}
