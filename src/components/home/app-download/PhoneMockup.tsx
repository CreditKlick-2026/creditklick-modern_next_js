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
      `perspective(1000px) rotateX(${(y - 0.5) * 8}deg) rotateY(${(x - 0.5) * -8}deg) scale3d(1.02,1.02,1.02)`
    );
  };

  const handleMouseLeave = () => {
    setTilt("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  };

  return (
    <div className="ck-phone-container">
      {/* Ambient Radial Aura */}
      <div className="ck-phone-ambient-glow" />

      <div
        ref={phoneRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="ck-phone-wrapper"
        style={{ transform: tilt || undefined }}
      >
        {/* Smartphone Chassis Frame */}
        <div className="ck-phone-frame">
          {/* Subtle side button notches */}
          <div className="ck-phone-side-btn-vol" />
          <div className="ck-phone-side-btn-pwr" />

          {/* Inner Display Screen */}
          <div className="ck-phone-screen">
            <img
              src="/images/App.png"
              alt="CreditKlick Mobile App Screen - Credit Score 823"
              className="ck-phone-image"
              loading="lazy"
            />
            {/* Screen subtle glass shine */}
            <div className="ck-phone-glass-glare" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
