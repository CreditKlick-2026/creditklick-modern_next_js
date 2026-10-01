'use client';

import React from "react";
import { QueryProvider } from "@/components/providers/QueryProvider";

export function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="w-full bg-white min-h-screen">
        {children}
      </div>
    </QueryProvider>
  );
}

export default LandingLayout;
