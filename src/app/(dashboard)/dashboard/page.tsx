"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { mockOpportunities, gamificationLevels, achievements } from "@/data/opportunities";
import { cn, getMatchColor, formatDate, daysUntil } from "@/lib/utils";
import Link from "next/link";
import {
  TrendingUp,
  Bookmark,
  Clock,
  Target,
  ArrowRight,
  Calendar,
  Zap,
  CheckCircle2,
  Flame,
  Trophy,
  Sparkles,
  BarChart3,
  FileSearch,
  Map,
  Users,
} from "lucide-react";

function AnimatedCounter({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span>{count}</span>;
}

const stats = [
  {
    label: "Opportunity Score",
    value: 87,
    icon: Target,
    change: "+12 this week",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-500/20",
  },
  {
    label: "Saved Opportunities",
    value: 24,
    icon: Bookmark,
    change: "+3 new",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-500/20",
  },
  {
    label: "Applied",
    value: 8,
    icon: CheckCircle2,
    change: "2 pending",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
  {
    label: "Upcoming Deadlines",
    value: 5,
    icon: Clock,
    change: "Nearest: 3 days",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
  },
];

const weeklyData = [
  { day: "Mon", value: 3 },
  { day: "Tue", value: 5 },
  { day: "Wed", value: 2 },
  { day: "Thu", value: 7 },
  { day: "Fri", value: 4 },
  { day: "Sat", value: 6 },
  { day: "Sun", value: 1 },
];

export default function DashboardPage() {
  const topMatches = mockOpportunities
    .filter((o) => o.aiScore && o.aiScore >= 85)
    .slice(0, 3);
  const upcomingDeadlines = [...mockOpportunities]
    .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline))
    .filter((o) => daysUntil(o.deadline) > 0)
    .slice(0, 4);
  const currentLevel = gamificationLevels[3];
  const earnedAchievements = achievements.filter((a) => a.earned);

  return (
    <div className="space-y-8">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              Welcome back, Student! <span className="text-2xl">&#x1F44B;</span>
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Here&apos;s what&apos;s happening with your opportunities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
              <Flame className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">7 Day Streak</span>
            </div>
            <Badge variant="glow" size="md">
              <Trophy className="h-3 w-3" /> Level {currentLevel.level}
            </Badge>
          </div>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card hover className={cn("border", stat.border)}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <Badge variant="success" size="sm">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{stat.label}</div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ScrollReveal className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <h2 className="text-lg font-semibold">Top AI Matches</h2>
              </div>
              <Link href="/opportunities">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {topMatches.map((opp) => (
                <motion.div
                  key={opp.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold truncate">{opp.title}</h3>
                      <span className={cn("shrink-0 text-xs font-bold", getMatchColor(opp.aiScore || 0))}>
                        {opp.aiScore}%
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{opp.organization}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="info" size="sm">{opp.category}</Badge>
                      <Badge
                        variant={opp.difficulty === "Hard" ? "danger" : opp.difficulty === "Medium" ? "warning" : "success"}
                        size="sm"
                      >
                        {opp.difficulty}
                      </Badge>
                    </div>
                    {opp.matchReasons && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {opp.matchReasons.slice(0, 2).map((reason) => (
                          <span key={reason} className="text-[10px] text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                            {reason}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 text-right shrink-0">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {formatDate(opp.deadline)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h2 className="text-lg font-semibold">Deadlines</h2>
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
                    className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-sm font-medium leading-tight line-clamp-1">{opp.title}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500">{opp.organization}</span>
                      <Badge
                        variant={days <= 7 ? "danger" : days <= 30 ? "warning" : "success"}
                        size="sm"
                      >
                        {days}d left
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScrollReveal>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold">Weekly Activity</h2>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyData.map((d) => (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-medium text-zinc-500">{d.value}</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.value / 7) * 100}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="w-full rounded-t-md bg-gradient-to-t from-violet-500 to-indigo-400 min-h-[4px]"
                    />
                    <span className="text-[10px] text-zinc-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <h2 className="text-lg font-semibold">Streak & Level</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{currentLevel.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-bold text-lg", currentLevel.color)}>{currentLevel.name}</span>
                    <Badge variant="glow" size="sm">Level {currentLevel.level}</Badge>
                  </div>
                  <Progress value={650} max={1000} color="gradient" showLabel className="mt-2" />
                  <p className="text-xs text-zinc-500 mt-1">650 / 1000 XP to next level</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {earnedAchievements.slice(0, 8).map((a) => (
                  <motion.div
                    key={a.id}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 cursor-default"
                    title={`${a.title}: ${a.description}`}
                  >
                    <span className="text-xl">{a.icon}</span>
                    <span className="text-[9px] text-zinc-500 text-center leading-tight">{a.title}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {[
                { label: "Complete Profile", href: "/profile", icon: Target, color: "from-violet-500 to-indigo-500" },
                { label: "Browse Feed", href: "/opportunities", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
                { label: "Generate Roadmap", href: "/roadmap", icon: Map, color: "from-amber-500 to-orange-500" },
                { label: "Search More", href: "/search", icon: FileSearch, color: "from-emerald-500 to-teal-500" },
                { label: "Community", href: "/community", icon: Users, color: "from-pink-500 to-rose-500" },
                { label: "View Deadlines", href: "/deadlines", icon: Clock, color: "from-red-500 to-orange-500" },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all hover:scale-[1.02]"
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white", action.color)}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      <ScrollReveal>
        <Card className="border-violet-200 dark:border-violet-500/20 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-500/5 dark:to-indigo-500/5">
          <CardHeader className="flex flex-row items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <h2 className="text-lg font-semibold">Daily Digest</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-zinc-500">New opportunities today</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-xs text-zinc-500">Deadlines this week</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-xs text-zinc-500">New AI match updates</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
