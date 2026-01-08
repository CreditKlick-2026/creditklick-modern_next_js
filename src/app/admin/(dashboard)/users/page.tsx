"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Plus,
    Edit,
    Trash2,
    X,
    Loader2,
    RefreshCw,
    Users,
    Phone,
    Check,
    Eye,
    Download,
    TrendingUp,
    UserCheck,
    UserX,
    Calendar,
    Mail,
    MapPin,
    Shield,
    Activity,
    BarChart3,
    PieChart,
    FileDown
} from 'lucide-react'
import api from '@/services/api'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import axios from 'axios'

const ROLES = ['user', 'editor', 'admin', 'super_admin']

interface User {
    _id: string
    name?: {
        first: string
        last: string
    }
    email?: string
    phone?: string
    role?: string
    isActive?: boolean
    isVerified?: boolean
    lastLogin?: string
    loginCount?: number
    createdAt: string
    address?: {
        line1?: string
        line2?: string
        city?: string
        state?: string
        pincode?: string
    }
    dob?: string
    gender?: string
}

interface UserFormData {
    email: string
    phone: string
    firstName: string
    lastName: string
    role: string
    password?: string
    isActive: boolean
}

interface UserStats {
    overview: {
        totalUsers: number
        activeUsers: number
        inactiveUsers: number
        verifiedUsers: number
        unverifiedUsers: number
        usersWithCreditReport: number
        recentLogins: number
    }
    growth: {
        newUsersToday: number
        newUsersThisWeek: number
        newUsersThisMonth: number
    }
    usersByRole: Record<string, number>
    charts: {
        dailyRegistrations: { date: string; count: number }[]
        monthlyRegistrations: { month: string; count: number }[]
    }
}

interface UserDetails {
    user: User & {
        fullName?: string
        permissions?: string[]
        isEmailVerified?: boolean
        avatar?: { url: string }
        currentMonth?: string
        lastReportFetch?: string
        updatedAt?: string
    }
    activitySummary: {
        accountAge: number
        lastLoginDaysAgo: number | null
        totalLogins: number
        hasCreditReport: boolean
        lastReportFetchDaysAgo: number | null
    }
}

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, subtext }: {
    title: string
    value: number | string
    icon: any
    color: string
    subtext?: string
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    >
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-5 h-5 text-white" />
            </div>
        </div>
    </motion.div>
)

