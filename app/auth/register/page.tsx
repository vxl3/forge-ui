"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toaster"
import { useAuth } from "@/components/layout/auth-provider"

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", username: "", password: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { refresh } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form) 
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      toast("Account created! ✅")
      await refresh()
      setTimeout(() => {
        window.location.href = "/"
      }, 300)
    } catch (e: any) {
      toast(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[#fcfcfc] dark:bg-[#0a0a0b] px-6">
      <div className="w-full max-w-[380px]">
        <Link href="/" className="flex items-center gap-2 font-semibold mb-8"><div className="w-7 h-7 rounded-[8px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-sm">F</div>ForgeUI</Link>
        <div className="rounded-[20px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
          <h1 className="text-[22px] font-semibold tracking-tight">Create account</h1>
          <p className="text-sm text-zinc-500 mt-1">Start building faster today</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div><label className="text-xs font-medium">Email</label><Input className="mt-1.5" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
            <div><label className="text-xs font-medium">Username</label><Input className="mt-1.5" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></div>
            <div><label className="text-xs font-medium">Password</label><Input className="mt-1.5" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} /></div>
            <Button type="submit" className="w-full h-11 rounded-[12px]" disabled={loading}>{loading ? "Creating..." : "Create Account"}</Button>
          </form>
          <div className="mt-6 text-center text-sm text-zinc-500">Already have an account? <Link href="/auth/login" className="text-zinc-900 dark:text-white font-medium underline">Sign in</Link></div>
        </div>
      </div>
    </div>
  )
}
