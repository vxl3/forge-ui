import { db } from "@/lib/db/client"
import { copies, components } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { nanoid } from "nanoid"
import { getCurrentUser } from "@/lib/auth/guard"

export async function POST(req: Request) {
  const { componentId } = await req.json()
  if (!componentId) return Response.json({ error: "Missing" }, { status: 400 })

  const user = await getCurrentUser()

  await db.insert(copies).values({
    id: nanoid(),
    componentId,
    userId: user?.id || null,
    createdAt: new Date(),
  })

  await db.update(components).set({ copies: sql`${components.copies} + 1` }).where(eq(components.id, componentId))

  return Response.json({ ok: true })
}
