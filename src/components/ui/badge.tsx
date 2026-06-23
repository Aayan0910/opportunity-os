"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline" | "glow";
  size?: "sm" | "md";
  dot?: boolean;
  children?: ReactNode;
}

export function Badge({ className, variant = "default", size = "sm", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium border",
        {
          "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/50":
            variant === "default",
          "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20":
            variant === "success",
          "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20":
            variant === "warning",
          "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20":
            variant === "danger",
          "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20":
            variant === "info",
          "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-600":
            variant === "outline",
          "bg-gradient-to-r from-violet-500/10 to-indigo-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/20":
            variant === "glow",
        },
        {
          "px-2 py-0.5 text-[10px]": size === "sm",
          "px-2.5 py-1 text-xs": size === "md",
        },
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-emerald-500": variant === "success",
          "bg-amber-500": variant === "warning",
          "bg-red-500": variant === "danger",
          "bg-blue-500": variant === "info",
          "bg-violet-500": variant === "glow",
          "bg-zinc-400": variant === "default" || variant === "outline",
        })} />
      )}
      {children}
    </span>
  );
}

export default Badge;
