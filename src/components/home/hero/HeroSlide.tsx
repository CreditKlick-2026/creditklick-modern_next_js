"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { SlideItem } from "./hero.data";

// Animations dynamically loaded
const DebtBanner = dynamic(() => import("@/components/DebtBanner"), { ssr: false });
const CardAnimation = dynamic(() => import("@/components/animations/CardAnimation"), { ssr: false });
const AppSlider = dynamic(() => import("@/components/animations/AppSlider"), { ssr: false });

function RenderAnimation({ type }: { type: string }) {
  switch (type) {
    case "score":
      return <DebtBanner />;
    case "app":
      return <AppSlider />;
    case "card":
      return <CardAnimation />;
    default:
      return <DebtBanner />;
  }
}

interface HeroSlideProps {
  slide: SlideItem;
  isActive: boolean;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isActive }) => {
  return (
    <div
      className={`transition-all duration-500 ${
        isActive ? "block opacity-100" : "hidden opacity-0"
      }`}
    >
      {isActive && (
        <div className="sm:flex sm:w-full sm:pl-0 md:pl-2">
          <div className="flex-col m-auto justify-center h-4/5 space-y-3 md:pl-8">
            <h1 className="sm:text-md md:text-xl lg:text-2xl text-lg md:text-left text-center font-semibold text-blue-600 mt-2">
              {slide.text1}
            </h1>
            <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-xl md:text-left text-center font-semibold text-blue-900 my-2">
              {slide.text2}
            </h1>
            <h1 className="md:text-xl text-sm font-normal md:text-left text-center text-blue-900 md:mt-4">
              {slide.text3}
            </h1>
            <Link
              href={slide.url}
              target={slide.url.startsWith("http") ? "_blank" : "_self"}
            >
              <button
                type="button"
                className="ck-hero-cta-btn md:mx-0 mx-auto text-sm lg:text-md tracking-wider shadow-xl px-3 py-2 lg:p-4 my-4"
              >
                {slide.btntext}
                <ArrowRight className="text-lg ml-2 w-5 h-5" />
              </button>
            </Link>
          </div>
          <div className="m-auto sm:p-2 w-4/5">
            <div className="w-56 sm:w-64 md:w-64 lg:w-72 xl:w-96 mx-auto">
              <RenderAnimation type={slide.animation} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
