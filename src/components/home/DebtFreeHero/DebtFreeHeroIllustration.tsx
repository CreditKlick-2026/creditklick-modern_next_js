import React from "react";

/**
 * DebtFreeHeroIllustration
 * ------------------------------------------------------------------
 * "The Victorious Journey to Debt Freedom"
 *
 * Ultra-premium 2.5D corporate editorial illustration for the
 * CreditKlick hero. Fully self-contained (no external assets, no
 * runtime dependencies) and safe to server-render.
 *
 * NOTE ON IDS: every gradient / filter / symbol id is namespaced with
 * the `ckh-` prefix. This is designed as a single hero instance per
 * page — rendering it twice would duplicate those ids.
 */

const FONT_BODY =
  'var(--font-inter), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const FONT_DISPLAY =
  'var(--font-outfit), var(--font-inter), system-ui, "Segoe UI", sans-serif';

export type DebtFreeHeroIllustrationProps = React.SVGProps<SVGSVGElement>;

export function DebtFreeHeroIllustration(props: DebtFreeHeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 600 700"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="ckh-title ckh-desc"
      fontFamily={FONT_BODY}
      {...props}
    >
      <title id="ckh-title">Debt free with CreditKlick</title>
      <desc id="ckh-desc">
        A confident Indian professional stands beside the CreditKlick app
        holding a debt settlement clearance certificate, surrounded by a credit
        score gauge reading 795 PRIME, a bank clearance shield, a rising credit
        trajectory graph and a badge reading eighteen lakh forty thousand rupees
        of debt resolved with zero harassment.
      </desc>

      {/* ============================================================
          DEFS — gradients, filters, patterns, reusable marks
         ============================================================ */}
      <defs>
        {/* --- Ambient / background --- */}
        <radialGradient id="ckh-ambient" cx="50%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#dbe8ff" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#eaf1ff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ckh-blueGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#155dfc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#155dfc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ckh-emeraldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ckh-groundGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#155dfc" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#155dfc" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ckh-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#155dfc" stopOpacity="0.38" />
          <stop offset="48%" stopColor="#10b981" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#155dfc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ckh-dotFade" cx="50%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="ckh-dots"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.6" cy="1.6" r="1.6" fill="#155dfc" />
        </pattern>
        <mask id="ckh-dotMask">
          <rect x="0" y="0" width="600" height="700" fill="url(#ckh-dotFade)" />
        </mask>

        {/* --- Human tones --- */}
        <linearGradient id="ckh-skin" x1="0.15" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#efc094" />
          <stop offset="45%" stopColor="#dfa470" />
          <stop offset="100%" stopColor="#bd7f4c" />
        </linearGradient>
        <linearGradient id="ckh-skinShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b9773f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8f5527" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="ckh-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c96a52" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#c96a52" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ckh-hair" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#262b38" />
          <stop offset="55%" stopColor="#141824" />
          <stop offset="100%" stopColor="#070a11" />
        </linearGradient>
        <linearGradient id="ckh-hairSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7ea2e0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7ea2e0" stopOpacity="0" />
        </linearGradient>

        {/* --- Wardrobe --- */}
        <linearGradient id="ckh-blazer" x1="0.1" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#25406f" />
          <stop offset="45%" stopColor="#16294f" />
          <stop offset="100%" stopColor="#0a1228" />
        </linearGradient>
        <linearGradient id="ckh-blazerLapel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#32548f" />
          <stop offset="100%" stopColor="#15294e" />
        </linearGradient>
        <linearGradient id="ckh-sleeve" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#0d1830" />
          <stop offset="55%" stopColor="#1c3161" />
          <stop offset="100%" stopColor="#0b1326" />
        </linearGradient>
        <linearGradient id="ckh-shirt" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="62%" stopColor="#f2f6fd" />
          <stop offset="100%" stopColor="#d5e0f2" />
        </linearGradient>
        <linearGradient id="ckh-trouser" x1="0" y1="0" x2="1" y2="0.15">
          <stop offset="0%" stopColor="#1b2029" />
          <stop offset="45%" stopColor="#3b4453" />
          <stop offset="100%" stopColor="#171b23" />
        </linearGradient>
        <linearGradient id="ckh-shoe" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#232a36" />
          <stop offset="100%" stopColor="#080b12" />
        </linearGradient>

        {/* --- Glassmorphism surfaces --- */}
        <linearGradient id="ckh-glass" x1="0.05" y1="0" x2="0.95" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="55%" stopColor="#f6f9ff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#dde8fb" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="ckh-glassSheen" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="48%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ckh-glassStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#b9cdf0" stopOpacity="0.55" />
        </linearGradient>

        {/* --- Brand --- */}
        <linearGradient id="ckh-gaugeArc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="48%" stopColor="#155dfc" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="ckh-emerald" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="ckh-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="ckh-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#155dfc" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="ckh-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#155dfc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#155dfc" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ckh-shield" cx="35%" cy="25%" r="85%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </radialGradient>
        <radialGradient id="ckh-seal" cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="55%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#046c4e" />
        </radialGradient>
        <radialGradient id="ckh-certGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ckh-pill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16305e" />
          <stop offset="55%" stopColor="#0e1e43" />
          <stop offset="100%" stopColor="#0a142e" />
        </linearGradient>
        <linearGradient id="ckh-coinA" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#7dafff" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="ckh-coinB" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#8df0c8" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* --- Device --- */}
        <linearGradient id="ckh-phoneBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a3b63" />
          <stop offset="45%" stopColor="#111c38" />
          <stop offset="100%" stopColor="#060b18" />
        </linearGradient>
        <linearGradient id="ckh-phoneScreen" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#edf3fd" />
        </linearGradient>
        <linearGradient id="ckh-screenHero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b6bff" />
          <stop offset="55%" stopColor="#155dfc" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>

        {/* --- Filters --- */}
        <filter
          id="ckh-cardShadow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="16"
            stdDeviation="16"
            floodColor="#0b2a6b"
            floodOpacity="0.18"
          />
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="3"
            floodColor="#0b2a6b"
            floodOpacity="0.1"
          />
        </filter>
        <filter id="ckh-softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="0"
            dy="8"
            stdDeviation="9"
            floodColor="#0b2a6b"
            floodOpacity="0.2"
          />
        </filter>
        <filter
          id="ckh-figureShadow"
          x="-40%"
          y="-30%"
          width="180%"
          height="170%"
        >
          <feDropShadow
            dx="-6"
            dy="14"
            stdDeviation="14"
            floodColor="#081c44"
            floodOpacity="0.22"
          />
        </filter>
        <filter id="ckh-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ckh-glowSm" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ckh-blurSoft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="9" />
        </filter>

        {/* --- Reusable marks --- */}
        <g id="ckh-spark">
          <path d="M 0 -9 Q 1.7 -1.7 9 0 Q 1.7 1.7 0 9 Q -1.7 1.7 -9 0 Q -1.7 -1.7 0 -9 Z" />
        </g>
        <g id="ckh-tick">
          <path
            d="M -4.6 0.2 L -1.4 3.4 L 4.8 -3.2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <style>{`
          @keyframes ckh-driftA { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-11px) } }
          @keyframes ckh-driftB { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
          @keyframes ckh-driftC { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
          @keyframes ckh-twinkle { 0%,100% { opacity: .25 } 50% { opacity: .95 } }
          @keyframes ckh-pulse { 0%,100% { opacity: .35 } 50% { opacity: .8 } }
          .ckh-a { animation: ckh-driftA 7s ease-in-out infinite; }
          .ckh-b { animation: ckh-driftB 8.6s ease-in-out -2.4s infinite; }
          .ckh-c { animation: ckh-driftC 6.4s ease-in-out -3.8s infinite; }
          .ckh-tw { animation: ckh-twinkle 4.2s ease-in-out infinite; }
          .ckh-tw2 { animation: ckh-twinkle 5.6s ease-in-out -1.8s infinite; }
          .ckh-pulse { animation: ckh-pulse 3.6s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) {
            .ckh-a, .ckh-b, .ckh-c, .ckh-tw, .ckh-tw2, .ckh-pulse { animation: none; }
          }
        `}</style>
      </defs>

      {/* ============================================================
          BACKDROP
         ============================================================ */}
      <g id="ambient-backdrop">
        <ellipse cx="300" cy="332" rx="292" ry="300" fill="url(#ckh-ambient)" />
        <ellipse cx="146" cy="228" rx="176" ry="156" fill="url(#ckh-blueGlow)" />
        <ellipse
          cx="468"
          cy="508"
          rx="162"
          ry="132"
          fill="url(#ckh-emeraldGlow)"
        />
        <rect
          x="0"
          y="0"
          width="600"
          height="700"
          fill="url(#ckh-dots)"
          mask="url(#ckh-dotMask)"
          opacity="0.16"
        />
        <g fill="none" stroke="url(#ckh-ring)" strokeWidth="1.25">
          <circle cx="300" cy="350" r="196" opacity="0.65" />
          <circle cx="300" cy="350" r="252" opacity="0.5" />
          <circle cx="300" cy="350" r="300" opacity="0.32" />
        </g>
      </g>

      {/* ============================================================
          STAGE / GROUND
         ============================================================ */}
      <g id="stage-ground">
        <ellipse cx="300" cy="656" rx="238" ry="34" fill="url(#ckh-groundGlow)" />
        <ellipse
          cx="288"
          cy="652"
          rx="98"
          ry="15"
          fill="#0d2a63"
          opacity="0.2"
          filter="url(#ckh-blurSoft)"
        />
        <ellipse
          cx="466"
          cy="566"
          rx="74"
          ry="11"
          fill="#0d2a63"
          opacity="0.12"
          filter="url(#ckh-blurSoft)"
        />
        <path
          d="M 62 656 L 538 656"
          stroke="#c3d6f5"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* ============================================================
          MOBILE APP INTERFACE
         ============================================================ */}
      <g id="app-interface" className="ckh-b" transform="rotate(4 466 372)">
        {/* device shell */}
        <rect
          x="400"
          y="212"
          width="132"
          height="320"
          rx="28"
          fill="url(#ckh-phoneBody)"
          filter="url(#ckh-cardShadow)"
        />
        <rect
          x="401.2"
          y="213.2"
          width="129.6"
          height="317.6"
          rx="26.8"
          fill="none"
          stroke="url(#ckh-glassStroke)"
          strokeWidth="1.4"
          opacity="0.55"
        />
        {/* screen */}
        <rect
          x="408"
          y="220"
          width="116"
          height="304"
          rx="21"
          fill="url(#ckh-phoneScreen)"
        />

        {/* status bar + notch */}
        <text x="417" y="236" fontSize="6" fontWeight="700" fill="#64748b">
          9:41
        </text>
        <g fill="#94a3b8">
          <rect x="497" y="231" width="7" height="4" rx="1" />
          <rect x="506" y="230" width="4" height="5" rx="1" />
          <rect x="512" y="229" width="8" height="6" rx="1.6" />
        </g>
        <rect x="452" y="224" width="26" height="7" rx="3.5" fill="#0a1226" />

        {/* app header */}
        <text
          x="417"
          y="256"
          fontSize="9"
          fontWeight="700"
          fill="#0b1a3a"
          fontFamily={FONT_DISPLAY}
        >
          CreditKlick
        </text>
        <circle cx="512" cy="252" r="7.5" fill="url(#ckh-blue)" />
        <circle cx="512" cy="249.6" r="2.6" fill="#ffffff" opacity="0.92" />
        <path
          d="M 506.6 257.4 C 507.8 253.8 516.2 253.8 517.4 257.4 Z"
          fill="#ffffff"
          opacity="0.92"
        />

        {/* hero balance card */}
        <rect
          x="416"
          y="264"
          width="100"
          height="58"
          rx="13"
          fill="url(#ckh-screenHero)"
          filter="url(#ckh-glowSm)"
        />
        <path
          d="M 416 277 L 516 277 L 516 264 A 13 13 0 0 0 503 264 L 429 264 A 13 13 0 0 0 416 277 Z"
          fill="url(#ckh-glassSheen)"
          opacity="0.28"
        />
        <text
          x="426"
          y="281"
          fontSize="5.4"
          fontWeight="700"
          letterSpacing="0.9"
          fill="#ffffff"
          opacity="0.72"
        >
          TOTAL DEBT RESOLVED
        </text>
        <text
          x="426"
          y="299"
          fontSize="15"
          fontWeight="800"
          fill="#ffffff"
          fontFamily={FONT_DISPLAY}
        >
          ₹18,40,000
        </text>
        <path
          d="M 426 313 L 440 308 L 454 311 L 468 301 L 482 304 L 496 293 L 506 289"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* settlement progress */}
        <text
          x="416"
          y="338"
          fontSize="5.6"
          fontWeight="700"
          letterSpacing="0.7"
          fill="#64748b"
        >
          SETTLEMENT PROGRESS
        </text>
        <text
          x="516"
          y="338"
          fontSize="6.6"
          fontWeight="800"
          fill="#047857"
          textAnchor="end"
        >
          86%
        </text>
        <rect x="416" y="344" width="100" height="7" rx="3.5" fill="#e3ebf7" />
        <rect
          x="416"
          y="344"
          width="86"
          height="7"
          rx="3.5"
          fill="url(#ckh-emerald)"
        />

        {/* settled creditor rows */}
        {[362, 386, 410].map((y, i) => (
          <g key={y}>
            <rect
              x="416"
              y={y}
              width="100"
              height="19"
              rx="8"
              fill="#f2f6fd"
              stroke="#e2eaf7"
              strokeWidth="0.8"
            />
            <circle cx="427" cy={y + 9.5} r="5.4" fill="url(#ckh-emerald)" />
            <use
              href="#ckh-tick"
              transform={`translate(427 ${y + 9.5}) scale(0.72)`}
            />
            <rect
              x="437"
              y={y + 6}
              width={44 - i * 6}
              height="3.4"
              rx="1.7"
              fill="#c2cfe3"
            />
            <rect
              x="437"
              y={y + 12.4}
              width={30 - i * 4}
              height="2.8"
              rx="1.4"
              fill="#dde6f4"
            />
            <text
              x="509"
              y={y + 12}
              fontSize="5"
              fontWeight="800"
              letterSpacing="0.4"
              fill="#059669"
              textAnchor="end"
            >
              SETTLED
            </text>
          </g>
        ))}

        {/* harassment guard strip */}
        <rect
          x="416"
          y="436"
          width="100"
          height="22"
          rx="9"
          fill="#ecfdf5"
          stroke="#a7f3d0"
          strokeWidth="0.9"
        />
        <path
          d="M 428 441 L 434.4 443.4 C 434.4 448 431.2 451.6 428 453 C 424.8 451.6 421.6 448 421.6 443.4 Z"
          fill="url(#ckh-emerald)"
        />
        <text x="440" y="450" fontSize="6.4" fontWeight="800" fill="#047857">
          0 Harassment Calls
        </text>

        {/* primary CTA */}
        <rect
          x="416"
          y="466"
          width="100"
          height="25"
          rx="12.5"
          fill="url(#ckh-emerald)"
          filter="url(#ckh-glowSm)"
        />
        <text
          x="466"
          y="482.4"
          fontSize="7.4"
          fontWeight="800"
          letterSpacing="0.3"
          fill="#ffffff"
          textAnchor="middle"
        >
          View Certificate
        </text>
        <rect x="453" y="506" width="26" height="3.4" rx="1.7" fill="#cbd5e1" />

        {/* screen specular */}
        <path
          d="M 408 241 L 524 220 L 524 232 L 408 292 Z"
          fill="#ffffff"
          opacity="0.22"
        />
      </g>

      {/* ============================================================
          CHARACTER
         ============================================================ */}
      <g id="character" filter="url(#ckh-figureShadow)">
        {/* ---------- legs ---------- */}
        <g id="character-legs">
          <path
            d="M 250 398 C 247 442 249 502 253 560 C 255 592 257 612 258 628 L 284 628 C 284 610 285 590 286 560 C 288 502 290 442 290 398 Z"
            fill="url(#ckh-trouser)"
          />
          <path
            d="M 292 398 C 292 442 293 502 295 560 C 296 590 297 610 297 628 L 323 628 C 324 612 326 592 328 560 C 332 502 334 442 332 398 Z"
            fill="url(#ckh-trouser)"
          />
          {/* front creases */}
          <path
            d="M 268 420 C 267 480 269 560 271 622"
            stroke="#ffffff"
            strokeOpacity="0.1"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 310 420 C 310 480 311 560 311 622"
            stroke="#ffffff"
            strokeOpacity="0.1"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />
          {/* inner-leg separation */}
          <path
            d="M 288 402 C 288 470 288 560 288 626 L 294 626 C 294 560 294 470 294 402 Z"
            fill="#05070c"
            opacity="0.32"
          />
        </g>

        {/* ---------- shoes ---------- */}
        <g id="character-shoes">
          <path
            d="M 258 618 L 286 618 C 286 631 283 640 276 645 C 270 649 261 651 251 651 C 243 651 239 648 241 643 C 244 633 250 626 258 618 Z"
            fill="url(#ckh-shoe)"
          />
          <path
            d="M 241.4 646 C 243 649.6 247 651 251 651 C 261 651 270 649 276 645 L 277.6 648.6 C 271 652.4 261.4 654.4 251 654.4 C 243.4 654.4 239.4 651.6 241.4 646 Z"
            fill="#0a0d14"
          />
          <path
            d="M 294 618 L 322 618 C 330 626 337 633 340 643 C 342 648 338 651 330 651 C 320 651 311 649 305 645 C 298 640 294 631 294 618 Z"
            fill="url(#ckh-shoe)"
          />
          <path
            d="M 305 645 C 311 649 320 651 330 651 C 334 651 337.4 650.4 339.4 649 C 339.6 652.2 336 654.4 330 654.4 C 319.6 654.4 310 652.4 303.4 648.6 Z"
            fill="#0a0d14"
          />
          <path
            d="M 262 622 C 268 626 278 627 285 625"
            stroke="#ffffff"
            strokeOpacity="0.14"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 299 624 C 306 627 314 627 320 624"
            stroke="#ffffff"
            strokeOpacity="0.14"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ---------- neck ---------- */}
        <g id="character-neck">
          <path
            d="M 279 206 L 279 240 C 279 246 284 250 290 250 C 296 250 301 246 301 240 L 301 206 Z"
            fill="url(#ckh-skin)"
          />
          <path
            d="M 277 206 C 282 220 298 220 303 206 L 303 218 C 296 228 284 228 277 218 Z"
            fill="url(#ckh-skinShade)"
            opacity="0.55"
          />
        </g>

        {/* ---------- shirt ---------- */}
        <g id="character-shirt">
          <path
            d="M 274 240 C 279 278 281 316 281 352 L 301 352 C 301 316 303 278 308 240 Z"
            fill="url(#ckh-shirt)"
          />
          <path
            d="M 291 244 C 291 288 291 322 291 352"
            stroke="#c7d4ea"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="291" cy="286" r="1.5" fill="#c7d4ea" />
          <circle cx="291" cy="318" r="1.5" fill="#c7d4ea" />
          {/* open collar wings */}
          <path d="M 276 240 L 291 261 L 278 266 L 268 248 Z" fill="#ffffff" />
          <path d="M 306 240 L 291 261 L 304 266 L 314 248 Z" fill="#f4f8ff" />
        </g>

        {/* ---------- blazer ---------- */}
        <g id="character-blazer">
          <path
            d="M 282 244
               C 268 245 257 250 249 258
               C 239 266 235 280 233 296
               C 230 324 231 358 235 388
               C 237 404 238 412 239 420
               L 341 420
               C 342 412 343 404 345 388
               C 349 358 350 324 347 296
               C 345 280 341 266 331 258
               C 323 250 312 245 298 244
               L 290 302 Z"
            fill="url(#ckh-blazer)"
          />
          {/* shoulder rim light */}
          <path
            d="M 282 244 C 268 245 257 250 249 258 C 241 264 237 274 234.6 286"
            stroke="#5f8bdd"
            strokeOpacity="0.5"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 298 244 C 312 245 323 250 331 258 C 339 264 343 274 345.4 286"
            stroke="#5f8bdd"
            strokeOpacity="0.28"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* lapels */}
          <path
            d="M 283 244 C 276 248 271 260 273 273 L 290 303 L 288.6 247 Z"
            fill="url(#ckh-blazerLapel)"
          />
          <path
            d="M 297 244 C 304 248 309 260 307 273 L 290 303 L 291.4 247 Z"
            fill="url(#ckh-blazerLapel)"
            opacity="0.82"
          />
          <path
            d="M 283 244 L 290 303"
            stroke="#0a1228"
            strokeOpacity="0.5"
            strokeWidth="1.1"
            fill="none"
          />
          <path
            d="M 297 244 L 290 303"
            stroke="#0a1228"
            strokeOpacity="0.5"
            strokeWidth="1.1"
            fill="none"
          />
          {/* collar band */}
          <path
            d="M 277 241 C 284 236 298 236 305 241 L 302 249 C 296 245 286 245 280 249 Z"
            fill="#0d1830"
          />
          {/* front closure + button */}
          <path
            d="M 290 303 C 290 340 289 380 288 420"
            stroke="#060c1a"
            strokeOpacity="0.45"
            strokeWidth="1.4"
            fill="none"
          />
          <circle cx="290" cy="322" r="2.8" fill="#33518a" />
          <circle cx="290" cy="322" r="1.1" fill="#0a1228" />
          {/* pocket welts */}
          <path
            d="M 248 372 L 274 368"
            stroke="#060c1a"
            strokeOpacity="0.5"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 308 368 L 334 372"
            stroke="#060c1a"
            strokeOpacity="0.5"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          {/* emerald pocket square */}
          <path
            d="M 313 292 L 329 292 L 326.4 285 L 322.4 289.4 L 318.4 285 Z"
            fill="url(#ckh-emerald)"
          />
          {/* body form shadow */}
          <path
            d="M 331 258 C 341 266 345 280 347 296 C 350 324 349 358 345 388 C 343 404 342 412 341 420 L 322 420 C 326 384 330 320 326 262 Z"
            fill="#040914"
            opacity="0.28"
          />
        </g>

        {/* ---------- arm: character's right / viewer left ---------- */}
        <g id="character-arm-left">
          <path
            d="M 243 262 L 231 352 L 243 388"
            fill="none"
            stroke="url(#ckh-sleeve)"
            strokeWidth="29"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 234 268 L 223 350"
            fill="none"
            stroke="#6f97e4"
            strokeOpacity="0.32"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <path
            d="M 241.6 384 L 244.4 391"
            fill="none"
            stroke="#f3f7ff"
            strokeWidth="26"
            strokeLinecap="round"
          />
          <circle cx="234" cy="389" r="1.6" fill="#c7d4ea" />
        </g>

        {/* ---------- clearance certificate ---------- */}
        <g id="clearance-certificate" transform="translate(180 366) rotate(-9)">
          <ellipse
            cx="0"
            cy="4"
            rx="106"
            ry="80"
            fill="url(#ckh-certGlow)"
            className="ckh-pulse"
          />
          <rect
            x="-69"
            y="-48"
            width="138"
            height="96"
            rx="15"
            fill="url(#ckh-glass)"
            filter="url(#ckh-cardShadow)"
          />
          <rect
            x="-69"
            y="-48"
            width="138"
            height="96"
            rx="15"
            fill="url(#ckh-glassSheen)"
            opacity="0.5"
          />
          <rect
            x="-68.2"
            y="-47.2"
            width="136.4"
            height="94.4"
            rx="14.2"
            fill="none"
            stroke="url(#ckh-glassStroke)"
            strokeWidth="1.4"
          />
          <rect
            x="-69"
            y="-48"
            width="6"
            height="96"
            rx="3"
            fill="url(#ckh-line)"
            opacity="0.9"
          />
          <text
            x="-52"
            y="-29"
            fontSize="7.6"
            fontWeight="800"
            letterSpacing="1.5"
            fill="#155dfc"
          >
            CREDITKLICK · VERIFIED
          </text>
          <text
            x="-52"
            y="-13"
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.2"
            fill="#0b1a3a"
            fontFamily={FONT_DISPLAY}
          >
            DEBT CLEARANCE
          </text>
          <path
            d="M -52 -5.4 L 40 -5.4"
            stroke="#155dfc"
            strokeOpacity="0.2"
            strokeWidth="1.2"
          />
          <g fill="#1e3a8a" opacity="0.18">
            <rect x="-52" y="2" width="84" height="4.4" rx="2.2" />
            <rect x="-52" y="12" width="66" height="4.4" rx="2.2" />
            <rect x="-52" y="22" width="48" height="4.4" rx="2.2" />
          </g>
          <text
            x="-52"
            y="41"
            fontSize="8.4"
            fontWeight="800"
            letterSpacing="0.6"
            fill="#047857"
          >
            STATUS: FULLY CLEARED
          </text>
          {/* embossed official seal */}
          <g id="certificate-seal" transform="translate(40 18)">
            <rect
              x="-18"
              y="-18"
              width="36"
              height="36"
              rx="8"
              transform="rotate(22)"
              fill="url(#ckh-seal)"
              opacity="0.9"
            />
            <rect
              x="-18"
              y="-18"
              width="36"
              height="36"
              rx="8"
              transform="rotate(67)"
              fill="url(#ckh-seal)"
              opacity="0.9"
            />
            <circle cx="0" cy="0" r="17" fill="url(#ckh-seal)" />
            <circle
              cx="0"
              cy="0"
              r="13.4"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.55"
              strokeWidth="1.1"
            />
            <use href="#ckh-tick" transform="scale(1.55)" />
            <path
              d="M -13 -13 A 18 18 0 0 1 4 -16"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ---------- hand gripping the certificate ---------- */}
        <g id="hand-certificate">
          <path
            d="M 237 386 C 231 390 229 399 232 406 C 236 414 249 418 257 413 C 264 409 265 400 261 393 C 257 386 244 382 237 386 Z"
            fill="url(#ckh-skin)"
          />
          <g
            fill="none"
            stroke="#a9682f"
            strokeOpacity="0.45"
            strokeWidth="1.3"
            strokeLinecap="round"
          >
            <path d="M 240 391 C 246 389 253 391 256 395" />
            <path d="M 238 398 C 244 396 252 398 256 402" />
            <path d="M 238 405 C 243 404 250 405 254 408" />
          </g>
          <path
            d="M 236 386 C 240 383 246 383 250 385"
            stroke="#f0c49a"
            strokeOpacity="0.7"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ---------- arm: character's left / viewer right ---------- */}
        <g id="character-arm-right">
          <path
            d="M 337 262 L 357 341 L 376 319"
            fill="none"
            stroke="url(#ckh-sleeve)"
            strokeWidth="29"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 345 266 L 362 334"
            fill="none"
            stroke="#6f97e4"
            strokeOpacity="0.22"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M 374.4 321.6 L 378.4 317"
            fill="none"
            stroke="#f3f7ff"
            strokeWidth="26"
            strokeLinecap="round"
          />
          {/* leather watch */}
          <path
            d="M 378 323 L 386 314"
            stroke="#2a1d14"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <circle cx="382" cy="318.6" r="5.2" fill="#cbd5e1" />
          <circle cx="382" cy="318.6" r="3.9" fill="#0b1a3a" />
          <circle cx="382" cy="318.6" r="1.1" fill="#34d399" />
        </g>

        {/* ---------- open palm presenting the app ---------- */}
        <g id="hand-open-palm">
          <path
            d="M 397 293 C 403 289 411 291 414 296"
            stroke="url(#ckh-skin)"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 384 314
               C 380 306 383 297 391 294
               C 398 291 407 292 412 297
               C 418 302 419 311 414 317
               C 408 324 397 326 390 322
               C 386 320 384 317 384 314 Z"
            fill="url(#ckh-skin)"
          />
          <g
            fill="none"
            stroke="#a9682f"
            strokeOpacity="0.42"
            strokeWidth="1.3"
            strokeLinecap="round"
          >
            <path d="M 396 297 C 403 297 409 300 412 305" />
            <path d="M 392 303 C 399 303 406 306 409 311" />
            <path d="M 390 310 C 396 310 402 313 405 317" />
          </g>
          <path
            d="M 387 302 C 384 308 385 314 389 318"
            stroke="#f0c49a"
            strokeOpacity="0.65"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* ---------- head ---------- */}
        <g id="character-head">
          {/* ears */}
          <path
            d="M 267 181 C 260 179 258 189 261.6 195 C 263.6 198.4 266.4 199.4 268 198.4 Z"
            fill="url(#ckh-skin)"
          />
          <path
            d="M 313 181 C 320 179 322 189 318.4 195 C 316.4 198.4 313.6 199.4 312 198.4 Z"
            fill="url(#ckh-skin)"
          />
          {/* face */}
          <path
            d="M 266 186
               C 266 162 274 149 290 149
               C 306 149 314 162 314 186
               C 314 199 311 211 304 218
               C 299 223 294 226 290 226
               C 286 226 281 223 276 218
               C 269 211 266 199 266 186 Z"
            fill="url(#ckh-skin)"
          />
          {/* form shadow on the shaded side */}
          <path
            d="M 305 156 C 312 164 314 173 314 186 C 314 199 311 211 304 218 C 300 222 295 225 291 226 C 298 214 305 196 305 156 Z"
            fill="url(#ckh-skinShade)"
            opacity="0.4"
          />
          {/* cheeks */}
          <ellipse cx="276" cy="200" rx="9" ry="6" fill="url(#ckh-cheek)" />
          <ellipse cx="304" cy="200" rx="9" ry="6" fill="url(#ckh-cheek)" />

          {/* brows */}
          <path
            d="M 271.6 179.6 C 275.6 175.6 282 175.4 286.4 178.6"
            stroke="#2a1d16"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 293.6 178.6 C 298 175.4 304.4 175.6 308.4 179.6"
            stroke="#2a1d16"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          {/* eyes */}
          <g id="character-eyes">
            <path
              d="M 272 187.4 C 275 183 282.4 183 285.6 187.4 C 282.4 191.4 275 191.4 272 187.4 Z"
              fill="#fbf6f1"
            />
            <circle cx="278.8" cy="187.4" r="2.5" fill="#3a2a1e" />
            <circle cx="278.8" cy="187.4" r="1.2" fill="#100c08" />
            <circle cx="277.9" cy="186.3" r="0.8" fill="#ffffff" />
            <path
              d="M 272 187.4 C 275 183 282.4 183 285.6 187.4"
              stroke="#241812"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 294.4 187.4 C 297.6 183 305 183 308 187.4 C 305 191.4 297.6 191.4 294.4 187.4 Z"
              fill="#fbf6f1"
            />
            <circle cx="301.2" cy="187.4" r="2.5" fill="#3a2a1e" />
            <circle cx="301.2" cy="187.4" r="1.2" fill="#100c08" />
            <circle cx="300.3" cy="186.3" r="0.8" fill="#ffffff" />
            <path
              d="M 294.4 187.4 C 297.6 183 305 183 308 187.4"
              stroke="#241812"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          {/* nose */}
          <path
            d="M 288.4 191 C 286.6 198 285.4 203.4 288.6 204.6 C 290.6 205.4 292.6 204.6 293.8 203"
            stroke="#b0703c"
            strokeOpacity="0.75"
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
          {/* mouth — warm, relieved smile */}
          <path
            d="M 281 210.6 C 286 208.4 294.6 208.4 299.6 210.6 C 297.4 217.4 283.2 217.4 281 210.6 Z"
            fill="#7d3b31"
          />
          <path
            d="M 282.8 211.2 C 287 209.8 293.8 209.8 298 211.2 C 296.2 214.2 284.6 214.2 282.8 211.2 Z"
            fill="#fffaf6"
          />
          <path
            d="M 280.6 210.2 C 286 207.6 294.8 207.6 300 210.2"
            stroke="#8d4a3c"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* smile creases */}
          <path
            d="M 279 204 C 278 208 278.6 212 280.4 214"
            stroke="#b0703c"
            strokeOpacity="0.4"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 301.6 204 C 302.6 208 302 212 300.2 214"
            stroke="#b0703c"
            strokeOpacity="0.4"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* hair */}
          <path
            d="M 264 195
               C 259 177 260 157 271 148.6
               C 281 141 301 140.4 311 148.6
               C 321 156.6 321 177 316 195
               C 315 183.6 313 174 307 169
               C 299 162.6 287.6 162 279 166
               C 271.6 169.6 267 181 264 195 Z"
            fill="url(#ckh-hair)"
          />
          <path
            d="M 266.6 186 C 265 170 268.6 155 279 150 C 288 145.6 300 145.6 307 150 C 299 148 285 149.6 277 157 C 270.6 163 267.6 174 266.6 186 Z"
            fill="url(#ckh-hairSheen)"
          />
          <path
            d="M 264.4 190 L 269 192.4 L 268 203 L 264.6 198 Z"
            fill="url(#ckh-hair)"
          />
          <path
            d="M 315.6 190 L 311 192.4 L 312 203 L 315.4 198 Z"
            fill="url(#ckh-hair)"
          />
        </g>
      </g>

      {/* ============================================================
          FLOATING CREDIT GAUGE
         ============================================================ */}
      <g id="floating-score-card" className="ckh-a">
        <rect
          x="28"
          y="92"
          width="182"
          height="168"
          rx="24"
          fill="url(#ckh-glass)"
          filter="url(#ckh-cardShadow)"
        />
        <rect
          x="28"
          y="92"
          width="182"
          height="168"
          rx="24"
          fill="url(#ckh-glassSheen)"
          opacity="0.55"
        />
        <rect
          x="28.8"
          y="92.8"
          width="180.4"
          height="166.4"
          rx="23.2"
          fill="none"
          stroke="url(#ckh-glassStroke)"
          strokeWidth="1.5"
        />
        <text
          x="119"
          y="121"
          fontSize="9.6"
          fontWeight="800"
          letterSpacing="2"
          fill="#7f93b8"
          textAnchor="middle"
        >
          CIBIL SCORE
        </text>
        {/* gauge */}
        <path
          d="M 61 222 A 58 58 0 0 1 177 222"
          fill="none"
          stroke="#d3e0f5"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M 61 222 A 58 58 0 0 1 172.9 200.6"
          fill="none"
          stroke="url(#ckh-gaugeArc)"
          strokeWidth="13"
          strokeLinecap="round"
          filter="url(#ckh-glowSm)"
        />
        <circle
          cx="172.9"
          cy="200.6"
          r="11"
          fill="#10b981"
          opacity="0.22"
          className="ckh-pulse"
        />
        <circle
          cx="172.9"
          cy="200.6"
          r="6.4"
          fill="#ffffff"
          stroke="#10b981"
          strokeWidth="2.6"
        />
        <text
          x="119"
          y="216"
          fontSize="42"
          fontWeight="800"
          letterSpacing="-1"
          fill="#0b1a3a"
          textAnchor="middle"
          fontFamily={FONT_DISPLAY}
        >
          795
        </text>
        <text x="55" y="238" fontSize="8" fontWeight="700" fill="#a3b4cf">
          300
        </text>
        <text
          x="183"
          y="238"
          fontSize="8"
          fontWeight="700"
          fill="#a3b4cf"
          textAnchor="end"
        >
          900
        </text>
        <rect
          x="87"
          y="226"
          width="64"
          height="21"
          rx="10.5"
          fill="#d6fbea"
          stroke="#6ee7b7"
          strokeWidth="1.2"
        />
        <text
          x="119"
          y="240.6"
          fontSize="9.6"
          fontWeight="800"
          letterSpacing="1.4"
          fill="#047857"
          textAnchor="middle"
        >
          PRIME
        </text>
      </g>

      {/* ============================================================
          BANK CLEARANCE SHIELD
         ============================================================ */}
      <g id="clearance-badge" className="ckh-c">
        <g transform="translate(524 100)">
          <ellipse
            cx="0"
            cy="0"
            rx="58"
            ry="62"
            fill="url(#ckh-emeraldGlow)"
            className="ckh-pulse"
          />
          <path
            d="M 0 -41 L 31 -28 C 31 -5 22 24 0 41 C -22 24 -31 -5 -31 -28 Z"
            fill="url(#ckh-shield)"
            filter="url(#ckh-softShadow)"
          />
          <path
            d="M 0 -41 L 31 -28 C 31 -5 22 24 0 41 C -22 24 -31 -5 -31 -28 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.85"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M 0 -33.6 L 25.4 -22.9 C 25.4 -4.1 18 19.7 0 33.6 C -18 19.7 -25.4 -4.1 -25.4 -22.9 Z"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.32"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 0 -41 L 31 -28 C 31 -18 30 -8 27 2 C 10 -12 0 -26 0 -41 Z"
            fill="#ffffff"
            opacity="0.12"
          />
          <use href="#ckh-tick" transform="translate(0 -1) scale(2.6)" />
        </g>
        <rect
          x="462"
          y="150"
          width="124"
          height="27"
          rx="13.5"
          fill="url(#ckh-glass)"
          filter="url(#ckh-softShadow)"
        />
        <rect
          x="462.8"
          y="150.8"
          width="122.4"
          height="25.4"
          rx="12.7"
          fill="none"
          stroke="url(#ckh-glassStroke)"
          strokeWidth="1.3"
        />
        <text
          x="524"
          y="167.6"
          fontSize="9.8"
          fontWeight="800"
          letterSpacing="1.5"
          fill="#0b1a3a"
          textAnchor="middle"
        >
          BANK CLEARED
        </text>
      </g>

      {/* ============================================================
          CREDIT TRAJECTORY GRAPH
         ============================================================ */}
      <g id="trajectory-card" className="ckh-b">
        <rect
          x="24"
          y="430"
          width="186"
          height="132"
          rx="22"
          fill="url(#ckh-glass)"
          filter="url(#ckh-cardShadow)"
        />
        <rect
          x="24"
          y="430"
          width="186"
          height="132"
          rx="22"
          fill="url(#ckh-glassSheen)"
          opacity="0.5"
        />
        <rect
          x="24.8"
          y="430.8"
          width="184.4"
          height="130.4"
          rx="21.2"
          fill="none"
          stroke="url(#ckh-glassStroke)"
          strokeWidth="1.5"
        />
        <text
          x="44"
          y="456"
          fontSize="9"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#7f93b8"
        >
          CREDIT TRAJECTORY
        </text>
        <text
          x="44"
          y="478"
          fontSize="17"
          fontWeight="800"
          fill="#0b1a3a"
          fontFamily={FONT_DISPLAY}
        >
          +186
        </text>
        <text x="90" y="478" fontSize="9" fontWeight="700" fill="#7f93b8">
          pts
        </text>
        <path d="M 118 470 L 124 478 L 112 478 Z" fill="#10b981" />
        <text x="130" y="478" fontSize="9.4" fontWeight="800" fill="#047857">
          12 mo
        </text>

        <path
          d="M 44 534 L 70 524 L 96 528 L 122 508 L 148 496 L 174 484 L 174 540 L 44 540 Z"
          fill="url(#ckh-area)"
        />
        <path
          d="M 44 534 L 70 524 L 96 528 L 122 508 L 148 496 L 174 484"
          fill="none"
          stroke="url(#ckh-line)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 174 484 L 196 468"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeDasharray="5 5"
        />
        <path
          d="M 44 540 L 190 540"
          stroke="#dbe5f4"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <g fill="#ffffff" stroke="#155dfc" strokeWidth="2">
          <circle cx="70" cy="524" r="3" />
          <circle cx="96" cy="528" r="3" />
          <circle cx="122" cy="508" r="3" />
          <circle cx="148" cy="496" r="3" />
        </g>
        <circle
          cx="174"
          cy="484"
          r="9"
          fill="#10b981"
          opacity="0.2"
          className="ckh-pulse"
        />
        <circle
          cx="174"
          cy="484"
          r="4.6"
          fill="#ffffff"
          stroke="#10b981"
          strokeWidth="2.6"
        />
        <g fontSize="7.6" fontWeight="700" fill="#a9b8d1">
          <text x="44" y="553">
            MAR
          </text>
          <text x="110" y="553" textAnchor="middle">
            JUN
          </text>
          <text x="190" y="553" textAnchor="end">
            TODAY
          </text>
        </g>
      </g>

      {/* ============================================================
          DEBT RESOLVED BADGE
         ============================================================ */}
      <g id="debt-resolved-badge" className="ckh-a">
        <rect
          x="296"
          y="556"
          width="292"
          height="50"
          rx="25"
          fill="url(#ckh-pill)"
          filter="url(#ckh-cardShadow)"
        />
        <path
          d="M 296 581 C 296 567.2 307.2 556 321 556 L 563 556 C 576.8 556 588 567.2 588 581 Z"
          fill="url(#ckh-glassSheen)"
          opacity="0.1"
        />
        <rect
          x="296.8"
          y="556.8"
          width="290.4"
          height="48.4"
          rx="24.2"
          fill="none"
          stroke="#5f8bdd"
          strokeOpacity="0.35"
          strokeWidth="1.4"
        />
        <circle cx="325" cy="581" r="16" fill="#10b981" opacity="0.2" />
        <circle cx="325" cy="581" r="12.4" fill="url(#ckh-emerald)" />
        <use href="#ckh-tick" transform="translate(325 581) scale(1.32)" />
        <text
          x="350"
          y="577"
          fontSize="15"
          fontWeight="800"
          fill="#ffffff"
          fontFamily={FONT_DISPLAY}
        >
          ₹18,40,000 Debt Resolved
        </text>
        <text
          x="350"
          y="592.4"
          fontSize="9.6"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#9fb8e2"
        >
          0 Harassment Calls · 100% Legal Process
        </text>
      </g>

      {/* ============================================================
          COINS + SPARKLES
         ============================================================ */}
      <g id="ambient-accents">
        <g id="coin-1" className="ckh-c" transform="translate(358 166)">
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="url(#ckh-coinA)"
            filter="url(#ckh-softShadow)"
          />
          <circle
            cx="0"
            cy="0"
            r="13.4"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="1.4"
          />
          <path
            d="M -12 -8 A 18 18 0 0 1 2 -17"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <text
            x="0"
            y="6"
            fontSize="16"
            fontWeight="800"
            fill="#ffffff"
            textAnchor="middle"
            fontFamily={FONT_DISPLAY}
          >
            ₹
          </text>
        </g>
        <g id="coin-2" className="ckh-a" transform="translate(232 486)">
          <circle
            cx="0"
            cy="0"
            r="13"
            fill="url(#ckh-coinB)"
            filter="url(#ckh-softShadow)"
          />
          <circle
            cx="0"
            cy="0"
            r="9.6"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <text
            x="0"
            y="4.6"
            fontSize="12"
            fontWeight="800"
            fill="#ffffff"
            textAnchor="middle"
            fontFamily={FONT_DISPLAY}
          >
            ₹
          </text>
        </g>
        <g id="coin-3" className="ckh-b" transform="translate(566 356)">
          <circle
            cx="0"
            cy="0"
            r="15"
            fill="url(#ckh-coinA)"
            filter="url(#ckh-softShadow)"
          />
          <circle
            cx="0"
            cy="0"
            r="11.2"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="1.3"
          />
          <path
            d="M -10 -6.6 A 15 15 0 0 1 1.6 -14.2"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.55"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <text
            x="0"
            y="5.2"
            fontSize="13"
            fontWeight="800"
            fill="#ffffff"
            textAnchor="middle"
            fontFamily={FONT_DISPLAY}
          >
            ₹
          </text>
        </g>

        <g id="sparkles">
          <use
            href="#ckh-spark"
            className="ckh-tw"
            transform="translate(236 132)"
            fill="#155dfc"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw2"
            transform="translate(396 146) scale(0.66)"
            fill="#10b981"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw"
            transform="translate(586 240) scale(0.82)"
            fill="#155dfc"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw2"
            transform="translate(44 336) scale(0.76)"
            fill="#10b981"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw"
            transform="translate(212 590) scale(0.68)"
            fill="#155dfc"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw2"
            transform="translate(548 522) scale(0.58)"
            fill="#10b981"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw"
            transform="translate(120 300) scale(0.54)"
            fill="#155dfc"
          />
          <use
            href="#ckh-spark"
            className="ckh-tw2"
            transform="translate(352 622) scale(0.62)"
            fill="#155dfc"
          />
        </g>
      </g>
    </svg>
  );
}

export default DebtFreeHeroIllustration;
