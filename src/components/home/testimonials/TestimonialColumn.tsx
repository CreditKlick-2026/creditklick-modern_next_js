"use client";

import React from "react";
import { motion } from "framer-motion";
import { TestimonialItem } from "./testimonials.data";
import { TestimonialCard } from "./TestimonialCard";

interface TestimonialColumnProps {
  items: TestimonialItem[];
  duration?: number;
  className?: string;
}

export const TestimonialColumn: React.FC<TestimonialColumnProps> = ({
  items,
  duration = 25,
  className = "",
}) => {
  return (
    <div className={`testimonial-column ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="testimonial-column-track"
      >
        {/* Render twice for seamless infinite loop without jump */}
        {[...items, ...items].map((item, idx) => (
          <TestimonialCard key={`${item.id}-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
