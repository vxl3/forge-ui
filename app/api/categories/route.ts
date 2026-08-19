import { db } from "@/lib/db/client"
import { categories } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const onlyActive = searchParams.get("all") !== "true"

  let cats
  if (onlyActive) {
    cats = await db.select().from(categories).where(eq(categories.status, "active"))
  } else {
    cats = await db.select().from(categories)
  }
  return Response.json(cats)
}
