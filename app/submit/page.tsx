"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LivePreview } from "@/components/component/live-preview"
import { toast } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/layout/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import Link from "next/link"

export default function SubmitPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    categoryId: "",
    htmlCode: `<button class="my-btn">My Awesome Button</button>`,
    cssCode: `.my-btn {
  padding: 12px 24px;
  background: #111;
  color: white;
  border: none;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.my-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
body {
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  background: #fcfcfc;
}`,
    jsCode: "",
    tags: [] as string[],
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      toast("Please login to publish your work")
      router.push("/auth/login")
    }
  }, [user, loading])

  useEffect(() => {
    fetch("/api/categories?all=true").then(r => r.json()).then(setCategories)
    fetch("/api/tags").then(r => r.json()).then(setTags)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.categoryId) {
      toast("Please select a category")
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch("/api/components", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      toast("Published! ✅ Redirecting...")
      setTimeout(() => router.push(`/components/${data.slug}`), 800)
    } catch (err: any) {
      toast(err.message)
      setSubmitting(false)
    }
  }

  if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b]">
      <Navbar user={user as any} />
      <div className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold tracking-tight leading-tight">Publish Your Work</h1>
          <p className="text-zinc-500 mt-2 max-w-2xl">Share your component with 12,000+ developers. It will be published instantly, no review needed. Your name will appear as author.</p>
          <div className="mt-4 p-3 rounded-[10px] bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 text-sm">
            💡 <b>Tip:</b> Make sure your HTML/CSS/JS works in the live preview on the right before publishing.
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_560px] gap-8 items-start">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 lg:p-8">
            <div>
              <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">Title *</label>
              <Input className="mt-2 h-11" placeholder="e.g. Glassmorphism Button" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required minLength={3} />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">Description *</label>
              <textarea required minLength={10} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe your component, how it works, where to use it..." className="mt-2 w-full min-h-[90px] rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white" />
              <div className="text-[11px] text-zinc-400 mt-1.5">{form.description.length}/10 min</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">Category *</label>
                <select required value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="mt-2 w-full h-11 rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 text-sm">
                  <option value="">Select category</option>
                  {categories.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">License</label>
                <select value="MIT" disabled className="mt-2 w-full h-11 rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-3.5 text-sm text-zinc-500">
                  <option>MIT</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">HTML Code *</label>
              <textarea value={form.htmlCode} onChange={e => setForm({ ...form, htmlCode: e.target.value })} className="mt-2 w-full min-h-[140px] rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3.5 text-[13px] font-mono leading-6 outline-none" placeholder="<div>Your HTML</div>" required />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">CSS Code *</label>
              <textarea value={form.cssCode} onChange={e => setForm({ ...form, cssCode: e.target.value })} className="mt-2 w-full min-h-[220px] rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3.5 text-[13px] font-mono leading-6 outline-none" placeholder="/* Your CSS */" required />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">JavaScript (optional)</label>
              <textarea value={form.jsCode} onChange={e => setForm({ ...form, jsCode: e.target.value })} className="mt-2 w-full min-h-[100px] rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 p-3.5 text-[13px] font-mono leading-6 outline-none" placeholder="// Optional JS" />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wide uppercase text-zinc-500">Tags</label>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t:any) => (
                  <label key={t.id} className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${form.tags.includes(t.id) ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'}`}>
                    <input type="checkbox" className="sr-only" checked={form.tags.includes(t.id)} onChange={e => setForm({ ...form, tags: e.target.checked ? [...form.tags, t.id] : form.tags.filter(x => x!==t.id) })} />
                    {t.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="outline" className="flex-1 h-12 rounded-[12px]" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={submitting} className="flex-[2] h-12 rounded-[12px] text-[15px]">{submitting ? "Publishing..." : "Publish Now →"}</Button>
            </div>

            <div className="text-[11px] text-zinc-400 text-center pt-2">By publishing, you agree your component will be public under MIT license.</div>
          </form>

          <div className="lg:sticky top-[88px] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold tracking-tight">Live Preview</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live</span>
            </div>
            <LivePreview html={form.htmlCode} css={form.cssCode} js={form.jsCode} />
            <div className="rounded-[12px] border border-dashed border-zinc-200 dark:border-zinc-800 p-4 text-xs text-zinc-500 leading-relaxed">
              Preview updates automatically as you type. If you see a blank preview, check your HTML/CSS for errors. Your component must be centered by itself, or add <code className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[11px]">body &#123; display:grid; place-items:center; min-height:100vh &#125;</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
