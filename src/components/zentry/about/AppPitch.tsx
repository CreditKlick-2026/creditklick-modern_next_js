"use client";

import React from "react";
import { Smartphone, CheckCircle2 } from "lucide-react";
import { APP_FEATURES, TRUST_PILLS, APP_PLAYSTORE_URL } from "./about.data";

export const AppPitch: React.FC = () => {
  return (
    <div className="ck-left-col">
      {/* Top Pill Tag */}
      <div>
        <span className="ck-pill-tag">
          <Smartphone size={14} />
          CreditKlick Mobile App
        </span>
      </div>

      {/* Heading */}
      <div>
        <h2 className="ck-app-title">
          Download The CreditKlick App
        </h2>
        <p className="ck-app-subtitle">
          Your all-in-one financial super app. Check your free credit score, apply for instant pre-approved loans up to ₹25 Lakhs, and unlock 100+ best credit cards anywhere, anytime.
        </p>
      </div>

      {/* App Feature Checklist */}
      <div className="ck-feature-list">
        {APP_FEATURES.map((feat, i) => (
          <div key={i} className="ck-feature-item">
            <div className="ck-feature-icon-box">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <h4 className="ck-feature-heading">{feat.title}</h4>
              <p className="ck-feature-desc">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Store Download Buttons */}
      <div className="ck-store-btns-row">
        {/* Google Play Store */}
        <a
          href={APP_PLAYSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ck-store-badge"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a1.91 1.91 0 0 1-.61-.318V2.132c.184-.117.391-.225.609-.318zm11.248 11.251l2.456 2.456-11.83 6.83 9.374-9.286zm0-2.13L5.483 1.649l11.83 6.83-2.456 2.456zm1.488 1.065l3.874 2.237c.883.51.883 1.346 0 1.856l-3.874 2.237-2.124-2.124 2.124-2.206z" />
          </svg>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[0.62rem] uppercase tracking-wider text-slate-300">GET IT ON</span>
            <span className="text-[0.92rem] font-bold text-white">Google Play</span>
          </div>
        </a>

        {/* Apple App Store */}
        <a
          href={APP_PLAYSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ck-store-badge"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.4c.64-.78 1.08-1.86.96-2.95-1 .04-2.14.65-2.81 1.43-.59.67-1.11 1.77-.97 2.83 1.12.09 2.18-.53 2.82-1.31" />
          </svg>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[0.62rem] uppercase tracking-wider text-slate-300">DOWNLOAD ON</span>
            <span className="text-[0.92rem] font-bold text-white">App Store</span>
          </div>
        </a>
      </div>

      {/* Trust Highlights */}
      <div className="ck-trust-pills-row">
        {TRUST_PILLS.map((pill, i) => {
          const IconComponent = pill.icon;
          return (
            <div key={i} className="ck-trust-pill-item">
              <IconComponent size={14} className="text-[#1c398e]" />
              <span>{pill.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
