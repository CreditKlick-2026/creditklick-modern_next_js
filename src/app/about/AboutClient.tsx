"use client"

import React, { useEffect } from 'react'
import Newsletter from '@/components/Newsletter'

// Asset path
const about2 = '/assets/about1.jpg';

const insideStyles: React.CSSProperties = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
};

export default function AboutClient() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            {/* Parallax Emulation */}
            <div className="relative h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-fixed bg-center bg-cover"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
                    }}
                ></div>
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                <div style={insideStyles} className="w-full">
                    <h2 className="text-4xl font-bold tracking-tight text-teal-800 sm:text-6xl uppercase">
                        ABOUT US
                    </h2>
                    <p className="mt-6 text-2xl leading-8 text-indigo-600 font-bold uppercase">
                        THE CREDITKLICK STORY
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-5 bg-white rounded-xl overflow-hidden mt-[-50px] relative z-10 shadow-lg mb-10">
                <div className="lg:flex gap-10 items-center">
                    <div className="space-y-6 container my-auto flex-1">
                        <p className="text-pink-400 text-xl font-semibold uppercase tracking-wider">
                            WE MAKE FINANCE EASY, CONVENIENT & TRANSPARENT
                        </p>
                        <p className="text-4xl font-bold text-blue-800 uppercase">
                            WELCOME TO CREDITKLICK
                        </p>
                        <p className="text-sky-700 text-lg leading-relaxed text-justify">
                            Using data and technology innovations, we help you choose the
                            most-suited financial products. Our algorithm-based technology
                            platform provides you with access to multiple personal credit
                            offers, ease of comparison of multiple offers available and
                            unbiased advice. From application to disbursal, CreditKlick will
                            accompany you at each step, till the disbursal of loan or issuance
                            of credit card
                        </p>
                    </div>
                    <div className="lg:shrink-0 flex-1 mt-8 lg:mt-0">
                        <img
                            className="w-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                            src={about2}
                            alt="About"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-gray-200 to-blue-400 w-full h-auto my-16 text-center shadow-lg py-16">
                <p className="text-4xl uppercase text-slate-800 font-bold mb-4">
                    Ready to talk ?
                </p>
                <p className="text-xl uppercase p-2 text-slate-800 font-medium">
                    Our team is here to answer your questions about CreditKlick
                </p>
                <p className="text-xl uppercase pb-8 text-slate-800">
                    More than 1.5 million businesses and organisations use CreditKlick
                </p>
                <button className="bg-blue-500 text-white hover:bg-blue-900 font-bold hover:text-gray-100 rounded-lg shadow-xl px-8 py-3 transition-colors duration-300">
                    CONTACT US
                </button>
            </div>

            <Newsletter />
        </>
    );
}
