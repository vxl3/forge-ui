"use client"
import { cn } from "@/lib/utils/cn"
import { createContext, useContext, useState } from "react"

const TabsContext = createContext<{ value: string; setValue: (v: string) => void } | null>(null)

export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex items-center gap-1 rounded-[10px] bg-zinc-100 dark:bg-zinc-800 p-1", className)} {...props} />
}

export function TabsTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)!
  const active = ctx.value === value
  return (
    <button
      onClick={() => ctx.setValue(value)}
      className={cn(
        "px-3.5 py-1.5 text-sm font-medium rounded-[7px] transition-all",
        active ? "bg-white dark:bg-zinc-900 shadow-sm text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
        className
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const ctx = useContext(TabsContext)!
  if (ctx.value !== value) return null
  return <div className={cn("mt-4", className)}>{children}</div>
}
