"use client";

import React from "react";
import Link from "next/link";

/** Logo mark: a speech bubble cradling a heart — "silence into conversation". */
function InitiativeMark() {
  return (
    <svg
      viewBox="0 0 160 160"
      className="h-32 w-32"
      role="img"
      aria-label="Support initiative logo"
    >
      <circle cx="80" cy="80" r="76" fill="#eff6ff" />
      <path
        d="M80 34c26 0 47 17.4 47 38.8 0 21.4-21 38.8-47 38.8a56 56 0 0 1-13.4-1.6L42 122l6.6-15.9C38.8 99 33 86.4 33 72.8 33 51.4 54 34 80 34z"
        fill="#155dfc"
      />
      <path
        d="M80 93c-1 0-2-.4-2.7-1L63.8 79c-5.4-5-5.7-13.4-.6-18.7a13 13 0 0 1 18.4-.5l-1.6-1.6a13 13 0 0 1 18.4.5c5 5.3 4.8 13.7-.6 18.7L82.7 92a3.8 3.8 0 0 1-2.7 1z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function SupportInitiative() {
  return (
    <section className="w-full bg-blue-50/60 py-16">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <InitiativeMark />
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-tight text-blue-900 sm:text-4xl">
            Sounds of Silence
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-600">
            <span className="font-semibold text-blue-900">
              Sounds of Silence (SOS)
            </span>{" "}
            is a CreditKlick initiative for people carrying the silent struggles
            of debt — the recovery calls, the sleepless nights, the fear of a
            missed EMI. It offers a stigma-free space to talk. With free,
            confidential financial and mental-health counselling, multilingual
            support and self-help resources, SOS helps replace silent suffering
            with care, and restores dignity. It is time to be heard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-700"
            >
              Let&apos;s Talk
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-7 py-3 text-sm font-bold uppercase tracking-wide text-blue-900 transition hover:border-blue-400"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
