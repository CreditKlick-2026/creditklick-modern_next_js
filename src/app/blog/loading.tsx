export default function LoadingBlogList() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Skeleton Hero Banner */}
                <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 md:p-12 mb-12 animate-pulse text-center">
                    <div className="w-64 h-10 bg-white/20 rounded-lg mx-auto mb-4"></div>
                    <div className="w-96 max-w-full h-6 bg-white/10 rounded-lg mx-auto"></div>
                </div>

                {/* Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                            <div className="w-full h-48 bg-gray-200"></div>
                            <div className="p-6 space-y-3">
                                <div className="w-20 h-4 bg-blue-100 rounded-full"></div>
                                <div className="w-full h-6 bg-gray-200 rounded"></div>
                                <div className="w-4/5 h-6 bg-gray-200 rounded"></div>
                                <div className="w-full h-4 bg-gray-100 rounded mt-4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
