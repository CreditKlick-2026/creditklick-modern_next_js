"use client";

import React from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import { AUDIT_STEPS, TRAJECTORY_BARS } from "./ecosystem.data";

export const RefineTab: React.FC = () => {
  return (
    <div className="eco-stage-grid">
      <div className="eco-stage-left space-y-5 sm:space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-semibold uppercase font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            Regulatory Bureau Protocol
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Azul Credit Health Refine
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Official legal resolution for invalid negative remarks, incorrect late payments, and identity mix-ups on your bureau records. Watch your score recalibrate within 45 days.
          </p>
        </div>

        <div className="eco-audit-steps-list">
          {AUDIT_STEPS.map((step) => (
            <div key={step.num} className="eco-audit-step-item">
              <div
                className="eco-step-badge-num"
                style={
                  step.customBg
                    ? { backgroundColor: step.customBg, color: step.customColor }
                    : undefined
                }
              >
                {step.num}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{step.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/refine"
            className="eco-cta-btn shadow-[0_4px_16px_rgba(6,182,212,0.35)]"
            style={{
              background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
            }}
          >
            <span>Start Credit Score Rectification</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* Transformation Visual on Right */}
      <div className="eco-stage-right p-5 sm:p-7 md:p-8 rounded-2xl bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/30 border border-cyan-100 shadow-lg space-y-5 sm:space-y-6">
        <div className="eco-before-after-card">
          <div className="text-center">
            <span className="text-[10px] font-bold text-rose-500 uppercase">Prior Audit Score</span>
            <p className="eco-score-delta-val text-rose-600">610</p>
            <span className="text-[10px] text-slate-400">High Risk Tier</span>
          </div>

          <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-500 animate-pulse flex-shrink-0" />

          <div className="text-center">
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Post-Rectification</span>
            <p className="eco-score-delta-val text-emerald-600">775+</p>
            <span className="text-[10px] text-emerald-600 font-bold">+165 Pts Restored</span>
          </div>
        </div>

        {/* Pure CSS Dynamic Rising Trajectory Bars */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            45-Day Health Recalibration Curve:
          </span>
          <div className="eco-trajectory-chart">
            {TRAJECTORY_BARS.map((bar, idx) => (
              <div key={idx} className="eco-chart-col">
                <span className="text-[9px] font-mono font-bold text-slate-500">{bar.val}</span>
                <div
                  style={{ height: `${bar.pct}%` }}
                  className={`eco-chart-bar ${
                    idx >= 4 ? "eco-chart-bar-active" : "eco-chart-bar-inactive"
                  }`}
                />
                <span className="text-[9px] font-medium text-slate-400">{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="eco-legal-banner">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            100% Legal Bureau Rights Guaranteed
          </span>
          <span>No Advance Charges</span>
        </div>
      </div>
    </div>
  );
};
