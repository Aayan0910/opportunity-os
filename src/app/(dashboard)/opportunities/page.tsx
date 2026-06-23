"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { mockOpportunities, categories, type Opportunity } from "@/data/opportunities";
import { useUserAuth } from "@/hooks/use-auth";
import { usePlan } from "@/hooks/use-plan";
import LimitsBanner from "@/components/ui/limits-banner";
import UpgradePrompt from "@/components/ui/upgrade-prompt";
import { cn, getMatchColor, getMatchBg, formatDate, daysUntil } from "@/lib/utils";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowUpRight,
  Sparkles,
  Filter,
  ChevronDown,
  Zap,
  Star,
  Globe,
} from "lucide-react";

export default function OpportunitiesPage() {
  const { user } = useUserAuth();
  const { plan, limits, recommendationsUsed, useRecommendation, canGetRecommendation } = usePlan();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"aiScore" | "deadline">("aiScore");
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [viewCount, setViewCount] = useState(0);

  const isFree = plan === "free";
  const maxRecs = limits.maxRecommendations;
  const visibleCount = isFree ? Math.min(viewCount + 5, maxRecs) : viewCount + 5;

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleViewDetails = (id: string) => {
    if (isFree && !canGetRecommendation) return;
    useRecommendation();
    setViewCount((v) => v + 1);
  };

  const filtered = useMemo(() => {
    let results = mockOpportunities;

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((o) => o.category === selectedCategory);
    }

    // If user has profile data, boost matching opportunities
    if (user?.interests?.length || user?.lookingFor?.length) {
      results = results.map((opp) => {
        let boost = 0;
        const descLower = opp.description.toLowerCase();
        const catLower = opp.category.toLowerCase();
        // Boost if category matches lookingFor
        if (user.lookingFor?.some((lf) => catLower.includes(lf.toLowerCase()))) {
          boost += 10;
        }
        // Boost if interests match description or category
        if (user.interests?.some((i) => descLower.includes(i.toLowerCase()) || catLower.includes(i.toLowerCase()))) {
          boost += 5;
        }
        return { ...opp, aiScore: (opp.aiScore || 50) + boost };
      });
    }

    // Sort
    results.sort((a, b) =>
      sortBy === "aiScore"
        ? (b.aiScore || 0) - (a.aiScore || 0)
        : daysUntil(a.deadline) - daysUntil(b.deadline)
    );

    return results;
  }, [selectedCategory, sortBy, user]);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
              Opportunities <Sparkles className="h-6 w-6 text-violet-500" />
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              {user?.interests?.length
                ? `Showing ${filtered.length} opportunities matched to your interests`
                : `Discover ${filtered.length} opportunities — complete your profile for better matches`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={sortBy === "aiScore" ? "primary" : "outline"}
              size="sm"
              onClick={() => setSortBy("aiScore")}
            >
              <Zap className="h-3.5 w-3.5" /> AI Score
            </Button>
            <Button
              variant={sortBy === "deadline" ? "primary" : "outline"}
              size="sm"
              onClick={() => setSortBy("deadline")}
            >
              <Clock className="h-3.5 w-3.5" /> Deadline
            </Button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                selectedCategory === cat
                  ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/25"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {isFree && <LimitsBanner />}

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.slice(0, visibleCount).map((opp) => {
          const days = daysUntil(opp.deadline);
          const isSaved = savedIds.has(opp.id);
          return (
            <StaggerItem key={opp.id}>
              <Card hover className={cn("relative overflow-hidden", opp.featured && "ring-2 ring-violet-500/30")}>
                {opp.featured && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                      <Star className="h-3 w-3" /> FEATURED
                    </div>
                  </div>
                )}
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-base leading-tight line-clamp-1">{opp.title}</h3>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{opp.organization}</p>
                    </div>
                    {opp.aiScore && (
                      <div className={cn("shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border", getMatchBg(opp.aiScore))}>
                        <span className={cn("text-xl font-bold", getMatchColor(opp.aiScore))}>{opp.aiScore}</span>
                        <span className="text-[9px] text-zinc-500 font-medium">AI Score</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">{opp.description}</p>

                  {opp.matchReasons && opp.matchReasons.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {opp.matchReasons.slice(0, 3).map((reason) => (
                        <span key={reason} className="inline-flex items-center gap-1 text-[10px] text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-full">
                          <Sparkles className="h-2.5 w-2.5" /> {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="info" size="sm">{opp.category}</Badge>
                    <Badge
                      variant={opp.difficulty === "Hard" ? "danger" : opp.difficulty === "Medium" ? "warning" : "success"}
                      size="sm"
                    >
                      {opp.difficulty}
                    </Badge>
                    <Badge variant={opp.type === "Paid" ? "glow" : "outline"} size="sm">{opp.type}</Badge>
                    <Badge variant="outline" size="sm">
                      {opp.mode === "Online" ? <Globe className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {opp.mode}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(opp.deadline)}
                    </span>
                    <Badge
                      variant={days <= 7 ? "danger" : days <= 30 ? "warning" : "success"}
                      size="sm"
                    >
                      {days}d left
                    </Badge>
                    {opp.applicants && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {opp.applicants.toLocaleString()} applicants
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(opp.link, "_blank", "noopener,noreferrer")}
                    >
                      Apply Now <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant={isSaved ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => toggleSave(opp.id)}
                    >
                      {isSaved ? <BookmarkCheck className="h-4 w-4 text-violet-500" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerChildren>

      {filtered.length === 0 && (
        <ScrollReveal>
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No opportunities found</h3>
            <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters</p>
          </div>
        </ScrollReveal>
      )}

      {isFree && visibleCount < filtered.length && (
        <div className="text-center">
          <UpgradePrompt
            feature="Unlimited Opportunities"
            description="You've seen {visibleCount} of {filtered.length} opportunities. Upgrade to see all {filtered.length}+ opportunities with AI matching and scoring."
          />
        </div>
      )}

      {!isFree && visibleCount < filtered.length && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setViewCount((v) => v + 10)}
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
}
