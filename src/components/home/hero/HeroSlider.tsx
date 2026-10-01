"use client";

import React, { useState, useEffect, useRef } from "react";
import "./hero-slider.css";
import { SlideItem, DEFAULT_SLIDES } from "./hero.data";
import { HeroSlide } from "./HeroSlide";
import { SliderPrevArrow, SliderNextArrow } from "./SliderControls";

interface HeroSliderProps {
  slides?: SlideItem[];
}

export function HeroSlider({ slides = DEFAULT_SLIDES }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const length = slides.length;
  const minSwipeDistance = 50;

  const nextSlide = () => setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));

  useEffect(() => {
    const el = sliderContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const startSlider = () => {
    if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    if (!isInView) return;
    sliderIntervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3500);
  };

  const stopSlider = () => {
    if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
  };

  useEffect(() => {
    if (isInView) {
      startSlider();
    } else {
      stopSlider();
    }
    return () => stopSlider();
  }, [isInView, length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    stopSlider();
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
    startSlider();
  };

  return (
    <div
      ref={sliderContainerRef}
      className="ck-hero-slider-container container mx-auto px-1 sm:my-20 my-1"
      onMouseEnter={stopSlider}
      onMouseLeave={startSlider}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <SliderPrevArrow onPrev={prevSlide} />

      <div className="carousel-wrapper px-1 mx-auto flex-1 relative h-full">
        {slides.map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            isActive={index === current}
          />
        ))}
      </div>

      <SliderNextArrow onNext={nextSlide} />
    </div>
  );
}

export default HeroSlider;
