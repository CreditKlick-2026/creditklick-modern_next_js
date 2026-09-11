"use client";

import React, { useState, useMemo } from "react";
import { LoanType } from "@/types";
import { LOAN_CONFIGS } from "./calculator.data";
import { EmiTabs } from "./EmiTabs";
import { EmiSliders } from "./EmiSliders";
import { EmiBreakdown } from "./EmiBreakdown";
import { EmiChart } from "./EmiChart";

export function HomeEmiCalculator() {
  const [activeCalculator, setActiveCalculator] = useState<LoanType>("personal");
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(15);
  const [tenure, setTenure] = useState(60);

  const handleLoanTypeChange = (type: LoanType) => {
    setActiveCalculator(type);
    const config = LOAN_CONFIGS[type];
    setLoanAmount(config.defaultAmount);
    setInterestRate(config.defaultRate);
    setTenure(config.defaultTenure);
  };

  const calculations = useMemo(() => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure;
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const calculatedEmi = isNaN(emi) ? 0 : Math.round(emi);
    const totalAmt = calculatedEmi * N;
    const totalInt = totalAmt - P;
    return {
      emi: calculatedEmi,
      totalInterest: totalInt > 0 ? totalInt : 0,
      totalAmount: totalAmt > 0 ? totalAmt : 0,
    };
  }, [loanAmount, interestRate, tenure]);

  const activeConfig = LOAN_CONFIGS[activeCalculator];

  return (
    <div className="ck-emi-card md:w-4/6 w-5/6 mx-auto my-10 shadow-lg p-2 rounded-xl">
      <EmiTabs
        activeCalculator={activeCalculator}
        onSelectType={handleLoanTypeChange}
      />

      <div className="md:flex">
        <div className="p-4 md:w-1/2">
          <div className="ck-emi-header-banner p-4 bg-gradient-to-r from-gray-50 to-blue-100">
            <p className="font-semibold md:text-lg text-xs">EMI calculator for</p>
            <h4 className="font-semibold md:text-2xl text-md text-blue-900">
              {activeConfig.name}
            </h4>
          </div>

          <div className="w-5/6 mx-auto font-semibold text-xs md:text-sm py-4">
            <EmiSliders
              config={activeConfig}
              loanAmount={loanAmount}
              interestRate={interestRate}
              tenure={tenure}
              onAmountChange={setLoanAmount}
              onRateChange={setInterestRate}
              onTenureChange={setTenure}
            />

            <EmiBreakdown calculations={calculations} />
          </div>
        </div>

        <EmiChart
          totalInterest={calculations.totalInterest}
          loanAmount={loanAmount}
        />
      </div>
    </div>
  );
}

export default HomeEmiCalculator;
