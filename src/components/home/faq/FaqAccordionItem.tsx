"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaqAnswerBlock, FaqItem } from "./faq.data";

interface FaqAccordionItemProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FaqAnswer: React.FC<{ block: FaqAnswerBlock }> = ({ block }) => {
  if (typeof block === "string") {
    return <p className="faq-answer-text">{block}</p>;
  }

  const List = block.ordered ? "ol" : "ul";

  return (
    <div>
      {block.title && <p className="faq-answer-list-title">{block.title}</p>}
      <List className="faq-answer-list">
        {block.items.map((item, index) => (
          <li key={index}>
            {typeof item === "string" ? (
              item
            ) : (
              <>
                <strong>{item.term}:</strong> {item.text}
              </>
            )}
          </li>
        ))}
      </List>
    </div>
  );
};

export const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({
  faq,
  isOpen,
  onToggle,
}) => {
  const questionId = `faq-question-${faq.id}`;
  const answerId = `faq-answer-${faq.id}`;

  return (
    <div className={`faq-item-card ${isOpen ? "faq-item-active" : ""}`}>
      <button
        type="button"
        id={questionId}
        className="faq-toggle-btn"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
      >
        <span className="faq-question-text">{faq.question}</span>
        <span className="faq-expander" aria-hidden="true" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="faq-answer-content"
          >
            <div className="faq-answer-body">
              {faq.answer.map((block, index) => (
                <FaqAnswer key={index} block={block} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
