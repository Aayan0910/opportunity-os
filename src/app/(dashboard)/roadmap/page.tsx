"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { roadmapData } from "@/data/opportunities";
import { cn } from "@/lib/utils";
import {
  Map,
  Rocket,
  Code,
  FlaskConical,
  Globe,
  Brain,
  ChevronRight,
  CheckCircle2,
  Circle,
  Target,
  Sparkles,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

const careerGoals = [
  { id: "Software Engineer", label: "Software Engineer", icon: Code, color: "from-blue-500 to-cyan-500" },
  { id: "Startup Founder", label: "Startup Founder", icon: Rocket, color: "from-amber-500 to-orange-500" },
  { id: "Data Scientist", label: "Data Scientist", icon: FlaskConical, color: "from-emerald-500 to-teal-500" },
  { id: "Study Abroad", label: "Study Abroad", icon: Globe, color: "from-violet-500 to-purple-500" },
  { id: "AI Engineer", label: "AI Engineer", icon: Brain, color: "from-pink-500 to-rose-500" },
];

const phaseMap: Record<string, string> = {
  "3-Month Roadmap": "3-month",
  "1-Year Roadmap": "1-year",
  "3-Year Roadmap": "3-year",
};

export default function RoadmapPage() {
  const [selectedGoal, setSelectedGoal] = useState("Software Engineer");
  const [activePhase, setActivePhase] = useState("3-month");

  const goalData = roadmapData[selectedGoal as keyof typeof roadmapData] || [];
  const currentPhase = goalData.find((p) => phaseMap[p.phase] === activePhase);

  const selectedGoalMeta = careerGoals.find((g) => g.id === selectedGoal);

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            Career Roadmap <Map className="h-6 w-6 text-violet-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Generate your personalized career roadmap with actionable steps
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <Card>
          <CardHeader>
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-violet-500" /> Choose Your Career Goal
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {careerGoals.map((goal) => {
                const isSelected = selectedGoal === goal.id;
                return (
                  <motion.button
                    key={goal.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSelectedGoal(goal.id);
                      setActivePhase("3-month");
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2.5 p-4 rounded-xl border-2 transition-all duration-200",
                      isSelected
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 shadow-lg shadow-violet-500/10"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                  >
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white", goal.color)}>
                      <goal.icon className="h-6 w-6" />
                    </div>
                    <span className={cn("text-sm font-medium", isSelected ? "text-violet-600 dark:text-violet-400" : "text-zinc-700 dark:text-zinc-300")}>
                      {goal.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        layoutId="goal-indicator"
                        className="h-1 w-8 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-xl w-fit">
          {["3-month", "1-year", "3-year"].map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activePhase === phase
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              {phase === "3-month" ? "3-Month" : phase === "1-year" ? "1-Year" : "3-Year"}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {currentPhase && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedGoal}-${activePhase}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StaggerChildren className="space-y-4">
              {currentPhase.steps.map((step, index) => {
                const stepKey = "month" in step ? step.month : "year" in step ? step.year : `Step ${index + 1}`;
                const tasks = "tasks" in step ? step.tasks : [];
                const progress = Math.min(100, Math.max(10, 100 - index * 25));
                return (
                  <StaggerItem key={`${stepKey}-${index}`}>
                    <Card hover className="relative overflow-hidden">
                      <div
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-1",
                          index === 0 ? "bg-gradient-to-b from-emerald-500 to-emerald-400" :
                          index === currentPhase.steps.length - 1 ? "bg-gradient-to-b from-violet-500 to-indigo-500" :
                          "bg-gradient-to-b from-blue-500 to-cyan-500"
                        )}
                      />
                      <CardContent className="p-5 pl-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-bold",
                              index === 0 ? "bg-emerald-500" :
                              index === currentPhase.steps.length - 1 ? "bg-violet-500" :
                              "bg-blue-500"
                            )}>
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-base">{stepKey}</h3>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {tasks.length} tasks to complete
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant={index === 0 ? "success" : index === currentPhase.steps.length - 1 ? "glow" : "info"}
                            size="sm"
                          >
                            {index === 0 ? "Start Here" : index === currentPhase.steps.length - 1 ? "Final Phase" : `Phase ${index + 1}`}
                          </Badge>
                        </div>

                        <div className="space-y-2.5">
                          {tasks.map((task, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-3 group">
                              <div className="mt-0.5 shrink-0">
                                {index === 0 && tIdx === 0 ? (
                                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                                ) : (
                                  <Circle className="h-4.5 w-4.5 text-zinc-300 dark:text-zinc-600 group-hover:text-violet-400 transition-colors" />
                                )}
                              </div>
                              <span className="text-sm text-zinc-700 dark:text-zinc-300">{task}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <Progress value={progress} max={100} color="gradient" size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerChildren>
          </motion.div>
        </AnimatePresence>
      )}

      <ScrollReveal>
        <Card className="border-violet-200 dark:border-violet-500/20 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-500/5 dark:to-indigo-500/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shrink-0">
                <Lightbulb className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1">Pro Tip</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Complete each phase step by step. Your roadmap progress is tracked automatically.
                  Earn XP and achievements as you complete tasks to level up your profile!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
