"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export function Separator({
  className,
  orientation = "horizontal",
  label,
  ...props
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("h-6 w-px bg-zinc-200 dark:bg-zinc-800", className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div className="flex items-center gap-3" {...props}>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">{label}</span>
        <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
      </div>
    );
  }

  return (
    <div
      className={cn("h-px w-full bg-zinc-200 dark:bg-zinc-800", className)}
      {...props}
    />
  );
}

export default Separator;
