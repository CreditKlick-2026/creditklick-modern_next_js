import { ShieldCheck, Zap, CreditCard as CreditCardIcon, TrendingUp } from "lucide-react";

export type EcosystemTab = "score" | "loans" | "cards" | "refine";

export const ECOSYSTEM_TABS = [
  { id: "score", label: "Bureau Credit Score", icon: ShieldCheck },
  { id: "loans", label: "Instant Loans ₹25L", icon: Zap },
  { id: "cards", label: "3D Titanium Cards", icon: CreditCardIcon },
  { id: "refine", label: "Score Refine Engine", icon: TrendingUp },
] as const;

export const SCORE_TIERS = [
  { min: 780, label: "Prime Elite", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { min: 720, label: "Excellent", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  { min: 650, label: "Good", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" },
  { min: 0, label: "Needs Improvement", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
];

export const SIMULATOR_PERKS = [
  "Pre-Approved ₹25L Loan",
  "0% Forex Credit Cards",
  "Lowest 10.49% Interest",
  "Free Monthly Updates",
];

export const PARTNER_BANKS = [
  { bank: "HDFC Bank", match: "99% Approval Odds", badge: "Pre-Approved", rate: "10.49%" },
  { bank: "ICICI Bank", match: "97% Instant Match", badge: "2-Hr Disbursal", rate: "10.65%" },
  { bank: "State Bank of India", match: "Lowest Home Loan", badge: "Govt. Backed", rate: "8.40%" },
  { bank: "Axis Bank", match: "Zero Paperwork", badge: "e-KYC Ready", rate: "10.75%" },
];

export const AUDIT_STEPS = [
  {
    num: 1,
    title: "Automated Bureau Data Audit",
    desc: "Scan for mismatched addresses, erroneous write-offs, and wrongful DPB flags.",
  },
  {
    num: 2,
    title: "Formal Dispute Escalation",
    desc: "Section 17 Dispute filed directly with CRIF, Experian & Member Banks.",
  },
  {
    num: 3,
    title: "Negative Remark Purged (+165 Pts)",
    desc: "Official bureau score updated and clean credit certificate issued.",
    customBg: "#d1fae5",
    customColor: "#065f46",
  },
];

export const TRAJECTORY_BARS = [
  { day: "Day 1", pct: 30, val: "610" },
  { day: "Day 10", pct: 38, val: "628" },
  { day: "Day 20", pct: 48, val: "655" },
  { day: "Day 30", pct: 64, val: "695" },
  { day: "Day 40", pct: 82, val: "740" },
  { day: "Day 45", pct: 100, val: "775" },
];
