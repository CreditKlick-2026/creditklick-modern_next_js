"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  User,
  Zap,
  Users,
  BadgePercent,
  Landmark,
  ShieldCheck,
  Calculator,
  BookOpen,
  Banknote,
  Home,
  Briefcase,
  Percent,
  CreditCard,
  PiggyBank,
  TrendingUp,
} from "lucide-react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { LoginModal } from "../LoginModal";
import { Button, GlobalButton } from "@/components/ui";
import styles from "./Header.module.css";

/* ===========================================
   NAVIGATION DATA
   =========================================== */

export const navItems: NavItem[] = [
  {
    label: "Price",
    href: "/#pricing",
  },
  {
    label: "Loans",
    href: "/loans",
    children: [
      { label: "Personal Loan", href: "/loan/personal-loan" },
      { label: "Home Loan", href: "/loan/home-loan" },
      { label: "Business Loan", href: "/loan/business-loan" },
    ],
  },
  { label: "Credit Refine", href: "/refine" },
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "EMI Calculator", href: "/emi" },
      { label: "AU Value Calculator", href: "/calculator/au" },
      { label: "IDFC Value Calculator", href: "/calculator/idfc" },
      { label: "SBI Simply Save", href: "/calculator/sbi-save" },
      { label: "SBI Simply Click", href: "/calculator/sbi-click" },
      { label: "Yes Bank Value", href: "/calculator/yes" },
    ],
  },
];

/* ===========================================
   TAILORED SVG ICON DESIGN HELPERS
   =========================================== */

function getNavSvgIcon(label: string, className = "w-4 h-4") {
  switch (label) {
    case "About Us":
      return <Users className={cn(className, "text-blue-500")} />;
    case "Price":
      return <BadgePercent className={cn(className, "text-amber-500")} />;
    case "Loans":
      return <Landmark className={cn(className, "text-emerald-500")} />;
    case "Credit Refine":
      return <ShieldCheck className={cn(className, "text-indigo-500")} />;
    case "Calculators":
      return <Calculator className={cn(className, "text-purple-500")} />;
    case "Blog":
      return <BookOpen className={cn(className, "text-rose-500")} />;
    default:
      return <Zap className={cn(className, "text-blue-500")} />;
  }
}

function getSubNavSvgIcon(label: string) {
  switch (label) {
    case "Personal Loan":
      return {
        icon: <Banknote className="w-4 h-4 text-blue-600" />,
        bg: "bg-blue-50/80 text-blue-600 border border-blue-100",
      };
    case "Home Loan":
      return {
        icon: <Home className="w-4 h-4 text-emerald-600" />,
        bg: "bg-emerald-50/80 text-emerald-600 border border-emerald-100",
      };
    case "Business Loan":
      return {
        icon: <Briefcase className="w-4 h-4 text-amber-600" />,
        bg: "bg-amber-50/80 text-amber-600 border border-amber-100",
      };
    case "EMI Calculator":
      return {
        icon: <Calculator className="w-4 h-4 text-purple-600" />,
        bg: "bg-purple-50/80 text-purple-600 border border-purple-100",
      };
    case "AU Value Calculator":
      return {
        icon: <Percent className="w-4 h-4 text-indigo-600" />,
        bg: "bg-indigo-50/80 text-indigo-600 border border-indigo-100",
      };
    case "IDFC Value Calculator":
      return {
        icon: <CreditCard className="w-4 h-4 text-cyan-600" />,
        bg: "bg-cyan-50/80 text-cyan-600 border border-cyan-100",
      };
    case "SBI Simply Save":
      return {
        icon: <PiggyBank className="w-4 h-4 text-emerald-600" />,
        bg: "bg-emerald-50/80 text-emerald-600 border border-emerald-100",
      };
    case "SBI Simply Click":
      return {
        icon: <Zap className="w-4 h-4 text-rose-600" />,
        bg: "bg-rose-50/80 text-rose-600 border border-rose-100",
      };
    case "Yes Bank Value":
      return {
        icon: <TrendingUp className="w-4 h-4 text-sky-600" />,
        bg: "bg-sky-50/80 text-sky-600 border border-sky-100",
      };
    default:
      return {
        icon: <Zap className="w-4 h-4 text-blue-600" />,
        bg: "bg-blue-50/80 text-blue-600 border border-blue-100",
      };
  }
}

/* ===========================================
   INTERNAL SUB-COMPONENTS
   =========================================== */

