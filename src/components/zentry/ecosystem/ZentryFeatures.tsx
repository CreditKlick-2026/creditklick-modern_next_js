"use client";

import React, { useState } from "react";
import { EcosystemTab } from "./ecosystem.data";
import { EcosystemTabs } from "./EcosystemTabs";
import { SimulatorTab } from "./SimulatorTab";
import { LoansTab } from "./LoansTab";
import { CardsTab } from "./CardsTab";
import { RefineTab } from "./RefineTab";

export const ZentryFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EcosystemTab>("score");
  const [simScore, setSimScore] = useState<number>(780);
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [loanTenure, setLoanTenure] = useState<number>(3); // years

  return (
    <section id="ecosystem" className="eco-section bg-white">
      <div className="container mx-auto max-w-6xl relative z-10 px-2 sm:px-4">
        {/* Top Glowing Cyan Light Accent */}
        <img
          src="/images/zet/top_light.png"
          alt=""
          width={207}
          height={10}
          className="zet-rewards-top-light"
        />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="zet-rewards-title text-[#1c398e]" style={{ color: "#1c398e" }}>
            One Core.
            <br />
            Four Infinite Financial Superpowers
          </h2>

          <p className="zet-rewards-subtitle mt-3.5 max-w-2xl mx-auto">
            Experience our interactive fintech terminal. Select any ecosystem pillar below to see real-time algorithmic calculation, live bureau sync, and institutional bank underwriting.
          </p>
        </div>

        {/* Responsive Horizontal Touch Scroll Tabs */}
        <EcosystemTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* ── CENTRAL INTERACTIVE SHOWCASE STAGE (Laser Border CSS) ── */}
        <div className="eco-laser-container">
          <div className="eco-laser-beam" />
          <div className="eco-laser-content p-4 sm:p-8 md:p-10 lg:p-12 border border-blue-100/80">
            {activeTab === "score" && (
              <SimulatorTab simScore={simScore} onScoreChange={setSimScore} />
            )}

            {activeTab === "loans" && (
              <LoansTab
                loanAmount={loanAmount}
                loanTenure={loanTenure}
                onAmountChange={setLoanAmount}
                onTenureChange={setLoanTenure}
              />
            )}

            {activeTab === "cards" && <CardsTab />}

            {activeTab === "refine" && <RefineTab />}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Backwards compatibility exports */
export const BentoTilt: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => <div className={className}>{children}</div>;

export const BentoCard: React.FC<{
  title: React.ReactNode;
  description?: string;
  actionText?: string;
  href?: string;
  badgeText?: string;
  visualWidget?: React.ReactNode;
  children?: React.ReactNode;
}> = ({ children }) => <div>{children}</div>;

export default ZentryFeatures;
