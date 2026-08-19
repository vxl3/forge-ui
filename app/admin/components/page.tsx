"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminComponents() {
  const [components, setComponents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchComps = async () => {
    const res = await fetch("/api/components?limit=100&sort=latest")
    const data = await res.json()
    setComponents(data.data || [])
    setLoading(false)
  }

  useEffect(() => { fetchComps() }, [])

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete?")) return
    await fetch(`/api/components/${slug}`, { method: "DELETE" })
    fetchComps()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Components ({components.length})</h1>
        <Link href="/admin/components/new"><Button>New Component</Button></Link>
      </div>

      {loading ? <div>Loading...</div> : (
        <div className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 text-xs uppercase tracking-wide">
                <tr><th className="text-left p-3 font-medium">Title</th><th className="text-left p-3 font-medium">Category</th><th className="text-left p-3 font-medium">Views</th><th className="text-left p-3 font-medium">Likes</th><th className="text-right p-3 font-medium">Actions</th></tr>
              </thead>
              <tbody>
                {components.map((c: any) => (
                  <tr key={c.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="p-3 font-medium">{c.title}</td>
                    <td className="p-3 text-zinc-500">{c.category?.name}</td>
                    <td className="p-3">{c.views}</td>
                    <td className="p-3">{c.likesCount || c.likes_count}</td>
                    <td className="p-3 text-right flex justify-end gap-2">
                      <Link href={`/components/${c.slug}`} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs">View</Link>
                      <Link href={`/admin/components/${c.slug}/edit`} className="px-2.5 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs">Edit</Link>
                      <button onClick={() => handleDelete(c.slug)} className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
