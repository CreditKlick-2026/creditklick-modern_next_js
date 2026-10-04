"use client";

import React from "react";
import "./services.css";
import { LEFT_NODES, RIGHT_NODES } from "./services.data";
import { ServiceNodeCard } from "./ServiceNodeCard";
import { ServiceMobileCard } from "./ServiceMobileCard";
import { CircuitTraces } from "./CircuitTraces";
import { ServicesBottomBanner } from "./ServicesBottomBanner";

export function ServicesGrid() {
  return (
    <section id="services" className="dt-circuit-section w-full" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">

        {/* Section Pill Badge */}
        <div className="text-center mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-blue-900 bg-blue-100/70 border border-blue-300/60 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            HOW CREDITKLICK HELPS YOU
          </span>
        </div>

        {/* Desktop Interactive Circuit Map */}
        <div
          className="hidden lg:block dt-circuit-board"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1100px",
            height: "440px",
            minHeight: "440px",
            margin: "0 auto",
          }}
        >
          {/* Circuit Background Traces */}
          <CircuitTraces />

          {/* Left Column Nodes */}
          <div className="dt-column-left">
            {LEFT_NODES.map((item, idx) => (
              <ServiceNodeCard key={item.title} node={item} index={idx} isRightColumn={false} />
            ))}
          </div>

          {/* Center Hub */}
          <div className="dt-center-hub-pos">
            <div className="dt-hub-card" aria-label="CreditKlick Hub" />
          </div>

          {/* Right Column Nodes */}
          <div className="dt-column-right">
            {RIGHT_NODES.map((item, idx) => (
              <ServiceNodeCard key={item.title} node={item} index={idx} isRightColumn={true} />
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Flow (< 1024px) */}
        <div className="block lg:hidden">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="dt-hub-card" aria-label="CreditKlick Hub" />
            <div className="flex flex-col items-center mt-3">
              <span className="w-0.5 h-5 bg-gradient-to-b from-blue-600 to-blue-300" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mt-0.5 shadow-xs">
                8 Integrated Services
              </span>
              <span className="w-0.5 h-3 bg-gradient-to-b from-blue-200 to-transparent mt-0.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {[...LEFT_NODES, ...RIGHT_NODES].map((item) => (
              <ServiceMobileCard key={item.title} node={item} />
            ))}
          </div>
        </div>

        {/* Bottom Headline & Value Pills */}
        <ServicesBottomBanner />

      </div>
    </section>
  );
}

export default ServicesGrid;
