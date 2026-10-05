"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { LoginModal } from "../LoginModal";
import { DesktopNav } from "./DesktopNav";
import { MobileDrawer } from "./MobileDrawer";
import styles from "./Header.module.css";

// Re-export for any external consumers
export { navItems, tickerItems, getNavSvgIcon, getSubNavSvgIcon } from "./header.data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    Cookies.remove("cibil");
    setIsLoggedIn(false);
    router.push("/");
  };

  const hasColoredHeader = pathname === "/" || pathname === "/pricing" || pathname === "/price" || pathname === "/refine";

  return (
    <>
      {/* ── Desktop Header ── */}
      <header
        className={cn(
          "hidden lg:block",
          styles.headerOuter,
          hasColoredHeader && !isScrolled && styles.headerHome,
          isScrolled && styles.headerOuterScrolled
        )}
      >
        <div className={styles.headerContainer}>
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/images/Logo.avif"
              alt="CreditKlick"
              width={160}
              height={42}
              className={styles.logoImg}
              priority
            />
          </Link>

          {/* Solid White Floating Capsule Navigation */}
          <DesktopNav isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        </div>
      </header>

      {/* ── Mobile Header Bar & Drawer ── */}
      <MobileDrawer
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* ── Login Modal ── */}
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
}

export default Header;
