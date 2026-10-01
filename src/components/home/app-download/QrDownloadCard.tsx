"use client";

import React, { useState } from "react";
import { Download, QrCode, CheckCircle2 } from "lucide-react";
import { APP_PLAYSTORE_URL } from "./app-download.data";

export const QrDownloadCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="ck-right-col">
      <div
        className="ck-qr-card-pro"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Floating Badge */}
        <div className="ck-qr-pill-header">
          <span className="ck-qr-pulsing-dot" />
          <span className="ck-qr-pill-text">INSTANT CAMERA SCAN</span>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <QrCode size={16} className="text-blue-600" />
            <h3 className="ck-qr-main-title">Scan to Download</h3>
          </div>
          <p className="ck-qr-main-subtitle">
            Point your phone camera to install instantly
          </p>
        </div>

        {/* Viewfinder Target Frame with QR Image */}
        <div className="ck-viewfinder-wrapper">
          {/* 4 Neon Viewfinder Target Brackets */}
          <span className="ck-corner ck-corner-tl" />
          <span className="ck-corner ck-corner-tr" />
          <span className="ck-corner ck-corner-bl" />
          <span className="ck-corner ck-corner-br" />

          {/* Animated Laser Scanning Line */}
          <div className="ck-laser-scanner-line" />

          {/* QR Image Box */}
          <div className="ck-qr-image-frame">
            <img
              src="/images/qrcode.jpg"
              alt="Scan to download CreditKlick App"
              className="ck-qr-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Download Action CTA */}
        <a
          href={APP_PLAYSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ck-qr-cta-btn"
          aria-label="Direct Download CreditKlick App"
        >
          <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
          <span>Get on Google Play</span>
        </a>

        {/* Verified Badge Footnote */}
        <div className="flex items-center justify-center gap-1 text-[10px] font-medium text-slate-500">
          <CheckCircle2 size={11} className="text-blue-600 shrink-0" />
          <span>Verified Safe APK &bull; Play Store</span>
        </div>
      </div>
    </div>
  );
};

export default QrDownloadCard;
