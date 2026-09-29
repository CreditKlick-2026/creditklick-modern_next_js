"use client";

import React from "react";

const FEATURES = [
  {
    title: "Easy Communication",
    description:
      "Connect directly with our expert advisors for personalized support.",
    icon: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.7 9.7 0 0 1-3.4-.6L3 21l1.8-5A8.2 8.2 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
        <path d="M9 11h.01M12.5 11h.01M16 11h.01" strokeWidth="2.5" />
      </>
    ),
  },
  {
    title: "Resource Hub",
    description:
      "Access valuable resources, tips, and educational materials.",
    icon: (
      <>
        <path d="M4 19.5V5a2 2 0 0 1 2-2h12a1 1 0 0 1 1 1v15" />
        <path d="M6 17h13v4H6a2 2 0 0 1 0-4z" />
        <path d="M9 7h7M9 10.5h5" />
      </>
    ),
  },
  {
    title: "Real Time Financial Insights",
    description: "Monitor your financial progress anytime, anywhere.",
    icon: (
      <>
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="M7 15l4-5 3.5 3L21 6" />
        <path d="M17 6h4v4" />
      </>
    ),
  },
  {
    title: "Community Forum",
    description:
      "Share experiences, gain knowledge, and learn from others on your journey to financial freedom.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.2" />
        <circle cx="17" cy="9.5" r="2.6" />
        <path d="M2.5 19.5a6.5 6.5 0 0 1 13 0" />
        <path d="M16 14.2a5.6 5.6 0 0 1 5.5 5.3" />
      </>
    ),
  },
] as const;

export function AppFeatureCards() {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
          Everything You Need, In One App
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {feature.icon}
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-bold text-blue-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
