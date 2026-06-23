"use client";

import { usePlan, type PlanId } from "@/hooks/use-plan";
import { cn } from "@/lib/utils";
import { Crown, Zap, Rocket, Compass } from "lucide-react";

const planConfig: Record<PlanId, { label: string; icon: typeof Crown; colors: string }> = {
  free: { label: "Explorer", icon: Compass, colors: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" },
  trial: { label: "Trial", icon: Zap, colors: "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  pathfinder: { label: "Pathfinder", icon: Rocket, colors: "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  navigator: { label: "Navigator", icon: Crown, colors: "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400" },
};

export default function PlanBadge({ className }: { className?: string }) {
  const { plan } = usePlan();
  const config = planConfig[plan];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
        config.colors,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
