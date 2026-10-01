import React from "react";
import {
  DebtCounselingIcon,
  FinancialEmpowermentIcon,
  DfiForumIcon,
  DebtManagementIcon,
  LegalSolutionsIcon,
  CustomerPortalIcon,
} from "./services.icons";

export interface ServiceNode {
  title: string;
  desc: string;
  href: string;
  tag: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  iconBg: string;
}

// Left nodes (Advisory, Planning & Management)
export const LEFT_NODES: readonly ServiceNode[] = [
  {
    title: "Debt Counseling",
    desc: "Personalized advice to navigate challenges & make informed decisions.",
    href: "/contact",
    tag: "1-on-1 Session",
    Icon: DebtCounselingIcon,
    iconColor: "#2563eb",
    iconBg: "rgba(37, 99, 235, 0.08)",
  },
  {
    title: "Debt Management",
    desc: "Customized plans consolidating EMIs into a single monthly payment.",
    href: "/contact",
    tag: "Lower Interest",
    Icon: DebtManagementIcon,
    iconColor: "#d97706",
    iconBg: "rgba(217, 119, 6, 0.08)",
  },
  {
    title: "Financial Empowerment",
    desc: "Literacy programs to regain control & achieve lasting stability.",
    href: "/blog",
    tag: "Free Modules",
    Icon: FinancialEmpowermentIcon,
    iconColor: "#059669",
    iconBg: "rgba(5, 150, 105, 0.08)",
  },
  {
    title: "Credit Refine",
    desc: "Algorithmic bureau dispute resolution to rebuild credit score.",
    href: "/refine",
    tag: "Score Audit",
    Icon: CustomerPortalIcon,
    iconColor: "#dc2626",
    iconBg: "rgba(220, 38, 38, 0.08)",
  },
] as const;

// Right nodes (Legal, Support & Ecosystem)
export const RIGHT_NODES: readonly ServiceNode[] = [
  {
    title: "Legal Debt Solutions",
    desc: "Protecting rights & negotiating with creditors to eliminate stress.",
    href: "/register-complaint",
    tag: "Anti-Harassment",
    Icon: LegalSolutionsIcon,
    iconColor: "#e11d48",
    iconBg: "rgba(225, 29, 72, 0.08)",
  },
  {
    title: "Customer App / Portal",
    desc: "Easy 24/7 access to resources & live debt resolution tracking.",
    href: "/login",
    tag: "Real-Time Tracking",
    Icon: CustomerPortalIcon,
    iconColor: "#7c3aed",
    iconBg: "rgba(124, 58, 237, 0.08)",
  },
  {
    title: "Community Forum",
    desc: "Community platform for sharing experiences & debt management insights.",
    href: "/blog",
    tag: "Peer Community",
    Icon: DfiForumIcon,
    iconColor: "#0891b2",
    iconBg: "rgba(8, 145, 178, 0.08)",
  },
  {
    title: "Repayment Calculators",
    desc: "Interactive financial tools to plan loan settlements & timelines.",
    href: "/calculators",
    tag: "EMI Simulator",
    Icon: DebtManagementIcon,
    iconColor: "#0d9488",
    iconBg: "rgba(13, 148, 136, 0.08)",
  },
] as const;
