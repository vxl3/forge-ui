"use client"
import Link from "next/link"
import { Heart, Eye, Copy, Star, Code2 } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/toaster"

interface CardProps {
  component: any
  onLike?: (id: string) => void
  liked?: boolean
}

function buildSrcDoc(comp: any) {
  return `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;min-height:100vh;display:grid;place-items:center;background:${comp.category?.slug === 'feedback' || comp.category?.slug === 'cards' ? '#fcfcfc' : '#fff'}; } *{box-sizing:border-box} ${comp.cssCode || comp.css_code || ''}</style></head><body>${comp.htmlCode || comp.html_code || ''}<script>try{${comp.jsCode || comp.js_code || ''}}catch(e){}</script></html>`
}

export function ComponentCard({ component, onLike, liked }: CardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const code = `${component.htmlCode || component.html_code}\n\n/* CSS */\n${component.cssCode || component.css_code}\n\n/* JS */\n${component.jsCode || component.js_code}`
    await navigator.clipboard.writeText(code)
    toast("Copied to clipboard")
    fetch("/api/copies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ componentId: component.id }) }).catch(()=>{})
  }

  return (
    <Link href={`/components/${component.slug}`} className="group block">
      <div className="relative rounded-[16px] border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1">
        {/* Preview */}
        <div className="relative aspect-[4/3] bg-[#fcfcfc] dark:bg-[#111] overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
          </div>
          <div className="absolute top-3 right-3 z-10 flex gap-1.5">
            {component.featured && <span className="px-2 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-semibold tracking-wide flex items-center gap-1"><Star className="w-3 h-3" /> FEATURED</span>}
          </div>
          <iframe
            srcDoc={buildSrcDoc(component)}
            sandbox="allow-scripts"
            loading="lazy"
            className="w-full h-full border-0 scale-[0.9] origin-center transition-transform group-hover:scale-[0.92]"
            onLoad={() => setIframeLoaded(true)}
            title={component.title}
          />
          {!iframeLoaded && <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 animate-pulse" />}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-[550] text-[14px] leading-tight truncate tracking-tight">{component.title}</h3>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-[1.4]">{component.description}</p>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 w-8 h-8 rounded-[8px] bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 flex items-center justify-center transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium">
                <Code2 className="w-3 h-3" />
                {component.category?.name || "Component"}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-zinc-500">
                <Eye className="w-3 h-3" /> {component.views || 0}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-zinc-400"}`} />
              <span className="text-[11px] text-zinc-500">{component.likesCount || component.likes_count || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
