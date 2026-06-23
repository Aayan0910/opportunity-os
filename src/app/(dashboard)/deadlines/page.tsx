"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockOpportunities } from "@/data/opportunities";
import { cn, formatDate, daysUntil } from "@/lib/utils";
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Timer,
  AlertCircle,
  CalendarClock,
} from "lucide-react";

const priorityFilters = [
  { id: "all", label: "All", icon: Calendar },
  { id: "urgent", label: "Urgent", sublabel: "<=7d", icon: AlertTriangle },
  { id: "upcoming", label: "Upcoming", sublabel: "8-30d", icon: Clock },
  { id: "later", label: "Later", sublabel: ">30d", icon: Timer },
];

export default function DeadlinesPage() {
  const [priority, setPriority] = useState("all");

  const withDays = mockOpportunities
    .map((o) => ({ ...o, daysLeft: daysUntil(o.deadline) }))
    .filter((o) => o.daysLeft > 0);

  const filtered = withDays.filter((o) => {
    if (priority === "urgent") return o.daysLeft <= 7;
    if (priority === "upcoming") return o.daysLeft > 7 && o.daysLeft <= 30;
    if (priority === "later") return o.daysLeft > 30;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => a.daysLeft - b.daysLeft);

  const getCounts = () => ({
    all: withDays.length,
    urgent: withDays.filter((o) => o.daysLeft <= 7).length,
    upcoming: withDays.filter((o) => o.daysLeft > 7 && o.daysLeft <= 30).length,
    later: withDays.filter((o) => o.daysLeft > 30).length,
  });
  const counts = getCounts();

  const getCircumference = (days: number) => {
    const maxDays = 90;
    const progress = Math.min(days / maxDays, 1);
    return { dashoffset: 283 * (1 - progress) };
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 3) return { ring: "stroke-red-500", bg: "bg-red-500", text: "text-red-500", badge: "danger" as const };
    if (days <= 7) return { ring: "stroke-amber-500", bg: "bg-amber-500", text: "text-amber-500", badge: "warning" as const };
    if (days <= 30) return { ring: "stroke-blue-500", bg: "bg-blue-500", text: "text-blue-500", badge: "info" as const };
    return { ring: "stroke-emerald-500", bg: "bg-emerald-500", text: "text-emerald-500", badge: "success" as const };
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              Deadlines <CalendarClock className="h-6 w-6 text-amber-500" />
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Track and manage your upcoming deadlines
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              { label: "Urgent", count: counts.urgent, color: "bg-red-500" },
              { label: "Upcoming", count: counts.upcoming, color: "bg-amber-500" },
              { label: "Later", count: counts.later, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-sm">
                <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                <span className="text-zinc-500 dark:text-zinc-400">
                  {item.label}: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{item.count}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="flex gap-2">
          {priorityFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setPriority(f.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border",
                priority === f.id
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/25"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-violet-300"
              )}
            >
              <f.icon className="h-4 w-4" />
              {f.label}
              {f.sublabel && <span className="text-xs opacity-70">({f.sublabel})</span>}
              <span className={cn(
                "ml-1 text-xs font-bold",
                priority === f.id ? "text-white/80" : "text-zinc-400"
              )}>
                {counts[f.id as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>
      </ScrollReveal>

      <StaggerChildren className="space-y-3">
        {sorted.map((opp, index) => {
          const urgency = getUrgencyColor(opp.daysLeft);
          const circumference = getCircumference(opp.daysLeft);
          const isUrgent = opp.daysLeft <= 7;
          return (
            <StaggerItem key={opp.id}>
              <Card
                hover
                className={cn(
                  "relative overflow-hidden",
                  isUrgent && "border-red-200 dark:border-red-500/20"
                )}
              >
                {isUrgent && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-amber-500" />
                )}
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <svg className="h-16 w-16 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-zinc-100 dark:text-zinc-800" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          strokeWidth="4"
                          strokeLinecap="round"
                          className={urgency.ring}
                          strokeDasharray="283"
                          initial={{ strokeDashoffset: 283 }}
                          animate={{ strokeDashoffset: circumference.dashoffset }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={cn("text-lg font-bold", urgency.text)}>{opp.daysLeft}</span>
                        <span className="text-[9px] text-zinc-400">days</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">{opp.title}</h3>
                        {isUrgent && <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />}
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{opp.organization}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="info" size="sm">{opp.category}</Badge>
                        <Badge variant={urgency.badge} size="sm">
                          {opp.daysLeft <= 3 ? "Critical" : opp.daysLeft <= 7 ? "Urgent" : opp.daysLeft <= 30 ? "Upcoming" : "Later"}
                        </Badge>
                        <Badge variant="outline" size="sm">{opp.mode}</Badge>
                      </div>
                    </div>

                    <div className="shrink-0 text-right hidden sm:block">
                      <div className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        {formatDate(opp.deadline)}
                      </div>
                      <div className="text-xs text-zinc-400 mb-2">
                        {new Date(opp.deadline).toLocaleDateString("en-IN", { weekday: "short" })}
                      </div>
                      <Button variant="primary" size="xs">
                        Apply <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerChildren>

      {sorted.length === 0 && (
        <ScrollReveal>
          <div className="text-center py-16">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No deadlines in this range</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Great, nothing urgent right now!</p>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <Card className="border-dashed border-zinc-300 dark:border-zinc-700">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Calendar integration coming soon. Sync deadlines to Google Calendar.
            </p>
            <Button variant="outline" size="sm" className="mt-3">
              <Calendar className="h-4 w-4" /> Connect Calendar
            </Button>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
