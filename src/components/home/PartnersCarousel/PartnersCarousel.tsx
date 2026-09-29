"use client";

import React from "react";
import Image from "next/image";
import styles from "./PartnersCarousel.module.css";

const partnerImages = [
  { id: 1, url: "/assets/AUSFB.webp", alt: "AU Small Finance Bank" },
  { id: 2, url: "/assets/BAJAJ.webp", alt: "Bajaj Finance" },
  { id: 3, url: "/assets/CITIB.webp", alt: "Citi Bank" },
  { id: 4, url: "/assets/CLIX.webp", alt: "Clix Capital" },
  { id: 5, url: "/assets/hinduja.webp", alt: "Hinduja" },
  { id: 6, url: "/assets/IDFC.webp", alt: "IDFC First Bank" },
  { id: 7, url: "/assets/IIFL.webp", alt: "IIFL Finance" },
  { id: 8, url: "/assets/KOTAKB.webp", alt: "Kotak Bank" },
  { id: 9, url: "/assets/paytm.webp", alt: "Paytm" },
  { id: 10, url: "/assets/RBLB.webp", alt: "RBL Bank" },
  { id: 11, url: "/assets/SBI.webp", alt: "SBI" },
  { id: 12, url: "/assets/tata.webp", alt: "Tata Capital" },
  { id: 13, url: "/assets/YESB.webp", alt: "Yes Bank" },
  { id: 14, url: "/assets/ZEST.webp", alt: "ZestMoney" },
  { id: 15, url: "/assets/CASHE.webp", alt: "CASHe" },
];

const track = [...partnerImages, ...partnerImages];

export function PartnersCarousel() {
  return (
    <div className={styles.partnersSection}>
      {/* Heading */}
      <p className={styles.heading}>
        Trusted by India&apos;s leading financial institutions
      </p>

      {/* Scrolling logos */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, #070c18, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, #070c18, transparent)" }}
        />

        <div className={`${styles.slideTrack} flex items-center gap-10 md:gap-16`}>
          {track.map((image, i) => (
            <div
              key={i}
              className="relative h-8 w-24 md:w-28 flex-shrink-0 opacity-40 hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 96px, 112px"
                className="object-contain brightness-0 invert"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PartnersCarousel;
