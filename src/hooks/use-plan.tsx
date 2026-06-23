"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PlanId = "free" | "trial" | "pathfinder" | "navigator";

interface PlanLimits {
  maxRecommendations: number;
  maxSaves: number;
  aiMatching: boolean;
  aiRoadmap: boolean;
  deadlineAlerts: boolean;
  scholarshipMatching: boolean;
  advancedFilters: boolean;
  aiResume: boolean;
  missedDetector: boolean;
  appTracker: boolean;
  weeklyReports: boolean;
}

const planLimits: Record<PlanId, PlanLimits> = {
  free: {
    maxRecommendations: 5,
    maxSaves: 3,
    aiMatching: false,
    aiRoadmap: false,
    deadlineAlerts: false,
    scholarshipMatching: false,
    advancedFilters: false,
    aiResume: false,
    missedDetector: false,
    appTracker: false,
    weeklyReports: false,
  },
  trial: {
    maxRecommendations: -1,
    maxSaves: -1,
    aiMatching: true,
    aiRoadmap: true,
    deadlineAlerts: true,
    scholarshipMatching: true,
    advancedFilters: true,
    aiResume: false,
    missedDetector: false,
    appTracker: false,
    weeklyReports: false,
  },
  pathfinder: {
    maxRecommendations: -1,
    maxSaves: -1,
    aiMatching: true,
    aiRoadmap: true,
    deadlineAlerts: true,
    scholarshipMatching: true,
    advancedFilters: true,
    aiResume: false,
    missedDetector: false,
    appTracker: false,
    weeklyReports: true,
  },
  navigator: {
    maxRecommendations: -1,
    maxSaves: -1,
    aiMatching: true,
    aiRoadmap: true,
    deadlineAlerts: true,
    scholarshipMatching: true,
    advancedFilters: true,
    aiResume: true,
    missedDetector: true,
    appTracker: true,
    weeklyReports: true,
  },
};

interface PlanContextType {
  plan: PlanId;
  limits: PlanLimits;
  recommendationsUsed: number;
  savesUsed: number;
  canGetRecommendation: boolean;
  canSave: boolean;
  useRecommendation: () => void;
  useSave: () => void;
  setPlan: (plan: PlanId) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<PlanId>("free");
  const [recommendationsUsed, setRecommendationsUsed] = useState(0);
  const [savesUsed, setSavesUsed] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedPlan = localStorage.getItem("opp-os-plan") as PlanId | null;
    if (savedPlan && planLimits[savedPlan]) {
      setPlanState(savedPlan);
    }
    const recs = localStorage.getItem("opp-os-recs-used");
    if (recs) setRecommendationsUsed(parseInt(recs, 10) || 0);
    const saves = localStorage.getItem("opp-os-saves-used");
    if (saves) setSavesUsed(parseInt(saves, 10) || 0);
  }, []);

  const limits = planLimits[plan];
  const maxRecs = limits.maxRecommendations;
  const maxSaves = limits.maxSaves;

  const canGetRecommendation = maxRecs === -1 || recommendationsUsed < maxRecs;
  const canSave = maxSaves === -1 || savesUsed < maxSaves;

  const useRecommendation = () => {
    if (canGetRecommendation) {
      const next = recommendationsUsed + 1;
      setRecommendationsUsed(next);
      localStorage.setItem("opp-os-recs-used", String(next));
    }
  };

  const useSave = () => {
    if (canSave) {
      const next = savesUsed + 1;
      setSavesUsed(next);
      localStorage.setItem("opp-os-saves-used", String(next));
    }
  };

  const setPlan = (newPlan: PlanId) => {
    setPlanState(newPlan);
    localStorage.setItem("opp-os-plan", newPlan);
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        limits,
        recommendationsUsed,
        savesUsed,
        canGetRecommendation,
        canSave,
        useRecommendation,
        useSave,
        setPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
}

export { planLimits };
