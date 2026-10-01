"use client";

import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Header.module.css";

interface RollingTextProps {
  text: string;
  className?: string;
  stagger?: number;
}

export function RollingText({ text, className = "", stagger = 0.02 }: RollingTextProps) {
  const chars = Array.from(text);
  return (
    <span className={cn(styles.rollingWrapper, className)} aria-label={text}>
      {chars.map((char, index) => (
        <span
          key={index}
          className={styles.rollingTrack}
          style={{ transitionDelay: `${index * stagger}s` }}
          aria-hidden="true"
        >
          <span className={cn(styles.rollingChar, styles.charDefault)}>
            {char === " " ? "\u00A0" : char}
          </span>
          <span className={cn(styles.rollingChar, styles.charHover)}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default RollingText;
