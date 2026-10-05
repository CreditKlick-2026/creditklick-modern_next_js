"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, Maximize2, X, Newspaper, Award, Globe } from "lucide-react";
import styles from "./MediaCoverage.module.css";

export interface MediaArticle {
  id: string;
  source: string;
  logo: string;
  category: string;
  headline: string;
  excerpt: string;
  image: string;
  date: string;
  url: string;
  urlDisplay: string;
}

/** Featured Hero Spotlight: ANI News */
const FEATURED_ARTICLE: MediaArticle = {
  id: "ani-news",
  source: "ANI News",
  logo: "/images/Media/cards/ani.webp",
  category: "National Wire • Exclusive",
  headline: "IMS Introduces Credit Refine: A Revolutionary Product by CreditKlick",
  excerpt:
    "South Asia's leading multimedia news agency features CreditKlick's breakthrough credit-repair and automated bureau audit platform designed for millions of Indian borrowers.",
  image: "/images/Media/FirstImageMedia.png",
  date: "May 30, 2023",
  url: "https://aninews.in/news/business/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick20230530190234/",
  urlDisplay: "aninews.in/news/business/ims-introduces-credit-refine...",
};

/** All 6 Other High-Resolution Media Articles in public/images/Media/ */
const MEDIA_GRID_ARTICLES: MediaArticle[] = [
  {
    id: "lokmat-times",
    source: "Lokmat Times",
    logo: "/images/Media/cards/lokmat.webp",
    category: "Leading Daily Newspaper",
    headline: "IMS introduces Credit Refine: A revolutionary product by CreditKlick",
    excerpt:
      "Spotlighting CreditKlick's dedicated approach to improving creditworthiness and securing prime institutional loan terms across India.",
    image: "/images/Media/SecondImageMedia.png",
    date: "May 30, 2023",
    url: "https://www.lokmattimes.com/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/",
    urlDisplay: "lokmattimes.com/business/ims-introduces-credit-refine...",
  },
  {
    id: "ein-presswire",
    source: "EIN Presswire",
    logo: "/images/Media/cards/ein-presswire.webp",
    category: "Global Press Release",
    headline: "Incredible Management Service Launches CreditKlick to Revolutionize Credit",
    excerpt:
      "Global release announcing CreditKlick, a subsidiary of Incredible Management Service Pvt Ltd, transforming retail lending and credit scores.",
    image: "/images/Media/thirdImageMedia.png",
    date: "March 15, 2023",
    url: "https://fox40.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/",
    urlDisplay: "einpresswire.com/article/creditklick-launch...",
  },
  {
    id: "yourstory",
    source: "YourStory",
    logo: "/images/Media/cards/yourstory.webp",
    category: "Startup & Fintech Spotlight",
    headline: "Credit Klick - Transforming Credit Delivery in India with Technology",
    excerpt:
      "Featured profile on YourStory exploring how CreditKlick leverages modern digital architecture to change how credit is accessed in India.",
    image: "/images/Media/FourthImageMedia.png",
    date: "Featured Story",
    url: "https://yourstory.com/companies/credit-klick",
    urlDisplay: "yourstory.com/companies/credit-klick",
  },
  {
    id: "tracxn",
    source: "Tracxn",
    logo: "/images/Media/cards/tracxn.webp",
    category: "Institutional Intelligence",
    headline: "CreditKlick - Company Profile, Track Record & Market Intelligence",
    excerpt:
      "Enterprise verification and market intelligence overview of CreditKlick's lending marketplace and credit repair infrastructure.",
    image: "/images/Media/SeventhImageMedia.png",
    date: "Verified Profile",
    url: "https://tracxn.com/d/companies/creditklick",
    urlDisplay: "tracxn.com/d/companies/creditklick",
  },
  {
    id: "money-info",
    source: "MoneyInformation Online",
    logo: "/images/Media/cards/pinterest.webp",
    category: "Financial News Network",
    headline: "Creditklick Launches Revolutionary Financial Tool 'Credit Refine'",
    excerpt:
      "Coverage highlighting how Credit Refine empowers borrowers to fix credit errors, monitor bureau health, and qualify for lower interest rates.",
    image: "/images/Media/FifthImageMedia.png",
    date: "July 2, 2023",
    url: "https://www.pinterest.com/pin/creditklick-launches-revolutionary-financial-tool-credit-refine-to-empower-individuals-in-managing-credit-scores--898468194400494050/",
    urlDisplay: "moneyinformation.org/creditklick-credit-refine...",
  },
  {
    id: "shipsar",
    source: "Shipsar Developers",
    logo: "/images/Media/cards/shipsar.webp",
    category: "Architecture & Case Study",
    headline: "CreditKlick Financial Platform - High-Performance Web Application Showcase",
    excerpt:
      "In-depth architectural review of CreditKlick's instant score engine, secure 256-bit infrastructure, and personalized loan comparison system.",
    image: "/images/Media/SixthImageMedia.png",
    date: "Tech Showcase",
    url: "https://shipsar.com/projects/creditklick",
    urlDisplay: "shipsar.com/projects/creditklick",
  },
];

