"use client"

import { Cookie, ShieldCheck, Gauge, SlidersHorizontal, BarChart3, Settings2, Mail } from 'lucide-react'
import './cookies-policy.css'

const sections = [
    { id: 'what', title: 'What Are Cookies?' },
    { id: 'how', title: 'How We Use Cookies' },
    { id: 'types', title: 'Types of Cookies We Use' },
    { id: 'manage', title: 'Managing Cookies' },
    { id: 'third-party', title: 'Third-Party Cookies' },
    { id: 'updates', title: 'Updates to This Policy' },
    { id: 'contact', title: 'Contact Us' },
]

const kinds = [
    { icon: ShieldCheck, title: 'Essential Cookies', text: 'These are necessary for the website to function properly.' },
    { icon: Gauge, title: 'Performance Cookies', text: 'These help us understand how visitors interact with our website.' },
    { icon: SlidersHorizontal, title: 'Functionality Cookies', text: 'These remember your preferences and settings.' },
    { icon: BarChart3, title: 'Analytics Cookies', text: 'These help us analyze website traffic and improve our services.' },
]

const cookies = [
    { name: 'user', purpose: 'Stores user session information', duration: '7 days' },
    { name: 'cibil', purpose: 'Stores credit score data for quick access', duration: '7 days' },
    { name: 'token', purpose: 'Authentication token', duration: '7 days' },
]

function SectionTitle({ index, children }: { index: number; children: React.ReactNode }) {
    return (
        <h2>
            <span className="pol-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            {children}
        </h2>
    )
}

export default function CookiesPolicyClient() {
    // Same event the footer's "Cookie Settings" link uses to reopen the consent banner
    const openCookieSettings = () => window.dispatchEvent(new Event('open_cookie_consent'))

    return (
        <div className="cp-pol">
            <section className="pol-hero">
                <div className="pol-wrap">
                    <span className="pol-hero-icon"><Cookie aria-hidden="true" /></span>
                    <p className="pol-eyebrow">Legal</p>
                    <h1>Cookies Policy</h1>
                    <p className="pol-hero-sub">
                        Understand how CreditKlick uses cookies to enhance your experience, analyze site traffic,
                        and provide personalized services.
                    </p>
                    <span className="pol-updated">Last updated: January 2026</span>
                </div>
            </section>

            <div className="pol-body">
                <div className="pol-wrap pol-layout">
                    <nav className="pol-toc" aria-label="On this page">
                        <p>On this page</p>
                        <ol>
                            {sections.map((s) => (
                                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                            ))}
                        </ol>
                    </nav>

                    <div className="pol-content">
                        <section id="what" className="pol-section">
                            <SectionTitle index={0}>What Are Cookies?</SectionTitle>
                            <p>
                                Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                                They are widely used to make websites work more efficiently and provide information to the site owners.
                            </p>
                        </section>

                        <section id="how" className="pol-section">
                            <SectionTitle index={1}>How We Use Cookies</SectionTitle>
                            <p>CreditKlick uses cookies for several purposes:</p>
                            <div className="pol-kinds">
                                {kinds.map(({ icon: Icon, title, text }) => (
                                    <div key={title} className="pol-kind">
                                        <span className="pol-kind-icon"><Icon aria-hidden="true" /></span>
                                        <div>
                                            <h3>{title}</h3>
                                            <p>{text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="types" className="pol-section">
                            <SectionTitle index={2}>Types of Cookies We Use</SectionTitle>
                            <table className="pol-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Cookie Name</th>
                                        <th scope="col">Purpose</th>
                                        <th scope="col">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cookies.map((c) => (
                                        <tr key={c.name}>
                                            <td data-label="Cookie"><code>{c.name}</code></td>
                                            <td data-label="Purpose">{c.purpose}</td>
                                            <td data-label="Duration">{c.duration}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>

                        <section id="manage" className="pol-section">
                            <SectionTitle index={3}>Managing Cookies</SectionTitle>
                            <p>
                                You can control and manage cookies through your browser settings. Most browsers allow you to refuse
                                or delete cookies. Please note that disabling cookies may affect the functionality of our website.
                            </p>
                            <button type="button" className="pol-btn" onClick={openCookieSettings}>
                                <Settings2 aria-hidden="true" />
                                Manage cookie preferences
                            </button>
                        </section>

                        <section id="third-party" className="pol-section">
                            <SectionTitle index={4}>Third-Party Cookies</SectionTitle>
                            <p>
                                We may also use third-party cookies from services like Google Analytics to analyze website usage.
                                These third parties have their own privacy policies regarding cookies.
                            </p>
                        </section>

                        <section id="updates" className="pol-section">
                            <SectionTitle index={5}>Updates to This Policy</SectionTitle>
                            <p>We may update this Cookies Policy from time to time. Any changes will be posted on this page.</p>
                        </section>

                        <section id="contact" className="pol-section">
                            <SectionTitle index={6}>Contact Us</SectionTitle>
                            <p>If you have any questions about our use of cookies, please contact us at:</p>
                            <a href="mailto:support@creditklick.com" className="pol-mail">
                                <Mail aria-hidden="true" />
                                support@creditklick.com
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
