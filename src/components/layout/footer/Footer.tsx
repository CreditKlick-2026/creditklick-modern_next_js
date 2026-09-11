"use client";

import React from "react";
import { FooterWave } from "./FooterWave";
import { FooterBrand } from "./FooterBrand";
import { FooterNav } from "./FooterNav";
import { FooterBottom } from "./FooterBottom";

export function Footer() {
  return (
    <footer className="ck-footer-wrapper font-sans selection:bg-white selection:text-[#364153]">
      {/* 1. Wave Mask Divider */}
      <FooterWave />

      {/* 2. Footer Content */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-30">
        <div className="flex flex-col xl:flex-row justify-between gap-10 sm:gap-14 xl:gap-10 pt-2 sm:pt-4">
          {/* Left Column: Brand & Socials */}
          <FooterBrand />

          {/* Right Columns: 4-Column Navigation Links */}
          <FooterNav />
        </div>

        {/* Bottom Bar: Disclaimer & Legal Compliance */}
        <FooterBottom />
      </div>
    </footer>
  );
}

export default Footer;
