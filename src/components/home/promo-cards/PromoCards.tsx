import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Gauge illustration: credit score meter trending into the healthy zone. */
function CreditBoostIllustration() {
  return (
    <svg viewBox="0 0 220 160" className="h-auto w-full max-w-[220px]" role="img" aria-label="Credit score meter rising">
      <circle cx="180" cy="30" r="18" fill="#dbeafe" />
      <circle cx="28" cy="130" r="12" fill="#dbeafe" />
      <path d="M40 120a70 70 0 0 1 140 0" fill="none" stroke="#fee2e2" strokeWidth="18" />
      <path d="M40 120a70 70 0 0 1 70-70" fill="none" stroke="#fca5a5" strokeWidth="18" />
      <path d="M110 50a70 70 0 0 1 49.5 20.5" fill="none" stroke="#fcd34d" strokeWidth="18" />
      <path d="M159.5 70.5A70 70 0 0 1 180 120" fill="none" stroke="#22c55e" strokeWidth="18" />
      <line x1="110" y1="120" x2="160" y2="84" stroke="#1c398e" strokeWidth="5" strokeLinecap="round" />
      <circle cx="110" cy="120" r="9" fill="#155dfc" stroke="#1c398e" strokeWidth="3" />
      <text x="110" y="150" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1c398e">780</text>
      <g transform="translate(168 96)">
        <circle r="16" fill="#155dfc" />
        <path d="M-6 4l6-8 6 8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Calculator with a growth chart beside it. */
function CalculatorsIllustration() {
  return (
    <svg viewBox="0 0 220 160" className="h-auto w-full max-w-[220px]" role="img" aria-label="Finance calculator and growth chart">
      <circle cx="190" cy="28" r="16" fill="#dbeafe" />
      <circle cx="24" cy="134" r="12" fill="#dbeafe" />
      <rect x="30" y="20" width="84" height="122" rx="10" fill="#fff" stroke="#1c398e" strokeWidth="3" />
      <rect x="42" y="32" width="60" height="24" rx="4" fill="#155dfc" />
      <text x="96" y="50" textAnchor="end" fontSize="13" fontWeight="700" fill="#fff">₹ EMI</text>
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={42 + c * 22} y={66 + r * 24} width="16" height="16" rx="3"
            fill={c === 2 && r === 2 ? "#22c55e" : "#eff6ff"} stroke="#1c398e" strokeWidth="2" />
        ))
      )}
      <path d="M128 136h72" stroke="#1c398e" strokeWidth="3" strokeLinecap="round" />
      <rect x="134" y="106" width="14" height="30" fill="#bfdbfe" stroke="#1c398e" strokeWidth="2" />
      <rect x="156" y="88" width="14" height="48" fill="#60a5fa" stroke="#1c398e" strokeWidth="2" />
      <rect x="178" y="64" width="14" height="72" fill="#155dfc" stroke="#1c398e" strokeWidth="2" />
      <path d="M134 92l24-18 18 8 22-26" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M190 54l9 1-1 9" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CARDS = [
  {
    title: "Boost Your Credit Effortlessly!",
    description: "With timely alerts and detailed insights to keep your Credit Score healthy.",
    cta: "Get your FREE Credit Score",
    href: "/credit-score",
    Illustration: CreditBoostIllustration,
  },
  {
    title: "Finance Calculators & Tools",
    description: "Get the expert edge you need to achieve your financial goals!",
    cta: "Explore Now",
    href: "/calculators",
    Illustration: CalculatorsIllustration,
  },
];

export function PromoCards() {
  return (
    <section id="credit-tools" className="w-full bg-white py-12">
      <div className="container mx-auto grid gap-6 px-4 sm:px-6 md:grid-cols-2">
        {CARDS.map(({ title, description, cta, href, Illustration }) => (
          <div
            key={title}
            className="group flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-shadow hover:shadow-lg lg:flex-row md:p-8"
          >
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold tracking-tight text-blue-900">{title}</h3>
              <p className="mt-3 text-slate-600">{description}</p>
              <Link
                href={href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="flex w-full max-w-[220px] shrink-0 justify-center">
              <Illustration />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
