"use client";

import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerChildren, StaggerItem, FloatingElement } from "@/components/ui/animations";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles, Target, Calendar, Route, Search, Users, User, ArrowRight, Check,
  Star, Zap, Trophy, Rocket, Brain, Shield, Clock, Globe, GraduationCap,
  ChevronRight, Play, ArrowUpRight, TrendingUp, BookOpen, Award, Flame,
  Lightbulb, Compass, Heart, Code2, Palette, BarChart3, Briefcase, Gift,
  Sparkle,
} from "lucide-react";

const features = [
  { icon: Brain, title: "AI Match Score", description: "Every opportunity scored 0-100 based on your unique profile, skills, and goals", color: "from-violet-500 to-purple-500" },
  { icon: Target, title: "Smart Profile Builder", description: "Tell us about yourself and get hyper-personalized recommendations that actually matter", color: "from-indigo-500 to-blue-500" },
  { icon: Route, title: "AI Roadmap Generator", description: "Get detailed 3-month, 1-year, and 3-year career roadmaps tailored to your goals", color: "from-blue-500 to-cyan-500" },
  { icon: Calendar, title: "Deadline Tracker", description: "Never miss a deadline with countdown timers, reminders, and priority alerts", color: "from-amber-500 to-orange-500" },
  { icon: Search, title: "Advanced Search Engine", description: "Filter by category, location, age, budget, mode, and 20+ criteria", color: "from-emerald-500 to-teal-500" },
  { icon: Users, title: "Student Community", description: "Share experiences, ask questions, and learn from peers who've been there", color: "from-rose-500 to-pink-500" },
];

const stats = [
  { value: "1,200+", label: "Opportunities Listed", icon: Compass },
  { value: "3,400+", label: "Students Registered", icon: Users },
  { value: "₹18L+", label: "Scholarships Found", icon: Award },
  { value: "78%", label: "Get a Response", icon: TrendingUp },
];

const testimonials = [
  {
    name: "Kavya Nair",
    role: "2nd year CSE, NIT Calicut",
    content: "honestly i almost missed the KVPY deadline last year. a friend sent me the link to this platform and the deadline tracker reminded me 10 days before. applied on time and got the fellowship. not even kidding this thing works",
    rating: 5,
    initials: "KN",
  },
  {
    name: "Tushar Gupta",
    role: "BBA, Delhi University",
    content: "i was just randomly browsing and found a startup incubation program at IIT Delhi that i had no idea about. applied on a whim, got selected, and now we're building our MVP. the AI score said 91% match and i thought it was inflated but they were right lol",
    rating: 5,
    initials: "TG",
  },
  {
    name: "Sneha Reddy",
    role: "12th class, Hyderabad",
    content: "my parents kept telling me to find scholarships but i never knew where to look. this platform showed me 4 scholarships i was eligible for in my state alone. i applied to all of them and got one worth ₹75,000. my mom was so happy she cried",
    rating: 5,
    initials: "SR",
  },
];

