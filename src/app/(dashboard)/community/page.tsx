"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { communityPosts } from "@/data/opportunities";
import { cn } from "@/lib/utils";
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
  Hash,
  Send,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  Award,
} from "lucide-react";

const trendingTopics = [
  { tag: "GSoC 2026", posts: 124 },
  { tag: "ScholarshipTips", posts: 98 },
  { tag: "HackathonWinners", posts: 87 },
  { tag: "CareerAdvice", posts: 76 },
  { tag: "StudyAbroad", posts: 65 },
];

const topContributors = [
  { name: "Aakash Mehta", initials: "AM", role: "3x GSoC applicant", xp: 2450 },
  { name: "Farhan Khan", initials: "FK", role: "Scholarship nerd", xp: 2100 },
  { name: "Nikhil Joshi", initials: "NJ", role: "Tier-3 to Amazon", xp: 1890 },
  { name: "Prachi Verma", initials: "PV", role: "Adobe Residency '25", xp: 1650 },
  { name: "Riya Deshmukh", initials: "RD", role: "SIH regional winner", xp: 1420 },
];

export default function CommunityPage() {
  const [newPost, setNewPost] = useState("");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <ScrollReveal>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            Community <Users className="h-6 w-6 text-violet-500" />
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Connect, share, and learn from fellow opportunity seekers
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ScrollReveal delay={0.05}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar initials="YO" size="md" />
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your experience, tips, or ask a question..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={3}
                      className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <Badge variant="outline" size="sm" className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <Hash className="h-3 w-3" /> Topic
                        </Badge>
                        <Badge variant="outline" size="sm" className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                          <Sparkles className="h-3 w-3" /> AI Enhance
                        </Badge>
                      </div>
                      <Button variant="primary" size="sm" disabled={!newPost.trim()}>
                        <Send className="h-3.5 w-3.5" /> Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          <StaggerChildren className="space-y-4">
            {communityPosts.map((post) => {
              const isLiked = likedIds.has(post.id);
              return (
                <StaggerItem key={post.id}>
                  <Card hover>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar initials={post.avatar} size="md" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">{post.author}</h3>
                            <span className="text-xs text-zinc-400">{post.timeAgo}</span>
                          </div>
                          <h4 className="font-semibold text-base mt-1">{post.title}</h4>
                        </div>
                        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-3">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-[11px] font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleLike(post.id)}
                          className={cn(
                            "flex items-center gap-1.5 text-sm transition-colors",
                            isLiked ? "text-red-500" : "text-zinc-500 hover:text-red-500"
                          )}
                        >
                          <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                          {post.likes + (isLiked ? 1 : 0)}
                        </motion.button>
                        <button className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-emerald-500 transition-colors">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-violet-500 transition-colors ml-auto">
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>

        <div className="space-y-6">
          <ScrollReveal delay={0.1}>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <h2 className="text-sm font-semibold">Trending Topics</h2>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {trendingTopics.map((topic, i) => (
                  <div key={topic.tag} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors">
                    <span className="text-xs font-bold text-zinc-300 dark:text-zinc-600 w-4">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-violet-600 dark:text-violet-400">#{topic.tag}</span>
                      <p className="text-[11px] text-zinc-400">{topic.posts} posts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <h2 className="text-sm font-semibold">Top Contributors</h2>
              </CardHeader>
              <CardContent className="space-y-3">
                {topContributors.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar initials={c.initials} size="sm" />
                      {i < 3 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-white">
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{c.name}</h4>
                      <p className="text-[11px] text-zinc-400">{c.role}</p>
                    </div>
                    <Badge variant="glow" size="sm">{c.xp} XP</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Card className="border-violet-200 dark:border-violet-500/20 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-500/5 dark:to-indigo-500/5">
              <CardContent className="p-5 text-center">
                <div className="text-3xl mb-2">??</div>
                <h3 className="font-semibold text-sm mb-1">Weekly Challenge</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
                  Share a success story and earn 50 XP!
                </p>
                <Button variant="glow" size="sm" className="w-full">
                  <Sparkles className="h-3.5 w-3.5" /> Join Challenge
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
