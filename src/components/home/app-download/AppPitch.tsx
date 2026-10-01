"use client";

import React from "react";
import Image from "next/image";
import { Smartphone, Check, Sparkles } from "lucide-react";
import { APP_FEATURES, TRUST_PILLS, APP_PLAYSTORE_URL } from "./app-download.data";

export const AppPitch: React.FC = () => {
  return (
    <div className="ck-left-col">
      {/* Top Pill Tag */}
      <div>
        <span className="ck-pill-tag">
          <Smartphone size={13} className="text-blue-600" />
          <span>CreditKlick Mobile App</span>
        </span>
      </div>

      {/* Main Heading & Subtitle */}
      <div>
        <h2 className="ck-app-title">
          Download The CreditKlick App
        </h2>
        <p className="ck-app-subtitle">
          Your all-in-one financial super app. Check your free credit score.
        </p>
      </div>

      {/* Highlighted CRIF Credit Score Feature Box */}
      {APP_FEATURES.map((feat, idx) => (
        <div key={idx} className="ck-crif-highlight-card">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="ck-crif-icon-circle">
                <Sparkles size={16} className="text-blue-600" />
              </span>
              <h3 className="ck-crif-title">{feat.title}</h3>
            </div>
            {feat.badge && (
              <span className="ck-crif-badge">
                {feat.badge}
              </span>
            )}
          </div>

          <p className="ck-crif-desc">
            {feat.desc}
          </p>

          {feat.perks && feat.perks.length > 0 && (
            <ul className="ck-crif-perks-list">
              {feat.perks.map((perk, pIdx) => (
                <li key={pIdx} className="ck-crif-perk-item">
                  <span className="ck-crif-perk-check">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Google Play Store Download Button */}
      <div className="ck-store-btns-row">
        <a
          href={APP_PLAYSTORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-105 active:scale-95 duration-200 inline-block drop-shadow-md"
          aria-label="Get it on Google Play"
        >
          <Image
            src="/images/play-store-icon.svg"
            alt="Get it on Google Play"
            width={140}
            height={42}
            className="h-11 w-auto rounded-xl"
          />
        </a>
      </div>

      {/* 3 Trust Highlight Badges */}
      <div className="ck-trust-pills-row">
        {TRUST_PILLS.map((pill, i) => {
          const IconComponent = pill.icon;
          return (
            <div key={i} className="ck-trust-pill-item">
              <IconComponent size={15} className="text-emerald-600 flex-shrink-0" />
              <span>{pill.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppPitch;
