"use client"
import { useEffect, useState } from "react"

type Toast = { id: string; message: string }

let toastListeners: ((t: Toast) => void)[] = []

export function toast(message: string) {
  const t = { id: Math.random().toString(36).slice(2), message }
  toastListeners.forEach(l => l(t))
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const listener = (t: Toast) => {
      setToasts(prev => [...prev, t])
      setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 3000)
    }
    toastListeners.push(listener)
    return () => { toastListeners = toastListeners.filter(l => l !== listener) }
  }, [])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto px-4 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium shadow-[0_8px_24px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-2">
          {t.message}
        </div>
      ))}
    </div>
  )
}
