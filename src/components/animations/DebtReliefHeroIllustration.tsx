import React from "react";

/**
 * Layered hero illustration: character holding a "DEBT" banner on a rope,
 * floating bills, pink backdrop circles and ambient particles.
 *
 * Every layer is its own <g> with its own CSS keyframes (transform/opacity
 * only), so they move independently. Positioning lives on an outer <g
 * transform="..."> and animation on an inner <g>, because a CSS transform
 * would otherwise override the SVG transform attribute.
 */

type Vars = Record<`--${string}`, string>;
const v = (vars: Vars) => vars as React.CSSProperties;

const styles = `
.ckd-anim { will-change: transform; }
.ckd-fill { transform-box: fill-box; transform-origin: center; }

/* Pink circles: slow drift + breathe */
.ckd-circle { animation: ckd-circle var(--d, 6s) ease-in-out var(--delay, 0s) infinite; }
@keyframes ckd-circle {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50%      { transform: translate3d(var(--dx, 6px), var(--dy, -8px), 0) scale(1.04); }
}

/* Character: subtle breathing, pivoting from the feet */
.ckd-character {
  transform-box: view-box;
  transform-origin: 236px 476px;
  animation: ckd-breathe 3.6s ease-in-out infinite;
}
@keyframes ckd-breathe {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50%      { transform: translate3d(0, -5px, 0) rotate(-0.7deg); }
}

/* Ground shadow tightens as the character lifts */
.ckd-shadow { animation: ckd-shadow 3.6s ease-in-out infinite; }
@keyframes ckd-shadow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(0.94); opacity: 0.75; }
}

/* DEBT banner: pendulum from the hand/rope knot, phase-lagged behind the body */
.ckd-banner {
  transform-box: view-box;
  transform-origin: 345px 150px;
  animation: ckd-swing 3.6s ease-in-out -0.9s infinite;
}
@keyframes ckd-swing {
  0%, 100% { transform: rotate(1.4deg); }
  50%      { transform: rotate(-1.4deg); }
}

/* Bills: each with its own lift, tilt, duration and delay */
.ckd-bill { animation: ckd-bill var(--d, 5s) ease-in-out var(--delay, 0s) infinite; }
@keyframes ckd-bill {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50%      { transform: translate3d(0, var(--ty, -10px), 0) rotate(var(--rot, 3deg)); }
}

/* Particles: barely-there drift */
.ckd-particle { animation: ckd-particle var(--d, 6s) ease-in-out var(--delay, 0s) infinite; }
@keyframes ckd-particle {
  0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.25; }
  50%      { transform: translate3d(var(--dx, 4px), -12px, 0); opacity: 0.65; }
}

@media (prefers-reduced-motion: reduce) {
  .ckd-root * { animation: none !important; will-change: auto; }
}
`;

const NoteBill = () => (
  <>
    <rect x="-32" y="-18" width="64" height="36" rx="5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
    <rect x="-27" y="-13" width="54" height="26" rx="3" fill="none" stroke="#16A34A" strokeOpacity="0.35" />
    <circle r="9" fill="#BBF7D0" />
    <text y="4" fontSize="12" fontWeight="800" fill="#15803D" textAnchor="middle">₹</text>
  </>
);

const PaperBill = () => (
  <>
    <rect x="-24" y="-30" width="48" height="60" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
    <rect x="-16" y="-21" width="22" height="4" rx="2" fill="#94A3B8" />
    <rect x="-16" y="-11" width="32" height="3" rx="1.5" fill="#CBD5E1" />
    <rect x="-16" y="-4" width="28" height="3" rx="1.5" fill="#CBD5E1" />
    <rect x="-16" y="3" width="30" height="3" rx="1.5" fill="#CBD5E1" />
    <rect x="-16" y="12" width="28" height="12" rx="3" fill="none" stroke="#EF4444" strokeWidth="1.5" />
    <text x="-2" y="21" fontSize="8" fontWeight="800" fill="#EF4444" textAnchor="middle">DUE</text>
  </>
);

const BILLS = [
  { kind: "note",  x: 110, y: 150, r: -14, d: "5.2s", delay: "-1s",   ty: "-12px", rot: "4deg" },
  { kind: "paper", x: 95,  y: 310, r: 10,  d: "6.4s", delay: "-3.2s", ty: "-9px",  rot: "-3deg" },
  { kind: "note",  x: 452, y: 215, r: 12,  d: "4.6s", delay: "-0.4s", ty: "-14px", rot: "-5deg" },
  { kind: "paper", x: 432, y: 352, r: -10, d: "5.8s", delay: "-2.4s", ty: "-10px", rot: "3deg" },
  { kind: "note",  x: 338, y: 420, r: 6,   d: "6.9s", delay: "-4.1s", ty: "-8px",  rot: "2deg" },
] as const;

const PARTICLES = [
  { x: 60,  y: 90,  r: 3,   c: "#F9A8D4", d: "6s",   delay: "0s",    dx: "4px" },
  { x: 300, y: 70,  r: 2.5, c: "#93C5FD", d: "7.5s", delay: "-2s",   dx: "-3px" },
  { x: 485, y: 70,  r: 2,   c: "#F9A8D4", d: "5.5s", delay: "-1s",   dx: "3px" },
  { x: 488, y: 290, r: 3,   c: "#93C5FD", d: "8s",   delay: "-4s",   dx: "-4px" },
  { x: 45,  y: 225, r: 2,   c: "#93C5FD", d: "6.5s", delay: "-3s",   dx: "5px" },
  { x: 180, y: 500, r: 2.5, c: "#F9A8D4", d: "7s",   delay: "-5s",   dx: "3px" },
  { x: 495, y: 470, r: 2,   c: "#F9A8D4", d: "6.2s", delay: "-2.5s", dx: "-3px" },
  { x: 160, y: 40,  r: 2,   c: "#93C5FD", d: "7.8s", delay: "-6s",   dx: "4px" },
] as const;

