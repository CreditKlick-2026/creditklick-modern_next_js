import React from "react";
import Image from "next/image";
import styles from "./CreditReportShowcase.module.css";
import { SlideData } from "./showcase.data";

export function PhoneDisplay({ slide, index = 0 }: { slide: SlideData; index?: number }) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={slide.imageSrc}
        alt={slide.headline}
        width={1024}
        height={1536}
        className={styles.fullPhoneImage}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 440px"
        priority={index === 0}
      />
    </div>
  );
}
