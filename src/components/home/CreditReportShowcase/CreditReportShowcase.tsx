"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import styles from "./CreditReportShowcase.module.css";
import { getSlidesData } from "./showcase.data";
import { StickyCard } from "./StickyCard";

export function CreditReportShowcase() {
  const slides = getSlidesData(styles);

  return (
    <section id="report-showcase" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionTag}>
            <Sparkles aria-hidden="true" />
            Features
          </span>

          <h2 className={styles.sectionTitle}>
            Everything you need to fix your{" "}
            <span className={styles.noWrap}>score —</span>{" "}
            <span className={styles.titleHighlight}>In one app</span>
          </h2>

          <p className={styles.sectionIntro}>
            CreditKlick is a credit score improvement platform trusted by
            thousands to help transform their financial future. Powered by CRIF
            High Mark, one of India&apos;s four RBI-authorized credit bureaus,
            our smart app combines in-depth credit report analysis with
            personalized expert guidance to help you build a stronger credit
            score and financial profile, faster.
          </p>
        </div>

        <div className={styles.cardsStack}>
          {slides.map((slide, index) => (
            <StickyCard
              key={slide.id}
              slide={slide}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CreditReportShowcase;
