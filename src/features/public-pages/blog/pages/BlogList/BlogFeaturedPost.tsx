'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Calendar, Clock, Folder, ArrowRight } from 'lucide-react';
import styles from './BlogList.module.css';

const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Dec 11, 2024';
    try {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return 'Dec 11, 2024';
    }
};

interface BlogFeaturedPostProps {
    post: any;
    baseBlogPath: string;
}

export function BlogFeaturedPost({ post, baseBlogPath }: BlogFeaturedPostProps) {
    if (!post) return null;

    return (
        <section className={styles.featuredSection}>
            <Link href={`${baseBlogPath}/${post.slug || post._id}`} className={styles.featuredCard}>
                <div className={styles.featuredImageWrapper}>
                    <Image
                        src={post.featuredImageUrl || post.featuredImage?.url || post.coverImage || post.image || '/images/blog/credit-score-guide.svg'}
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className={styles.featuredImage}
                    />
                </div>
                <div className={styles.featuredContent}>
                    <h2 className={styles.featuredTitle}>{post.title}</h2>
                    <div className={styles.metaRowAuthor}>
                        <User className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span>{post.authorName || 'CreditKlick Editorial'}</span>
                    </div>
                    <div className={styles.metaRowDetails}>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {formatDate(post.createdAt)}
                        </span>
                        <span className={styles.metaBullet}>•</span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {post.readingTime || '10 min read'}
                        </span>
                        <span className={styles.metaBullet}>•</span>
                        <span className="flex items-center gap-1.5">
                            <Folder className="w-3.5 h-3.5 text-slate-400" />
                            {post.category || 'Credit Score'}
                        </span>
                    </div>
                    {post.excerpt && (
                        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {post.excerpt}
                        </p>
                    )}
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#155dfc] dark:text-[#60a5fa]">
                        <span>Read full guide</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </section>
    );
}
