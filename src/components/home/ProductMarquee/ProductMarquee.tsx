"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductMarquee.module.css";
import { PRODUCT_DATA } from "./marquee.data";

// Duplicate 4 times for infinite seamless loop across all screen sizes
const items = [...PRODUCT_DATA, ...PRODUCT_DATA, ...PRODUCT_DATA, ...PRODUCT_DATA];

export function ProductMarquee() {
  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeInner}>
        <div className={styles.track}>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={styles.productCard}
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 246, 255, 0.85))",
                borderColor: "rgba(180, 210, 255, 0.4)",
              }}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={34}
                  height={34}
                  className={styles.img}
                />
              </div>
              <div className={styles.textContainer}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.tag}>{item.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductMarquee;
