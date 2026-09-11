"use client";

import React from "react";
import { FEATURES_LIST, MEMBERSHIP_PLANS } from "./rewards.data";

export const PlanCards: React.FC = () => {
  return (
    <div className="zet-cards-col">
      {/* Gold and Silver Cards Row */}
      <div className="zet-cards-row">
        {/* Gold Card Capsule */}
        <div className="zet-card-capsule zet-card-gold">
          {/* Gold Header */}
          <div className="zet-card-header">
            <span className="zet-header-gold-text">{MEMBERSHIP_PLANS.gold.name}</span>
          </div>

          {/* Gold White Card Body */}
          <div className="zet-card-white-body">
            {FEATURES_LIST.map((feat) => (
              <div key={feat.id} className="zet-card-check-row">
                <img
                  src="/images/zet/check.svg"
                  alt="Included"
                  width={21}
                  height={21}
                  className="zet-icon-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Silver Card Capsule */}
        <div className="zet-card-capsule zet-card-silver">
          {/* Silver Header */}
          <div className="zet-card-header">
            <span className="zet-header-silver-text">{MEMBERSHIP_PLANS.silver.name}</span>
          </div>

          {/* Silver White Card Body */}
          <div className="zet-card-white-body">
            {FEATURES_LIST.map((feat) => (
              <div key={feat.id} className="zet-card-check-row">
                {feat.silver ? (
                  <img
                    src="/images/zet/check.svg"
                    alt="Included"
                    width={21}
                    height={21}
                    className="zet-icon-img"
                  />
                ) : (
                  <img
                    src="/images/zet/cross.svg"
                    alt="Not included"
                    width={21}
                    height={21}
                    className="zet-icon-img"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Badges Row */}
      <div className="zet-prices-row">
        {/* Gold Price Button */}
        <div className="zet-price-box-wrapper">
          <div className="zet-price-pill">{MEMBERSHIP_PLANS.gold.price}</div>
        </div>

        {/* Silver Price Button */}
        <div className="zet-price-box-wrapper">
          <div className="zet-price-pill">{MEMBERSHIP_PLANS.silver.price}</div>
        </div>
      </div>

      {/* Footnote */}
      <div className="zet-footnote">*Price exclusive of GST</div>
    </div>
  );
};
