import { LoanType, LoanConfig } from "@/types";

export const LOAN_CONFIGS: Record<LoanType, LoanConfig> = {
  personal: {
    name: "PERSONAL LOAN",
    minAmount: 20000,
    maxAmount: 10000000,
    minRate: 1,
    maxRate: 30,
    minTenure: 6,
    maxTenure: 120,
    defaultAmount: 500000,
    defaultRate: 15,
    defaultTenure: 60,
  },
  home: {
    name: "HOME LOAN",
    minAmount: 50000,
    maxAmount: 50000000,
    minRate: 1,
    maxRate: 30,
    minTenure: 1,
    maxTenure: 360,
    defaultAmount: 5000000,
    defaultRate: 8.5,
    defaultTenure: 240,
  },
  car: {
    name: "CAR LOAN",
    minAmount: 200000,
    maxAmount: 5500000,
    minRate: 9,
    maxRate: 25,
    minTenure: 12,
    maxTenure: 108,
    defaultAmount: 800000,
    defaultRate: 9,
    defaultTenure: 60,
  },
};

export const LOAN_TABS: { type: LoanType; title: string; subtitle: string }[] = [
  {
    type: "personal",
    title: "Personal Loan EMI Calculator",
    subtitle: "Determine the cost of facilitating immediate liquidity.",
  },
  {
    type: "home",
    title: "Home Loan EMI Calculator",
    subtitle: "Estimate the cost of realizing your ideal home.",
  },
  {
    type: "car",
    title: "Car Loan EMI Calculator",
    subtitle: "Compute the cost of personalizing your car.",
  },
];
