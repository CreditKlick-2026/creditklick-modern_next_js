'use client';

import React from "react";
import { QueryProvider } from "@/components/providers/QueryProvider";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="w-full bg-[#f4f3ec]/30 min-h-screen">
        <div className="relative z-10 max-w-[1440px] mx-auto bg-white border-x border-[#e5e7eb] shadow-[0_0_60px_rgba(0,0,0,0.03)] min-h-screen">
          <main className="relative bg-white">
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}

export default LandingLayout;
