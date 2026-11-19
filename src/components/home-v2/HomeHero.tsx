import React from "react";
import { FileCheck2, ShieldCheck, Lock, Headset } from "lucide-react";
import { ed, cx, EdButton } from "@/components/editorial";
import h from "./Home.module.css";

const FACTS = [
  { Icon: FileCheck2, title: "Free CRIF report", sub: "Score + full report in minutes" },
  { Icon: ShieldCheck, title: "No impact on your score", sub: "Checking your own score is a soft enquiry" },
  { Icon: Lock, title: "Consent-based & encrypted", sub: "Withdraw consent any time" },
  { Icon: Headset, title: "Expert help", sub: "Talk to a credit advisor" },
];

// Illustrative values for the sample card (not a real person's report)
const SAMPLE_SCORE = 765;
const MIN = 300;
const MAX = 900;

const FACTORS = [
  { name: "Payment history", value: "98% on time", pct: 98, tone: h.barGood },
  { name: "Credit utilisation", value: "24%", pct: 24, tone: "" },
  { name: "Credit age", value: "6 yrs 2 mo", pct: 62, tone: "" },
  { name: "Hard enquiries (6 mo)", value: "2", pct: 20, tone: h.barWarn },
];

function ScoreCard() {
  const pct = ((SAMPLE_SCORE - MIN) / (MAX - MIN)) * 100;
  return (
    <div className={h.scoreCard} aria-label="Sample credit score card">
      <div className={h.scoreHead}>
        <span>Sample report · CRIF High Mark</span>
        <span>Updated today</span>
      </div>
      <div className={h.scoreBody}>
        <svg className={h.gauge} viewBox="0 0 300 165" aria-hidden="true">
          <path d="M30 150 A120 120 0 0 1 270 150" fill="none" stroke="#e5e7eb" strokeWidth="14" />
          <path
            d="M30 150 A120 120 0 0 1 270 150"
            fill="none"
            stroke="var(--ed-brand)"
            strokeWidth="14"
            pathLength={100}
            strokeDasharray={`${pct} 100`}
          />
        </svg>
        <p className={h.scoreValue}>{SAMPLE_SCORE}</p>
        <span className={h.scoreLabel}>Good</span>
        <div className={h.scoreRange}>
          <span>{MIN}</span>
          <span>{MAX}</span>
        </div>
      </div>
      <ul className={h.factors}>
        {FACTORS.map((f) => (
          <li key={f.name} className={h.factor}>
            <span className={h.factorName}>{f.name}</span>
            <span className={h.factorValue}>{f.value}</span>
            <span className={h.bar} aria-hidden="true">
              <span className={cx(h.barFill, f.tone)} style={{ width: `${f.pct}%`, display: "block" }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeHero() {
  return (
    <section id="hero" className={h.hero}>
      <div className={ed.container}>
        <div className={h.heroGrid}>
          <div>
            <span className={cx(ed.eyebrow, h.heroEyebrow)}>Free credit score · Powered by CRIF</span>
            <h1 className={h.heroTitle}>
              Know your credit score. <em>Fix what&apos;s holding it back.</em>
            </h1>
            <p className={h.heroSub}>
              Get your CRIF credit report explained in plain language, see exactly which factors pull your
              score down, and follow a clear plan to improve it — with expert help when you need it.
            </p>
            <div className={ed.actions}>
              <EdButton href="/credit-score">Check free credit score</EdButton>
              <EdButton href="/refine" variant="outline">Explore Credit Refine</EdButton>
            </div>
            <p className={h.heroNote}>No credit card needed · Takes about 2 minutes</p>
          </div>
          <ScoreCard />
        </div>

        <div className={cx(ed.factStrip, ed.factStrip4, h.heroFacts)}>
          {FACTS.map(({ Icon, title, sub }) => (
            <div key={title} className={ed.fact}>
              <span className={ed.factIcon}><Icon aria-hidden="true" /></span>
              <div>
                <p className={ed.factTitle}>{title}</p>
                <p className={ed.factSub}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
