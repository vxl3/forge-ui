import { db } from "@/lib/db/client"
import { tags } from "@/lib/db/schema"

export async function GET() {
  const allTags = await db.select().from(tags)
  return Response.json(allTags)
}
