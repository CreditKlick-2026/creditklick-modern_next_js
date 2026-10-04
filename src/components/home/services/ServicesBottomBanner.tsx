import React from "react";

export function ServicesBottomBanner() {
  return (
    <div
      className="dt-bottom-content"
      style={{
        marginTop: "32px",
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
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
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
  );
}
