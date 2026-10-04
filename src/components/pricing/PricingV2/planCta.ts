import { isCustomPlan, isFreePlan, isPopularPlan } from "../pricingModel";

export interface PlanCta {
    label: string;
    solid: boolean;
    disabled: boolean;
}

/** Button state shared by the plan cards and the comparison header, so both always agree. */
export function planCta(plan: any, currentPlanName: string | null): PlanCta {
    const isCurrent = !!currentPlanName && String(plan?.name || "").toLowerCase() === currentPlanName;
    if (isCurrent) return { label: "Current plan", solid: false, disabled: true };
    if (isCustomPlan(plan)) return { label: "Talk to sales", solid: false, disabled: false };
    if (isFreePlan(plan)) return { label: "Start for free", solid: false, disabled: false };
    return { label: currentPlanName ? "Switch plan" : "Get started", solid: isPopularPlan(plan), disabled: false };
}

export const planKey = (plan: any) => String(plan?._id || plan?.id || plan?.name);
