import { Metadata } from 'next'
import HomeClient from './HomeClient'

// Static generation for maximum performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'CreditKlick - Check Free Credit Score, Compare Loans & Credit Cards',
  description: "India's leading financial marketplace. Check your free credit score, apply for personal loans, business loans, home loans, and compare the best credit cards online.",
  keywords: ['credit score', 'free credit report', 'personal loan', 'home loan', 'business loan', 'credit card', 'credit klick', 'credit repair', 'finance india'],
  openGraph: {
    title: 'CreditKlick - Your Financial Partner for Loans & Credit Score',
    description: 'Get your free credit score, compare top loan offers, and apply for the best credit cards in India. Fast, secure, and purely digital.',
    images: ['/assets/img/newlogo.webp'],
  },
  alternates: {
    canonical: '/',
  }
}

export default function HomePage() {
  return <HomeClient />
}
