import { db } from "@/lib/db/client"
import { likes, components } from "@/lib/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth/guard"

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { componentId } = await req.json()
  if (!componentId) return Response.json({ error: "Missing id" }, { status: 400 })

  const [existing] = await db.select().from(likes).where(and(eq(likes.userId, user.id), eq(likes.componentId, componentId))).limit(1)

  if (existing) {
    await db.delete(likes).where(and(eq(likes.userId, user.id), eq(likes.componentId, componentId)))
    await db.update(components).set({ likesCount: sql`MAX(${components.likesCount} - 1, 0)` }).where(eq(components.id, componentId))
    return Response.json({ liked: false })
  } else {
    await db.insert(likes).values({ userId: user.id, componentId, createdAt: new Date() }).onConflictDoNothing()
    await db.update(components).set({ likesCount: sql`${components.likesCount} + 1` }).where(eq(components.id, componentId))
    return Response.json({ liked: true })
  }
}

export async function GET(req: Request) {
  const user = await getCurrentUser()
  if (!user) return Response.json([])
  const { searchParams } = new URL(req.url)
  const compId = searchParams.get("componentId")
  if (compId) {
    const [like] = await db.select().from(likes).where(and(eq(likes.userId, user.id), eq(likes.componentId, compId))).limit(1)
    return Response.json({ liked: !!like })
  }
  const all = await db.select().from(likes).where(eq(likes.userId, user.id))
  return Response.json(all)
}
