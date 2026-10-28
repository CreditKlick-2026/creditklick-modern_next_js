import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Gauge illustration: credit score meter trending into the healthy zone. */
function CreditBoostIllustration() {
  return (
    <svg viewBox="0 0 220 160" className="h-auto w-full max-w-[220px]" role="img" aria-label="Credit score meter rising">
      <circle cx="180" cy="30" r="18" fill="#dbe8fd" />
      <circle cx="28" cy="130" r="12" fill="#dbe8fd" />
      <path d="M40 120a70 70 0 0 1 140 0" fill="none" stroke="#dbe8fd" strokeWidth="18" />
      <path d="M40 120a70 70 0 0 1 70-70" fill="none" stroke="#dbe8fd" strokeWidth="18" />
      <path d="M110 50a70 70 0 0 1 49.5 20.5" fill="none" stroke="#155dfc" strokeWidth="18" />
      <path d="M159.5 70.5A70 70 0 0 1 180 120" fill="none" stroke="#155dfc" strokeWidth="18" />
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

export function PromoCards() {
  return (
    <section id="credit-tools" className="w-full bg-white py-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div
          className="group flex flex-col items-center gap-6 overflow-hidden border border-brand-soft bg-gradient-to-br from-brand-soft to-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:flex-row md:p-8 justify-between"
          style={{ borderRadius: "0px" }}
        >
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-blue-900">
              Boost Your Credit Effortlessly!
            </h3>
            <p className="mt-3 text-slate-600">
              With timely alerts and detailed insights to keep your Credit Score healthy.
            </p>
            <Link
              href="/credit-score"
              style={{ backgroundColor: "#155dfc", borderRadius: "0px" }}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 shadow-sm"
            >
              Get your FREE Credit Score
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex w-full max-w-[220px] shrink-0 justify-center">
            <CreditBoostIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
