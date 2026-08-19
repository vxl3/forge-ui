import { getCurrentUser } from "@/lib/auth/guard"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return Response.json({ user: null }, { status: 200 })
  return Response.json({ user })
}
