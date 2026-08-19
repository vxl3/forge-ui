"use client"
import { Suspense } from "react"
import LibraryPage from "./page-client"

export default function Wrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading library...</div>}>
      <LibraryPage />
    </Suspense>
  )
}
