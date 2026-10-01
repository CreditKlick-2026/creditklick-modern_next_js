"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { MediaCoverage } from "@/components/home/MediaCoverage";

export default function MediaClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* ── Main Media Coverage Component ── */}
      <MediaCoverage />

      {/* ── Media Inquiries & Press Kit ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold uppercase tracking-wider mb-3">
                <Mail className="w-3.5 h-3.5 text-cyan-600" />
                Press Relations
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Media & Journalist Inquiries
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                For press releases, interview requests with our leadership team, or financial industry research data, get in touch with our communications team.
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:media@creditklick.com" className="hover:underline">
                  media@creditklick.com
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm transition-colors text-center"
              >
                About CreditKlick
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md transition-colors text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
