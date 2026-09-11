"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowRight, Award, Lock } from "lucide-react";
import { SIMULATOR_PERKS, SCORE_TIERS } from "./ecosystem.data";

interface SimulatorTabProps {
  simScore: number;
  onScoreChange: (score: number) => void;
}

export const SimulatorTab: React.FC<SimulatorTabProps> = ({
  simScore,
  onScoreChange,
}) => {
  const minScore = 300;
  const maxScore = 900;
  const scorePercentage = Math.max(
    0,
    Math.min(100, ((simScore - minScore) / (maxScore - minScore)) * 100)
  );
  // SVG Arc length for radius 64 is 201
  const strokeDashoffset = 201 - (201 * (scorePercentage * 0.75)) / 100;

  const getScoreTier = (score: number) => {
    return (
      SCORE_TIERS.find((t) => score >= t.min) || SCORE_TIERS[SCORE_TIERS.length - 1]
    );
  };

  const tier = getScoreTier(simScore);

  return (
    <div className="eco-stage-grid">
      {/* Left Controls & Info */}
      <div className="eco-stage-left space-y-5 sm:space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Live Interactive Simulation
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Radiant Bureau Credit Health
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Move the slider to test different credit score brackets. See how institutional banks immediately unlock higher limits and lower interest rates in real-time.
          </p>
        </div>

        {/* Interactive Score Slider */}
        <div className="eco-slider-card">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Simulate Your Score</span>
            <span className="font-mono text-base text-blue-600 font-extrabold">
              {simScore} PTS
            </span>
          </div>
          <input
            type="range"
            min={300}
            max={900}
            step={5}
            value={simScore}
            onChange={(e) => onScoreChange(Number(e.target.value))}
            className="eco-range-slider"
            aria-label="Credit Score Simulator"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>300 (Poor)</span>
            <span>650 (Fair)</span>
            <span>750 (Good)</span>
            <span>900 (Elite)</span>
          </div>
        </div>

        {/* Unlocked Offers based on Score */}
        <div className="space-y-2">
          <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Instantly Unlocked In This Tier:
          </p>
          <div className="eco-perks-grid">
            {SIMULATOR_PERKS.map((perk, idx) => (
              <div key={idx} className="eco-perk-item">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Link
            href="/credit-score"
            className="eco-cta-btn shadow-[0_4px_16px_rgba(80,162,255,0.4)]"
            style={{
              background: "linear-gradient(135deg, #50a2ff 0%, #2b7fff 100%)",
            }}
          >
            <span>Check Real Bureau Score (100% Free)</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* Right Interactive Gauge Visualization */}
      <div className="eco-stage-right eco-gauge-card">
        <div className="eco-gauge-display">
          <svg className="w-full h-full" viewBox="0 0 160 110">
            {/* Scale Track */}
            <path
              d="M 18 95 A 64 64 0 0 1 142 95"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Live Dynamic Score Path */}
            <path
              d="M 18 95 A 64 64 0 0 1 142 95"
              fill="none"
              stroke="url(#dynamicLaserGrad)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="201"
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
            <defs>
              <linearGradient id="dynamicLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="35%" stopColor="#f59e0b" />
                <stop offset="65%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* Live Score Display */}
          <div className="absolute bottom-2 flex flex-col items-center">
            <span className="eco-gauge-score-value">
              {simScore}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-0.5 mt-1 rounded-full text-xs font-bold uppercase tracking-wider border ${tier.bg} ${tier.color}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
              {tier.label}
            </span>
          </div>
        </div>

        <div className="eco-trust-row">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            CRIF High Mark
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-cyan-600" />
            Experian Certified
          </span>
        </div>

        <div className="eco-security-banner">
          <span className="flex items-center gap-1 font-medium">
            <Lock className="w-3.5 h-3.5 text-blue-500" />
            Zero impact on credit score
          </span>
          <span className="text-emerald-600 font-bold">256-Bit SSL</span>
        </div>
      </div>
    </div>
  );
};
