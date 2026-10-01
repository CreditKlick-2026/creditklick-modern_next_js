import React from "react";
import { Check } from "lucide-react";
import styles from "./CreditReportShowcase.module.css";
import { SlideData } from "./showcase.data";
import { PhoneDisplay } from "./PhoneDisplay";

interface StickyCardProps {
  slide: SlideData;
  index: number;
}

export function StickyCard({ slide, index }: StickyCardProps) {
  const cardIndexClass = styles[`cardIndex${index}`] || "";

  return (
    <div className={`${styles.cardWrapper} ${cardIndexClass}`}>
      <div className={styles.cardInner}>
        <div className={styles.layout}>
          {/* Left Column: Text & Features */}
          <div className={styles.leftCol}>
            <h3 className={styles.headline}>{slide.headline}</h3>

            <div className={`${styles.confusedBadge} ${slide.badgeClass}`}>
              <span className={styles.emoji}>{slide.badgeEmoji}</span>
              <span>{slide.badgeText}</span>
            </div>

            <ul className={styles.checklist}>
              {slide.points.map((pt, i) => (
                <li key={i} className={styles.checkItem}>
                  <Check className="w-5 h-5 text-slate-800 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                  <p className={styles.checkText}>{pt}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Phone Image Display */}
          <div className={`${styles.rightCol} ${slide.rightColClass}`}>
            <PhoneDisplay slide={slide} index={index} />
          </div>
        </div>
      </div>
    </div>
  );
}
