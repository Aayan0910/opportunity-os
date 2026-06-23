"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "default" | "success" | "warning" | "danger" | "gradient";
  showLabel?: boolean;
  animated?: boolean;
}

export function Progress({
  className,
  value,
  max = 100,
  size = "md",
  color = "default",
  showLabel = false,
  animated = true,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Progress</span>
          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn("w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800", {
          "h-1": size === "sm",
          "h-2": size === "md",
          "h-3": size === "lg",
        })}
      >
        <div
          className={cn("h-full rounded-full transition-all", animated && "animate-progress-fill", {
            "bg-zinc-900 dark:bg-zinc-100": color === "default",
            "bg-emerald-500": color === "success",
            "bg-amber-500": color === "warning",
            "bg-red-500": color === "danger",
            "bg-gradient-to-r from-violet-500 to-indigo-500": color === "gradient",
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
