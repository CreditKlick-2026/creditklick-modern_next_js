"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface CustomerReview {
    id: number
    name: string
    city: string
    avatar: string
    quote: string
    source: string
}

const customerReviews: CustomerReview[] = [
    {
        id: 1,
        name: "Mohit Verma",
        city: "Agra, UP",
        avatar: "/assets/testimonials/mohit.jpg",
        quote: "Before, my credit score was just 520, and I faced multiple loan rejections. With CreditKlick Credit Refine, my score reached 760 in 3 months and I got my ₹5 Lakh personal loan approved!",
        source: "Credit Refine User"
    },
    {
        id: 2,
        name: "Chandrasekar R.",
        city: "Bengaluru, KA",
        avatar: "/assets/testimonials/chandrasekar.jpg",
        quote: "Since I started using CreditKlick, I saved over ₹1.8 Lakhs on total interest by comparing bank offers and negotiating my balance transfer with accurate EMI insights.",
        source: "Home Loan Transfer"
    },
    {
        id: 3,
        name: "Ravi Teja Naidu",
        city: "Vijayawada, AP",
        avatar: "/assets/testimonials/ravi.jpg",
        quote: "I had zero credit history. CreditKlick guided me step-by-step to build a 775 score, and I was approved for a lifetime-free card with 5% cashback and airport lounge access.",
        source: "Credit Card Customer"
    },
    {
        id: 4,
        name: "Priya Sharma",
        city: "Delhi NCR",
        avatar: "/assets/testimonials/priya.jpg",
        quote: "The report analysis is extremely detailed and transparent. It helped me fix an error on my CRIF report and get an instant personal loan disbursed directly when I needed funds.",
        source: "Verified CRIF Report"
    }
]

export default function HappyCustomersSection() {
    return (
        <section 
            id="happy-customers"
            className="py-20 sm:py-28 relative text-slate-900 overflow-hidden bg-white"
        >
            {/* Embedded CodePen White Card with Blue (#2b7fff) Accent Design */}
            <style jsx global>{`
                .cp-grid-card-wrapper {
                    position: relative;
                    width: 100%;
                    max-width: 360px;
                    margin: 10px auto 30px;
                }

                .cp-testimonial-clean {
                    width: 100%;
                    background: #ffffff;
                    border: 1.5px solid #e2e8f0;
                    padding: 2.2em 1.4em 1.5em 1.5em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    border-radius: 6px;
                    box-shadow: 
                        0 8px 20px -4px rgba(43, 127, 255, 0.12),
                        0 16px 32px -8px rgba(0, 0, 0, 0.08);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .cp-grid-card-wrapper:hover .cp-testimonial-clean {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 36px rgba(43, 127, 255, 0.22);
                }

                /* Electric Blue Frame Behind */
                .cp-testimonial-clean::after {
                    content: "";
                    border: 4px solid #2b7fff;
                    border-radius: 26px;
                    width: 90%;
                    height: 114%;
                    position: absolute;
                    z-index: -1;
                    left: 0.9em;
                    top: -1.2em;
                    transition: all 0.3s ease;
                }

                .cp-grid-card-wrapper:hover .cp-testimonial-clean::after {
                    left: 1.1em;
                    top: -1.4em;
                }

                /* Speech Bubble Triangle Tail at Bottom (Blue) */
                .cp-testimonial-clean::before {
                    content: "";
                    position: absolute;
                    bottom: -3em;
                    left: 2.2em;
                    z-index: 1;		
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 34px 50px 0 0;
                    border-color: #2b7fff transparent transparent transparent;
                }

                /* Electric Blue Square Quotes */
                .cp-quote-blue-box {
                    position: absolute;
                    font-size: 1.6em;
                    width: 26px;
                    height: 26px;
                    background: #2b7fff;
                    color: #ffffff;
                    text-align: center;
                    line-height: 1.25;
                    font-family: serif;
                    user-select: none;
                }

                .cp-quote-blue-box.open {
                    top: 0;
                    left: 0;
                }

                .cp-quote-blue-box.close {
                    bottom: 0;
                    right: 0;
                }

                .cp-text-dark {
                    width: 72%;
                    font-weight: 600;
                    font-size: 0.82em;
                    color: #1e293b;
                    line-height: 1.45;
                    margin-bottom: 0.8em;
                }

                .cp-source-dark {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding-right: 0.2em;
                }

                .cp-source-dark span {			
                    font-weight: 800;
                    font-size: 0.78em;
                    color: #2b7fff;
                }

                .cp-source-dark span::before {
                    content: "— ";
                    margin-right: 3px;
                }

                /* Polaroid Photo Frame with Paperclip */
                .cp-image {
                    transform: rotate(-6deg);
                    position: absolute;
                    top: -0.9em;
                    right: 0.6em;
                    z-index: 10;
                }

                .cp-image .photo-frame {
                    border: 4px solid #ffffff;
                    border-bottom: 12px solid #ffffff;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.18);
                    border-radius: 3px;
                    overflow: hidden;
                    background: #f1f5f9;
                    width: 64px;
                    height: 78px;
                    position: relative;
                }

                /* Electric Blue Paperclip */
                .cp-clip {
                    border: 1.8px solid #2b7fff;
                    border-right: none;
                    height: 42px;
                    width: 13px;
                    position: absolute;
                    right: 25%;
                    top: -15%;
                    border-radius: 16px;
                    z-index: 20;
                    filter: drop-shadow(0 1px 2px rgba(43, 127, 255, 0.25));
                }

                .cp-clip::before {
                    content: "";
                    position: absolute;
                    top: -1px;
                    right: 0;
                    height: 8px;
                    width: 10px;
                    border: 1.8px solid #2b7fff;
                    border-bottom: none;
                    border-top-left-radius: 16px;
                    border-top-right-radius: 16px;
                    z-index: 99;					
                }

                .cp-clip::after {
                    content: "";
                    position: absolute;
                    bottom: -1px;
                    right: 0;
                    height: 22px;
                    width: 10px;
                    border: 1.8px solid #2b7fff;
                    border-top: none;
                    border-bottom-left-radius: 16px;
                    border-bottom-right-radius: 16px;
                    z-index: 99;
                }
            `}</style>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center flex flex-col items-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#2b7fff]" />
                        Customer Voices
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        Hear It From Our <br className="sm:hidden" /> Happy Customers
                    </h2>

                    <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed text-center max-w-lg mx-auto mt-1.5">
                        Real stories of credit repair, approved personal loans, and interest savings from verified CreditKlick users.
                    </p>
                </div>

                {/* 2 Cards per Row (2-Column Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 sm:gap-y-12 max-w-3xl mx-auto pb-4">
                    {customerReviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ duration: 0.3, delay: index * 0.06 }}
                            className="cp-grid-card-wrapper"
                        >
                            <div className="cp-testimonial-clean">
                                {/* Open Quote in Blue */}
                                <span className="cp-quote-blue-box open">“</span>

                                {/* Polaroid Photo with Blue Paperclip */}
                                <div className="cp-image">
                                    <div className="cp-clip"></div>
                                    <div className="photo-frame">
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            fill
                                            className="object-cover object-top"
                                            sizes="64px"
                                        />
                                    </div>
                                </div>

                                {/* Main Review Text in Dark Slate */}
                                <p className="cp-text-dark">
                                    {review.quote}
                                </p>

                                {/* Source & Name */}
                                <div className="cp-source-dark">
                                    <span>{review.name}, {review.city}</span>
                                </div>

                                {/* Close Quote in Blue */}
                                <span className="cp-quote-blue-box close">”</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
