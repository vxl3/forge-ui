"use client"
import { useUIStore } from "@/lib/store/ui-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Search, Heart, Menu, X, LayoutDashboard, LogOut, Plus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface NavbarProps {
  user?: { id: string; username: string; email: string; role: string } | null
}

export function Navbar({ user }: NavbarProps) {
  const { theme, toggleTheme, lang, setLang, searchQuery, setSearchQuery } = useUIStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/components?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-6 h-[64px] flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-[14px] tracking-tight group-hover:rotate-3 transition-transform">F</div>
            <span className="font-semibold text-[16px] tracking-tight">ForgeUI</span>
            <span className="hidden sm:inline-flex ml-2 text-[10px] font-medium tracking-widest uppercase bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">BETA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/components" className="px-3.5 py-2 rounded-[10px] text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Components</Link>
            <Link href="/components?category=buttons" className="px-3.5 py-2 rounded-[10px] text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Categories</Link>
          </nav>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full h-9 pl-9 pr-4 rounded-[10px] bg-zinc-100 dark:bg-zinc-800/80 border border-transparent focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-200 dark:focus:border-zinc-700 text-sm outline-none transition-all"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 px-1.5 items-center rounded border bg-white dark:bg-zinc-900 text-[10px] font-medium">⌘K</kbd>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Link href="/submit" className="hidden sm:flex">
            <Button size="sm" className="rounded-[10px] gap-1.5 h-9">
              <Plus className="w-4 h-4" /> Publish
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
            <span className="text-xs font-bold">{lang === "en" ? "EN" : "AR"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Link href="/favorites" className="hidden sm:flex">
            <Button variant="ghost" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </Link>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin" className="hidden sm:flex">
                  <Button variant="ghost" size="icon">
                    <LayoutDashboard className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              <Link href="/profile">
                <Button variant="secondary" size="sm" className="hidden sm:flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500" />
                  {user.username}
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="hidden sm:flex" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2 ml-2">
              <Link href="/auth/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link href="/auth/register"><Button size="sm">Sign up</Button></Link>
            </div>
          )}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 space-y-4">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="pl-9" />
            </div>
          </form>
          <nav className="grid gap-1">
            <Link href="/components" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium">Components</Link>
            <Link href="/submit" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-[10px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Publish Your Work</Link>
            <Link href="/favorites" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium">Favorites</Link>
            {user?.role === "admin" && <Link href="/admin" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium">Admin</Link>}
            {user ? (
              <button onClick={() => { setMobileOpen(false); handleLogout() }} className="text-left px-3 py-2.5 rounded-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium">Logout ({user.username})</button>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-[10px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-center font-medium">Login</Link>
                <Link href="/auth/register" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 rounded-[10px] border text-center font-medium">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
