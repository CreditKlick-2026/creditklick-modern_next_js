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
    <section id="services" className="dt-circuit-section" style={{ backgroundColor: "#ffffff", width: "100%", position: "relative" }}>
      <div id="how-it-works" style={{ position: "absolute", top: "-80px", left: 0 }} aria-hidden="true" />
      <div style={{ maxWidth: "80rem", margin: "0 auto", position: "relative", zIndex: 10, paddingLeft: "1rem", paddingRight: "1rem" }}>

        {/* Section Pill Badge */}
        <div style={{ textAlign: "center", marginBottom: "0.75rem" }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#1e3a8a",
            backgroundColor: "rgba(219, 232, 253, 0.7)",
            border: "1px solid rgba(21, 93, 252, 0.6)",
            padding: "5px 14px",
            borderRadius: "0px",
          }}>
            <span style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              backgroundColor: "#155dfc",
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
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "18px", marginTop: "4px" }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              margin: 0,
            }}>
              8 Integrated Services
            </h3>
            <p style={{
              fontSize: "12px",
              color: "#64748b",
              marginTop: "4px",
              maxWidth: "380px",
              marginInline: "auto",
            }}>
              Personalized solutions to repair credit, reduce EMIs, and become debt-free.
            </p>
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
