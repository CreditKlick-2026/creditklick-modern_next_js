"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, CreditCard, LogOut, Edit, Loader2, ShieldAlert } from 'lucide-react'
import Cookies from 'js-cookie'
import { Button, Card, Input } from '@/components/ui'
import toast from 'react-hot-toast'
import { RevokeConsentModal } from '@/components/layout/RevokeConsentModal'

interface UserData {
    name?: string
    fName?: string
    email?: string
    mobile?: string
    phone?: string
    dob?: string
    pan?: string
    Pan?: string
    pCode?: string
    profession?: string
    gender?: string
}

export default function ProfileClient() {
    const router = useRouter()
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [editData, setEditData] = useState<UserData>({})
    const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false)

    useEffect(() => {
        const userData = Cookies.get('user')
        const cibilData = Cookies.get('cibil')

        if (!userData && !cibilData) {
            router.push('/credit-score')
            return
        }

        if (userData) {
            try {
                const parsed = JSON.parse(userData)
                setUser(parsed)
                setEditData(parsed)
            } catch (e) {
                console.error('Error parsing user data:', e)
            }
        }
        setLoading(false)
    }, [router])

    const handleLogout = () => {
        Cookies.remove('user')
        Cookies.remove('cibil')
        Cookies.remove('token')
        toast.success('Logged out successfully')
        router.push('/')
    }

    const handleSave = () => {
        Cookies.set('user', JSON.stringify(editData), { expires: 7 })
        setUser(editData)
        setEditing(false)
        toast.success('Profile updated successfully')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">Please login to view your profile</p>
                    <Button onClick={() => router.push('/credit-score')}>
                        Check Credit Score
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {user.name || user.fName || 'User'}
                    </h1>
                    <p className="text-gray-600">{user.email || ''}</p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="mb-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                            {!editing ? (
                                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                </Button>
                            ) : (
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                                        Cancel
                                    </Button>
                                    <Button size="sm" onClick={handleSave}>
                                        Save
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <User className="w-4 h-4" /> Full Name
                                </label>
                                {editing ? (
                                    <Input
                                        value={editData.name || editData.fName || ''}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value, fName: e.target.value })}
                                    />
                                ) : (
                                    <p className="font-medium">{user.name || user.fName || 'N/A'}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <Mail className="w-4 h-4" /> Email
                                </label>
                                {editing ? (
                                    <Input
                                        type="email"
                                        value={editData.email || ''}
                                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    />
                                ) : (
                                    <p className="font-medium">{user.email || 'N/A'}</p>
                                )}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <Phone className="w-4 h-4" /> Phone
                                </label>
                                <p className="font-medium">{user.mobile || user.phone || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <Calendar className="w-4 h-4" /> Date of Birth
                                </label>
                                <p className="font-medium">{user.dob || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <CreditCard className="w-4 h-4" /> PAN
                                </label>
                                <p className="font-medium">{user.pan || user.Pan || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    <MapPin className="w-4 h-4" /> Pincode
                                </label>
                                <p className="font-medium">{user.pCode || 'N/A'}</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid md:grid-cols-3 gap-4"
                >
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/report-analysis')}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Credit Report</h3>
                                <p className="text-sm text-gray-600">View your detailed credit analysis</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleLogout}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                                <LogOut className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Logout</h3>
                                <p className="text-sm text-gray-600">Sign out of your account</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-lg border-red-200 bg-red-50/50 transition-shadow" onClick={() => setIsRevokeModalOpen(true)}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <ShieldAlert className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-red-900">Revoke Consent</h3>
                                <p className="text-sm text-red-600">Permanently delete my data</p>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                <RevokeConsentModal
                    isOpen={isRevokeModalOpen}
                    onClose={() => setIsRevokeModalOpen(false)}
                />
            </div>
        </div>
    )
}
