"use client";

import Link from "next/link";
import { usePlan } from "@/hooks/use-plan";
import Button from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function LimitsBanner() {
  const { plan, limits, recommendationsUsed, savesUsed } = usePlan();

  if (plan !== "free") return null;

  const maxRecs = limits.maxRecommendations;
  const maxSaves = limits.maxSaves;
  const recsLeft = maxRecs - recommendationsUsed;
  const savesLeft = maxSaves - savesUsed;

  if (recsLeft > 2 && savesLeft > 1) return null;

  return (
    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5 border border-amber-200/50 dark:border-amber-500/10">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-medium text-amber-700 dark:text-amber-400">
            {recsLeft <= 0 && savesLeft <= 0
              ? "Free plan limits reached"
              : recsLeft <= 0
              ? "Recommendation limit reached"
              : "Save limit almost reached"}
          </span>
          <span className="text-amber-600/70 dark:text-amber-400/60 ml-2">
            {recsLeft > 0 && `${recsLeft} recs left`}
            {recsLeft > 0 && savesLeft > 0 && " · "}
            {savesLeft > 0 && `${savesLeft} saves left`}
          </span>
        </div>
        <Link href="/pricing">
          <Button size="sm" variant="outline" className="border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-500/10">
            <Sparkles className="h-3 w-3 mr-1" />
            Upgrade
          </Button>
        </Link>
      </div>
    </div>
  );
}
