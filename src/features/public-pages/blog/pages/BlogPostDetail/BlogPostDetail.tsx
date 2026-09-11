'use client';

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useParams, usePathname, useLocation, Link } from "@/lib/navigation";
import { useQuery } from "@tanstack/react-query";
import { LandingLayout } from "@/components/layout/LandingLayout";
import { Calendar, User, Tag } from "lucide-react";
import { blogService } from "@/lib/services/blog-service/index";
import { sampleBlogPosts } from "@/lib/data/blogData";
import { BlogPostSkeleton } from "./BlogPostSkeleton";
import { BlogPostNotFound } from "./BlogPostNotFound";
import { BlogPostHeaderCta } from "./BlogPostHeaderCta";
import { BlogPostSidebar } from "./BlogPostSidebar";
import { BlogPostRelatedSection } from "./BlogPostRelatedSection";
import { BlogPostShareBar } from "./BlogPostShareBar";

export default function BlogPostDetail() {
  const nextParams = useParams();
  const pathname = usePathname();
  const [, setLocation] = useLocation();

  const isBlogsRoute = pathname?.startsWith('/blogs');
  const baseBlogPath = isBlogsRoute ? '/blogs' : '/blog';

  const rawSlug = (nextParams?.slug as string) || (pathname ? pathname.split('/').filter(Boolean).pop() : '');
  const slug = rawSlug ? decodeURIComponent(rawSlug) : '';

  const { data: postRes, isLoading, isError } = useQuery({
    queryKey: ["public-blog", slug],
    queryFn: () => blogService.getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false
  });

  const apiPost = postRes?.data;
  const post = useMemo(() => {
    if (apiPost) return apiPost;
    return sampleBlogPosts.find(p => p.slug === slug || p._id === slug) || null;
  }, [apiPost, slug]);

  const { data: relatedRes } = useQuery({
    queryKey: ["public-blogs", "related", post?.category],
    queryFn: () => blogService.getPosts({ category: post?.category, limit: 6 }),
    enabled: !!post?.category,
    retry: false
  });

  const relatedPosts = useMemo(() => {
    const apiRelated = (relatedRes?.data?.posts || []).filter((p: any) => p.slug !== slug);
    if (apiRelated.length > 0) return apiRelated.slice(0, 5);
    return sampleBlogPosts.filter(p => p.slug !== slug && (!post?.category || p.category === post.category)).slice(0, 5);
  }, [relatedRes, slug, post?.category]);

  useEffect(() => {
    if (post && typeof document !== 'undefined') {
      document.title = post.seo?.metaTitle || post.title || "Wapine Blog";
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = post.seo?.metaDescription || post.excerpt || "";

      const scriptId = 'blog-post-schema';
      let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      scriptTag.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.seo?.metaDescription || post.excerpt || "",
        "author": { "@type": "Person", "name": post.authorName || "Wapine" },
        "about": post.geo?.brandEntities ? post.geo.brandEntities.split(',') : [],
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": post.seo?.canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '')
        }
      });
      
      return () => {
        if (metaDesc) metaDesc.content = "";
        const metaGeo = document.querySelector('meta[name="keywords"]');
        if (metaGeo) document.head.removeChild(metaGeo);
        const scriptNode = document.querySelector('script[id="geo-schema"]');
        if (scriptNode) document.head.removeChild(scriptNode);
      };
    }
  }, [post]);

  if (isLoading && !post) return <BlogPostSkeleton />;
  if (!post && (isError || !isLoading)) return <BlogPostNotFound onReturn={() => setLocation(baseBlogPath)} />;

  const imageUrl = post.featuredImageUrl || post.coverImage || post.image;
  const authorName = post.authorName || (typeof post.author === 'object' ? post.author?.name : post.author) || "Wapine";
  const postDate = post.createdAt || post.publishedAt || Date.now();
  const readTimeEstimate = post.readingTime || `${Math.ceil((post.content?.split(' ').length || 200) / 200)} min read`;

  return (
    <LandingLayout>
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0f6841]/20 pb-20 pt-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#0f6841] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0f6841]"></span>
              {post.category || "General"}
            </span>
            <h1 className="text-3xl md:text-[2.75rem] font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.15] max-w-4xl">
              {post.title}
            </h1>
            <BlogPostHeaderCta ctaBanner={post.ctaBanner} />
            <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between text-[13px] font-medium text-slate-500 border-b border-slate-100 pb-4 gap-4">
              <div className="flex items-center gap-2">
                <Link href="/" className="hover:text-[#0f6841] transition-colors">Home</Link>
                <span>›</span>
                <Link href={baseBlogPath} className="hover:text-[#0f6841] transition-colors">Blog</Link>
                <span>›</span>
                <span className="text-slate-900 truncate max-w-[200px] sm:max-w-[400px]">{post.title}</span>
              </div>
              <div>Updated: {new Date(post.updatedAt || postDate).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              {imageUrl && (
                <div className="mb-6 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <Image src={imageUrl} alt={post.title} width={1200} height={630} priority sizes="(max-width: 1024px) 100vw, 850px" className="w-full h-auto max-h-[500px] object-cover" />
                </div>
              )}
              <div className="flex items-center gap-4 mb-8 text-[13px] text-slate-500 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0f6841] flex items-center justify-center text-white font-bold"><User className="w-4 h-4" /></div>
                  <span className="font-semibold text-slate-800">{authorName}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /><time dateTime={new Date(postDate).toISOString()}>{new Date(postDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}</time></div>
                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                <span>{readTimeEstimate}</span>
                <span className="hidden sm:inline-flex items-center ml-auto px-3 py-1 rounded-full bg-[#0f6841] text-white text-[11px] font-bold">{post.category || "General"}</span>
              </div>

              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-[#0f6841] hover:prose-a:text-[#0c5636] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-sm prose-img:border prose-img:border-slate-100 prose-blockquote:border-[#0f6841] prose-blockquote:bg-emerald-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-700 prose-strong:text-slate-900 prose-code:text-[#0f6841] prose-code:bg-emerald-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-slate-400 rotate-90" />
                    <div className="flex flex-wrap items-center gap-2">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 cursor-pointer text-slate-600 text-[13px] rounded-full transition-colors">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <BlogPostShareBar title={post.title} />
            </div>

            <BlogPostSidebar category={post.category} relatedPosts={relatedPosts} baseBlogPath={baseBlogPath} />
          </div>

          <BlogPostRelatedSection relatedPosts={relatedPosts} baseBlogPath={baseBlogPath} />

          <div className="mt-16 mb-4">
            <div className="bg-[#358b5e] rounded-2xl p-8 sm:p-12 text-white shadow-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">Grow Your Business with WhatsApp Business API</h2>
              <p className="text-white/90 text-sm sm:text-base mb-6 font-normal">Attend a free demo</p>
              <div><Link href="/demo" className="inline-flex items-center justify-center bg-[#0a0a0a] hover:bg-black text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-lg transition-all shadow-md">Book Demo Now</Link></div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
