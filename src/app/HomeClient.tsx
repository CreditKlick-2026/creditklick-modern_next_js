"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  HeroSlider,
  ProductMarquee,
  CreditHealthPromo,
  MediaCoverage,
  HomeEmiCalculator,
  PartnersCarousel,
  CustomerCentricBanner,
  ServicesGrid,
  BenefitsAccordion,
  LetsTalkBanner,
  AppFeatureCards,
  StatsCounter,
  SupportInitiative,
  DataSafeSection,
} from "@/components/home";

import {
  ZetPlusRewards,
} from "@/components/zentry";

// Dynamic imports for client-only animated sections
const ZentryAbout = dynamic(
  () => import("@/components/zentry/about"),
  { ssr: false }
);

const HappyCustomersSection = dynamic(
  () => import("@/components/home/testimonials"),
  { ssr: false }
);

const HomeFaqSection = dynamic(
  () => import("@/components/home/faq"),
  { ssr: false }
);

export default function HomeClient() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white w-full max-w-full overflow-x-hidden">


      {/* 4. Hero interactive slider with gauge meter & credit animation */}
      <div className="pt-2 sm:pt-4 bg-white">
        <HeroSlider />
      </div>

      {/* 5. Quick product marquee ribbon */}
      <ProductMarquee />

      {/* 8. Zentry Scroll-Pinned "About" Section */}
      <ZentryAbout />

      {/* 10. Benefits of CreditKlick - Accordion + illustration */}
      <BenefitsAccordion />

      {/* 6. How CreditKlick Helps You - Service icon grid */}
      <ServicesGrid />

      {/* 11. ZET Plus Credit Card Rewards & Pricing Comparison Section */}
      <ZetPlusRewards />

      {/* 12. "Let's Talk" CTA banner */}
      <LetsTalkBanner />

      {/* 13. In-app feature cards */}
      <AppFeatureCards />

      {/* 14. Animated milestone counters */}
      <StatsCounter />

      {/* 15. Credit Health Promo Banner */}
      <CreditHealthPromo />

      {/* 16. Interactive EMI Loan Calculator */}
      <div className="bg-white py-12">
        <HomeEmiCalculator />
      </div>

      {/* 17. Sounds of Silence support initiative */}
      <SupportInitiative />

      {/* 18. Partner Banks Infinite Carousel */}
      <PartnersCarousel />

      {/* 19. Customer Testimonials */}
      <HappyCustomersSection />

      {/* 20. Data security & accreditations */}
      <DataSafeSection />

      {/* 21. Frequently Asked Questions (7pixs style) */}
      <HomeFaqSection />

      {/* 22. Customer Centric Contact Banner */}
      <CustomerCentricBanner />

      {/* 23. Press & Acclaim - Our Media Coverage */}
      <MediaCoverage />
    </div>
  );
}
