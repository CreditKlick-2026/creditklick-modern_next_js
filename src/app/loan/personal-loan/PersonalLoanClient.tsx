"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShieldCheck, Zap, Landmark, BadgePercent, ArrowRight, ArrowLeft, Loader2,
    CheckCircle2, XCircle, ChevronDown, Info, Wallet, Clock, Sparkles, TrendingUp,
} from 'lucide-react'
import { LOAN_DATA_SHARE_CONSENT, LOAN_BUREAU_CONSENT } from '@/lib/loanConsent'

// ─────────────────────────── types ───────────────────────────
interface Offer {
    offerId: number
    lenderName: string
    lenderImage?: string
    lenderCategory?: string
    approvalText?: string
    tags: string[]
    loanAmountApplied?: number
    loanOfferedUpto?: number
    minInterestRate?: number
    maxInterestRate?: number
    emi?: number
    processingFee?: number
    processingFeeLabel?: string
    amountYouWillGet?: number
    totalInterest?: number
    totalPayable?: number
}
interface Rejected { lenderName: string; lenderCategory?: string; reason: string }
interface Result { requestId: string; isEligible: boolean; offers: Offer[]; rejected: Rejected[] }

type FormState = {
    name: string; phone: string; email: string; dob: string
    loanAmount: string; tenureMonths: string
    employmentStatus: '' | 'salaried' | 'self_employed' | 'student'
    monthlyIncome: string; salaryMode: '' | 'bank' | 'cash' | 'cheque' | 'upi'
    companyName: string; pincode: string; officePincode: string
    knowsCreditScore: boolean; consentDataShare: boolean; consentBureau: boolean
}

const INITIAL: FormState = {
    name: '', phone: '', email: '', dob: '',
    loanAmount: '200000', tenureMonths: '24',
    employmentStatus: '', monthlyIncome: '', salaryMode: '',
    companyName: '', pincode: '', officePincode: '',
    knowsCreditScore: false, consentDataShare: false, consentBureau: false,
}

const inr = (n?: number) =>
    typeof n === 'number' && isFinite(n) ? `₹${Math.round(n).toLocaleString('en-IN')}` : '—'

const APPROVAL_STYLE: Record<string, string> = {
    excellent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    high: 'bg-green-50 text-green-700 border-green-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    low: 'bg-orange-50 text-orange-700 border-orange-200',
}
const approvalClass = (t?: string) =>
    APPROVAL_STYLE[(t || '').split(' ')[0]?.toLowerCase()] || 'bg-gray-50 text-gray-600 border-gray-200'

// ─────────────────────────── small UI pieces ───────────────────────────
const Field = ({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: React.ReactNode }) => (
    <label className="block">
        <span className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</span>
        {children}
        {error ? <span className="block mt-1 text-xs text-red-600">{error}</span>
            : hint ? <span className="block mt-1 text-xs text-gray-400">{hint}</span> : null}
    </label>
)

const inputCls = (err?: string) =>
    `w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-gray-900 placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 ${err ? 'border-red-400 focus:ring-red-500/20' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'}`

const Choice = <T extends string>({ value, options, onChange }: { value: T | ''; options: { value: T; label: string }[]; onChange: (v: T) => void }) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((o) => (
            <button
                key={o.value}
                type="button"
                onClick={() => onChange(o.value)}
                className={`h-11 rounded-xl border text-sm font-semibold transition-all ${value === o.value ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'}`}
            >
                {o.label}
            </button>
        ))}
    </div>
)

const Stat = ({ label, value, strong }: { label: string; value: string; strong?: boolean }) => (
    <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">{label}</div>
        <div className={`truncate ${strong ? 'text-lg font-extrabold text-gray-900' : 'text-[15px] font-bold text-gray-800'}`}>{value}</div>
    </div>
)

