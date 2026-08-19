"use client"
import { createContext, useContext, useEffect, useState } from "react"

type User = { id: string; email: string; username: string; role: string } | null

const AuthContext = createContext<{ user: User; loading: boolean; refresh: () => Promise<void> }>({
  user: null, loading: true, refresh: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    try {
      const res = await fetch("/api/auth/me")
      const data = await res.json()
      setUser(data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  return <AuthContext.Provider value={{ user, loading, refresh }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
