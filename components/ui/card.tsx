import { cn } from "@/lib/utils/cn"
import { HTMLAttributes } from "react"

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-zinc-200/70 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3),0_16px_32px_rgba(0,0,0,0.3)]",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pb-3", className)} {...props} />
}
export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0", className)} {...props} />
}
export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 pt-0 flex items-center", className)} {...props} />
}
