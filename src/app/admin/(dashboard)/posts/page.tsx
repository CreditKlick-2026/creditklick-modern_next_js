"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'
import {
    Search,
    Plus,
    Edit,
    Trash2,
    Eye,
    X,
    Loader2,
    RefreshCw,
    Image as ImageIcon,
    Save,
    FileText,
    Link as LinkIcon,
    Globe,
    Settings,
    Megaphone,
} from 'lucide-react'
import { postsAPI, uploadAPI } from '@/services/api'
import toast from 'react-hot-toast'
import CategoriesList from './_components/CategoriesList'
import axios from 'axios'
import imageCompression from 'browser-image-compression'

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => (
        <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
            <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Loading editor...</p>
            </div>
        </div>
    )
})

const CATEGORIES = [
    { value: 'credit-cards', label: 'Credit Cards' },
    { value: 'loans', label: 'Loans' },
    { value: 'cibil', label: 'Credit Score' },
    { value: 'tips', label: 'Financial Tips' },
    { value: 'news', label: 'News' },
    { value: 'guides', label: 'Guides' },
    { value: 'calculators', label: 'Calculators' },
    { value: 'other', label: 'Other' }
]

interface SEOData {
    metaTitle: string
    metaDescription: string
    focusKeyword: string
    canonicalUrl: string
    noIndex: boolean
}

interface ExternalLink {
    url: string
    anchorText: string
    noFollow: boolean
}

interface SidebarLink {
    text: string
    url: string
    isActive: boolean
}

interface CtaBannerData {
    enabled: boolean
    title: string
    subtitle: string
    highlight: string
    offerText: string
    iconType: string
    customIconUrl: string
    formTitle: string
    formPlaceholder: string
    buttonText: string
    consentText: string
    redirectUrl: string
    sidebarTitle: string
    sidebarLinks: SidebarLink[]
    stickyBarEnabled: boolean
    stickyBarText: string
    stickyBarButtonText: string
}

interface PostData {
    _id?: string
    title: string
    slug?: string
    content: string
    excerpt: string
    category: string
    tags: string
    status: string
    featuredImage: any
    featuredImageUrl: string
    views?: number
    createdAt?: string
    authorName: string // Admin-controlled author name
    subDescription: string // Sub-description below heading
    seo: SEOData
    externalLinks: ExternalLink[]
    ctaBanner: CtaBannerData
}

