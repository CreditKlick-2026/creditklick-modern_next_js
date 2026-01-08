"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    Users,
    FileText,
    CreditCard,
    TrendingUp,
    TrendingDown,
    Activity,
    Clock,
    CheckCircle,
    XCircle,
    RefreshCw,
    Loader2
} from 'lucide-react'
import { leadsAPI, authAPI } from '@/services/api'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

interface StatCardProps {
    title: string;
    value: number | string;
    icon: any;
    trend?: 'up' | 'down';
    trendValue?: string;
    color: string;
    loading?: boolean;
}

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, loading }: StatCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mt-2" />
                ) : (
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                )}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center gap-2">
                {trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trendValue}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
            </div>
        )}
    </motion.div>
)

export default function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [stats, setStats] = useState({
        totalLeads: 0,
        newLeads: 0,
        convertedLeads: 0,
        pendingLeads: 0,
        dailyStats: [] as any[]
    })
    const [recentLeads, setRecentLeads] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const fetchDashboardData = async () => {
        setLoading(true)
        try {
            // Fetch leads stats
            const [statsRes, leadsRes] = await Promise.all([
                leadsAPI.getStats(),
                leadsAPI.getAll({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' })
            ])

            if (statsRes.data.success) {
                setStats(statsRes.data.data)
            }

            if (leadsRes.data.success) {
                setRecentLeads(leadsRes.data.data.leads || [])
            }
        } catch (error: any) {
            console.error('Dashboard fetch error:', error)
            if (error.response?.status === 401) {
                Cookies.remove('accessToken')
                router.push('/admin/login')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = Cookies.get('accessToken')
            const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : {}

            if (!token || !['admin', 'super_admin', 'editor'].includes(storedUser.role)) {
                router.push('/admin/login')
                return
            }

            setUser(storedUser)
            await fetchDashboardData()
        }

        checkAuth()
    }, [router])

    const getStatusColor = (status: string) => {
        const colors: any = {
            new: 'bg-blue-100 text-blue-700',
            contacted: 'bg-yellow-100 text-yellow-700',
            qualified: 'bg-purple-100 text-purple-700',
            converted: 'bg-green-100 text-green-700',
            lost: 'bg-red-100 text-red-700'
        }
        return colors[status] || 'bg-gray-100 text-gray-700'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, {user?.name || 'Admin'}</p>
                </div>
                <button
                    onClick={fetchDashboardData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard
                    title="Total Leads"
                    value={stats.totalLeads || 0}
                    icon={Users}
                    color="bg-blue-500"
                    loading={loading}
                />
                <StatCard
                    title="New Leads (Today)"
                    value={stats.newLeads || 0}
                    icon={Activity}
                    trend="up"
                    trendValue="Today"
                    color="bg-green-500"
                    loading={loading}
                />
                <StatCard
                    title="Converted"
                    value={stats.convertedLeads || 0}
                    icon={CheckCircle}
                    color="bg-purple-500"
                    loading={loading}
                />
                <StatCard
                    title="Pending"
                    value={stats.pendingLeads || 0}
                    icon={Clock}
                    color="bg-orange-500"
                    loading={loading}
                />
            </div>

            {/* Daily Leads Stats */}
            {stats.dailyStats && stats.dailyStats.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">New Leads (Datewise)</h2>
                    <div className="overflow-x-auto">
                        <div className="flex items-end gap-4 h-48 min-w-[600px] pb-2">
                            {stats.dailyStats.slice(-14).map((day) => (
                                <div key={day.date} className="flex flex-col items-center gap-2 group min-w-[3rem]">
                                    <div className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {day.count}
                                    </div>
                                    <div
                                        className="w-8 bg-blue-100 hover:bg-blue-500 transition-colors rounded-t-md"
                                        style={{ height: `${Math.max(10, (day.count / Math.max(...stats.dailyStats.map(d => d.count))) * 100)}%` }}
                                    ></div>
                                    <div className="text-xs text-gray-400 rotate-0 whitespace-nowrap">
                                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
                        <Link
                            href="/admin/leads"
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            View All →
                        </Link>
                    </div>
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                    </td>
                                </tr>
                            ) : recentLeads.length > 0 ? (
                                recentLeads.map((lead) => (
                                    <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{lead.name}</div>
                                            <div className="text-sm text-gray-500">{lead.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                                        <td className="px-6 py-4 text-gray-600">{lead.interest || 'General'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No leads found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Recent Leads List */}
                <div className="md:hidden divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-8 text-center">
                            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                        </div>
                    ) : recentLeads.length > 0 ? (
                        recentLeads.map((lead) => (
                            <div key={lead._id} className="p-4 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                                        <p className="text-sm text-gray-500">{lead.email}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                        {lead.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>{lead.phone}</span>
                                    <span>{lead.interest || 'General'}</span>
                                </div>
                                <div className="text-xs text-gray-400">
                                    {new Date(lead.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No leads found
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                    href="/admin/leads"
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <Users className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900">Manage Leads</h3>
                    <p className="text-sm text-gray-500 mt-1">View and manage all leads</p>
                </Link>
                <Link
                    href="/admin/posts"
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <FileText className="w-8 h-8 text-purple-600 mb-4" />
                    <h3 className="font-semibold text-gray-900">Blog Posts</h3>
                    <p className="text-sm text-gray-500 mt-1">Create and edit blog posts</p>
                </Link>
                <Link
                    href="/admin/users"
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                    <CreditCard className="w-8 h-8 text-green-600 mb-4" />
                    <h3 className="font-semibold text-gray-900">User Management</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage user accounts</p>
                </Link>
            </div>
        </div>
    )
}
