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
} from "@/components/home";

import {
  ZentryFeatures,
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

      {/* 1. Hero interactive slider with gauge meter & credit animation (No gaming video needed!) */}
      <div className="pt-2 sm:pt-4 bg-white">
        <HeroSlider />
      </div>

      {/* 2. Quick product marquee ribbon */}
      <ProductMarquee />

      {/* 3. Zentry Scroll-Pinned "About" Section */}
      <ZentryAbout />

      {/* 4. Zentry 3D Tilt Bento Grid Features */}
      <ZentryFeatures />

      {/* 5. ZET Plus Credit Card Rewards & Pricing Comparison Section */}
      <ZetPlusRewards />

      {/* 6. Credit Health Promo Banner */}
      <CreditHealthPromo />

      {/* 7. Interactive EMI Loan Calculator */}
      <div className="bg-white py-12">
        <HomeEmiCalculator />
      </div>

      {/* 8. Media Coverage */}
      <MediaCoverage />

      {/* 9. Partner Banks Infinite Carousel */}
      <PartnersCarousel />


      {/* 9. Customer Testimonials */}
      <HappyCustomersSection />

      {/* 10. Frequently Asked Questions (7pixs style) */}
      <HomeFaqSection />

      {/* 11. Customer Centric Contact Banner */}
      <CustomerCentricBanner />
    </div>
  );
}
