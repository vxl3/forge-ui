"use client"
import { useEffect, useMemo, useState } from "react"
import { Monitor, Tablet, Smartphone, RefreshCw, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Props {
  html: string
  css: string
  js: string
  title?: string
}

export function LivePreview({ html, css, js }: Props) {
  const [mode, setMode] = useState<"desktop"|"tablet"|"mobile">("desktop")
  const [key, setKey] = useState(0)

  const srcDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<style>
*{box-sizing:border-box}
html,body{margin:0;padding:0;min-height:100vh;display:grid;place-items:center;background:#fff;font-family:system-ui,-apple-system,sans-serif}
${css}
</style>
</head>
<body>
${html}
<script>
try {
${js}
} catch(e){ console.error(e); document.body.innerHTML += '<div style=\"position:fixed;bottom:10px;left:10px;background:#fee;color:#900;padding:8px 12px;border-radius:8px;font-size:12px;font-family:monospace\">'+e.message+'</div>' }
</script>
</body>
</html>`
  }, [html, css, js, key])

  const widthMap = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  }

  return (
    <div className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-1 p-1 rounded-[10px] bg-zinc-100 dark:bg-zinc-800">
          <button onClick={() => setMode("desktop")} className={`p-2 rounded-[7px] transition-all ${mode==="desktop"?"bg-white dark:bg-zinc-700 shadow-sm":"text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}><Monitor className="w-4 h-4" /></button>
          <button onClick={() => setMode("tablet")} className={`p-2 rounded-[7px] transition-all ${mode==="tablet"?"bg-white dark:bg-zinc-700 shadow-sm":"text-zinc-500 hover:text-zinc-900"}`}><Tablet className="w-4 h-4" /></button>
          <button onClick={() => setMode("mobile")} className={`p-2 rounded-[7px] transition-all ${mode==="mobile"?"bg-white dark:bg-zinc-700 shadow-sm":"text-zinc-500 hover:text-zinc-900"}`}><Smartphone className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setKey(k => k+1)}><RefreshCw className="w-4 h-4" /></Button>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-zinc-500"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live</div>
        </div>
      </div>
      <div className="bg-[#fcfcfc] dark:bg-[#0a0a0b] p-6 flex justify-center transition-all">
        <div style={{ width: widthMap[mode] }} className="transition-all duration-300">
          <div className="rounded-[12px] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-[0_4px_24px_rgba(0,0,0,0.06)] bg-white">
            <div className="h-8 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-3 gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="ml-4 flex-1 max-w-[300px] h-5 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <iframe key={key} srcDoc={srcDoc} sandbox="allow-scripts" className="w-full h-[420px] border-0 bg-white" title="preview" />
          </div>
        </div>
      </div>
    </div>
  )
}
