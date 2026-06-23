"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { type PaymentRequest } from "@/hooks/use-plan";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { cn } from "@/lib/utils";
import {
  Shield,
  Users,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  LogOut,
  CreditCard,
  RefreshCw,
} from "lucide-react";

export default function AdminPage() {
  const { isAdmin, adminUser, logout } = useAdminAuth();
  const router = useRouter();
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [users, setUsers] = useState<Record<string, { name: string; email: string; password: string }>>({});

  useEffect(() => {
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [isAdmin, router]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const paymentsData = localStorage.getItem("opp-os-payments");
    setPayments(paymentsData ? JSON.parse(paymentsData) : []);

    const usersData = localStorage.getItem("opp-os-users");
    setUsers(usersData ? JSON.parse(usersData) : {});
  };

  const handleApprove = (paymentId: string) => {
    const allPayments = payments.map((p) =>
      p.id === paymentId
        ? { ...p, status: "approved" as const, reviewedAt: new Date().toISOString(), reviewedBy: adminUser || "admin" }
        : p
    );
    localStorage.setItem("opp-os-payments", JSON.stringify(allPayments));

    const payment = allPayments.find((p) => p.id === paymentId);
    if (payment) {
      localStorage.setItem("opp-os-plan", payment.planId);
    }

    setPayments(allPayments);
  };

  const handleReject = (paymentId: string) => {
    const allPayments = payments.map((p) =>
      p.id === paymentId
        ? { ...p, status: "rejected" as const, reviewedAt: new Date().toISOString(), reviewedBy: adminUser || "admin" }
        : p
    );
    localStorage.setItem("opp-os-payments", JSON.stringify(allPayments));
    setPayments(allPayments);
  };

  const pendingPayments = payments.filter((p) => p.status === "pending");
  const approvedPayments = payments.filter((p) => p.status === "approved");
  const rejectedPayments = payments.filter((p) => p.status === "rejected");
  const totalRevenue = approvedPayments.reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: "Total Users",
      value: String(Object.keys(users).length),
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      label: "Pending Payments",
      value: String(pendingPayments.length),
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      label: "Approved",
      value: String(approvedPayments.length),
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      label: "Revenue",
      value: `₹${totalRevenue}`,
      icon: TrendingUp,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-50 dark:bg-violet-500/10",
    },
  ];

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
          <Button variant="outline" size="sm" onClick={loadData}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={() => { logout(); router.push("/admin/login"); }}>
            <LogOut className="h-4 w-4 mr-1" />
            Logout
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
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      {/* Pending Payment Approvals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-amber-500" />
            Pending Payment Approvals ({pendingPayments.length})
          </h2>
        </CardHeader>
        <CardContent>
          {pendingPayments.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-500">No pending payments to review</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold">{payment.userName}</h3>
                      <Badge variant="warning" size="sm">Pending</Badge>
                    </div>
                    <p className="text-xs text-zinc-500 mb-1">{payment.userEmail}</p>
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span>Plan: <span className="font-medium text-zinc-700 dark:text-zinc-300 capitalize">{payment.planId}</span></span>
                      <span>Amount: <span className="font-medium text-zinc-700 dark:text-zinc-300">₹{payment.amount}</span></span>
                      <span>Txn: <span className="font-mono text-zinc-700 dark:text-zinc-300">{payment.upiTransactionId}</span></span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1">
                      Requested: {new Date(payment.requestedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      onClick={() => handleApprove(payment.id)}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-500/10"
                      onClick={() => handleReject(payment.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
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
            Registered Users ({Object.keys(users).length})
          </h2>
        </CardHeader>
        <CardContent>
          {Object.keys(users).length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-8 w-8 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-zinc-500">No users yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.values(users).map((user) => {
                const userPayment = payments.find((p) => p.userEmail === user.email && p.status === "approved");
                return (
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
                      <Badge variant={userPayment ? "success" : "default"} size="sm">
                        {userPayment ? `Paid ${userPayment.planId}` : "Free"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
