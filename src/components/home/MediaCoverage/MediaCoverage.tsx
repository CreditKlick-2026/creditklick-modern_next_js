"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import styles from "./MediaCoverage.module.css";

interface MediaItem {
  outlet: string;
  category: string;
  headline: string;
  snippet: string;
  url: string;
  img: string;
  date: string;
}

const mediaArticles: MediaItem[] = [
  {
    outlet: "ANI News",
    category: "National Wire",
    headline: "IMS Introduces Credit Refine: A Revolutionary Product by CreditKlick",
    snippet: "CreditKlick pioneers an algorithmic credit-repair and dispute-management platform designed for millions of Indian borrowers.",
    url: "https://aninews.in/news/business/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick20230530190234/",
    img: "/assets/heroimages/ani.webp",
    date: "Press Release",
  },
  {
    outlet: "Lokmat Times",
    category: "Leading Daily",
    headline: "Transforming Financial Health with Automated Bureau Audits",
    snippet: "Spotlighting CreditKlick's dedicated approach to improving creditworthiness and securing prime institutional loan terms.",
    url: "https://www.lokmattimes.com/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/",
    img: "/assets/heroimages/lokmat.webp",
    date: "Business News",
  },
  {
    outlet: "ThePrint",
    category: "Digital Media",
    headline: "Empowering Borrowers Across India to Take Control of Credit",
    snippet: "How CreditKlick is disrupting credit reporting errors, unauthorized inquiries, and outdated bureau data in real-time.",
    url: "https://theprint.in/judiciary/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/1603875/",
    img: "/assets/heroimages/theprint.webp",
    date: "Exclusive Report",
  },
  {
    outlet: "Zee5",
    category: "Broadcast Network",
    headline: "Democratizing Access to Transparent Digital Lending Solutions",
    snippet: "CreditKlick's paperless workflow bridges the gap between major Indian banks, NBFCs, and retail borrowers with AI-backed underwriting.",
    url: "https://www.zee5.com/articles/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick",
    img: "/assets/heroimages/zee5.webp",
    date: "Industry Feature",
  },
  {
    outlet: "Fox 40",
    category: "Global Syndicate",
    headline: "Revolutionizing Credit Health Ecosystem for Modern India",
    snippet: "Coverage on CreditKlick's mission to deliver free credit scores, zero-spam loan comparison, and institutional credit repair.",
    url: "https://fox40.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/",
    img: "/assets/heroimages/fox.webp",
    date: "Broadcast Feature",
  },
  {
    outlet: "KSNT News",
    category: "Broadcast Affiliate",
    headline: "Disrupting Digital Lending & Financial Transparency in India",
    snippet: "Industry spotlight on CreditKlick's secure 256-bit infrastructure for seamless personal loans, credit cards, and credit health.",
    url: "https://www.ksnt.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/",
    img: "/assets/heroimages/ksnt.webp",
    date: "Media Spotlight",
  },
];

export function MediaCoverage() {
  return (
    <section className={styles.section} id="media-coverage">
      {/* Ambient background glow */}
      <div className={styles.glowAura} />

      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Header Badge */}
        <div className="flex justify-center mb-4">
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Press &amp; Acclaim
          </span>
        </div>

        {/* Section Heading */}
        <h2 className={styles.title}>
          Our Media Coverage
        </h2>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Leading national news agencies and international business networks
          <br className="hidden sm:inline" /> spotlighting CreditKlick&apos;s digital credit innovation.
        </p>

        {/* 6 Luxury Interactive Media Cards */}
        <div className={styles.grid}>
          {mediaArticles.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              title={`Read article on ${item.outlet}`}
            >
              {/* Header: Outlet Logo & Category Tag */}
              <div className={styles.logoWrap}>
                <div className={styles.logoBox}>
                  <Image
                    src={item.img}
                    alt={`${item.outlet} Coverage`}
                    fill
                    sizes="136px"
                    className={styles.logoImg}
                    loading="lazy"
                  />
                </div>
                <span className={styles.tagPill}>
                  {item.category}
                </span>
              </div>

              {/* Body: Headline & Brief Snippet */}
              <div className={styles.body}>
                <h3 className={styles.headline}>
                  {item.headline}
                </h3>
                <p className={styles.quote}>
                  &ldquo;{item.snippet}&rdquo;
                </p>
              </div>

              {/* Footer: Date Tag & Outbound Indicator */}
              <div className={styles.footer}>
                <span className="text-slate-400 font-medium text-xs">
                  {item.date}
                </span>
                <span className={styles.linkText}>
                  Read Coverage
                  <ExternalLink className={styles.arrowIcon} aria-hidden="true" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MediaCoverage;
