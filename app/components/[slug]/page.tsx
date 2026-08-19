import { db } from "@/lib/db/client"
import { components, categories, componentTags, tags } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { ComponentDetail } from "./detail-client"
import { getCurrentUser } from "@/lib/auth/guard"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [row] = await db.select().from(components).where(eq(components.slug, slug)).limit(1)
  if (!row) return { title: "Not found" }
  return {
    title: `${row.title} — ForgeUI`,
    description: row.description,
  }
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
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

  // Check if liked/favorited (if user exists, we can fetch)
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
