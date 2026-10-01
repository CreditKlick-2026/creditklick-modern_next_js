import React from "react";
import { MessageSquare, BookOpen, TrendingUp, Users, LucideIcon } from "lucide-react";

export interface AppFeatureItem {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
}

export const FEATURES: readonly AppFeatureItem[] = [
  {
    step: "01",
    title: "Easy Communication",
    description:
      "Connect directly with certified financial advisors for personalized 1-on-1 debt guidance and rapid resolution.",
    icon: MessageSquare,
    tag: "Direct Support",
  },
  {
    step: "02",
    title: "Resource Hub",
    description:
      "Access curated credit masterclasses, dispute templates, and debt settlement legal guides whenever you need.",
    icon: BookOpen,
    tag: "Self-Paced Guides",
  },
  {
    step: "03",
    title: "Real Time Financial Insights",
    description:
      "Track your score trajectory, debt-to-income ratio, and monthly payment milestones with live analytics.",
    icon: TrendingUp,
    tag: "Live Analytics",
  },
  {
    step: "04",
    title: "Community Forum",
    description:
      "Share proven strategies, celebrate debt-free milestones, and get inspired by thousands on the same path.",
    icon: Users,
    tag: "Peer Network",
  },
] as const;
