"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, StaggerChildren, StaggerItem } from "@/components/ui/animations";
import { pricingPlans, featureComparison } from "@/data/opportunities";
import { cn } from "@/lib/utils";
import { Check, X, Sparkles, Zap, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI payments (Google Pay, PhonePe, Paytm, etc.). Simply click on any paid plan, note the UPI ID shown, and complete the payment through your preferred UPI app.",
  },
  {
    q: "Is there a refund policy?",
    a: "Yes, we offer a 7-day money-back guarantee on all paid plans. No questions asked.",
  },
  {
    q: "What happens when my free plan limits are reached?",
    a: "You'll be prompted to upgrade. Your existing data is preserved, and you can continue using the platform with limited features.",
  },
  {
    q: "Do you offer student discounts?",
    a: "Our Pathfinder plan is already priced affordably for students. We also occasionally run special discounts for early adopters.",
  },
];

function FAQItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 pr-4">
          {faq.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  const handlePayment = async (planId: string, price: number) => {
    if (price === 0) {
      window.location.href = "/signup";
      return;
    }

    setPaymentLoading(planId);

    // Show UPI payment details
    const upiId = "aayanc@fam";
    const amount = price;
    const merchantName = "Opportunity OS";

    // Create UPI payment link
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;

    // Show payment modal with UPI details
    const confirmed = window.confirm(
      `Payment Details:\n\n` +
      `Plan: ${planId.charAt(0).toUpperCase() + planId.slice(1)}\n` +
      `Amount: ₹${amount}\n` +
      `UPI ID: ${upiId}\n` +
      `Merchant: ${merchantName}\n\n` +
      `Click OK to proceed to UPI payment, or Cancel to go back.`
    );

    if (confirmed) {
      // Try to open UPI app
      window.open(upiUrl, "_blank");

      // After payment, redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
    }

    setPaymentLoading(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="glow" size="md" className="mb-4">
              <Zap className="h-3.5 w-3.5" />
              Simple Pricing
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Choose the right plan for you
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include core features to get you started.
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Cards */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20" staggerDelay={0.08}>
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.planId}>
              <Card
                hover
                className={cn(
                  "relative h-full",
                  plan.popular &&
                    "border-violet-500 dark:border-violet-500 shadow-xl shadow-violet-500/10 ring-1 ring-violet-500/20"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-violet-500/30">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">
                      {plan.price === 0 ? "Free" : `₹${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-zinc-500 dark:text-zinc-400 text-sm ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {plan.price === 0 ? (
                    <Link href="/signup" className="mb-6 block">
                      <Button variant={plan.popular ? "glow" : "outline"} className="w-full" size="lg">
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <div className="mb-6">
                      <Button
                        variant={plan.popular ? "glow" : "outline"}
                        className="w-full"
                        size="lg"
                        loading={paymentLoading === plan.planId}
                        onClick={() => handlePayment(plan.planId, plan.price)}
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-2.5 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Excluded */}
                  {plan.excluded.length > 0 && (
                    <ul className="space-y-2.5 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      {plan.excluded.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 shrink-0 mt-0.5">
                            <X className="h-3 w-3 text-zinc-400" />
                          </div>
                          <span className="text-sm text-zinc-400 dark:text-zinc-500">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Feature Comparison Table */}
        <ScrollReveal>
          <div className="mb-20">
            <div className="text-center mb-10">
              <Badge variant="default" size="md" className="mb-4">
                Compare Plans
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Feature-by-feature comparison
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Feature</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-zinc-500">Explorer</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-blue-600 dark:text-blue-400">Trial Pass</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-violet-600 dark:text-violet-400">Pathfinder</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/5 rounded-t-xl">Navigator</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, i) => (
                    <tr key={row.feature} className={cn("border-b border-zinc-100 dark:border-zinc-800/50", i % 2 === 0 && "bg-zinc-50/50 dark:bg-zinc-900/30")}>
                      <td className="py-3 px-4 text-sm font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-sm text-zinc-500">{row.free}</td>
                      <td className="py-3 px-4 text-center text-sm text-blue-600 dark:text-blue-400">{row.trial}</td>
                      <td className="py-3 px-4 text-center text-sm text-violet-600 dark:text-violet-400">{row.pathfinder}</td>
                      <td className="py-3 px-4 text-center text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/5">{row.navigator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <Badge variant="default" size="md" className="mb-4">
                FAQ
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} faq={faq} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </div>
  );
}
