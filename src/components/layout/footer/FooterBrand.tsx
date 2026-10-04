import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS, COMPANY_ADDRESS } from "./footer.data";

export const FooterBrand: React.FC = () => {
  return (
    <div className="xl:w-[32%] flex flex-col gap-4">
      <Link href="/" className="inline-block mb-1">
        <Image
          src="/images/CK.png"
          alt="CreditKlick"
          width={130}
          height={71}
          className="w-28 sm:w-32 h-auto object-contain"
          priority
        />
      </Link>

      <p className="text-xs text-slate-700 uppercase tracking-widest font-semibold leading-relaxed max-w-xs">
        {COMPANY_ADDRESS}
      </p>

      {/* Professional Social Badges */}
      <div className="flex items-center gap-2.5 my-2">
        {SOCIAL_LINKS.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className={`ck-footer-social-badge ${item.badgeClass}`}
          >
            <svg
              className="w-4 h-4"
              viewBox={item.viewBox || "0 0 24 24"}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={item.svgPath} />
            </svg>
          </a>
        ))}
      </div>

      <p className="text-xs text-slate-500 font-normal">
        © 2022-{new Date().getFullYear()} Incredible Management Services PVT. LTD.
      </p>
    </div>
  );
};