// Simple Bar Chart Component
const BarChart = ({ data, title }: { data: { label: string; value: number }[]; title: string }) => {
    const maxValue = Math.max(...data.map(d => d.value), 1)

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                {title}
            </h3>
            <div className="flex items-end gap-2 h-40 overflow-x-auto pb-2">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 group min-w-[2.5rem]">
                        <div className="text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            {item.value}
                        </div>
                        <div
                            className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 transition-all rounded-t-md cursor-pointer"
                            style={{ height: `${Math.max(10, (item.value / maxValue) * 100)}%` }}
                        />
                        <div className="text-[10px] text-gray-400 whitespace-nowrap">
                            {item.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Donut Chart Component
const DonutChart = ({ data, title }: { data: { label: string; value: number; color: string }[]; title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let currentAngle = 0

    const createArcPath = (startAngle: number, endAngle: number) => {
        const startX = 50 + 35 * Math.cos((startAngle - 90) * Math.PI / 180)
        const startY = 50 + 35 * Math.sin((startAngle - 90) * Math.PI / 180)
        const endX = 50 + 35 * Math.cos((endAngle - 90) * Math.PI / 180)
        const endY = 50 + 35 * Math.sin((endAngle - 90) * Math.PI / 180)
        const largeArc = endAngle - startAngle > 180 ? 1 : 0
        return `M 50 50 L ${startX} ${startY} A 35 35 0 ${largeArc} 1 ${endX} ${endY} Z`
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-purple-600" />
                {title}
            </h3>
            <div className="flex items-center gap-6">
                <svg viewBox="0 0 100 100" className="w-32 h-32">
                    {data.map((item, index) => {
                        const angle = (item.value / total) * 360
                        const path = createArcPath(currentAngle, currentAngle + angle)
                        currentAngle += angle
                        return (
                            <path
                                key={index}
                                d={path}
                                fill={item.color}
                                className="hover:opacity-80 transition-opacity cursor-pointer"
                            />
                        )
                    })}
                    <circle cx="50" cy="50" r="20" fill="white" />
                    <text x="50" y="52" textAnchor="middle" className="text-sm font-bold fill-gray-700">
                        {total}
                    </text>
                </svg>
                <div className="space-y-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-sm text-gray-600">{item.label}: {item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function UsersManagement() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [statsLoading, setStatsLoading] = useState(true)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
    const [filters, setFilters] = useState({ search: '', role: '' })
    const [showModal, setShowModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [editingUser, setEditingUser] = useState<User | null>(null)
    const [selectedUserDetails, setSelectedUserDetails] = useState<UserDetails | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [exportLoading, setExportLoading] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentUser, setCurrentUser] = useState<any>(null)
    const [stats, setStats] = useState<UserStats | null>(null)
    const [showAnalytics, setShowAnalytics] = useState(true)

    const [formData, setFormData] = useState<UserFormData>({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        role: 'user',
        password: '',
        isActive: true
    })

    useEffect(() => {
        const storedUser = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : {}
        setCurrentUser(storedUser)
        fetchUsers()
        fetchStats()
    }, [pagination.page, filters])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const params: Record<string, unknown> = {
                page: pagination.page,
                limit: pagination.limit
            }

            if (filters.search) params.search = filters.search
            if (filters.role) params.role = filters.role

            const response = await api.get('/users', { params })

            if (response.data.success) {
                setUsers(response.data.data.users || [])
                setPagination(prev => ({
                    ...prev,
                    total: response.data.data.pagination?.total || 0
                }))
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Fetch users error:', error)
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    router.push('/admin/login')
                } else if (error.response?.status === 403) {
                    toast.error('You do not have permission to view users')
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        setStatsLoading(true)
        try {
            const response = await api.get('/users/stats')
            if (response.data.success) {
                setStats(response.data.data)
            }
        } catch (error) {
            console.error('Fetch stats error:', error)
        } finally {
            setStatsLoading(false)
        }
    }

    const fetchUserDetails = async (userId: string) => {
        try {
            const response = await api.get(`/users/${userId}/details`)
            if (response.data.success) {
                setSelectedUserDetails(response.data.data)
                setShowDetailsModal(true)
            }
        } catch (error) {
            console.error('Fetch user details error:', error)
            toast.error('Failed to fetch user details')
        }
    }

    const handleExportPDF = async () => {
        setExportLoading(true)
        try {
            const response = await api.get('/users/export', {
                params: {
                    role: filters.role || undefined,
                    format: 'json'
                }
            })

            if (response.data.success) {
                const exportData = response.data.data

                // Create PDF content
                const pdfContent = generatePDFContent(exportData)

                // Create and download PDF
                const blob = new Blob([pdfContent], { type: 'text/html' })
                const url = window.URL.createObjectURL(blob)
                const printWindow = window.open(url, '_blank')

                if (printWindow) {
                    printWindow.onload = () => {
                        printWindow.print()
                    }
                }

                toast.success(`Exported ${exportData.totalCount} users`)
            }
        } catch (error) {
            console.error('Export error:', error)
            toast.error('Failed to export users')
        } finally {
            setExportLoading(false)
        }
    }

    const handleExportCSV = async () => {
        setExportLoading(true)
        try {
            const response = await api.get('/users/export', {
                params: {
                    role: filters.role || undefined,
                    format: 'json'
                }
            })

            if (response.data.success) {
                const exportData = response.data.data.users

                // Generate CSV
                const headers = ['Name', 'Email', 'Phone', 'Role', 'Status', 'Verified', 'Last Login', 'Total Logins', 'Registered On']
                const csvContent = [
                    headers.join(','),
                    ...exportData.map((user: any) => [
                        `"${user.name}"`,
                        `"${user.email}"`,
                        `"${user.phone}"`,
                        user.role,
                        user.status,
                        user.verified,
                        `"${user.lastLogin}"`,
                        user.totalLogins,
                        `"${user.registeredOn}"`
                    ].join(','))
                ].join('\n')

                // Download CSV
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`
                link.click()

                toast.success(`Exported ${exportData.length} users as CSV`)
            }
        } catch (error) {
            console.error('Export error:', error)
            toast.error('Failed to export users')
        } finally {
            setExportLoading(false)
        }
    }

    const generatePDFContent = (data: any) => {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Users Report - CreditKlick</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #1e40af; text-align: center; }
                .header { display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th { background: #3b82f6; color: white; padding: 12px; text-align: left; }
                td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
                tr:hover { background: #f3f4f6; }
                .footer { margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px; }
                .stats { display: flex; gap: 20px; margin-bottom: 20px; }
                .stat-box { background: #f3f4f6; padding: 15px; border-radius: 8px; flex: 1; text-align: center; }
                .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
                .stat-label { font-size: 12px; color: #6b7280; }
                .status-active { color: #16a34a; font-weight: 600; }
                .status-inactive { color: #dc2626; font-weight: 600; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1>👥 Users Report</h1>
                    <p style="color: #6b7280;">CreditKlick Admin Dashboard</p>
                </div>
                <div style="text-align: right;">
                    <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Total Users:</strong> ${data.totalCount}</p>
                </div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.users.map((user: any, index: number) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                            <td>${user.role}</td>
                            <td class="${user.status === 'Active' ? 'status-active' : 'status-inactive'}">${user.status}</td>
                            <td>${user.lastLogin}</td>
                            <td>${user.registeredOn}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            
            <div class="footer">
                <p>© ${new Date().getFullYear()} CreditKlick. All rights reserved.</p>
                <p>This report is confidential and for internal use only.</p>
            </div>
        </body>
        </html>
        `
    }

    const handleCreate = () => {
        setEditingUser(null)
        setFormData({
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            role: 'user',
            password: '',
            isActive: true
        })
        setShowModal(true)
    }

    const handleEdit = (user: User) => {
        setEditingUser(user)
        setFormData({
            email: user.email || '',
            phone: user.phone || '',
            firstName: user.name?.first || '',
            lastName: user.name?.last || '',
            role: user.role || 'user',
            password: '',
            isActive: user.isActive !== false
        })
        setShowModal(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.email && !formData.phone) {
            toast.error('Email or phone is required')
            return
        }

        setSubmitting(true)
        try {
            const payload: Record<string, unknown> = {
                email: formData.email,
                phone: formData.phone,
                name: {
                    first: formData.firstName,
                    last: formData.lastName
                },
                role: formData.role,
                isActive: formData.isActive
            }

            if (formData.password) {
                payload.password = formData.password
            }

            let response
            if (editingUser) {
                response = await api.put(`/users/${editingUser._id}`, payload)
            } else {
                response = await api.post('/users', payload)
            }

            if (response.data.success) {
                toast.success(editingUser ? 'User updated' : 'User created')
                setShowModal(false)
                fetchUsers()
                fetchStats()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Submit error:', error)
            toast.error(error.response?.data?.message || 'Failed to save user')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        try {
            const response = await api.delete(`/users/${userId}`)
            if (response.data.success) {
                setUsers(users.filter(user => user._id !== userId))
                toast.success('User deleted')
                fetchStats()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to delete user')
        }
    }

    const toggleActive = async (userId: string, currentStatus: boolean = true) => {
        try {
            const response = await api.put(`/users/${userId}`, { isActive: !currentStatus })
            if (response.data.success) {
                setUsers(users.map(user =>
                    user._id === userId ? { ...user, isActive: !currentStatus } : user
                ))
                toast.success(`User ${!currentStatus ? 'activated' : 'deactivated'}`)
                fetchStats()
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to update user status')
        }
    }

    const getRoleColor = (role?: string) => {
        const colors: Record<string, string> = {
            user: 'bg-gray-100 text-gray-700',
            editor: 'bg-blue-100 text-blue-700',
            admin: 'bg-purple-100 text-purple-700',
            super_admin: 'bg-red-100 text-red-700'
        }
        return (role && colors[role]) || 'bg-gray-100 text-gray-700'
    }

    const totalPages = Math.ceil(pagination.total / pagination.limit)

    // Prepare chart data
    const dailyChartData = stats?.charts?.dailyRegistrations?.slice(-14).map(item => ({
        label: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: item.count
    })) || []

    const roleChartData = stats?.usersByRole ? Object.entries(stats.usersByRole).map(([role, count], index) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' '),
        value: count,
        color: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][index % 4]
    })) : []

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500">Manage user accounts, view analytics, and export data</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${showAnalytics ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                    </button>
                    <div className="relative group">
                        <button
                            disabled={exportLoading}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            {exportLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <FileDown className="w-4 h-4" />
                            )}
                            Export
                        </button>
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button
                                onClick={handleExportPDF}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Download className="w-4 h-4 text-red-500" />
                                Export PDF
                            </button>
                            <button
                                onClick={handleExportCSV}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                            >
                                <Download className="w-4 h-4 text-green-500" />
                                Export CSV
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => { fetchUsers(); fetchStats(); }}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    {currentUser?.role === 'super_admin' && (
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4" />
                            Add User
                        </button>
                    )}
                </div>
            </div>

            {/* Analytics Section */}
            <AnimatePresence>
                {showAnalytics && stats && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                            <StatCard
                                title="Total Users"
                                value={stats.overview.totalUsers}
                                icon={Users}
                                color="bg-blue-500"
                            />
                            <StatCard
                                title="Active"
                                value={stats.overview.activeUsers}
                                icon={UserCheck}
                                color="bg-green-500"
                            />
                            <StatCard
                                title="Inactive"
                                value={stats.overview.inactiveUsers}
                                icon={UserX}
                                color="bg-red-500"
                            />
                            <StatCard
                                title="New Today"
                                value={stats.growth.newUsersToday}
                                icon={TrendingUp}
                                color="bg-purple-500"
                                subtext="registrations"
                            />
                            <StatCard
                                title="This Week"
                                value={stats.growth.newUsersThisWeek}
                                icon={Calendar}
                                color="bg-orange-500"
                            />
                            <StatCard
                                title="Recent Logins"
                                value={stats.overview.recentLogins}
                                icon={Activity}
                                color="bg-pink-500"
                                subtext="last 24h"
                            />
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {dailyChartData.length > 0 && (
                                <BarChart data={dailyChartData} title="Daily Registrations (Last 14 Days)" />
                            )}
                            {roleChartData.length > 0 && (
                                <DonutChart data={roleChartData} title="Users by Role" />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    <select
                        value={filters.role}
                        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="">All Roles</option>
                        {ROLES.map(role => (
                            <option key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => setFilters({ search: '', role: '' })}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                        <X className="w-4 h-4" />
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Users List - Responsive */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                        <p className="text-gray-500 mt-2">Loading users...</p>
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {user.name?.first?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {user.name?.first} {user.name?.last}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        ID: {user._id.slice(-6)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email || 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Phone className="w-3 h-3" />
                                                    {user.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getRoleColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleActive(user._id, user.isActive)}
                                                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${user.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                {user.isActive ? (
                                                    <><Check className="w-3 h-3" /> Active</>
                                                ) : (
                                                    <><X className="w-3 h-3" /> Inactive</>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                            <div className="text-xs text-gray-400">
                                                {user.loginCount || 0} logins
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => fetchUserDetails(user._id)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                {currentUser?.role === 'super_admin' && (
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No users found matching your filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
                            Loading users...
                        </div>
                    ) : users.length > 0 ? (
                        users.map((user) => (
                            <div key={user._id} className="p-4 space-y-4 bg-white">
                                {/* Header: Avatar + Name + Role */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                                            {user.name?.first?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">
                                                {user.name?.first} {user.name?.last}
                                            </div>
                                            <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium uppercase ${getRoleColor(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleActive(user._id, user.isActive)}
                                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${user.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </button>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        <span className="truncate">{user.email || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span>{user.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-200">
                                        <span className="text-xs text-gray-500">Signed up: {new Date(user.createdAt).toLocaleDateString()}</span>
                                        <span className="text-xs text-gray-500">Logins: {user.loginCount || 0}</span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        onClick={() => fetchUserDetails(user._id)}
                                        className="flex-1 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
                                    >
                                        <Eye className="w-4 h-4" /> Details
                                    </button>
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="flex-1 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                                    >
                                        <Edit className="w-4 h-4" /> Edit
                                    </button>
                                    {currentUser?.role === 'super_admin' && (
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 border border-red-100 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No users found.
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Page {pagination.page} of {totalPages} ({pagination.total} users)
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

            {/* User Details Modal */}
            <AnimatePresence>
                {showDetailsModal && selectedUserDetails && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setShowDetailsModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-blue-600" />
                                    User Details
                                </h3>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* User Avatar & Basic Info */}
                                <div className="flex items-start gap-4">
                                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
                                        {selectedUserDetails.user.name?.first?.charAt(0) || selectedUserDetails.user.email?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-gray-900">
                                            {selectedUserDetails.user.fullName || 'Unknown User'}
                                        </h4>
                                        <p className="text-gray-500">{selectedUserDetails.user.email || 'No email'}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(selectedUserDetails?.user?.role)}`}>
                                                {selectedUserDetails?.user?.role}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUserDetails?.user?.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {selectedUserDetails.user.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            {selectedUserDetails.user.isVerified && (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                            <Phone className="w-4 h-4" />
                                            Phone
                                        </div>
                                        <p className="font-medium text-gray-900">
                                            {selectedUserDetails.user.phone || 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                            <Mail className="w-4 h-4" />
                                            Email
                                        </div>
                                        <p className="font-medium text-gray-900">
                                            {selectedUserDetails.user.email || 'Not provided'}
                                        </p>
                                    </div>
                                </div>

                                {/* Address */}
                                {selectedUserDetails.user.address && (
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                            <MapPin className="w-4 h-4" />
                                            Address
                                        </div>
                                        <p className="font-medium text-gray-900">
                                            {[
                                                selectedUserDetails?.user?.address?.line1,
                                                selectedUserDetails?.user?.address?.line2,
                                                selectedUserDetails?.user?.address?.city,
                                                selectedUserDetails?.user?.address?.state,
                                                selectedUserDetails?.user?.address?.pincode
                                            ].filter(Boolean).join(', ')}
                                        </p>
                                    </div>
                                )}

                                {/* Activity Summary */}
                                <div>
                                    <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-blue-600" />
                                        Activity Summary
                                    </h5>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                                            <p className="text-2xl font-bold text-blue-600">
                                                {selectedUserDetails.activitySummary.accountAge}
                                            </p>
                                            <p className="text-xs text-gray-500">Days Old</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg text-center">
                                            <p className="text-2xl font-bold text-green-600">
                                                {selectedUserDetails.activitySummary.totalLogins}
                                            </p>
                                            <p className="text-xs text-gray-500">Total Logins</p>
                                        </div>
                                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                                            <p className="text-2xl font-bold text-purple-600">
                                                {selectedUserDetails.activitySummary.lastLoginDaysAgo ?? 'N/A'}
                                            </p>
                                            <p className="text-xs text-gray-500">Last Login (days)</p>
                                        </div>
                                        <div className="bg-orange-50 p-3 rounded-lg text-center">
                                            <p className="text-2xl font-bold text-orange-600">
                                                {selectedUserDetails.activitySummary.hasCreditReport ? 'Yes' : 'No'}
                                            </p>
                                            <p className="text-xs text-gray-500">Credit Report</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Permissions */}
                                {selectedUserDetails?.user?.permissions && selectedUserDetails.user.permissions.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-purple-600" />
                                            Permissions
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedUserDetails.user.permissions.map((perm, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                                    {perm}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Timestamps */}
                                <div className="border-t border-gray-200 pt-4 text-sm text-gray-500">
                                    <div className="flex justify-between">
                                        <span>Created: {new Date(selectedUserDetails.user.createdAt).toLocaleString()}</span>
                                        <span>Updated: {new Date(selectedUserDetails.user.updatedAt || selectedUserDetails.user.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* User Editor Modal */}
            <AnimatePresence>
                {showModal && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl w-full max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">
                                    {editingUser ? 'Edit User' : 'Create New User'}
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        {ROLES.map(role => (
                                            <option key={role} value={role}>
                                                {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password {editingUser && '(leave blank to keep current)'}
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <label htmlFor="isActive" className="text-sm text-gray-700">
                                        Account is active
                                    </label>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {editingUser ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    )
}
