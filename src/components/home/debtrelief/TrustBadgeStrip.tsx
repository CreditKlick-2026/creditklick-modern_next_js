"use client";

import React from "react";

const STARS = [0, 1, 2, 3, 4];

function StarRow({ filled = 4.7 }: { filled?: number }) {
  return (
    <div className="flex items-center gap-1">
      {STARS.map((i) => {
        const fill = Math.max(0, Math.min(1, filled - i));
        return (
          <svg key={i} viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <defs>
              <linearGradient id={`star-fill-${i}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#155dfc" />
                <stop offset={`${fill * 100}%`} stopColor="#cbd5e1" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-fill-${i})`}
              d="M12 2.6l2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.43l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.6z"
            />
          </svg>
        );
      })}
    </div>
  );
}

export function TrustBadgeStrip() {
  return (
    <section className="w-full border-y border-slate-100 bg-white py-8">
      <div className="container mx-auto grid grid-cols-2 gap-8 px-6 sm:gap-10 lg:grid-cols-4">
        {/* 1. Aggregate customer rating */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <StarRow filled={4.7} />
          <p className="text-sm font-medium text-slate-600">Reviews 4.7/5</p>
        </div>

        {/* 2. Verified reviews platform */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="currentColor" aria-hidden="true">
              <path d="M12 2.6l2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.43l-5.81 3.05 1.11-6.47-4.7-4.58 6.5-.95L12 2.6z" />
            </svg>
            <span className="text-xl font-bold tracking-[0.18em] text-blue-900">
              VERIFIED
            </span>
          </div>
          <p className="text-sm font-medium text-slate-600">
            3,600+ genuine reviews
          </p>
        </div>

        {/* 3. Award */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-bold leading-snug text-blue-900">
            The Best Credit Solutions Company
            <br />
            in India 2026
          </p>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="9" r="5.5" />
              <path d="M8.5 13.6L7 22l5-2.6L17 22l-1.5-8.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Award Winning
            </span>
          </div>
        </div>

        {/* 4. Fintech recognition */}
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-bold text-blue-900">
            Fintech Startup of the Year 2026
          </p>
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2.1 2.1M16.9 16.9L19 19M19 5l-2.1 2.1M7.1 16.9L5 19" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              India FinTech Forum
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
