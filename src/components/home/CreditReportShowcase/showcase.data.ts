export interface SlideData {
  id: string;
  step: string;
  headline: string;
  badgeEmoji: string;
  badgeText: string;
  badgeClass: string;
  rightColClass: string;
  imageSrc: string;
  points: readonly string[];
}

export function getSlidesData(styles: Record<string, string>): readonly SlideData[] {
  return [
    {
      id: "credit-usage",
      step: "CREDIT UTILIZATION • 01 / 06",
      headline: "Your Credit Report, Finally In Simple Language",
      badgeEmoji: "😮‍💨",
      badgeText: "Confused by generic scores and unclear reports?",
      badgeClass: styles.badgeBlue || "",
      rightColClass: styles.rightColBlue || "",
      imageSrc: "/images/ScrollerImage/CreditKlick High Usage Dashboard.png",
      points: [
        "Check your credit score instantly and get your full report",
        "Complex credit metrics, made simple and actionable",
        "See every loan account and credit card open in your name full visibility of your credit profile, so you can spot an account you never opened and raise a dispute on the spot",
      ],
    },
    {
      id: "credit-score-dashboard",
      step: "SCORE IMPROVEMENT • 02 / 06",
      headline: "Improve Your Credit Score in 6–12 Months",
      badgeEmoji: "🎯",
      badgeText: "Personalized roadmap to reach a target score of 800+",
      badgeClass: styles.badgeBlue || "",
      rightColClass: styles.rightColBlue || "",
      imageSrc: "/images/ScrollerImage/CreditKlick Credit Score Dashboard.png",
      points: [
        "Personalized task progress tracking to boost your score by +25 points",
        "Clear step-by-step action plan: clear overdue dues, pay on time, and manage card limits",
        "Avoid multiple random loan applications that cause hard inquiries on your bureau file",
      ],
    },
    {
      id: "pending-payments-dashboard",
      step: "PAYMENT SAFETY • 03 / 06",
      headline: "Pending Payments & Due Date Protection",
      badgeEmoji: "⏰",
      badgeText: "Prevent 75 to 100 points drop caused by delayed payments",
      badgeClass: styles.badgeRed || "",
      rightColClass: styles.rightColRed || "",
      imageSrc: "/images/ScrollerImage/CreditKlick Pending Payments Dashboard.png",
      points: [
        "Consolidated overdue dashboard tracking pending dues across HDFC, ICICI, SBI & NBFCs",
        "Transparent impact breakdown: see exact points at risk before overdue penalties hit",
        "Quick payment options with potential interest savings of up to 50% on settlements",
      ],
    },
    {
      id: "loans-cards-dashboard",
      step: "CREDIT PORTFOLIO • 04 / 06",
      headline: "All Active Loans & Credit Cards in One Place",
      badgeEmoji: "💳",
      badgeText: "Full transparency over active, closed, and disputed accounts",
      badgeClass: styles.badgeTeal || "",
      rightColClass: styles.rightColTeal || "",
      imageSrc: "/images/ScrollerImage/CreditKlick Loans and Cards Dashboard.png",
      points: [
        "Complete bird's-eye view of credit limits, loan amounts, and active balances",
        "One-click 'Raise Dispute' for fraudulent accounts or erroneous bureau entries",
        "Pre-negotiated 'Settlement Offers' to resolve long-standing debts affordably",
      ],
    },
    {
      id: "predicted-score-widget",
      step: "SCORE PREDICTOR • 05 / 06",
      headline: "AI-Powered Score Simulation & Growth Roadmap",
      badgeEmoji: "🔮",
      badgeText: "Predict score changes before applying for any new loan or card",
      badgeClass: styles.badgeIndigo || "",
      rightColClass: styles.rightColIndigo || "",
      imageSrc: "/images/ScrollerImage/CreditKlick Predicted Credit Score Widget.png",
      points: [
        "Interactive scenario simulator forecasting your credit score over 12, 24, and 36 months",
        "See exact score impact (+92 pts on Vehicle Loan, +68 pts on Personal Loan, +54 pts on Cards)",
        "Plan your financial moves strategically with zero risk of hard inquiries on your report",
      ],
    },
    {
      id: "expert-connection-ui",
      step: "EXPERT ADVISORY • 06 / 06",
      headline: "1-on-1 Dedicated Credit Coaching & Dispute Support",
      badgeEmoji: "👨‍💼",
      badgeText: "Connect directly with Certified Financial Planners & credit experts",
      badgeClass: styles.badgeGreen || "",
      rightColClass: styles.rightColGreen || "",
      imageSrc: "/images/ScrollerImage/CreditKlick Expert Connection UI.png",
      points: [
        "Direct voice consultation with certified planners available Monday to Saturday",
        "Personalized credit restoration roadmaps tailored to your unique financial background",
        "Empathetic, confidential counseling to stop collection calls and eliminate debt stress",
      ],
    },
  ];
}
