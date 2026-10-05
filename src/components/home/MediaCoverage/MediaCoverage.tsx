"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import styles from "./MediaCoverage.module.css";

interface MediaItem {
  outlet: string;
  /** Short initials shown in the outlet tile (we don't ship third-party logos) */
  mark: string;
  category: string;
  headline: string;
  snippet: string;
  url: string;
  source: string;
}

// Headlines are the published article titles. ANI, Lokmat Times, ThePrint and Zee5
// carried the Credit Refine launch story; Fox 40 and KSNT syndicated the EIN Presswire release.
const CREDIT_REFINE_HEADLINE = "IMS Introduces Credit Refine: A Revolutionary Product by CreditKlick";
const LAUNCH_HEADLINE =
  "Incredible Management Service Pvt Ltd Launches New Subsidiary CreditKlick to Revolutionize the Credit Industry";

const mediaArticles: MediaItem[] = [
  {
    outlet: "ANI News",
    mark: "ANI",
    category: "News agency",
    headline: CREDIT_REFINE_HEADLINE,
    snippet: "Coverage of the launch of Credit Refine, CreditKlick's credit score improvement service.",
    url: "https://aninews.in/news/business/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick20230530190234/",
    source: "aninews.in",
  },
  {
    outlet: "Lokmat Times",
    mark: "LT",
    category: "Newspaper",
    headline: CREDIT_REFINE_HEADLINE,
    snippet: "Lokmat Times business desk on the launch of Credit Refine by CreditKlick.",
    url: "https://www.lokmattimes.com/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/",
    source: "lokmattimes.com",
  },
  {
    outlet: "ThePrint",
    mark: "TP",
    category: "Digital news",
    headline: CREDIT_REFINE_HEADLINE,
    snippet: "ThePrint on CreditKlick's new Credit Refine product for Indian borrowers.",
    url: "https://theprint.in/judiciary/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/1603875/",
    source: "theprint.in",
  },
  {
    outlet: "Zee5",
    mark: "Z5",
    category: "News",
    headline: CREDIT_REFINE_HEADLINE,
    snippet: "Zee5 news coverage of the Credit Refine launch by CreditKlick.",
    url: "https://www.zee5.com/articles/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick",
    source: "zee5.com",
  },
  {
    outlet: "Fox 40",
    mark: "F40",
    category: "Press release",
    headline: LAUNCH_HEADLINE,
    snippet: "Press release announcing CreditKlick, a new subsidiary of Incredible Management Service Pvt Ltd.",
    url: "https://fox40.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/",
    source: "via EIN Presswire",
  },
  {
    outlet: "KSNT News",
    mark: "KSNT",
    category: "Press release",
    headline: LAUNCH_HEADLINE,
    snippet: "Press release announcing CreditKlick, a new subsidiary of Incredible Management Service Pvt Ltd.",
    url: "https://www.ksnt.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/",
    source: "via EIN Presswire",
  },
];

export function MediaCoverage() {
  return (
    <section className={styles.section} id="media-coverage">
      {/* Ambient background glow */}
      <div className={styles.glowAura} />

      <div className={styles.container}>
        {/* Header Badge */}
        <div className={styles.badgeRow}>
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
          CreditKlick and the launch of Credit Refine, as covered by national news outlets and syndicated press.
        </p>

        {/* Media cards */}
        <div className={styles.grid}>
          {mediaArticles.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              title={`Read article on ${item.outlet}`}
            >
              {/* Header: Outlet Logo & Category Tag */}
              <div className={styles.logoWrap}>
                <div className={styles.outlet}>
                  <span className={styles.outletMark} aria-hidden="true">{item.mark}</span>
                  <span className={styles.outletName}>{item.outlet}</span>
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
                <p className={styles.quote}>{item.snippet}</p>
              </div>

              {/* Footer: Date Tag & Outbound Indicator */}
              <div className={styles.footer}>
                <span className={styles.source}>{item.source}</span>
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
