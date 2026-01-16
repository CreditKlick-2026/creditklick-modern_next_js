"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
import { authAPI } from '@/services/api'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

// Asset path
const NextGenImg = '/assets/Images/creditklic_next_gen.png';

export default function AdminLogin() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = Cookies.get('accessToken')
        const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')!) : {}
        if (token && (user.role === 'admin' || user.role === 'super_admin')) {
            router.push('/admin/posts')
        }
    }, [router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)

        // Retry logic for Render cold start
        const tryLogin = async (attempt = 1): Promise<any> => {
            try {
                const response = await authAPI.adminLogin(formData.email, formData.password)
                return response
            } catch (error: any) {
                // If timeout and first attempt, show message and retry
                if (error.code === 'ECONNABORTED' && attempt === 1) {
                    toast.loading('Backend waking up... Retrying...', { id: 'retry' })
                    return tryLogin(2)
                }
                throw error
            }
        }

        try {
            const response = await tryLogin()
            toast.dismiss('retry')
            const data = response.data

            if (data.success) {
                Cookies.set('accessToken', data.data.tokens.accessToken, { expires: 7 })
                Cookies.set('refreshToken', data.data.tokens.refreshToken, { expires: 7 })
                Cookies.set('user', JSON.stringify(data.data.user), { expires: 7 })
                toast.success('Login successful!')
                router.push('/admin/posts')
            }
        } catch (error: any) {
            toast.dismiss('retry')
            console.error('Login error:', error)
            if (error.code === 'ECONNABORTED') {
                toast.error('Server is taking too long. Please wait a moment and try again.')
            } else {
                toast.error(error.response?.data?.message || 'Invalid credentials')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 sm:p-6 font-sans text-slate-900">
            {/* Soft Background Decorative Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-blue-100 flex flex-col md:flex-row overflow-hidden min-h-[500px]"
            >
                {/* Left Side: Branding (Desktop only) */}
                <div className="md:w-5/12 bg-blue-600 p-8 md:p-12 flex flex-col justify-between text-white relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="mb-8"
                        >
                            <img
                                src={NextGenImg}
                                alt="CreditKlick Next Gen"
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </motion.div>
                        <h2 className="text-3xl font-bold mb-4 leading-tight text-white">Admin<br />Control</h2>
                        <p className="text-blue-100/90 text-sm leading-relaxed max-w-[200px]">
                            Securely manage the CreditKlick ecosystem from a central hub.
                        </p>
                    </div>

                    <div className="relative z-10 pt-8 mt-8 border-t border-white/10 hidden md:flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200/60">System Online</span>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="flex-1 p-8 sm:p-10 md:p-12 bg-white flex flex-col justify-center">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-slate-900">Sign In</h3>
                        <p className="text-slate-500 text-sm mt-1">Enter your administrative credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all duration-200">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                    placeholder="admin@creditklick.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all duration-200">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-900"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <span>Sign In Now</span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <Link href="/" className="text-slate-400 text-sm hover:text-blue-600 transition-colors inline-flex items-center gap-2 font-medium group">
                            <span className="group-hover:-translate-x-1 transition-transform italic">←</span> Back to homepage
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
