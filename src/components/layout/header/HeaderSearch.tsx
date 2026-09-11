"use client"

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Post } from '@/types'

interface HeaderSearchProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    isSearchOpen: boolean
    setIsSearchOpen: (open: boolean) => void
    searchResults: Post[]
    isSearching: boolean
    onSearchSubmit: (e: React.FormEvent) => void
    onResultClick: (slug: string) => void
}

export function HeaderSearch({
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    searchResults,
    isSearching,
    onSearchSubmit,
    onResultClick
}: HeaderSearchProps) {
    const searchRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false)
            }
        }

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSearchOpen, setIsSearchOpen])

    return (
        <div className="relative z-50" ref={searchRef}>
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                        <motion.form
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 220, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onSubmit={onSearchSubmit}
                            className="overflow-hidden bg-white shadow-lg rounded-full border border-gray-200"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-4 pr-9 py-2 text-xs focus:outline-none bg-transparent"
                                autoFocus
                            />
                            {isSearching && (
                                <Loader2 className="absolute right-3 top-2.5 h-3.5 w-3.5 animate-spin text-blue-500" />
                            )}
                        </motion.form>
                    </div>
                )}
            </AnimatePresence>

            {isSearchOpen && searchQuery.length >= 2 && searchResults.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-[60]"
                >
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 mb-1">
                        Top Results
                    </div>
                    {searchResults.map((post) => (
                        <div
                            key={post._id}
                            onClick={() => onResultClick(post.slug)}
                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 flex items-start gap-3 transition-colors"
                        >
                            <div>
                                <h4 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                                    {post.title}
                                </h4>
                                {post.category && <span className="text-xs text-blue-500">{post.category}</span>}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}

            <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
                className={cn(
                    'p-2 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center',
                    isSearchOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                )}
            >
                <Search className="w-5 h-5" />
            </button>
        </div>
    )
}
