import { db } from "@/lib/db/client"
import { components } from "@/lib/db/schema"
import { like, or } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q")?.trim()
  if (!q) return Response.json([])

  const results = await db.select().from(components).where(
    or(
      like(components.title, `%${q}%`),
      like(components.description, `%${q}%`),
      like(components.slug, `%${q}%`)
    )
  ).limit(10)

  return Response.json(results)
}
