"use client";

import React, { useEffect, useRef, useState } from "react";
import { getLottie } from "@/lib/lottie-global";

const DESKTOP_RATIO = 500 / 1250;
const MOBILE_SIZE = 420;

export default function HeroBanner() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const [isDesktopLoaded, setIsDesktopLoaded] = useState(false);
  const [isMobileLoaded, setIsMobileLoaded] = useState(false);

  useEffect(() => {
    let desktopAnim: any = null;
    let mobileAnim: any = null;
    let cancelled = false;

    getLottie().then(async (lottie) => {
      if (cancelled || !lottie) return;
      const isDesktop = window.innerWidth >= 768;

      const initDesktop = async () => {
        if (!desktopContainerRef.current || desktopAnim) return;
        try {
          const res = await fetch(`/animations/SDDesktopBanner_v3.json?v=4&t=${Date.now()}`, { cache: "no-store" });
          const animData = await res.json();
          if (cancelled || !desktopContainerRef.current) return;
          desktopContainerRef.current.innerHTML = "";
          desktopAnim = lottie.loadAnimation({
            container: desktopContainerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animData,
          });
          const onLoaded = () => setIsDesktopLoaded(true);
          desktopAnim.addEventListener("DOMLoaded", onLoaded);
          desktopAnim.addEventListener("data_ready", onLoaded);
          setTimeout(onLoaded, 1200);
        } catch (e) {
          console.error("Failed to load desktop banner:", e);
        }
      };

      const initMobile = async () => {
        if (!mobileContainerRef.current || mobileAnim) return;
        try {
          const res = await fetch(`/animations/SDMobileBanner_v3.json?v=4&t=${Date.now()}`, { cache: "no-store" });
          const animData = await res.json();
          if (cancelled || !mobileContainerRef.current) return;
          mobileContainerRef.current.innerHTML = "";
          mobileAnim = lottie.loadAnimation({
            container: mobileContainerRef.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animData,
          });
          const onLoaded = () => setIsMobileLoaded(true);
          mobileAnim.addEventListener("DOMLoaded", onLoaded);
          mobileAnim.addEventListener("data_ready", onLoaded);
          setTimeout(onLoaded, 1200);
        } catch (e) {
          console.error("Failed to load mobile banner:", e);
        }
      };

      if (isDesktop) {
        initDesktop();
      } else {
        initMobile();
      }

      const handleResize = () => {
        const nowDesktop = window.innerWidth >= 768;
        if (nowDesktop) {
          initDesktop();
        } else {
          initMobile();
        }
      };

      window.addEventListener("resize", handleResize);
    });

    return () => {
      cancelled = true;
      desktopAnim?.destroy();
      mobileAnim?.destroy();
    };
  }, []);

  return (
    <section
      className="relative w-full bg-gradient-to-b from-[#f0f7ff] via-[#f0f7ff] to-white overflow-hidden py-3 sm:py-6"
      style={{ minHeight: `calc(min(100vw, 1300px) * ${DESKTOP_RATIO} + 48px)` }}
    >
      <div className="container mx-auto px-2 sm:px-4 max-w-[1300px]">
        <div
          className="hidden md:block relative w-full max-w-[1250px] mx-auto"
          style={{ paddingBottom: `${DESKTOP_RATIO * 100}%` }}
        >
          {!isDesktopLoaded && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 animate-pulse">
              <svg className="w-10 h-10 text-blue-300 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
          <div
            ref={desktopContainerRef}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: isDesktopLoaded ? 1 : 0 }}
          />
        </div>

        <div
          className="block md:hidden relative w-full mx-auto"
          style={{ maxWidth: MOBILE_SIZE, height: MOBILE_SIZE }}
        >
          {!isMobileLoaded && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 animate-pulse">
              <svg className="w-8 h-8 text-blue-300 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
          <div
            ref={mobileContainerRef}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: isMobileLoaded ? 1 : 0 }}
          />
        </div>
      </div>
    </section>
  );
}
