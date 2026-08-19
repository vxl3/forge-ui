import { db } from "@/lib/db/client"
import { users } from "@/lib/db/schema"
import { comparePassword } from "@/lib/auth/password"
import { signToken, COOKIE_NAME } from "@/lib/auth/jwt"
import { eq, or } from "drizzle-orm"
import { z } from "zod"

const schema = z.object({
  emailOrUsername: z.string().min(1),
  password: z.string().min(1)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) return Response.json({ error: "Invalid input" }, { status: 400 })

    const { emailOrUsername, password } = parsed.data
    const isEmail = emailOrUsername.includes("@")

    const [user] = await db.select().from(users).where(isEmail ? eq(users.email, emailOrUsername) : eq(users.username, emailOrUsername)).limit(1)
    if (!user) return Response.json({ error: "Invalid credentials" }, { status: 401 })

    const valid = await comparePassword(password, user.passwordHash)
    if (!valid) return Response.json({ error: "Invalid credentials" }, { status: 401 })

    const token = await signToken({ userId: user.id, role: user.role as any, email: user.email })

    const response = Response.json({ user: { id: user.id, email: user.email, username: user.username, role: user.role } })
    response.headers.set("Set-Cookie", `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*7}; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`)
    return response
  } catch (e) {
    console.error(e)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}
