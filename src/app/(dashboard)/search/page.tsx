"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { mockOpportunities, categories, states } from "@/data/opportunities";
import { cn, getMatchColor, getMatchBg, formatDate, daysUntil } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Globe,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter,
  BookmarkCheck,
  Bookmark,
} from "lucide-react";

const quickFilters = [
  "Scholarships",
  "Internships",
  "Hackathons",
  "Free",
  "Online",
  "India",
  "AI Score > 80",
  "Deadline < 30d",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleArrayFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const results = useMemo(() => {
    let items = mockOpportunities;

    if (query) {
      const q = query.toLowerCase();
      items = items.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.organization.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.category.toLowerCase().includes(q)
      );
    }

    if (quickFilter) {
      if (quickFilter === "Free") items = items.filter((o) => o.type === "Free");
      else if (quickFilter === "Online") items = items.filter((o) => o.mode === "Online");
      else if (quickFilter === "India") items = items.filter((o) => o.country === "India");
      else if (quickFilter === "AI Score > 80") items = items.filter((o) => (o.aiScore || 0) > 80);
      else if (quickFilter === "Deadline < 30d") items = items.filter((o) => daysUntil(o.deadline) <= 30);
      else items = items.filter((o) => o.category === quickFilter);
    }

    if (selectedCategories.length > 0) {
      items = items.filter((o) => selectedCategories.includes(o.category));
    }
    if (selectedStates.length > 0) {
      items = items.filter((o) => o.state && selectedStates.includes(o.state));
    }
    if (selectedModes.length > 0) {
      items = items.filter((o) => selectedModes.includes(o.mode));
    }
    if (selectedTypes.length > 0) {
      items = items.filter((o) => selectedTypes.includes(o.type));
    }

    return items;
  }, [query, quickFilter, selectedCategories, selectedStates, selectedModes, selectedTypes]);

  const activeFilterCount =
    selectedCategories.length + selectedStates.length + selectedModes.length + selectedTypes.length;

  const clearAll = () => {
    setQuery("");
    setQuickFilter(null);
    setSelectedCategories([]);
    setSelectedStates([]);
    setSelectedModes([]);
    setSelectedTypes([]);
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            Search <Search className="h-6 w-6 text-violet-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Find the perfect opportunity from {mockOpportunities.length}+ listings
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search opportunities, organizations, skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-14 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
          />
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all",
              showAdvanced
                ? "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="h-5 w-5 flex items-center justify-center rounded-full bg-violet-600 text-white text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {quickFilters.map((f) => (
            <button
              key={f}
              onClick={() => setQuickFilter(quickFilter === f ? null : f)}
              className={cn(
                "shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border",
                quickFilter === f
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-violet-300"
              )}
            >
              {f}
            </button>
          ))}
          {(quickFilter || activeFilterCount > 0) && (
            <button onClick={clearAll} className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-200 dark:border-red-500/20">
              <X className="h-3 w-3 inline mr-1" /> Clear All
            </button>
          )}
        </div>
      </ScrollReveal>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Card>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                      {categories.slice(0, 8).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => toggleArrayFilter(selectedCategories, setSelectedCategories, cat)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                            selectedCategories.includes(cat)
                              ? "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/30"
                              : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Mode</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Online", "Offline", "Hybrid"].map((m) => (
                        <button
                          key={m}
                          onClick={() => toggleArrayFilter(selectedModes, setSelectedModes, m)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                            selectedModes.includes(m)
                              ? "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/30"
                              : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                          )}
                        >
                          {m === "Online" ? <Globe className="h-3 w-3 inline mr-1" /> : <MapPin className="h-3 w-3 inline mr-1" />}
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Type</label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Free", "Paid"].map((t) => (
                        <button
                          key={t}
                          onClick={() => toggleArrayFilter(selectedTypes, setSelectedTypes, t)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                            selectedTypes.includes(t)
                              ? "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/30"
                              : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">State</label>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                      {states.slice(0, 10).map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleArrayFilter(selectedStates, setSelectedStates, s)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                            selectedStates.includes(s)
                              ? "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/30"
                              : "bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{results.length}</span> results found
        </p>
      </div>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.map((opp) => {
          const days = daysUntil(opp.deadline);
          const isSaved = savedIds.has(opp.id);
          return (
            <StaggerItem key={opp.id}>
              <Card hover className={cn("relative overflow-hidden", opp.featured && "ring-2 ring-violet-500/30")}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base line-clamp-1 mb-1">{opp.title}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{opp.organization}</p>
                    </div>
                    {opp.aiScore && (
                      <div className={cn("shrink-0 flex flex-col items-center px-2.5 py-1.5 rounded-lg border", getMatchBg(opp.aiScore))}>
                        <span className={cn("text-lg font-bold", getMatchColor(opp.aiScore))}>{opp.aiScore}</span>
                        <span className="text-[8px] text-zinc-500 font-medium">AI</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">{opp.description}</p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    <Badge variant="info" size="sm">{opp.category}</Badge>
                    <Badge variant={opp.difficulty === "Hard" ? "danger" : opp.difficulty === "Medium" ? "warning" : "success"} size="sm">{opp.difficulty}</Badge>
                    <Badge variant={opp.type === "Paid" ? "glow" : "outline"} size="sm">{opp.type}</Badge>
                    <Badge variant="outline" size="sm">{opp.mode}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDate(opp.deadline)}
                      </span>
                      <Badge variant={days <= 7 ? "danger" : days <= 30 ? "warning" : "success"} size="sm">
                        {days}d
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant={isSaved ? "secondary" : "outline"}
                        size="xs"
                        onClick={() => toggleSave(opp.id)}
                      >
                        {isSaved ? <BookmarkCheck className="h-3.5 w-3.5 text-violet-500" /> : <Bookmark className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="primary" size="xs">
                        Apply <ArrowUpRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerChildren>

      {results.length === 0 && (
        <ScrollReveal>
          <div className="text-center py-16">
            <Search className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No results found</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearAll}>
              <X className="h-4 w-4" /> Clear All Filters
            </Button>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
