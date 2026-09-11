import React from "react";
import { LandingLayout } from "@/components/layout/LandingLayout";

interface BlogPostNotFoundProps {
  onReturn: () => void;
}

export const BlogPostNotFound: React.FC<BlogPostNotFoundProps> = ({ onReturn }) => {
  return (
    <LandingLayout>
      <div className="min-h-screen pt-32 pb-20 text-center flex flex-col items-center justify-center relative bg-slate-50 text-slate-900">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md relative z-10">
          The article you're looking for might have been moved or doesn't exist.
        </p>
        <button 
          onClick={onReturn}
          className="relative z-10 px-6 py-3 rounded-xl bg-[#0f6841] text-white font-medium hover:bg-[#0c5636] transition-colors shadow-sm"
        >
          Return to Insights
        </button>
      </div>
    </LandingLayout>
  );
};
