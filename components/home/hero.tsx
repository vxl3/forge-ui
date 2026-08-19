"use client"
import { Button } from "@/components/ui/button"
import { Search, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useUIStore } from "@/lib/store/ui-store"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Hero() {
  const { searchQuery, setSearchQuery, lang } = useUIStore()
  const router = useRouter()
  const [local, setLocal] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = local || searchQuery
    if (q.trim()) {
      setSearchQuery(q.trim())
      router.push(`/components?search=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#fcfcfc] dark:bg-[#0a0a0b]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-violet-100/60 via-indigo-50/30 to-transparent dark:from-violet-950/20 dark:via-indigo-950/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-24 md:py-36 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium tracking-wide mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          New: 65+ premium components added
          <ArrowRight className="w-3 h-3 opacity-60" />
        </div>

        <h1 className="text-[40px] md:text-[72px] font-[700] leading-[0.9] tracking-[-0.04em] max-w-[900px]">
          Build beautiful
          <span className="relative inline-block mx-3">
            <span className="relative z-10 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">interfaces</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-200 to-indigo-200 dark:from-violet-900/30 dark:to-indigo-900/30 blur-2xl" />
          </span>
          faster.
        </h1>

        <p className="mt-6 text-[17px] md:text-[18px] leading-7 text-zinc-500 dark:text-zinc-400 max-w-[560px] font-[400]">
          A premium library of production-ready UI components, crafted for modern developers. Copy, customize, ship.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-[640px] mt-10 relative group">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
            <input
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Search components, effects, animations..."
              className="w-full h-[56px] pl-12 pr-[140px] rounded-[14px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent text-[15px] placeholder:text-zinc-400 transition-all"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <kbd className="hidden sm:flex h-7 px-2 items-center rounded-[8px] border bg-zinc-50 dark:bg-zinc-800 text-[11px] font-medium text-zinc-500">⌘K</kbd>
              <Button type="submit" size="sm" className="h-9 rounded-[10px]">Search</Button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
            <span className="text-zinc-400">Popular:</span>
            {["glass button", "login form", "pricing card", "loader"].map(t => (
              <button key={t} type="button" onClick={() => { setLocal(t); setSearchQuery(t); router.push(`/components?search=${encodeURIComponent(t)}`) }} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">{t}</button>
            ))}
          </div>
        </form>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link href="/components"><Button size="lg" className="rounded-[12px] h-12 px-7">Explore Components <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          <Link href="/components"><Button variant="outline" size="lg" className="rounded-[12px] h-12 px-7">Browse Categories</Button></Link>
        </div>

        <div className="mt-16 flex items-center gap-6 text-sm text-zinc-500">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-gradient-to-br from-violet-500 to-indigo-500" />)}
          </div>
          <span>Trusted by <b className="text-zinc-900 dark:text-zinc-100">12,000+</b> developers</span>
        </div>
      </div>
    </section>
  )
}