/** Syndicated & Broadcast Partners */
const SYNDICATED_OUTLETS = [
  { name: "ThePrint", url: "https://theprint.in/judiciary/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/1603875/" },
  { name: "Zee5", url: "https://www.zee5.com/articles/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick" },
  { name: "Fox 40", url: "https://fox40.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/" },
  { name: "KSNT News", url: "https://www.ksnt.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/" },
];

export function MediaCoverage() {
  const [activeModalArticle, setActiveModalArticle] = useState<MediaArticle | null>(null);

  return (
    <section className={styles.section} id="media-coverage">
      {/* Ambient background glow */}
      <div className={styles.glowAura} />

      <div className={styles.container}>
        {/* Header Eyebrow */}
        <div className={styles.badgeRow}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} />
            Press Room &amp; Verified Media
          </span>
        </div>

        {/* Section Heading */}
        <h1 className={styles.title}>
          CreditKlick <span className={styles.titleGradient}>In The News</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          National news agencies, leading financial dailies, and broadcast networks spotlighting CreditKlick&apos;s digital credit innovation and Credit Refine launch.
        </p>

        {/* Trust Badges */}
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <Newspaper className={styles.statIcon} />
            <span>National Wire Features</span>
          </div>
          <div className={styles.statItem}>
            <Award className={styles.statIcon} />
            <span>Credit Refine Spotlight</span>
          </div>
          <div className={styles.statItem}>
            <Globe className={styles.statIcon} />
            <span>Global Media Syndication</span>
          </div>
        </div>

        {/* ── 1. FEATURED ARTICLE SPOTLIGHT (ANI News - FirstImageMedia.png) ── */}
        <div className={styles.featuredCard}>
          {/* Left: Browser Mockup Frame with Screenshot */}
          <div className={styles.browserFrame}>
            <div className={styles.browserTopBar}>
              <div className={styles.trafficDots}>
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>
              <div className={styles.browserAddress}>
                https://{FEATURED_ARTICLE.urlDisplay}
              </div>
            </div>

            <div
              className={styles.browserImgContainer}
              onClick={() => setActiveModalArticle(FEATURED_ARTICLE)}
              title="Click to expand screenshot"
            >
              <Image
                src={FEATURED_ARTICLE.image}
                alt={FEATURED_ARTICLE.headline}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 680px"
                className={styles.browserImg}
              />
              <div className={styles.zoomOverlay}>
                <Maximize2 style={{ width: "18px", height: "18px" }} />
                <span>Click to view full screenshot</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Information */}
          <div className={styles.featuredDetails}>
            <div>
              <div className={styles.featuredHeader}>
                <div className={styles.outletChip}>
                  <Image
                    src={FEATURED_ARTICLE.logo}
                    alt={FEATURED_ARTICLE.source}
                    width={32}
                    height={32}
                    className={styles.outletLogo}
                  />
                  <span className={styles.outletName}>{FEATURED_ARTICLE.source}</span>
                </div>
                <span className={styles.categoryTag}>{FEATURED_ARTICLE.category}</span>
              </div>

              <h2 className={styles.featuredHeadline}>
                {FEATURED_ARTICLE.headline}
              </h2>

              <p className={styles.featuredExcerpt}>
                {FEATURED_ARTICLE.excerpt}
              </p>
            </div>

            <div className={styles.featuredMeta}>
              <span className={styles.metaDate}>Published: {FEATURED_ARTICLE.date}</span>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <button
                  type="button"
                  onClick={() => setActiveModalArticle(FEATURED_ARTICLE)}
                  style={{
                    background: "#f1f5f9",
                    color: "#334155",
                    fontSize: "0.825rem",
                    fontWeight: 600,
                    padding: "0.6rem 1rem",
                    borderRadius: "9999px",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Maximize2 style={{ width: "15px", height: "15px" }} />
                  <span>Preview</span>
                </button>

                <a
                  href={FEATURED_ARTICLE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  <span>Read on ANI News</span>
                  <ExternalLink style={{ width: "16px", height: "16px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. GRID OF ALL OTHER 6 MEDIA IMAGES ── */}
        <div className={styles.sectionSubhead}>
          <h2 className={styles.sectionSubheadTitle}>Latest Publications &amp; Editorial Coverage</h2>
        </div>

        <div className={styles.grid}>
          {MEDIA_GRID_ARTICLES.map((article) => (
            <div key={article.id} className={styles.mediaCard}>
              {/* Card Browser Mockup Header */}
              <div className={styles.cardFrame}>
                <div className={styles.cardFrameHeader}>
                  <div className={styles.trafficDots}>
                    <span className={styles.dotRed} style={{ width: "7px", height: "7px" }} />
                    <span className={styles.dotYellow} style={{ width: "7px", height: "7px" }} />
                    <span className={styles.dotGreen} style={{ width: "7px", height: "7px" }} />
                  </div>
                  <span className={styles.cardFrameAddress}>{article.urlDisplay}</span>
                </div>

                <div
                  className={styles.cardImageWrap}
                  onClick={() => setActiveModalArticle(article)}
                  title="Click to view full screenshot"
                >
                  <Image
                    src={article.image}
                    alt={article.headline}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className={styles.cardImg}
                    loading="lazy"
                  />
                  <div className={styles.zoomOverlay}>
                    <Maximize2 style={{ width: "16px", height: "16px" }} />
                    <span>Expand</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <div>
                  <div className={styles.cardTopRow}>
                    <div className={styles.cardOutlet}>
                      <Image
                        src={article.logo}
                        alt={article.source}
                        width={24}
                        height={24}
                        className={styles.cardOutletLogo}
                      />
                      <span className={styles.cardOutletTitle}>{article.source}</span>
                    </div>
                    <span className={styles.categoryTag} style={{ fontSize: "0.625rem", padding: "0.2rem 0.5rem" }}>
                      {article.category}
                    </span>
                  </div>

                  <h3 className={styles.cardHeadline} title={article.headline} style={{ marginTop: "0.75rem" }}>
                    {article.headline}
                  </h3>

                  <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.5, marginTop: "0.4rem" }}>
                    {article.excerpt}
                  </p>
                </div>

                <div className={styles.cardFooter}>
                  <span className={styles.cardDate}>{article.date}</span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardLink}
                  >
                    <span>Read Article</span>
                    <ExternalLink style={{ width: "14px", height: "14px" }} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. SYNDICATED & BROADCAST OUTLETS ── */}
        <div className={styles.syndicationSection}>
          <span className={styles.syndicationLabel}>Also Syndicated Across Global Media Outlets</span>
          <div className={styles.syndicationPills}>
            {SYNDICATED_OUTLETS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.syndicationPill}
              >
                <span>{item.name}</span>
                <ExternalLink style={{ width: "13px", height: "13px" }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. LIGHTBOX MODAL FOR FULL SCREENSHOT VIEW ── */}
      {activeModalArticle && (
        <div
          className={styles.lightboxBackdrop}
          onClick={() => setActiveModalArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.lightboxDialog}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className={styles.lightboxHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Image
                  src={activeModalArticle.logo}
                  alt={activeModalArticle.source}
                  width={24}
                  height={24}
                  style={{ borderRadius: "4px", objectFit: "contain" }}
                />
                <span className={styles.lightboxTitle}>
                  {activeModalArticle.source} — Press Screenshot
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalArticle(null)}
                className={styles.lightboxClose}
                aria-label="Close Preview"
              >
                <X style={{ width: "20px", height: "20px" }} />
              </button>
            </div>

            {/* Lightbox Image Body */}
            <div className={styles.lightboxBody}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalArticle.image}
                alt={activeModalArticle.headline}
                className={styles.lightboxImg}
              />
            </div>

            {/* Lightbox Footer */}
            <div className={styles.lightboxFooter}>
              <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 500 }}>
                {activeModalArticle.headline}
              </span>

              <a
                href={activeModalArticle.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
              >
                <span>Visit Live Article</span>
                <ExternalLink style={{ width: "14px", height: "14px" }} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MediaCoverage;
