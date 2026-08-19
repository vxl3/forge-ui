import { cn } from "@/lib/utils/cn"
import { InputHTMLAttributes, forwardRef } from "react"

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn("flex h-10 w-full rounded-[10px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white focus:border-transparent transition-all", className)}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
