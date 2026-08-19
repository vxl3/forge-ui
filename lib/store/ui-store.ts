"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark"
type Lang = "en" | "ar"

interface UIState {
  theme: Theme
  lang: Lang
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  setLang: (l: Lang) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      lang: "en",
      searchQuery: "",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
      setLang: (lang) => set({ lang }),
      setSearchQuery: (q) => set({ searchQuery: q }),
    }),
    {
      name: "forge-ui-store",
    }
  )
)
