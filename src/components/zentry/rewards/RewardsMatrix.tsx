"use client";

import React from "react";
import { FEATURES_LIST } from "./rewards.data";
import { PlanCards } from "./PlanCards";

export const RewardsMatrix: React.FC = () => {
  return (
    <div className="zet-matrix-scroll-wrapper">
      <div className="zet-matrix-container">
        {/* Left Column: Feature Rows */}
        <div className="zet-features-col">
          {FEATURES_LIST.map((feat) => (
            <div key={feat.id} className="zet-feature-row">
              <span className="zet-feature-text">{feat.text}</span>
            </div>
          ))}
        </div>

        {/* Right Column: Cards & Pricing */}
        <PlanCards />
      </div>
    </div>
  );
};
