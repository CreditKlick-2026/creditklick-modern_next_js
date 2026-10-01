"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { getLottie } from "@/lib/lottie-global";

interface DebtBannerProps {
  className?: string;
  showControls?: boolean;
}

export default function DebtBanner({
  className = "",
  showControls = false,
}: DebtBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let anim: any = null;
    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    getLottie().then((lottie) => {
      if (cancelled || !lottie || !containerRef.current) return;

      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/animations/SDDesktopBanner.json",
      });

      const onLoaded = () => setIsLoaded(true);
      anim.addEventListener("DOMLoaded", onLoaded);
      anim.addEventListener("data_ready", onLoaded);
      setTimeout(onLoaded, 1200);
      animRef.current = anim;
    });

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, []);

  const togglePlay = () => {
    if (!animRef.current) return;
    if (isPlaying) {
      animRef.current.pause();
      setIsPlaying(false);
    } else {
      animRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="w-full aspect-square max-w-[380px] bg-slate-100/70 animate-pulse rounded-2xl flex items-center justify-center text-slate-400 text-xs">
          Loading animation...
        </div>
      )}

      {/* Lottie Animation Canvas */}
      <div
        ref={containerRef}
        className={`w-full max-w-[420px] aspect-square flex items-center justify-center transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0 absolute"
        }`}
      />

      {/* Optional Control Button */}
      {showControls && isLoaded && (
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-xs font-medium rounded-full backdrop-blur-sm transition-all"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" /> Pause
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Play
            </>
          )}
        </button>
      )}
    </div>
  );
}
