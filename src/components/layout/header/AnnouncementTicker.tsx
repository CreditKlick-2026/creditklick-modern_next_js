"use client";

import React from "react";
import { tickerItems } from "./header.data";
import styles from "./Header.module.css";

export function AnnouncementTicker() {
  const allTicker = [...tickerItems, ...tickerItems];

  return (
    <div className={styles.tickerBar} role="marquee" aria-label="Announcements">
      <div className={styles.tickerFadeLeft} />
      <div className={styles.tickerInner}>
        {allTicker.map((item, i) => (
          <span key={i} className={styles.tickerItem}>
            <span className={styles.tickerDot} aria-hidden="true" />
            {item.text}
            {item.highlight && (
              <>
                {" "}
                <span className={styles.tickerHighlight}>{item.highlight}</span>
              </>
            )}
          </span>
        ))}
      </div>
      <div className={styles.tickerFadeRight} />
    </div>
  );
}

export default AnnouncementTicker;
