/**
 * blogData.ts — Blog data index & exports
 * Posts are chunked in src/lib/data/blog/ to keep file sizes < 200 lines.
 */

import { BlogPost } from "./blog/types";
import { postsBatch1 } from "./blog/postsBatch1";
import { postsBatch2 } from "./blog/postsBatch2";
import { postsBatch3 } from "./blog/postsBatch3";

export type { BlogPost };

export const sampleBlogPosts: BlogPost[] = [
  ...postsBatch1,
  ...postsBatch2,
  ...postsBatch3,
];
