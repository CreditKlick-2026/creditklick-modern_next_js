import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogList from "@/features/public-pages/blog/pages/BlogList";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const revalidate = 3600; // ISR: background revalidate every 1 hour

export const metadata: Metadata = {
  title: "WhatsApp Marketing & Automation Blog | Wapine Insights",
  description: "Read actionable guides, growth playbooks, API documentation, and industry case studies on WhatsApp marketing, customer retention, and AI chatbots.",
  alternates: {
    canonical: "https://wapine.com/blog",
  },
  openGraph: {
    title: "WhatsApp Marketing & Automation Blog | Wapine Insights",
    description: "Read actionable guides, growth playbooks, API documentation, and industry case studies on WhatsApp marketing, customer retention, and AI chatbots.",
    url: "https://wapine.com/blog",
    type: "website",
    images: [
      {
        url: "https://wapine.com/Logo2.png",
        width: 1200,
        height: 630,
        alt: "Wapine WhatsApp Marketing Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Marketing & Automation Blog | Wapine Insights",
    description: "Read actionable guides, growth playbooks, and API documentation for WhatsApp marketing and chatbots.",
    images: ["https://wapine.com/Logo2.png"],
  },
};

const blogListJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://wapine.com/blog#blog",
      "name": "Wapine WhatsApp Marketing & Automation Blog",
      "description": "Actionable guides, growth playbooks, API tutorials, and case studies on WhatsApp marketing, AI chatbots, and customer retention.",
      "url": "https://wapine.com/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Wapine",
        "logo": {
          "@type": "ImageObject",
          "url": "https://wapine.com/MainLogo.png"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://wapine.com/blog#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://wapine.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://wapine.com/blog"
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
