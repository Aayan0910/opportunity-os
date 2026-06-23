"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/animations";
import { useUserAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  User,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  BookOpen,
  Save,
  GraduationCap,
  Code,
  Palette,
  Building2,
  FlaskConical,
} from "lucide-react";

const steps = [
  { id: 1, label: "Study", icon: GraduationCap },
  { id: 2, label: "Interests", icon: Sparkles },
  { id: 3, label: "Goals", icon: Target },
  { id: 4, label: "Review", icon: CheckCircle2 },
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
  { id: "working", label: "Working" },
];

const interests = [
  "Technology", "Design", "Business", "Research", "Arts",
  "Sports", "Social Impact", "Finance", "Media", "Healthcare",
];

const goals = [
  "Get a placement", "Higher studies", "Start a company",
  "Pursue research", "Freelance", "Study abroad", "Learn skills", "Exploring",
];

const locations = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Bhopal",
  "Kochi", "Indore", "Nagpur", "Other",
];

function formatCourse(id: string): string {
  return courses.find((c) => c.id === id)?.label || id;
}

function formatYear(id: string): string {
  return years.find((y) => y.id === id)?.label || id;
}

export default function ProfilePage() {
  const { user, updateProfile } = useUserAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedCourse(user.course || "");
      setSelectedYear(user.year || "");
      setSelectedInterests(user.interests || []);
      setSelectedGoals(user.lookingFor || []);
      setSelectedLocation(user.location || "");
    }
  }, [user]);

  const toggleMulti = (id: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(id)) {
      setList(list.filter((i) => i !== id));
    } else {
      setList([...list, id]);
    }
  };

  const handleSave = () => {
    updateProfile({
      course: selectedCourse,
      year: selectedYear,
      interests: selectedInterests,
      lookingFor: selectedGoals,
      location: selectedLocation,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <ScrollReveal>
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
            Your Profile <User className="h-6 w-6 text-violet-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Update your details to get better recommendations
          </p>
        </div>
      </ScrollReveal>

      {/* Step indicators */}
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
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
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
          {/* Step 1: Course & Year */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-violet-500" /> What are you studying?
                </h2>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">Course</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {courses.map((course) => {
                      const Icon = course.icon;
                      return (
                        <button
                          key={course.id}
                          onClick={() => setSelectedCourse(course.id)}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-left text-sm",
                            selectedCourse === course.id
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {course.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Year</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {years.map((year) => (
                      <button
                        key={year.id}
                        onClick={() => setSelectedYear(year.id)}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all text-center text-sm font-medium",
                          selectedYear === year.id
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        {year.label}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Interests */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-violet-500" /> Your Interests
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Select what interests you ({selectedInterests.length} selected)
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <motion.button
                      key={interest}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleMulti(interest, selectedInterests, setSelectedInterests)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                        selectedInterests.includes(interest)
                          ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-500/25"
                          : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-violet-300"
                      )}
                    >
                      {selectedInterests.includes(interest) && <CheckCircle2 className="h-3 w-3 inline mr-1" />}
                      {interest}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Goals & Location */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Target className="h-5 w-5 text-violet-500" /> What are you looking for?
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {goals.map((goal) => (
                      <motion.button
                        key={goal}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleMulti(goal, selectedGoals, setSelectedGoals)}
                        className={cn(
                          "p-3 rounded-xl text-sm font-medium border transition-all text-left",
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

              <Card>
                <CardHeader>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-violet-500" /> Your Location
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setSelectedLocation(loc)}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all text-center text-sm font-medium",
                          selectedLocation === loc
                            ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Review Your Profile
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Name</span>
                    <p className="text-sm font-medium mt-0.5">{user?.name || "Not set"}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Course</span>
                    <p className="text-sm font-medium mt-0.5">{selectedCourse ? formatCourse(selectedCourse) : "Not set"}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Year</span>
                    <p className="text-sm font-medium mt-0.5">{selectedYear ? formatYear(selectedYear) : "Not set"}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Location</span>
                    <p className="text-sm font-medium mt-0.5">{selectedLocation || "Not set"}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Interests ({selectedInterests.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedInterests.length > 0 ? selectedInterests.map((i) => (
                      <Badge key={i} variant="info" size="sm">{i}</Badge>
                    )) : <p className="text-sm text-zinc-400">None selected</p>}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Looking For ({selectedGoals.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedGoals.length > 0 ? selectedGoals.map((g) => (
                      <Badge key={g} variant="glow" size="sm">{g}</Badge>
                    )) : <p className="text-sm text-zinc-400">None selected</p>}
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
            <Button variant="glow" onClick={handleSave}>
              {saved ? (
                <><CheckCircle2 className="h-4 w-4" /> Saved!</>
              ) : (
                <><Save className="h-4 w-4" /> Save Profile</>
              )}
            </Button>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
