import { db } from "@/lib/db/client"
import { users } from "@/lib/db/schema"
import { hashPassword } from "@/lib/auth/password"
import { signToken, COOKIE_NAME } from "@/lib/auth/jwt"
import { eq, or } from "drizzle-orm"
import { nanoid } from "nanoid"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(6)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0].message }, { status: 400 })
    }
    const { email, username, password } = parsed.data

    // Check existing
    const existing = await db.select().from(users).where(or(eq(users.email, email), eq(users.username, username))).limit(1)
    if (existing.length > 0) {
      return Response.json({ error: "Email or username already exists" }, { status: 409 })
    }

    const id = nanoid()
    const passwordHash = await hashPassword(password)
    
    // First user becomes admin if no admin exists
    const adminExists = await db.select().from(users).where(eq(users.role, "admin")).limit(1)
    const role = adminExists.length === 0 ? "admin" : "user"

    const [newUser] = await db.insert(users).values({
      id,
      email,
      username,
      passwordHash,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning()

    const token = await signToken({ userId: newUser.id, role: newUser.role as any, email: newUser.email })

    const response = Response.json({ user: { id: newUser.id, email: newUser.email, username: newUser.username, role: newUser.role }, token }, { status: 201 })
    response.headers.set("Set-Cookie", `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*7}; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`)
    return response
  } catch (e) {
    console.error(e)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
