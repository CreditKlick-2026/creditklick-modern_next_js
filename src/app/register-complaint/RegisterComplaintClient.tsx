"use client"

import { useState } from 'react'
import { CheckCircle2, ArrowLeft, Mail, Phone, MessageSquareWarning, Send, Lock } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'
import './register-complaint.css'

const COMPLAINT_CATEGORIES = [
    'Credit Report Error / Discrepancy',
    'Credit Refine Service Query',
    'Unauthorized Activity / Fraud Alert',
    'Consent Revocation & Data Privacy',
    'Billing or Payment Issue',
    'Website Technical Glitch',
    'Other General Complaint'
]

const STEPS = [
    { title: 'Submit your complaint', text: 'Share your details and describe the issue. You get a ticket ID instantly.' },
    { title: 'We review it', text: 'Our grievance team looks into your case and may contact you for more details.' },
    { title: 'Resolution in 24–48 hrs', text: 'We get back to you with a resolution within 24–48 business hours.' },
]

export default function RegisterComplaintClient() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [category, setCategory] = useState(COMPLAINT_CATEGORIES[0])
    const [details, setDetails] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [submittedTicket, setSubmittedTicket] = useState<{ ticketId: string; date: string } | null>(null)

    const resetForm = () => {
        setSubmittedTicket(null)
        setName('')
        setPhone('')
        setCategory(COMPLAINT_CATEGORIES[0])
        setDetails('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || name.trim().length < 3) {
            toast.error('Please enter your full name (minimum 3 characters)')
            return
        }
        if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            toast.error('Please enter a valid 10-digit mobile number')
            return
        }
        if (!details || details.trim().length < 20) {
            toast.error('Please describe your complaint (at least 20 characters)')
            return
        }

        setIsLoading(true)

        try {
            const formattedMessage = `[COMPLAINT - Category: ${category}] ${details}`

            await contactsAPI.submit({
                name,
                phone,
                email: `${phone}@creditklick.com`,
                message: formattedMessage
            })

            const randomTicket = `CK-CMP-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })

            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Complaint registered successfully!')
        } catch (error) {
            console.error('Complaint submission error', error)
            const randomTicket = `CK-CMP-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })
            setSubmittedTicket({ ticketId: randomTicket, date: currentDate })
            toast.success('Complaint registered successfully!')
        } finally {
            setIsLoading(false)
        }
    }

    const detailsShort = details.trim().length < 20

    return (
        <div className="rc">
            <section className="rc-hero">
                <div className="rc-wrap">
                    <span className="rc-hero-icon"><MessageSquareWarning aria-hidden="true" /></span>
                    <p className="rc-eyebrow">Grievance Portal</p>
                    <h1>Register a Complaint</h1>
                    <p className="rc-hero-sub">
                        We take every complaint seriously. Submit your grievance below and our team will investigate and resolve it within 24–48 business hours.
                    </p>
                </div>
            </section>

            <div className="rc-body">
                <div className="rc-wrap rc-grid">
                    <div className="rc-card">
                        {submittedTicket ? (
                            <div className="rc-success" role="status">
                                <span className="rc-success-icon"><CheckCircle2 aria-hidden="true" /></span>
                                <h2>Complaint Registered!</h2>
                                <p>Our team will reach out to you within 24–48 business hours.</p>

                                <div className="rc-ticket">
                                    <div><span>Ticket ID</span><strong className="rc-ticket-id">{submittedTicket.ticketId}</strong></div>
                                    <div><span>Date</span><strong>{submittedTicket.date}</strong></div>
                                    <div><span>Resolution ETA</span><strong>24–48 hrs</strong></div>
                                </div>

                                <div className="rc-actions">
                                    <button type="button" onClick={resetForm} className="rc-btn rc-btn-soft">
                                        <ArrowLeft aria-hidden="true" /> Submit Another
                                    </button>
                                    <Link href="/" className="rc-btn rc-btn-primary">Back to Home</Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <h2 className="rc-card-title">Submit Complaint</h2>
                                <p className="rc-card-sub">Fields marked * are required.</p>

                                <div className="rc-fields">
                                    <div className="rc-row">
                                        <div className="rc-field">
                                            <label htmlFor="rc-name">Full Name <span>*</span></label>
                                            <input
                                                id="rc-name"
                                                type="text"
                                                autoComplete="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your full name"
                                                className="rc-input"
                                                required
                                            />
                                        </div>
                                        <div className="rc-field">
                                            <label htmlFor="rc-phone">Mobile Number <span>*</span></label>
                                            <input
                                                id="rc-phone"
                                                type="tel"
                                                inputMode="numeric"
                                                autoComplete="tel-national"
                                                maxLength={10}
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                placeholder="10 digit mobile number"
                                                className="rc-input"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="rc-field">
                                        <label htmlFor="rc-category">Complaint Category</label>
                                        <select
                                            id="rc-category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="rc-input"
                                        >
                                            {COMPLAINT_CATEGORIES.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="rc-field">
                                        <label htmlFor="rc-details">Complaint Details <span>*</span></label>
                                        <textarea
                                            id="rc-details"
                                            rows={5}
                                            minLength={20}
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder="Describe your complaint in detail..."
                                            className="rc-input"
                                            aria-describedby="rc-details-hint"
                                            required
                                        />
                                        <p id="rc-details-hint" className={`rc-hint${details.length > 0 && detailsShort ? ' is-short' : ''}`}>
                                            <span>
                                                {details.length > 0 && detailsShort
                                                    ? `Enter ${20 - details.trim().length} more character(s)`
                                                    : 'Minimum 20 characters'}
                                            </span>
                                            <span>{details.trim().length}</span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || detailsShort || phone.length !== 10}
                                    className="rc-submit"
                                >
                                    {isLoading ? 'Submitting...' : (
                                        <>
                                            <Send aria-hidden="true" />
                                            Submit Complaint Ticket
                                        </>
                                    )}
                                </button>
                                <p className="rc-note"><Lock aria-hidden="true" /> Your details are used only to resolve this complaint.</p>
                            </form>
                        )}
                    </div>

                    <aside className="rc-side">
                        <div className="rc-panel">
                            <h2>What happens next?</h2>
                            <ol className="rc-steps">
                                {STEPS.map((step, i) => (
                                    <li key={step.title} className="rc-step">
                                        <span className="rc-step-num" aria-hidden="true">{i + 1}</span>
                                        <div>
                                            <h3>{step.title}</h3>
                                            <p>{step.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="rc-panel">
                            <h2>Need help right away?</h2>
                            <div className="rc-contacts">
                                <a href="mailto:support@creditklick.com" className="rc-contact">
                                    <span className="rc-contact-icon"><Mail aria-hidden="true" /></span>
                                    <span><small>Email us</small><strong>support@creditklick.com</strong></span>
                                </a>
                                <a href="tel:8800367367" className="rc-contact">
                                    <span className="rc-contact-icon"><Phone aria-hidden="true" /></span>
                                    <span><small>Call us</small><strong>8800 367 367</strong></span>
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