// ─────────────────────────── offer card ───────────────────────────
function OfferCard({ offer, best, onApply, applying }: { offer: Offer; best: boolean; onApply: () => void; applying: boolean }) {
    const [open, setOpen] = useState(false)
    const roi = offer.minInterestRate !== undefined
        ? offer.maxInterestRate && offer.maxInterestRate !== offer.minInterestRate
            ? `${offer.minInterestRate}% – ${offer.maxInterestRate}%`
            : `${offer.minInterestRate}%`
        : '—'
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl border bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg transition-shadow ${best ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'}`}
        >
            {best && (
                <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow">
                    <Sparkles className="w-3.5 h-3.5" /> Lowest interest
                </span>
            )}
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 rounded-xl border border-gray-100 bg-white flex items-center justify-center overflow-hidden">
                    {offer.lenderImage
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={offer.lenderImage} alt={offer.lenderName} className="w-full h-full object-contain p-1.5" />
                        : <Landmark className="w-6 h-6 text-blue-600" />}
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{offer.lenderName}</h3>
                        {offer.approvalText && (
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${approvalClass(offer.approvalText)}`}>{offer.approvalText}</span>
                        )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                        {offer.lenderCategory && <span className="text-xs text-gray-500">{offer.lenderCategory}</span>}
                        {offer.tags.map((t) => (
                            <span key={t} className="text-[11px] rounded-md bg-blue-50 text-blue-700 px-1.5 py-0.5 font-medium">{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat label="Interest (p.a.)" value={roi} strong />
                <Stat label="Monthly EMI" value={inr(offer.emi)} strong />
                <Stat label="Loan up to" value={inr(offer.loanOfferedUpto)} />
                <Stat label="You get" value={inr(offer.amountYouWillGet)} />
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl bg-gray-50 p-4">
                            <Stat label="Amount applied" value={inr(offer.loanAmountApplied)} />
                            <Stat label="Processing fee" value={`${inr(offer.processingFee)}${offer.processingFeeLabel ? ` (${offer.processingFeeLabel})` : ''}`} />
                            <Stat label="Total interest" value={inr(offer.totalInterest)} />
                            <Stat label="Total payable" value={inr(offer.totalPayable)} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-5 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800">
                    {open ? 'Hide' : 'View'} full cost <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                <button
                    type="button"
                    onClick={onApply}
                    disabled={applying}
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-lg shadow-blue-600/25 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition-all"
                >
                    {applying ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Apply with {offer.lenderName.split(' ')[0]} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </motion.div>
    )
}

// ─────────────────────────── page ───────────────────────────
export default function PersonalLoanClient() {
    const [form, setForm] = useState<FormState>(INITIAL)
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const [result, setResult] = useState<Result | null>(null)
    const [applyingId, setApplyingId] = useState<number | null>(null)
    const [showRejected, setShowRejected] = useState(false)
    const topRef = useRef<HTMLDivElement>(null)
    // Consent wording comes from the backend (same text the app shows and the backend stores)
    const [texts, setTexts] = useState({ dataShare: LOAN_DATA_SHARE_CONSENT, bureau: LOAN_BUREAU_CONSENT, disclosure: '' })
    useEffect(() => {
        fetch('/api/v1/loans/consent-texts')
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => {
                if (j?.success && j.data?.dataShare && j.data?.bureau) {
                    setTexts({ dataShare: j.data.dataShare, bureau: j.data.bureau, disclosure: j.data.disclosure || '' })
                }
            })
            .catch(() => { /* keep built-in text */ })
    }, [])

    const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
        setForm((f) => ({ ...f, [k]: v }))
        setErrors((e) => ({ ...e, [k]: undefined }))
    }

    const maxDob = useMemo(() => {
        const d = new Date(); d.setFullYear(d.getFullYear() - 18)
        return d.toISOString().slice(0, 10)
    }, [])

    const validate = (): boolean => {
        const e: Partial<Record<keyof FormState, string>> = {}
        if (form.name.trim().length < 2) e.name = 'Enter your full name'
        if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number'
        if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.dob) e.dob = 'Enter your date of birth'
        else if (form.dob > maxDob) e.dob = 'You must be at least 18 years old'
        if (!(Number(form.loanAmount) >= 5000)) e.loanAmount = 'Minimum ₹5,000'
        if (!form.employmentStatus) e.employmentStatus = 'Select your employment type'
        if (!(Number(form.monthlyIncome) >= 1000)) e.monthlyIncome = 'Enter your monthly in-hand income'
        if (!form.salaryMode) e.salaryMode = 'Select how you receive income'
        if (form.companyName.trim().length < 2) e.companyName = form.employmentStatus === 'student' ? 'Enter your college / institute' : 'Enter your company / business name'
        if (!/^[1-9]\d{5}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode'
        if (!/^[1-9]\d{5}$/.test(form.officePincode)) e.officePincode = 'Enter a valid 6-digit pincode'
        if (!form.consentDataShare) e.consentDataShare = 'Required to check offers'
        if (!form.consentBureau) e.consentBureau = 'Required to see priced offers'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const submit = async (ev: React.FormEvent) => {
        ev.preventDefault()
        setApiError(null)
        if (!validate()) return
        setLoading(true)
        try {
            const res = await fetch('/api/v1/loans/offers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    loanAmount: Number(form.loanAmount),
                    tenureMonths: Number(form.tenureMonths),
                    monthlyIncome: Number(form.monthlyIncome),
                }),
            })
            const json = await res.json().catch(() => null)
            if (!res.ok || !json?.success) {
                if (json?.field && json.field in form) setErrors((e) => ({ ...e, [json.field]: json.error }))
                throw new Error(json?.error || 'Something went wrong. Please try again.')
            }
            setResult(json.data)
            setShowRejected(false)
            requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        } catch (err) {
            setApiError((err as Error).message)
        } finally {
            setLoading(false)
        }
    }

    const apply = async (offer: Offer) => {
        if (!result) return
        // Open the tab synchronously (avoids popup blockers), navigate it once we have the link
        const tab = window.open('', '_blank')
        setApplyingId(offer.offerId)
        try {
            const res = await fetch('/api/v1/loans/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requestId: result.requestId, offerId: offer.offerId }),
            })
            const json = await res.json().catch(() => null)
            if (!res.ok || !json?.success) throw new Error(json?.error || 'Could not open the lender page')
            if (tab) {
                tab.opener = null
                tab.location.href = json.data.redirectUrl
            } else {
                window.location.href = json.data.redirectUrl
            }
        } catch (err) {
            tab?.close()
            setApiError((err as Error).message)
        } finally {
            setApplyingId(null)
        }
    }

    const lowestRoiId = result?.offers.reduce<Offer | null>(
        (best, o) => (o.minInterestRate !== undefined && (!best || (best.minInterestRate ?? 99) > o.minInterestRate) ? o : best), null
    )?.offerId

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40">
            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-24 sm:pt-32">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold">
                            <Zap className="w-3.5 h-3.5 text-amber-300" /> Offers from multiple banks & NBFCs
                        </span>
                        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight">
                            Compare personal loan offers <span className="text-amber-300">in one go</span>
                        </h1>
                        <p className="mt-4 text-blue-100 text-base sm:text-lg">
                            Fill one short form and see interest rate, EMI, processing fee and the money you actually get from each lender. Apply only where you’re likely to be approved.
                        </p>
                    </motion.div>
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
                        {[
                            { icon: BadgePercent, t: 'Compare ROI & EMI' },
                            { icon: Clock, t: 'Results in seconds' },
                            { icon: ShieldCheck, t: 'Data shared with consent' },
                            { icon: Wallet, t: 'No fee to check' },
                        ].map(({ icon: I, t }) => (
                            <div key={t} className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-3 py-2.5 text-sm font-medium">
                                <I className="w-4 h-4 text-amber-300 shrink-0" /> {t}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Form / Results ── */}
            <section className="relative -mt-14 pb-16">
                <div ref={topRef} className="mx-auto max-w-4xl px-4 scroll-mt-24">
                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.form
                                key="form"
                                onSubmit={submit}
                                noValidate
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-blue-900/5 p-5 sm:p-8"
                            >
                                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">Check your loan offers</h2>
                                <p className="mt-1 text-sm text-gray-500">Takes about a minute. Checking offers does not commit you to a loan.</p>

                                {/* Loan */}
                                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                                    <Field label="Loan amount" error={errors.loanAmount} hint={Number(form.loanAmount) >= 5000 ? inr(Number(form.loanAmount)) : undefined}>
                                        <input inputMode="numeric" className={inputCls(errors.loanAmount)} value={form.loanAmount}
                                            onChange={(e) => set('loanAmount', e.target.value.replace(/\D/g, '').slice(0, 7))} placeholder="200000" />
                                    </Field>
                                    <Field label="Repay in">
                                        <select className={inputCls()} value={form.tenureMonths} onChange={(e) => set('tenureMonths', e.target.value)}>
                                            {[6, 12, 18, 24, 36, 48, 60].map((m) => <option key={m} value={m}>{m} months</option>)}
                                        </select>
                                    </Field>
                                </div>

                                {/* Work */}
                                <div className="mt-6 space-y-5">
                                    <Field label="Employment type" error={errors.employmentStatus}>
                                        <Choice value={form.employmentStatus} onChange={(v) => set('employmentStatus', v)} options={[
                                            { value: 'salaried', label: 'Salaried' },
                                            { value: 'self_employed', label: 'Self-employed' },
                                            { value: 'student', label: 'Student' },
                                        ]} />
                                    </Field>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <Field label="Monthly in-hand income" error={errors.monthlyIncome}>
                                            <input inputMode="numeric" className={inputCls(errors.monthlyIncome)} value={form.monthlyIncome}
                                                onChange={(e) => set('monthlyIncome', e.target.value.replace(/\D/g, '').slice(0, 8))} placeholder="50000" />
                                        </Field>
                                        <Field label={form.employmentStatus === 'self_employed' ? 'Business name' : form.employmentStatus === 'student' ? 'College / institute' : 'Company name'} error={errors.companyName}>
                                            <input className={inputCls(errors.companyName)} value={form.companyName} maxLength={120}
                                                onChange={(e) => set('companyName', e.target.value)} placeholder="ABC Pvt Ltd" />
                                        </Field>
                                    </div>
                                    <Field label="Income received via" error={errors.salaryMode}>
                                        <Choice value={form.salaryMode} onChange={(v) => set('salaryMode', v)} options={[
                                            { value: 'bank', label: 'Bank transfer' },
                                            { value: 'upi', label: 'UPI' },
                                            { value: 'cheque', label: 'Cheque' },
                                            { value: 'cash', label: 'Cash' },
                                        ]} />
                                    </Field>
                                </div>

                                {/* Personal */}
                                <div className="mt-6 grid sm:grid-cols-2 gap-5">
                                    <Field label="Full name (as on PAN)" error={errors.name}>
                                        <input className={inputCls(errors.name)} value={form.name} maxLength={80} autoComplete="name"
                                            onChange={(e) => set('name', e.target.value)} placeholder="Rahul Sharma" />
                                    </Field>
                                    <Field label="Mobile number" error={errors.phone}>
                                        <input inputMode="numeric" className={inputCls(errors.phone)} value={form.phone} autoComplete="tel-national"
                                            onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98XXXXXXXX" />
                                    </Field>
                                    <Field label="Date of birth" error={errors.dob}>
                                        <input type="date" max={maxDob} className={inputCls(errors.dob)} value={form.dob}
                                            onChange={(e) => set('dob', e.target.value)} />
                                    </Field>
                                    <Field label="Email (optional)" error={errors.email}>
                                        <input type="email" className={inputCls(errors.email)} value={form.email} autoComplete="email"
                                            onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
                                    </Field>
                                    <Field label="Home pincode" error={errors.pincode}>
                                        <input inputMode="numeric" className={inputCls(errors.pincode)} value={form.pincode} autoComplete="postal-code"
                                            onChange={(e) => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="110001" />
                                    </Field>
                                    <Field label={form.employmentStatus === 'student' ? 'College pincode' : 'Office pincode'} error={errors.officePincode}>
                                        <input inputMode="numeric" className={inputCls(errors.officePincode)} value={form.officePincode}
                                            onChange={(e) => set('officePincode', e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="110001" />
                                    </Field>
                                </div>

                                {/* Consent */}
                                <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-blue-600" checked={form.knowsCreditScore}
                                            onChange={(e) => set('knowsCreditScore', e.target.checked)} />
                                        <span className="text-sm text-gray-700">I know my credit score</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-blue-600" checked={form.consentDataShare}
                                            onChange={(e) => set('consentDataShare', e.target.checked)} />
                                        <span className={`text-xs leading-relaxed ${errors.consentDataShare ? 'text-red-600' : 'text-gray-600'}`}>{texts.dataShare}</span>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input type="checkbox" className="mt-0.5 h-4 w-4 accent-blue-600" checked={form.consentBureau}
                                            onChange={(e) => set('consentBureau', e.target.checked)} />
                                        <span className={`text-xs leading-relaxed ${errors.consentBureau ? 'text-red-600' : 'text-gray-600'}`}>{texts.bureau}</span>
                                    </label>
                                </div>

                                {apiError && (
                                    <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                        <XCircle className="w-4 h-4 mt-0.5 shrink-0" /> {apiError}
                                    </div>
                                )}

                                <button type="submit" disabled={loading}
                                    className="mt-6 w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-base font-bold shadow-xl shadow-blue-600/25 hover:from-blue-700 hover:to-blue-800 disabled:opacity-70 inline-flex items-center justify-center gap-2 transition-all">
                                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Checking with lenders… this can take up to 30 seconds</> : <>See my loan offers <ArrowRight className="w-5 h-5" /></>}
                                </button>
                                <p className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5" /> Your details are encrypted in transit and shared only with your consent.
                                </p>
                            </motion.form>
                        ) : (
                            <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                <div className="rounded-3xl bg-white border border-gray-100 shadow-xl shadow-blue-900/5 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        {result.isEligible
                                            ? <CheckCircle2 className="w-10 h-10 text-emerald-500 shrink-0" />
                                            : <Info className="w-10 h-10 text-amber-500 shrink-0" />}
                                        <div>
                                            <h2 className="text-xl font-extrabold text-gray-900">
                                                {result.isEligible ? `${result.offers.length} lender${result.offers.length > 1 ? 's' : ''} can offer you a loan` : 'No offers right now'}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                For {inr(Number(form.loanAmount))} over {form.tenureMonths} months · sorted by lowest interest
                                            </p>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => { setResult(null); setApiError(null) }}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800">
                                        <ArrowLeft className="w-4 h-4" /> Edit details
                                    </button>
                                </div>

                                {apiError && (
                                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                        <XCircle className="w-4 h-4 mt-0.5 shrink-0" /> {apiError}
                                    </div>
                                )}

                                <div className="mt-6 space-y-5">
                                    {result.offers.map((o) => (
                                        <OfferCard key={o.offerId} offer={o} best={o.offerId === lowestRoiId && result.offers.length > 1}
                                            applying={applyingId === o.offerId} onApply={() => apply(o)} />
                                    ))}
                                </div>

                                {!result.isEligible && (
                                    <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                                        <h3 className="font-bold text-amber-900">Improve your chances</h3>
                                        <p className="mt-1 text-sm text-amber-800">Lenders mostly decide on credit score and income. Check your free credit report to see what is holding you back.</p>
                                        <Link href="/credit-score" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-amber-900 underline">
                                            Check my credit score free <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                )}

                                {result.rejected.length > 0 && (
                                    <div className="mt-6 rounded-2xl border border-gray-100 bg-white">
                                        <button type="button" onClick={() => setShowRejected(!showRejected)}
                                            className="w-full flex items-center justify-between p-4 text-sm font-semibold text-gray-700">
                                            <span>{result.rejected.length} lender{result.rejected.length > 1 ? 's' : ''} couldn’t make an offer — see why</span>
                                            <ChevronDown className={`w-4 h-4 transition-transform ${showRejected ? 'rotate-180' : ''}`} />
                                        </button>
                                        <AnimatePresence>
                                            {showRejected && (
                                                <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden divide-y divide-gray-50 px-4 pb-2">
                                                    {result.rejected.map((r, i) => (
                                                        <li key={`${r.lenderName}-${i}`} className="flex items-center justify-between gap-3 py-3 text-sm">
                                                            <span className="font-medium text-gray-800">{r.lenderName}</span>
                                                            <span className="text-gray-500 text-right">{r.reason}</span>
                                                        </li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>
                                        {result.rejected.some((r) => /credit score/i.test(r.reason)) && (
                                            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
                                                <TrendingUp className="w-4 h-4 shrink-0" />
                                                A higher credit score unlocks more lenders and lower rates. <Link href="/refine" className="font-bold underline">See how to improve it</Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── How it works ── */}
                    <div className="mt-14 grid sm:grid-cols-3 gap-4">
                        {[
                            { n: '1', t: 'Share a few details', d: 'Income, employer and loan need. No documents at this step.' },
                            { n: '2', t: 'Compare real offers', d: 'Interest rate, EMI, fees and in-hand amount from each lender.' },
                            { n: '3', t: 'Apply with the lender', d: 'Complete KYC on the lender’s secure site. Approval is decided by the lender.' },
                        ].map((s) => (
                            <div key={s.n} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">{s.n}</div>
                                <h3 className="mt-3 font-bold text-gray-900">{s.t}</h3>
                                <p className="mt-1 text-sm text-gray-500">{s.d}</p>
                            </div>
                        ))}
                    </div>

                    {/* ── Disclosure ── */}
                    <div className="mt-10 rounded-2xl border border-gray-100 bg-white p-5 text-xs leading-relaxed text-gray-500">
                        <p className="font-semibold text-gray-700 mb-1">Important</p>
                        {texts.disclosure || 'CreditKlick is not a lender and does not make credit decisions. Offers are provided by banks and NBFCs through our partner platform Great.Cards (BankKaro). Interest rate, EMI and fees shown are indicative; the final loan amount, rate and terms are decided by the lender after verification. CreditKlick may receive a fee from partners when a loan is disbursed. Please read the lender’s Key Fact Statement before accepting any loan.'}
                    </div>
                </div>
            </section>
        </main>
    )
}
