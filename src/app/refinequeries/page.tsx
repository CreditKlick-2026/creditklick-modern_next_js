"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"

export default function RefineQueriesPage() {
    return (
        <div>
            {/* Header Banner - Matching creditklick2-main style */}
            <div className="bg-sky-900 text-gray-50 text-center py-4">
                <h1 className="md:text-3xl font-semibold">
                    CREDIT IMPROVEMENT SERVICE IN INDIA
                </h1>
                <p>
                    MYTH : Can't improve bad credit score &nbsp;| &nbsp;TRUTH : We
                    helped thousands of people
                </p>
            </div>

            {/* About Section */}
            <div className="md:flex-row flex flex-col w-5/6 my-10 container mx-auto rounded-2xl p-4 shadow-xl">
                <div className="w-full m-auto px-4">
                    <p className="lg:text-xl md:text-lg sm:text-sm text-xs">
                        If you're looking to boost your credit score and improve your overall
                        financial health, Credit Refine can be your trusted partner on this
                        journey. Our Credit Improvement Services are designed with your
                        financial success in mind. Here's how Credit Refine works to help you
                        achieve a healthier credit score.
                    </p>

                    <h3 className="font-semibold md:text-xl sm:text-sm text-xs text-center my-2">
                        Our Credit Refine Program will help you improve your credit score
                    </h3>

                    <div className="flex justify-center">
                        <Link href="/refine">
                            <button className="px-3 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-md m-2">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-2/3 mx-auto">
                    <img src="/assets/Refine/about.png" alt="CreditMeter" className="mx-auto" />
                </div>
            </div>

            {/* Main Content Container */}
            <div className="w-5/6 mx-auto shadow-xl rounded-3xl mt-4 pb-10 mb-10">

                {/* Score Health Section */}
                <div className="px-2 my-6">
                    <h1 className="lg:text-2xl md:text-xl sm:text-lg font-semibold text-blue-700 text-center">
                        How does Credit Refine work in improving Credit Score Health
                    </h1>

                    <div className="grid md:grid-cols-2 grid-cols-1 mt-10">
                        <div className="mt-8 mb-2">
                            <img src="/assets/Refine/scorehealth.png" alt="score health" className="w-2/5 m-auto" />
                        </div>
                        <div className="m-auto">
                            <p className="font-semibold text-xl">
                                Comprehensive Credit Analysis:
                            </p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    We start by conducting a detailed analysis of your credit history,
                                    pulling your credit reports from major credit bureaus.
                                </li>
                                <li>
                                    Our experts scrutinize these reports to indentify inaccuracies,
                                    errors and negative items that may be dragging down your credit
                                    score.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Plan Section */}
                <div className="px-2 my-10">
                    <div className="md:grid md:grid-cols-2 flex flex-col-reverse">
                        <div className="m-auto md:px-4 sm:px-2 px-1">
                            <p className="font-semibold text-xl">Customised Action Plan:</p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    Based on our analysis, we createa customized action plan tailored
                                    to your specific credit situation
                                </li>
                                <li>
                                    This plan outlines the steps we'll take to address negative items
                                    and improve your credit score
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 mb-2">
                            <img src="/assets/Refine/actionplan.png" alt="action plan" className="w-2/5 m-auto" />
                        </div>
                    </div>
                </div>

                {/* Negotiations Section */}
                <div className="px-2 my-10">
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="mt-8 mb-2">
                            <img src="/assets/Refine/negotiations.png" alt="negotiations" className="w-2/5 m-auto" />
                        </div>
                        <div className="m-auto">
                            <p className="font-semibold text-xl">Negotiation with Creditors:</p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    Credit Refine negotiates with creditors on your behalf to settle
                                    outstanding debts or negotiate more favorable terms.
                                </li>
                                <li>
                                    This can lead to the removal of negative items or the
                                    establishment of manageable payment plans.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Credit Education Section */}
                <div className="px-2 my-10">
                    <div className="md:grid md:grid-cols-2 flex flex-col-reverse">
                        <div className="m-auto md:px-4 sm:px-2 px-1">
                            <p className="font-semibold text-xl">
                                Credit Education and Counseling:
                            </p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    We don't just fix your credit; we empower you with knowledge.
                                </li>
                                <li>
                                    Our credit experts provide education and counseling to help you
                                    understand credit management, budgeting, and financial
                                    responsibility.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 mb-2">
                            <img
                                src="/assets/Refine/crediteducation.png"
                                alt="credit education"
                                className="w-2/5 m-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Monitoring Section */}
                <div className="px-2 my-10">
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="mt-8 mb-2">
                            <img src="/assets/Refine/monitoring.png" alt="monitoring" className="w-2/5 m-auto" />
                        </div>
                        <div className="m-auto">
                            <p className="font-semibold text-xl">Ongoing Monitoring:</p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>Credit Refine doesn't stop once your credit score improves.</li>
                                <li>
                                    We provide continuous monitoring to ensure your credit stays on
                                    the right track and to address any new issues that may arise.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Updates Section */}
                <div className="px-2 my-10">
                    <div className="md:grid md:grid-cols-2 flex flex-col-reverse">
                        <div className="m-auto md:px-4 sm:px-2 px-1">
                            <p className="font-semibold text-xl">Regular Updates:</p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    You'll receive regular updates on the progress of your credit
                                    improvement journey.
                                </li>
                                <li>
                                    We keep you informed about the changes to your credit reports and
                                    scores.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 mb-2">
                            <img src="/assets/Refine/updates.png" alt="updates" className="w-2/5 m-auto" />
                        </div>
                    </div>
                </div>

                {/* Guidance Section */}
                <div className="px-2 my-10">
                    <div className="grid md:grid-cols-2 grid-cols-1">
                        <div className="mt-8 mb-2">
                            <img src="/assets/Refine/guidance.png" alt="guidance" className="w-2/5 m-auto" />
                        </div>
                        <div className="m-auto">
                            <p className="font-semibold text-xl">Support and Guidance:</p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    Our team of experienced professionals is always ready to answer
                                    your questions and offer guidance.
                                </li>
                                <li>
                                    We're here to support you every step of the way as you work
                                    towards a healthier credit score.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Opportunities Section */}
                <div className="px-2 my-10">
                    <div className="md:grid md:grid-cols-2 flex flex-col-reverse">
                        <div className="m-auto md:px-4 sm:px-2 px-1">
                            <p className="font-semibold text-xl">
                                Improved Financial Opportunities:
                            </p>
                            <ul className="list-disc lg:text-lg text-sm md:px-8 px-4">
                                <li>
                                    As your credit score improves, you'll gain access to better
                                    financial opportunities, such as lower interest rates on loans and
                                    credit cards.
                                </li>
                                <li>
                                    This can save you money and open doors to achieving your financial
                                    goals.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-8 mb-2">
                            <img
                                src="/assets/Refine/opportunities.png"
                                alt="opportunities"
                                className="w-2/5 m-auto"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
