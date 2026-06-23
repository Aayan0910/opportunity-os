"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type PlanId = "free" | "trial" | "pathfinder" | "navigator";

export type PaymentStatus = "none" | "pending" | "approved" | "rejected";

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

export interface PaymentRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planId: PlanId;
  amount: number;
  upiTransactionId: string;
  status: PaymentStatus;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

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
  paymentStatus: PaymentStatus;
  pendingPayment: PaymentRequest | null;
  submitPayment: (planId: PlanId, amount: number, upiTransactionId: string) => void;
  getPaymentHistory: () => PaymentRequest[];
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<PlanId>("free");
  const [recommendationsUsed, setRecommendationsUsed] = useState(0);
  const [savesUsed, setSavesUsed] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("none");
  const [pendingPayment, setPendingPayment] = useState<PaymentRequest | null>(null);
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

    // Check payment status
    const allPayments = getAllPayments();
    const userId = localStorage.getItem("opp-os-user-email") || "";
    const userPending = allPayments.find(
      (p) => p.userEmail === userId && p.status === "pending"
    );
    const userApproved = allPayments.find(
      (p) => p.userEmail === userId && p.status === "approved"
    );
    if (userPending) {
      setPaymentStatus("pending");
      setPendingPayment(userPending);
    } else if (userApproved) {
      setPaymentStatus("approved");
    } else {
      setPaymentStatus("none");
    }
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

  const getAllPayments = (): PaymentRequest[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("opp-os-payments");
    return data ? JSON.parse(data) : [];
  };

  const saveAllPayments = (payments: PaymentRequest[]) => {
    localStorage.setItem("opp-os-payments", JSON.stringify(payments));
  };

  const submitPayment = (planId: PlanId, amount: number, upiTransactionId: string) => {
    const userStr = localStorage.getItem("opp-os-user");
    const user = userStr ? JSON.parse(userStr) : null;

    const payment: PaymentRequest = {
      id: `pay_${Date.now()}`,
      userId: user?.email || "unknown",
      userName: user?.name || "Unknown",
      userEmail: user?.email || "unknown",
      planId,
      amount,
      upiTransactionId,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };

    const allPayments = getAllPayments();
    allPayments.push(payment);
    saveAllPayments(allPayments);

    setPaymentStatus("pending");
    setPendingPayment(payment);
    localStorage.setItem("opp-os-user-email", user?.email || "");
  };

  const getPaymentHistory = (): PaymentRequest[] => {
    return getAllPayments();
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
        paymentStatus,
        pendingPayment,
        submitPayment,
        getPaymentHistory,
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
