"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Wifi } from "lucide-react";

export const CardsTab: React.FC = () => {
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: x * 16, y: y * -16 });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const handleCardTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({
      x: Math.max(-12, Math.min(12, x * 14)),
      y: Math.max(-12, Math.min(12, y * -14)),
    });
  };

  const handleCardTouchEnd = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  return (
    <div className="eco-stage-grid">
      <div className="eco-stage-left space-y-5 sm:space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            100+ Handpicked Cards
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mt-2">
            Nexus Curated Credit Cards
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Move your cursor or swipe over the card on the right to experience the 3D titanium reflection. Pre-qualified cards with 5% unlimited cashback, airport lounge access, and ₹0 joining fee.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="eco-perk-stat-box">
            <p className="text-xs font-bold text-slate-500 uppercase">Cashback Rate</p>
            <p className="text-xl sm:text-2xl font-black text-amber-600 font-mono mt-1">Up to 5%</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct to bank account</p>
          </div>

          <div className="eco-perk-stat-box">
            <p className="text-xs font-bold text-slate-500 uppercase">Airport Lounges</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">Complimentary</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Domestic & International</p>
          </div>
        </div>

        <div>
          <Link
            href="/credit-cards"
            className="eco-cta-btn shadow-[0_4px_16px_rgba(245,158,11,0.35)]"
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            }}
          >
            <span>Compare All 100+ Cards</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
        </div>
      </div>

      {/* 3D Interactive Titanium Card on Right */}
      <div
        className="eco-stage-right eco-3d-stage"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        onTouchMove={handleCardTouchMove}
        onTouchEnd={handleCardTouchEnd}
      >
        <div
          ref={cardRef}
          className="eco-titanium-card"
          style={{
            transform: `perspective(1000px) rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg) scale3d(1.04, 1.04, 1.04)`,
          }}
        >
          {/* Pure CSS Specular Light Beam on Mouse Movement */}
          <div
            className="eco-specular-light"
            style={{
              background: `radial-gradient(circle at ${50 + cardTilt.x * 2}% ${50 - cardTilt.y * 2}%, rgba(255,255,255,0.42) 0%, transparent 60%)`,
            }}
          />

          {/* Card Header: Gold EMV Chip & NFC */}
          <div className="flex items-center justify-between relative z-10">
            <div className="eco-emv-chip">
              <div className="eco-emv-chip-grid" />
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 sm:w-5 h-4 sm:h-5 text-slate-300 rotate-90" />
              <span className="eco-card-badge">
                Titanium Elite
              </span>
            </div>
          </div>

          {/* Embossed Card Number */}
          <div className="eco-card-number relative z-10">
            4920 •••• •••• 8831
          </div>

          {/* Card Footer */}
          <div className="mt-4 sm:mt-5 flex items-end justify-between relative z-10">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Cardholder</p>
              <p className="eco-cardholder-name">
                CREDITKLICK BLACK
              </p>
            </div>
            <div className="text-right">
              <span className="eco-card-badge">
                5% CASHBACK
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
