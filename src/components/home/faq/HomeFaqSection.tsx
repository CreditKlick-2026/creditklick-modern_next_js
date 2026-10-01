"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import "./faq.css";
import { FAQ_CATEGORIES } from "./faq.data";
import { FaqAccordionItem } from "./FaqAccordionItem";

export default function HomeFaqSection() {
  const [activeTab, setActiveTab] = useState(0);
  // First item of the active category open by default, matching 7pixs layout
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeCategory = FAQ_CATEGORIES[activeTab];

  const selectTab = (index: number) => {
    setActiveTab(index);
    setOpenIndex(0);
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Arrow / Home / End keys move between category tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    const lastIndex = FAQ_CATEGORIES.length - 1;
    const next = index === lastIndex ? 0 : index + 1;
    const prev = index === 0 ? lastIndex : index - 1;
    const targets: Record<string, number> = {
      ArrowRight: next,
      ArrowDown: next,
      ArrowLeft: prev,
      ArrowUp: prev,
      Home: 0,
      End: lastIndex,
    };

    const target = targets[e.key];
    if (target === undefined) return;

    e.preventDefault();
    selectTab(target);
    tabRefs.current[target]?.focus();
  };

  // Centre the active tab when the tab row scrolls horizontally (mobile & tablet)
  useEffect(() => {
    const list = tabListRef.current;
    const tab = tabRefs.current[activeTab];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;

    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeTab]);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        {/* Section Header */}
        <div className="faq-header">
          <span className="faq-eyebrow">
            <CircleHelp aria-hidden="true" />
            FAQs
          </span>

          <h2 className="faq-title">Frequently Asked Questions</h2>

          <p className="faq-subtitle">
            Answers to common questions about our platform
          </p>
        </div>

        <div className="faq-layout">
          {/* Category Tabs */}
          <div
            ref={tabListRef}
            role="tablist"
            aria-label="FAQ categories"
            className="faq-tabs"
          >
            {FAQ_CATEGORIES.map((category, index) => {
              const isActive = activeTab === index;

              return (
                <button
                  key={category.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`faq-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`faq-panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`faq-tab ${isActive ? "faq-tab-active" : ""}`}
                  onClick={() => selectTab(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Accordion Group for the active category */}
          <motion.div
            key={activeCategory.id}
            role="tabpanel"
            id={`faq-panel-${activeCategory.id}`}
            aria-labelledby={`faq-tab-${activeCategory.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="faq-panel"
          >
            <div className="faq-accordion-wrapper">
              {activeCategory.faqs.map((faq, index) => (
                <FaqAccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => toggleFaq(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
