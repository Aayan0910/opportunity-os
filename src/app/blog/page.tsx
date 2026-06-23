"use client";

import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { cn } from "@/lib/utils";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    slug: "top-scholarships-2026",
    title: "Top 20 Scholarships for Indian Students in 2026",
    excerpt:
      "A comprehensive guide to the best scholarships available for Indian students across all levels of education.",
    category: "Scholarships",
    readTime: "8 min read",
    date: "Jun 15, 2026",
    gradient: "from-violet-500/15 via-indigo-500/10 to-purple-500/15",
  },
  {
    slug: "gsoc-preparation-guide",
    title: "How to Prepare for Google Summer of Code (GSoC)",
    excerpt:
      "Step-by-step guide to getting selected for GSoC, from finding a project to writing a winning proposal.",
    category: "Guide",
    readTime: "12 min read",
    date: "Jun 10, 2026",
    gradient: "from-blue-500/15 via-cyan-500/10 to-sky-500/15",
  },
  {
    slug: "hackathon-tips",
    title: "10 Tips to Win Your Next Hackathon",
    excerpt:
      "Proven strategies from hackathon winners to help you build, pitch, and win every time.",
    category: "Tips",
    readTime: "6 min read",
    date: "Jun 8, 2026",
    gradient: "from-emerald-500/15 via-teal-500/10 to-green-500/15",
  },
  {
    slug: "resume-building-students",
    title: "Resume Building Guide for Students",
    excerpt:
      "How to create a standout resume even with no work experience. Templates and examples included.",
    category: "Career",
    readTime: "10 min read",
    date: "Jun 5, 2026",
    gradient: "from-amber-500/15 via-orange-500/10 to-yellow-500/15",
  },
  {
    slug: "data-science-career-path",
    title: "Data Science Career Path: Complete Roadmap",
    excerpt:
      "Everything you need to know to start a career in data science in 2026, from skills to job hunting.",
    category: "Career",
    readTime: "15 min read",
    date: "Jun 1, 2026",
    gradient: "from-rose-500/15 via-pink-500/10 to-red-500/15",
  },
  {
    slug: "startup-funding-guide",
    title: "Student Startup Funding: Complete Guide",
    excerpt:
      "From college incubators to government grants — all funding options for student startups in India.",
    category: "Startup",
    readTime: "11 min read",
    date: "May 28, 2026",
    gradient: "from-violet-500/15 via-fuchsia-500/10 to-purple-500/15",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="glow" size="md" className="mb-4">
              <BookOpen className="h-3.5 w-3.5" />
              Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Insights & Guides
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Expert advice on scholarships, career growth, and opportunity discovery
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Grid */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <Card hover className="h-full group">
                  <div
                    className={cn(
                      "aspect-video rounded-t-2xl bg-gradient-to-br border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-center relative overflow-hidden",
                      post.gradient
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                    <BookOpen className="h-12 w-12 text-violet-400/40 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="info" className="text-[10px]">
                        {post.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 dark:text-zinc-500">
                        {post.date}
                      </span>
                      <span className="text-xs font-medium text-violet-600 dark:text-violet-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
      <Footer />
    </div>
  );
}


