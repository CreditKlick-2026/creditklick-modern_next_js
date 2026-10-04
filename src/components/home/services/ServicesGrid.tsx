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
    <section id="services" className="dt-circuit-section" style={{ backgroundColor: "#ffffff", width: "100%" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10, paddingLeft: "1rem", paddingRight: "1rem" }}>

        {/* Section Pill Badge */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#1e3a8a",
            backgroundColor: "rgba(219,234,254,0.7)",
            border: "1px solid rgba(147,197,253,0.6)",
            padding: "6px 16px",
            borderRadius: "9999px",
          }}>
            <span style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#2563eb",
              animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
            }} />
            HOW CREDITKLICK HELPS YOU
          </span>
        </div>

        {/* Desktop Interactive Circuit Map — only visible ≥1024px */}
        <div className="dt-desktop-only dt-circuit-board" style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          height: "440px",
          minHeight: "440px",
          margin: "0 auto",
        }}>
          <CircuitTraces />
          <div className="dt-column-left">
            {LEFT_NODES.map((item, idx) => (
              <ServiceNodeCard key={item.title} node={item} index={idx} isRightColumn={false} />
            ))}
          </div>
          <div className="dt-center-hub-pos">
            <div className="dt-hub-card" aria-label="CreditKlick Hub" />
          </div>
          <div className="dt-column-right">
            {RIGHT_NODES.map((item, idx) => (
              <ServiceNodeCard key={item.title} node={item} index={idx} isRightColumn={true} />
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Flow — only visible <1024px */}
        <div className="dt-mobile-only">
          {/* Hub + connector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
            <div className="dt-hub-card" aria-label="CreditKlick Hub" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "12px" }}>
              <span style={{ display: "block", width: "2px", height: "20px", background: "linear-gradient(to bottom, #2563eb, #93c5fd)" }} />
              <span style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#2563eb",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                backgroundColor: "#eff6ff",
                padding: "2px 10px",
                borderRadius: "9999px",
                border: "1px solid #bfdbfe",
                marginTop: "2px",
              }}>
                8 Integrated Services
              </span>
              <span style={{ display: "block", width: "2px", height: "12px", background: "linear-gradient(to bottom, #bfdbfe, transparent)", marginTop: "2px" }} />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="dt-mobile-cards-grid">
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
