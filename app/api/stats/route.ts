import { db } from "@/lib/db/client"
import { components, users, likes, favorites, copies } from "@/lib/db/schema"
import { count, desc, sql } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/guard"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role !== "admin") return Response.json({ error: "Forbidden" }, { status: 403 })

  const [totalComponents] = await db.select({ count: count() }).from(components)
  const [totalUsers] = await db.select({ count: count() }).from(users)
  const [totalLikes] = await db.select({ count: count() }).from(likes)
  const [totalFavorites] = await db.select({ count: count() }).from(favorites)
  const [totalCopies] = await db.select({ count: count() }).from(copies)

  const popular = await db.select().from(components).orderBy(desc(components.views)).limit(5)
  const mostLiked = await db.select().from(components).orderBy(desc(components.likesCount)).limit(5)
  const latest = await db.select().from(components).orderBy(desc(components.createdAt)).limit(5)

  return Response.json({
    totalComponents: totalComponents.count,
    totalUsers: totalUsers.count,
    totalLikes: totalLikes.count,
    totalFavorites: totalFavorites.count,
    totalCopies: totalCopies.count,
    popular,
    mostLiked,
    latest,
  })
}
