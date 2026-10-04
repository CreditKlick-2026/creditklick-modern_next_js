import React from "react";
import { cx } from "./cx";
import styles from "./CircuitDecor.module.css";

/** Decorative circuit traces for dark bands; mirrored on the right via CSS. Parent must be position: relative. */
export function CircuitDecor({ side }: { side: "left" | "right" }) {
    const traces = [0, 10, 20, 30, 40];
    return (
        <svg
            aria-hidden="true"
            className={cx(styles.circuit, side === "left" ? styles.circuitLeft : styles.circuitRight)}
            viewBox="0 0 180 420"
            preserveAspectRatio="xMinYMin slice"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
        >
            {traces.map((d) => (
                <g key={`a${d}`}>
                    <path d={`M${20 + d} 0 V${60 + d} L${60 + d} ${100 + d} V150`} />
                    <circle cx={60 + d} cy={153} r={2.2} fill="currentColor" stroke="none" />
                </g>
            ))}
            {traces.slice(0, 4).map((d) => (
                <g key={`b${d}`}>
                    <path d={`M0 ${260 + d} H${70 - d} L${110 - d} ${230 + d} H180`} />
                    <circle cx={4} cy={260 + d} r={2.2} fill="currentColor" stroke="none" />
                </g>
            ))}
            {[0, 12, 24].map((d) => (
                <path key={`c${d}`} d={`M${30 + d} 420 V${360 - d} L${70 + d} ${320 - d} H180`} opacity="0.6" />
            ))}
        </svg>
    );
}
