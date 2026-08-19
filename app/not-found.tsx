import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#fcfcfc] dark:bg-[#0a0a0b] px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-[16px] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 grid place-items-center text-2xl font-bold mb-6">404</div>
        <h1 className="text-[28px] font-bold tracking-tight">Component not found</h1>
        <p className="mt-2 text-zinc-500 text-sm leading-relaxed">The component you're looking for doesn't exist or has been moved. Check the URL or browse our library.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/"><Button>Go Home</Button></Link>
          <Link href="/components"><Button variant="outline">Browse Components</Button></Link>
        </div>
        <div className="mt-12 p-4 rounded-[12px] bg-zinc-900 dark:bg-zinc-800 text-zinc-100 dark:text-zinc-300 text-xs font-mono text-left">
          <div className="text-zinc-500">// 404 debug</div>
          <div>const error = new Error("COMPONENT_NOT_FOUND")</div>
          <div>console.log(error.stack)</div>
        </div>
      </div>
    </div>
  )
}
