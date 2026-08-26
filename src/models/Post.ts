import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IFeaturedImage {
    url?: string
    publicId?: string
    alt?: string
    width?: number
    height?: number
}

export interface IAuthor {
    name?: string | { first?: string; last?: string }
    fullName?: string
    avatar?: string
    role?: string
}

export interface IPost extends Document {
    title: string
    slug: string
    content: string
    excerpt?: string
    featuredImage?: IFeaturedImage
    category: string
    tags: string[]
    author?: IAuthor
    status: 'draft' | 'published' | 'archived'
    publishedAt?: Date
    views: number
    readTime?: number
    metaTitle?: string
    metaDescription?: string
    seo?: {
        metaTitle?: string
        metaDescription?: string
        keywords?: string[]
    }
    createdAt: Date
    updatedAt: Date
}

const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters'],
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true,
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
        },
        excerpt: {
            type: String,
            maxlength: [500, 'Excerpt cannot exceed 500 characters'],
        },
        featuredImage: {
            url: String,
            publicId: String,
            alt: String,
            width: Number,
            height: Number,
        },
        category: {
            type: String,
            default: 'other',
            index: true,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        author: {
            name: Schema.Types.Mixed,
            fullName: String,
            avatar: String,
            role: String,
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft',
            index: true,
        },
        publishedAt: {
            type: Date,
            default: Date.now,
            index: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        readTime: {
            type: Number,
            default: 3,
        },
        metaTitle: String,
        metaDescription: String,
        seo: {
            metaTitle: String,
            metaDescription: String,
            keywords: [String],
        },
    },
    {
        timestamps: true,
        strict: false,
    }
)

// Ensure text index for fast search
try {
    postSchema.index({ title: 'text', content: 'text', excerpt: 'text', tags: 'text' })
} catch (e) {
    // index might already exist
}

export const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema)

export default Post
