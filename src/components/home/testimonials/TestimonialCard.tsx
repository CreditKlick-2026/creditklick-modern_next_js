"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { TestimonialItem } from "./testimonials.data";

interface TestimonialCardProps {
  item: TestimonialItem;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => {
  const [mousePos, setMousePos] = useState<{ x: string; y: string }>({
    x: "50%",
    y: "35%",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({
      x: "50%",
      y: "35%",
    });
  };

  return (
    <div
      className="testimonial-card-item group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          "--mouse-x": mousePos.x,
          "--mouse-y": mousePos.y,
        } as React.CSSProperties
      }
    >
      <div className="testimonial-spotlight-glow" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="testimonial-rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <p className="testimonial-quote-text">
            {item.content}
          </p>
        </div>

        <div className="testimonial-author-box">
          <div className="testimonial-author-name">{item.name}</div>
          <div className="testimonial-author-tag">
            {item.company} — {item.service}
          </div>
          <div className="testimonial-author-city">{item.location}</div>
        </div>
      </div>
    </div>
  );
};
