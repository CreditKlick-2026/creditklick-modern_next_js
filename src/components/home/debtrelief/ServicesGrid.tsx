"use client";

import React from "react";
import Link from "next/link";
import {
  DebtCounselingIcon,
  FinancialEmpowermentIcon,
  DfiForumIcon,
  DebtManagementIcon,
  LegalSolutionsIcon,
  CustomerPortalIcon,
} from "./icons";

// Left nodes (Advisory, Planning & Management)
const LEFT_NODES = [
  {
    title: "Debt Counseling",
    desc: "Personalized advice to navigate challenges & make informed decisions.",
    href: "/contact",
    tag: "1-on-1 Session",
    Icon: DebtCounselingIcon,
    iconColor: "#2563eb",
    iconBg: "rgba(37, 99, 235, 0.08)",
  },
  {
    title: "Debt Management",
    desc: "Customized plans consolidating EMIs into a single monthly payment.",
    href: "/loans",
    tag: "Lower Interest",
    Icon: DebtManagementIcon,
    iconColor: "#d97706",
    iconBg: "rgba(217, 119, 6, 0.08)",
  },
  {
    title: "Financial Empowerment",
    desc: "Literacy programs to regain control & achieve lasting stability.",
    href: "/blog",
    tag: "Free Modules",
    Icon: FinancialEmpowermentIcon,
    iconColor: "#059669",
    iconBg: "rgba(5, 150, 105, 0.08)",
  },
  {
    title: "Credit Refine",
    desc: "Algorithmic bureau dispute resolution to rebuild credit score.",
    href: "/refine",
    tag: "Score Audit",
    Icon: CustomerPortalIcon,
    iconColor: "#dc2626",
    iconBg: "rgba(220, 38, 38, 0.08)",
  },
];

// Right nodes (Legal, Support & Ecosystem)
const RIGHT_NODES = [
  {
    title: "Legal Debt Solutions",
    desc: "Protecting rights & negotiating with creditors to eliminate stress.",
    href: "/register-complaint",
    tag: "Anti-Harassment",
    Icon: LegalSolutionsIcon,
    iconColor: "#e11d48",
    iconBg: "rgba(225, 29, 72, 0.08)",
  },
  {
    title: "Customer App / Portal",
    desc: "Easy 24/7 access to resources & live debt resolution tracking.",
    href: "/login",
    tag: "Real-Time Tracking",
    Icon: CustomerPortalIcon,
    iconColor: "#7c3aed",
    iconBg: "rgba(124, 58, 237, 0.08)",
  },
  {
    title: "Community Forum",
    desc: "Community platform for sharing experiences & debt management insights.",
    href: "/blog",
    tag: "Peer Community",
    Icon: DfiForumIcon,
    iconColor: "#0891b2",
    iconBg: "rgba(8, 145, 178, 0.08)",
  },
  {
    title: "Repayment Calculators",
    desc: "Interactive financial tools to plan loan settlements & timelines.",
    href: "/calculators",
    tag: "EMI Simulator",
    Icon: DebtManagementIcon,
    iconColor: "#0d9488",
    iconBg: "rgba(13, 148, 136, 0.08)",
  },
];

