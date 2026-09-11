export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const FAQS_DATA: FaqItem[] = [
  {
    id: 1,
    question: "How can I check my credit score for free on CreditKlick?",
    answer:
      "You can check your official bureau credit score 100% free on CreditKlick simply by entering your 10-digit mobile number and verifying with an OTP. Within seconds, you will receive an instant, comprehensive bureau report analysis with zero hidden charges.",
  },
  {
    id: 2,
    question: "Does checking my credit score on CreditKlick hurt or lower my score?",
    answer:
      "No. Checking your credit score on CreditKlick is classified as a 'Soft Inquiry'. Soft inquiries have zero impact on your credit score and will never lower your rating, no matter how frequently you check.",
  },
  {
    id: 3,
    question: "What credit score is required for instant loan and credit card approvals?",
    answer:
      "In India, a credit score of 750 or above (on a 300 to 900 scale) is considered excellent. Maintaining 750+ significantly increases your approval odds for pre-approved personal loans up to ₹25 Lakhs, lowest preferential interest rates starting at 10.49% APR, and top-tier credit cards.",
  },
  {
    id: 4,
    question: "How does CreditKlick's 'Credit Refine' service resolve negative bureau remarks?",
    answer:
      "Credit Refine performs an automated audit across CRIF, Experian, and other member bureaus to detect clerical address mix-ups, erroneous write-offs, and wrongful Days Past Due (DPB) flags. Our regulatory team files formal Section 17 disputes directly with the bureaus and member banks to have invalid remarks purged.",
  },
  {
    id: 5,
    question: "How fast can I get an instant personal or business loan disbursed?",
    answer:
      "With CreditKlick's algorithmic Zigma lending syndication connected directly to 40+ scheduled commercial banks and NBFCs, pre-approved eligible borrowers can complete 100% paperless Aadhaar e-KYC and receive disbursals directly in their bank accounts in as little as 2 hours.",
  },
  {
    id: 6,
    question: "Are my financial records and personal data secure with CreditKlick?",
    answer:
      "Absolutely. CreditKlick adheres to stringent RBI regulatory data standards and implements bank-grade 256-Bit SSL encryption. Your sensitive information is never shared with unauthorized third parties without your explicit consent.",
  },
  {
    id: 7,
    question: "Can I calculate and compare loan EMIs before applying?",
    answer:
      "Yes. You can use our interactive EMI Loan Calculator to customize loan amounts, tenures (1 to 5 years), and view real-time monthly installments, total interest payable, and bank match probability odds before submitting an application.",
  },
  {
    id: 8,
    question: "What types of credit cards can I compare on CreditKlick?",
    answer:
      "You can compare over 100+ curated credit cards from India's leading banks—including lifetime-free cards, up to 5% unlimited cashback cards, zero forex markup travel cards, and cards with complimentary domestic and international airport lounge access.",
  },
];
