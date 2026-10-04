'use client';

import React, { useId, useMemo, useState } from "react";
import shared from "../PricingShared.module.css";
import local from "./PricingCompare.module.css";
import type { BillingCycle } from "../../pricingModel";
import type { Category } from "../CompareParts";
import { CompareMatrix } from "../CompareMatrix";
import { CompareMobile } from "../CompareMobile";

export type { Row, Category } from "../CompareParts";

const styles = { ...shared, ...local };

interface PricingCompareProps {
    plans: any[];
    categories: Category[];
    cycle: BillingCycle;
    onCycleChange: (cycle: BillingCycle) => void;
    includeAi: boolean;
    savePct: number;
    currentPlanName: string | null;
    onSelect: (plan: any) => void;
}

/** "Compare plans" section: header + desktop matrix + mobile view, sharing one feature search. */
export function PricingCompare(props: PricingCompareProps) {
    const { categories } = props;
    const [query, setQuery] = useState("");
    const titleId = useId();
    const searchId = useId();

    // A search term matching a category title keeps that whole category; otherwise filter its rows
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return categories;
        return categories
            .map((cat) => (cat.title.toLowerCase().includes(q)
                ? cat
                : { ...cat, rows: cat.rows.filter((r) => r.name.toLowerCase().includes(q)) }))
            .filter((cat) => cat.rows.length > 0);
    }, [categories, query]);

    const viewProps = { ...props, categories: filtered, query, onQueryChange: setQuery };

    return (
        <section
            id="compare-plans"
            data-compare-plans
            className={styles.compare}
            aria-labelledby={titleId}
            style={{ scrollMarginTop: "var(--pv-nav-h)" }}
        >
            <div className={styles.sectionHead}>
                <div className={styles.eyebrowWrapper}>
                    <span className={styles.eyebrow}>COMPARE</span>
                </div>
                <h2 id={titleId} className={`${styles.serif} ${styles.sectionTitle}`}>
                    See exactly what you get with each plan
                </h2>
                <p className={styles.sectionSub}>Every feature, every plan — side by side. No surprises.</p>
            </div>

            <CompareMatrix {...viewProps} searchId={`${searchId}-desktop`} />
            <CompareMobile {...viewProps} searchId={`${searchId}-mobile`} />
        </section>
    );
}

export default PricingCompare;
