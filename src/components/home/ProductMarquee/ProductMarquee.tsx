"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import styles from "./ProductMarquee.module.css";
import { PRODUCT_DATA } from "./marquee.data";

// Duplicate 4 times for infinite seamless loop across all screen sizes
const items = [
  ...PRODUCT_DATA,
  ...PRODUCT_DATA,
  ...PRODUCT_DATA,
  ...PRODUCT_DATA,
];

export function ProductMarquee() {
  return (
    <div className={styles.marqueeSection} aria-label="Product Highlights">
      <div className={styles.marqueeInner}>
        {/* Soft edge fade masks */}
        <div className={styles.maskLeft} aria-hidden="true" />
        <div className={styles.maskRight} aria-hidden="true" />

        <div className={styles.track}>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={styles.pillCard}
            >
              <div className={styles.iconWrapper}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={24}
                  height={24}
                  className={styles.iconImg}
                />
              </div>

              <div className={styles.textContent}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.tag}>{item.tag}</span>
              </div>

              <span className={styles.arrow} aria-hidden="true">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductMarquee;
