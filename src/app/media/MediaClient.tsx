"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { MediaCoverage } from "@/components/home/MediaCoverage";
import styles from "@/components/home/MediaCoverage/MediaCoverage.module.css";

export default function MediaClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* ── Main Media Coverage Component ── */}
      <MediaCoverage />

      {/* ── Media Inquiries ── */}
      <section className={styles.press}>
        <div className={styles.pressCard}>
          <div className={styles.pressText}>
            <span className={styles.pressBadge}>
              <Mail />
              Press Relations
            </span>
            <h3 className={styles.pressTitle}>Media &amp; Journalist Inquiries</h3>
            <p className={styles.pressDesc}>
              For press releases, interview requests with our leadership team, or financial industry research data, get in touch with our communications team.
            </p>
            <a href="mailto:media@creditklick.com" className={styles.pressMail}>
              <Mail />
              media@creditklick.com
            </a>
          </div>

          <div className={styles.pressActions}>
            <Link href="/about" className={styles.pressBtn}>
              About CreditKlick
            </Link>
            <Link href="/contact" className={styles.pressBtnPrimary}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
