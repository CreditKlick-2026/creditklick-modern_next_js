import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Layers,
  GraduationCap,
  ShieldCheck,
  Scale,
  Smartphone,
  Users,
  Calculator,
  ArrowRight,
  Check,
} from "lucide-react";
import { ed, cx, Section, SectionHeader, EdButton } from "@/components/editorial";
import { LEFT_NODES, RIGHT_NODES } from "./data/services.data";
import { TESTIMONIALS_DATA } from "./data/testimonials.data";
import { ACCREDITATIONS, TRUST_PILLARS } from "./data/security.data";
import h from "./Home.module.css";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.creditklick.creditklick";

// One icon per service, in the order of LEFT_NODES then RIGHT_NODES
const SERVICE_ICONS = [MessageCircle, Layers, GraduationCap, ShieldCheck, Scale, Smartphone, Users, Calculator];

export function HomeServices() {
  const services = [...LEFT_NODES, ...RIGHT_NODES];
  return (
    <Section id="services">
      <SectionHeader
        eyebrow="How CreditKlick helps"
        title="Everything between a low score and"
        accent="a loan approval."
        subtitle="From reading your report to negotiating with lenders, each service tackles one specific reason your credit is holding you back."
      />
      <div className={cx(ed.grid, ed.grid4)}>
        {services.map((svc, i) => {
          const Icon = SERVICE_ICONS[i] ?? ShieldCheck;
          return (
            <Link key={svc.title} href={svc.href} className={ed.cell}>
              <span className={ed.cellIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={ed.iconBox}><Icon aria-hidden="true" /></span>
              <h3 className={ed.cellTitle}>{svc.title}</h3>
              <p className={ed.cellText}>{svc.desc}</p>
              <div className={ed.cellFoot}>
                <span className={ed.tag}>{svc.tag}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}

const STEPS = [
  {
    title: "Verify your mobile",
    text: "Enter your mobile number and confirm it with a one-time password. No paperwork, no branch visit.",
  },
  {
    title: "Give consent, we fetch your report",
    text: "With your explicit consent we pull your credit report from CRIF High Mark. Your own check never lowers your score.",
  },
  {
    title: "Get your plan",
    text: "See your score, the factors behind it and the exact steps that will move it — then track your progress.",
  },
];

export function HomeHowItWorks() {
  return (
    <Section tone="beige" id="how-it-works">
      <SectionHeader
        eyebrow="How it works"
        title="Your score, explained in"
        accent="three steps."
      />
      <ol className={h.steps} style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {STEPS.map((step, i) => (
          <li key={step.title} className={h.step}>
            <span className={h.stepNum}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={h.stepTitle}>{step.title}</h3>
            <p className={h.stepText}>{step.text}</p>
          </li>
        ))}
      </ol>
      <div className={cx(ed.actions, ed.actionsCenter)} style={{ marginTop: 40 }}>
        <EdButton href="/credit-score">Start my free check</EdButton>
      </div>
    </Section>
  );
}

const APP_POINTS = [
  "Your score and full CRIF report, always in your pocket",
  "Due-date reminders before a late payment hurts your score",
  "Track every loan and card, and raise disputes in one tap",
  "Talk to a credit advisor without leaving the app",
];

export function HomeApp() {
  return (
    <Section tone="dark" id="app">
      <div className={h.appGrid}>
        <div>
          <SectionHeader
            align="left"
            onDark
            eyebrow="The CreditKlick app"
            title="Your credit health,"
            accent="on your phone."
            subtitle="Everything on the website, plus reminders and live tracking. Free on Android."
          />
          <ul className={h.appList}>
            {APP_POINTS.map((p) => (
              <li key={p} className={h.appItem}>
                <Check aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div className={h.appGet}>
            <EdButton href={PLAY_STORE_URL} variant="light" external>
              Get it on Google Play <ArrowRight size={16} aria-hidden="true" />
            </EdButton>
            <div className={h.qr}>
              <Image src="/images/qrcode.jpg" alt="QR code to download the CreditKlick app" width={64} height={64} />
              <span>Scan to<br />download</span>
            </div>
          </div>
        </div>
        <div className={h.appVisual}>
          <Image src="/images/App.png" alt="CreditKlick app screens" width={840} height={840} />
        </div>
      </div>
    </Section>
  );
}

export function HomeTestimonials() {
  const items = TESTIMONIALS_DATA.slice(0, 6);
  return (
    <Section tone="beige" id="testimonials">
      <SectionHeader
        eyebrow="Customer stories"
        title="Real reports, real"
        accent="score changes."
      />
      <div className={cx(ed.grid, ed.grid3, ed.gridOnBeige)}>
        {items.map((t) => (
          <figure key={t.id} className={cx(ed.cell, h.quote)} style={{ margin: 0 }}>
            <span className={cx(ed.tag, ed.tagBrand)}>{t.company}</span>
            <blockquote className={h.quoteText} style={{ margin: 0 }}>{t.content}</blockquote>
            <figcaption className={h.quoteBy}>
              <span className={h.quoteName}>{t.name}</span>
              <span className={h.quoteMeta}>{t.service} · {t.location}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function HomeSecurity() {
  return (
    <Section id="security">
      <SectionHeader
        eyebrow="Security & privacy"
        title="Your data is handled"
        accent="like a bank would."
        subtitle="We only fetch your report with your consent, encrypt it, and never sell your number or financial details. You can withdraw consent at any time."
      />
      <div className={cx(ed.grid, ed.grid4)}>
        {TRUST_PILLARS.map((p) => (
          <div key={p.title} className={ed.cell}>
            <span className={ed.iconBox}>{p.icon}</span>
            <h3 className={ed.cellTitle}>{p.title}</h3>
            <p className={ed.cellText}>{p.desc}</p>
          </div>
        ))}
      </div>
      <div className={h.tags}>
        {ACCREDITATIONS.map((a) => (
          <span key={a} className={ed.tag}>{a}</span>
        ))}
      </div>
      <div className={cx(ed.actions, ed.actionsCenter)} style={{ marginTop: 28 }}>
        <Link href="/privacy-policy" className={ed.textLink}>
          Read our privacy policy <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