export default function DebtReliefHeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 520"
      className="ckd-root w-full h-auto"
      role="img"
      aria-labelledby="ck-debt-title"
      style={{ fontFamily: "inherit" }}
    >
      <title id="ck-debt-title">Get out of debt with CreditKlick</title>
      <style>{styles}</style>

      {/* Layer 1 — pink background circles */}
      <g id="ckd-circles">
        <circle className="ckd-anim ckd-fill ckd-circle" style={v({ "--d": "6s", "--dx": "6px", "--dy": "-8px" })} cx="175" cy="230" r="125" fill="#FCE7F3" />
        <circle className="ckd-anim ckd-fill ckd-circle" style={v({ "--d": "5s", "--delay": "-2s", "--dx": "-5px", "--dy": "6px" })} cx="400" cy="120" r="60" fill="#FBCFE8" fillOpacity="0.6" />
        <circle className="ckd-anim ckd-fill ckd-circle" style={v({ "--d": "7s", "--delay": "-3.5s", "--dx": "-6px", "--dy": "-6px" })} cx="410" cy="410" r="75" fill="#FDF2F8" />
        <circle className="ckd-anim ckd-fill ckd-circle" style={v({ "--d": "4.5s", "--delay": "-1s", "--dx": "4px", "--dy": "5px" })} cx="80" cy="420" r="34" fill="#FBCFE8" fillOpacity="0.5" />
      </g>

      {/* Layer 2 — particles */}
      <g id="ckd-particles">
        {PARTICLES.map((p, i) => (
          <circle
            key={i}
            className="ckd-anim ckd-particle"
            style={v({ "--d": p.d, "--delay": p.delay, "--dx": p.dx })}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.c}
            opacity="0.4"
          />
        ))}
      </g>

      {/* Layer 3 — floating bills */}
      <g id="ckd-bills">
        {BILLS.map((b, i) => (
          <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.r})`}>
            <g
              className="ckd-anim ckd-fill ckd-bill"
              style={v({ "--d": b.d, "--delay": b.delay, "--ty": b.ty, "--rot": b.rot })}
            >
              {b.kind === "note" ? <NoteBill /> : <PaperBill />}
            </g>
          </g>
        ))}
      </g>

      {/* Layer 4 — ground shadow */}
      <ellipse className="ckd-anim ckd-fill ckd-shadow" cx="236" cy="476" rx="85" ry="10" fill="#1E293B" fillOpacity="0.08" />

      {/* Layer 5 — character (banner is nested so it rides along with the body) */}
      <g id="ckd-character" className="ckd-anim ckd-character">
        {/* legs + shoes */}
        <rect x="210" y="335" width="22" height="132" rx="10" fill="#1E293B" />
        <rect x="240" y="335" width="22" height="132" rx="10" fill="#273449" />
        <ellipse cx="214" cy="468" rx="20" ry="9" fill="#0F172A" />
        <ellipse cx="260" cy="468" rx="20" ry="9" fill="#0F172A" />

        {/* torso */}
        <rect x="226" y="210" width="20" height="22" rx="6" fill="#E8B08A" />
        <path d="M196 250 Q196 228 218 226 H254 Q276 228 276 250 V345 Q276 352 268 352 H204 Q196 352 196 345 Z" fill="#2563EB" />
        <rect x="196" y="336" width="80" height="8" fill="#1D4ED8" />
        <path d="M222 226 L236 244 L250 226 Z" fill="#DBEAFE" />

        {/* resting arm */}
        <path d="M204 242 Q186 290 196 330" fill="none" stroke="#2563EB" strokeWidth="18" strokeLinecap="round" />
        <circle cx="197" cy="334" r="9" fill="#F2C29B" />

        {/* head */}
        <circle cx="209" cy="192" r="5" fill="#E8B08A" />
        <circle cx="263" cy="192" r="5" fill="#E8B08A" />
        <circle cx="236" cy="190" r="27" fill="#F2C29B" />
        <path d="M209 188 Q207 160 236 158 Q266 158 264 186 Q256 172 236 174 Q216 174 209 188 Z" fill="#1E293B" />
        <circle cx="227" cy="192" r="2.6" fill="#1E293B" />
        <circle cx="245" cy="192" r="2.6" fill="#1E293B" />
        <path d="M228 204 Q236 210 244 204" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

        {/* DEBT banner — pendulum around the hand/rope knot (345,150) */}
        <g id="ckd-banner" className="ckd-anim ckd-banner">
          <path d="M345 150 L312 226 M345 150 L388 226" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="305" y="226" width="90" height="50" rx="8" fill="#EF4444" />
          <rect x="310" y="231" width="80" height="40" rx="5" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" />
          <text x="350" y="260" fontSize="24" fontWeight="900" fill="#FFFFFF" textAnchor="middle" letterSpacing="2">DEBT</text>
        </g>

        {/* raised arm + hand gripping the rope */}
        <path d="M268 242 Q310 235 342 156" fill="none" stroke="#2563EB" strokeWidth="18" strokeLinecap="round" />
        <circle cx="345" cy="150" r="10" fill="#F2C29B" />
      </g>
    </svg>
  );
}
