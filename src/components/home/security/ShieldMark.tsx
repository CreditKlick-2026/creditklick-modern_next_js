import React from "react";

interface ShieldMarkProps {
  size?: number | string;
  className?: string;
}

export function ShieldMark({ size = 96, className = "" }: ShieldMarkProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      style={{ width: size, height: size }}
      className={`drop-shadow-md flex-shrink-0 ${className}`}
      role="img"
      aria-label="Data security illustration"
    >
      <circle cx="110" cy="110" r="100" fill="#eff6ff" />
      <path
        d="M110 26l62 24v54c0 42-26 76-62 90-36-14-62-48-62-90V50z"
        fill="#ffffff"
        stroke="#1c398e"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M110 40l50 19.4V104c0 34.5-20.8 62.2-50 74.3-29.2-12.1-50-39.8-50-74.3V59.4z"
        fill="#155dfc"
      />
      <rect x="86" y="104" width="48" height="38" rx="6" fill="#ffffff" />
      <path
        d="M96 104V93a14 14 0 0 1 28 0v11"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="110" cy="119" r="5.5" fill="#1c398e" />
      <path d="M110 124v9" stroke="#1c398e" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export default ShieldMark;
