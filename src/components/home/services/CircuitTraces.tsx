import React from "react";

export function CircuitTraces() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1100 520"
      fill="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      {/* Background Static Trace Lines */}
      <path d="M 270 35 H 370 L 480 210" className="dt-circuit-line-bg" />
      <path d="M 290 170 H 390 L 480 240" className="dt-circuit-line-bg" />
      <path d="M 290 350 H 390 L 480 280" className="dt-circuit-line-bg" />
      <path d="M 270 485 H 370 L 480 310" className="dt-circuit-line-bg" />

      <path d="M 830 35 H 730 L 620 210" className="dt-circuit-line-bg" />
      <path d="M 810 170 H 710 L 620 240" className="dt-circuit-line-bg" />
      <path d="M 810 350 H 710 L 620 280" className="dt-circuit-line-bg" />
      <path d="M 830 485 H 730 L 620 310" className="dt-circuit-line-bg" />

      {/* Pulsing Animated Data Flow Lines */}
      <path d="M 270 35 H 370 L 480 210" className="dt-circuit-line-pulse" />
      <path d="M 290 170 H 390 L 480 240" className="dt-circuit-line-pulse" />
      <path d="M 290 350 H 390 L 480 280" className="dt-circuit-line-pulse" />
      <path d="M 270 485 H 370 L 480 310" className="dt-circuit-line-pulse" />

      <path d="M 830 35 H 730 L 620 210" className="dt-circuit-line-pulse" />
      <path d="M 810 170 H 710 L 620 240" className="dt-circuit-line-pulse" />
      <path d="M 810 350 H 710 L 620 280" className="dt-circuit-line-pulse" />
      <path d="M 830 485 H 730 L 620 310" className="dt-circuit-line-pulse" />

      {/* DoubleTick-style Accent Pills on Circuit Traces */}
      <rect x="335" y="32" width="20" height="6" rx="3" fill="#2563eb" />
      <rect x="365" y="167" width="20" height="6" rx="3" fill="#2563eb" />
      <rect x="365" y="347" width="20" height="6" rx="3" fill="#2563eb" />
      <rect x="335" y="482" width="20" height="6" rx="3" fill="#2563eb" />

      <rect x="745" y="32" width="20" height="6" rx="3" fill="#2563eb" />
      <rect x="715" y="167" width="20" height="6" rx="3" fill="#2563eb" />
      <rect x="715" y="347" width="20" height="6" rx="3" fill="#2563eb" />
      <rect x="745" y="482" width="20" height="6" rx="3" fill="#2563eb" />
    </svg>
  );
}
