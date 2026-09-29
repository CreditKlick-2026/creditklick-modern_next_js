"use client";

import React, { useState } from "react";

const BENEFITS = [
  {
    title: "Affordable Monthly Payment",
    body: "Our experts negotiate with your creditors to reduce EMIs, consolidating multiple debts into a single, affordable monthly payment. Every creditor and account payment detail stays accessible 24/7 on our secure online platform.",
  },
  {
    title: "Credit Score Boost",
    body: "Regular affordable EMI payments and a steady decline in debt get updated on your credit files, leading to an improved credit score. Our counselling, education and anti-harassment tools help you reach future goals — a car or a home.",
  },
  {
    title: "Harassment Relief",
    body: "Expert solutions to stop creditor harassment and help you become debt and stress free. Relentless recovery calls to you, your friends and family, or unexpected visits to your home or workplace — we step in immediately.",
  },
  {
    title: "Empathetically Trained Consultants",
    body: "Our team, trained by psychologists and mental health professionals in empathetic communication, listens with compassion and responds with understanding — so every conversation is handled with care and respect.",
  },
] as const;

/** Whiteboard-style illustration of a person shedding their debt load. */
/** Whiteboard-style illustration: debt falling away while the customer celebrates. */
function BenefitsIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Illustration of a customer becoming debt free"
    >
      {/* Soft organic backdrop */}
      <path
        fill="#eff6ff"
        d="M44 196c-30-46-12-108 38-132 36-18 64 4 100-8 40-14 60-48 100-34 46 16 64 78 50 126-12 44-54 64-96 76-48 14-102 24-134 2-26-18-38-14-58-30z"
      />
      <circle cx="342" cy="64" r="24" fill="#dbeafe" />
      <circle cx="46" cy="232" r="16" fill="#dbeafe" />
      <circle cx="196" cy="52" r="10" fill="#dbeafe" />

      {/* Ground line */}
      <path d="M32 270h336" stroke="#1c398e" strokeWidth="3" strokeLinecap="round" />

      {/* Debt bars, stepping down as the balance clears */}
      <g stroke="#1c398e" strokeWidth="3" strokeLinejoin="round">
        <rect x="206" y="166" width="30" height="104" fill="#155dfc" />
        <rect x="248" y="198" width="30" height="72" fill="#ffffff" />
        <rect x="290" y="226" width="30" height="44" fill="#155dfc" />
        <rect x="332" y="248" width="30" height="22" fill="#ffffff" />
      </g>

      {/* Trend line tracing the fall, with an arrow head */}
      <path
        d="M212 150c30 10 58 36 78 60l50 28"
        fill="none"
        stroke="#155dfc"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M328 237l12 1-6-10"
        fill="none"
        stroke="#155dfc"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Celebrating figure */}
      <g stroke="#1c398e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Arms raised */}
        <path d="M104 156L82 122l-4-22" fill="none" />
        <path d="M138 156l22-34 4-22" fill="none" />
        {/* Torso */}
        <path d="M104 150h34l6 56h-46z" fill="#155dfc" />
        {/* Legs */}
        <path d="M110 206l-6 62" fill="none" />
        <path d="M134 206l8 62" fill="none" />
        {/* Feet */}
        <path d="M96 268h16" fill="none" />
        <path d="M134 268h16" fill="none" />
        {/* Head */}
        <circle cx="121" cy="122" r="20" fill="#ffffff" />
      </g>
      {/* Hair */}
      <path
        d="M101 119c0-15 9-25 20-25s20 9 20 22c-5-3-9-8-12-13-5 9-18 14-28 16z"
        fill="#1c398e"
      />

      {/* Potted plant */}
      <path
        d="M52 270l-4-26h30l-4 26z"
        fill="#ffffff"
        stroke="#1c398e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M63 244v-40" stroke="#1c398e" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M63 218c-11-1-19-9-19-20 11-1 19 8 19 20zM63 228c11-1 19-9 19-20-11-1-19 8-19 20z"
        fill="#1c398e"
      />
    </svg>
  );
}

export function BenefitsAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="w-full bg-blue-50/60 py-16">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
        {/* Accordion */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
            Benefits of CreditKlick
          </h2>

          <div className="mt-8 space-y-3">
            {BENEFITS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-blue-600" : "text-blue-900"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`shrink-0 text-xl leading-none text-blue-600 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    {/* overflow-hidden lets the grid item collapse to 0fr */}
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Illustration */}
        <div className="flex justify-center">
          <BenefitsIllustration />
        </div>
      </div>
    </section>
  );
}
