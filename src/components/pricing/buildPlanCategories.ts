import { parsePrice, fmtNum, sortPlans, isCustomPlan } from "./pricingModel";

export { parsePrice, fmtNum };

export interface CategoryRow {
    name: string;
    tooltip?: string;
    values: any[];
}

export interface PlanCategory {
    title: string;
    rows: CategoryRow[];
}

export function buildCategories(plans: any[], includeAi: boolean = true): PlanCategory[] {
    const sorted = sortPlans(plans);

    const isCustom = (p: any) => isCustomPlan(p);

    const isPro = (p: any) => {
        const name = (p?.name || '').toLowerCase();
        return !isCustom(p) && name.includes('pro');
    };

    const isBasic = (p: any) => {
        const name = (p?.name || '').toLowerCase();
        return name.includes('basic') || name.includes('starter') || (!isPro(p) && !isCustom(p));
    };

    const row = (name: string, fn: (p: any) => any, tooltip?: string): CategoryRow => ({
        name,
        tooltip,
        values: sorted.map(fn)
    });

    return [
        {
            title: "CREDIT REPORTS & MONITORING",
            rows: [
                row("CIBIL Score Check", () => true, "Official TransUnion CIBIL credit score check."),
                row("Experian, Equifax & CRIF Reports", (p) => isBasic(p) ? 'Experian Only' : 'All 4 Bureaus', "Access full reports across all 4 RBI-licensed bureaus."),
                row("Report Refresh Frequency", (p) => isCustom(p) ? 'Instant on Demand' : isPro(p) ? 'Every 15 Days' : 'Monthly', "How often your credit score is re-pulled without hurting score."),
                row("Credit Factor Breakdown", () => true, "In-depth health analysis of repayment history, credit mix, and utilization."),
                row("Negative Remarks & DPD Scanner", (p) => !isBasic(p), "Instant AI audit of late payment remarks (30+, 60+, 90+ DPD)."),
                row("WhatsApp Bureau Change Alerts", () => true, "Real-time alerts whenever a bank reports an update or hard inquiry.")
            ]
        },
        {
            title: "DISPUTE RESOLUTION & BUREAU REPAIR",
            rows: [
                row("Bureau Dispute Filing Assistance", (p) => isCustom(p) ? 'Unlimited' : isPro(p) ? true : 'Self-help Guide', "Formal dispute submission with CIBIL, Experian, and banks."),
                row("Overdue Status Rectification", (p) => !isBasic(p), "Fix closed or settled accounts improperly tagged as overdue by banks."),
                row("Mismatched Personal/PAN Details Dispute", (p) => !isBasic(p), "Rectify clerical errors in name, date of birth, PAN, or wrong address."),
                row("Unauthorized Inquiries Removal", (p) => !isBasic(p), "Challenge and delete fraudulent hard loan inquiries."),
                row("Bank Escalation & Nodal Desk Follow-up", (p) => !isBasic(p), "Direct follow-up with bank Principal Nodal Officers (PNO).")
            ]
        },
        {
            title: "AI CREDIT SIMULATOR & ADVISORY",
            rows: [
                row("AI Score Boost Simulator", (p) => !isBasic(p), "Interactive AI simulation showing score gains for paying down debt."),
                row("Personalized 90-Day Rebuild Roadmap", (p) => !isBasic(p), "Step-by-step custom milestones to target 750+ CIBIL score."),
                row("Debt-to-Income (DTI) Optimization", (p) => !isBasic(p), "Calculated debt payoff strategy to maximize loan approval odds."),
                row("Credit Card Limit Utilization Plan", (p) => !isBasic(p), "Smart card-spend redistribution recommendations to stay under 30% utilization.")
            ]
        },
        {
            title: "LOANS & CREDIT CARD PERKS",
            rows: [
                row("Pre-Approved Loan & Card Offers", () => true, "Curated loan and credit card offers tailored to your live credit tier."),
                row("100% Processing Fee Waiver", (p) => !isBasic(p), "Zero processing fee on partner personal and business loans."),
                row("Guaranteed Credit Builder Card Access", () => true, "FD-backed credit cards designed to safely build score from scratch."),
                row("Lowest Interest Rate Matcher", (p) => !isBasic(p), "Compare 30+ partner banks to secure the lowest APR possible.")
            ]
        },
        {
            title: "DEBT SETTLEMENT & LEGAL SHIELD",
            rows: [
                row("Recovery Harassment Protection", (p) => !isBasic(p), "Guidelines, legal compliance notices, and shielding from recovery harassment."),
                row("One-Time Settlement (OTS) Negotiation", (p) => !isBasic(p), "Direct negotiation with banks for maximum waiver and single-shot settlement."),
                row("Bank Legal Notice Reply Drafting", (p) => !isBasic(p), "Formal legal responses drafted by experienced financial attorneys."),
                row("Bank NOC & Bureau Status Follow-up", (p) => !isBasic(p), "Tracking No Objection Certificates and ensuring bureau record updates.")
            ]
        },
        {
            title: "SUPPORT & CONSULTATION",
            rows: [
                row("Dedicated 1-on-1 Credit Guru", (p) => !isBasic(p), "Your personal credit advisor walking you through every bureau update."),
                row("Priority WhatsApp & Phone Access", (p) => !isBasic(p), "Skip the queue with fast response times."),
                row("RBI Banking Ombudsman Escalation", (p) => !isBasic(p), "Escalation to the RBI Banking Ombudsman for uncooperative lenders.")
            ]
        }
    ];
}
