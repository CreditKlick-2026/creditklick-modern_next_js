import { NavItem } from '@/types'

export const navItems: NavItem[] = [
    // Commented out bank credit card routes:
    // http://localhost:3000/credit-card/au-bank
    // http://localhost:3000/credit-card/idfc-bank
    // http://localhost:3000/credit-card/sbi-bank
    // http://localhost:3000/credit-card/yes-bank
    // {
    //     label: 'Credit Card',
    //     href: '/credit-cards',
    //     icon: '/assets/icons/3d/credit-card.png',
    //     children: [
    //         { label: 'AU Bank Credit Card', href: '/credit-card/au-bank', icon: '/assets/icons/3d/au-credit-card.png' },
    //         { label: 'IDFC First Credit Card', href: '/credit-card/idfc-bank', icon: '/assets/icons/3d/idfc-credit-card.png' },
    //         { label: 'SBI Credit Cards', href: '/credit-card/sbi-bank', icon: '/assets/icons/3d/sbi-credit-card.png' },
    //         { label: 'Yes Bank Credit Cards', href: '/credit-card/yes-bank', icon: '/assets/icons/3d/yes-credit-card.png' },
    //     ]
    // },
    {
        label: 'Price',
        href: '/#pricing',
        icon: '/assets/icons/3d/credit-card.png',
    },
    {
        label: 'Loans',
        href: '/loans',
        icon: '/assets/icons/3d/loans.png',
        children: [
            { label: 'Personal Loan', href: '/loan/personal-loan', icon: '/assets/icons/3d/personal-loan.png' },
            { label: 'Home Loan', href: '/loan/home-loan', icon: '/assets/icons/3d/home-loan.png' },
            { label: 'Business Loan', href: '/loan/business-loan', icon: '/assets/icons/3d/business-loan.png' },
        ]
    },
    { label: 'Credit Refine', href: '/refine', icon: '/assets/icons/3d/credit-refine.png' },
    {
        label: 'Calculators',
        href: '/calculators',
        icon: '/assets/icons/3d/calculator_v2.png',
        children: [
            { label: 'EMI Calculator', href: '/emi', icon: '/assets/icons/3d/emi-calculator.png' },
            { label: 'AU Value Calculator', href: '/calculator/au', icon: '/assets/icons/3d/au-calculator.png' },
            { label: 'IDFC Value Calculator', href: '/calculator/idfc', icon: '/assets/icons/3d/idfc-calculator.png' },
            { label: 'SBI Simply Save', href: '/calculator/sbi-save', icon: '/assets/icons/3d/sbi-save-calculator.png' },
            { label: 'SBI Simply Click', href: '/calculator/sbi-click', icon: '/assets/icons/3d/sbi-click-calculator.png' },
            { label: 'Yes Bank Value', href: '/calculator/yes', icon: '/assets/icons/3d/yes-calculator.png' },
        ]
    },
]

export const blogCategoryIcons: Record<string, string> = {
    'loans': '/assets/icons/3d/loans.png',
    'Loans': '/assets/icons/3d/loans.png',
    'credit-cards': '/assets/icons/3d/credit-card.png',
    'Credit Cards': '/assets/icons/3d/credit-card.png',
    'Credit Card': '/assets/icons/3d/credit-card.png',
    'cibil': '/assets/icons/3d/cibil.png',
    'CIBIL': '/assets/icons/3d/cibil.png',
    'Cibil': '/assets/icons/3d/cibil.png',
    'Credit Score': '/assets/icons/3d/cibil.png',
    'tips': '/assets/icons/3d/tips.png',
    'Tips': '/assets/icons/3d/tips.png',
    'guides': '/assets/icons/3d/guides.png',
    'Guides': '/assets/icons/3d/guides.png',
    'calculators': '/assets/icons/3d/calculator_v2.png',
    'Calculators': '/assets/icons/3d/calculator_v2.png'
}

