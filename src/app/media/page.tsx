import { Metadata } from "next";
import MediaClient from "./MediaClient";

export const metadata: Metadata = {
  title: "Media Coverage & Press Releases | CreditKlick",
  description:
    "Explore CreditKlick's media coverage, national broadcast spotlights, news features, and press releases across leading financial publications.",
  keywords: [
    "creditklick media",
    "creditklick press release",
    "financial news india",
    "fintech spotlight",
    "creditklick news coverage",
  ],
  openGraph: {
    title: "CreditKlick Media Coverage & Press Room",
    description:
      "Leading national and international media coverage highlighting CreditKlick's digital credit innovation.",
    images: ["/assets/creditklic_next_gen.png"],
  },
  alternates: {
    canonical: "/media",
  },
};

export default function MediaPage() {
  return <MediaClient />;
}
