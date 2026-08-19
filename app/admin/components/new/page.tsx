"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LivePreview } from "@/components/component/live-preview"
import { toast } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"

export default function NewComponentPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    categoryId: "",
    htmlCode: "<button>New Button</button>",
    cssCode: "button{padding:12px 24px; background:#111; color:white; border-radius:10px; border:none; font-weight:500;}",
    jsCode: "",
    featured: false,
    tags: [] as string[],
  })
  const router = useRouter()

  useEffect(() => {
    fetch("/api/categories?all=true").then(r => r.json()).then(setCategories)
    fetch("/api/tags").then(r => r.json()).then(setTags)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/components", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    if (res.ok) {
      toast("Component created!")
      router.push("/admin/components")
    } else {
      const d = await res.json()
      toast(d.error || "Failed")
    }
  }

  return (
    <div className="max-w-[1200px]">
      <h1 className="text-2xl font-bold mb-6">New Component</h1>
      <div className="grid lg:grid-cols-[1fr_520px] gap-8">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-[16px] border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900">
          <div><label className="text-xs font-medium">Title</label><Input value={form.title} onChange={e => { const t=e.target.value; setForm({ ...form, title:t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') }) }} required /></div>
          <div><label className="text-xs font-medium">Slug</label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required /></div>
          <div><label className="text-xs font-medium">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full min-h-[80px] rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-sm" required /></div>
          <div>
            <label className="text-xs font-medium">Category</label>
            <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full h-10 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm mt-1" required>
              <option value="">Select</option>
              {categories.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-medium">HTML</label><textarea value={form.htmlCode} onChange={e => setForm({ ...form, htmlCode: e.target.value })} className="w-full min-h-[120px] rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3 text-sm font-mono mt-1" /></div>
          <div><label className="text-xs font-medium">CSS</label><textarea value={form.cssCode} onChange={e => setForm({ ...form, cssCode: e.target.value })} className="w-full min-h-[200px] rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3 text-sm font-mono mt-1" /></div>
          <div><label className="text-xs font-medium">JS</label><textarea value={form.jsCode} onChange={e => setForm({ ...form, jsCode: e.target.value })} className="w-full min-h-[100px] rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3 text-sm font-mono mt-1" /></div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((t:any) => (
              <label key={t.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border bg-zinc-50 dark:bg-zinc-800">
                <input type="checkbox" checked={form.tags.includes(t.id)} onChange={e => setForm({ ...form, tags: e.target.checked ? [...form.tags, t.id] : form.tags.filter(x => x!==t.id) })} />
                {t.name}
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          <Button type="submit" className="w-full">Create Component</Button>
        </form>

        <div className="lg:sticky top-8 h-fit">
          <h3 className="font-medium mb-3">Live Preview</h3>
          <LivePreview html={form.htmlCode} css={form.cssCode} js={form.jsCode} />
        </div>
      </div>
    </div>
  )
}
