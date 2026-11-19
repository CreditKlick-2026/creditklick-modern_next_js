export interface FaqListItem {
  term: string;
  text: string;
}

export interface FaqList {
  title?: string;
  ordered?: boolean;
  items: readonly (string | FaqListItem)[];
}

// A string renders as a paragraph, a list object as a (titled) bullet or numbered list
export type FaqAnswerBlock = string | FaqList;

export interface FaqItem {
  id: number;
  question: string;
  answer: readonly FaqAnswerBlock[];
}

export interface FaqCategory {
  id: string;
  label: string;
  faqs: readonly FaqItem[];
}

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "about",
    label: "About CreditKlick",
    faqs: [
      {
        id: 1,
        question: "What is CreditKlick?",
        answer: [
          "CreditKlick is a credit health and debt relief platform built for India. It gives you your free credit report from CRIF High Mark (one of the four RBI-authorized credit bureaus) with a detailed, factor-by-factor analysis of what's helping or hurting your score.",
          "Beyond tracking, CreditKlick helps you fix errors in your report through Credit Refine, manage and settle debts with expert counseling, and compare loans and credit cards — all in one place.",
        ],
      },
      {
        id: 2,
        question: "How quickly can CreditKlick improve my credit score?",
        answer: [
          "It depends on your starting score and credit history. Credit bureaus typically update every 15–45 days, so positive changes — like clearing overdue amounts, correcting report errors or lowering your credit utilization — usually start reflecting within one to two reporting cycles.",
          "CreditKlick helps you focus on the highest-impact actions first. Serious issues like settled or written-off accounts take longer to resolve, but our experts guide you through every step.",
        ],
      },
      {
        id: 3,
        question: "How is CreditKlick different from other credit score apps?",
        answer: [
          "Most credit apps only show you a number. CreditKlick helps you take real action to improve it. Three things set us apart:",
          {
            items: [
              {
                term: "Credit Refine",
                text: "We identify errors in your credit report and raise disputes directly with the bureaus and lenders.",
              },
              {
                term: "Debt relief support",
                text: "Our experts negotiate with your creditors and help stop harassment from recovery agents.",
              },
              {
                term: "1-on-1 guidance",
                text: "Certified financial advisors give you personalized advice instead of generic tips.",
              },
            ],
          },
          "It's the difference between monitoring your score and actually fixing it.",
        ],
      },
      {
        id: 4,
        question: "How does CreditKlick's 'Credit Refine' service resolve negative bureau remarks?",
        answer: [
          "Credit Refine performs an automated audit across CRIF, Experian, and other member bureaus to detect clerical address mix-ups, erroneous write-offs, and wrongful Days Past Due (DPD) flags. Our regulatory team files formal Section 17 disputes directly with the bureaus and member banks to have invalid remarks purged.",
        ],
      },
      {
        id: 5,
        question: "How can I check my credit score for free on CreditKlick?",
        answer: [
          "Checking your score is 100% free and takes just a couple of minutes. Verify your 10-digit mobile number with an OTP and securely share a few basic details (name, date of birth and PAN). CreditKlick then fetches your official credit report from CRIF High Mark along with a comprehensive analysis — with zero hidden charges.",
          "Since checking your own score is a soft inquiry, it never affects your credit score.",
        ],
      },
      {
        id: 6,
        question: "Which credit bureau does CreditKlick partner with?",
        answer: [
          "CreditKlick fetches your credit score and report from CRIF High Mark, one of the four credit bureaus authorized by the Reserve Bank of India (alongside TransUnion CIBIL, Experian and Equifax). So the report you see is built on the same bureau data that lenders use when evaluating your applications.",
        ],
      },
    ],
  },
  {
    id: "credit-score",
    label: "Credit Score & Reports",
    faqs: [
      {
        id: 7,
        question: "What is a credit score?",
        answer: [
          "A credit score is a 3-digit number, usually between 300 and 900, that sums up your creditworthiness based on your credit history and repayment behavior. It tells lenders how likely you are to repay borrowed money on time.",
          {
            title: "Key points",
            items: [
              { term: "Range", text: "300 (poor) to 900 (excellent)" },
              {
                term: "Purpose",
                text: "Lenders use it to decide whether to approve your loan and at what interest rate",
              },
              { term: "Higher score", text: "Lower risk in the eyes of lenders" },
            ],
          },
          "Your score affects your loan approval chances, the interest rates you're offered and your credit card limits.",
        ],
      },
      {
        id: 8,
        question: "What is a good credit score?",
        answer: [
          "In India, a score above 700 is generally considered good. However, exact requirements vary from lender to lender:",
          {
            items: [
              { term: "Below 600", text: "Very difficult to get loans approved" },
              { term: "600–650", text: "Challenging; approval may come at high interest rates" },
              { term: "650–700", text: "Acceptable; you may face higher interest rates" },
              { term: "700–750", text: "Good; better loan terms available" },
              { term: "750+", text: "Excellent; best interest rates and terms" },
            ],
          },
          "Note: Every bank and NBFC sets its own credit score criteria, so check your lender's specific requirements before applying.",
        ],
      },
      {
        id: 9,
        question: "Why is maintaining a good credit score important?",
        answer: [
          "A good credit score helps you get loans at lower interest rates, qualify for premium financial products and build trust with lenders.",
          {
            title: "Benefits of a higher score",
            items: [
              "Lower interest rates on loans and credit cards",
              "Higher chances of loan approval",
              "Better credit card offers",
              "Faster loan processing",
            ],
          },
        ],
      },
      {
        id: 10,
        question: "What is the difference between a credit score and a credit report?",
        answer: [
          "The two are closely related, but not the same:",
          {
            title: "Credit report",
            items: [
              "A detailed record of your entire borrowing history",
              "Lists all your loans and credit cards with their payment history",
              "Shows late payments, defaults and settled accounts",
              "Records hard inquiries made when you apply for credit",
              "Prepared by credit bureaus such as CRIF High Mark",
            ],
          },
          {
            title: "Credit score",
            items: [
              "A single number (300–900) calculated from your credit report",
              "Summarizes your creditworthiness at a glance",
              "Driven by factors like payment history and credit utilization",
              "Changes as lenders report new information to the bureau",
              "Helps lenders make quick lending decisions",
            ],
          },
        ],
      },
      {
        id: 11,
        question: "How is a credit score calculated?",
        answer: [
          "Every bureau uses its own scoring model, but your score broadly depends on these factors (weightages are indicative):",
          {
            items: [
              {
                term: "Payment history (~35%)",
                text: "Paying EMIs and card bills on time has the biggest impact.",
              },
              {
                term: "Credit utilization (~30%)",
                text: "Using only a small part of your available credit limit helps your score.",
              },
              {
                term: "Length of credit history (~15%)",
                text: "A longer track record of credit works in your favor.",
              },
              {
                term: "Credit mix (~10%)",
                text: "A healthy mix of loans and credit cards is beneficial.",
              },
              {
                term: "New credit (~10%)",
                text: "Too many credit applications in a short time can pull your score down.",
              },
            ],
          },
          "Paying on time and keeping balances low are the most effective ways to build and maintain a healthy score.",
        ],
      },
      {
        id: 12,
        question: "What factors affect my credit score?",
        answer: [
          "Your credit score is influenced by:",
          {
            ordered: true,
            items: [
              { term: "Payment history", text: "On-time or late payments" },
              { term: "Amounts owed", text: "How much of your available credit you're using" },
              { term: "Length of credit history", text: "How long you've had credit" },
              { term: "Types of credit", text: "Your mix of credit products" },
              { term: "Recent credit inquiries", text: "New credit applications" },
            ],
          },
          "CreditKlick's report analysis breaks down each of these factors, so you can see exactly how each one impacts your score.",
        ],
      },
      {
        id: 13,
        question: "Will improving my credit score guarantee loan approval?",
        answer: [
          "Not always. A higher score significantly improves your chances, but lenders also consider other factors:",
          {
            items: [
              "Your credit score and repayment history",
              "Income stability and debt-to-income ratio",
              "Employment history",
              "Existing loan obligations",
              "Lender-specific eligibility criteria",
            ],
          },
        ],
      },
      {
        id: 14,
        question: "Does checking my credit score on CreditKlick hurt or lower my score?",
        answer: [
          "No. Checking your credit score on CreditKlick is classified as a 'Soft Inquiry'. Soft inquiries have zero impact on your credit score and will never lower your rating, no matter how frequently you check.",
          {
            title: "Soft inquiry (no impact on your score)",
            items: [
              "Checking your own credit score",
              "Background checks by employers",
              "Pre-approved offers from lenders",
            ],
          },
          {
            title: "Hard inquiry (can lower your score)",
            items: [
              "Applying for a new loan",
              "Applying for a new credit card",
              "A lender pulling your report to make an approval decision",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "debt-settlement",
    label: "Debt Settlement Support",
    faqs: [
      {
        id: 15,
        question: "Is settling debt beneficial for my credit score?",
        answer: [
          "Settling an overdue loan is better than leaving it unpaid — it stops penalties and fresh late-payment entries from piling up. However, the account is reported to credit bureaus as 'Settled' instead of 'Closed', which lenders treat as a negative remark.",
          "So while a settlement helps you move forward, repaying the full outstanding amount (so the account is marked 'Closed') is better for your score whenever possible. After a settlement, consistent on-time payments on your other accounts help your score recover steadily.",
        ],
      },
      {
        id: 16,
        question: "How does CreditKlick help with settling old debts?",
        answer: [
          "With our debt relief services, CreditKlick's experts help you:",
          {
            items: [
              "Negotiate with your creditors to reduce EMIs or reach a fair settlement",
              "Consolidate multiple debts into a single, affordable monthly payment",
              "Stop harassment from recovery agents with legal support",
              "Track every creditor and payment detail 24/7 on our secure platform",
            ],
          },
          "It's support that goes beyond just monitoring your credit — our trained consultants stay with you throughout the process.",
        ],
      },
    ],
  },
  {
    id: "loans-payments",
    label: "Loans, Cards & Payments",
    faqs: [
      {
        id: 17,
        question: "What credit score is required for instant loan and credit card approvals?",
        answer: [
          "In India, a credit score of 750 or above (on a 300 to 900 scale) is considered excellent. Maintaining 750+ significantly increases your approval odds for pre-approved personal loans up to ₹25 Lakhs, lowest preferential interest rates starting at 10.49% APR, and top-tier credit cards.",
        ],
      },
      {
        id: 18,
        question: "How fast can I get an instant personal or business loan disbursed?",
        answer: [
          "With CreditKlick's algorithmic Zigma lending syndication connected directly to 40+ scheduled commercial banks and NBFCs, pre-approved eligible borrowers can complete 100% paperless Aadhaar e-KYC and receive disbursals directly in their bank accounts in as little as 2 hours.",
        ],
      },
      {
        id: 19,
        question: "What types of credit cards can I compare on CreditKlick?",
        answer: [
          "You can compare over 100+ curated credit cards from India's leading banks—including lifetime-free cards, up to 5% unlimited cashback cards, zero forex markup travel cards, and cards with complimentary domestic and international airport lounge access.",
        ],
      },
      {
        id: 20,
        question: "Can I calculate and compare loan EMIs before applying?",
        answer: [
          "Yes. You can use our interactive EMI Loan Calculator to customize loan amounts, tenures (1 to 5 years), and view real-time monthly installments, total interest payable, and bank match probability odds before submitting an application.",
        ],
      },
      {
        id: 21,
        question: "How can CreditKlick help me avoid missed payments?",
        answer: [
          "If you're juggling multiple EMIs, our debt management plan consolidates them into a single, affordable monthly payment — so there are fewer due dates to track. Every creditor and payment detail stays accessible 24/7 on our secure platform, and our free EMI calculators help you plan repayments that fit your budget before you borrow.",
        ],
      },
      {
        id: 22,
        question: "What happens if I miss an EMI or credit card payment?",
        answer: [
          "A missed payment usually attracts late fees and penalty charges, and the delay is reported to credit bureaus as Days Past Due (DPD), which can lower your score. The longer a payment stays overdue, the bigger the impact.",
          "Pay the due amount as soon as possible. If you're struggling to keep up with multiple EMIs, reach out to CreditKlick's debt counseling team early — before things escalate.",
        ],
      },
    ],
  },
  {
    id: "security",
    label: "Security & Privacy",
    faqs: [
      {
        id: 23,
        question: "Are my financial records and personal data secure with CreditKlick?",
        answer: [
          "Absolutely. CreditKlick adheres to stringent RBI regulatory data standards and implements bank-grade 256-Bit SSL encryption. Your sensitive information is never shared with unauthorized third parties without your explicit consent.",
          "We access only the data that's essential to improving your credit health, and only after you authorize it.",
        ],
      },
    ],
  },
  {
    id: "account",
    label: "Account Management",
    faqs: [
      {
        id: 24,
        question: "How can I track all my loans and credit cards with CreditKlick?",
        answer: [
          "Your CreditKlick credit report brings all your loans and credit cards together in one place — with outstanding balances, repayment history and factor-by-factor insights. If you're enrolled in a debt management plan, every creditor and payment detail also stays accessible 24/7 on our secure customer portal.",
        ],
      },
    ],
  },
  {
    id: "support",
    label: "Customer Support",
    faqs: [
      {
        id: 25,
        question: "How can I contact customer support?",
        answer: [
          "Our dedicated support team is happy to help. Email us at support@creditklick.com, call our helpline at +91 8800367367, or send your query through the Contact Us page.",
          "For complaints, use the Register Complaint page. Unresolved issues can be escalated through our Grievance Redressal process.",
        ],
      },
    ],
  },
];
