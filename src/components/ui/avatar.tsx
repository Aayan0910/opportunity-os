"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  gradient?: boolean;
}

export function Avatar({
  className,
  src,
  alt,
  initials,
  size = "md",
  gradient = true,
  ...props
}: AvatarProps) {
  const sizeClasses = {
    xs: "h-6 w-6 text-[9px]",
    sm: "h-8 w-8 text-[10px]",
    md: "h-10 w-10 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-16 w-16 text-base",
  };

  if (src) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <img src={src} alt={alt || ""} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 flex items-center justify-center rounded-full font-bold",
        sizeClasses[size],
        gradient
          ? "bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
          : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300",
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}

export default Avatar;
