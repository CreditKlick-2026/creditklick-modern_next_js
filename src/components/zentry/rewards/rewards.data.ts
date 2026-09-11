export interface FeatureItem {
  id: number;
  text: string;
  gold: boolean;
  silver: boolean;
}

export const FEATURES_LIST: FeatureItem[] = [
  {
    id: 1,
    text: "AI-powered video analysis of credit report",
    gold: true,
    silver: true,
  },
  {
    id: 2,
    text: "24/7 Credit Guru expert assistance",
    gold: true,
    silver: true,
  },
  {
    id: 3,
    text: "Expert help to fix credit report errors",
    gold: true,
    silver: true,
  },
  {
    id: 4,
    text: "Smart credit score improvement plan",
    gold: true,
    silver: true,
  },
  {
    id: 5,
    text: "Timely bill payment reminders",
    gold: true,
    silver: true,
  },
  {
    id: 6,
    text: "Flat 2% cashback on CreditKlick UPI payments",
    gold: true,
    silver: false,
  },
  {
    id: 7,
    text: "Zero convenience fee on monthly utility bills",
    gold: true,
    silver: false,
  },
  {
    id: 8,
    text: "Flat 5% cashback on Amazon Pay and\nFlipkart vouchers",
    gold: true,
    silver: false,
  },
];

export const MEMBERSHIP_PLANS = {
  gold: { name: "Gold", price: "₹99/m" },
  silver: { name: "Silver", price: "₹39/m" },
};
