export const defaultPricingPlans = [
  {
    _id: "plan-basic",
    id: "basic",
    name: "Basic",
    description: "Essential monthly credit monitoring, bureau refresh, and factor health analysis.",
    pricing: {
      price: 59,
      annualPrice: 49,
      isCustom: false,
      yearlyDiscountLabel: "Save 17%"
    },
    features: [
      "Monthly CIBIL & Experian score check",
      "Credit factors health breakdown",
      "Bureau score drop & inquiry alerts via WhatsApp",
      "Pre-approved loan & credit card matching",
      "Basic credit score simulator",
      "Self-help bureau dispute guide"
    ],
    limits: {
      bureauReports: { monthly: 1 },
      advisorySessions: { total: 0 },
      disputes: { monthly: 0 }
    }
  },
  {
    _id: "plan-pro",
    id: "pro",
    name: "Pro",
    description: "Most popular for users needing 1-on-1 expert coaching to resolve bureau errors and boost scores.",
    pricing: {
      price: 300,
      annualPrice: 249,
      isCustom: false,
      yearlyDiscountLabel: "Save 17%"
    },
    features: [
      "Dedicated 1-on-1 Credit Guru (Personal Coach)",
      "Assisted dispute filing for wrong remarks & DPD",
      "Overdue & closed accounts status rectification",
      "Multi-bureau dispute assistance (CIBIL, Experian, Equifax)",
      "100% partner loan processing fee waiver",
      "Priority WhatsApp & phone advisory assistance"
    ],
    popular: true,
    limits: {
      bureauReports: { monthly: 4 },
      advisorySessions: { total: 12 },
      disputes: { monthly: 5 }
    }
  },
  {
    _id: "plan-custom",
    id: "custom",
    name: "Custom",
    description: "For high-debt borrowers, NPA settlement, bank recovery harassment, and legal notice resolution.",
    pricing: {
      price: 0,
      annualPrice: 0,
      isCustom: true,
      yearlyDiscountLabel: "Custom Quote"
    },
    features: [
      "One-Time Settlement (OTS) & haircut bank negotiation",
      "Recovery agent harassment shielding & legal advisory",
      "Bank legal notice reply drafting & defense",
      "Comprehensive multi-loan debt restructuring",
      "End-to-end multi-bureau CIBIL clearance & NOC procurement",
      "Senior Banking Ombudsman & Legal Advisor assigned"
    ],
    limits: {
      bureauReports: { monthly: -1 },
      advisorySessions: { total: -1 },
      disputes: { monthly: -1 }
    }
  }
];

export const pricingFaqs = [
  {
    q: "How does CreditKlick help improve my credit score?",
    a: "CreditKlick analyzes your credit report across all 4 RBI-licensed bureaus (CIBIL, Experian, Equifax, CRIF) to identify errors, incorrect DPD (Days Past Due), duplicate accounts, and unauthorized inquiries. In Pro and Custom plans, our expert Credit Gurus prepare and file formal dispute challenges with banks and credit bureaus to have inaccurate remarks corrected."
  },
  {
    q: "What is included in the Basic ₹59 plan?",
    a: "The Basic plan provides monthly official bureau score tracking (CIBIL & Experian), full factor health breakdown (repayment history, credit utilization, credit age), score drop alerts via WhatsApp, and pre-approved loan & card matching."
  },
  {
    q: "How does the AI Agent upgrade in Pro plan work?",
    a: "Pro starts at ₹300/month for dedicated 1-on-1 human Credit Guru coaching. When you toggle Include AI Agents, Pro becomes ₹500/month and unlocks our automated AI 90-day score boost engine, instant bureau dispute drafting, and Debt-to-Income (DTI) optimization."
  },
  {
    q: "What is the Custom plan for?",
    a: "The Custom plan is tailored for complex default cases, NPA settlements, multiple written-off accounts, and borrowers facing recovery agent harassment. Our senior banking attorneys negotiate formal One-Time Settlements (OTS) and secure official bank NOCs."
  },
  {
    q: "Can I cancel or change my plan anytime?",
    a: "Yes! There are no long-term lock-in contracts. You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings."
  }
];
