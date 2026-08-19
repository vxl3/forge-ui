import { db } from "@/lib/db/client"
import { favorites, components, categories } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/guard"

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { componentId } = await req.json()
  if (!componentId) return Response.json({ error: "Missing id" }, { status: 400 })

  const [existing] = await db.select().from(favorites).where(and(eq(favorites.userId, user.id), eq(favorites.componentId, componentId))).limit(1)

  if (existing) {
    await db.delete(favorites).where(and(eq(favorites.userId, user.id), eq(favorites.componentId, componentId)))
    return Response.json({ favorited: false })
  } else {
    await db.insert(favorites).values({ userId: user.id, componentId, createdAt: new Date() }).onConflictDoNothing()
    return Response.json({ favorited: true })
  }
}

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const rows = await db.select({
    favorite: favorites,
    component: components,
    category: categories,
  }).from(favorites)
  .leftJoin(components, eq(favorites.componentId, components.id))
  .leftJoin(categories, eq(components.categoryId, categories.id))
  .where(eq(favorites.userId, user.id))

  return Response.json(rows.map(r => ({
    ...r.component,
    category: r.category,
    favoritedAt: r.favorite.createdAt,
  })).filter(c => c))
}
