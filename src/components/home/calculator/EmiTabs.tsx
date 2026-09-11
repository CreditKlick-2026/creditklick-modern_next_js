"use client";

import React from "react";
import { LoanType } from "@/types";
import { LOAN_TABS } from "./calculator.data";

interface EmiTabsProps {
  activeCalculator: LoanType;
  onSelectType: (type: LoanType) => void;
}

export const EmiTabs: React.FC<EmiTabsProps> = ({
  activeCalculator,
  onSelectType,
}) => {
  return (
    <div className="w-full">
      <div className="mt-2 px-4 md:flex">
        {LOAN_TABS.map((tab) => {
          const isActive = activeCalculator === tab.type;
          return (
            <button
              key={tab.type}
              className={`ck-emi-tab-btn ${
                isActive ? "ck-emi-tab-active" : "bg-white"
              }`}
              onClick={() => onSelectType(tab.type)}
              type="button"
            >
              <h3 className="sm:text-[14px] md:text-lg text-[10px] font-semibold">
                {tab.title}
              </h3>
              <p className="md:text-sm text-[10px] md:block hidden">
                {tab.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
