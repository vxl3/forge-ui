"use client"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, RotateCcw, Download, Check } from "lucide-react"
import { toast } from "@/components/ui/toaster"

interface Props {
  initialHtml: string
  initialCss: string
  initialJs: string
  onChange?: (code: { html: string; css: string; js: string }) => void
  editable?: boolean
}

export function CodeEditor({ initialHtml, initialCss, initialJs, onChange, editable = false }: Props) {
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [js, setJs] = useState(initialJs)
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (type: "html"|"css"|"js"|"all") => {
    let text = ""
    if (type === "html") text = html
    else if (type === "css") text = css
    else if (type === "js") text = js
    else text = `${html}\n\n/* CSS */\n${css}\n\n/* JS */\n${js}`

    await navigator.clipboard.writeText(text)
    setCopied(type)
    toast("Copied!")
    setTimeout(() => setCopied(null), 1500)

    // track copy
    fetch("/api/copies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ componentId: "unknown" }) }).catch(()=>{})
  }

  const handleReset = () => {
    setHtml(initialHtml)
    setCss(initialCss)
    setJs(initialJs)
    onChange?.({ html: initialHtml, css: initialCss, js: initialJs })
  }

  const handleEdit = (type: "html"|"css"|"js", value: string) => {
    if (type === "html") { setHtml(value); onChange?.({ html: value, css, js }) }
    if (type === "css") { setCss(value); onChange?.({ html, css: value, js }) }
    if (type === "js") { setJs(value); onChange?.({ html, css, js: value }) }
  }

  const download = () => {
    const full = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`
    const blob = new Blob([full], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "component.html"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-zinc-950 overflow-hidden">
      <Tabs defaultValue="html" className="w-full">
        <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-800 bg-zinc-900">
          <TabsList className="bg-zinc-800">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm" className="h-7 text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={handleReset}><RotateCcw className="w-3.5 h-3.5 mr-1.5" />Reset</Button>
            <Button variant="ghost" size="sm" className="h-7 text-zinc-400 hover:text-white hover:bg-zinc-800" onClick={download}><Download className="w-3.5 h-3.5 mr-1.5" />Download</Button>
            <Button variant="ghost" size="sm" className="h-7 bg-white text-black hover:bg-zinc-200" onClick={() => handleCopy("all")}>Copy All</Button>
          </div>
        </div>

        {["html","css","js"].map((type) => (
          <TabsContent key={type} value={type} className="m-0">
            <div className="relative">
              <div className="absolute top-3 right-3 z-10 flex gap-1">
                <Button size="sm" variant="ghost" className="h-7 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white" onClick={() => handleCopy(type as any)}>
                  {copied === type ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="ml-1.5 hidden sm:inline">{copied === type ? "Copied" : "Copy"}</span>
                </Button>
              </div>
              {editable ? (
                <textarea
                  value={type==="html"?html:type==="css"?css:js}
                  onChange={(e) => handleEdit(type as any, e.target.value)}
                  className="w-full h-[380px] bg-zinc-950 text-zinc-100 font-mono text-[13px] leading-7 p-4 pt-12 outline-none resize-none"
                  spellCheck={false}
                />
              ) : (
                <pre className="w-full h-[380px] overflow-auto p-4 pt-12 m-0 bg-zinc-950">
                  <code className="text-[13px] leading-7 font-mono text-zinc-100 whitespace-pre-wrap break-all">
                    {type==="html"?html:type==="css"?css:js}
                  </code>
                </pre>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
