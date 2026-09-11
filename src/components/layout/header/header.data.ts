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
    'tips': 'Tips & Guides',
    'guides': 'Tips & Guides',
    'calculators': 'Calculators'
}
