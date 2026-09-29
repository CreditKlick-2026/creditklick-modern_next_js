"use client";

import React, { useState, useEffect } from "react";
import styles from "./CookieConsent.module.css";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ck_cookie_consent");
    if (!consent) {
      // Small delay for better UX
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ck_cookie_consent", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("ck_cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Cookie Consent">
      <div className={styles.banner}>
        {/* Icon */}
        <div className={styles.iconWrap} aria-hidden="true">
          🍪
        </div>

        {/* Text content */}
        <div className={styles.content}>
          <p className={styles.title}>We value your privacy</p>
          <p className={styles.desc}>
            We use cookies to enhance your browsing experience, serve personalised ads or
            content, and analyse our traffic. By clicking &quot;Accept All&quot;, you consent
            to our use of cookies.{" "}
            <a href="/privacy-policy" className={styles.link}>
              Learn more
            </a>
          </p>
        </div>

        {/* Buttons */}
        <div className={styles.actions}>
          <button onClick={handleReject} className={styles.btnReject}>
            Reject All
          </button>
          <button onClick={handleAccept} className={styles.btnAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;
