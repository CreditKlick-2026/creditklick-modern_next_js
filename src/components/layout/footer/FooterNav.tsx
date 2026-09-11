import React from "react";
import Link from "next/link";
import { FOOTER_SECTIONS } from "./footer.data";

export const FooterNav: React.FC = () => {
  return (
    <div className="xl:w-[68%] grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
      {FOOTER_SECTIONS.map((section, idx) => (
        <div key={idx} className="text-left">
          <h4 className="font-semibold text-lg mb-4 text-blue-400">
            {section.title}
          </h4>
          <ul className="space-y-2 sm:space-y-2.5">
            {section.links.map((link, i) => (
              <li key={i}>
                <Link
                  href={link.href}
                  className={`ck-footer-nav-link ${
                    link.isHighlight
                      ? "text-blue-300 font-medium"
                      : "text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
