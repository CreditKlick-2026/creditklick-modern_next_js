"use client";

import React from "react";
import { ECOSYSTEM_TABS, EcosystemTab } from "./ecosystem.data";

interface EcosystemTabsProps {
  activeTab: EcosystemTab;
  onTabChange: (tab: EcosystemTab) => void;
}

export const EcosystemTabs: React.FC<EcosystemTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full flex justify-center mb-8 sm:mb-10 px-2">
      <div className="eco-tabs-scroll-wrapper">
        <div className="eco-tabs-pill-box">
          {ECOSYSTEM_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as EcosystemTab)}
                className={`eco-tab-btn ${isActive ? "eco-tab-active" : ""}`}
                type="button"
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? "text-blue-500" : "text-slate-400"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
