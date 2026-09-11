"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { PARTNER_BANKS } from "./ecosystem.data";

interface LoansTabProps {
  loanAmount: number;
  loanTenure: number;
  onAmountChange: (amount: number) => void;
  onTenureChange: (tenure: number) => void;
}

export const LoansTab: React.FC<LoansTabProps> = ({
  loanAmount,
  loanTenure,
  onAmountChange,
  onTenureChange,
}) => {
  const annualInterestRate = 0.1049; // 10.49%
  const monthlyRate = annualInterestRate / 12;
  const totalMonths = loanTenure * 12;
  const calculatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  return (
    <div className="eco-stage-grid">
      <div className="eco-stage-left space-y-5 sm:space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase font-mono">
            <Zap className="w-3.5 h-3.5" />
            Instant 2-Hour Disbursal
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Zigma Loan Syndication Engine
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Custom algorithmic matching directly connected to 40+ scheduled commercial banks. Paperless e-KYC approval with zero branch visits.
          </p>
        </div>

        {/* Loan Slider */}
        <div className="eco-slider-card">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Required Loan Amount</span>
              <span className="font-mono text-base text-emerald-600 font-extrabold">
                ₹{loanAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min={100000}
              max={5000000}
              step={50000}
              value={loanAmount}
              onChange={(e) => onAmountChange(Number(e.target.value))}
              className="eco-loan-slider"
              aria-label="Loan Amount Slider"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
              <span>₹1 Lakh</span>
              <span>₹25 Lakhs</span>
              <span>₹50 Lakhs</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Tenure (Years)</span>
              <span className="font-mono text-sm text-slate-900 font-bold">{loanTenure} Years</span>
            </div>
            <div className="eco-tenure-grid">
              {[1, 2, 3, 4, 5].map((yr) => (
                <button
                  key={yr}
                  onClick={() => onTenureChange(yr)}
                  className={`eco-tenure-btn ${loanTenure === yr ? "eco-tenure-active" : ""}`}
                  type="button"
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Link
            href="/loans"
            className="eco-cta-btn shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            }}
          >
            <span>Apply For Instant Loan</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* Right Calculated Terminal Card */}
      <div className="eco-stage-right eco-emi-card">
        <div className="eco-emi-header">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400">Estimated Monthly EMI</span>
            <p className="eco-emi-amount">
              ₹{calculatedEmi.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-slate-500 ml-1">/mo</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase font-bold text-slate-400">Preferential APR</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-600 font-mono mt-0.5">10.49%</p>
          </div>
        </div>

        {/* Bank Matching Probability Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Real-Time Bank Approval Odds:
          </span>
          <div className="eco-bank-list">
            {PARTNER_BANKS.map((item, idx) => (
              <div key={idx} className="eco-bank-item">
                <div>
                  <p className="text-xs font-bold text-slate-900">{item.bank}</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">{item.match}</p>
                </div>
                <div className="text-right">
                  <span className="eco-bank-badge">
                    {item.badge}
                  </span>
                  <p className="text-xs font-bold font-mono text-slate-800 mt-0.5">{item.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
