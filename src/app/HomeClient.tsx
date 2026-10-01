"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  HeroSlider,
  ProductMarquee,
  BenefitsAccordion,
  ServicesGrid,
  CreditReportShowcase,
  HomeEmiCalculator,
  DataSafeSection,
} from "@/components/home";

// Client-only dynamic imports for heavy animation & scroll-pinned sections
const AppDownload = dynamic(
  () => import("@/components/home/app-download"),
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

const HeroBanner = dynamic(
  () => import("@/components/home/HeroBanner"),
  { ssr: false }
);

export default function HomeClient() {
  // Smooth scroll handler for anchor links
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
    <div className="min-h-screen bg-white w-full max-w-full">
      {/* 1. Full Hero Animated Banner (Desktop & Mobile) */}
      <section id="hero">
        <HeroBanner />
      </section>

      {/* 2. Quick product marquee ribbon */}
      <ProductMarquee />

      {/* 3. Benefits of CreditKlick - Accordion + illustration */}
      <BenefitsAccordion />

      {/* 4. Download The CreditKlick App (Modular App Showcase Section) */}
      <AppDownload />

      {/* 5. How CreditKlick Helps You - Interactive circuit service grid */}
      <ServicesGrid />

      {/* 6. Features: "Everything you need to fix your score" + Sticky Showcase Cards */}
      <CreditReportShowcase />

      {/* 8. Interactive EMI Loan Calculator */}
      <section id="calculator" className="bg-white py-12">
        <HomeEmiCalculator />
      </section>

      {/* 9. Customer Testimonials */}
      <HappyCustomersSection />

      {/* 12. Enterprise Data Security, Accreditations & CRIF Audit */}
      <DataSafeSection />

      {/* 13. Frequently Asked Questions */}
      <HomeFaqSection />
    </div>
  );
}
