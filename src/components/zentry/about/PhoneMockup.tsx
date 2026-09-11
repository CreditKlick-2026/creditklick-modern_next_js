"use client";

import React, { useRef, useState } from "react";

export const PhoneMockup: React.FC = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt(
      `perspective(900px) rotateX(${(y - 0.5) * 8}deg) rotateY(${(x - 0.5) * -8}deg) scale3d(1.02,1.02,1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTilt("perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  };

  return (
    <div className="ck-phone-container">
      {/* Subtle Ambient Radial Glow */}
      <div className="ck-phone-ambient-glow" />

      <div
        ref={phoneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="ck-phone-wrapper"
        style={{ transform: tilt || undefined }}
      >
        <img
          src="/img/sliderappimg.png"
          alt="CreditKlick Mobile App Interface"
          className="ck-phone-image"
        />
      </div>
    </div>
  );
};
