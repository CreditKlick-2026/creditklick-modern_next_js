"use client";

import React from "react";
import { Download, Star } from "lucide-react";
import { STORE_RATINGS, APP_PLAYSTORE_URL } from "./about.data";

export const QrDownloadCard: React.FC = () => {
  return (
    <div className="ck-right-col">
      <div className="ck-qr-card">
        <div className="text-center">
          <p className="ck-qr-title">Scan to Download</p>
          <p className="ck-qr-subtitle">Point your phone camera to install instantly</p>
        </div>

        {/* QR Code Container */}
        <div className="ck-qr-image-box">
          <img
            src="/img/qrcode.jpg"
            alt="CreditKlick App QR Code"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Store Ratings */}
        <div className="ck-store-ratings-row">
          {STORE_RATINGS.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-[1px] h-[26px] bg-slate-200" />}
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[0.82rem] font-bold text-slate-900">{item.score}</span>
                  <Star size={11} className="fill-amber-500 text-amber-500" />
                </div>
                <span className="text-[0.68rem] text-slate-500">{item.store}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Download CTA Button */}
        <a
          href={APP_PLAYSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ck-download-btn"
        >
          <Download size={15} />
          Download Free App
        </a>
      </div>
    </div>
  );
};
