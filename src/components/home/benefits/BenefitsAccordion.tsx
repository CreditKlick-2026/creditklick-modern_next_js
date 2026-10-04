"use client";

import React, { useState } from "react";
import "./benefits.css";
import { BENEFITS } from "./benefits.data";
import { BenefitsIllustration } from "./BenefitsIllustration";

export function BenefitsAccordion() {
  // Allow toggling open/close on click (null means all closed, or index of open card)
  const [open, setOpen] = useState<number | null>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpen((prev) => (prev === index ? null : index));
    setActiveImageIndex(index);
  };

  const currentBenefit = BENEFITS[activeImageIndex] || BENEFITS[0];

  return (
    <section id="benefits" className="w-full bg-blue-50/60 py-16">
      <div className="max-w-7xl mx-auto grid items-center gap-10 lg:gap-14 px-4 sm:px-6 lg:px-8 lg:grid-cols-2">
        {/* Accordion List */}
        <div className="w-full">
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
            Benefits of CreditKlick
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Everything you need to repair your credit, compare offers and get support, in one place.
          </p>

          <div className="mt-8 space-y-3">
            {BENEFITS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.title}
                  className="overflow-hidden border border-slate-200 bg-white"
                  style={{ borderRadius: "0px" }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer transition-colors hover:bg-slate-50/60"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-blue-600" : "text-blue-900"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className="shrink-0 text-xl font-bold leading-none text-blue-600"
                      style={{
                        display: "inline-block",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </button>
                  <div
                    className={`benefits-accordion-collapse ${
                      isOpen ? "is-open" : "is-closed"
                    }`}
                  >
                    <div className="benefits-accordion-inner">
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

        {/* Dynamic Illustration */}
        <div className="flex items-center justify-center lg:justify-end w-full">
          <BenefitsIllustration
            imageSrc={currentBenefit.image}
            imageAlt={currentBenefit.imageAlt}
          />
        </div>
      </div>
    </section>
  );
}

export default BenefitsAccordion;
