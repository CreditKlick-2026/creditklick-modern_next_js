export interface TestimonialItem {
  id: number;
  name: string;
  service: string;
  company: string;
  location: string;
  content: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  // Column 1: Credit Score Repair & CIBIL/CRIF Resolution
  {
    id: 1,
    name: "Mohit Verma",
    service: "Credit Refine",
    company: "Score 520 → 765",
    location: "Agra, Uttar Pradesh",
    content:
      "Before CreditKlick, my credit score was stuck at 520 with 2 wrongful DPB remarks from an old closed card. Within 60 days of their legal bureau audit, both remarks were purged and my score jumped to 765. Got my car loan approved instantly!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    service: "Bureau Dispute",
    company: "CRIF Error Purged",
    location: "New Delhi, NCR",
    content:
      "Had an incorrect identity mix-up on my CRIF report that dragged down my score for 2 years. CreditKlick filed a formal Section 17 dispute and restored my score to 780 without any upfront charges.",
  },
  {
    id: 3,
    name: "Karan Malhotra",
    service: "Credit Health",
    company: "+145 Pts Restored",
    location: "Chandigarh, Punjab",
    content:
      "My loan was rejected 3 times due to a disputed overdue entry. The CreditKlick legal team resolved it directly with the bank. My score improved by +145 points in 45 days!",
  },
  {
    id: 4,
    name: "Ananya Joshi",
    service: "Score Optimization",
    company: "Score 640 → 795",
    location: "Pune, Maharashtra",
    content:
      "Super transparent report audit. They highlighted the exact 3 negative factors affecting my score. Followed their action plan and crossed 795 in under 4 months.",
  },
  {
    id: 5,
    name: "Siddharth Nair",
    service: "Experian Certified",
    company: "Clean Bureau Report",
    location: "Kochi, Kerala",
    content:
      "Never thought credit rectification could be this smooth. Clean certificate generated from Experian and zero branch visits needed.",
  },

  // Column 2: Personal, Business & Home Loans
  {
    id: 6,
    name: "Chandrasekar R.",
    service: "Home Loan Transfer",
    company: "Saved ₹1.8L Interest",
    location: "Bengaluru, Karnataka",
    content:
      "Since I started using CreditKlick, I saved over ₹1.8 Lakhs on total interest by comparing bank offers and negotiating my balance transfer with accurate EMI insights.",
  },
  {
    id: 7,
    name: "Vikramaditya Rao",
    service: "Instant Business Loan",
    company: "₹12L in 2 Hours",
    location: "Hyderabad, Telangana",
    content:
      "Needed emergency business capital of ₹12 Lakhs. CreditKlick matched me with ICICI Bank and the full amount was disbursed in just 2 hours paperless.",
  },
  {
    id: 8,
    name: "Sneha Patel",
    service: "Zigma Loan Engine",
    company: "10.49% Preferential APR",
    location: "Ahmedabad, Gujarat",
    content:
      "Got an unbeatable 10.49% APR on my ₹5 Lakh personal loan without submitting physical paperwork. Everything was completed online via Aadhaar e-KYC.",
  },
  {
    id: 9,
    name: "Rajesh Kulshrestha",
    service: "Loan Syndication",
    company: "₹2,400/mo EMI Saved",
    location: "Jaipur, Rajasthan",
    content:
      "Compared 6 banks in real-time on the platform. Chose SBI for my home loan and saved ₹2,400 every month on my EMI. Highly recommended!",
  },
  {
    id: 10,
    name: "Deepak Sundaram",
    service: "Pre-Approved Loan",
    company: "15-Min Sanction",
    location: "Chennai, Tamil Nadu",
    content:
      "Pre-approved loan sanction letter in 15 minutes! The bank approval odds calculator was 100% accurate. Truly India's best fintech engine.",
  },

  // Column 3: Credit Cards, Forex & Rewards
  {
    id: 11,
    name: "Ravi Teja Naidu",
    service: "Nexus Curated Cards",
    company: "Lifetime Free Titanium",
    location: "Vijayawada, Andhra Pradesh",
    content:
      "I had zero credit history as a fresher. CreditKlick guided me step-by-step to build a 775 score, and I was approved for a lifetime-free card with 5% cashback and lounge access.",
  },
  {
    id: 12,
    name: "Aman Singhania",
    service: "0% Forex Card",
    company: "Saved ₹35K Fees",
    location: "Mumbai, Maharashtra",
    content:
      "Unlocked the 0% forex credit card right before my international business trip. Saved over ₹35,000 on foreign currency markup fees!",
  },
  {
    id: 13,
    name: "Meera Krishnan",
    service: "Card Finder",
    company: "Complimentary Lounges",
    location: "Coimbatore, Tamil Nadu",
    content:
      "The 3D card comparator made it effortless to filter by airport lounge access and rewards. Received my card within 3 business days.",
  },
  {
    id: 14,
    name: "Harish Chawla",
    service: "Black Titanium Card",
    company: "5% Unlimited Cashback",
    location: "Lucknow, Uttar Pradesh",
    content:
      "Got approved for a premium cashback credit card with a ₹3 Lakh limit. Direct cashback crediting to my bank account every billing cycle.",
  },
  {
    id: 15,
    name: "Ritika Sengupta",
    service: "Limit Boost Engine",
    company: "₹1.5L to ₹3L Upgrade",
    location: "Kolkata, West Bengal",
    content:
      "The credit limit upgrade prediction was spot on. My bank doubled my limit from ₹1.5L to ₹3L within 30 days of following their utilization tips.",
  },
];
