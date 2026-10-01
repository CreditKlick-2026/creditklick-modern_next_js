"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, getNavSvgIcon, getSubNavSvgIcon } from "./header.data";
import { RollingText } from "./RollingText";
import { UserMenu } from "./UserMenu";
import styles from "./Header.module.css";

interface DesktopNavProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function DesktopNav({ isLoggedIn, onLogout }: DesktopNavProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [targetPath, hash] = href.split("#");
      if (!targetPath || targetPath === "/" || pathname === "/") {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }
  };

  return (
    <nav className={styles.navPill} aria-label="Main Navigation">
      {/* 1. About Us */}
      <Link
        href="/about"
        className={cn(styles.navLink, pathname === "/about" && styles.navLinkActive)}
      >
        <span className={styles.navIconWrap}>{getNavSvgIcon("About Us")}</span>
        <RollingText text="About Us" />
      </Link>

      {/* 2. Main Nav Items with Dropdowns */}
      {navItems.map((item) => (
        <div
          key={item.label}
          className={styles.navItem}
          onMouseEnter={() => item.children && setOpenDropdown(item.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <Link
            href={item.href}
            onClick={(e) => handleHashLinkClick(e, item.href)}
            className={cn(
              styles.navLink,
              (pathname === item.href ||
                (item.children && item.children.some((c) => c.href === pathname))) &&
                styles.navLinkActive
            )}
          >
            <span className={styles.navIconWrap}>{getNavSvgIcon(item.label)}</span>
            <RollingText text={item.label} />
            {item.children && (
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200 text-gray-400 ml-0.5",
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
                          <div className={cn(styles.dropdownIconBox, sub.bg)}>{sub.icon}</div>
                          <span className="font-semibold whitespace-nowrap text-[13px]">
                            {child.label}
                          </span>
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

      {/* 3. Blog Link */}
      <Link
        href="/blog"
        prefetch={true}
        className={cn(styles.navLink, pathname.startsWith("/blog") && styles.navLinkActive)}
      >
        <span className={styles.navIconWrap}>{getNavSvgIcon("Blog")}</span>
        <RollingText text="Blog" />
      </Link>

      {/* 4. Media Link */}
      <Link
        href="/media"
        prefetch={true}
        className={cn(styles.navLink, pathname.startsWith("/media") && styles.navLinkActive)}
      >
        <span className={styles.navIconWrap}>{getNavSvgIcon("Media")}</span>
        <RollingText text="Media" />
      </Link>

      {/* Subtle Divider */}
      <div className="h-4 w-[1px] bg-gray-200/80 mx-1" />

      {/* Auth / Check Score Button */}
      <UserMenu isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </nav>
  );
}

export default DesktopNav;
