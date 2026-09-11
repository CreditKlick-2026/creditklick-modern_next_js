'use client';

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";

export const BlogFeaturedHero = memo(function BlogFeaturedHero({ post }: { post?: any }) {
    if (!post) return null;
    const title = post.title || "Featured Blog Guide";
    const excerpt = post.excerpt || post.summary || "";
    const category = post.category || "Featured";
    const readTime = post.readTime || "5 min read";
    const date = post.publishedAt || post.createdAt;
    const slug = post.slug || post.id;
    const coverImage = post.coverImage || "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&auto=format&fit=crop&q=80";

    return (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="p-5 sm:p-8 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Article
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight">
                    {title}
                </h2>

                {excerpt && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {excerpt}
                    </p>
                )}

                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {date ? format(new Date(date), "MMM d, yyyy") : "Recently"}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {readTime}</span>
                </div>

                <div className="pt-2">
                    <Link
                        href={`/blog/${slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            <div className="h-full min-h-[260px] overflow-hidden relative">
                <Image
                    src={coverImage}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                />
            </div>
        </div>
    );
});

export default BlogFeaturedHero;
