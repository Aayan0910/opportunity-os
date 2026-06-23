"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { cn } from "@/lib/utils";
import {
  Shield,
  Users,
  FileText,
  Clock,
  TrendingUp,
  Plus,
  CheckCircle2,
  XCircle,
  LogOut,
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "0",
    change: "No users yet",
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    label: "Opportunities",
    value: "0",
    change: "Add your first one",
    icon: FileText,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    label: "Pending",
    value: "0",
    change: "All clear",
    icon: Clock,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    label: "Revenue",
    value: "₹0",
    change: "No sales yet",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
];

const pendingApprovals: { id: string; title: string; submittedBy: string; category: string; date: string }[] = [];

const recentUsers: { name: string; email: string; plan: string; joined: string }[] = [];

export default function AdminPage() {
  const { isAdmin, adminUser, logout } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4 animate-spin-slow" />
          <p className="text-zinc-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-violet-600" />
            Admin Panel
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Logged in as <span className="font-medium text-zinc-700 dark:text-zinc-300">{adminUser}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => { logout(); router.push("/admin/login"); }}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Opportunity
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.bg)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                  <Badge variant="success" size="sm">{stat.change}</Badge>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              Pending Approvals
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            {pendingApprovals.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">No pending approvals</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.title}</h3>
                      <p className="text-xs text-zinc-500">by {item.submittedBy} · {item.date}</p>
                      <Badge variant="info" size="sm" className="mt-1">{item.category}</Badge>
                    </div>
                    <div className="flex items-center gap-1 ml-3">
                      <button className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"><CheckCircle2 className="h-4 w-4" /></button>
                      <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"><XCircle className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Recent Users
            </h2>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            {recentUsers.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
                <p className="text-sm text-zinc-500">No users yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs font-bold">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{user.name}</h3>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={user.plan === "Pro" ? "success" : user.plan === "Starter" ? "info" : "default"} size="sm">{user.plan}</Badge>
                      <p className="text-[10px] text-zinc-500 mt-1">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
