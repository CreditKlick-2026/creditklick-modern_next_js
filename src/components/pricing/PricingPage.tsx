'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { buildCategories } from "./buildPlanCategories";
import { type BillingCycle, isCustomPlan, maxYearlySaving, sortPlans } from "./pricingModel";
import { PricingHero, PricingPlanCards, PricingCompare, PricingFaq, PricingCta } from "./PricingV2";
import { defaultPricingPlans } from "./pricingPlansData";
import shared from "./PricingV2/PricingShared.module.css";
import layout from "./PricingV2/PricingLayout.module.css";

const styles = { ...shared, ...layout };

export default function PricingPage() {
    const router = useRouter();
    const [cycle, setCycle] = useState<BillingCycle>("monthly");
    const [includeAi, setIncludeAi] = useState<boolean>(false);

    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root || typeof ResizeObserver === "undefined") return;
        const sync = () => {
            const headers = Array.from(document.querySelectorAll<HTMLElement>("header"));
            headers.forEach((h) => ro.observe(h));
            const h = Math.max(0, ...headers.map((el) => el.offsetHeight));
            if (h > 0) root.style.setProperty("--pv-nav-h", `${h}px`);
            else root.style.removeProperty("--pv-nav-h");
        };
        const ro = new ResizeObserver(() => sync());
        ro.observe(document.body);
        sync();
        return () => ro.disconnect();
    }, []);

    const plans = useMemo(() => {
        return sortPlans(defaultPricingPlans);
    }, []);

    const categories = useMemo(() => (plans.length ? buildCategories(plans, includeAi) : []), [plans, includeAi]);
    const savePct = useMemo(() => maxYearlySaving(plans) || 15, [plans]);

    const handleSelectPlan = (plan: any) => {
        if (isCustomPlan(plan)) {
            router.push('/contact');
            return;
        }
        const pid = plan?.id || plan?._id || plan?.planId || 'starter';
        router.push(`/contact?plan=${encodeURIComponent(pid)}`);
    };

    return (
        <div className={styles.root} ref={rootRef}>
            <PricingHero
                cycle={cycle}
                onCycleChange={setCycle}
                includeAi={includeAi}
                onIncludeAiChange={setIncludeAi}
                savePct={savePct}
            />

            <PricingPlanCards
                plans={plans}
                categories={categories}
                cycle={cycle}
                includeAi={includeAi}
                onIncludeAiChange={setIncludeAi}
                currentPlanName={null}
                onSelect={handleSelectPlan}
            />

            <PricingCompare
                plans={plans}
                categories={categories}
                cycle={cycle}
                onCycleChange={setCycle}
                includeAi={includeAi}
                savePct={savePct}
                currentPlanName={null}
                onSelect={handleSelectPlan}
            />

            <PricingFaq />
            <PricingCta />
        </div>
    );
}
