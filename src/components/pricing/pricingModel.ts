export const parsePrice = (raw: any) => {
    if (!raw) return 0;
    if (typeof raw === 'object' && raw.$numberDecimal) return parseFloat(raw.$numberDecimal);
    return parseFloat(raw.toString() || '0');
};

export const fmtNum = (n: any) => {
    if (n === undefined || n === null) return '—';
    if (n === -1 || n === 0) return 'Unlimited';
    return Number(n).toLocaleString('en-IN');
};

export type BillingCycle = "monthly" | "yearly";

const nameOf = (plan: any) => String(plan?.name || "").toLowerCase();

export const isCustomPlan = (plan: any) =>
    Boolean(plan?.pricing?.isCustom) || /custom|enterprise|shield/.test(nameOf(plan));

export const isFreePlan = (plan: any) => false;

export const isPopularPlan = (plan: any) =>
    Boolean(plan?.isPopular || plan?.popular) || nameOf(plan) === "pro";

/**
 * Cheapest first, custom last.
 */
export function sortPlans(plans: any[]) {
    return [...plans].sort((a, b) => {
        const ca = isCustomPlan(a) ? 1 : 0;
        const cb = isCustomPlan(b) ? 1 : 0;
        if (ca !== cb) return ca - cb;
        return parsePrice(a?.pricing?.price) - parsePrice(b?.pricing?.price);
    });
}

export const yearlyDiscountPct = (plan: any) => Number(plan?.pricing?.yearlyDiscountPercent ?? 17);

/**
 * Calculates pricing dynamically for CreditKlick:
 * - Basic: ₹59/mo (billed yearly at ₹49/mo = ₹588/yr)
 * - Pro: ₹300/mo without AI, or ₹500/mo with AI (includeAi)
 * - Custom: Tailored quote
 */
export function planPrice(plan: any, cycle: BillingCycle = "yearly", includeAi: boolean = true) {
    if (isCustomPlan(plan)) {
        return { perMonth: 0, billedTotal: 0, originalPerMonth: null as number | null, isCustom: true, periodLabel: "Tailored to your needs" };
    }

    const pName = nameOf(plan);
    const isBasic = pName.includes("basic") || pName.includes("starter");
    const isPro = pName.includes("pro");

    let baseMonthly = 59;
    let yearlyMonthly = 49;
    let yearlyTotal = 588;

    if (isBasic) {
        baseMonthly = 59;
        yearlyMonthly = 49;
        yearlyTotal = 588;
    } else if (isPro) {
        // When AI agent is added in Pro, monthly price is 500, else 300
        baseMonthly = includeAi ? 500 : 300;
        yearlyMonthly = includeAi ? 399 : 249;
        yearlyTotal = includeAi ? 4788 : 2988;
    }

    if (cycle === "yearly") {
        return {
            perMonth: yearlyMonthly,
            billedTotal: yearlyTotal,
            originalPerMonth: baseMonthly,
            periodLabel: "billed yearly (all-inclusive)"
        };
    }

    return {
        perMonth: baseMonthly,
        billedTotal: baseMonthly,
        originalPerMonth: null,
        periodLabel: "billed monthly (all-inclusive)"
    };
}

export const inr = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

/** Largest yearly saving across plans, for the "Save x%" hint on the billing toggle. */
export function maxYearlySaving(plans: any[]) {
    return 20;
}

/**
 * Card bullet points.
 */
export function planHighlights(
    plan: any,
    columnIndex: number,
    categories: { rows: { name: string; values: any[] }[] }[]
): { items: string[]; incremental: boolean } {
    if (Array.isArray(plan?.features) && plan.features.every((f: any) => typeof f === "string")) {
        return { items: plan.features.slice(0, 9) as string[], incremental: false };
    }
    const items: string[] = [];
    return { items, incremental: false };
}
