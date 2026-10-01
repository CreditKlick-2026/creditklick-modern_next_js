"use client";

import React from "react";
import "./security.css";
import { ACCREDITATIONS, TRUST_PILLARS } from "./security.data";
import { ShieldMark } from "./ShieldMark";

export function DataSafeSection() {
  return (
    <section id="security" className="data-safe-section">
      <div className="data-safe-container">
        {/* ROW 1: Heading (Left) + Logo (Right) */}
        <div className="data-safe-row-1">
          <div className="data-safe-heading-col">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-blue-900 leading-tight">
              Your Data is in Safe Hands
            </h2>
            <p className="mt-1 text-base sm:text-lg font-semibold text-blue-600">
              We&apos;ve got it covered.
            </p>
          </div>
          <div className="data-safe-logo-col">
            <ShieldMark size={96} />
          </div>
        </div>

        {/* ROW 2: Text (Left) + CRIF / Trust Box (Right) */}
        <div className="data-safe-row-2">
          {/* Left: Text & Accreditations */}
          <div className="data-safe-text-col">
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Operating in a data-sensitive environment, we have developed and
              rigorously tested our technology and solutions to meet the highest
              industry standards. Our accreditations reflect an unwavering
              commitment to compliance and excellence.
            </p>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
              We hold information-security and quality-management certifications
              that govern how your data is stored, accessed and protected — at
              every step of your journey with CreditKlick.
            </p>

            {/* Accreditation Badges */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {ACCREDITATIONS.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/90 bg-blue-50/90 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-blue-900 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CRIF & Enterprise Security Box */}
          <div className="data-safe-crif-col">
            <div className="data-safe-trust-box">
              <div className="data-safe-trust-grid">
                {TRUST_PILLARS.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg ${pillar.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataSafeSection;
