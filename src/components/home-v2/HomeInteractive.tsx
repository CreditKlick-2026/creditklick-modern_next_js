"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { cx, Section, SectionHeader } from "@/components/editorial";
import { SLIDES } from "./data/showcase.data";
import { FAQ_CATEGORIES, type FaqAnswerBlock } from "./data/faq.data";
import h from "./Home.module.css";

/* ── Report showcase: one tab per product view ─────────────────────────── */

export function HomeReportShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const slide = SLIDES[active];
  const Highlight = slide.highlightIcon;

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + SLIDES.length) % SLIDES.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="report">
      <SectionHeader
        eyebrow="Inside your report"
        title="Your credit report, finally in"
        accent="plain language."
        subtitle="Six views that turn a dense bureau report into decisions you can act on."
      />
      <div className={h.tabsWrap}>
        <div className={h.tabList} role="tablist" aria-label="Report views" aria-orientation="vertical" onKeyDown={onKeyDown}>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`report-tab-${s.id}`}
              aria-selected={i === active}
              aria-controls={`report-panel-${s.id}`}
              tabIndex={i === active ? 0 : -1}
              className={cx(h.tab, i === active && h.tabActive)}
              onClick={() => setActive(i)}
            >
              <span className={h.tabCat}>{s.category}</span>
              <span className={h.tabTitle}>{s.headline}</span>
            </button>
          ))}
        </div>

        <div
          className={h.panel}
          role="tabpanel"
          id={`report-panel-${slide.id}`}
          aria-labelledby={`report-tab-${slide.id}`}
        >
          <div className={h.panelText}>
            <h3 className={h.panelTitle}>{slide.headline}</h3>
            <p className={h.panelHighlight}>
              <Highlight aria-hidden="true" />
              {slide.highlight}
            </p>
            <ul className={h.points}>
              {slide.points.map((p) => (
                <li key={p} className={h.point}>{p}</li>
              ))}
            </ul>
          </div>
          <div className={h.panelImage}>
            <Image
              src={slide.imageSrc}
              alt={`${slide.category} screen in CreditKlick`}
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── FAQ: categories + native <details> accordion ───────────────────────── */

function Answer({ block }: { block: FaqAnswerBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  const List = block.ordered ? "ol" : "ul";
  return (
    <>
      {block.title && <p className={h.faqListTitle}>{block.title}</p>}
      <List>
        {block.items.map((item, i) => (
          <li key={i}>
            {typeof item === "string" ? item : (
              <>
                <strong>{item.term}:</strong> {item.text}
              </>
            )}
          </li>
        ))}
      </List>
    </>
  );
}

export function HomeFaq() {
  const [cat, setCat] = useState(0);
  const category = FAQ_CATEGORIES[cat];

  return (
    <Section tone="beige" id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions people ask"
        accent="before they check."
      />
      <div className={h.faqGrid}>
        <div className={h.faqCats} role="tablist" aria-label="FAQ topics">
          {FAQ_CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={i === cat}
              className={cx(h.faqCat, i === cat && h.faqCatActive)}
              onClick={() => setCat(i)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className={h.faqList} role="tabpanel" aria-label={category.label}>
          {category.faqs.map((f) => (
            <details key={f.id} className={h.faqItem}>
              <summary className={h.faqQ}>
                {f.question}
                <span className={h.faqIcon} aria-hidden="true" />
              </summary>
              <div className={h.faqA}>
                {f.answer.map((b, j) => (
                  <Answer key={j} block={b} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
