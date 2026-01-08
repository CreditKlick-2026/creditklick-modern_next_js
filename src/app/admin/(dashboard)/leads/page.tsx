"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Download,
    Trash2,
    Phone,
    Mail,
    Calendar,
    MessageSquare,
    X,
    Loader2,
    RefreshCw
} from 'lucide-react'
import { leadsAPI } from '@/services/api'
import toast from 'react-hot-toast'
import axios from 'axios'

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'lost']
const INTERESTS = ['Credit Card', 'Personal Loan', 'Home Loan', 'Business Loan', 'Credit Score', 'Credit Refine', 'Other']

interface Note {
    text: string
    createdAt: string
}

interface Lead {
    _id: string
    name: string
    email?: string
    phone: string
    source?: string
    interest?: string
    status: string
    createdAt: string
    notes?: Note[]
}

export default function LeadsManagement() {
    const router = useRouter()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 })
    const [filters, setFilters] = useState({ search: '', status: '', interest: '' })
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [noteText, setNoteText] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchLeads()
    }, [pagination.page, filters])

    const fetchLeads = async () => {
        setLoading(true)
        try {
            const params: Record<string, unknown> = {
                page: pagination.page,
                limit: pagination.limit,
                sortBy: 'createdAt',
                sortOrder: 'desc'
            }

            if (filters.search) params.search = filters.search
            if (filters.status) params.status = filters.status
            if (filters.interest) params.interest = filters.interest

            const response = await leadsAPI.getAll(params)

            if (response.data.success) {
                setLeads(response.data.data.leads || [])
                setPagination(prev => ({
                    ...prev,
                    total: response.data.data.pagination?.total || 0
                }))
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Fetch leads error:', error)
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                router.push('/admin/login')
            } else {
                toast.error('Failed to fetch leads')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleStatusChange = async (leadId: string, newStatus: string) => {
        try {
            const response = await leadsAPI.update(leadId, { status: newStatus })
            if (response.data.success) {
                setLeads(leads.map(lead =>
                    lead._id === leadId ? { ...lead, status: newStatus } : lead
                ))
                toast.success('Status updated')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error)
            toast.error('Failed to update status')
        }
    }

    const handleAddNote = async () => {
        if (!noteText.trim() || !selectedLead) return

        setSubmitting(true)
        try {
            const response = await leadsAPI.addNote(selectedLead._id, noteText)
            if (response.data.success) {
                toast.success('Note added')
                setNoteText('')
                setShowModal(false)
                fetchLeads() // Refresh to see new note in list if needed, or update locally
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error)
            toast.error('Failed to add note')
        } finally {
            setSubmitting(false)
        }
    }

    const handleDelete = async (leadId: string) => {
        if (!confirm('Are you sure you want to delete this lead?')) return

        try {
            const response = await leadsAPI.delete(leadId)
            if (response.data.success) {
                setLeads(leads.filter(lead => lead._id !== leadId))
                toast.success('Lead deleted')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error)
            toast.error('Failed to delete lead')
        }
    }

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            new: 'bg-blue-100 text-blue-700 border-blue-200',
            contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            qualified: 'bg-purple-100 text-purple-700 border-purple-200',
            converted: 'bg-green-100 text-green-700 border-green-200',
            lost: 'bg-red-100 text-red-700 border-red-200'
        }
        return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
    }

    const totalPages = Math.ceil(pagination.total / pagination.limit)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
                    <p className="text-gray-500">Manage and track all your leads</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchLeads}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="">All Statuses</option>
                        {STATUSES.map(status => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>

                    {/* Interest Filter */}
                    <select
                        value={filters.interest}
                        onChange={(e) => setFilters({ ...filters, interest: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="">All Interests</option>
                        {INTERESTS.map(interest => (
                            <option key={interest} value={interest}>{interest}</option>
                        ))}
                    </select>

                    {/* Clear Filters */}
                    <button
                        onClick={() => setFilters({ search: '', status: '', interest: '' })}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                        <X className="w-4 h-4" />
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Leads List - Responsive */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Interest</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                                        <p className="text-gray-500 mt-2">Loading leads...</p>
                                    </td>
                                </tr>
                            ) : leads.length > 0 ? (
                                leads.map((lead) => (
                                    <tr key={lead._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{lead.name}</div>
                                            <div className="text-sm text-gray-500">{lead.source || 'Website'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-4 h-4" />
                                                {lead.phone}
                                            </div>
                                            {lead.email && (
                                                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                                                    <Mail className="w-4 h-4" />
                                                    {lead.email}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-700">{lead.interest || 'General'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer ${getStatusColor(lead.status)}`}
                                            >
                                                {STATUSES.map(status => (
                                                    <option key={status} value={status}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => { setSelectedLead(lead); setShowModal(true) }}
                                                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    title="Add Note"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lead._id)}
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
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No leads found
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
                            Loading leads...
                        </div>
                    ) : leads.length > 0 ? (
                        leads.map((lead) => (
                            <div key={lead._id} className="p-4 space-y-4 bg-white">
                                {/* Header: Name + Status */}
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">{lead.name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">{lead.source || 'Website'}</p>
                                    </div>
                                    <select
                                        value={lead.status}
                                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                                        className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer border-transparent ${getStatusColor(lead.status)}`}
                                    >
                                        {STATUSES.map(status => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Details Block */}
                                <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm">
                                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                                        <span className="text-gray-500 text-xs uppercase font-medium">Interest</span>
                                        <span className="font-medium text-gray-800">{lead.interest || 'General'}</span>
                                    </div>
                                    <div className="space-y-1 pt-1">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-3.5 h-3.5" />
                                            <span>{lead.phone}</span>
                                        </div>
                                        {lead.email && (
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail className="w-3.5 h-3.5" />
                                                <span className="truncate">{lead.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer & Actions */}
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setSelectedLead(lead); setShowModal(true) }}
                                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 flex items-center gap-1.5 transition-colors"
                                        >
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            {lead.notes?.length ? `${lead.notes.length} Notes` : 'Note'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(lead._id)}
                                            className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No leads found.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                            {pagination.total} leads
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page >= totalPages}
                                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Add Note Modal */}
            <AnimatePresence>
                {showModal && selectedLead && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowModal(false)}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold">Add Note - {selectedLead.name}</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Existing Notes */}
                            {selectedLead.notes && selectedLead.notes.length > 0 && (
                                <div className="mb-4 max-h-40 overflow-y-auto">
                                    <p className="text-xs text-gray-500 mb-2">Previous Notes:</p>
                                    {selectedLead.notes.map((note, idx) => (
                                        <div key={idx} className="text-sm bg-gray-50 p-2 rounded mb-2">
                                            <p>{note.text}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {new Date(note.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <textarea
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Enter your note..."
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddNote}
                                    disabled={submitting || !noteText.trim()}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Add Note
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
