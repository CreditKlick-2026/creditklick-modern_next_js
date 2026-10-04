import { isCustomPlan, isPopularPlan } from "../pricingModel";

export const BASIC_FEATURES = [
    "Monthly CIBIL & Experian score check",
    "Credit factors health breakdown",
    "Bureau score drop & inquiry alerts via WhatsApp",
    "Pre-approved loan & credit card matching",
    "Basic credit score simulator",
    "Self-help bureau dispute guide"
];

export const PRO_BASE_FEATURES = [
    "Dedicated 1-on-1 Credit Guru (Personal Coach)",
    "Assisted dispute filing for wrong remarks & DPD",
    "Overdue & closed accounts status rectification",
    "Multi-bureau dispute assistance (CIBIL, Experian, Equifax)",
    "100% partner loan processing fee waiver",
    "Priority WhatsApp & phone advisory assistance"
];

export const PRO_AI_EXTRA_FEATURES = [
    "AI 90-day credit score boost roadmap",
    "Automated AI bureau dispute drafting",
    "Smart Debt-to-Income (DTI) optimizer"
];

export const CUSTOM_FEATURES = [
    "One-Time Settlement (OTS) & haircut bank negotiation",
    "Recovery agent harassment shielding & legal advisory",
    "Bank legal notice reply drafting & defense",
    "Comprehensive multi-loan debt restructuring",
    "End-to-end multi-bureau CIBIL clearance & NOC procurement",
    "Senior Banking Ombudsman & Legal Advisor assigned"
];

export type PlanTier = "starter" | "pro" | "enterprise";

/** Tier + display copy for a plan card. */
export function describePlan(plan: any, includeAi: boolean) {
    const popular = isPopularPlan(plan);
    const dark = isCustomPlan(plan);
    const pName = (plan?.name || "").toLowerCase();
    const isBasic = pName.includes("basic") || pName.includes("starter");
    const isCustom = dark || pName.includes("custom") || pName.includes("enterprise") || pName.includes("shield");
    const isPro = popular || pName.includes("pro");
    const tier: PlanTier = isBasic ? "starter" : isPro ? "pro" : "enterprise";

    const displayName = isBasic
        ? "BASIC"
        : isPro
        ? (includeAi ? "PRO + AI" : "PRO")
        : "CUSTOM";

    const tagline = isBasic
        ? "Essential monthly credit monitoring, bureau refresh, and factor health analysis."
        : isPro
        ? (includeAi
            ? "Dedicated 1-on-1 Credit Guru + AI score boost roadmap and automated dispute drafting (₹500/mo)."
            : "Dedicated 1-on-1 Credit Guru to dispute bureau errors, fix DPD, and recover score (₹300/mo).")
        : "For complex default cases requiring bank settlement, legal shielding, and customized resolution.";

    const proFeatures = includeAi ? [...PRO_BASE_FEATURES, ...PRO_AI_EXTRA_FEATURES] : PRO_BASE_FEATURES;

    return {
        popular,
        dark,
        tier,
        isStarter: isBasic,
        isPro,
        isEnterprise: isCustom,
        displayName,
        tagline,
        features: isBasic ? BASIC_FEATURES : isPro ? proFeatures : CUSTOM_FEATURES,
        prevTier: isPro ? "Basic" : isCustom ? (includeAi ? "Pro + AI" : "Pro") : null,
    };
}
