export type LoanType = 'personal' | 'home' | 'car'

export interface LoanConfig {
    name: string
    minAmount: number
    maxAmount: number
    minRate: number
    maxRate: number
    minTenure: number
    maxTenure: number
    defaultAmount: number
    defaultRate: number
    defaultTenure: number
}

export interface EMICalculationResult {
    emi: number
    totalInterest: number
    totalAmount: number
}
