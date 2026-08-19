"use client"
import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    fetch("/api/stats").then(r => r.json()).then(setStats)
  }, [])

  if (!stats) return <div>Loading...</div>

  const chartData = [
    { name: "Components", value: stats.totalComponents },
    { name: "Users", value: stats.totalUsers },
    { name: "Likes", value: stats.totalLikes },
    { name: "Favorites", value: stats.totalFavorites },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">Dashboard</h1>
        <p className="text-zinc-500">Overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Components", value: stats.totalComponents, change: "+12%" },
          { label: "Total Users", value: stats.totalUsers, change: "+3%" },
          { label: "Total Likes", value: stats.totalLikes, change: "+8%" },
          { label: "Total Copies", value: stats.totalCopies, change: "+15%" },
        ].map(card => (
          <div key={card.label} className="p-5 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div className="text-xs text-zinc-500 uppercase tracking-wide">{card.label}</div>
            <div className="text-2xl font-bold mt-2">{card.value}</div>
            <div className="text-xs text-green-600 mt-1">{card.change} from last month</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="font-semibold mb-4">Overview</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}><XAxis dataKey="name" fontSize={12} /><YAxis fontSize={12} /><Tooltip /><Bar dataKey="value" fill="#111" radius={[6,6,0,0]} /></BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="font-semibold mb-4">Most Popular</h3>
          <div className="space-y-3">
            {stats.popular?.map((c: any) => (
              <div key={c.id} className="flex justify-between items-center p-3 rounded-[10px] bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-sm font-medium truncate max-w-[180px]">{c.title}</span>
                <span className="text-xs text-zinc-500">{c.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="font-semibold mb-4">Most Liked</h3>
          <div className="space-y-3">
            {stats.mostLiked?.map((c: any) => (
              <div key={c.id} className="flex justify-between items-center p-3 rounded-[10px] bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-sm font-medium truncate">{c.title}</span>
                <span className="text-xs text-zinc-500">{c.likes_count || c.likesCount} likes</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-[16px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h3 className="font-semibold mb-4">Latest Components</h3>
          <div className="space-y-3">
            {stats.latest?.map((c: any) => (
              <div key={c.id} className="flex justify-between items-center p-3 rounded-[10px] bg-zinc-50 dark:bg-zinc-800/50">
                <span className="text-sm font-medium truncate">{c.title}</span>
                <span className="text-xs text-zinc-500">{new Date(c.created_at || c.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
