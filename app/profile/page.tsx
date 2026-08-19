"use client"
import { useAuth } from "@/components/layout/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({ likes: 0, favorites: 0 })

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading])

  useEffect(() => {
    if (user) {
      Promise.all([fetch("/api/likes").then(r => r.json()), fetch("/api/favorites").then(r => r.json())]).then(([likes, favs]) => {
        setStats({ likes: Array.isArray(likes) ? likes.length : 0, favorites: Array.isArray(favs) ? favs.length : 0 })
      })
    }
  }, [user])

  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b]">
      <Navbar user={user as any} />
      <div className="mx-auto max-w-[800px] px-6 py-12">
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 grid place-items-center text-white font-bold text-xl">{user.username[0]?.toUpperCase()}</div>
            <div>
              <h1 className="text-[22px] font-semibold tracking-tight">{user.username}</h1>
              <p className="text-sm text-zinc-500">{user.email}</p>
              <span className="inline-flex mt-2 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium">{user.role}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/50"><div className="text-2xl font-bold">{stats.likes}</div><div className="text-xs text-zinc-500 uppercase tracking-wide">Likes</div></div>
            <div className="p-4 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/50"><div className="text-2xl font-bold">{stats.favorites}</div><div className="text-xs text-zinc-500 uppercase tracking-wide">Favorites</div></div>
            <div className="p-4 rounded-[12px] bg-zinc-50 dark:bg-zinc-800/50"><div className="text-2xl font-bold">0</div><div className="text-xs text-zinc-500 uppercase tracking-wide">Components</div></div>
          </div>

          <div className="mt-8 flex gap-2">
            <Button variant="outline" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/") }}>Logout</Button>
            {user.role === "admin" && <Button onClick={() => router.push("/admin")}>Admin Dashboard</Button>}
          </div>
        </div>
      </div>
    </div>
  )
}
