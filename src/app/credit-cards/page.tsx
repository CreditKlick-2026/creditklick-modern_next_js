// SSG - Static page (no dynamic data)
import { Metadata } from 'next'

// Client component for animations
import CreditCardsClient from '@/app/credit-cards/CreditCardsClient'

export const metadata: Metadata = {
    title: 'Top Credit Cards in India - Compare & Apply Online',
    description: 'Compare and apply for top credit cards from leading banks in India. Get instant approval on rewards, cashback, and travel credit cards through CreditKlick.',
    keywords: ['best credit cards india', 'apply for credit card online', 'cashback credit cards', 'reward points credit card', 'lounge access credit card', 'credit card comparison'],
    openGraph: {
        title: 'Compare & Apply for Best Credit Cards Online | CreditKlick',
        description: 'Choose from a wide range of credit cards tailored to your lifestyle. Instant digital application for AU, IDFC, SBI, and more.',
        images: ['/assets/heroimages/ccgifw.webp'],
    }
}

// Static data - `bank` and `bg` drive the CSS card face (no bank image assets exist)
const creditCards = [
    { name: 'AU Bank Credit Cards', bank: 'AU Small Finance Bank', bg: 'linear-gradient(135deg, #f59e0b, #b45309 60%, #7c2d12)', href: '/credit-card/au-bank' },
    { name: 'IDFC First Credit Cards', bank: 'IDFC FIRST Bank', bg: 'linear-gradient(135deg, #b91c1c, #7f1d1d 65%, #450a0a)', href: '/credit-card/idfc-bank' },
    { name: 'SBI Credit Cards', bank: 'SBI Card', bg: 'linear-gradient(135deg, #3b82f6, #1e40af 60%, #1e1b4b)', href: '/credit-card/sbi-bank' },
    { name: 'Yes Bank Credit Cards', bank: 'YES BANK', bg: 'linear-gradient(135deg, #0ea5e9, #1d4ed8 55%, #172554)', href: '/credit-card/yes-bank' }
]

const creditTable = [
    { card: 'IDFC Bank', category: 'Reward Points' },
    { card: 'AU Bank', category: 'Reward Points' },
    { card: 'RBL Bank', category: 'Reward Points' },
    { card: 'YES BANK', category: 'Reward Points' },
    { card: 'IndusInd Platinum Card', category: 'Fee Waiver' },
    { card: 'IndusInd Platinum Aura Edge Visa Card', category: 'Lifestyle' },
    { card: 'Citi Cash Back Credit Card', category: 'Cash Back' },
    { card: 'Citi Rewards Card', category: 'Rewards' },
    { card: 'IndianOil Citi Credit Card', category: 'Fuel' },
    { card: 'HDFC Diners ClubMiles Card', category: 'Lounge Access' },
    { card: 'Axis Bank Neo Credit Card', category: 'Shopping and Movies' },
    { card: 'HSBC Platinum Credit Card', category: 'Travel and Dining' },
    { card: 'Kotak PVR Gold Credit Card', category: 'Movies' }
]

const feesCharges = [
    {
        rate: '1). Purchase Annual Percentage Rate (APR)',
        charge: '0% fixed Intro APR for the first 12 months that your Account is open. After that, 14.74% to 20.74%, based on your creditworthiness. These APRs will vary with the market based on the Prime Rate.'
    },
    {
        rate: '2). Balance Transfer APR',
        charge: '0% fixed Intro APR for the first 12 months that your Account is open. After that, 14.74% to 20.74%, based on your creditworthiness. These APRs will vary with the market based on the Prime Rate.'
    },
    {
        rate: '3). Cash Advance APR',
        charge: '26.49%. This APR will vary with the market based on the Prime Rate.'
    },
    {
        rate: '4). Default APR and When It Applies',
        charge: 'Up to 29.99%. This APR will vary with the market based on the Prime Rate. The Default APR may be applicable to your Account if you Fail to make any Minimum Payment by the date and time due (late payment) or make a payment to us that is returned unpaid.'
    },
    {
        rate: '5). Grace Period',
        charge: 'Your due date will be a minimum of 20 days after the close of each billing cycle. We will not charge you interest on purchases if you pay your entire balance by the due date each month.'
    },
    {
        rate: '6). Minimum Interest Charge',
        charge: 'None'
    }
]

export default function CreditCardsPage() {
    return (
        <CreditCardsClient
            creditCards={creditCards}
            creditTable={creditTable}
            feesCharges={feesCharges}
        />
    )
}
