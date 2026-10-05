"use client";

import React, { useEffect } from "react";
import { MediaCoverage } from "@/components/home/MediaCoverage";

export default function MediaClient() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* ── Main Media Coverage Component ── */}
      <MediaCoverage />
    </main>
  );
}

