'use client';

import { Calendar, User, Clock, Tag } from "lucide-react";

interface BlogDetailHeaderProps {
  post: any;
}

export function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {post?.category && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#0f6841] border border-emerald-200">
            {post.category}
          </span>
        )}
        {post?.readTime && (
          <span className="flex items-center gap-1 text-xs text-gray-500 font-normal">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-gray-500 font-normal">
          <Calendar className="w-3.5 h-3.5" /> {post?.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Recent'}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.15] mb-6">
        {post?.title}
      </h1>

      {post?.excerpt && (
        <p className="text-lg text-gray-600 font-normal leading-relaxed mb-6">
          {post.excerpt}
        </p>
      )}

      {post?.author && (
        <div className="flex items-center gap-3 py-4 border-y border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#0f6841]/10 flex items-center justify-center text-[#0f6841] font-bold text-sm">
            {post.author.name ? post.author.name[0] : <User className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{post.author.name || 'Wapine Editorial'}</p>
            <p className="text-xs text-gray-500 font-normal">{post.author.role || 'Product & Growth Architect'}</p>
          </div>
        </div>
      )}
    </header>
  );
}
