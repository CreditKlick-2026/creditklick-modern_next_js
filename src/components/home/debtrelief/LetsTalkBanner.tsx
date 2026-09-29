"use client";

import React from "react";
import Link from "next/link";

export function LetsTalkBanner() {
  return (
    <section className="w-full px-6 py-14">
      <div className="container relative mx-auto overflow-hidden rounded-3xl bg-blue-900 px-8 py-16 text-center sm:px-12">
        {/* Decorative blobs */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <circle cx="120" cy="60" r="140" fill="#155dfc" opacity="0.28" />
          <circle cx="1080" cy="340" r="180" fill="#155dfc" opacity="0.22" />
          <circle cx="960" cy="70" r="60" fill="#2b7fff" opacity="0.3" />
          <circle cx="240" cy="360" r="42" fill="#2b7fff" opacity="0.3" />
        </svg>

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
            चला बोलूया
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            LET&apos;S TALK
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100">
            One honest conversation is all it takes to start. Our advisors will
            walk you through your options — no judgement, no obligation.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-blue-900 transition hover:bg-blue-50"
          >
            Talk To An Advisor
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
