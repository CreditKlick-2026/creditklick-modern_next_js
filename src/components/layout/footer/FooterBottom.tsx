"use client";

import React from "react";
import Link from "next/link";
import { LEGAL_LINKS } from "./footer.data";

export const FooterBottom: React.FC = () => {
  const handleOpenCookieConsent = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open_cookie_consent"));
    }
  };

  return (
    <div className="mt-8 sm:mt-12 pt-4 sm:pt-5 flex flex-col md:flex-row justify-between items-center gap-4 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-70" />

      <div className="text-xs text-slate-700 font-medium">
        CreditKlick is India&apos;s leading credit score comparison and financial services portal.
      </div>

      <div className="flex gap-4 sm:gap-6 flex-wrap text-xs text-slate-700">
        {LEGAL_LINKS.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="hover:text-blue-600 hover:underline underline-offset-[3px] decoration-blue-500 transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <button
          type="button"
          onClick={handleOpenCookieConsent}
          className="hover:text-blue-600 hover:underline underline-offset-[3px] decoration-blue-500 transition-colors"
        >
          Cookie Settings
        </button>
      </div>
    </div>
  );
};
