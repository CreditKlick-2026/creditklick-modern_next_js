"use client";

import React from "react";
import { TESTIMONIALS_DATA } from "./testimonials.data";
import { TestimonialColumn } from "./TestimonialColumn";

export default function HappyCustomersSection() {
  const col1 = TESTIMONIALS_DATA.slice(0, 5);
  const col2 = TESTIMONIALS_DATA.slice(5, 10);
  const col3 = TESTIMONIALS_DATA.slice(10, 15);

  return (
    <section id="testimonials" className="testimonial-section">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header styled after 7pixs with Credit Health Promo Typography */}
        <div className="text-center flex flex-col items-center mb-8 sm:mb-12">
          <h2 className="text-3xl font-semibold tracking-tight text-blue-900 md:text-5xl leading-tight">
            Hear It From Our Happy Customers{" "}
            <span className="testimonial-accent-word">
              Testimonials
              <span className="testimonial-cursor-blink" aria-hidden="true" />
            </span>
          </h2>

          <p className="mt-4 md:text-xl text-md text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real stories of credit repair, approved personal loans, and interest savings from verified CreditKlick users.
          </p>
        </div>

        {/* 7pixs Infinite Vertical Scrolling Multi-Column Stage */}
        <div className="testimonial-marquee-stage">
          {/* Column 1 (Visible on All Viewports) */}
          <TestimonialColumn items={col1} duration={26} />

          {/* Column 2 (Visible on Tablet & Desktop >= 768px) */}
          <TestimonialColumn
            items={col2}
            duration={34}
            className="testimonial-col-tablet-plus"
          />

          {/* Column 3 (Visible on Desktop >= 1024px) */}
          <TestimonialColumn
            items={col3}
            duration={30}
            className="testimonial-col-desktop-only"
          />
        </div>
      </div>
    </section>
  );
}
