'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogList.module.css';

const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Dec 11, 2024';
    try { return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return 'Dec 11, 2024'; }
};

interface BlogPostCardProps {
    post: any;
    index: number;
    baseBlogPath: string;
}

export function BlogPostCard({ post, index, baseBlogPath }: BlogPostCardProps) {
    const slug = post.slug || post.id || post._id;
    const targetUrl = `${baseBlogPath}/${slug}`;
    const imageUrl = post.featuredImageUrl || post.coverImage || post.image || '/images/blog/whatsapp-blast-guide.svg';
    const author = post.authorName || (typeof post.author === 'object' ? post.author?.name : post.author) || 'Deepak Bhagchandani';
    const category = post.category || 'WhatsApp Marketing';
    const isSpecialTitleGreen = category.toLowerCase().includes('marketing') || index === 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
        >
            <Link href={targetUrl} className={styles.postCard}>
                <div className={styles.postImageWrapper}>
                    <Image src={imageUrl} alt={post.title} fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.postImage} />
                </div>
                <div className={styles.postContent}>
                    <h3 className={`${styles.postTitle} ${isSpecialTitleGreen ? styles.postTitleGreen : ''}`}>{post.title}</h3>
                    <div className={styles.postCategory}>{category}</div>
                    <div className={styles.postMeta}>
                        <span>{author}</span>
                        <span className={styles.metaBullet}>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                        <span className={styles.metaBullet}>•</span>
                        <span>{post.readingTime || '10 min read'}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default BlogPostCard;
