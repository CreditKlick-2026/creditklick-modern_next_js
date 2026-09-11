"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const SliderPrevArrow: React.FC<{ onPrev: () => void }> = ({ onPrev }) => {
  return (
    <div className="ck-hero-nav-arrow sm:flex hidden" onClick={onPrev}>
      <ChevronLeft className="w-5 h-5 sm:text-lg text-sm text-slate-700" />
    </div>
  );
};

export const SliderNextArrow: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  return (
    <div className="ck-hero-nav-arrow sm:flex hidden" onClick={onNext}>
      <ChevronRight className="w-5 h-5 sm:text-lg text-sm text-slate-700" />
    </div>
  );
};
