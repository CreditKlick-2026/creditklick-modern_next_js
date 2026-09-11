"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "./faq.data";

interface FaqAccordionItemProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`faq-item-card ${isOpen ? "faq-item-active" : ""}`}
      onClick={onToggle}
    >
      <button
        type="button"
        className="faq-toggle-btn"
        aria-expanded={isOpen}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <span className="faq-question-text">{faq.question}</span>
        <ChevronDown
          className={`faq-chevron-icon ${isOpen ? "faq-chevron-rotate" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="faq-answer-content"
          >
            <p className="faq-answer-text">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