const opportunityCategories = [
  { icon: GraduationCap, label: "Scholarships", count: "340+", color: "text-violet-600 bg-violet-50 dark:bg-violet-500/10" },
  { icon: Briefcase, label: "Internships", count: "280+", color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10" },
  { icon: Code2, label: "Hackathons", count: "90+", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" },
  { icon: Trophy, label: "Competitions", count: "150+", color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10" },
  { icon: Rocket, label: "Startup Programs", count: "45+", color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10" },
  { icon: Globe, label: "Fellowships", count: "60+", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10" },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-4xl mt-16">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-purple-600/20 blur-3xl rounded-full" />

      {/* Dashboard Preview */}
      <div className="relative rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/80 shadow-2xl shadow-zinc-200/50 dark:shadow-zinc-900/50 overflow-hidden backdrop-blur-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-800/30">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 text-xs text-zinc-500 font-mono">
              opportunityos.in/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Match Score", value: "87", icon: "🎯", color: "text-violet-600" },
              { label: "Saved", value: "24", icon: "📌", color: "text-blue-600" },
              { label: "Applied", value: "8", icon: "✅", color: "text-emerald-600" },
              { label: "Deadlines", value: "5", icon: "⏰", color: "text-amber-600" },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <div className="text-lg mb-1">{stat.icon}</div>
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-[10px] text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Opportunity cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Google Summer of Code 2026", score: 92, category: "Internship", deadline: "15 days" },
              { title: "Smart India Hackathon", score: 88, category: "Hackathon", deadline: "28 days" },
              { title: "KVPY Fellowship", score: 85, category: "Fellowship", deadline: "42 days" },
              { title: "Adobe Creative Residency", score: 78, category: "Fellowship", deadline: "8 days" },
            ].map((opp) => (
              <div key={opp.title} className="p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 hover:border-violet-200 dark:hover:border-violet-500/30 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800">{opp.category}</span>
                  <span className="text-[11px] font-bold text-emerald-600">{opp.score}%</span>
                </div>
                <div className="text-xs font-semibold mb-1 truncate">{opp.title}</div>
                <div className="text-[10px] text-zinc-500">{opp.deadline} left</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <FloatingElement className="absolute -top-4 -right-4 hidden lg:block" delay={0}>
        <div className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-[11px] font-bold">+12 new matches</div>
            <div className="text-[10px] text-zinc-500">Just now</div>
          </div>
        </div>
      </FloatingElement>

      <FloatingElement className="absolute -bottom-4 -left-4 hidden lg:block" delay={1.5}>
        <div className="px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-lg flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
            <Award className="h-4 w-4 text-violet-500" />
          </div>
          <div>
            <div className="text-[11px] font-bold">Scholarship Found!</div>
            <div className="text-[10px] text-zinc-500">₹2.5L match</div>
          </div>
        </div>
      </FloatingElement>
    </div>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{label}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/15 dark:bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/15 dark:bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pt-28 sm:pb-12">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <Badge variant="glow" size="md" className="px-4 py-1.5">
                  <Sparkle className="h-3.5 w-3.5" />
                  AI-Powered Opportunity Discovery for India
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                Never miss a{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    life-changing
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="300" y2="0">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{" "}
                opportunity
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Your personal opportunity command center. AI-matched scholarships, internships,
                hackathons, and competitions — personalized for your profile.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <Link href="/signup">
                  <Button size="lg" variant="glow" className="text-base px-8 py-3 rounded-xl">
                    Start Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#features">
                  <Button variant="outline" size="lg" className="text-base px-8 py-3 rounded-xl">
                    <Play className="h-4 w-4" />
                    See How It Works
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-2"
              >
                <Shield className="h-3.5 w-3.5 text-emerald-500" />
                Free forever · No credit card required · 3,400+ students already here
              </motion.p>
            </div>
          </ScrollReveal>

          <HeroVisual />
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="py-12 border-y border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/80 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-6 uppercase tracking-wider">
            Trusted by students from
          </p>
          <div className="flex items-center justify-center flex-wrap gap-8 opacity-40">
            {["IIT Bombay", "IIT Delhi", "IISc Bangalore", "BITS Pilani", "NIT Trichy", "IIIT Hyderabad"].map((name) => (
              <span key={name} className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <AnimatedCounter value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Opportunity Categories */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge variant="info" size="md" className="mb-4">
                <Compass className="h-3.5 w-3.5" />
                Categories
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Discover opportunities across every field
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                From scholarships to startup programs, we cover the widest range of opportunities for Indian students.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {opportunityCategories.map((cat) => (
              <StaggerItem key={cat.label}>
                <Card hover className="text-center">
                  <CardContent className="p-5">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl mb-3 ${cat.color}`}>
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{cat.label}</h3>
                    <p className="text-xs text-zinc-500">{cat.count} listed</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="glow" size="md" className="mb-4">
                <Zap className="h-3.5 w-3.5" />
                Powerful Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Everything you need to find opportunities
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Our platform combines AI technology with a comprehensive database to bring
                you the most relevant opportunities, matched to your unique profile.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card hover className="h-full card-shine">
                  <CardContent className="p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-200/50 dark:border-zinc-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="success" size="md" className="mb-4">
                <Rocket className="h-3.5 w-3.5" />
                Simple Process
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Three steps to your future
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Get started in minutes and discover opportunities you never knew existed.
              </p>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Build Your Profile",
                desc: "Tell us about your skills, interests, goals, and background. Takes just 2 minutes.",
                icon: User,
                color: "from-violet-500 to-indigo-500",
              },
              {
                step: "02",
                title: "Get AI-Matched",
                desc: "Our AI scores and recommends opportunities tailored specifically to your profile.",
                icon: Target,
                color: "from-indigo-500 to-blue-500",
              },
              {
                step: "03",
                title: "Apply & Track",
                desc: "Save opportunities, track deadlines, and manage your applications in one place.",
                icon: Rocket,
                color: "from-blue-500 to-cyan-500",
              },
            ].map((item, i) => (
              <StaggerItem key={item.step} className="relative">
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-xl`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%]">
                    <svg viewBox="0 0 100 20" className="w-full h-5 text-zinc-300 dark:text-zinc-700">
                      <path d="M0 10 H85 M80 5 L90 10 L80 15" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge variant="warning" size="md" className="mb-4">
                <Heart className="h-3.5 w-3.5" />
                Loved by Students
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Join 3,400+ students who found their path
              </h2>
            </div>
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                      &ldquo;{t.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs font-bold">
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-zinc-500">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
              <div className="relative px-8 py-16 sm:px-16 sm:py-20 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Your future starts with one click
                  </h2>
                  <p className="text-lg text-violet-100 mb-8 max-w-xl mx-auto">
                    Join 3,400+ students who are already using Opportunity OS to
                    discover their next big break. Start free today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/signup">
                      <Button size="lg" className="bg-white text-violet-700 hover:bg-violet-50 text-base px-8 py-3 rounded-xl shadow-xl">
                        Get Started Free
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 text-base px-8 py-3 rounded-xl">
                        View Pricing
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
