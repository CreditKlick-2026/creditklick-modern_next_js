"use client";

import React from "react";
import Link from "next/link";

export function EnrollBanner() {
  return (
    <section className="w-full bg-white py-6">
      <div className="container mx-auto px-6">
        <Link
          href="/price"
          className="group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-blue-600 px-6 py-4 text-center transition-colors hover:bg-blue-700"
        >
          {/* Sheen sweep on hover */}
          <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-full" />
          <span className="relative text-lg font-bold tracking-wide text-white sm:text-2xl">
            Enroll Today for ₹599
          </span>
        </Link>
      </div>
    </section>
  );
}