export const categoryLabels: Record<string, string> = {
    'cibil': 'Credit Score',
    'CIBIL': 'Credit Score',
    'credit-score': 'Credit Score',
    'loans': 'Loans',
    'credit-cards': 'Credit Cards',
    'tips': 'Financial Tips',
    'Financial Tips': 'Financial Tips',
    'guides': 'Financial Tips',
    'calculators': 'Calculators'
}

export interface BlogPostSummary {
    title: string
    slug: string
}

export interface BlogCategoryGroup {
    key: string
    label: string
    count: number
    icon: string
    href: string
    posts: BlogPostSummary[]
}

export const defaultBlogCategoryGroups: BlogCategoryGroup[] = [
    {
        key: 'cibil',
        label: 'Credit Score',
        count: 19,
        icon: '/assets/icons/3d/cibil.png',
        href: '/blog?category=cibil',
        posts: [
            { title: 'What is Credit Repair & How to Improve Credit Score?', slug: 'what-is-credit-repair-and-how-to-improve-credit-score' },
            { title: 'How to Check Free Credit Score by PAN Card Online', slug: 'check-cibil-score' },
            { title: 'Check Free Credit Score & CIBIL Report in India 2026', slug: 'check-free-credit-score-and-cibil-report-in-india-2026' },
            { title: '10 Tips to Build or Improve a Healthy Credit Score', slug: '10-tips-to-build-or-improve-a-healthy-credit-score' },
            { title: 'How to Increase CIBIL Score Immediately: 7 Expert Strategies for 2026', slug: 'how-to-increase-cibil-score-immediately-7-expert-strategies-for-2026' },
            { title: 'How to Increase CIBIL Score from 600 to 750', slug: 'how-to-increase-cibil-score-from-600-to-750' },
            { title: 'Credit Score Explained: Meaning, Importance, Range & How to Improve It', slug: 'credit-score-explained-meaning-importance-range-and-how-to-improve-it' },
            { title: 'How to Repair a Faulty Credit Report and Boost Your Score', slug: 'how-to-repair-a-faulty-credit-report-and-boost-your-score' },
            { title: 'How to Improve Credit Score: The Complete Expert Guide', slug: 'how-to-improve-credit-score-the-complete-expert-guide' },
            { title: 'How to Improve Your Credit Score Fast in India', slug: 'how-to-improve-your-credit-score-fast-in-india' },
            { title: 'Check Free Credit/CIBIL Score Online & Get FREE Credit Report', slug: 'check-free-creditcibil-score-online-and-get-free-credit-report' },
            { title: "CreditKlick's Credit Improvement Services to Help Build Credit Score", slug: 'creditklicks-credit-improvement-services-to-help-build-credit-score' },
            { title: 'About Credit Score: Your Guide to Financial Health', slug: 'about-credit-score-your-guide-to-financial-health' },
            { title: 'How to Improve Credit Score in India Fast', slug: 'how-to-improve-credit-score-in-india-fast' },
            { title: 'How to Improve Credit Score in India', slug: 'how-to-improve-credit-score-in-india' },
            { title: 'How to Fix Credit Score in India', slug: 'how-to-fix-credit-score-in-india' },
            { title: 'How Can You Improve Credit Score', slug: 'how-can-you-improve-credit-score' },
            { title: 'How to Improve Credit Check | 10 Fast Ways to Boost Your Score', slug: 'how-to-improve-credit-check-or-10-fast-ways-to-boost-your-score' },
            { title: 'Apply for instant personal loan with low Credit score', slug: 'apply-for-instant-personal-loan-with-low-credit-score' },
        ]
    },
    {
        key: 'tips',
        label: 'Financial Tips',
        count: 15,
        icon: '/assets/icons/3d/tips.png',
        href: '/blog?category=tips',
        posts: [
            { title: 'Credit Score Kaise Badhaye 2026 – भारत में CIBIL स्कोर तेजी से बढ़ाने का पूरा गाइड', slug: 'credit-score-kaise-badhaye-2026-cibil' },
            { title: 'How to Improve Credit Score in India 2026 – Proven Step-by-Step Guide with CreditKlick', slug: 'how-to-improve-credit-score-in-india-2026-proven-step-by-step-guide-with-creditklick' },
            { title: 'How to Increase Credit Score in India 2026 – Step-by-Step Guide with CreditKlick', slug: 'how-to-increase-credit-score-in-india-2026-step-by-step-guide-with-creditklick' },
            { title: 'How to Improve Credit Score Fast in India 2026 – Credit Improvement Tips', slug: 'how-to-improve-credit-score-fast-in-india-2026-credit-improvement-tips' },
            { title: 'Credit Sudhaar: Complete Guide to Improve Your CIBIL Score in India 2026', slug: 'credit-sudhaar-complete-guide-to-improve-your-cibil-score-in-india-2026' },
            { title: 'Credit Refine: Expert Way to Boost Your Credit Score in India 2026', slug: 'credit-refine-expert-way-to-boost-your-credit-score-in-india-2026' },
            { title: 'Best Credit Score Improvement Apps in India 2026 – Honest Comparison & Real Results', slug: 'best-credit-score-improvement-apps-in-india-2026-honest-comparison-and-real-results' },
            { title: 'CIBIL Score Improvement in India 2026 – Step-by-Step Guide with CreditKlick', slug: 'cibil-score-improvement-in-india-2026-step-by-step-guide-with-creditklick' },
            { title: '7 Easy Ways How to Improve Credit Score', slug: '7-easy-ways-how-to-improve-credit-score' },
            { title: 'Tips to Improve Your Credit Score Through Personal Loans', slug: 'tips-to-improve-your-credit-score-through-personal-loans' },
            { title: 'How to Repair Credit Score in India - Fast & Free Tips', slug: 'how-to-repair-credit-score-in-india-fast-and-free-tips' },
            { title: 'How to improve credit score with credit card', slug: 'how-to-improve-credit-score-with-credit-card' },
            { title: 'Your Credit Score is Low? Know how to Improve Credit Score', slug: 'your-credit-score-is-low-know-how-to-improve-credit-score' },
            { title: 'How to Improve Credit Score in India 2026', slug: 'how-to-improve-credit-score-in-india-2026' },
            { title: 'How Can You Improve Credit Score', slug: 'how-can-you-improve-credit-score-1776331698216' },
        ]
    },
    {
        key: 'loans',
        label: 'Loans',
        count: 3,
        icon: '/assets/icons/3d/loans.png',
        href: '/blog?category=loans',
        posts: [
            { title: 'Personal loan apply online 20,000', slug: 'personal-loan-apply-online-20000' },
            { title: 'Apply for Instant Personal Loan with Low CIBIL Score', slug: 'apply-for-instant-personal-loan-with-low-cibil-score' },
            { title: 'Apply for Instant Personal Loan with Low CIBIL Score (Guide 2)', slug: 'apply-for-instant-personal-loan-with-low-cibil-score-1778046016450' },
        ]
    },
    {
        key: 'credit-cards',
        label: 'Credit Cards',
        count: 2,
        icon: '/assets/icons/3d/credit-card.png',
        href: '/blog?category=credit-cards',
        posts: [
            { title: "Credit Improvement 2026: India's Best Credit Repair Company", slug: 'credit-improvement-2026-indias-best-credit-repair-company' },
            { title: 'Apply for Credit Card in 5 Minutes - 0 Annual Fee, 0 Joining Fee', slug: 'apply-for-credit-card-in-5-minutes-0-annual-fee-0-joining-fee' },
        ]
    },
    {
        key: 'calculators',
        label: 'Calculators',
        count: 2,
        icon: '/assets/icons/3d/calculator_v2.png',
        href: '/blog?category=calculators',
        posts: [
            { title: 'Personal Loan EMI Calculator How to Plan Your Loan Before You Apply', slug: 'personal-loan-emi-calculator-how-to-plan-your-loan-before-you-apply' },
            { title: 'Personal Loan Interest Rates EMI Calculator Online', slug: 'personal-loan-interest-rates-emi-calculator-online' },
        ]
    }
]