function RollingText({ text, className = "", stagger = 0.02 }: { text: string; className?: string; stagger?: number }) {
  const chars = Array.from(text);
  return (
    <span
      className={cn(styles.rollingWrapper, className)}
      aria-label={text}
    >
      {chars.map((char, index) => (
        <span
          key={index}
          className={styles.rollingTrack}
          style={{ transitionDelay: `${index * stagger}s` }}
          aria-hidden="true"
        >
          <span className={cn(styles.rollingChar, styles.charDefault)}>
            {char === " " ? "\u00A0" : char}
          </span>
          <span className={cn(styles.rollingChar, styles.charHover)}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

function UserMenu({ isLoggedIn, onLogout }: { isLoggedIn: boolean; onLogout: () => void }) {
  const [profileDropdown, setProfileDropdown] = useState(false);

  if (isLoggedIn) {
    return (
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
    );
  }

  return (
    <div className="flex items-center">
      <Link href="/credit-score" className={styles.btnCta}>
        <Zap className={cn("w-3.5 h-3.5 text-white flex-shrink-0", styles.iconZap)} />
        <span className="whitespace-nowrap font-semibold relative z-10">Check Score</span>
        <span className={styles.btnSparkShimmer} aria-hidden="true" />
        <span className={styles.btnSparkStar} aria-hidden="true" />
      </Link>
    </div>
  );
}

/* ===========================================
   MAIN HEADER COMPONENT
   =========================================== */

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("user"));
  }, [pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    Cookies.remove("cibil");
    setIsLoggedIn(false);
    router.push("/");
  };

  /* ----------------------------------------
     Ticker items — duplicated for seamless loop
     ---------------------------------------- */
  const tickerItems = [
    { dot: true, text: "Get Debt Free Today", highlight: "" },
    { dot: true, text: "Free Credit Score Check", highlight: "FREE" },
    { dot: true, text: "Instant Personal Loans", highlight: "" },
    { dot: true, text: "Trusted by", highlight: "2 Lakh+" },
    { dot: true, text: "Customers Across India", highlight: "" },
    { dot: true, text: "Call Us", highlight: "+91 9650 123 456" },
    { dot: true, text: "RBI Registered Partner", highlight: "" },
    { dot: true, text: "Zero Hidden Charges", highlight: "" },
    { dot: true, text: "Debt Settlement", highlight: "₹50K – ₹50L" },
  ];
  const allTicker = [...tickerItems, ...tickerItems]; // duplicate for infinite scroll

  return (
    <>
      {/* ── Announcement Ticker Bar ── */}
      <div className={styles.tickerBar} role="marquee" aria-label="Announcements">
        <div className={styles.tickerFadeLeft} />
        <div className={styles.tickerInner}>
          {allTicker.map((item, i) => (
            <span key={i} className={styles.tickerItem}>
              <span className={styles.tickerDot} aria-hidden="true" />
              {item.text}{item.highlight && <> <span className={styles.tickerHighlight}>{item.highlight}</span></>}
            </span>
          ))}
        </div>
        <div className={styles.tickerFadeRight} />
      </div>

      <header
        className={cn(
          "hidden lg:block",
          styles.headerOuter,
          isScrolled && styles.headerOuterScrolled
        )}
      >
        <div className={styles.headerContainer}>

          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/assets/creditklic_next_gen_transparent.png"
              alt="CreditKlick"
              width={76}
              height={42}
              className={styles.logoImg}
              priority
            />
          </Link>

          {/* Right-aligned Navigation Capsule Pill */}
          <nav className={styles.navPill}>
            {/* 1. About Us with SVG Design */}
            <Link
              href="/about"
              className={cn(styles.navLink, pathname === "/about" && styles.navLinkActive)}
            >
              <span className={styles.navIconWrap}>
                {getNavSvgIcon("About Us")}
              </span>
              <RollingText text="About Us" />
            </Link>

            {/* 2. Main Nav Items with SVG Design */}
            {navItems.map((item) => (
              <div
                key={item.label}
                className={styles.navItem}
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.includes("#")) {
                      const [targetPath, hash] = item.href.split("#");
                      if (!targetPath || targetPath === "/" || pathname === "/") {
                        const el = document.getElementById(hash);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: "smooth" });
                          window.history.pushState(null, "", `#${hash}`);
                        }
                      }
                    }
                  }}
                  className={cn(
                    styles.navLink,
                    (pathname === item.href || (item.children && item.children.some((c) => c.href === pathname))) &&
                    styles.navLinkActive
                  )}
                >
                  <span className={styles.navIconWrap}>
                    {getNavSvgIcon(item.label)}
                  </span>
                  <RollingText text={item.label} />
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200 text-gray-400 ml-0.5",
                        openDropdown === item.label && "rotate-180 text-blue-600"
                      )}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, x: "-50%", scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                      exit={{ opacity: 0, y: 8, x: "-50%", scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        styles.dropdownCard,
                        item.label === "Loans" && "w-64",
                        item.label === "Calculators" && styles.calculatorsDropdownCard
                      )}
                    >
                      <ul className={item.label === "Calculators" ? styles.calculatorsGrid : "space-y-1"}>
                        {item.children.map((child) => {
                          const sub = getSubNavSvgIcon(child.label);
                          return (
                            <li key={child.href}>
                              <Link href={child.href} prefetch={true} className={styles.dropdownItem}>
                                <div className={cn(styles.dropdownIconBox, sub.bg)}>
                                  {sub.icon}
                                </div>
                                <span className="font-semibold whitespace-nowrap text-[13px]">{child.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* 3. Blog Menu with SVG Design */}
            <Link
              href="/blog"
              prefetch={true}
              className={cn(styles.navLink, pathname.startsWith("/blog") && styles.navLinkActive)}
            >
              <span className={styles.navIconWrap}>
                {getNavSvgIcon("Blog")}
              </span>
              <RollingText text="Blog" />
            </Link>

            {/* Subtle divider */}
            <div className="h-4 w-[1px] bg-gray-200/80 mx-1" />

            {/* Auth Button */}
            <UserMenu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          </nav>
        </div>
      </header>

      {/* Mobile Header Bar & Drawer */}
      <div className="lg:hidden">
        <header className={styles.mobileHeaderBar}>
          <Link href="/">
            <Image
              src="/assets/creditklic_next_gen_transparent.png"
              alt="CreditKlick"
              width={80}
              height={32}
              className="max-w-[80px] h-auto mt-1"
              priority
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 cursor-pointer text-gray-700 hover:text-gray-900"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles.mobileMenuDrawer}
            >
              <div className={cn(styles.mobileMenuScroll, "space-y-2")}>
                {/* About Us Mobile */}
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className={styles.navIconWrap}>
                    {getNavSvgIcon("About Us")}
                  </span>
                  <span>About Us</span>
                </Link>

                {/* Nav Items Mobile */}
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold hover:bg-gray-50 text-gray-900"
                        >
                          <div className="flex items-center gap-3">
                            <span className={styles.navIconWrap}>
                              {getNavSvgIcon(item.label)}
                            </span>
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              mobileExpandedItem === item.label && "rotate-180 text-blue-600"
                            )}
                          />
                        </button>
                        {mobileExpandedItem === item.label && (
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
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <div className={cn(styles.dropdownIconBox, sub.bg, item.label === "Calculators" ? "w-8 h-8" : "w-7 h-7")}>
                                    {sub.icon}
                                  </div>
                                  <span className={item.label === "Calculators" ? "text-[10px] font-bold text-center leading-tight uppercase text-gray-700" : "text-sm font-medium"}>
                                    {item.label === "Calculators" ? child.label.replace(/Calculator|Value/g, "").trim() : child.label}
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
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className={styles.navIconWrap}>
                          {getNavSvgIcon(item.label)}
                        </span>
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
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={styles.navIconWrap}>
                      {getNavSvgIcon("Blog")}
                    </span>
                    <span>Blog</span>
                  </Link>
                </div>
              </div>

              {/* Bottom CTA in Mobile */}
              <div className={styles.mobileMenuBottom}>
                {isLoggedIn ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="default" className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white">
                        Go to Profile
                      </Button>
                    </Link>
                    <Button
                      variant="default"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="gap-2 font-bold relative overflow-hidden shadow-md shadow-blue-500/20"
                  >
                    <Zap className="w-4 h-4 text-white fill-white flex-shrink-0 relative z-10" />
                    <span className="relative z-10">Check Free Credit Score</span>
                    <span className={styles.btnSparkShimmer} aria-hidden="true" />
                    <span className={styles.btnSparkStar} aria-hidden="true" />
                  </GlobalButton>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Login Modal */}
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}

export default Header;
