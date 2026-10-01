export interface BenefitItem {
  title: string;
  body: string;
}

export const BENEFITS: readonly BenefitItem[] = [
  {
    title: "Affordable Monthly Payment",
    body: "Our experts negotiate with your creditors to reduce EMIs, consolidating multiple debts into a single, affordable monthly payment. Every creditor and account payment detail stays accessible 24/7 on our secure online platform.",
  },
  {
    title: "Credit Score Boost",
    body: "Regular affordable EMI payments and a steady decline in debt get updated on your credit files, leading to an improved credit score. Our counselling, education and anti-harassment tools help you reach future goals — a car or a home.",
  },
  {
    title: "Harassment Relief",
    body: "Expert solutions to stop creditor harassment and help you become debt and stress free. Relentless recovery calls to you, your friends and family, or unexpected visits to your home or workplace — we step in immediately.",
  },
  {
    title: "Empathetically Trained Consultants",
    body: "Our team, trained by psychologists and mental health professionals in empathetic communication, listens with compassion and responds with understanding — so every conversation is handled with care and respect.",
  },
] as const;
