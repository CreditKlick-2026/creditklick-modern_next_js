"use client";

import React from "react";

interface EmiBreakdownProps {
  calculations: {
    emi: number;
    totalInterest: number;
    totalAmount: number;
  };
}

export const EmiBreakdown: React.FC<EmiBreakdownProps> = ({ calculations }) => {
  return (
    <div className="font-semibold text-xs md:text-sm pt-4 border-t mt-4">
      <span className="flex justify-between py-2">
        <p>Monthly EMI</p>
        <p className="text-blue-600 font-bold">
          ₹{calculations.emi.toLocaleString("en-IN")}
        </p>
      </span>
      <span className="flex justify-between py-2">
        <p>Total Interest Payable</p>
        <p>₹{calculations.totalInterest.toLocaleString("en-IN")}</p>
      </span>
      <span className="flex justify-between py-2">
        <p>Total Amount Payable</p>
        <p>₹{calculations.totalAmount.toLocaleString("en-IN")}</p>
      </span>
    </div>
  );
};
