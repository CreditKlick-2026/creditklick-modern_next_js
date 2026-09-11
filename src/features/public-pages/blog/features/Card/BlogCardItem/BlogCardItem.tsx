'use client';

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { format } from "date-fns";

export const BlogCardItem = memo(function BlogCardItem({ post = {} }: { post?: any }) {
    const title = post?.title || "Blog Post Title";
    const excerpt = post.excerpt || post.summary || "";
    const category = post.category || "WhatsApp Marketing";
    const author = post.authorName || post.author || "Wapine Team";
    const readTime = post.readTime || "4 min read";
    const date = post.publishedAt || post.createdAt;
    const slug = post.slug || post.id;
    const coverImage = post.coverImage || post.image || "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&auto=format&fit=crop&q=80";

    return (
        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
                <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs z-10">
                        {category}
                    </span>
                </div>

                <div className="p-5 space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date ? format(new Date(date), "MMM d, yyyy") : "Recently"}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {title}
                    </h3>

                    {excerpt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {excerpt}
                        </p>
                    )}
                </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 mt-3 text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" /> {author}
                </span>

                <Link
                    href={`/blog/${slug}`}
                    className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 hover:underline"
                >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>
        </article>
    );
});

export default BlogCardItem;
