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
        if (data?.data?.posts) return data;
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
    return {
      success: true,
      data: {
        posts: [],
        pagination: {
          total: 0,
          page: 1,
          limit: 50,
          totalPages: 0
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
    } catch (err) {
      console.error("Error fetching post by slug:", err);
    }
    return {
      success: false,
      data: null
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
