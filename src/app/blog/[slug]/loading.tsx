export default function LoadingBlogPost() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Skeleton Header */}
                <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm mb-8 animate-pulse">
                    <div className="w-24 h-6 bg-blue-100 rounded-full mb-4"></div>
                    <div className="w-3/4 h-10 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="w-1/2 h-6 bg-gray-100 rounded-lg mb-6"></div>
                    <div className="flex items-center gap-4 border-t pt-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="w-32 h-4 bg-gray-200 rounded"></div>
                            <div className="w-24 h-3 bg-gray-100 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Skeleton Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="w-full h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
                        <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm animate-pulse">
                            <div className="w-full h-4 bg-gray-200 rounded"></div>
                            <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                            <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
                            <div className="w-full h-4 bg-gray-200 rounded mt-6"></div>
                            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                    {/* Skeleton Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4 animate-pulse">
                            <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex gap-3 items-center">
                                    <div className="w-16 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="w-full h-3 bg-gray-200 rounded"></div>
                                        <div className="w-2/3 h-3 bg-gray-100 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
