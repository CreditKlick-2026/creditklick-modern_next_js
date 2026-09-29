"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GlobalExperienceIcon,
  CitiesIndiaIcon,
  AccountsManagedIcon,
  SatisfactionRateIcon,
  ReviewRatingIcon,
} from "./icons";

const STATS = [
  { Icon: GlobalExperienceIcon, to: 40, suffix: "", label: "Years of global experience" },
  { Icon: CitiesIndiaIcon, to: 187, suffix: "", label: "Cities across India" },
  { Icon: AccountsManagedIcon, to: 50, suffix: "K+", label: "Accounts managed" },
  { Icon: SatisfactionRateIcon, to: 94, suffix: "%", label: "Satisfaction rate" },
  { Icon: ReviewRatingIcon, to: 4.7, suffix: "/5", label: "Customer review rating", decimals: 1 },
] as const;

const DURATION = 2000;

function useCountUp(target: number, start: boolean, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / DURATION);
      // Ease-out so the number decelerates into its final value.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  return value.toFixed(decimals);
}

function StatCard({
  Icon,
  to,
  suffix,
  label,
  decimals = 0,
  start,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  to: number;
  suffix: string;
  label: string;
  decimals?: number;
  start: boolean;
}) {
  const display = useCountUp(to, start, decimals);

  return (
    <div className="flex flex-col items-center gap-3 px-4 text-center">
      <Icon className="h-14 w-14 text-blue-600" aria-hidden="true" />
      <p className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
        {display}
        <span>{suffix}</span>
      </p>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-16">
      <div className="container mx-auto grid gap-10 px-6 sm:grid-cols-2 lg:grid-cols-5">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} start={visible} />
        ))}
      </div>
    </section>
  );
}
