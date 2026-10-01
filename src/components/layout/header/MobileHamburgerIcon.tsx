"use client";

import React from "react";

interface MobileHamburgerIconProps {
  className?: string;
}

// Simple, reliable SVG hamburger — no Lottie dependency, instant render
export function MobileHamburgerIcon({ className = "w-8 h-8" }: MobileHamburgerIconProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-gray-800"
        aria-hidden="true"
      >
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </div>
  );
}

export default MobileHamburgerIcon;
