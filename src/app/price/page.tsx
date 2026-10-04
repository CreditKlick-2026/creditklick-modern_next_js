import { Metadata } from "next";
import PricingPage from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Simple & Transparent Pricing Plans | CreditKlick",
  description:
    "Affordable pricing plans for businesses of all sizes. Starter, Pro, and Enterprise plans with zero setup fees and transparent pricing.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricePage() {
  return <PricingPage />;
}
