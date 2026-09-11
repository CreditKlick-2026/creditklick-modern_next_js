'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { usePathname, useSearchParams } from '@/lib/navigation';
import { useQuery } from '@tanstack/react-query';
import { LandingLayout } from '@/components/layout/LandingLayout';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogService } from '@/lib/services/blog-service/index';
import { sampleBlogPosts } from '@/lib/data/blogData';
import { BlogSearchModal } from './BlogSearchModal';
import { BlogPostCard } from './BlogPostCard';
import { BlogFeaturedPost } from './BlogFeaturedPost';
import styles from './BlogList.module.css';

export default function BlogList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const categoryParam = searchParams?.get('category');
    const modalInputRef = useRef<HTMLInputElement>(null);

    const isBlogsRoute = pathname?.startsWith('/blogs');
    const baseBlogPath = isBlogsRoute ? '/blogs' : '/blog';

    const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 9;
    const [isMounted, setIsMounted] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [modalSearchQuery, setModalSearchQuery] = useState('');
    const [selectedResultIndex, setSelectedResultIndex] = useState(0);

    useEffect(() => { setIsMounted(true); }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setIsSearchModalOpen((prev) => !prev); }
            else if (e.key === 'Escape' && isSearchModalOpen) { e.preventDefault(); setIsSearchModalOpen(false); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchModalOpen]);

    useEffect(() => {
        if (isSearchModalOpen) {
            document.body.style.overflow = 'hidden';
            const t = setTimeout(() => modalInputRef.current?.focus(), 50);
            return () => { clearTimeout(t); document.body.style.overflow = ''; };
        } else { document.body.style.overflow = ''; setModalSearchQuery(''); setSelectedResultIndex(0); }
    }, [isSearchModalOpen]);

    useEffect(() => {
        setActiveCategory(categoryParam || 'All');
        setCurrentPage(1);
    }, [categoryParam]);

    const { data: postsRes, isLoading } = useQuery({
        queryKey: ['public-blogs', activeCategory, currentPage],
        queryFn: () => blogService.getPosts({ isPublished: true, limit: 50, page: 1, ...(activeCategory !== 'All' && { category: activeCategory }) }),
        staleTime: 60 * 1000, gcTime: 5 * 60 * 1000, retry: false,
    });

    const apiPosts = postsRes?.data?.posts;
    const isApiAvailable = Array.isArray(apiPosts) && apiPosts.length > 0;

    const rawPosts = useMemo(() => {
        if (isApiAvailable) {
            return apiPosts.map((p: any) => ({
                ...p,
                featuredImageUrl: p.featuredImage?.url || p.featuredImageUrl || p.coverImage || '/images/blog/credit-score-guide.svg',
                authorName: p.authorName || 'CreditKlick Editorial',
                readingTime: p.readingTime || (p.readTime ? `${p.readTime} min read` : '6 min read'),
            }));
        }
        return sampleBlogPosts;
    }, [isApiAvailable, apiPosts]);

    const modalSearchResults = useMemo(() => {
        if (!modalSearchQuery.trim()) return [];
        const q = modalSearchQuery.toLowerCase().trim();
        return rawPosts.filter((post: any) => {
            const tags = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : '';
            return [post.title, post.excerpt || post.summary, post.category, post.authorName, tags].some((f) => (f || '').toLowerCase().includes(q));
        }).slice(0, 8);
    }, [rawPosts, modalSearchQuery]);

    const handleModalKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedResultIndex((p) => modalSearchResults.length > 0 ? (p + 1) % modalSearchResults.length : 0); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedResultIndex((p) => modalSearchResults.length > 0 ? (p - 1 + modalSearchResults.length) % modalSearchResults.length : 0); }
        else if (e.key === 'Enter') { e.preventDefault(); if (modalSearchResults[selectedResultIndex]) { setIsSearchModalOpen(false); router.push(`${baseBlogPath}/${modalSearchResults[selectedResultIndex].slug || modalSearchResults[selectedResultIndex]._id}`); } }
    };

    const filteredPosts = useMemo(() => rawPosts.filter((p: any) => activeCategory === 'All' || p.category?.toLowerCase() === activeCategory.toLowerCase()), [rawPosts, activeCategory]);
    const featuredPost = useMemo(() => 
        filteredPosts.find((p: any) => p.isFeatured) || 
        filteredPosts.find((p: any) => p.slug?.includes('credit') || p.slug?.includes('cibil')) || 
        filteredPosts[0] || null, 
    [filteredPosts]);
    const allOtherPosts = useMemo(() => !featuredPost ? filteredPosts : filteredPosts.filter((p: any) => (p.slug || p._id) !== (featuredPost.slug || featuredPost._id)), [filteredPosts, featuredPost]);
    const totalPages = useMemo(() => Math.max(1, Math.ceil(allOtherPosts.length / POSTS_PER_PAGE)), [allOtherPosts.length]);
    const paginatedPosts = useMemo(() => { const s = (currentPage - 1) * POSTS_PER_PAGE; return allOtherPosts.slice(s, s + POSTS_PER_PAGE); }, [allOtherPosts, currentPage]);

    return (
        <LandingLayout>
            <div className={styles.container}>
                {/* Hero */}
                <section className={styles.heroSection}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
                        <h1 className={styles.heroTitle}>CreditKlick - Credit Score, Loans<br className="hidden sm:inline" /> & Financial Tips Blog</h1>
                        <p className={styles.heroSubtitle}>Expert CIBIL Score Guides, Credit Card Reviews & Smart Financial Planning Insights</p>
                        <div><Link href="/credit-score" className={styles.demoBtn}>Check Free Credit Score</Link></div>
                    </motion.div>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchPill} onClick={() => setIsSearchModalOpen(true)} role="button" tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsSearchModalOpen(true); } }} aria-label="Open search dialog">
                            <Search className={styles.searchIcon} />
                            <span className={styles.searchInput}>Search</span>
                            <span className={styles.kbdBadge}>Ctrl+K</span>
                        </div>
                    </div>
                </section>

                {/* Featured */}
                <BlogFeaturedPost post={featuredPost} baseBlogPath={baseBlogPath} />

                {/* All Posts */}
                <section className={styles.postsSection}>
                    <h2 className={styles.allPostsHeading}>All Posts</h2>
                    {isLoading ? (
                        <div className={styles.postsGrid}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 animate-pulse">
                                    <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
                                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-3" />
                                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-2" />
                                </div>
                            ))}
                        </div>
                    ) : paginatedPosts.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">No posts found.</p>
                            <button onClick={() => setActiveCategory('All')} className="mt-4 px-4 py-2 bg-[#155dfc] text-white rounded-md text-sm font-semibold hover:bg-[#1d4ed8]">Show All Posts</button>
                        </div>
                    ) : (
                        <div className={styles.postsGrid}>
                            {paginatedPosts.map((post: any, i: number) => <BlogPostCard key={post._id || post.slug || i} post={post} index={i} baseBlogPath={baseBlogPath} />)}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Previous Page"><ChevronLeft className="w-4 h-4" /></button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`w-9 h-9 rounded-md text-sm font-semibold transition-colors ${currentPage === page ? 'bg-[#155dfc] text-white' : 'border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50'}`}>{page}</button>
                            ))}
                            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Next Page"><ChevronRight className="w-4 h-4" /></button>
                        </div>
                    )}
                </section>

                {/* Bottom CTA */}
                <section className={styles.bottomCtaSection}>
                    <div className={styles.bottomCtaBanner}>
                        <h2 className={styles.bottomCtaTitle}>Take Control of Your Financial Health with CreditKlick</h2>
                        <p className={styles.bottomCtaSubtitle}>Check your free CIBIL score, unlock personalized loan offers, and build a stellar credit profile today.</p>
                        <div><Link href="/credit-score" className={styles.bottomCtaButton}>Check Free Credit Score</Link></div>
                    </div>
                </section>

                <BlogSearchModal
                    isOpen={isSearchModalOpen} isMounted={isMounted} inputRef={modalInputRef as any}
                    query={modalSearchQuery} results={modalSearchResults} selectedIndex={selectedResultIndex}
                    baseBlogPath={baseBlogPath} onClose={() => setIsSearchModalOpen(false)}
                    onQueryChange={setModalSearchQuery} onIndexChange={setSelectedResultIndex} onKeyDown={handleModalKeyDown}
                />
            </div>
        </LandingLayout>
    );
}
