"use client";

import React from "react";
import { LoanConfig } from "@/types";

interface EmiSlidersProps {
  config: LoanConfig;
  loanAmount: number;
  interestRate: number;
  tenure: number;
  onAmountChange: (amt: number) => void;
  onRateChange: (rate: number) => void;
  onTenureChange: (tenure: number) => void;
}

export const EmiSliders: React.FC<EmiSlidersProps> = ({
  config,
  loanAmount,
  interestRate,
  tenure,
  onAmountChange,
  onRateChange,
  onTenureChange,
}) => {
  return (
    <>
      <div>
        <span className="flex justify-between py-3">
          <p>Loan Amount(₹)</p>
          <p>₹{loanAmount.toLocaleString("en-IN")}</p>
        </span>
        <input
          type="range"
          min={config.minAmount}
          max={config.maxAmount}
          step={10000}
          value={loanAmount}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="w-11/12 flex mx-auto"
          aria-label="Loan Amount"
        />
      </div>

      <div>
        <span className="flex justify-between py-3">
          <p>Interest Rate %</p>
          <p>{interestRate}%</p>
        </span>
        <input
          type="range"
          min={config.minRate}
          max={config.maxRate}
          step={0.1}
          value={interestRate}
          onChange={(e) => onRateChange(Number(e.target.value))}
          className="w-11/12 flex mx-auto"
          aria-label="Interest Rate"
        />
      </div>

      <div>
        <span className="flex justify-between py-3">
          <p>Tenure (Months)</p>
          <p>{tenure}</p>
        </span>
        <input
          type="range"
          min={config.minTenure}
          max={config.maxTenure}
          step={1}
          value={tenure}
          onChange={(e) => onTenureChange(Number(e.target.value))}
          className="w-11/12 flex mx-auto"
          aria-label="Tenure Months"
        />
      </div>
    </>
  );
};
