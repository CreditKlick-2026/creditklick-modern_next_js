"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  ChevronDown,
  Menu,
  X,
  User,
  Calculator,
  Percent,
  CreditCard,
  PiggyBank,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { ed, cx, EdButton } from "@/components/editorial";
import { LoginModal } from "../LoginModal";
import s from "./SiteHeader.module.css";

interface NavLink {
  label: string;
  href: string;
}

const NAV: NavLink[] = [
  { label: "Credit Score", href: "/credit-score" },
  { label: "Credit Refine", href: "/refine" },
  { label: "Personal Loan", href: "/loan/personal-loan" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const CALCULATORS = [
  { label: "EMI Calculator", href: "/emi", Icon: Calculator },
  { label: "AU Value Calculator", href: "/calculator/au", Icon: Percent },
  { label: "IDFC Value Calculator", href: "/calculator/idfc", Icon: CreditCard },
  { label: "SBI Simply Save", href: "/calculator/sbi-save", Icon: PiggyBank },
  { label: "SBI Simply Click", href: "/calculator/sbi-click", Icon: Zap },
  { label: "Yes Bank Value", href: "/calculator/yes", Icon: TrendingUp },
];

const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

export function Header() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetCalcOpen, setSheetCalcOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-read the session cookie and close every menu on navigation
  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("user"));
    setSheetOpen(false);
    setSheetCalcOpen(false);
    setCalcOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  useEffect(() => {
    if (!sheetOpen && !calcOpen && !profileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        setCalcOpen(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sheetOpen, calcOpen, profileOpen]);

  const handleLogout = () => {
    ["accessToken", "refreshToken", "user", "cibil"].forEach((c) => Cookies.remove(c));
    setIsLoggedIn(false);
    setProfileOpen(false);
    setSheetOpen(false);
    router.push("/");
  };

  const calcActive = CALCULATORS.some((c) => c.href === pathname) || pathname === "/calculators";

  return (
    <>
      <header className={cx(s.header, (scrolled || sheetOpen) && s.scrolled)}>
        <div className={s.inner}>
          <Link href="/" className={s.logoLink} aria-label="CreditKlick home">
            <Image src="/images/Logo.avif" alt="CreditKlick" width={160} height={42} className={s.logo} priority />
          </Link>

          {/* Desktop navigation */}
          <nav className={s.nav} aria-label="Main">
            {NAV.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(s.navLink, isActive(pathname, item.href) && s.navLinkActive)}
              >
                {item.label}
              </Link>
            ))}

            <div
              className={s.navItem}
              onMouseEnter={() => setCalcOpen(true)}
              onMouseLeave={() => setCalcOpen(false)}
            >
              <button
                type="button"
                className={cx(s.navLink, calcActive && s.navLinkActive)}
                aria-expanded={calcOpen}
                aria-haspopup="true"
                onClick={() => setCalcOpen((v) => !v)}
              >
                Calculators
                <ChevronDown className={cx(s.chevron, calcOpen && s.chevronOpen)} aria-hidden="true" />
              </button>
              {calcOpen && (
                <div className={s.dropdown}>
                  <div className={s.dropdownHead}>Plan before you apply</div>
                  <div className={s.dropdownGrid}>
                    {CALCULATORS.map(({ label, href, Icon }) => (
                      <Link key={href} href={href} className={s.dropdownItem}>
                        <Icon aria-hidden="true" />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className={s.dropdownFoot}>
                    <Link href="/calculators" className={ed.textLink}>
                      All calculators <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {NAV.slice(3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(s.navLink, isActive(pathname, item.href) && s.navLinkActive)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className={s.right}>
            {isLoggedIn ? (
              <div
                className={s.navItem}
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  type="button"
                  className={s.profileBtn}
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  onClick={() => setProfileOpen((v) => !v)}
                >
                  <User aria-hidden="true" /> My account
                  <ChevronDown className={cx(s.chevron, profileOpen && s.chevronOpen)} aria-hidden="true" />
                </button>
                {profileOpen && (
                  <div className={s.profileMenu}>
                    <Link href="/profile" className={s.menuItem}>Profile</Link>
                    <Link href="/report-analysis" className={s.menuItem}>Report analysis</Link>
                    <button type="button" onClick={handleLogout} className={cx(s.menuItem, s.menuItemDanger)}>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className={s.loginLink}>Log in</Link>
            )}
            <EdButton href="/credit-score" small>
              Check free score
            </EdButton>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={s.menuBtn}
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            aria-expanded={sheetOpen}
            onClick={() => setSheetOpen((v) => !v)}
          >
            {sheetOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile sheet */}
      {sheetOpen && (
        <div className={s.sheet} role="dialog" aria-modal="true" aria-label="Menu">
          <ul className={s.sheetList}>
            {NAV.slice(0, 3).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cx(s.sheetLink, isActive(pathname, item.href) && s.sheetLinkActive)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                className={cx(s.sheetLink, calcActive && s.sheetLinkActive)}
                aria-expanded={sheetCalcOpen}
                onClick={() => setSheetCalcOpen((v) => !v)}
              >
                Calculators
                <ChevronDown className={cx(s.chevron, sheetCalcOpen && s.chevronOpen)} aria-hidden="true" />
              </button>
              {sheetCalcOpen && (
                <div className={s.sheetSub}>
                  {CALCULATORS.map(({ label, href }) => (
                    <Link key={href} href={href} className={s.sheetSubLink}>
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {[...NAV.slice(3), { label: "Media", href: "/media" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cx(s.sheetLink, isActive(pathname, item.href) && s.sheetLinkActive)}>
                  {item.label}
                </Link>
              </li>
            ))}
            {isLoggedIn && (
              <>
                <li><Link href="/profile" className={s.sheetLink}>Profile</Link></li>
                <li><Link href="/report-analysis" className={s.sheetLink}>Report analysis</Link></li>
              </>
            )}
          </ul>

          <div className={s.sheetFoot}>
            <EdButton href="/credit-score">Check free credit score</EdButton>
            {isLoggedIn ? (
              <button type="button" onClick={handleLogout} className={cx(ed.btn, ed.btnOutline)}>
                Log out
              </button>
            ) : (
              <button type="button" onClick={() => { setSheetOpen(false); setShowLoginModal(true); }} className={cx(ed.btn, ed.btnOutline)}>
                Log in
              </button>
            )}
          </div>
        </div>
      )}

      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}

export default Header;
