"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/hooks/use-auth";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Code,
  Palette,
  Building2,
  FlaskConical,
  BookOpen,
  TrendingUp,
  Search,
  Trophy,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
} from "lucide-react";

const steps = [
  { id: 1, title: "What are you studying?", icon: GraduationCap },
  { id: 2, title: "Your year of study", icon: BookOpen },
  { id: 3, title: "What interests you?", icon: Sparkles },
  { id: 4, title: "What are you looking for?", icon: Search },
  { id: 5, title: "Where are you based?", icon: MapPin },
  { id: 6, title: "Your career goal", icon: TrendingUp },
];

const courses = [
  { id: "btech", label: "B.Tech / B.E.", icon: Code },
  { id: "bsc", label: "B.Sc", icon: FlaskConical },
  { id: "bcom", label: "B.Com / BBA", icon: Building2 },
  { id: "ba", label: "BA / BFA", icon: Palette },
  { id: "mbbs", label: "MBBS / BDS", icon: GraduationCap },
  { id: "llb", label: "LLB / LAW", icon: BookOpen },
  { id: "mba", label: "MBA / PGDM", icon: Building2 },
  { id: "mtech", label: "M.Tech / MS", icon: Code },
  { id: "phd", label: "PhD / Research", icon: FlaskConical },
  { id: "diploma", label: "Diploma", icon: BookOpen },
  { id: "school", label: "School (11th/12th)", icon: GraduationCap },
  { id: "other", label: "Other", icon: BookOpen },
];

const years = [
  { id: "1st", label: "1st Year" },
  { id: "2nd", label: "2nd Year" },
  { id: "3rd", label: "3rd Year" },
  { id: "4th", label: "4th Year" },
  { id: "5th", label: "5th Year" },
  { id: "graduated", label: "Graduated" },
  { id: "working", label: "Working Professional" },
];

const interests = [
  { id: "tech", label: "Technology & Programming", icon: Code },
  { id: "design", label: "Design & Creative", icon: Palette },
  { id: "business", label: "Business & Startup", icon: Building2 },
  { id: "research", label: "Research & Science", icon: FlaskConical },
  { id: "arts", label: "Arts & Humanities", icon: BookOpen },
  { id: "sports", label: "Sports & Fitness", icon: Trophy },
  { id: "social", label: "Social Impact & NGOs", icon: TrendingUp },
  { id: "finance", label: "Finance & Banking", icon: Building2 },
  { id: "media", label: "Media & Communication", icon: Palette },
  { id: "health", label: "Healthcare & Medicine", icon: GraduationCap },
];

const opportunities = [
  { id: "scholarships", label: "Scholarships & Grants", icon: Trophy },
  { id: "internships", label: "Internships", icon: Building2 },
  { id: "hackathons", label: "Hackathons & Coding", icon: Code },
  { id: "competitions", label: "Competitions & Olympiads", icon: Trophy },
  { id: "courses", label: "Courses & Certifications", icon: BookOpen },
  { id: "events", label: "Workshops & Events", icon: Sparkles },
  { id: "jobs", label: "Jobs & Placements", icon: TrendingUp },
  { id: "research", label: "Research Opportunities", icon: FlaskConical },
  { id: "abroad", label: "Study Abroad", icon: MapPin },
  { id: "volunteer", label: "Volunteering", icon: TrendingUp },
];

const locations = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal",
  "Kochi", "Indore", "Nagpur", "Other",
];

const goals = [
  { id: "placement", label: "Get a placement/job", icon: Building2 },
  { id: "higher-studies", label: "Higher studies (MS/MTech/MBA)", icon: GraduationCap },
  { id: "startup", label: "Start my own company", icon: Sparkles },
  { id: "research", label: "Pursue research/PhD", icon: FlaskConical },
  { id: "freelance", label: "Freelance / Remote work", icon: Laptop },
  { id: "abroad", label: "Study/work abroad", icon: MapPin },
  { id: "upskill", label: "Learn new skills", icon: BookOpen },
  { id: "explore", label: "Just exploring options", icon: Search },
];

function Laptop({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeOnboarding } = useUserAuth();
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  if (!user) {
    router.push("/login");
    return null;
  }

  if (user.onboardingComplete) {
    router.push("/dashboard");
    return null;
  }

  const toggleMulti = (id: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(id)) {
      setList(list.filter((i) => i !== id));
    } else {
      setList([...list, id]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedCourse;
      case 2: return !!selectedYear;
      case 3: return selectedInterests.length > 0;
      case 4: return selectedOpportunities.length > 0;
      case 5: return !!selectedLocation;
      case 6: return !!selectedGoal;
      default: return false;
    }
  };

  const handleFinish = () => {
    completeOnboarding({
      course: selectedCourse,
      year: selectedYear,
      interests: selectedInterests,
      lookingFor: selectedOpportunities,
      location: selectedLocation,
      goal: selectedGoal,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Welcome to Opportunity OS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Let&apos;s personalize your experience
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Step {step} of {steps.length}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full"
              animate={{ width: `${(step / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="border-0 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:border dark:border-zinc-800">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                  {steps[step - 1].title}
                </h2>

                {/* Step 1: Course */}
                {step === 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {courses.map((course) => {
                      const Icon = course.icon;
                      return (
                        <button
                          key={course.id}
                          onClick={() => setSelectedCourse(course.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center",
                            selectedCourse === course.id
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-medium">{course.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 2: Year */}
                {step === 2 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {years.map((year) => (
                      <button
                        key={year.id}
                        onClick={() => setSelectedYear(year.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-center font-medium",
                          selectedYear === year.id
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        {year.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 3: Interests */}
                {step === 3 && (
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest) => {
                      const Icon = interest.icon;
                      const selected = selectedInterests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleMulti(interest.id, selectedInterests, setSelectedInterests)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                            selected
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm font-medium">{interest.label}</span>
                          {selected && <Check className="h-4 w-4 ml-auto text-violet-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 4: Opportunities */}
                {step === 4 && (
                  <div className="grid grid-cols-2 gap-3">
                    {opportunities.map((opp) => {
                      const Icon = opp.icon;
                      const selected = selectedOpportunities.includes(opp.id);
                      return (
                        <button
                          key={opp.id}
                          onClick={() => toggleMulti(opp.id, selectedOpportunities, setSelectedOpportunities)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                            selected
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm font-medium">{opp.label}</span>
                          {selected && <Check className="h-4 w-4 ml-auto text-violet-500" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Step 5: Location */}
                {step === 5 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all text-center font-medium",
                          selectedLocation === loc
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 6: Goal */}
                {step === 6 && (
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map((goal) => {
                      const Icon = goal.icon;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setSelectedGoal(goal.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left",
                            selectedGoal === goal.id
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          )}
                        >
                          <Icon className="h-5 w-5 shrink-0" />
                          <span className="text-sm font-medium">{goal.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {step < steps.length ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Start Exploring
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
