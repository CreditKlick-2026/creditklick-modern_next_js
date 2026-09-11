import React from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";

interface BlogPostRelatedSectionProps {
  relatedPosts: any[];
  baseBlogPath: string;
}

export const BlogPostRelatedSection: React.FC<BlogPostRelatedSectionProps> = ({
  relatedPosts,
  baseBlogPath,
}) => {
  if (!relatedPosts || relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedPosts.slice(0, 3).map((relatedPost: any) => {
          const relSlug = relatedPost.slug || relatedPost.id || relatedPost._id;
          const relImage = relatedPost.featuredImageUrl || relatedPost.coverImage || relatedPost.image;
          return (
            <Link
              key={relatedPost._id || relSlug}
              href={`${baseBlogPath}/${relSlug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {relImage && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={relImage} 
                    alt={relatedPost.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4">
                <span className="text-[11px] font-bold text-[#0f6841] uppercase tracking-wide mb-1 block">
                  {relatedPost.category || "Articles"}
                </span>
                <h3 className="font-semibold text-slate-800 text-[15px] leading-snug line-clamp-2 group-hover:text-[#0f6841] transition-colors">
                  {relatedPost.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
