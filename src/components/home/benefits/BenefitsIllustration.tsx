import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BenefitsIllustrationProps {
  imageSrc: string;
  imageAlt: string;
}

export function BenefitsIllustration({
  imageSrc,
  imageAlt,
}: BenefitsIllustrationProps) {
  return (
    <div className="relative flex items-center justify-center w-full max-w-[480px] aspect-square select-none">
      {/* Soft organic backdrop from original design */}
      <svg
        viewBox="0 0 400 320"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <path
          fill="#eff6ff"
          d="M44 196c-30-46-12-108 38-132 36-18 64 4 100-8 40-14 60-48 100-34 46 16 64 78 50 126-12 44-54 64-96 76-48 14-102 24-134 2-26-18-38-14-58-30z"
        />
        <circle cx="342" cy="64" r="24" fill="#dbeafe" />
        <circle cx="46" cy="232" r="16" fill="#dbeafe" />
        <circle cx="196" cy="52" r="10" fill="#dbeafe" />
      </svg>

      {/* Dynamic Animated Badge */}
      <div className="relative z-10 w-[86%] max-w-[380px] aspect-square flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={imageSrc}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={380}
              height={380}
              className="w-full h-auto object-contain filter drop-shadow-[0_18px_28px_rgba(28,57,142,0.18)]"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BenefitsIllustration;
