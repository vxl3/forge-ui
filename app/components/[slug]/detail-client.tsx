"use client"
import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { LivePreview } from "@/components/component/live-preview"
import { CodeEditor } from "@/components/component/code-editor"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark, Share2, Eye, Copy, Code2, Sparkles } from "lucide-react"
import { toast } from "@/components/ui/toaster"
import { useRouter } from "next/navigation"

interface Props {
  component: any
  initialLiked: boolean
  initialFavorited: boolean
  user: any
}

export function ComponentDetail({ component, initialLiked, initialFavorited, user }: Props) {
  const [liked, setLiked] = useState(initialLiked)
  const [favorited, setFavorited] = useState(initialFavorited)
  const [likesCount, setLikesCount] = useState(component.likesCount || component.likes_count || 0)
  const [editable, setEditable] = useState(false)
  const [code, setCode] = useState({
    html: component.htmlCode || component.html_code,
    css: component.cssCode || component.css_code,
    js: component.jsCode || component.js_code,
  })
  const router = useRouter()

  const handleLike = async () => {
    if (!user) {
      toast("Please login to like")
      router.push("/auth/login")
      return
    }
    const newLiked = !liked
    setLiked(newLiked)
    setLikesCount((c: number) => newLiked ? c + 1 : Math.max(0, c - 1))
    const res = await fetch("/api/likes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ componentId: component.id }) })
    if (!res.ok) {
      setLiked(!newLiked)
      setLikesCount((c: number) => !newLiked ? c + 1 : Math.max(0, c - 1))
    }
  }

  const handleFavorite = async () => {
    if (!user) {
      toast("Please login to save")
      router.push("/auth/login")
      return
    }
    const newFav = !favorited
    setFavorited(newFav)
    toast(newFav ? "Added to favorites" : "Removed from favorites")
    await fetch("/api/favorites", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ componentId: component.id }) })
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/components/${component.slug}`
    await navigator.clipboard.writeText(url)
    toast("Link copied to clipboard")
  }

  const handleCopy = async () => {
    const full = `${code.html}\n\n/* CSS */\n${code.css}\n\n/* JS */\n${code.js}`
    await navigator.clipboard.writeText(full)
    toast("Code copied!")
    fetch("/api/copies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ componentId: component.id }) }).catch(()=>{})
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b]">
      <Navbar user={user} />
      <div className="mx-auto max-w-[1440px] px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-medium flex items-center gap-1.5"><Code2 className="w-3 h-3" />{component.category?.name}</span>
              {component.featured && <span className="px-2.5 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold flex items-center gap-1"><Sparkles className="w-3 h-3" /> Featured</span>}
              <span className="flex items-center gap-1 text-xs text-zinc-500"><Eye className="w-3.5 h-3.5" />{component.views} views</span>
            </div>
            <h1 className="text-[32px] font-bold tracking-tight leading-tight">{component.title}</h1>
            <p className="mt-3 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">{component.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {component.tags?.map((t: any) => (
                <span key={t.id} className="px-2.5 py-1 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">{t.name}</span>
              ))}
            </div>
          </div>

          <div className="flex lg:flex-col gap-2 lg:w-[280px] shrink-0">
            <Button onClick={handleCopy} className="flex-1 lg:w-full h-11 rounded-[12px]"><Copy className="w-4 h-4 mr-2" />Copy Code</Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 h-11 rounded-[12px]" onClick={handleLike}>
                <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-red-500 text-red-500" : ""}`} />{likesCount}
              </Button>
              <Button variant="outline" className="flex-1 h-11 rounded-[12px]" onClick={handleFavorite}>
                <Bookmark className={`w-4 h-4 mr-2 ${favorited ? "fill-zinc-900 dark:fill-white" : ""}`} />{favorited ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-[12px]" onClick={handleShare}><Share2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <LivePreview html={code.html} css={code.css} js={code.js} />

        {/* Editor */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold tracking-tight">Code</h2>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={editable} onChange={(e) => setEditable(e.target.checked)} className="rounded" />
                Live Edit
              </label>
            </div>
          </div>
          <CodeEditor initialHtml={code.html} initialCss={code.css} initialJs={code.js} onChange={setCode} editable={editable} />
        </div>

        {/* Related - placeholder */}
        <div className="mt-12 p-6 rounded-[16px] border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-sm text-zinc-500">More components in <b className="text-zinc-900 dark:text-white">{component.category?.name}</b> category coming soon</p>
        </div>
      </div>
    </div>
  )
}
