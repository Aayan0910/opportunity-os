"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { useUserAuth } from "@/hooks/use-auth";
import { usePlan } from "@/hooks/use-plan";
import LimitsBanner from "@/components/ui/limits-banner";
import UpgradePrompt from "@/components/ui/upgrade-prompt";
import { mockOpportunities } from "@/data/opportunities";
import { cn, getMatchColor, getMatchBg, formatDate, daysUntil } from "@/lib/utils";
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
  Calendar,
  ArrowUpRight,
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

  // Personalized recommendations based on user profile
  const personalizedOpps = useMemo(() => {
    if (!user?.interests?.length && !user?.lookingFor?.length) {
      return mockOpportunities.slice(0, 3);
    }

    return mockOpportunities
      .map((opp) => {
        let score = opp.aiScore || 50;
        const descLower = opp.description.toLowerCase();
        const catLower = opp.category.toLowerCase();

        if (user.lookingFor?.some((lf) => catLower.includes(lf.toLowerCase()))) {
          score += 15;
        }
        if (user.interests?.some((i) => descLower.includes(i.toLowerCase()) || catLower.includes(i.toLowerCase()))) {
          score += 10;
        }
        return { ...opp, aiScore: score };
      })
      .sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0))
      .slice(0, 3);
  }, [user]);

  const upcomingDeadlines = useMemo(() => {
    return [...mockOpportunities]
      .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline))
      .filter((o) => daysUntil(o.deadline) > 0)
      .slice(0, 3);
  }, []);

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

      {/* Personalized Recommendations */}
      <ScrollReveal>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <h2 className="text-lg font-semibold">
                {user?.interests?.length ? "Recommended for You" : "Popular Opportunities"}
              </h2>
            </div>
            <Link href="/opportunities">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {personalizedOpps.map((opp) => {
              const days = daysUntil(opp.deadline);
              return (
                <motion.div
                  key={opp.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  onClick={() => window.open(opp.link, "_blank", "noopener,noreferrer")}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold truncate">{opp.title}</h3>
                      {opp.aiScore && (
                        <span className={cn("shrink-0 text-xs font-bold", getMatchColor(opp.aiScore))}>
                          {opp.aiScore}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{opp.organization}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="info" size="sm">{opp.category}</Badge>
                      <Badge variant={days <= 7 ? "danger" : days <= 30 ? "warning" : "success"} size="sm">
                        {days}d left
                      </Badge>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 shrink-0 ml-3" />
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Upcoming Deadlines */}
      <ScrollReveal>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
            </div>
            <Link href="/deadlines">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.map((opp) => {
              const days = daysUntil(opp.deadline);
              return (
                <div
                  key={opp.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  onClick={() => window.open(opp.link, "_blank", "noopener,noreferrer")}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{opp.title}</h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{opp.organization}</p>
                  </div>
                  <Badge variant={days <= 7 ? "danger" : days <= 30 ? "warning" : "success"} size="sm">
                    {days}d left
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Upgrade CTA for free users */}
      {isFree && (
        <ScrollReveal>
          <Card className="border-violet-200 dark:border-violet-500/20 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-500/5 dark:to-indigo-500/5">
            <CardContent className="p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/10 mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Unlock Full Potential</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-4">
                Get unlimited recommendations, AI-powered matching, personalized roadmaps, and more with a paid plan.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {["Unlimited Recs", "AI Matching", "Roadmaps", "Deadline Alerts"].map((f) => (
                  <Badge key={f} variant="info" size="sm">{f}</Badge>
                ))}
              </div>
              <Link href="/pricing">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  <Sparkles className="h-4 w-4 mr-2" />
                  View Plans — Starting ₹30/mo
                </Button>
              </Link>
            </CardContent>
          </Card>
        </ScrollReveal>
      )}

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
