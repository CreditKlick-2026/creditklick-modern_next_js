import { sampleBlogPosts } from "@/lib/data/blogData";

class BlogService {
  /**
   * Get all published posts (Public)
   */
  async getPosts(params: Record<string, any> = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/v1/posts${query ? `?${query}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.data?.posts?.length) return data;
      }
    } catch {
      // fallback to sample posts
    }
    return {
      success: true,
      data: {
        posts: sampleBlogPosts,
        pagination: {
          total: sampleBlogPosts.length,
          page: 1,
          limit: 50,
          totalPages: 1
        }
      }
    };
  }

  /**
   * Get a single post by slug (Public)
   */
  async getPostBySlug(slug: string) {
    try {
      const res = await fetch(`/api/v1/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.data) return data;
      }
    } catch {
      // fallback
    }
    const found = sampleBlogPosts.find(p => p.slug === slug || p._id === slug);
    return {
      success: true,
      data: found || null
    };
  }

  /**
   * Create a new post (Admin)
   */
  async createPost(postData: any) {
    return { success: false, message: "Not supported" };
  }

  /**
   * Update an existing post (Admin)
   */
  async updatePost(id: string, postData: any) {
    return { success: false, message: "Not supported" };
  }

  /**
   * Delete a post (Admin)
   */
  async deletePost(id: string) {
    return { success: false, message: "Not supported" };
  }

  /**
   * Upload an image to Cloudinary (Admin)
   */
  async uploadImage(file: File) {
    return { success: false, message: "Not supported" };
  }
}

export const blogService = new BlogService();
export default blogService;
