"use client"

import { useState, useEffect } from 'react';
import { postsAPI } from '@/services/api';
import { Loader2, Tag, RefreshCw } from 'lucide-react';

interface CategoriesListProps {
    activeCategory?: string
    onSelectCategory?: (category: string) => void
}

export default function CategoriesList({ activeCategory, onSelectCategory }: CategoriesListProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await postsAPI.getCategories();
            if (response.data.success) {
                setCategories(response.data.data || []);
            }
        } catch (error) {
            console.error('Fetch categories error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-blue-600" />
                    Categories
                </h3>
                <button
                    onClick={fetchCategories}
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    title="Refresh Categories"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="p-0">
                {loading ? (
                    <div className="p-8 text-center">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                    </div>
                ) : categories.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {/* All Category Option */}
                        <div
                            className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${!activeCategory ? 'bg-blue-50/50' : ''
                                }`}
                            onClick={() => onSelectCategory?.('')}
                        >
                            <span className={`text-sm font-medium capitalize ${!activeCategory ? 'text-blue-700' : 'text-gray-700'}`}>
                                All Posts
                            </span>
                        </div>

                        {categories.map((cat) => (
                            <div
                                key={cat.category}
                                className={`px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${activeCategory === cat.category ? 'bg-blue-50/50' : ''
                                    }`}
                                onClick={() => onSelectCategory?.(cat.category)}
                            >
                                <span className={`text-sm font-medium capitalize ${activeCategory === cat.category ? 'text-blue-700' : 'text-gray-700'
                                    }`}>
                                    {cat.category.replace(/-/g, ' ')}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {cat.count} posts
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        No categories found
                    </div>
                )}
            </div>
        </div>
    );
}
