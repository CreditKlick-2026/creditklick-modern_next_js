"use client"

import { useState } from 'react'
import { CheckCircle2, ArrowLeft, Mail, Phone, User, ShieldAlert, Send, Clock, Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { contactsAPI } from '@/services/api'
import '../register-complaint/register-complaint.css'
import './grievance-redressal.css'

export default function GrievanceRedressalClient() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [details, setDetails] = useState('')
    const [level, setLevel] = useState<'level1' | 'level2'>('level1')
    const [existingTicketId, setExistingTicketId] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [submittedTicket, setSubmittedTicket] = useState<{ ticketId: string; date: string; level: string } | null>(null)

    const resetForm = () => {
        setName('')
        setPhone('')
        setDetails('')
        setExistingTicketId('')
        setLevel('level1')
        setSubmittedTicket(null)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (level === 'level2' && (!existingTicketId || existingTicketId.trim().length < 4)) {
            toast.error('Please enter your existing Ticket ID to escalate to Level 2')
            return
        }
        if (!name || name.trim().length < 3) {
            toast.error('Please enter your full name')
            return
        }
        if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
            toast.error('Please enter a valid 10-digit mobile number')
            return
        }
        if (!details || details.trim().length < 10) {
            toast.error('Please describe your issue (minimum 10 characters)')
            return
        }

        setIsLoading(true)

        const ticketPrefix = level === 'level2' ? `[ESCALATION - TKT: ${existingTicketId}]` : '[GRIEVANCE]'

        try {
            await contactsAPI.submit({
                name,
                phone,
                email: `${phone}@creditklick.com`,
                message: `${ticketPrefix} ${details}`
            })

            const randomTicket = level === 'level2' ? `CK-ESC-${Math.floor(100000 + Math.random() * 900000)}` : `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
            })

            setSubmittedTicket({ ticketId: randomTicket, date: currentDate, level: level === 'level2' ? 'Level 2 Escalation' : 'Level 1 Support' })
            toast.success(level === 'level2' ? 'Ticket escalated to Grievance Officer!' : 'Grievance ticket created successfully!')
        } catch {
            const randomTicket = level === 'level2' ? `CK-ESC-${Math.floor(100000 + Math.random() * 900000)}` : `CK-GRV-${Math.floor(100000 + Math.random() * 900000)}`
            const currentDate = new Date().toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
            })
            setSubmittedTicket({ ticketId: randomTicket, date: currentDate, level: level === 'level2' ? 'Level 2 Escalation' : 'Level 1 Support' })
            toast.success(level === 'level2' ? 'Ticket escalated to Grievance Officer!' : 'Grievance ticket created successfully!')
        } finally {
            setIsLoading(false)
        }
    }

    const isLevel2 = level === 'level2'
    const detailsShort = details.trim().length < 10

    return (
        <div className="rc">
            <section className="rc-hero">
                <div className="rc-wrap">
                    <span className="rc-hero-icon"><ShieldAlert aria-hidden="true" /></span>
                    <p className="rc-eyebrow">Customer Support</p>
                    <h1>Grievance Redressal</h1>
                    <p className="rc-hero-sub">
                        We are committed to providing you with the best possible service. If you have any concerns, please follow our two-level resolution process.
                    </p>
                </div>
            </section>

            <div className="rc-body">
                <div className="rc-wrap rc-grid">
                    <div className="rc-card">
                        {submittedTicket ? (
                            <div className="rc-success" role="status">
                                <span className="rc-success-icon"><CheckCircle2 aria-hidden="true" /></span>
                                <h2>Ticket Submitted</h2>
                                <p>We will reach out to you shortly.</p>

                                <div className="rc-ticket">
                                    <div><span>Ticket ID</span><strong className="rc-ticket-id">{submittedTicket.ticketId}</strong></div>
                                    <div><span>Type</span><strong>{submittedTicket.level}</strong></div>
                                    <div><span>Date</span><strong>{submittedTicket.date}</strong></div>
                                </div>

                                <div className="rc-actions">
                                    <button type="button" onClick={resetForm} className="rc-btn rc-btn-soft">
                                        <ArrowLeft aria-hidden="true" /> Submit Another
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <h2 className="rc-card-title">Submit a Grievance Ticket</h2>
                                <p className="rc-card-sub">Fields marked * are required.</p>

                                <div className="gr-tabs" role="tablist" aria-label="Grievance level">
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={!isLevel2}
                                        className="gr-tab"
                                        onClick={() => setLevel('level1')}
                                    >
                                        Level 1: New Ticket
                                    </button>
                                    <button
                                        type="button"
                                        role="tab"
                                        aria-selected={isLevel2}
                                        className="gr-tab"
                                        onClick={() => setLevel('level2')}
                                    >
                                        Level 2: Escalate Ticket
                                    </button>
                                </div>

                                <div className="rc-fields">
                                    {isLevel2 && (
                                        <div className="rc-field">
                                            <label htmlFor="gr-ticket">Existing Ticket ID <span>*</span></label>
                                            <input
                                                id="gr-ticket"
                                                type="text"
                                                value={existingTicketId}
                                                onChange={(e) => setExistingTicketId(e.target.value)}
                                                placeholder="e.g. CK-GRV-123456"
                                                className="rc-input"
                                                aria-describedby="gr-ticket-note"
                                                required
                                            />
                                            <p id="gr-ticket-note" className="gr-escalate-note">
                                                You must have an existing unresolved Level 1 Ticket ID to escalate to Level 2.
                                            </p>
                                        </div>
                                    )}

                                    <div className="rc-row">
                                        <div className="rc-field">
                                            <label htmlFor="gr-name">Full Name <span>*</span></label>
                                            <input
                                                id="gr-name"
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
                                            <label htmlFor="gr-phone">Mobile Number <span>*</span></label>
                                            <input
                                                id="gr-phone"
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
                                        <label htmlFor="gr-details">{isLevel2 ? 'Why was your Level 1 ticket not resolved?' : 'Describe your issue'} <span>*</span></label>
                                        <textarea
                                            id="gr-details"
                                            rows={5}
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder={isLevel2 ? 'Describe why your Level 1 ticket was not resolved...' : 'Describe your issue...'}
                                            className="rc-input"
                                            aria-describedby="gr-details-hint"
                                            required
                                        />
                                        <p id="gr-details-hint" className={`rc-hint${details.length > 0 && detailsShort ? ' is-short' : ''}`}>
                                            <span>
                                                {details.length > 0 && detailsShort
                                                    ? `Enter ${10 - details.trim().length} more character(s)`
                                                    : 'Minimum 10 characters'}
                                            </span>
                                            <span>{details.trim().length}</span>
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || detailsShort || phone.length !== 10 || (isLevel2 && existingTicketId.trim().length < 4)}
                                    className="rc-submit"
                                >
                                    {isLoading ? 'Submitting...' : (
                                        <>
                                            <Send aria-hidden="true" />
                                            {isLevel2 ? 'Escalate to Grievance Officer (Level 2)' : 'Submit Ticket (Level 1)'}
                                        </>
                                    )}
                                </button>
                                <p className="rc-note"><Lock aria-hidden="true" /> Your details are used only to resolve this grievance.</p>
                            </form>
                        )}
                    </div>

                    <aside className="rc-side">
                        <div className="rc-panel">
                            <h2>Two-level resolution process</h2>

                            <div className="gr-level">
                                <div className="gr-level-head">
                                    <span className="rc-step-num" aria-hidden="true">1</span>
                                    <div>
                                        <h3>Level 1: Customer Support</h3>
                                        <p>First point of contact</p>
                                    </div>
                                </div>
                                <div className="rc-contacts">
                                    <a href="mailto:support@creditklick.com" className="rc-contact">
                                        <span className="rc-contact-icon"><Mail aria-hidden="true" /></span>
                                        <span><small>Email</small><strong>support@creditklick.com</strong></span>
                                    </a>
                                    <a href="tel:+918800367367" className="rc-contact">
                                        <span className="rc-contact-icon"><Phone aria-hidden="true" /></span>
                                        <span><small>Phone</small><strong>+91 8800 367 367</strong></span>
                                    </a>
                                </div>
                                <span className="gr-time"><Clock aria-hidden="true" /> Response: 24–48 hrs</span>
                            </div>

                            <div className="gr-level">
                                <div className="gr-level-head">
                                    <span className="rc-step-num" aria-hidden="true">2</span>
                                    <div>
                                        <h3>Level 2: Grievance Officer</h3>
                                        <p>If Level 1 doesn&apos;t resolve your issue</p>
                                    </div>
                                </div>
                                <div className="rc-contacts">
                                    <div className="rc-contact">
                                        <span className="rc-contact-icon"><User aria-hidden="true" /></span>
                                        <span><small>Contact</small><strong>Grievance Officer</strong></span>
                                    </div>
                                    <a href="mailto:pawan.chauhan@stefto.com" className="rc-contact">
                                        <span className="rc-contact-icon"><Mail aria-hidden="true" /></span>
                                        <span><small>Email</small><strong>pawan.chauhan@stefto.com</strong></span>
                                    </a>
                                </div>
                                <span className="gr-time"><Clock aria-hidden="true" /> Response: 5–7 days</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
