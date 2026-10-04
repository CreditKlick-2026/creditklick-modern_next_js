"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  HeroSlider,
  BenefitsAccordion,
  ServicesGrid,
  CreditReportShowcase,
  DataSafeSection,
  PromoCards,
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

import HeroBanner from "@/components/home/HeroBanner";

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

      {/* 3. Benefits of CreditKlick - Accordion + illustration */}
      <BenefitsAccordion />

      {/* Boost Your Credit + Finance Calculators & Tools cards */}
      <PromoCards />

      {/* 4. Download The CreditKlick App (Modular App Showcase Section) */}
      <AppDownload />

      {/* 5. How CreditKlick Helps You - Interactive circuit service grid */}
      <ServicesGrid />

      {/* 6. Features: "Everything you need to fix your score" + Sticky Showcase Cards */}
      <CreditReportShowcase />

      {/* 9. Customer Testimonials */}
      <HappyCustomersSection />

      {/* 12. Enterprise Data Security, Accreditations & CRIF Audit */}
      <DataSafeSection />

      {/* 13. Frequently Asked Questions */}
      <HomeFaqSection />
    </div>
  );
}
