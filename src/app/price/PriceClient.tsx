"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Zap, Sparkles, HelpCircle } from "lucide-react";
import { ZetPlusRewards } from "@/components/zentry";

export default function PriceClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* ── Main Rewards & Pricing Comparison Section ── */}
      <ZetPlusRewards />

      {/* ── Why Choose CreditKlick Plus Highlights ── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Member Exclusives
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Why Upgrade to CreditKlick Plus?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Supercharge your credit journey with unmatched cashbacks, priority score updates, and premium perks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">3X Higher Rewards</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Earn boosted reward points on every loan EMI payment, utility recharge, and voucher redemption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Zero Hidden Fees</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                100% transparent pricing structure. Cancel anytime without lock-in periods or surprise deductions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Priority Credit Advisory</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Direct access to dedicated bureau dispute advisors to fix errors and accelerate your score recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Call To Action Banner ── */}
      <section className="py-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Start Earning Maximum Financial Rewards Today
          </h3>
          <p className="text-blue-100 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            Join over 5,00,000+ smart Indian borrowers optimizing their credit profile and rewards with CreditKlick.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/credit-score"
              className="px-8 py-3.5 rounded-xl font-semibold bg-white text-blue-700 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Check Free Credit Score
            </Link>
            <Link
              href="/credit-cards"
              className="px-8 py-3.5 rounded-xl font-semibold bg-blue-600/40 border border-white/20 text-white hover:bg-blue-600/60 transition-all text-sm sm:text-base backdrop-blur-sm"
            >
              Explore Credit Cards
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
