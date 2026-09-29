"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductMarquee.module.css";

const ccico = "/assets/heroimages/ccgifw.webp";
const ploico = "/assets/heroimages/persloan2.webp";
const bloico = "/assets/heroimages/busiloan2.webp";
const calico = "/assets/heroimages/calc2.webp";
const credscore = "/assets/heroimages/credscore2.webp";
const refineico = "/assets/heroimages/refine2.webp";

const productData = [
  {
    link: "/credit-score",
    img: credscore,
    title: "Credit Score",
    tag: "Free Report",
  },
  {
    link: "/credit-cards",
    img: ccico,
    title: "Credit Cards",
    tag: "Instant Approval",
  },
  {
    link: "/loan/personal-loan",
    img: ploico,
    title: "Personal Loans",
    tag: "From 10.49%",
  },
  {
    link: "/loan/business-loan",
    img: bloico,
    title: "Business Loan",
    tag: "Up to ₹50 Lakhs",
  },
  {
    link: "/refine",
    img: refineico,
    title: "Credit Refine",
    tag: "Boost Score",
  },
  {
    link: "/calculators",
    img: calico,
    title: "Calculators",
    tag: "EMI & Tools",
  },
];

// Duplicate 4 times for infinite seamless loop across all screen sizes
const items = [...productData, ...productData, ...productData, ...productData];

export function ProductMarquee() {
  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeInner}>
        {/* Soft edge gradient masks */}
        <div className={styles.maskLeft} />
        <div className={styles.maskRight} />

        {/* Scrolling track */}
        <div className={styles.track}>
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              prefetch={false}
              className={styles.pill}
            >
              <div className={styles.iconBadge}>
                <div style={{ position: "relative", width: 22, height: 22 }}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="22px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              <div className={styles.content}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.tag}>{item.tag}</span>
              </div>

              <svg
                className={styles.arrow}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductMarquee;
