"use client";

import React from "react";
import Link from "next/link";

export function CustomerCentricBanner() {
  return (
    <div className="mx-auto max-w-7xl my-16 px-4">
      <div className="mx-auto bg-gradient-to-l p-6 py-10 from-blue-100 to-gray-100 shadow-lg rounded-xl">
        <div className="mx-auto max-w-2xl lg:text-center space-y-10">
          <h2 className="md:text-4xl text-2xl font-semibold tracking-tight text-blue-900">
            Being Customer-Centric, we focus on client&apos;s needs before
            offering a solution
          </h2>
          <p className="text-xl leading-8 text-teal-800">
            You&apos;re at the center of our story, not just a statistic. Join
            us on your journey to improve your credit score with our
            confidential and expert Credit Improvement Services.
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/credit-score"
              className="px-6 py-3 text-lg font-semibold bg-blue-600 text-center rounded-md text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              Check Free Credit Score
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCentricBanner;
