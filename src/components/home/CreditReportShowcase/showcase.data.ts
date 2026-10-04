import {
  FileSearch,
  Target,
  BellRing,
  Wallet,
  LineChart,
  Headset,
  type LucideIcon,
} from "lucide-react";

export interface SlideData {
  id: string;
  category: string;
  headline: string;
  highlightIcon: LucideIcon;
  highlight: string;
  imageSrc: string;
  points: readonly string[];
}

export const SLIDES: readonly SlideData[] = [
  {
    id: "credit-usage",
    category: "Credit Report",
    headline: "Your credit report, finally in simple language",
    highlightIcon: FileSearch,
    highlight: "No more confusing scores and unclear reports",
    imageSrc: "/images/ScrollerImage/CreditKlick High Usage Dashboard.png",
    points: [
      "Check your credit score instantly and get your full report",
      "Complex credit metrics, explained simply and made actionable",
      "See every loan and card in your name, and dispute any account you never opened",
    ],
  },
  {
    id: "credit-score-dashboard",
    category: "Score Improvement",
    headline: "Improve your credit score in 6–12 months",
    highlightIcon: Target,
    highlight: "A personalised roadmap to a target score of 800+",
    imageSrc: "/images/ScrollerImage/CreditKlick Credit Score Dashboard.png",
    points: [
      "Track task progress and gain up to +25 points",
      "A clear plan: clear overdue dues, pay on time and manage card limits",
      "Avoid random loan applications that add hard inquiries to your report",
    ],
  },
  {
    id: "pending-payments-dashboard",
    category: "Payment Safety",
    headline: "Pending payments & due-date protection",
    highlightIcon: BellRing,
    highlight: "Avoid the 75–100 point drop a late payment can cause",
    imageSrc: "/images/ScrollerImage/CreditKlick Pending Payments Dashboard.png",
    points: [
      "One dashboard for pending dues across HDFC, ICICI, SBI & NBFCs",
      "See exactly how many points are at risk before a penalty hits",
      "Quick payment options, with up to 50% interest savings on settlements",
    ],
  },
  {
    id: "loans-cards-dashboard",
    category: "Credit Portfolio",
    headline: "All your loans & credit cards in one place",
    highlightIcon: Wallet,
    highlight: "Full visibility of active, closed and disputed accounts",
    imageSrc: "/images/ScrollerImage/CreditKlick Loans and Cards Dashboard.png",
    points: [
      "Credit limits, loan amounts and balances at a glance",
      "One-tap dispute for fraudulent accounts or bureau errors",
      "Pre-negotiated settlement offers to close old debts affordably",
    ],
  },
  {
    id: "predicted-score-widget",
    category: "Score Predictor",
    headline: "AI-powered score simulation",
    highlightIcon: LineChart,
    highlight: "Know the score impact before you apply for any loan or card",
    imageSrc: "/images/ScrollerImage/CreditKlick Predicted Credit Score Widget.png",
    points: [
      "Forecast your score over 12, 24 and 36 months",
      "See the exact impact: +92 on a vehicle loan, +68 on a personal loan",
      "Plan your next move with zero hard inquiries on your report",
    ],
  },
  {
    id: "expert-connection-ui",
    category: "Expert Advisory",
    headline: "1-on-1 credit coaching & dispute support",
    highlightIcon: Headset,
    highlight: "Talk directly to certified financial planners",
    imageSrc: "/images/ScrollerImage/CreditKlick Expert Connection UI.png",
    points: [
      "Voice consultations with certified planners, Monday to Saturday",
      "A credit restoration plan built around your finances",
      "Confidential support to stop collection calls and reduce debt stress",
    ],
  },
];
