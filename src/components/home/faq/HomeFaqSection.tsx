"use client";

import React, { useState } from "react";
import { FAQS_DATA } from "./faq.data";
import { FaqAccordionItem } from "./FaqAccordionItem";

export default function HomeFaqSection() {
  // First item open by default, matching 7pixs layout
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container mx-auto max-w-5xl relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-8 sm:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-blue-900 md:text-5xl leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 md:text-xl text-md text-gray-500 max-w-xl mx-auto text-center leading-relaxed">
            Answers to common questions about our platform
          </p>
        </div>

        {/* 7pixs Accordion Group */}
        <div className="faq-accordion-wrapper">
          {FAQS_DATA.map((faq, index) => (
            <FaqAccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFaq(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
