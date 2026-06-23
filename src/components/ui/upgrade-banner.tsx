"use client";

import Link from "next/link";
import { usePlan } from "@/hooks/use-plan";
import Button from "@/components/ui/button";
import { Sparkles, Crown, Zap, Rocket, ArrowRight, Check } from "lucide-react";

const features = [
  "Unlimited opportunity recommendations",
  "Unlimited saves & bookmarks",
  "AI-powered matching & scoring",
  "Personalized career roadmaps",
  "Deadline alerts & reminders",
  "Advanced search filters",
];

export default function UpgradeBanner() {
  const { plan } = usePlan();

  if (plan !== "free") return null;

  return (
    <div className="px-3 pb-3">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 p-4 text-white">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
              <Rocket className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm font-bold">Upgrade to Pro</span>
          </div>

          <p className="text-xs text-violet-200 mb-3 leading-relaxed">
            Unlock the full power of Opportunity OS
          </p>

          <ul className="space-y-1.5 mb-4">
            {features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex items-center gap-1.5 text-[10px] text-violet-100">
                <Check className="h-3 w-3 text-violet-300 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <Link href="/pricing">
            <Button
              size="sm"
              className="w-full bg-white text-violet-700 hover:bg-violet-50 font-bold text-xs"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              See Plans — Starting ₹30/mo
              <ArrowRight className="h-3 w-3 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
