"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Lock, Sparkles, ArrowRight } from "lucide-react";

interface UpgradePromptProps {
  feature: string;
  description?: string;
}

export default function UpgradePrompt({ feature, description }: UpgradePromptProps) {
  return (
    <Card className="border-violet-200 dark:border-violet-500/20 bg-gradient-to-br from-violet-50/50 to-indigo-50/50 dark:from-violet-500/5 dark:to-indigo-500/5">
      <CardContent className="p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/10 mx-auto mb-4">
          <Lock className="h-6 w-6 text-violet-500" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
          {description || `Upgrade to a paid plan to unlock ${feature.toLowerCase()}`}
        </p>
        <Link href="/pricing">
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
            <Sparkles className="h-4 w-4 mr-2" />
            View Plans
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
