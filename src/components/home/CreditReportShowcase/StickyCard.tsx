import React from "react";
import { Check } from "lucide-react";
import styles from "./CreditReportShowcase.module.css";
import { SlideData } from "./showcase.data";
import { PhoneDisplay } from "./PhoneDisplay";

interface StickyCardProps {
  slide: SlideData;
  index: number;
  total: number;
}

export function StickyCard({ slide, index, total }: StickyCardProps) {
  const cardIndexClass = styles[`cardIndex${index}`] || "";
  const HighlightIcon = slide.highlightIcon;
  const step = String(index + 1).padStart(2, "0");

  return (
    <div className={`${styles.cardWrapper} ${cardIndexClass}`}>
      <div className={styles.layout}>
        {/* Left Column: Text & Features */}
        <div className={styles.leftCol}>
          <div className={styles.meta}>
            <span className={styles.stepNum}>{step}</span>
            <span className={styles.category}>{slide.category}</span>
            <span className={styles.progress} aria-hidden="true">
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={i <= index ? styles.progressOn : undefined} />
              ))}
            </span>
          </div>

          <h3 className={styles.headline}>{slide.headline}</h3>

          <div className={styles.highlight}>
            <span className={styles.highlightIcon}>
              <HighlightIcon />
            </span>
            <span>{slide.highlight}</span>
          </div>

          <ul className={styles.checklist}>
            {slide.points.map((pt) => (
              <li key={pt} className={styles.checkItem}>
                <span className={styles.checkIcon}>
                  <Check strokeWidth={3} />
                </span>
                <p className={styles.checkText}>{pt}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Phone Image Display */}
        <div className={styles.rightCol}>
          <PhoneDisplay slide={slide} index={index} />
        </div>
      </div>
    </div>
  );
}