export function ServicesGrid() {
  return (
    <section className="dt-circuit-section w-full" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">

        {/* Section Pill Badge */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-blue-900 bg-blue-100/70 border border-blue-300/60 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            HOW CREDITKLICK HELPS YOU
          </span>
        </div>

        {/* =========================================================
            DESKTOP INTERACTIVE CIRCUIT MAP (min-width: 1024px)
            ========================================================= */}
        <div
          className="hidden lg:block dt-circuit-board"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1100px",
            height: "520px",
            minHeight: "520px",
            margin: "0 auto",
          }}
        >
          {/* SVG Circuit Line Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 1100 520"
            fill="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* Background Static Trace Lines */}
            <path d="M 270 35 H 370 L 480 210" className="dt-circuit-line-bg" />
            <path d="M 290 170 H 390 L 480 240" className="dt-circuit-line-bg" />
            <path d="M 290 350 H 390 L 480 280" className="dt-circuit-line-bg" />
            <path d="M 270 485 H 370 L 480 310" className="dt-circuit-line-bg" />

            <path d="M 830 35 H 730 L 620 210" className="dt-circuit-line-bg" />
            <path d="M 810 170 H 710 L 620 240" className="dt-circuit-line-bg" />
            <path d="M 810 350 H 710 L 620 280" className="dt-circuit-line-bg" />
            <path d="M 830 485 H 730 L 620 310" className="dt-circuit-line-bg" />

            {/* Pulsing Animated Data Flow Lines */}
            <path d="M 270 35 H 370 L 480 210" className="dt-circuit-line-pulse" />
            <path d="M 290 170 H 390 L 480 240" className="dt-circuit-line-pulse" />
            <path d="M 290 350 H 390 L 480 280" className="dt-circuit-line-pulse" />
            <path d="M 270 485 H 370 L 480 310" className="dt-circuit-line-pulse" />

            <path d="M 830 35 H 730 L 620 210" className="dt-circuit-line-pulse" />
            <path d="M 810 170 H 710 L 620 240" className="dt-circuit-line-pulse" />
            <path d="M 810 350 H 710 L 620 280" className="dt-circuit-line-pulse" />
            <path d="M 830 485 H 730 L 620 310" className="dt-circuit-line-pulse" />

            {/* DoubleTick-style Accent Pills on Circuit Traces */}
            <rect x="335" y="32" width="20" height="6" rx="3" fill="#2563eb" />
            <rect x="365" y="167" width="20" height="6" rx="3" fill="#2563eb" />
            <rect x="365" y="347" width="20" height="6" rx="3" fill="#2563eb" />
            <rect x="335" y="482" width="20" height="6" rx="3" fill="#2563eb" />

            <rect x="745" y="32" width="20" height="6" rx="3" fill="#2563eb" />
            <rect x="715" y="167" width="20" height="6" rx="3" fill="#2563eb" />
            <rect x="715" y="347" width="20" height="6" rx="3" fill="#2563eb" />
            <rect x="745" y="482" width="20" height="6" rx="3" fill="#2563eb" />
          </svg>

          {/* Left Column Nodes (4 Items) */}
          <div className="dt-column-left">
            {LEFT_NODES.map((item, idx) => {
              const { Icon } = item;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="dt-node-card group"
                  style={{
                    marginLeft: idx === 0 || idx === 3 ? "0px" : "20px",
                  }}
                >
                  <span className="dt-corner-bracket dt-corner-tl" />
                  <span className="dt-corner-bracket dt-corner-tr" />
                  <span className="dt-corner-bracket dt-corner-bl" />
                  <span className="dt-corner-bracket dt-corner-br" />

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Center Hub: Clean Card with CK 3D Logo as Background */}
          <div className="dt-center-hub-pos">
            <div className="dt-hub-card" aria-label="CreditKlick Hub" />
          </div>

          {/* Right Column Nodes (4 Items) */}
          <div className="dt-column-right">
            {RIGHT_NODES.map((item, idx) => {
              const { Icon } = item;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="dt-node-card group"
                  style={{
                    marginRight: idx === 0 || idx === 3 ? "0px" : "20px",
                  }}
                >
                  <span className="dt-corner-bracket dt-corner-tl" />
                  <span className="dt-corner-bracket dt-corner-tr" />
                  <span className="dt-corner-bracket dt-corner-bl" />
                  <span className="dt-corner-bracket dt-corner-br" />

                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            MOBILE & TABLET FLOW (< 1024px)
            ========================================================= */}
        <div className="block lg:hidden">
          {/* Centered Hub Box on Mobile with connector */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="dt-hub-card" aria-label="CreditKlick Hub" />

            {/* Glowing Connector Indicator */}
            <div className="flex flex-col items-center mt-3">
              <span className="w-0.5 h-5 bg-gradient-to-b from-blue-600 to-blue-300" />
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 mt-0.5 shadow-xs">
                8 Integrated Services
              </span>
              <span className="w-0.5 h-3 bg-gradient-to-b from-blue-200 to-transparent mt-0.5" />
            </div>
          </div>

          {/* Cards Grid on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {[...LEFT_NODES, ...RIGHT_NODES].map((item, idx) => {
              const { Icon } = item;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="dt-mobile-node-card group"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <p className="text-[13px] sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                        {item.title}
                      </p>
                      {item.tag && (
                        <span className="text-[9.5px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 flex-shrink-0 whitespace-nowrap">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM HEADLINE & VALUE PILLS (DoubleTick Style)
            ========================================================= */}
        <div
          className="dt-bottom-content"
          style={{
            marginTop: "60px",
            maxWidth: "880px",
            marginInline: "auto",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <h2
            className="text-slate-900 font-normal tracking-tight px-2"
            style={{
              fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
              fontSize: "clamp(22px, 3.2vw, 34px)",
              lineHeight: 1.35,
            }}
          >
            End-to-end support, from the first counselling call to the day you are finally debt free.
          </h2>

          {/* 3 Interactive Feature Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span className="dt-feature-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              REAL TIME SYNC
            </span>

            <span className="dt-feature-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              100% CONFIDENTIAL &amp; SAFE
            </span>

            <span className="dt-feature-badge">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m16 3 4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16" />
              </svg>
              CHOOSE YOUR ROADMAP
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
