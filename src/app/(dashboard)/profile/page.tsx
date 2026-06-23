"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollReveal } from "@/components/ui/animations";
import { skills, interests, careerGoals, states } from "@/data/opportunities";
import { cn } from "@/lib/utils";
import {
  User,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Calendar,
  BookOpen,
  Clock,
  Globe,
  Save,
} from "lucide-react";

const steps = [
  { id: 1, label: "Basic Info", icon: User },
  { id: 2, label: "Skills", icon: Sparkles },
  { id: 3, label: "Goals", icon: Target },
  { id: 4, label: "Review", icon: CheckCircle2 },
];

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState(500);
  const [availableHours, setAvailableHours] = useState(20);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <ScrollReveal>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            Profile Builder <User className="h-6 w-6 text-violet-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Complete your profile to get personalized AI recommendations
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-1.5 relative z-10">
                <motion.div
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                    backgroundColor: currentStep >= step.id ? "rgb(124 58 237)" : "rgb(228 228 231)",
                  }}
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    currentStep >= step.id
                      ? "text-white shadow-lg shadow-violet-500/25"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </motion.div>
                <span className={cn(
                  "text-[11px] font-medium hidden sm:block",
                  currentStep === step.id ? "text-violet-600 dark:text-violet-400" : "text-zinc-400"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-violet-500" /> Basic Information
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Tell us about yourself to get started
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Age</label>
                    <input
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Class / Year</label>
                    <input
                      type="text"
                      placeholder="e.g., 12th / 2nd Year"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5" /> Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> State
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                      {states.map((s) => (
                        <button
                          key={s}
                          onClick={() => setState(s)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all",
                            state === s
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
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-violet-500" /> Skills
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Select your skills ({selectedSkills.length} selected)
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <motion.button
                        key={skill}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSkill(skill)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                          selectedSkills.includes(skill)
                            ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/25"
                            : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-violet-300"
                        )}
                      >
                        {selectedSkills.includes(skill) && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                        {skill}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-violet-500" /> Interests
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    What topics interest you? ({selectedInterests.length} selected)
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <motion.button
                        key={interest}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleInterest(interest)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                          selectedInterests.includes(interest)
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25"
                            : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-indigo-300"
                        )}
                      >
                        {selectedInterests.includes(interest) && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                        {interest}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-violet-500" /> Career Goals
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Select your target career paths
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {careerGoals.map((goal) => (
                      <motion.button
                        key={goal}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleGoal(goal)}
                        className={cn(
                          "px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left",
                          selectedGoals.includes(goal)
                            ? "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-300 dark:border-violet-500/30"
                            : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300"
                        )}
                      >
                        {selectedGoals.includes(goal) && <CheckCircle2 className="h-3 w-3 inline mr-1 text-violet-500" />}
                        {goal}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> Monthly Budget
                      </label>
                      <Badge variant="glow" size="sm">?{budget}</Badge>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-violet-600"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                      <span>?0</span>
                      <span>?5000+</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-medium flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> Hours / Week
                      </label>
                      <Badge variant="info" size="sm">{availableHours}h</Badge>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={availableHours}
                      onChange={(e) => setAvailableHours(Number(e.target.value))}
                      className="w-full accent-violet-600"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                      <span>1h</span>
                      <span>60h</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Review Your Profile
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Make sure everything looks good before saving
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Name</span>
                    <p className="text-sm font-medium mt-0.5">{name || "Not set"}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Age</span>
                    <p className="text-sm font-medium mt-0.5">{age || "Not set"}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Class</span>
                    <p className="text-sm font-medium mt-0.5">{className || "Not set"}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Location</span>
                    <p className="text-sm font-medium mt-0.5">{state || "Not set"}, {country}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Skills ({selectedSkills.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedSkills.length > 0 ? selectedSkills.map((s) => (
                      <Badge key={s} variant="info" size="sm">{s}</Badge>
                    )) : <p className="text-sm text-zinc-400">None selected</p>}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Interests ({selectedInterests.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedInterests.length > 0 ? selectedInterests.map((i) => (
                      <Badge key={i} variant="glow" size="sm">{i}</Badge>
                    )) : <p className="text-sm text-zinc-400">None selected</p>}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Career Goals ({selectedGoals.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedGoals.length > 0 ? selectedGoals.map((g) => (
                      <Badge key={g} variant="success" size="sm">{g}</Badge>
                    )) : <p className="text-sm text-zinc-400">None selected</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Budget</span>
                    <p className="text-sm font-medium mt-0.5">?{budget}/month</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Availability</span>
                    <p className="text-sm font-medium mt-0.5">{availableHours}h/week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <ScrollReveal delay={0.1}>
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Step {currentStep} of {steps.length}</span>
          </div>
          {currentStep < steps.length ? (
            <Button
              variant="primary"
              onClick={() => setCurrentStep((s) => Math.min(steps.length, s + 1))}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="glow">
              <Save className="h-4 w-4" /> Save Profile
            </Button>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
