import React from "react";
import {
  Users,
  BadgePercent,
  ShieldCheck,
  Calculator,
  BookOpen,
  Newspaper,
  Zap,
  Percent,
  CreditCard,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

/* ===========================================
   NAVIGATION DATA
   =========================================== */

export const navItems: NavItem[] = [
  {
    label: "Price",
    href: "/price",
  },
  { label: "Credit Refine", href: "/refine" },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "EMI Calculator", href: "/emi" },
      { label: "AU Value Calculator", href: "/calculator/au" },
      { label: "IDFC Value Calculator", href: "/calculator/idfc" },
      { label: "SBI Simply Save", href: "/calculator/sbi-save" },
      { label: "SBI Simply Click", href: "/calculator/sbi-click" },
      { label: "Yes Bank Value", href: "/calculator/yes" },
    ],
  },
];

/* ===========================================
   TICKER ANNOUNCEMENT DATA
   =========================================== */

export const tickerItems = [
  { dot: true, text: "Get Debt Free Today", highlight: "" },
  { dot: true, text: "Free Credit Score Check", highlight: "FREE" },
  { dot: true, text: "Instant Personal Loans", highlight: "" },
  { dot: true, text: "Trusted by", highlight: "2 Lakh+" },
  { dot: true, text: "Customers Across India", highlight: "" },
  { dot: true, text: "Call Us", highlight: "+91 9650 123 456" },
  { dot: true, text: "RBI Registered Partner", highlight: "" },
  { dot: true, text: "Zero Hidden Charges", highlight: "" },
  { dot: true, text: "Debt Settlement", highlight: "₹50K – ₹50L" },
];

/* ===========================================
   SVG ICON HELPERS
   =========================================== */

export function getNavSvgIcon(label: string, className = "w-3.5 h-3.5") {
  switch (label) {
    case "About Us":
      return <Users className={cn(className, "text-blue-600")} />;
    case "Price":
      return <BadgePercent className={cn(className, "text-blue-600")} />;
    case "Credit Refine":
      return <ShieldCheck className={cn(className, "text-blue-600")} />;
    case "Calculators":
      return <Calculator className={cn(className, "text-blue-600")} />;
    case "Blog":
      return <BookOpen className={cn(className, "text-blue-600")} />;
    case "Media":
      return <Newspaper className={cn(className, "text-blue-600")} />;
    default:
      return <Zap className={cn(className, "text-blue-600")} />;
  }
}

export function getSubNavSvgIcon(label: string) {
  switch (label) {
    case "EMI Calculator":
      return {
        icon: <Calculator className="w-4 h-4 text-purple-600" />,
        bg: "bg-purple-50/80 text-purple-600 border border-purple-100",
      };
    case "AU Value Calculator":
      return {
        icon: <Percent className="w-4 h-4 text-indigo-600" />,
        bg: "bg-indigo-50/80 text-indigo-600 border border-indigo-100",
      };
    case "IDFC Value Calculator":
      return {
        icon: <CreditCard className="w-4 h-4 text-cyan-600" />,
        bg: "bg-cyan-50/80 text-cyan-600 border border-cyan-100",
      };
    case "SBI Simply Save":
      return {
        icon: <PiggyBank className="w-4 h-4 text-emerald-600" />,
        bg: "bg-emerald-50/80 text-emerald-600 border border-emerald-100",
      };
    case "SBI Simply Click":
      return {
        icon: <Zap className="w-4 h-4 text-rose-600" />,
        bg: "bg-rose-50/80 text-rose-600 border border-rose-100",
      };
    case "Yes Bank Value":
      return {
        icon: <TrendingUp className="w-4 h-4 text-sky-600" />,
        bg: "bg-sky-50/80 text-sky-600 border border-sky-100",
      };
    default:
      return {
        icon: <Zap className="w-4 h-4 text-blue-600" />,
        bg: "bg-blue-50/80 text-blue-600 border border-blue-100",
      };
  }
}
