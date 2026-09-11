"use client";

import React from "react";
import { RewardsMatrix } from "./RewardsMatrix";

export const ZetPlusRewards: React.FC = () => {
  return (
    <section
      id="pricing"
      className="zet-rewards-section bg-white scroll-mt-28"
      style={{ backgroundColor: "#ffffff" }}
    >
      <span id="price" className="sr-only" aria-hidden="true" />
      <span id="zet-plus-rewards" className="sr-only" aria-hidden="true" />
      <div className="container mx-auto px-4">
        {/* Top Glowing Cyan Light Accent */}
        <img
          src="/images/zet/top_light.png"
          alt=""
          width={207}
          height={10}
          className="zet-rewards-top-light"
        />

        {/* Section Heading */}
        <h2 className="zet-rewards-title text-[#1c398e]" style={{ color: "#1c398e" }}>
          Upgrade Your CreditKlick Rewards
          <br />
          With CreditKlick Plus
        </h2>

        {/* Subtitle */}
        <p className="zet-rewards-subtitle">
          CreditKlick Plus users enjoy exclusive benefits on UPI
          <br className="hidden sm:inline" /> transactions, voucher payments, and more.
        </p>

        {/* Comparison Matrix Container */}
        <RewardsMatrix />
      </div>
    </section>
  );
};

export default ZetPlusRewards;
