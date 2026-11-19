"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { EdButton } from "@/components/editorial";
import { FOOTER_SECTIONS, SOCIAL_LINKS, COMPANY_ADDRESS, LEGAL_LINKS } from "./footer.data";
import s from "./Footer.module.css";

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.creditklick.creditklick";

// Pages that already end on their own call to action
const NO_CTA = ["/credit-score", "/login", "/verify-otp"];

export function Footer() {
  const pathname = usePathname() || "/";
  const showCta = !NO_CTA.includes(pathname);

  const openCookieSettings = () => window.dispatchEvent(new Event("open_cookie_consent"));

  return (
    <footer className={s.footer}>
      {showCta && (
        <div className={s.cta}>
          <div className={s.container}>
            <div className={s.ctaInner}>
              <div>
                <span className={s.ctaEyebrow}>Free · CRIF-powered · 2 minutes</span>
                <h2 className={s.ctaTitle}>
                  Know your score today. <em>Fix what&apos;s holding it back.</em>
                </h2>
              </div>
              <div className={s.ctaActions}>
                <EdButton href="/credit-score" variant="light">Check free credit score</EdButton>
                <EdButton href={PLAY_STORE_URL} variant="onDark" external>Get the app</EdButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={s.container}>
        <div className={s.top}>
          <div className={s.brand}>
            <Link href="/" aria-label="CreditKlick home">
              <Image src="/images/CK.png" alt="CreditKlick" width={130} height={71} className={s.logo} />
            </Link>
            <p className={s.address}>{COMPANY_ADDRESS}</p>
            <div className={s.socials}>
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={s.social}
                >
                  <svg viewBox={item.viewBox || "0 0 24 24"} fill="currentColor" aria-hidden="true">
                    <path d={item.svgPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className={s.cols}>
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className={s.colTitle}>{section.title}</h3>
                <ul className={s.list}>
                  {section.links.map((link) => (
                    <li key={link.href + link.name}>
                      <Link href={link.href} className={`${s.link} ${link.isHighlight ? s.linkHighlight : ""}`}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={s.bottom}>
          <span>© 2022–{new Date().getFullYear()} Incredible Management Services Pvt. Ltd.</span>
          <nav className={s.legal} aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={s.legalLink}>
                {link.name}
              </Link>
            ))}
            <button type="button" onClick={openCookieSettings} className={s.legalLink}>
              Cookie settings
            </button>
          </nav>
        </div>
        <p className={s.disclaimer}>
          CreditKlick is a credit information and financial services portal. Credit reports are fetched from
          CRIF High Mark with your consent; checking your own score does not affect it.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
