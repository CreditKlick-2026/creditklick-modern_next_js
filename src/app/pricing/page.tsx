import { Metadata } from 'next';
import PricingPage from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Simple & Transparent Pricing Plans | CreditKlick",
  description: "Affordable pricing plans for businesses of all sizes. Starter, Pro, and Enterprise plans with zero setup fees and transparent pricing.",
  alternates: {
    canonical: "https://creditklick.com/pricing",
  },
  openGraph: {
    title: "Simple & Transparent Pricing Plans | CreditKlick",
    description: "Affordable plans for businesses. Starter, Pro, and Enterprise tiers.",
    url: "https://creditklick.com/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreditKlick Pricing Plans",
    description: "Explore our transparent pricing plans with zero setup fees.",
  },
};

export default function Page() {
  return <PricingPage />;
}
