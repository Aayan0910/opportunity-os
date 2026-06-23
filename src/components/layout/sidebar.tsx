"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useUserAuth } from "@/hooks/use-auth";
import { usePlan } from "@/hooks/use-plan";
import PlanBadge from "@/components/ui/plan-badge";
import {
  LayoutDashboard,
  User,
  Compass,
  Calendar,
  Route,
  Search,
  Users,
  Settings,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/opportunities", label: "Opportunities", icon: Compass },
  { href: "/search", label: "Search", icon: Search },
  { href: "/deadlines", label: "Deadlines", icon: Calendar },
  { href: "/roadmap", label: "Roadmaps", icon: Route },
  { href: "/community", label: "Community", icon: Users },
  { href: "/admin", label: "Admin", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUserAuth();
  const { plan, limits, recommendationsUsed, savesUsed } = usePlan();

  const userName = user?.name || "Student";
  const userInitial = userName.charAt(0).toUpperCase();
  const courseLabel = user?.course
    ? user.course.replace("btech", "B.Tech").replace("bsc", "B.Sc").replace("bcom", "B.Com")
      .replace("ba", "BA").replace("mbbs", "MBBS").replace("llb", "LLB")
      .replace("mba", "MBA").replace("mtech", "M.Tech").replace("phd", "PhD")
      .replace("diploma", "Diploma").replace("school", "School").replace("other", "Student")
    : "Explorer";
  const yearLabel = user?.year ? ` · ${user.year} Year` : "";

  return (
    <aside className="hidden lg:flex flex-col w-[260px] border-r border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 h-[calc(100vh-4rem)] sticky top-16">
      {/* Profile Card */}
      <div className="p-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-violet-500/20">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{userName}</div>
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
              {courseLabel}{yearLabel}
            </div>
          </div>
          <PlanBadge />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-hide">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200/50 dark:border-violet-500/20"
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              )}
              <link.icon className={cn("h-[18px] w-[18px] relative z-10", isActive && "text-violet-600 dark:text-violet-400")} />
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Usage Progress */}
      <div className="px-4 py-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500/5 to-indigo-500/5 border border-violet-200/30 dark:border-violet-500/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
              {plan === "free" ? "Free Plan Usage" : "Your Progress"}
            </span>
            {plan === "free" && (
              <span className="text-[10px] text-violet-600 dark:text-violet-400 font-bold">
                {recommendationsUsed}/{limits.maxRecommendations} recs
              </span>
            )}
          </div>
          {plan === "free" ? (
            <>
              <Progress value={recommendationsUsed} max={limits.maxRecommendations} size="sm" color="gradient" />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-zinc-500">{savesUsed}/{limits.maxSaves} saves used</span>
              </div>
            </>
          ) : (
            <p className="text-[10px] text-zinc-500">Keep exploring to level up</p>
          )}
        </div>
      </div>

      {/* Upgrade Banner */}
      <div className="px-3 pb-3">
        <Link href="/pricing" className="block p-4 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white hover:from-violet-500 hover:to-indigo-600 transition-all duration-300 group">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="text-xs font-bold">Upgrade to Navigator</span>
          </div>
          <p className="text-[11px] text-violet-200 leading-relaxed">
            Unlock AI resume builder, missed opportunities detector & more
          </p>
        </Link>
      </div>
    </aside>
  );
}
