"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, GlobalButton } from "@/components/ui";
import { navItems, getNavSvgIcon, getSubNavSvgIcon } from "./header.data";
import { MobileHamburgerIcon } from "./MobileHamburgerIcon";
import styles from "./Header.module.css";

interface MobileDrawerProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function MobileDrawer({ isLoggedIn, onLogout }: MobileDrawerProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedItem(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isHome = pathname === "/";

  return (
    <div className="lg:hidden">
      {/* Mobile Top Bar */}
      <header
        className={cn(
          styles.mobileHeaderBar,
          isHome && !isScrolled && styles.mobileHeaderHome
        )}
      >
        <Link href="/" className="flex items-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Logo.avif"
            alt="CreditKlick"
            style={{ height: "38px", width: "auto", display: "block" }}
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-center rounded-lg"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <MobileHamburgerIcon className="w-8 h-8" />
          )}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.mobileMenuDrawer}
          >
            <div className={cn(styles.mobileMenuScroll, "space-y-2")}>
              {/* About Us */}
              <Link
                href="/about"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.navIconWrap}>{getNavSvgIcon("About Us")}</span>
                <span>About Us</span>
              </Link>

              {/* Nav Items */}
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setExpandedItem(expandedItem === item.label ? null : item.label)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                      >
                        <div className="flex items-center gap-3">
                          <span className={styles.navIconWrap}>{getNavSvgIcon(item.label)}</span>
                          <span>{item.label}</span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform",
                            expandedItem === item.label && "rotate-180 text-blue-600"
                          )}
                        />
                      </button>
                      {expandedItem === item.label && (
                        <div
                          className={cn(
                            "ml-4 border-l-2 border-blue-100 pl-4 py-2",
                            item.label === "Calculators" ? "grid grid-cols-2 gap-2 pr-2" : "space-y-1.5"
                          )}
                        >
                          {item.children.map((child) => {
                            const sub = getSubNavSvgIcon(child.label);
                            return (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={
                                  item.label === "Calculators"
                                    ? "flex flex-col items-center justify-center gap-1.5 p-2 bg-gray-50 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors"
                                    : "flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all"
                                }
                                onClick={() => setIsOpen(false)}
                              >
                                <div
                                  className={cn(
                                    styles.dropdownIconBox,
                                    sub.bg,
                                    item.label === "Calculators" ? "w-8 h-8" : "w-7 h-7"
                                  )}
                                >
                                  {sub.icon}
                                </div>
                                <span
                                  className={
                                    item.label === "Calculators"
                                      ? "text-[10px] font-bold text-center leading-tight uppercase text-gray-700"
                                      : "text-sm font-medium"
                                  }
                                >
                                  {item.label === "Calculators"
                                    ? child.label.replace(/Calculator|Value/g, "").trim()
                                    : child.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={styles.navIconWrap}>{getNavSvgIcon(item.label)}</span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Blog Link */}
              <div>
                <Link
                  href="/blog"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.navIconWrap}>{getNavSvgIcon("Blog")}</span>
                  <span>Blog</span>
                </Link>
              </div>

              {/* Mobile Media Link */}
              <div>
                <Link
                  href="/media"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.navIconWrap}>{getNavSvgIcon("Media")}</span>
                  <span>Media</span>
                </Link>
              </div>
            </div>

            {/* Mobile Bottom CTA */}
            <div className={styles.mobileMenuBottom}>
              {isLoggedIn ? (
                <>
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <Button variant="default" className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white">
                      Go to Profile
                    </Button>
                  </Link>
                  <Button
                    variant="default"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <GlobalButton
                  href="/credit-score"
                  color="blue"
                  variant="shine"
                  size="lg"
                  fullWidth
                  onClick={() => setIsOpen(false)}
                  className="gap-2 font-bold relative overflow-hidden shadow-md shadow-blue-500/20"
                >
                  <Zap className="w-4 h-4 text-white fill-white flex-shrink-0 relative z-10" />
                  <span className="relative z-10">Check Free Credit Score</span>
                  <span className={styles.btnSparkShimmer} aria-hidden="true" />
                  <span className={styles.btnSparkStar} aria-hidden="true" />
                </GlobalButton>
              )}

              {/* Google Play Store Badge */}
              <div className="mt-3 flex items-center justify-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.creditklick.creditklick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 active:scale-95 inline-flex items-center justify-center drop-shadow-md"
                  aria-label="Get it on Google Play"
                >
                  <Image
                    src="/images/play-store-icon.svg"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="h-10 w-auto object-contain rounded-xl"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileDrawer;
