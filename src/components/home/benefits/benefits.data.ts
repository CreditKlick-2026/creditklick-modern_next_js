export interface BenefitItem {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}

export const BENEFITS: readonly BenefitItem[] = [
  {
    title: "Credit Score Boost",
    body: "Improve your CIBIL and CRIF credit score to 750+ with factor-by-factor bureau repair. We identify score-damaging errors, guide you through Credit Refine, and help you qualify for lower loan interest rates.",
    image: "/images/benefits/credit-score-boost.png",
    imageAlt: "Credit Score Boost badge",
  },
  {
    title: "Compare Multiple Options",
    body: "Evaluate loan offers and credit cards from top RBI-registered banks and NBFCs side by side. Compare interest rates, processing fees, and perks transparently to secure the best financial deal.",
    image: "/images/benefits/compare-options.png",
    imageAlt: "Compare multiple options and affordable payments badge",
  },
  {
    title: "Clear Financial Roadmap",
    body: "Get complete 360° visibility over all your active debts, credit utilization, and EMI schedules. Track repayment milestones 24/7 to steadily eliminate debt and regain financial peace of mind.",
    image: "/images/benefits/financial-roadmap.png",
    imageAlt: "Clear Financial Roadmap binoculars badge",
  },
  {
    title: "Empathetically Trained Consultants",
    body: "Our financial counselors, trained in empathetic communication, listen to your situation without judgment. Receive compassionate, step-by-step guidance to manage overdue debts and financial stress.",
    image: "/images/benefits/expert-consultants.png",
    imageAlt: "Empathetically Trained Consultants badge",
  },
  {
    title: "Instant Approval & Harassment Relief",
    body: "Put an end to relentless recovery agent calls and harassment with our structured legal and debt relief support. Access fast settlement approvals to protect yourself and your family.",
    image: "/images/benefits/instant-approval.png",
    imageAlt: "Instant Approval and Harassment Relief badge",
  },
] as const;
