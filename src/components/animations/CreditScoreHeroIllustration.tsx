"use client";

import { useEffect, useState } from "react";

const START_SCORE = 300;
const FINAL_SCORE = 780;
// Keep in sync with the needle keyframes below (delay + duration).
const COUNT_DELAY_MS = 500;
const COUNT_DURATION_MS = 1200;

const styles = `
.ckh-needle { transform-box: view-box; transform-origin: 280px 290px; transform: rotate(54deg); }
.ckh-pop, .ckh-twinkle, .ckh-breathe { transform-box: fill-box; transform-origin: center; }

@media (prefers-reduced-motion: no-preference) {
  .ckh-blob    { animation: ckh-fade 0.5s ease-out both; }
  .ckh-breathe { animation: ckh-breathe 6s ease-in-out 0.5s infinite; }
  .ckh-card    { animation: ckh-rise 0.6s cubic-bezier(.22,1,.36,1) 0.1s both; }
  .ckh-arc     { animation: ckh-draw 0.9s ease-out 0.3s both; }
  .ckh-needle  { animation: ckh-needle 1.2s ease-out 0.5s both; }
  .ckh-pop     { animation: ckh-pop 0.45s cubic-bezier(.34,1.56,.64,1) both; }
  .ckh-pop-1   { animation-delay: 1.7s; }
  .ckh-pop-2   { animation-delay: 1.9s; }
  .ckh-float-in { animation: ckh-fade 0.5s ease-out both; }
  .ckh-float-in-1 { animation-delay: 0.6s; }
  .ckh-float-in-2 { animation-delay: 0.8s; }
  .ckh-float-in-3 { animation-delay: 1s; }
  .ckh-bob     { animation: ckh-bob 3.2s ease-in-out infinite; }
  .ckh-bob-2   { animation-duration: 3.8s; animation-delay: -1.2s; }
  .ckh-bob-3   { animation-duration: 4.2s; animation-delay: -2.1s; }
  .ckh-twinkle { animation: ckh-twinkle 2.4s ease-in-out infinite; }
  .ckh-twinkle-2 { animation-delay: -0.8s; }
  .ckh-twinkle-3 { animation-delay: -1.6s; }
}

@keyframes ckh-fade    { from { opacity: 0; } to { opacity: 1; } }
@keyframes ckh-breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
@keyframes ckh-rise    { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes ckh-draw    { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@keyframes ckh-needle  {
  0%   { transform: rotate(-90deg); }
  70%  { transform: rotate(62deg); }
  85%  { transform: rotate(50deg); }
  100% { transform: rotate(54deg); }
}
@keyframes ckh-pop     { 0% { opacity: 0; transform: scale(0.4); } 100% { opacity: 1; transform: scale(1); } }
@keyframes ckh-bob     { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes ckh-twinkle { 0%, 100% { opacity: 0.35; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1); } }
`;

