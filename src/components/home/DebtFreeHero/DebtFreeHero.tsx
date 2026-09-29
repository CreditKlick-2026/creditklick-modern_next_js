"use client";

import React from "react";
import Link from "next/link";
import styles from "./DebtFreeHero.module.css";

export function DebtFreeHero() {
  return (
    <section className={styles.heroSection} aria-label="Debt Free Hero Section">
      <div className={styles.container}>

        {/* ── LEFT COLUMN: Headline + Stats + CTA ── */}
        <div className={styles.leftCol}>

          {/* Live badge */}
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            RBI Registered • Trusted by 2 Lakh+ Indians
          </div>

          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statValue}>₹500Cr+</span>
              <span className={styles.statLabel}>Debt Settled</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>2L+</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>790+</span>
              <span className={styles.statLabel}>Avg Credit Score</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={styles.ctaRow}>
            <Link href="/credit-score" className={styles.btnPrimary}>
              ⚡ Check Free Credit Score
            </Link>
            <Link href="/#pricing" className={styles.btnSecondary}>
              View Plans →
            </Link>
          </div>

          {/* Trust items */}
          <div className={styles.trustRow}>
            {["Zero Hidden Charges", "Instant Approval", "Bank-Level Security"].map((item) => (
              <span key={item} className={styles.trustItem}>
                <span className={styles.trustCheck}>✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN: Floating Credit Card SVG ── */}
        <div className={styles.rightCol}>
          <div className={styles.cardGlow} />
          <div className={styles.orb1} />
          <div className={styles.orb2} />

          <div className={styles.cardFloat}>
            <svg
              viewBox="0 0 420 560"
              className={styles.cardSvg}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="greenG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="goldG" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="purpleG" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="trendG" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <filter id="cardShadow">
                  <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#000" floodOpacity="0.3" />
                </filter>
              </defs>

              {/* ── Card body ── */}
              <rect x="8" y="8" width="404" height="544" rx="28" fill="url(#cardBg)" filter="url(#cardShadow)" />
              {/* Subtle shine overlay */}
              <rect x="8" y="8" width="404" height="220" rx="28" fill="rgba(255,255,255,0.06)" />
              {/* Bottom card section */}
              <rect x="8" y="336" width="404" height="216" rx="0" fill="rgba(0,0,0,0.15)" />
              <rect x="8" y="336" width="404" height="16" fill="rgba(0,0,0,0.15)" />
              <rect x="8" y="320" width="404" height="232" rx="28" fill="rgba(0,0,0,0.0)" />

              {/* Grid lines on card */}
              <line x1="8" y1="336" x2="412" y2="336" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

              {/* ── Top header: Logo + Score badge ── */}
              <text x="34" y="60" fontSize="13" fontWeight="700" fill="rgba(255,255,255,0.55)" letterSpacing="2">CREDIT PROFILE</text>
              <text x="34" y="90" fontSize="28" fontWeight="900" fill="#ffffff" letterSpacing="-0.5">CreditKlick</text>

              {/* Score pill top-right */}
              <rect x="296" y="40" width="108" height="58" rx="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <text x="350" y="65" textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.55)" letterSpacing="1">SCORE</text>
              <text x="350" y="89" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fbbf24">790+</text>

              {/* ── Score Gauge Arc ── */}
              {/* Track */}
              <path d="M 80 280 A 130 130 0 1 1 340 280" stroke="rgba(255,255,255,0.1)" strokeWidth="14" strokeLinecap="round" fill="none" />
              {/* Progress (~88%) */}
              <path d="M 80 280 A 130 130 0 1 1 330 210" stroke="url(#purpleG)" strokeWidth="14" strokeLinecap="round" fill="none" className={styles.celebrateSparks} />
              {/* Centre disc */}
              <circle cx="210" cy="230" r="80" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              <circle cx="210" cy="230" r="64" fill="rgba(15,23,42,0.6)" />
              <text x="210" y="218" textAnchor="middle" fontSize="38" fontWeight="900" fill="#ffffff">790</text>
              <text x="210" y="238" textAnchor="middle" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.5)" letterSpacing="0.5">CREDIT SCORE</text>
              <text x="210" y="255" textAnchor="middle" fontSize="11" fontWeight="800" fill="#34d399">EXCELLENT ▲</text>

              {/* Range labels */}
              <text x="72" y="302" fontSize="10" fill="rgba(255,255,255,0.35)" fontWeight="600">300</text>
              <text x="336" y="302" fontSize="10" fill="rgba(255,255,255,0.35)" fontWeight="600">900</text>

              {/* ── Trend Chart ── */}
              <rect x="24" y="350" width="372" height="90" rx="14" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              {/* Chart fill */}
              <path d="M 40 428 L 96 408 L 150 415 L 205 395 L 260 378 L 314 360 L 368 345 L 384 345 L 384 428 Z" fill="url(#trendG)" />
              {/* Chart line */}
              <polyline points="40,428 96,408 150,415 205,395 260,378 314,360 368,345"
                stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* Chart dots */}
              {[[40,428],[96,408],[150,415],[205,395],[260,378],[314,360],[368,345]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r={i===6?5.5:3.5}
                  fill={i===6?"#10b981":"rgba(255,255,255,0.5)"}
                  stroke={i===6?"rgba(255,255,255,0.6)":"#10b981"} strokeWidth="2" />
              ))}
              <text x="40" y="368" fontSize="9" fill="rgba(255,255,255,0.35)" fontWeight="600">DEBT REDUCTION TREND</text>
              <text x="316" y="368" fontSize="9" fill="#34d399" fontWeight="700">+38% ↑</text>

              {/* ── Achievement Badges ── */}
              {/* Badge 1: Debt Free */}
              <rect x="24" y="460" width="114" height="76" rx="16" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" />
              <circle cx="81" cy="484" r="14" fill="url(#greenG)" />
              <path d="M 76 484 L 80 488 L 87 481" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="81" y="508" textAnchor="middle" fontSize="10" fontWeight="700" fill="#34d399">DEBT FREE</text>
              <text x="81" y="522" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(52,211,153,0.6)">Achieved ✓</text>

              {/* Badge 2: Savings */}
              <rect x="153" y="460" width="114" height="76" rx="16" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" />
              <circle cx="210" cy="484" r="14" fill="url(#goldG)" />
              <text x="210" y="489" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">₹</text>
              <text x="210" y="508" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fbbf24">₹2 LAKH</text>
              <text x="210" y="522" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(251,191,36,0.55)">Total Saved</text>

              {/* Badge 3: RBI */}
              <rect x="282" y="460" width="114" height="76" rx="16" fill="rgba(99,102,241,0.12)" stroke="rgba(99,102,241,0.35)" strokeWidth="1.5" />
              <circle cx="339" cy="484" r="14" fill="url(#purpleG)" />
              <path d="M 333 484 L 339 475 L 345 484 L 339 493 Z" fill="rgba(255,255,255,0.9)" />
              <text x="339" y="508" textAnchor="middle" fontSize="10" fontWeight="700" fill="#a5b4fc">RBI PARTNER</text>
              <text x="339" y="522" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(165,180,252,0.55)">Verified ✓</text>

              {/* ── Floating sparkles ── */}
              <g className={styles.celebrateSparks}>
                <path d="M 24 130 Q 24 137 31 137 Q 24 137 24 144 Q 24 137 17 137 Q 24 137 24 130 Z" fill="#fbbf24" opacity="0.8" />
                <path d="M 390 100 Q 390 105 395 105 Q 390 105 390 110 Q 390 105 385 105 Q 390 105 390 100 Z" fill="#6366f1" opacity="0.8" />
                <circle cx="400" cy="230" r="5" fill="#10b981" opacity="0.5" />
                <circle cx="406" cy="248" r="3" fill="#10b981" opacity="0.3" />
                <path d="M 14 320 Q 14 325 19 325 Q 14 325 14 330 Q 14 325 9 325 Q 14 325 14 320 Z" fill="#34d399" opacity="0.6" />
              </g>
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DebtFreeHero;
