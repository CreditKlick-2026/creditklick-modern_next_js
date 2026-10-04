'use client';

import React, { useEffect, useRef } from "react";
import {
    BarChart3,
    Bot,
    Check,
    Code2,
    Headphones,
    Layers,
    Megaphone,
    MessagesSquare,
    Minus,
    Phone,
    Plug,
    Search,
    ShieldCheck,
    Sparkles,
    Users
} from "lucide-react";
import shared from "../PricingShared.module.css";
import local from "./CompareParts.module.css";
import { type BillingCycle, inr, isCustomPlan, planPrice } from "../../pricingModel";

const styles = { ...shared, ...local };

export type Row = { name: string; tooltip?: string; values: any[] };
export type Category = { title: string; addonLabel?: string; rows: Row[] };

const CATEGORY_ICONS: [RegExp, React.ComponentType<any>][] = [
    [/inbox|chat/i, MessagesSquare],
    [/broadcast|outreach/i, Megaphone],
    [/bot\s*studio/i, Bot],
    [/ai\s*agents/i, Sparkles],
    [/team\s*management/i, Users],
    [/analytics|reporting/i, BarChart3],
    [/communication/i, Phone],
    [/integration/i, Plug],
    [/api|developer/i, Code2],
    [/security|compliance/i, ShieldCheck],
    [/support/i, Headphones]
];

/** Category band label: icon + title (desktop band and mobile band). */
export function CategoryTitle({ title, asRowHeader = false }: { title: string; asRowHeader?: boolean }) {
    const Icon = CATEGORY_ICONS.find(([re]) => re.test(title))?.[1] || Layers;
    return (
        <span className={styles.bandTitle} role={asRowHeader ? "rowheader" : undefined}>
            <Icon className={styles.bandIcon} size={17} aria-hidden="true" />
            {title}
        </span>
    );
}

/** One comparison cell: ✓ / — / Add-on / text. */
export function CompareValue({ value }: { value: any }) {
    if (value === true || (typeof value === "string" && value.toLowerCase() === "included")) {
        return (
            <span className={styles.valCheck}>
                <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                <span className="sr-only">Included</span>
            </span>
        );
    }
    if (value === false || value === null || value === undefined || value === "" || value === "—") {
        return (
            <span className={styles.valDash}>
                <Minus size={16} aria-hidden="true" />
                <span className="sr-only">Not included</span>
            </span>
        );
    }
    if (String(value).toLowerCase() === "add-on") {
        return <span className={styles.valAddon}>Add-on</span>;
    }
    return <span className={styles.valText}>{String(value)}</span>;
}

export function HeaderPrice({ plan, cycle, includeAi }: { plan: any; cycle: BillingCycle; includeAi: boolean }) {
    if (isCustomPlan(plan)) return <div className={styles.mHeadPrice}>Custom</div>;
    const { perMonth } = planPrice(plan, cycle, includeAi);
    return (
        <div className={styles.mHeadPrice}>
            {inr(perMonth)}<small>/mo</small>
        </div>
    );
}

export function CompareSearch({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
    return (
        <label className={styles.search} htmlFor={id}>
            <Search className={styles.searchIcon} size={15} aria-hidden="true" />
            <span className="sr-only">Search features</span>
            <input
                id={id}
                type="search"
                className={styles.searchInput}
                placeholder="Search features..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>
    );
}

export function CompareNoMatch({ query }: { query: string }) {
    return <div className={styles.noMatch}>No features match “{query}”.</div>;
}

/** Keeps a CSS variable on `hostRef` in sync with `ref`'s height (sticky bands sit under the sticky header). */
export function useHeightVar(varName: string) {
    const ref = useRef<HTMLDivElement | null>(null);
    const hostRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = ref.current;
        const host = hostRef.current;
        if (!el || !host || typeof ResizeObserver === "undefined") return;
        const apply = () => host.style.setProperty(varName, `${el.offsetHeight}px`);
        apply();
        const ro = new ResizeObserver(apply);
        ro.observe(el);
        return () => ro.disconnect();
    }, [varName]);
    return { ref, hostRef };
}
