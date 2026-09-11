export interface BlogPost {
  _id: string;
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  authorRole?: string;
  authorAvatar?: string;
  featuredImageUrl: string;
  readingTime?: string;
  tags: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt?: string;
  ctaBanner?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    formTitle?: string;
    buttonText?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
  geo?: {
    targetAiQueries?: string;
    brandEntities?: string;
  };
}
