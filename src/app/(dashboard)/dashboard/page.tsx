"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { useUserAuth } from "@/hooks/use-auth";
import { usePlan } from "@/hooks/use-plan";
import LimitsBanner from "@/components/ui/limits-banner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  TrendingUp,
  Bookmark,
  Clock,
  Target,
  ArrowRight,
  Sparkles,
  FileSearch,
  Map,
  Users,
  Search,
  Rocket,
  Lock,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useUserAuth();
  const { plan, limits, recommendationsUsed, savesUsed } = usePlan();
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name.split(" ")[0]);
    }
  }, [user]);

  const isFree = plan === "free";
  const maxRecs = limits.maxRecommendations;
  const maxSaves = limits.maxSaves;

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              Hey, {userName}! &#x1F44B;
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Your journey starts here. Let&apos;s find opportunities that match you.
            </p>
          </div>
          <Link href="/opportunities">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
              <Search className="h-4 w-4 mr-2" />
              Browse Opportunities
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      {isFree && <LimitsBanner />}

      {/* Usage stats for free users */}
      {isFree && (
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StaggerItem>
            <Card hover className="border-violet-200 dark:border-violet-500/20">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 dark:bg-violet-500/10">
                    <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <Badge variant={recommendationsUsed >= maxRecs ? "danger" : "info"} size="sm">
                    {recommendationsUsed} / {maxRecs} used
                  </Badge>
                </div>
                <div className="text-sm font-medium">Recommendations</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {maxRecs - recommendationsUsed > 0
                    ? `${maxRecs - recommendationsUsed} left this month`
                    : "Limit reached — upgrade for unlimited"}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card hover className="border-blue-200 dark:border-blue-500/20">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                    <Bookmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Badge variant={savesUsed >= maxSaves ? "danger" : "info"} size="sm">
                    {savesUsed} / {maxSaves} used
                  </Badge>
                </div>
                <div className="text-sm font-medium">Saved Opportunities</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {maxSaves - savesUsed > 0
                    ? `${maxSaves - savesUsed} slots remaining`
                    : "Limit reached — upgrade for unlimited"}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        </StaggerChildren>
      )}

      {/* Empty state: No opportunities yet */}
      <ScrollReveal>
        <Card>
          <CardContent className="p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-500/10 mx-auto mb-4">
              <Rocket className="h-8 w-8 text-violet-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ready to explore?</h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-6">
              You haven&apos;t explored any opportunities yet. Start browsing to find scholarships, internships, hackathons, and more — all matched to your profile.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/opportunities">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Explore Opportunities
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline">
                  Complete Your Profile
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Quick Actions */}
      <ScrollReveal>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { label: "Browse Feed", href: "/opportunities", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
                { label: "Complete Profile", href: "/profile", icon: Target, color: "from-violet-500 to-indigo-500" },
                { label: "Search", href: "/search", icon: FileSearch, color: "from-emerald-500 to-teal-500" },
                { label: "Roadmaps", href: "/roadmap", icon: Map, color: "from-amber-500 to-orange-500", locked: !limits.aiRoadmap },
                { label: "Community", href: "/community", icon: Users, color: "from-pink-500 to-rose-500" },
                { label: "Deadlines", href: "/deadlines", icon: Clock, color: "from-red-500 to-orange-500", locked: !limits.deadlineAlerts },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={cn(
                    "relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-[1.02]",
                    action.locked
                      ? "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-80"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", action.color)}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                  {action.locked && (
                    <div className="absolute top-2 right-2">
                      <Lock className="h-3 w-3 text-zinc-400" />
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
