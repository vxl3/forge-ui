import { getCurrentUser } from "@/lib/auth/guard"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user || user.role !== "admin") redirect("/auth/login")

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0b] flex">
      <aside className="w-[260px] border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col shrink-0">
        <Link href="/" className="flex items-center gap-2 font-semibold mb-8"><div className="w-7 h-7 rounded-[8px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-sm">F</div>ForgeUI <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">ADMIN</span></Link>
        <nav className="grid gap-1 flex-1">
          <Link href="/admin" className="px-3 py-2.5 rounded-[10px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium">Dashboard</Link>
          <Link href="/admin/components" className="px-3 py-2.5 rounded-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">Components</Link>
          <Link href="/components" className="px-3 py-2.5 rounded-[10px] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm">View Site →</Link>
        </nav>
        <div className="text-xs text-zinc-400">Logged as {user.username}</div>
      </aside>
      <main className="flex-1 min-w-0 p-8">{children}</main>
    </div>
  )
}
