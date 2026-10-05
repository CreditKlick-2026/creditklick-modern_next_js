"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, LogIn, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileHamburgerIcon } from "./MobileHamburgerIcon";
import styles from "./Header.module.css";

interface MobileDrawerProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onOpenLogin?: () => void;
}

const CALCULATOR_ITEMS = [
  { label: "EMI Calculator", href: "/emi" },
  { label: "AU Value Calculator", href: "/calculator/au" },
  { label: "IDFC Value Calculator", href: "/calculator/idfc" },
  { label: "SBI Simply Save", href: "/calculator/sbi-save" },
  { label: "SBI Simply Click", href: "/calculator/sbi-click" },
  { label: "Yes Bank Value", href: "/calculator/yes" },
];

export function MobileDrawer({ isLoggedIn, onLogout, onOpenLogin }: MobileDrawerProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [calculatorsOpen, setCalculatorsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setCalculatorsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
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

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (pathname === "/") {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 80);
      }
    }
  };

  const hasColoredHeader =
    pathname === "/" || pathname === "/pricing" || pathname === "/price" || pathname === "/refine";

  return (
    <div className="lg:hidden">
      {/* ── Normal Mobile Sticky/Fixed Top Bar (When Closed) ── */}
      <header
        className={cn(
          styles.mobileHeaderBar,
          hasColoredHeader && !isScrolled && styles.mobileHeaderHome
        )}
      >
        <Link href="/" className="flex items-center flex-shrink-0" onClick={() => setIsOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/Logo.avif"
            alt="CreditKlick"
            style={{ height: "36px", width: "auto", display: "block" }}
          />
        </Link>

        {/* Right side: Google Play badge + Hamburger icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.creditklick.creditklick"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.playStoreBadge}
            aria-label="Get it on Google Play"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/play-store-icon.svg"
              alt="Google Play"
              style={{ height: "30px", width: "auto", display: "block", borderRadius: "5px" }}
            />
          </a>

          <button
            onClick={() => setIsOpen(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              padding: "6px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              color: "#1e293b",
            }}
            aria-label="Open Menu"
          >
            <MobileHamburgerIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* ── FixMyScore-Style Fullscreen Mobile Menu Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={styles.mobileFullscreenOverlay}
          >
            {/* Overlay Top Bar: Logo on Left, Google Play + Close X on Right */}
            <div className={styles.mobileOverlayHeader}>
              <Link href="/" onClick={() => setIsOpen(false)} style={{ display: "flex", alignItems: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Logo.avif"
                  alt="CreditKlick"
                  style={{ height: "36px", width: "auto", display: "block" }}
                />
              </Link>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.creditklick.creditklick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.playStoreBadge}
                  aria-label="Get it on Google Play"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/play-store-icon.svg"
                    alt="Google Play"
                    style={{ height: "32px", width: "auto", display: "block", borderRadius: "6px" }}
                  />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    padding: "4px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "8px",
                    color: "#334155",
                  }}
                  aria-label="Close Menu"
                >
                  <X style={{ width: "24px", height: "24px" }} />
                </button>
              </div>
            </div>

            {/* Overlay Center Content: Centered Minimalist Navigation Links */}
            <div className={styles.mobileOverlayBody}>
              {/* 1. Home */}
              <Link
                href="/"
                className={cn(styles.fixMenuLink, pathname === "/" && styles.fixMenuLinkActive)}
                onClick={() => handleNavClick("/")}
              >
                Home
              </Link>


              {/* 4. Pricing */}
              <Link
                href="/pricing"
                className={cn(styles.fixMenuLink, pathname === "/pricing" && styles.fixMenuLinkActive)}
                onClick={() => handleNavClick("/pricing")}
              >
                Pricing
              </Link>

              {/* 5. Calculators (Accordion) */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <button
                  type="button"
                  onClick={() => setCalculatorsOpen(!calculatorsOpen)}
                  className={cn(
                    styles.fixMenuLink,
                    (calculatorsOpen || pathname.includes("/calculator") || pathname === "/emi") &&
                      styles.fixMenuLinkActive
                  )}
                >
                  <span>Calculators</span>
                  <ChevronDown
                    style={{
                      width: "16px",
                      height: "16px",
                      transition: "transform 0.2s ease",
                      transform: calculatorsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {calculatorsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "8px",
                      width: "100%",
                    }}
                  >
                    {CALCULATOR_ITEMS.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "#64748b",
                          textDecoration: "none",
                          padding: "6px 16px",
                          borderRadius: "9999px",
                          backgroundColor: "#f8fafc",
                          border: "1px solid #f1f5f9",
                          textAlign: "center",
                          maxWidth: "240px",
                          width: "80%",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* 6. Newsroom (Media) */}
              <Link
                href="/media"
                className={cn(styles.fixMenuLink, pathname === "/media" && styles.fixMenuLinkActive)}
                onClick={() => handleNavClick("/media")}
              >
                Newsroom
              </Link>

              {/* 7. About Us */}
              <Link
                href="/about"
                className={cn(styles.fixMenuLink, pathname === "/about" && styles.fixMenuLinkActive)}
                onClick={() => handleNavClick("/about")}
              >
                About Us
              </Link>

              {/* 8. Blogs */}
              <Link
                href="/blog"
                className={cn(styles.fixMenuLink, pathname.startsWith("/blog") && styles.fixMenuLinkActive)}
                onClick={() => handleNavClick("/blog")}
              >
                Blogs
              </Link>

              {/* 9. FAQs */}
              <Link
                href="/#faq"
                className={styles.fixMenuLink}
                onClick={() => handleNavClick("/#faq")}
              >
                FAQs
              </Link>

              {/* Bottom Login / User Profile CTA Button */}
              <div style={{ marginTop: "16px", marginBottom: "8px", textAlign: "center" }}>
                {isLoggedIn ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <Link
                      href="/profile"
                      className={styles.btnLoginMobile}
                      onClick={() => setIsOpen(false)}
                    >
                      <User style={{ width: "18px", height: "18px" }} />
                      <span>My Profile</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        onLogout();
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#ef4444",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "4px 12px",
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      if (onOpenLogin) {
                        onOpenLogin();
                      } else {
                        window.location.href = "/login";
                      }
                    }}
                    className={styles.btnLoginMobile}
                  >
                    <LogIn style={{ width: "18px", height: "18px" }} />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MobileDrawer;
