"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { usePlan, type PlanId } from "@/hooks/use-plan";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/animations";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Copy,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Shield,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const planDetails: Record<PlanId, { name: string; price: number; period: string }> = {
  free: { name: "Explorer", price: 0, period: "" },
  trial: { name: "Trial Pass", price: 30, period: "/first month" },
  pathfinder: { name: "Pathfinder", price: 599, period: "/year" },
  navigator: { name: "Navigator", price: 799, period: "/year" },
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const planId = (searchParams.get("plan") || "trial") as PlanId;
  const { submitPayment, paymentStatus, pendingPayment, setPlan } = usePlan();
  const [upiTxId, setUpiTxId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const details = planDetails[planId] || planDetails.trial;
  const upiId = "aayanc@fam";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    setError("");
    if (!upiTxId.trim()) {
      setError("Please enter the UPI transaction ID");
      return;
    }
    if (upiTxId.trim().length < 6) {
      setError("Transaction ID must be at least 6 characters");
      return;
    }
    submitPayment(planId, details.price, upiTxId.trim());
    setSubmitted(true);
  };

  // If already has pending/approved payment
  if (paymentStatus === "pending" || submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="border-amber-200 dark:border-amber-500/20">
              <CardContent className="p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-500/10 mx-auto mb-4">
                  <Clock className="h-8 w-8 text-amber-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment Pending</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                  Your payment is being verified by our team. This usually takes 1-2 hours.
                </p>
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Plan</span>
                    <span className="font-medium">{details.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Amount</span>
                    <span className="font-medium">₹{details.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Transaction ID</span>
                    <span className="font-medium font-mono text-xs">{pendingPayment?.upiTransactionId || upiTxId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Status</span>
                    <Badge variant="warning" size="sm">Under Review</Badge>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 mb-4">
                  You&apos;ll get access within 1-2 hours after verification. Check your email for updates.
                </p>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (paymentStatus === "approved") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md"
          >
            <Card className="border-emerald-200 dark:border-emerald-500/20">
              <CardContent className="p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Payment Approved!</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                  Your premium plan is now active. Enjoy all the features!
                </p>
                <Link href="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    Go to Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-lg">
          <Link href="/pricing" className="inline-flex items-center gap-2 mb-6 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Pricing
          </Link>

          <ScrollReveal>
            <Card className="border-0 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:border dark:border-zinc-800">
              <CardContent className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <Badge variant="glow" size="md" className="mb-3">
                    <Sparkles className="h-3 w-3" />
                    Upgrade to {details.name}
                  </Badge>
                  <h1 className="text-2xl font-bold">Complete Payment</h1>
                  <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                    Pay ₹{details.price}{details.period} via UPI
                  </p>
                </div>

                {/* UPI Details */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-500/5 dark:to-indigo-500/5 border border-violet-200/50 dark:border-violet-500/10 mb-6">
                  <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                    Send payment to this UPI ID:
                  </p>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex-1">
                      <p className="text-xl font-bold font-mono tracking-wide text-violet-600 dark:text-violet-400">
                        {upiId}
                      </p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-all",
                        copied
                          ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                      )}
                    >
                      {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-white/60 dark:bg-zinc-900/60 border border-violet-100 dark:border-violet-500/10">
                    <p className="text-sm">
                      <span className="text-zinc-500">Amount: </span>
                      <span className="font-bold text-lg">₹{details.price}</span>
                    </p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">How to pay:</h3>
                  <div className="space-y-2">
                    {[
                      "Open any UPI app (Google Pay, PhonePe, Paytm, etc.)",
                      `Send ₹${details.price} to UPI ID: ${upiId}`,
                      "Copy the UPI Transaction ID from your app",
                      "Paste it below and submit",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transaction ID Input */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">UPI Transaction ID</label>
                  <input
                    type="text"
                    placeholder="e.g., 304512345678"
                    value={upiTxId}
                    onChange={(e) => setUpiTxId(e.target.value)}
                    className="w-full h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all font-mono"
                  />
                  <p className="text-[11px] text-zinc-400">
                    Found in your UPI app after payment (usually 12-digit number)
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 mb-4"
                  >
                    <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
                    <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
                  </motion.div>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  size="lg"
                >
                  Submit Payment
                </Button>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified by admin
                  </span>
                  <span>•</span>
                   <span>1-2 hour verification</span>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500">Loading payment page...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
