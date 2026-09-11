export interface Post {
    _id: string
    title: string
    slug: string
    category?: string
    excerpt?: string
    content?: string
    featuredImage?: { url: string }
    createdAt?: string
    updatedAt?: string
}

export interface BlogCategory {
    label: string
    href: string
}