function useCountUp() {
  const [score, setScore] = useState(START_SCORE);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScore(FINAL_SCORE);
      return;
    }

    let frame = 0;
    const start = performance.now() + COUNT_DELAY_MS;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / COUNT_DURATION_MS, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setScore(Math.round(START_SCORE + (FINAL_SCORE - START_SCORE) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return score;
}

const Sparkle = ({ x, y, size = 1, className = "" }: { x: number; y: number; size?: number; className?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path
      className={`ckh-twinkle ${className}`}
      d="M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10Z"
      fill="#60A5FA"
    />
  </g>
);

export default function CreditScoreHeroIllustration() {
  const score = useCountUp();

  return (
    <svg
      viewBox="0 0 560 480"
      className="w-full h-auto"
      role="img"
      aria-labelledby="ck-hero-title"
      style={{ fontFamily: "inherit" }}
    >
      <title id="ck-hero-title">Free credit score report illustration</title>
      <style>{styles}</style>

      <defs>
        <radialGradient id="ck-hero-blob" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#DBEAFE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ck-hero-arc" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="410" y2="0">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="35%" stopColor="#F59E0B" />
          <stop offset="60%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id="ck-hero-coin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="ck-hero-trend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
        <filter id="ck-hero-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#1E3A8A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Background blob */}
      <g className="ckh-blob">
        <circle className="ckh-breathe" cx="290" cy="250" r="230" fill="url(#ck-hero-blob)" />
      </g>

      {/* Main score card */}
      <g className="ckh-card">
        <rect x="90" y="70" width="380" height="350" rx="28" fill="#FFFFFF" filter="url(#ck-hero-shadow)" />

        <text x="122" y="114" fontSize="16" fontWeight="700" fill="#1E293B">Your Credit Score</text>
        <circle cx="127" cy="132" r="4" fill="#22C55E" />
        <text x="137" y="136" fontSize="12" fill="#64748B">Updated today</text>

        {/* Gauge */}
        <path d="M150 290 A130 130 0 0 1 410 290" fill="none" stroke="#E2E8F0" strokeWidth="20" strokeLinecap="round" />
        <path
          className="ckh-arc"
          d="M150 290 A130 130 0 0 1 410 290"
          fill="none"
          stroke="url(#ck-hero-arc)"
          strokeWidth="20"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="0"
        />
        <text x="150" y="322" fontSize="13" fill="#94A3B8" textAnchor="middle">300</text>
        <text x="410" y="322" fontSize="13" fill="#94A3B8" textAnchor="middle">900</text>

        {/* Needle — drawn pointing straight up (600) and rotated to the score */}
        <g className="ckh-needle">
          <path d="M274 290 L280 192 L286 290 Z" fill="#1E293B" strokeLinejoin="round" />
        </g>
        <circle cx="280" cy="290" r="13" fill="#1E293B" />
        <circle cx="280" cy="290" r="5" fill="#FFFFFF" />

        <text x="280" y="356" fontSize="40" fontWeight="800" fill="#1E293B" textAnchor="middle">
          {score}
        </text>
        <g className="ckh-pop ckh-pop-1">
          <rect x="236" y="368" width="88" height="26" rx="13" fill="#DCFCE7" />
          <text x="280" y="386" fontSize="13" fontWeight="700" fill="#15803D" textAnchor="middle">Excellent</text>
        </g>
      </g>

      {/* Verified badge */}
      <g className="ckh-pop ckh-pop-2">
        <circle cx="462" cy="80" r="22" fill="#22C55E" filter="url(#ck-hero-shadow)" />
        <path d="M452 80 L459 87 L472 73" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating: security shield */}
      <g className="ckh-float-in ckh-float-in-1">
        <g className="ckh-bob">
          <circle cx="72" cy="140" r="34" fill="#FFFFFF" filter="url(#ck-hero-shadow)" />
          <path d="M72 120 L87 126 V138 C87 148 81 156 72 160 C63 156 57 148 57 138 V126 Z" fill="#2563EB" />
          <path d="M65 139 L70 144 L80 133" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* Floating: rupee coin */}
      <g className="ckh-float-in ckh-float-in-2">
        <g className="ckh-bob ckh-bob-2">
          <circle cx="505" cy="185" r="30" fill="url(#ck-hero-coin)" filter="url(#ck-hero-shadow)" />
          <circle cx="505" cy="185" r="23" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
          <text x="505" y="195" fontSize="28" fontWeight="800" fill="#FFFFFF" textAnchor="middle">₹</text>
        </g>
      </g>

      {/* Floating: trend chart */}
      <g className="ckh-float-in ckh-float-in-3">
        <g className="ckh-bob ckh-bob-3">
          <rect x="400" y="350" width="120" height="72" rx="14" fill="#FFFFFF" filter="url(#ck-hero-shadow)" />
          <path d="M416 404 L440 390 L458 396 L482 376 L502 368 V410 H416 Z" fill="url(#ck-hero-trend)" />
          <polyline
            points="416,404 440,390 458,396 482,376 502,368"
            fill="none"
            stroke="#22C55E"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="502" cy="368" r="5" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2" />
        </g>
      </g>

      {/* Sparkles */}
      <Sparkle x={525} y={70} />
      <Sparkle x={40} y={260} size={0.8} className="ckh-twinkle-2" />
      <Sparkle x={140} y={450} size={0.7} className="ckh-twinkle-3" />
    </svg>
  );
}
