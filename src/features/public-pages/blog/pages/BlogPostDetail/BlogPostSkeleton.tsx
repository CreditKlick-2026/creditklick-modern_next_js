import React from "react";
import { LandingLayout } from "@/components/layout/LandingLayout";

export const BlogPostSkeleton: React.FC = () => {
  return (
    <LandingLayout>
      <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-slate-900 font-sans pb-20 pt-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          {/* Top Category Badge Skeleton */}
          <div className="h-6 w-28 bg-emerald-100/70 dark:bg-emerald-950/40 rounded-full mb-4" />

          {/* Title Skeleton */}
          <div className="h-10 sm:h-12 w-full max-w-5xl bg-slate-200 dark:bg-slate-800 rounded-xl mb-3" />
          <div className="h-10 sm:h-12 w-3/4 max-w-3xl bg-slate-200 dark:bg-slate-800 rounded-xl mb-8" />

          {/* Breadcrumb row skeleton */}
          <div className="w-full flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-8">
            <div className="h-4 w-52 bg-slate-200 dark:bg-slate-800 rounded-md" />
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
          </div>

          {/* 2-Column Full Screen Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Large image & article body */}
            <div className="lg:col-span-8 space-y-6">
              <div className="w-full aspect-[16/9] sm:h-[460px] bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-sm" />

              {/* Author & Meta Row Skeleton */}
              <div className="flex items-center gap-4 py-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                </div>
                <div className="ml-auto h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>

              {/* Article Content Paragraph Skeletons */}
              <div className="space-y-3 pt-2">
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
            </div>

            {/* Right Column: Sticky Sidebar Skeleton */}
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-4">
                <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-11 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-11 w-full bg-emerald-200/70 dark:bg-emerald-900/40 rounded-xl" />
              </div>

              <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-4">
                <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3.5 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                      <div className="h-3.5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/60 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};
