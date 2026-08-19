"use client"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ComponentCard } from "@/components/library/component-card"
import { useAuth } from "@/components/layout/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FavoritesPage() {
  const { user, loading } = useAuth()
  const [components, setComponents] = useState<any[]>([])
  const [fetching, setFetching] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.push("/auth/login")
  }, [user, loading])

  useEffect(() => {
    if (user) {
      fetch("/api/favorites").then(r => r.json()).then(data => {
        setComponents(Array.isArray(data) ? data : [])
        setFetching(false)
      })
    }
  }, [user])

  if (loading || fetching) return <div className="min-h-screen grid place-items-center">Loading...</div>

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b]">
      <Navbar user={user as any} />
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h1 className="text-[28px] font-bold tracking-tight">Favorites</h1>
        <p className="text-zinc-500 mt-1">{components.length} saved components</p>

        {components.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-16 h-16 mx-auto rounded-[16px] bg-zinc-100 dark:bg-zinc-800 grid place-items-center mb-4">♡</div>
            <h3 className="font-semibold">No favorites yet</h3>
            <p className="text-sm text-zinc-500 mt-1">Save components you love to find them later</p>
            <Link href="/components"><Button className="mt-4">Explore Components</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {components.map((c: any) => <ComponentCard key={c.id} component={c} />)}
          </div>
        )}
      </div>
    </div>
  )
}
