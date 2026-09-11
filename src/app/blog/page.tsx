import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogList from "@/features/public-pages/blog/pages/BlogList";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const revalidate = 3600; // ISR: background revalidate every 1 hour

export const metadata: Metadata = {
  title: "Blogs - Financial Tips, Credit Cards & Loans | CreditKlick",
  description: "Read actionable guides, credit score tips, personal loan comparisons, credit card reviews, and expert financial advice from CreditKlick.",
  alternates: {
    canonical: "https://creditklick.com/blog",
  },
  openGraph: {
    title: "Blogs - Financial Tips, Credit Cards & Loans | CreditKlick",
    description: "Read actionable guides, credit score tips, personal loan comparisons, credit card reviews, and expert financial advice from CreditKlick.",
    url: "https://creditklick.com/blog",
    type: "website",
    images: [
      {
        url: "/assets/creditklic_next_gen_transparent.png",
        width: 1200,
        height: 630,
        alt: "CreditKlick Financial Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - Financial Tips, Credit Cards & Loans | CreditKlick",
    description: "Read actionable guides, credit score tips, personal loan comparisons, and expert financial advice.",
    images: ["/assets/creditklic_next_gen_transparent.png"],
  },
};

const blogListJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://creditklick.com/blog#blog",
      "name": "CreditKlick Financial Blog",
      "description": "Actionable guides, credit score improvement tips, loan comparisons, and financial advice from CreditKlick.",
      "url": "https://creditklick.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "CreditKlick",
        "logo": {
          "@type": "ImageObject",
          "url": "https://creditklick.com/assets/creditklic_next_gen_transparent.png"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://creditklick.com/blog#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://creditklick.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://creditklick.com/blog"
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <QueryProvider>
        <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
          <BlogList />
        </Suspense>
      </QueryProvider>
    </>
  );
}
