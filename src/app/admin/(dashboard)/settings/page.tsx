"use client"

import { useState } from 'react';
import { adminAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { Trash2, Database, Shield } from 'lucide-react';
import axios from 'axios';

export default function Settings() {
    const [loading, setLoading] = useState(false);

    const handleClearCache = async (type: string) => {
        if (!window.confirm(`Are you sure you want to clear the ${type} cache? This may affect performance temporarily.`)) {
            return;
        }

        setLoading(true);
        try {
            const response = await adminAPI.clearCache({ type });

            if (response.data.success) {
                toast.success(`${type} cache cleared successfully`);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Clear cache error:', error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Failed to clear cache');
            } else {
                toast.error('Failed to clear cache');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-500">Manage application configuration and system maintenance</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        System Maintenance
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage caching and system performance
                    </p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Redis Cache Control */}
                        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
                            <h3 className="font-medium text-gray-900 mb-2">Redis Cache</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Clear specific or all cached data from Redis. Use this if you're seeing outdated content.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => handleClearCache('all')}
                                    disabled={loading}
                                    className="px-3 py-1.5 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-md border border-red-200 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Clear All Cache
                                </button>
                                <button
                                    onClick={() => handleClearCache('posts')}
                                    disabled={loading}
                                    className="px-3 py-1.5 text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
                                >
                                    Clear Posts
                                </button>
                                <button
                                    onClick={() => handleClearCache('leads')}
                                    disabled={loading}
                                    className="px-3 py-1.5 text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-md border border-gray-200 transition-colors"
                                >
                                    Clear Leads
                                </button>
                            </div>
                        </div>

                        {/* Placeholder for other settings */}
                        <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors opacity-60">
                            <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Security Settings
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Two-factor authentication and session management.
                            </p>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
