'use client';

interface BlogDetailContentProps {
  post: any;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <article className="prose prose-lg max-w-none text-gray-800 font-normal leading-relaxed">
      {post?.coverImage && (
        <div className="rounded-2xl overflow-hidden mb-8 border border-gray-100 shadow-md">
          <img
            src={post.coverImage}
            alt={post.title || "Cover"}
            className="w-full h-auto object-cover max-h-[480px]"
          />
        </div>
      )}

      {post?.content ? (
        <div
          className="blog-content space-y-6 text-base text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <div className="space-y-4 text-base text-gray-700">
          <p>
            WhatsApp Business API continues to redefine customer engagement and conversion rates worldwide. Direct, interactive messaging yields 98% open rates and 45-60% click-through benchmarks when properly integrated into omnichannel funnels.
          </p>
        </div>
      )}
    </article>
  );
}
