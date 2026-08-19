import { Suspense } from "react"
import LibraryClient from "./page-client"

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center"><div className="animate-pulse text-zinc-500">Loading library...</div></div>}>
      <LibraryClient />
    </Suspense>
  )
}
