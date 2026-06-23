"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Compass,
  Calendar,
  Search,
  Users,
  Route,
} from "lucide-react";
import { motion } from "framer-motion";

const mobileLinks = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/opportunities", label: "Feed", icon: Compass },
  { href: "/search", label: "Search", icon: Search },
  { href: "/deadlines", label: "Deadlines", icon: Calendar },
  { href: "/community", label: "Community", icon: Users },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-800/60 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {mobileLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[56px] transition-colors",
                isActive
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-violet-600 dark:bg-violet-400"
                  transition={{ duration: 0.2 }}
                />
              )}
              <link.icon className={cn("h-5 w-5", isActive && "text-violet-600 dark:text-violet-400")} />
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
