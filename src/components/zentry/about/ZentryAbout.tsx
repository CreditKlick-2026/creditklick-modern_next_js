"use client";

import React from "react";
import { AppPitch } from "./AppPitch";
import { PhoneMockup } from "./PhoneMockup";
import { QrDownloadCard } from "./QrDownloadCard";

export const ZentryAbout: React.FC = () => {
  return (
    <section id="mobile-app" className="ck-app-showcase-section">
      {/* Top Glowing Cyan Light Accent */}
      <img
        src="/images/zet/top_light.png"
        alt=""
        width={207}
        height={10}
        className="ck-app-top-light"
      />

      <div className="ck-app-showcase-grid">
        {/* ── LEFT: App Download Pitch & Features ── */}
        <AppPitch />

        {/* ── CENTER: Phone Mockup with 3D Tilt ── */}
        <PhoneMockup />

        {/* ── RIGHT: QR Code Download Card ── */}
        <QrDownloadCard />
      </div>
    </section>
  );
};

export default ZentryAbout;
