'use client';

import React from "react";
import { Search } from "lucide-react";

interface BlogFilterHeaderProps {
    categories: string[];
    activeCategory: string;
    searchQuery: string;
    setSearchQuery: (v: string) => void;
    onCategoryClick: (cat: string) => void;
}

export function BlogFilterHeader({
    categories,
    activeCategory,
    searchQuery,
    setSearchQuery,
    onCategoryClick,
}: BlogFilterHeaderProps) {
    return (
        <div className="space-y-6">
            {/* Search Input Bar */}
            <div className="max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search guides, strategies, compliance updates..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e5e7eb] rounded-none text-xs sm:text-sm text-[#1d1d1f] placeholder:text-slate-500 focus:outline-none focus:border-[#0f6841] transition-colors"
                    />
                </div>
            </div>

            {/* Categories Scrollable Strip */}
            <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {categories.map((category) => {
                    const isActive = activeCategory.toLowerCase() === category.toLowerCase();
                    return (
                        <button
                            key={category}
                            onClick={() => onCategoryClick(category)}
                            className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-150 rounded-none border ${
                                isActive
                                    ? "bg-[#0f6841] text-white border-[#0f6841] shadow-2xs"
                                    : "bg-white text-slate-600 border-[#e5e7eb] hover:border-[#0f6841]/40 hover:text-[#1d1d1f]"
                            }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
