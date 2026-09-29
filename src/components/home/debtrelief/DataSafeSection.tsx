"use client";

import React from "react";

/** Shield + lock mark, drawn in the same line-art style as the rest of the page. */
function ShieldMark() {
  return (
    <svg
      viewBox="0 0 220 220"
      className="h-auto w-full max-w-xs"
      role="img"
      aria-label="Data security illustration"
    >
      <circle cx="110" cy="110" r="100" fill="#eff6ff" />
      <path
        d="M110 26l62 24v54c0 42-26 76-62 90-36-14-62-48-62-90V50z"
        fill="#ffffff"
        stroke="#1c398e"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M110 40l50 19.4V104c0 34.5-20.8 62.2-50 74.3-29.2-12.1-50-39.8-50-74.3V59.4z"
        fill="#155dfc"
      />
      <rect x="86" y="104" width="48" height="38" rx="6" fill="#ffffff" />
      <path
        d="M96 104V93a14 14 0 0 1 28 0v11"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="110" cy="119" r="5.5" fill="#1c398e" />
      <path d="M110 124v9" stroke="#1c398e" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

const ACCREDITATIONS = ["ISO 27001", "ISO 9001", "RBI Compliant", "PCI DSS"];

export function DataSafeSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
        <div className="order-2 flex justify-center lg:order-1">
          <ShieldMark />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
            Your Data is in Safe Hands
          </h2>
          <p className="mt-3 text-lg font-semibold text-blue-600">
            We&apos;ve got it covered.
          </p>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            Operating in a data-sensitive environment, we have developed and
            rigorously tested our technology and solutions to meet the highest
            industry standards. Our accreditations reflect an unwavering
            commitment to compliance and excellence.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            We hold information-security and quality-management certifications
            that govern how your data is stored, accessed and protected — at
            every step of your journey with CreditKlick.
          </p>

          <ul className="mt-8 flex flex-wrap gap-3">
            {ACCREDITATIONS.map((item) => (
              <li
                key={item}
                className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-blue-900"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
