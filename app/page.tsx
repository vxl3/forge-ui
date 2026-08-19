import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/home/hero"
import { db } from "@/lib/db/client"
import { components, categories } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { ComponentCard } from "@/components/library/component-card"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth/guard"
import { ArrowRight, Sparkles, TrendingUp, Clock, Heart } from "lucide-react"

async function getSections() {
  const popular = await db.select().from(components).where(eq(components.published, true)).orderBy(desc(components.views)).limit(8)
  const latest = await db.select().from(components).where(eq(components.published, true)).orderBy(desc(components.createdAt)).limit(8)
  const featured = await db.select().from(components).where(eq(components.featured, true)).limit(6)
  const liked = await db.select().from(components).where(eq(components.published, true)).orderBy(desc(components.likesCount)).limit(8)
  const cats = await db.select().from(categories).where(eq(categories.status, "active"))
  return { popular, latest, featured, liked, cats }
}

export default async function HomePage() {
  const user = await getCurrentUser()
  const { popular, latest, featured, liked, cats } = await getSections()

  return (
    <div className="min-h-screen">
      <Navbar user={user as any} />
      <Hero />

      {/* Featured */}
      <section className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center"><Sparkles className="w-4 h-4" /></div>
            <div>
              <h2 className="font-semibold text-[20px] tracking-tight">Featured Components</h2>
              <p className="text-sm text-zinc-500">Hand-picked by our team</p>
            </div>
          </div>
          <Link href="/components?featured=true" className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c: any) => <ComponentCard key={c.id} component={c} />)}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-[1440px] px-6 py-12">
          <div className="flex flex-wrap gap-3">
            {cats.map((cat: any) => (
              <Link key={cat.id} href={`/components?category=${cat.slug}`} className="group px-4 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-zinc-900 transition-all flex items-center gap-2 text-sm font-medium">
                <span className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-[10px] bg-orange-500 text-white grid place-items-center"><TrendingUp className="w-4 h-4" /></div>
          <h2 className="font-semibold text-[20px] tracking-tight">Popular Components</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((c: any) => <ComponentCard key={c.id} component={c} />)}
        </div>
      </section>

      {/* Most Liked */}
      <section className="mx-auto max-w-[1440px] px-6 py-16 bg-zinc-50/50 dark:bg-zinc-900/10 rounded-[24px] my-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-[10px] bg-pink-500 text-white grid place-items-center"><Heart className="w-4 h-4" /></div>
          <h2 className="font-semibold text-[20px] tracking-tight">Most Liked</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {liked.map((c: any) => <ComponentCard key={c.id} component={c} />)}
        </div>
      </section>

      {/* Latest */}
      <section className="mx-auto max-w-[1440px] px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-[10px] bg-violet-600 text-white grid place-items-center"><Clock className="w-4 h-4" /></div>
          <h2 className="font-semibold text-[20px] tracking-tight">Latest Additions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map((c: any) => <ComponentCard key={c.id} component={c} />)}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="mx-auto max-w-[1440px] px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-semibold"><div className="w-7 h-7 rounded-[8px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-sm">F</div>ForgeUI</div>
            <p className="mt-3 text-sm text-zinc-500 max-w-[320px]">A premium library of production-ready UI components. Built for developers who care about craft.</p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm">
            <div><div className="font-medium mb-3">Product</div><div className="grid gap-2 text-zinc-500"><Link href="/components" className="hover:text-zinc-900 dark:hover:text-zinc-100">Components</Link><a className="hover:text-zinc-900">Categories</a><a className="hover:text-zinc-900">Changelog</a></div></div>
            <div><div className="font-medium mb-3">Community</div><div className="grid gap-2 text-zinc-500"><a className="hover:text-zinc-900">Twitter</a><a className="hover:text-zinc-900">GitHub</a><a className="hover:text-zinc-900">Discord</a></div></div>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between text-xs text-zinc-400">
          <span>© 2026 ForgeUI — Built with craft</span>
          <span>Made in Ramadi, IQ</span>
        </div>
      </footer>
    </div>
  )
}