export default function PostsManagement() {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quillRef = useRef<any>(null)
    const [posts, setPosts] = useState<PostData[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
    const [filters, setFilters] = useState({ search: '', category: '', status: '' })
    const [showEditor, setShowEditor] = useState(false)
    const [editingPost, setEditingPost] = useState<PostData | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState('content') // content, seo, links, cta, settings

    const defaultCtaBanner: CtaBannerData = {
        enabled: true,
        title: 'Check CIBIL Score &',
        subtitle: 'Report worth ₹1,200',
        highlight: 'Absolutely FREE',
        offerText: 'Chance to get Accidental Cover up to ₹1Lakh & more',
        iconType: 'credit-score',
        customIconUrl: '',
        formTitle: "Let's Get Started",
        formPlaceholder: 'Mobile Number',
        buttonText: 'Check Free Credit Score',
        consentText: 'I hereby appoint CreditKlick as my authorized representative to receive my credit information from Cibil / Equifax / Experian / CRIF Highmark (bureau).',
        redirectUrl: '/credit-score',
        sidebarTitle: 'CIBIL & CIBIL-related Info',
        sidebarLinks: [
            { text: 'CIBIL', url: '/blog/cibil', isActive: true },
            { text: 'How to Read CIBIL Report', url: '/blog/how-to-read-cibil-report', isActive: true },
            { text: 'CIBIL Score for Home Loan', url: '/blog/cibil-score-home-loan', isActive: true },
            { text: 'CIBIL Score for Personal Loan', url: '/blog/cibil-score-personal-loan', isActive: true },
        ],
        stickyBarEnabled: true,
        stickyBarText: 'Check your Credit Score for FREE',
        stickyBarButtonText: 'Check Now'
    }

    const [formData, setFormData] = useState<PostData>({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        status: 'draft',
        featuredImage: null,
        featuredImageUrl: '',
        authorName: '', // Admin-controlled author name
        subDescription: '', // Sub-description below heading
        slug: '',
        seo: {
            metaTitle: '',
            metaDescription: '',
            focusKeyword: '',
            canonicalUrl: '',
            noIndex: false
        },
        externalLinks: [],
        ctaBanner: defaultCtaBanner
    })

    useEffect(() => {
        fetchPosts()
    }, [pagination.page, filters])

    const fetchPosts = async () => {
        setLoading(true)
        try {
            const params: Record<string, unknown> = {
                page: pagination.page,
                limit: pagination.limit,
                nocache: 'true',
                status: filters.status || 'all' // Use filter or default to all
            }

            if (filters.search) params.search = filters.search
            if (filters.category) params.category = filters.category

            const response = await postsAPI.getAll(params)

            if (response.data.success) {
                setPosts(response.data.data.posts || [])
                setPagination(prev => ({
                    ...prev,
                    total: response.data.data.pagination?.total || 0
                }))
            }
        } catch (error: unknown) {
            console.error('Fetch posts error:', error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                router.push('/admin/login')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        setEditingPost(null)
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            category: 'credit-cards',
            tags: '',
            status: 'published',
            featuredImage: null,
            featuredImageUrl: '',
            authorName: '', // Admin-controlled author name
            subDescription: '', // Sub-description below heading
            slug: '',
            seo: {
                metaTitle: '',
                metaDescription: '',
                focusKeyword: '',
                canonicalUrl: '',
                noIndex: false
            },
            externalLinks: [],
            ctaBanner: defaultCtaBanner
        })
        setActiveTab('content')
        setShowEditor(true)
    }

    const handleEdit = async (post: PostData) => {
        if (!post.slug) return;

        try {
            const response = await postsAPI.getBySlug(post.slug)
            const fullPost = response.data.success ? response.data.data : post

            setEditingPost(fullPost)
            setFormData({
                title: fullPost.title || '',
                content: fullPost.content || '',
                excerpt: fullPost.excerpt || '',
                category: fullPost.category || '',
                tags: Array.isArray(fullPost.tags) ? fullPost.tags.join(', ') : (fullPost.tags || ''),
                status: fullPost.status || 'published',
                featuredImage: null,
                featuredImageUrl: fullPost.featuredImage?.url || fullPost.featuredImageUrl || '',
                authorName: fullPost.authorName || '', // Admin-controlled author name
                subDescription: fullPost.subDescription || '', // Sub-description below heading
                slug: fullPost.slug || '',
                seo: {
                    metaTitle: fullPost.seo?.metaTitle || '',
                    metaDescription: fullPost.seo?.metaDescription || '',
                    focusKeyword: fullPost.seo?.focusKeyword || '',
                    canonicalUrl: fullPost.seo?.canonicalUrl || '',
                    noIndex: fullPost.seo?.noIndex || false
                },
                externalLinks: fullPost.externalLinks || [],
                ctaBanner: fullPost.ctaBanner || defaultCtaBanner
            })
            setActiveTab('content')
            setShowEditor(true)
        } catch (error) {
            console.error('Failed to fetch post for editing:', error)
            toast.error('Failed to load post content')
        }
    }

    // Custom Image Handler for Quill - wrapped in useCallback for stable reference
    const imageHandler = useCallback(() => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
            const file = input.files?.[0]
            if (file) {
                const formDataPayload = new FormData()
                formDataPayload.append('image', file)

                const loadingToast = toast.loading('Uploading image...')
                try {
                    const response = await uploadAPI.uploadImage(formDataPayload)
                    const url = response.data.data.url

                    const quill = quillRef.current?.getEditor()
                    if (quill) {
                        const range = quill.getSelection(true)
                        quill.insertEmbed(range.index, 'image', url)
                    }
                    toast.dismiss(loadingToast)
                    toast.success('Image uploaded')
                } catch (error) {
                    toast.dismiss(loadingToast)
                    toast.error('Image upload failed')
                    console.error(error)
                }
            }
        }
    }, [])

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'color': [] }, { 'background': [] }]
            ],
            handlers: {
                image: imageHandler
            }
        },
        clipboard: {
            matchVisual: false,
        }
    }), [imageHandler])

    const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const checked = (e.target as HTMLInputElement).checked

        setFormData(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [name]: type === 'checkbox' ? checked : value
            }
        }))
    }

    const addExternalLink = () => {
        setFormData(prev => ({
            ...prev,
            externalLinks: [...prev.externalLinks, { url: '', anchorText: '', noFollow: true }]
        }))
    }

    const updateExternalLink = (index: number, field: string, value: string | boolean) => {
        const newLinks = [...formData.externalLinks];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (newLinks[index] as any)[field] = value
        setFormData(prev => ({ ...prev, externalLinks: newLinks }))
    }

    const removeExternalLink = (index: number) => {
        const newLinks = formData.externalLinks.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, externalLinks: newLinks }))
    }

    const handleSubmit = async () => {
        if (!formData.title || !formData.content) {
            toast.error('Title and content are required')
            return
        }

        setSubmitting(true)
        try {
            const data = new FormData()
            data.append('title', formData.title)
            data.append('content', formData.content)
            data.append('excerpt', formData.excerpt)
            data.append('category', formData.category)
            data.append('tags', formData.tags)
            data.append('status', formData.status)


            // Append JSON fields
            data.append('seo', JSON.stringify(formData.seo))
            data.append('externalLinks', JSON.stringify(formData.externalLinks))
            data.append('ctaBanner', JSON.stringify(formData.ctaBanner))
            data.append('authorName', formData.authorName)
            data.append('subDescription', formData.subDescription)
            if (formData.slug) data.append('slug', formData.slug)

            // Compress image before upload to avoid server timeout
            if (formData.featuredImage && typeof formData.featuredImage !== 'string') {
                const imageFile = formData.featuredImage as File
                const originalSize = imageFile.size / 1024 / 1024 // MB

                if (originalSize > 1) {
                    toast.loading('Compressing image...', { id: 'compress' })
                    try {
                        const options = {
                            maxSizeMB: 1, // Max 1MB
                            maxWidthOrHeight: 1920,
                            useWebWorker: true,
                        }
                        const compressedFile = await imageCompression(imageFile, options)
                        const compressedSize = compressedFile.size / 1024 / 1024
                        console.log(`Image compressed: ${originalSize.toFixed(2)}MB → ${compressedSize.toFixed(2)}MB`)
                        toast.dismiss('compress')
                        toast.success(`Image compressed: ${originalSize.toFixed(1)}MB → ${compressedSize.toFixed(1)}MB`)
                        data.append('featuredImage', compressedFile, imageFile.name)
                    } catch (compressError) {
                        console.error('Compression failed:', compressError)
                        toast.dismiss('compress')
                        // Fall back to original file
                        data.append('featuredImage', imageFile)
                    }
                } else {
                    data.append('featuredImage', imageFile)
                }
            }

            let response
            if (editingPost && editingPost._id) {
                response = await postsAPI.update(editingPost._id, data)
            } else {
                response = await postsAPI.create(data)
            }

            if (response.data.success) {
                const cacheMsg = response.data.cacheInvalidated ? ' (Cache refreshed ✓)' : ''
                toast.success((editingPost ? 'Post updated' : 'Post created') + cacheMsg)
                setShowEditor(false)
                fetchPosts()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Submit error:', error)
            toast.error(error.response?.data?.message || 'Failed to save post')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (postId: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return

        try {
            const response = await postsAPI.delete(postId)
            if (response.data.success) {
                setPosts(posts.filter(post => post._id !== postId))
                const cacheMsg = response.data.cacheInvalidated ? ' (Cache refreshed ✓)' : ''
                toast.success('Post deleted' + cacheMsg)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Delete error:', error)
            toast.error('Failed to delete post')
        }
    }

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            draft: 'bg-yellow-100 text-yellow-700',
            published: 'bg-green-100 text-green-700',
            archived: 'bg-gray-100 text-gray-700'
        }
        return colors[status] || 'bg-gray-100 text-gray-700'
    }

    const totalPages = Math.ceil(pagination.total / pagination.limit)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500">Create and manage blog content</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchPosts}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New Post
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    {/* Filters */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>

                            <select
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="">All Categories</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>

                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setFilters({ search: '', category: '', status: '' })}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 text-sm"
                            >
                                <X className="w-4 h-4" />
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {/* Posts Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Post</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Sub-description</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center">
                                                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                                <p className="text-gray-500 mt-2">Loading posts...</p>
                                            </td>
                                        </tr>
                                    ) : posts.length > 0 ? (
                                        posts.map((post) => (
                                            <tr key={post._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {post.featuredImage ? (
                                                            <img
                                                                src={(post.featuredImage as any).url || post.featuredImage}
                                                                alt={post.title}
                                                                className="w-16 h-16 rounded-lg object-contain bg-gray-50 border border-gray-200"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                                                            <div className="text-sm text-gray-500">/{post.slug}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 max-w-xs">
                                                    <div className="text-sm text-gray-600 line-clamp-2" title={post.subDescription}>
                                                        {post.subDescription || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{post.category || '-'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{post.views || 0}</td>
                                                <td className="px-6 py-4 text-gray-500 text-sm">
                                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <a
                                                            href={`/blog/${post.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </a>
                                                        <button
                                                            onClick={() => handleEdit(post)}
                                                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(post._id!)}
                                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                No posts found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    Page {pagination.page} of {totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                        disabled={pagination.page === 1}
                                        className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                        disabled={pagination.page >= totalPages}
                                        className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <CategoriesList
                        activeCategory={filters.category}
                        onSelectCategory={(cat) => setFilters({ ...filters, category: cat })}
                    />
                </div>
            </div>

            {/* Post Editor Modal */}
            <AnimatePresence>
                {showEditor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Editor Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                                <h3 className="text-lg font-semibold">
                                    {editingPost ? 'Edit Post' : 'Create New Post'}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={submitting}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Save Information
                                    </button>
                                    <button
                                        onClick={() => setShowEditor(false)}
                                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Editor Body */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Navigation Sidebar */}
                                <div className="w-64 border-r border-gray-100 p-4 space-y-2 bg-gray-50 overflow-y-auto shrink-0">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Settings</h4>
                                    {[
                                        { id: 'content', label: 'Content', icon: FileText },
                                        { id: 'seo', label: 'SEO & Meta', icon: Search },
                                        { id: 'links', label: 'External Links', icon: LinkIcon },
                                        { id: 'cta', label: 'CTA Banner', icon: Megaphone },
                                        { id: 'settings', label: 'General Settings', icon: Settings }
                                    ].map(tab => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {/* @ts-ignore Lucide icon type issue if strict */}
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto p-8">
                                    {activeTab === 'content' && (
                                        <div className="space-y-6 max-w-4xl mx-auto">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full text-3xl font-bold px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="e.g. 10 Best Credit Cards in India (2024)"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                                                <input
                                                    type="text"
                                                    value={formData.slug}
                                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                    placeholder="custom-url-slug"
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                                    <select
                                                        value={formData.category}
                                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                                    >
                                                        <option value="">Select Category</option>
                                                        {CATEGORIES.map(cat => (
                                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                                                    <input
                                                        type="text"
                                                        value={formData.tags}
                                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        placeholder="finance, loans (comma separated)"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.authorName}
                                                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        placeholder="e.g. CreditKlick Team"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Sub-description</label>
                                                    <input
                                                        type="text"
                                                        value={formData.subDescription}
                                                        onChange={(e) => setFormData({ ...formData, subDescription: e.target.value })}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                                        placeholder="Short summary displayed below title"
                                                    />
                                                </div>
                                            </div>

                                            {/* Featured Image */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-500 transition-colors bg-white">
                                                    {formData.featuredImageUrl ? (
                                                        <div className="relative group w-full">
                                                            <img
                                                                src={formData.featuredImageUrl}
                                                                alt="Featured"
                                                                className="w-full h-auto rounded-lg shadow-sm"
                                                                style={{ maxWidth: '100%', objectFit: 'contain' }}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setFormData({ ...formData, featuredImage: null, featuredImageUrl: '' })}
                                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>

                                                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <a
                                                                    href={formData.featuredImageUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="bg-black/75 text-white text-xs px-2 py-1 rounded hover:bg-black"
                                                                >
                                                                    View Original
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center py-2">
                                                            <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                                                            <div className="flex text-sm text-gray-600 justify-center items-center">
                                                                <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                                    <span>Upload Image</span>
                                                                    <input
                                                                        type="file"
                                                                        className="sr-only"
                                                                        accept="image/*"
                                                                        onChange={(e) => {
                                                                            const file = e.target.files?.[0]
                                                                            if (file) {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    featuredImage: file,
                                                                                    featuredImageUrl: URL.createObjectURL(file)
                                                                                })
                                                                            }
                                                                        }}
                                                                    />
                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="h-[600px] flex flex-col">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                                <div className="flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
                                                    <ReactQuill
                                                        // @ts-ignore
                                                        ref={quillRef}
                                                        theme="snow"
                                                        value={formData.content}
                                                        onChange={(content: string) => setFormData({ ...formData, content })}
                                                        modules={modules}
                                                        className="h-full flex flex-col"
                                                        placeholder="Write your article here..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'seo' && (
                                        <div className="space-y-8 max-w-2xl mx-auto">
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                <h4 className="text-lg font-semibold mb-4">Search Engine Optimization</h4>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                                        <input
                                                            type="text"
                                                            name="metaTitle"
                                                            value={formData.seo.metaTitle}
                                                            onChange={handleSeoChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                            placeholder="e.g. Best Credit Cards 2024 | CreditKlick"
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">Recommended length: 50-60 characters</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                                                        <textarea
                                                            name="metaDescription"
                                                            value={formData.seo.metaDescription}
                                                            onChange={handleSeoChange}
                                                            rows={3}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                                            placeholder="e.g. Discover the top credit cards in India featuring exclusive rewards, cashback offers, and travel benefits."
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1">Recommended length: 150-160 characters</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Focus Keyword</label>
                                                        <input
                                                            type="text"
                                                            name="focusKeyword"
                                                            value={formData.seo.focusKeyword}
                                                            onChange={handleSeoChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                            placeholder="e.g. best credit cards"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                                                        <input
                                                            type="text"
                                                            name="canonicalUrl"
                                                            value={formData.seo.canonicalUrl}
                                                            onChange={handleSeoChange}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                            placeholder="e.g. https://creditklick.com/blog/best-credit-cards"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            id="noIndex"
                                                            name="noIndex"
                                                            checked={formData.seo.noIndex}
                                                            onChange={handleSeoChange}
                                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <label htmlFor="noIndex" className="text-sm text-gray-700">Discourage search engines from indexing this post (noindex)</label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preview Snippet */}
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                <h4 className="text-lg font-semibold mb-4">Search Preview</h4>
                                                <div className="bg-white p-4 rounded-lg border border-gray-100 max-w-[600px]">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                                            <Globe className="w-4 h-4 text-gray-500" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm text-gray-800">creditklick.com</span>
                                                            <span className="text-xs text-gray-500">https://creditklick.com › blog › {formData.title.toLowerCase().replace(/ /g, '-')}</span>
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate">
                                                        {formData.seo.metaTitle || formData.title || 'Post Title'}
                                                    </h3>
                                                    <p className="text-sm text-[#4d5156] line-clamp-2">
                                                        {formData.seo.metaDescription || formData.excerpt || 'Please provide a meta description to see how this result will appear in search.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'links' && (
                                        <div className="space-y-6 max-w-3xl mx-auto">
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-lg font-semibold">External Backlinks</h4>
                                                    <button
                                                        onClick={addExternalLink}
                                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Link
                                                    </button>
                                                </div>

                                                {formData.externalLinks.length === 0 ? (
                                                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                                        No external links added
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        {formData.externalLinks.map((link, index) => (
                                                            <div key={index} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                                <div className="flex-1 space-y-3">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="URL"
                                                                        value={link.url}
                                                                        onChange={(e) => updateExternalLink(index, 'url', e.target.value)}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Anchor Text"
                                                                        value={link.anchorText}
                                                                        onChange={(e) => updateExternalLink(index, 'anchorText', e.target.value)}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                                    />
                                                                </div>
                                                                <button
                                                                    onClick={() => removeExternalLink(index)}
                                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'cta' && (
                                        <div className="space-y-6 max-w-3xl mx-auto">
                                            {/* Logo Upload Section */}
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                {/* Banner Logo Upload - Prominently displayed */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner Logo / Image</label>
                                                    <div className="flex items-center gap-4 p-4 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50">
                                                        {formData.ctaBanner.customIconUrl ? (
                                                            <div className="relative group">
                                                                <img
                                                                    src={formData.ctaBanner.customIconUrl}
                                                                    alt="Banner Logo"
                                                                    className="w-20 h-20 object-contain rounded-lg bg-white border border-gray-200 shadow-sm"
                                                                />
                                                                <button
                                                                    onClick={() => setFormData({
                                                                        ...formData,
                                                                        ctaBanner: { ...formData.ctaBanner, customIconUrl: '', iconType: 'credit-score' }
                                                                    })}
                                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                                                >
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="w-20 h-20 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                                                <ImageIcon className="w-8 h-8 text-gray-400" />
                                                            </div>
                                                        )}

                                                        <div className="flex-1">
                                                            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                                                <ImageIcon className="w-4 h-4" />
                                                                Upload Logo
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={async (e) => {
                                                                        const file = e.target.files?.[0]
                                                                        if (file) {
                                                                            const formDataPayload = new FormData()
                                                                            formDataPayload.append('image', file)

                                                                            const loadingToast = toast.loading('Uploading logo...')
                                                                            try {
                                                                                const response = await uploadAPI.uploadImage(formDataPayload)
                                                                                const url = response.data.data.url

                                                                                setFormData(prev => ({
                                                                                    ...prev,
                                                                                    ctaBanner: {
                                                                                        ...prev.ctaBanner,
                                                                                        customIconUrl: url,
                                                                                        iconType: 'custom'
                                                                                    }
                                                                                }))
                                                                                toast.dismiss(loadingToast)
                                                                                toast.success('Logo uploaded successfully!')
                                                                            } catch (error) {
                                                                                toast.dismiss(loadingToast)
                                                                                toast.error('Upload failed')
                                                                                console.error(error)
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </label>
                                                            <p className="text-xs text-gray-500 mt-2">Recommended: PNG with transparent background, 200x200px</p>
                                                            {formData.ctaBanner.customIconUrl && (
                                                                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                                                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                                    Custom logo active
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Banner Content */}
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                <h4 className="text-lg font-semibold mb-4">Banner Content</h4>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title Line 1</label>
                                                            <input
                                                                type="text"
                                                                value={formData.ctaBanner.title}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    ctaBanner: { ...formData.ctaBanner, title: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                                placeholder="Check CIBIL Score &"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle Line 2</label>
                                                            <input
                                                                type="text"
                                                                value={formData.ctaBanner.subtitle}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    ctaBanner: { ...formData.ctaBanner, subtitle: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                                placeholder="Report worth ₹1,200"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Highlight Text (Green)</label>
                                                            <input
                                                                type="text"
                                                                value={formData.ctaBanner.highlight}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    ctaBanner: { ...formData.ctaBanner, highlight: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                                placeholder="Absolutely FREE"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Icon (Upload)</label>
                                                            <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                                                                {formData.ctaBanner.customIconUrl ? (
                                                                    <div className="relative group">
                                                                        <img
                                                                            src={formData.ctaBanner.customIconUrl}
                                                                            alt="Banner Icon"
                                                                            className="w-14 h-14 object-contain rounded-lg bg-white border border-gray-200"
                                                                        />
                                                                        <button
                                                                            onClick={() => setFormData({
                                                                                ...formData,
                                                                                ctaBanner: { ...formData.ctaBanner, customIconUrl: '' }
                                                                            })}
                                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            <X className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="w-14 h-14 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                                                        <ImageIcon className="w-6 h-6 text-gray-400" />
                                                                    </div>
                                                                )}

                                                                <div className="flex-1">
                                                                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                                                                        <ImageIcon className="w-4 h-4" />
                                                                        Upload Icon
                                                                        <input
                                                                            type="file"
                                                                            accept="image/*"
                                                                            className="hidden"
                                                                            onChange={async (e) => {
                                                                                const file = e.target.files?.[0]
                                                                                if (file) {
                                                                                    const formDataPayload = new FormData()
                                                                                    formDataPayload.append('image', file)

                                                                                    const loadingToast = toast.loading('Uploading icon...')
                                                                                    try {
                                                                                        const response = await uploadAPI.uploadImage(formDataPayload)
                                                                                        const url = response.data.data.url

                                                                                        setFormData(prev => ({
                                                                                            ...prev,
                                                                                            ctaBanner: {
                                                                                                ...prev.ctaBanner,
                                                                                                customIconUrl: url,
                                                                                                iconType: 'custom'
                                                                                            }
                                                                                        }))
                                                                                        toast.dismiss(loadingToast)
                                                                                        toast.success('Icon uploaded!')
                                                                                    } catch (error) {
                                                                                        toast.dismiss(loadingToast)
                                                                                        toast.error('Upload failed')
                                                                                        console.error(error)
                                                                                    }
                                                                                }
                                                                            }}
                                                                        />
                                                                    </label>
                                                                    <p className="text-xs text-gray-500 mt-1">PNG recommended</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Offer Text (Below banner)</label>
                                                        <input
                                                            type="text"
                                                            value={formData.ctaBanner.offerText}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                ctaBanner: { ...formData.ctaBanner, offerText: e.target.value }
                                                            })}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                            placeholder="Chance to get Accidental Cover up to ₹1Lakh & more"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Form Settings */}
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                <h4 className="text-lg font-semibold mb-4">Form & Button Settings</h4>
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
                                                            <input
                                                                type="text"
                                                                value={formData.ctaBanner.formTitle}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    ctaBanner: { ...formData.ctaBanner, formTitle: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                                placeholder="Let's Get Started"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                                                            <input
                                                                type="text"
                                                                value={formData.ctaBanner.buttonText}
                                                                onChange={(e) => setFormData({
                                                                    ...formData,
                                                                    ctaBanner: { ...formData.ctaBanner, buttonText: e.target.value }
                                                                })}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                                placeholder="Check Free Credit Score"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL</label>
                                                        <input
                                                            type="text"
                                                            value={formData.ctaBanner.redirectUrl}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                ctaBanner: { ...formData.ctaBanner, redirectUrl: e.target.value }
                                                            })}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                            placeholder="/credit-score"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Consent Text</label>
                                                        <textarea
                                                            value={formData.ctaBanner.consentText}
                                                            onChange={(e) => setFormData({
                                                                ...formData,
                                                                ctaBanner: { ...formData.ctaBanner, consentText: e.target.value }
                                                            })}
                                                            rows={2}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                                                            placeholder="I hereby appoint..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    )}

                                    {activeTab === 'settings' && (
                                        <div className="space-y-6 max-w-2xl mx-auto">


                                            {/* Post Info (Read-only) */}
                                            {editingPost && (
                                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                                    <h4 className="text-lg font-semibold mb-4">Post Information</h4>
                                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                                        <div>
                                                            <span className="text-gray-500">Slug:</span>
                                                            <span className="ml-2 text-gray-900">{editingPost.slug}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Views:</span>
                                                            <span className="ml-2 text-gray-900">{editingPost.views || 0}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Created:</span>
                                                            <span className="ml-2 text-gray-900">
                                                                {editingPost.createdAt ? new Date(editingPost.createdAt).toLocaleString() : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
