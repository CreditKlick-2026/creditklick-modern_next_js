import React from "react";

/** Whiteboard-style illustration: debt falling away while the customer celebrates. */
export function BenefitsIllustration() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Illustration of a customer becoming debt free"
    >
      {/* Soft organic backdrop */}
      <path
        fill="#eff6ff"
        d="M44 196c-30-46-12-108 38-132 36-18 64 4 100-8 40-14 60-48 100-34 46 16 64 78 50 126-12 44-54 64-96 76-48 14-102 24-134 2-26-18-38-14-58-30z"
      />
      <circle cx="342" cy="64" r="24" fill="#dbeafe" />
      <circle cx="46" cy="232" r="16" fill="#dbeafe" />
      <circle cx="196" cy="52" r="10" fill="#dbeafe" />

      {/* Ground line */}
      <path d="M32 270h336" stroke="#1c398e" strokeWidth="3" strokeLinecap="round" />

      {/* Debt bars, stepping down as the balance clears */}
      <g stroke="#1c398e" strokeWidth="3" strokeLinejoin="round">
        <rect x="206" y="166" width="30" height="104" fill="#155dfc" />
        <rect x="248" y="198" width="30" height="72" fill="#ffffff" />
        <rect x="290" y="226" width="30" height="44" fill="#155dfc" />
        <rect x="332" y="248" width="30" height="22" fill="#ffffff" />
      </g>

      {/* Trend line tracing the fall, with an arrow head */}
      <path
        d="M212 150c30 10 58 36 78 60l50 28"
        fill="none"
        stroke="#155dfc"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M328 237l12 1-6-10"
        fill="none"
        stroke="#155dfc"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Celebrating figure */}
      <g stroke="#1c398e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Arms raised */}
        <path d="M104 156L82 122l-4-22" fill="none" />
        <path d="M138 156l22-34 4-22" fill="none" />
        {/* Torso */}
        <path d="M104 150h34l6 56h-46z" fill="#155dfc" />
        {/* Legs */}
        <path d="M110 206l-6 62" fill="none" />
        <path d="M134 206l8 62" fill="none" />
        {/* Feet */}
        <path d="M96 268h16" fill="none" />
        <path d="M134 268h16" fill="none" />
        {/* Head */}
        <circle cx="121" cy="122" r="20" fill="#ffffff" />
      </g>
      {/* Hair */}
      <path
        d="M101 119c0-15 9-25 20-25s20 9 20 22c-5-3-9-8-12-13-5 9-18 14-28 16z"
        fill="#1c398e"
      />

      {/* Potted plant */}
      <path
        d="M52 270l-4-26h30l-4 26z"
        fill="#ffffff"
        stroke="#1c398e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M63 244v-40" stroke="#1c398e" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M63 218c-11-1-19-9-19-20 11-1 19 8 19 20zM63 228c11-1 19-9 19-20-11-1-19 8-19 20z"
        fill="#1c398e"
      />
    </svg>
  );
}
