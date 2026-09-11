import React from "react";
import { Link } from "@/lib/navigation";

interface BlogPostSidebarProps {
  category?: string;
  relatedPosts: any[];
  baseBlogPath: string;
}

export const BlogPostSidebar: React.FC<BlogPostSidebarProps> = ({
  category,
  relatedPosts,
  baseBlogPath,
}) => {
  return (
    <div className="lg:col-span-4 mt-12 lg:mt-0">
      <div className="sticky top-32">
        <div className="bg-[#0f6841] rounded-xl overflow-hidden shadow-lg">
          <div className="p-5 text-white">
            <h3 className="font-bold text-[15px] mb-0.5 flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              {category || "Related"} Articles
            </h3>
            <p className="text-emerald-100 text-[11px] ml-9">{relatedPosts.length} related articles</p>
          </div>
          
          <div className="bg-white p-2 mx-1 mb-1 rounded-b-lg">
            {relatedPosts.length > 0 ? (
              <div className="flex flex-col">
                {relatedPosts.map((relatedPost: any, idx: number) => {
                  const relSlug = relatedPost.slug || relatedPost.id || relatedPost._id;
                  return (
                    <Link
                      key={relatedPost._id || idx}
                      href={`${baseBlogPath}/${relSlug}`}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[11px] font-bold group-hover:bg-[#0f6841] group-hover:text-white transition-colors mt-0.5">
                        {idx + 1}
                      </span>
                      <h4 className="text-[13px] font-medium text-slate-700 leading-snug line-clamp-2 group-hover:text-[#0f6841] transition-colors">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-[13px] text-slate-500">
                No related articles found.
              </div>
            )}
            
            <div className="border-t border-slate-100 mt-2">
              <Link
                href={category ? `${baseBlogPath}?category=${encodeURIComponent(category)}` : baseBlogPath}
                className="block text-center text-[11px] font-bold text-[#0f6841] hover:text-emerald-800 tracking-wide uppercase py-3 transition-colors"
              >
                VIEW ALL {category || "INSIGHTS"} ›
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
