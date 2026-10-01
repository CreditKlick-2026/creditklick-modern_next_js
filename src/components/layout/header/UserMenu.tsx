"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./Header.module.css";

interface UserMenuProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function UserMenu({ isLoggedIn, onLogout }: UserMenuProps) {
  const [profileDropdown, setProfileDropdown] = useState(false);

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2">
        <a
          href="https://play.google.com/store/apps/details?id=com.creditklick.creditklick"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.playStoreBadge}
          aria-label="Download on Google Play"
        >
          <Image
            src="/images/play-store-icon.svg"
            alt="Get it on Google Play"
            width={108}
            height={32}
            className={styles.playStoreBadgeImg}
            priority
          />
        </a>

        <div
          className="relative"
          onMouseEnter={() => setProfileDropdown(true)}
          onMouseLeave={() => setProfileDropdown(false)}
        >
          <Link href="/profile" className="flex items-center cursor-pointer">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
              <User className="h-4 w-4 text-blue-600" />
            </div>
          </Link>
          <AnimatePresence>
            {profileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <ul className="py-2 text-xs font-semibold">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      PROFILE
                    </Link>
                  </li>
                  <li>
                    <Link href="/report-analysis" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      REPORT ANALYSIS
                    </Link>
                  </li>
                  <li className="border-t border-gray-100 mt-1">
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 text-red-500 transition-colors"
                    >
                      LOG OUT
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Play Store Badge */}
      <a
        href="https://play.google.com/store/apps/details?id=com.creditklick.creditklick"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.playStoreBadge}
        aria-label="Download on Google Play"
      >
        <Image
          src="/images/play-store-icon.svg"
          alt="Get it on Google Play"
          width={108}
          height={32}
          className={styles.playStoreBadgeImg}
          priority
        />
      </a>

      {/* Check Score CTA Button */}
      <Link href="/credit-score" className={styles.btnCta}>
        <Zap className={cn("w-3.5 h-3.5 text-white flex-shrink-0", styles.iconZap)} />
        <span className="whitespace-nowrap font-semibold relative z-10">Check Score</span>
        <span className={styles.btnSparkShimmer} aria-hidden="true" />
        <span className={styles.btnSparkStar} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default UserMenu;
