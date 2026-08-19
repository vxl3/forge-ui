import { cookies } from "next/headers"
import { verifyToken, COOKIE_NAME } from "./jwt"
import { db } from "../db/client"
import { users } from "../db/schema"
import { eq } from "drizzle-orm"

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  const payload = await verifyToken(token)
  if (!payload) return null
  
  const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1)
  if (!user) return null
  
  const { passwordHash, ...safeUser } = user
  return { ...safeUser, role: payload.role as "user" | "admin" }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  return user
}

export async function requireAdmin() {
  const user = await getCurrentUser()
  if (!user || user.role !== "admin") throw new Error("Forbidden")
  return user
}
