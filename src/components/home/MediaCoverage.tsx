"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

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
    url: "https://theprint.in/ani-press-releases/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/1602841/",
    img: "/assets/heroimages/theprint.webp",
    date: "National Feature",
  },
  {
    outlet: "EIN Presswire",
    category: "Global Wire",
    headline: "CreditKlick Launches to Revolutionize the Digital Credit Industry",
    snippet: "Incredible Management Service Pvt Ltd introduces its next-generation subsidiary CreditKlick with bank-grade tech stack.",
    url: "https://www.einpresswire.com/article/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry",
    img: "/assets/heroimages/ein.webp",
    date: "International",
  },
  {
    outlet: "FOX 59",
    category: "Television Network",
    headline: "Next-Gen Fintech Innovations in Automated Credit Solutions",
    snippet: "Global syndicated feature exploring consumer empowerment through algorithmic credit guidance and curated card matching.",
    url: "https://fox59.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/",
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
    <section className="media-coverage-section bg-white" style={{ backgroundColor: "#ffffff" }}>
      <div className="container mx-auto max-w-7xl relative z-10 px-4">
        {/* Top Glowing Cyan Light Accent */}
        <img
          src="/images/zet/top_light.png"
          alt=""
          width={207}
          height={10}
          className="zet-rewards-top-light"
        />

        {/* Section Heading */}
        <h2 className="zet-rewards-title text-[#1c398e]" style={{ color: "#1c398e" }}>
          Press &amp; Acclaim
          <br />
          Our Media Coverage
        </h2>

        {/* Subtitle */}
        <p className="zet-rewards-subtitle">
          Leading national news agencies and international business networks
          <br className="hidden sm:inline" /> spotlighting CreditKlick&apos;s digital credit innovation.
        </p>

        {/* 6 Luxury Interactive Media Cards */}
        <div className="media-grid">
          {mediaArticles.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="media-card group"
              title={`Read article on ${item.outlet}`}
            >
              {/* Top Row: Outlet Logo & Category Tag */}
              <div className="media-logo-wrap">
                <div className="media-logo-box">
                  <Image
                    src={item.img}
                    alt={item.outlet}
                    width={140}
                    height={48}
                    className="media-logo-img object-contain max-h-11 w-auto"
                    loading="lazy"
                  />
                </div>
                <span className="media-tag-pill">{item.category}</span>
              </div>

              {/* Middle Row: Headline & Snippet */}
              <div className="media-body">
                <h3 className="media-headline">
                  {item.headline}
                </h3>
                <p className="media-quote">
                  {item.snippet}
                </p>
              </div>

              {/* Bottom Row: Read Full Article CTA */}
              <div className="media-footer">
                <span className="text-xs font-semibold text-slate-400">
                  {item.date}
                </span>
                <span className="media-link-text">
                  <span>Read Story</span>
                  <ExternalLink className="media-arrow-icon" />
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
