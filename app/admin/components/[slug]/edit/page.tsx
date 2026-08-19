"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LivePreview } from "@/components/component/live-preview"
import { toast } from "@/components/ui/toaster"
import { useParams, useRouter } from "next/navigation"

export default function EditComponentPage() {
  const params = useParams()
  const slug = params.slug as string
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [form, setForm] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/categories?all=true").then(r => r.json()).then(setCategories)
    fetch("/api/tags").then(r => r.json()).then(setTags)
    fetch(`/api/components/${slug}`).then(r => r.json()).then((data) => {
      setForm({
        title: data.title,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId || data.category_id,
        htmlCode: data.htmlCode || data.html_code,
        cssCode: data.cssCode || data.css_code,
        jsCode: data.jsCode || data.js_code,
        featured: data.featured,
        published: data.published,
        tags: data.tags?.map((t:any)=>t.id) || [],
      })
    })
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`/api/components/${slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    if (res.ok) {
      toast("Updated!")
      router.push("/admin/components")
    } else {
      const d = await res.json()
      toast(d.error || "Failed")
    }
  }

  if (!form) return <div>Loading...</div>

  return (
    <div className="max-w-[1200px]">
      <h1 className="text-2xl font-bold mb-6">Edit: {form.title}</h1>
      <div className="grid lg:grid-cols-[1fr_520px] gap-8">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-[16px] border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900">
          <div><label className="text-xs font-medium">Title</label><Input value={form.title} onChange={e => setForm({ ...form, title:e.target.value })} /></div>
          <div><label className="text-xs font-medium">Slug</label><Input value={form.slug} onChange={e => setForm({ ...form, slug:e.target.value })} /></div>
          <div><label className="text-xs font-medium">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description:e.target.value })} className="w-full min-h-[80px] rounded-[10px] border p-3 text-sm" /></div>
          <div>
            <label className="text-xs font-medium">Category</label>
            <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId:e.target.value })} className="w-full h-10 rounded-[10px] border px-3 text-sm mt-1">
              {categories.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-medium">HTML</label><textarea value={form.htmlCode} onChange={e => setForm({ ...form, htmlCode:e.target.value })} className="w-full min-h-[120px] rounded-[10px] border bg-zinc-950 text-zinc-100 p-3 text-sm font-mono mt-1" /></div>
          <div><label className="text-xs font-medium">CSS</label><textarea value={form.cssCode} onChange={e => setForm({ ...form, cssCode:e.target.value })} className="w-full min-h-[200px] rounded-[10px] border bg-zinc-950 text-zinc-100 p-3 text-sm font-mono mt-1" /></div>
          <div><label className="text-xs font-medium">JS</label><textarea value={form.jsCode} onChange={e => setForm({ ...form, jsCode:e.target.value })} className="w-full min-h-[100px] rounded-[10px] border bg-zinc-950 text-zinc-100 p-3 text-sm font-mono mt-1" /></div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((t:any) => (
              <label key={t.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border bg-zinc-50 dark:bg-zinc-800">
                <input type="checkbox" checked={form.tags.includes(t.id)} onChange={e => setForm({ ...form, tags: e.target.checked ? [...form.tags, t.id] : form.tags.filter((x:string)=>x!==t.id) })} />
                {t.name}
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.featured} onChange={e => setForm({ ...form, featured:e.target.checked })} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.published} onChange={e => setForm({ ...form, published:e.target.checked })} /> Published</label>
          <Button type="submit" className="w-full">Update Component</Button>
        </form>
        <div className="lg:sticky top-8 h-fit">
          <h3 className="font-medium mb-3">Live Preview</h3>
          <LivePreview html={form.htmlCode} css={form.cssCode} js={form.jsCode} />
        </div>
      </div>
    </div>
  )
}
