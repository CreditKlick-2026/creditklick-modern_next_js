import { Metadata } from "next";
import PriceClient from "./PriceClient";

export const metadata: Metadata = {
  title: "Pricing & CreditKlick Plus Rewards | CreditKlick",
  description:
    "Upgrade your CreditKlick rewards with CreditKlick Plus. Enjoy exclusive benefits on UPI transactions, voucher payments, loan offers, and credit monitoring.",
  keywords: [
    "creditklick plus",
    "creditklick pricing",
    "credit rewards india",
    "upi cashbacks",
    "credit card rewards comparison",
  ],
  openGraph: {
    title: "CreditKlick Plus - Upgrade Your Rewards",
    description:
      "Exclusive financial perks, higher rewards on UPI, and priority credit report tracking with CreditKlick Plus.",
    images: ["/assets/creditklic_next_gen.png"],
  },
  alternates: {
    canonical: "/price",
  },
};

export default function PricePage() {
  return <PriceClient />;
}
