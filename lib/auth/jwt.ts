import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "forge-ui-super-secret-key-change-in-prod-32chars")

export interface JWTPayload {
  userId: string
  role: "user" | "admin"
  email: string
}

export async function signToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload } as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export const COOKIE_NAME = "forge_token"
