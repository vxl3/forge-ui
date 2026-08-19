"use client"
import { useUIStore } from "@/lib/store/ui-store"
import { useEffect } from "react"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore(s => s.theme)
  
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    root.style.colorScheme = theme
  }, [theme])

  return <>{children}</>
}
