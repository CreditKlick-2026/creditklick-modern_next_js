'use client';

import { Link } from "@/lib/navigation";
import { ArrowRight, Share2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface BlogDetailSidebarProps {
  relatedPosts: any[];
  post: any;
  baseBlogPath: string;
}

const shareUrl = (platform: string, url: string, title: string) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  switch (platform) {
    case 'whatsapp': return `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
    case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    case 'twitter': return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    case 'linkedin': return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
    default: return '#';
  }
};

export function BlogDetailSidebar({ relatedPosts, post, baseBlogPath }: BlogDetailSidebarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Post link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <aside className="space-y-8">
      {/* Share Widget */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5" /> Share this Guide
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2 px-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <a
            href={shareUrl('whatsapp', currentUrl, post?.title || '')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#25D366]/10 text-[#0f6841] hover:bg-[#25D366]/20"
          >
            WA
          </a>
          <a
            href={shareUrl('twitter', currentUrl, post?.title || '')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100"
          >
            X
          </a>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-[#fafbfc] rounded-2xl border border-gray-200 p-6 space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Related Articles
          </h3>
          <div className="space-y-3">
            {relatedPosts.map((rel: any, idx: number) => (
              <Link
                key={idx}
                href={`${baseBlogPath}/${rel.slug}`}
                className="block group p-2.5 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-200"
              >
                <p className="text-xs font-bold text-gray-900 group-hover:text-[#0f6841] line-clamp-2 transition-colors">
                  {rel.title}
                </p>
                <span className="text-[11px] text-gray-400 font-normal mt-1 flex items-center gap-1">
                  Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
