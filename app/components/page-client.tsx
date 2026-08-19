"use client"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { ComponentCard } from "@/components/library/component-card"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, SlidersHorizontal, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/layout/auth-provider"

type Component = any

export default function LibraryPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()

  const [components, setComponents] = useState<Component[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "latest")
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})

  const fetchData = async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (searchInput) params.set("search", searchInput)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (selectedTag) params.set("tag", selectedTag)
    if (sort) params.set("sort", sort)

    const res = await fetch(`/api/components?${params.toString()}&limit=48`)
    const data = await res.json()
    setComponents(data.data || [])
    setLoading(false)

    // Update URL
    const url = `/components?${params.toString()}`
    router.replace(url, { scroll: false })
  }

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories)
    fetch("/api/tags").then(r => r.json()).then(setTags)
  }, [])

  useEffect(() => {
    const debounce = setTimeout(fetchData, 300)
    return () => clearTimeout(debounce)
  }, [searchInput, selectedCategory, selectedTag, sort])

  useEffect(() => {
    if (user) {
      fetch("/api/likes").then(r => r.json()).then((likes: any[]) => {
        const map: Record<string, boolean> = {}
        likes.forEach(l => map[l.componentId] = true)
        setLikedMap(map)
      })
    }
  }, [user])

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b]">
      <Navbar user={user as any} />

      <div className="mx-auto max-w-[1440px] px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-[240px] shrink-0">
          <div className="sticky top-[88px] space-y-8">
            <div>
              <h3 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-3">Categories</h3>
              <div className="grid gap-1">
                <button onClick={() => setSelectedCategory("all")} className={`text-left px-3 py-2 rounded-[10px] text-sm font-medium transition-all ${selectedCategory==="all"?"bg-zinc-900 dark:bg-white text-white dark:text-zinc-900":"hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>All Components</button>
                {categories.map((cat: any) => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)} className={`text-left px-3 py-2 rounded-[10px] text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory===cat.slug?"bg-zinc-900 dark:bg-white text-white dark:text-zinc-900":"hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                    <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />{cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t: any) => (
                  <button key={t.id} onClick={() => setSelectedTag(selectedTag===t.slug?"":t.slug)} className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${selectedTag===t.slug?"bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-900 dark:border-white":"bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"}`}>
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400 mb-3">Sort</h3>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full h-9 rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm">
                <option value="latest">Latest</option>
                <option value="popular">Most Viewed</option>
                <option value="most-liked">Most Liked</option>
                <option value="most-copied">Most Copied</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Search Header */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search components, effects, animations..." className="w-full h-11 pl-10 pr-4 rounded-[12px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white" />
                {searchInput && <button onClick={() => setSearchInput("")} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"><X className="w-4 h-4" /></button>}
              </div>
              <Button variant="outline" className="lg:hidden"><SlidersHorizontal className="w-4 h-4" /></Button>
            </div>

            {/* Mobile categories */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button onClick={() => setSelectedCategory("all")} className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium border ${selectedCategory==="all"?"bg-zinc-900 text-white border-zinc-900":"bg-white border-zinc-200"}`}>All</button>
              {categories.map((cat: any) => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)} className={`shrink-0 px-3.5 py-2 rounded-full text-sm font-medium border ${selectedCategory===cat.slug?"bg-zinc-900 text-white border-zinc-900":"bg-white border-zinc-200"}`}>{cat.name}</button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-zinc-500">{loading ? "Searching..." : `${components.length} components`}{searchInput && ` for "${searchInput}"`}</p>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="lg:hidden h-9 rounded-[10px] border border-zinc-200 bg-white px-3 text-sm">
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="most-liked">Most Liked</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>
          ) : components.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 mx-auto mb-4 rounded-[16px] bg-zinc-100 dark:bg-zinc-800 grid place-items-center text-2xl">◧</div>
              <h3 className="font-semibold">No components found</h3>
              <p className="text-sm text-zinc-500 mt-1 max-w-xs mx-auto">Try different keywords or browse categories to discover components</p>
              <Button className="mt-4" onClick={() => { setSearchInput(""); setSelectedCategory("all"); setSelectedTag("") }}>Clear filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {components.map((c: any) => <ComponentCard key={c.id} component={c} liked={likedMap[c.id]} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
