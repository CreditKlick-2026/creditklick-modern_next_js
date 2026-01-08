"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { paymentAPI } from "@/services/api";

const features = [
    { text: "Detailed Credit report analysis" },
    { text: "Identifying negative accounts" },
    { text: "Dispute resolution on your behalf" },
    { text: "Credit score builder program" },
    { text: "Personalised Credit Dashboard" },
    { text: "Offers on Loan & Credit Cards" },
];

const faqs = [
    {
        q: "What is Credit Refine?",
        a: "Credit Refine is a specialized service designed to help you improve your credit score through expert analysis, dispute resolution, and personalized guidance."
    },
    {
        q: "How long does it take to see results?",
        a: "While results vary based on individual credit history, many clients start seeing improvements within 3 to 6 months of active participation in the program."
    },
    {
        q: "Is Credit Refine safe?",
        a: "Yes, completely. We use secure methods to analyze your report and follow all legal guidelines for dispute resolution with credit bureaus."
    },
    {
        q: "Do you guarantee a specific score?",
        a: "No company can legally guarantee a specific credit score increase, but we use proven strategies to help you reach your maximum credit potential."
    }
];

export default function CreditRefineClient() {
    const [box1, setBox1] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        const userStr = Cookies.get("user");
        if (!userStr) {
            window.location.href = "/credit-score?LinkKey=Refine";
            return;
        }

        try {
            setIsLoading(true);
            const user = JSON.parse(userStr);

            const response = await paymentAPI.initiate({
                phone: user.mobile || user.phone,
                firstname: user.firstName || user.fname || "Customer",
                email: user.email,
            });

            const result = response.data;

            if (result.status === 200 && result.data) {
                window.location.href = result.data;
            } else {
                alert(result.error || "Payment initiation failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Payment error:", error);
            const errorMsg = error.response?.data?.error || "Something went wrong. Please try again later.";
            alert(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* --- UpperRefine Section --- */}
            <div className="container mx-auto md:my-8 my-10 relative">
                <div className="w-auto h-auto shadow-xl rounded-xl px-8 md:mx-0 mx-4 bg-white">
                    <div className="md:flex gap-8 py-8 items-center">
                        <div className="my-auto md:space-y-8 space-y-4 md:w-3/5">
                            <h1 className="uppercase md:text-3xl text-2xl font-semibold text-blue-900 text-left">
                                How Credit Refine can boost your financial future!
                            </h1>
                            <h2 className="font-medium md:text-xl text-lg text-blue-900 leading-relaxed">
                                Credit refine improves your credit score, which leads to better
                                financial products and services, and ultimately financial
                                stability and wealth building opportunities.
                            </h2>
                            <div className="uppercase md:text-3xl text-xl font-semibold text-blue-900 text-left">
                                Talk to an <span className="text-red-500">Expert </span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-blue-900">
                                <span className="text-xl font-semibold">
                                    IMPROVE YOUR CREDIT SCORE
                                </span>
                                <span className="flex items-baseline ml-0 sm:ml-2">
                                    <span className="text-xl mr-2">@</span>
                                    <span className="line-through text-gray-400 text-lg mr-2">₹2599</span>
                                    <span className="text-blue-900 font-bold text-3xl animate-pulse">₹1356</span>
                                </span>
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={handlePayment}
                                    disabled={isLoading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors text-white font-bold px-8 py-3 rounded uppercase cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
                                >
                                    {isLoading && <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>}
                                    {isLoading ? 'Processing...' : 'PAY NOW'}
                                </button>
                            </div>
                        </div>

                        <div className="md:shrink-0 flex md:w-2/5 justify-center">
                            <img
                                className="object-contain max-h-[400px]"
                                src="/assets/expertise.gif"
                                alt="Expertise Animation"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & FAQ Sections */}
            <div className="flex md:flex-row flex-col-reverse justify-center gap-8 my-16 container mx-auto px-4">
                <div className="shadow-lg md:w-2/5 p-8 rounded-lg md:text-left text-center bg-white border border-gray-100">
                    <p className="font-semibold text-blue-900 text-2xl pb-6 border-b border-gray-100 mb-6">
                        Our Financial Experts Will:
                    </p>
                    <div className="space-y-4">
                        {features.map((item, index) => (
                            <div key={index} className="flex items-start text-lg font-light text-gray-700">
                                <span className="text-pink-500 mr-3 mt-1 flex-shrink-0 text-xl">
                                    <BsCheckLg />
                                </span>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="shadow-lg md:w-2/5 rounded-lg overflow-hidden bg-white border border-gray-100 flex flex-col">
                    <div className="text-white bg-blue-900 p-6">
                        <p className="text-lg font-semibold">Improve your Credit Score</p>
                        <p className="text-sm opacity-90">Our advisors are here to help you</p>
                    </div>

                    <div className="p-6 space-y-6 flex-grow">
                        <div className="flex justify-between items-center text-gray-800">
                            <p className="text-blue-900 font-medium">Credit Refine Service</p>
                            <div className="text-right">
                                <p className="font-semibold">₹ 1,356</p>
                                <p className="text-xs text-gray-500">(₹ 113 * 12 months)</p>
                            </div>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg -mx-2">
                            <p className="text-blue-900 font-bold">Offer Price</p>
                            <div className="text-right">
                                <p className="font-bold text-xl text-blue-700">₹ 999</p>
                                <p className="text-xs text-blue-600 font-medium">(Included GST)</p>
                            </div>
                        </div>
                        <div className="pt-4">
                            <button
                                onClick={handlePayment}
                                disabled={isLoading}
                                className="bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white w-full py-3 rounded-md font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                {isLoading && <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>}
                                {isLoading ? 'Processing...' : 'PAY NOW'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 uppercase tracking-wide">
                        Frequently Asked <span className="text-red-500">Questions</span>
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => setBox1(box1 === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-800">{faq.q}</span>
                                    <span>{box1 === index ? '-' : '+'}</span>
                                </button>
                                <AnimatePresence>
                                    {box1 === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
                                            <div className="p-6 pt-0 text-gray-600 border-t border-gray-50">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
