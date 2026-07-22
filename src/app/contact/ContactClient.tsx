"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import Image from 'next/image'
import { contactsAPI } from '@/services/api'

const insideStyles = {
    padding: 20,
    position: "absolute" as const,
    top: "40%",
    left: "10%",
};

export function ContactClient() {
    const [IsSuccess, setIsSuccess] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [InputName, setInputName] = useState("");
    const [InputPhone, setInputPhone] = useState("");
    const [InputMessage, setInputMessage] = useState("");
    const [Error, setError] = useState<any>(null);

    const validations = (name: string, phone: string, message: string) => {
        const errors: any = {};

        if (!name) {
            errors.name = "Name is Important!";
        } else if (name.length < 3) {
            errors.name = "Invalid Name!";
        } else if (name.length > 30) {
            errors.name = "Name must be less than 30 characters!";
        }

        if (!message) {
            errors.message = "Message is Important!";
        } else if (message.length > 300) {
            errors.message = "Max 300 characters allowed in message!";
        }

        if (!phone) {
            errors.phone = "Phone is Important!";
        } else if (phone.length !== 10) {
            errors.phone = "10 digit phone is necessary!";
        }

        setError(errors);

        if (errors.name || errors.phone || errors.message) {
            return false;
        } else {
            return true;
        }
    };

    const SubmitContact = async () => {
        setError(null);
        setIsLoading(true);

        if (!validations(InputName, InputPhone, InputMessage)) {
            setIsLoading(false);
            return;
        }

        try {
            // Call backend API
            const response = await contactsAPI.submit({
                name: InputName,
                phone: InputPhone,
                message: InputMessage,
                sourcePage: '/contact'
            });

            if (response.data.success) {
                setIsSuccess(true);
                toast.success(response.data.message || "Query submitted successfully!");
            } else {
                throw new Error(response.data.message || 'Submission failed');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
            setError({ other: errorMessage });
            toast.error(errorMessage);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section - Simulated Parallax Look */}
            <div className="relative h-[250px] md:h-[400px] overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/assets/contact-BG.jpg')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-teal-800 sm:text-6xl uppercase">
                        Contact Us
                    </h2>
                </div>
            </div>

            {/* Info Cards */}
            <div className="container mx-auto px-4 -mt-10 mb-20">
                <div className="lg:flex justify-center gap-6">
                    {/* Locate Us */}
                    <div className="p-2 lg:w-full lg:max-w-md">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:py-16 h-full flex flex-col justify-center">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Locate Us</p>
                                <div className="mt-6 flex justify-center text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <p className="mt-6 text-sm leading-6 text-gray-600">
                                    <strong>Corporate Office:</strong><br />
                                    Plot No. 112, Udyog Vihar Phase-1,<br />
                                    Sector 20, Gurugram, Haryana 122016<br /><br />
                                    <strong>Registered Office:</strong><br />
                                    C 125/1, Sector 2, Noida 201001
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mail Box */}
                    <div className="p-2 lg:w-full lg:max-w-md">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:py-16 h-full flex flex-col justify-center font-outfit">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">Mail Box</p>
                                <div className="mt-6 flex justify-center text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                </div>
                                <p className="mt-6 text-sm leading-5 text-gray-600">
                                    Drop your Valuable Mail In our Mail Box <br /> we will reach soon.
                                </p>
                                <a
                                    href="mailto:support@creditklick.com"
                                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                                >
                                    Drop here!
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* HelpLine */}
                    <div className="p-2 lg:w-full lg:max-w-md">
                        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:py-16 h-full flex flex-col justify-center">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-gray-600">HelpLine</p>
                                <p className="mt-6 flex justify-center text-gray-900">
                                    <span className="text-3xl font-bold tracking-tight">
                                        +91 8800367367
                                    </span>
                                </p>
                                <p className="mt-6 text-sm leading-5 text-gray-600">
                                    Our Team Here to assist You <br /> <br />
                                </p>
                                <a
                                    href="tel:8800367367"
                                    className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
                                >
                                    Call us!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full flex items-center justify-center my-12">
                    <div className="bg-white shadow-xl border border-gray-100 rounded-2xl py-12 lg:px-28 px-8 max-w-4xl w-full">
                        {IsSuccess ? (
                            <div className="flex flex-col justify-center items-center text-center">
                                <Image
                                    src="/assets/success.gif"
                                    width={400}
                                    height={400}
                                    className="max-w-[300px] h-auto mb-6"
                                    alt="confirmed"
                                />
                                <h3 className="text-2xl font-bold text-gray-800">Your Query is Submitted!</h3>
                                <p className="text-gray-600 mt-2">Please wait, our team will connect with you soon.</p>
                                <Button
                                    variant="outline"
                                    className="mt-8"
                                    onClick={() => {
                                        setIsSuccess(false);
                                        setInputName("");
                                        setInputPhone("");
                                        setInputMessage("");
                                    }}
                                >
                                    Submit Another Query
                                </Button>
                            </div>
                        ) : (
                            <>
                                <p className="md:text-3xl text-2xl font-semibold leading-7 text-center text-gray-700 uppercase tracking-wide">
                                    Submit Your Query
                                </p>
                                <p className="text-red-500 text-center mt-2">{Error?.other}</p>

                                <div className="md:flex gap-6 mt-10">
                                    <div className="flex-1 flex flex-col">
                                        <label className="text-base font-semibold leading-none text-gray-800">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="text-base leading-none text-gray-900 p-4 focus:outline-none focus:border-indigo-700 mt-3 bg-gray-50 border rounded-lg border-gray-200 placeholder-gray-300"
                                            placeholder="Please input name"
                                            onChange={(event) => {
                                                if (event.target.value.length < 30)
                                                    setInputName(event.target.value);
                                            }}
                                            value={InputName}
                                        />
                                        <label className="text-red-500 text-xs mt-1">{Error?.name}</label>
                                    </div>
                                    <div className="flex-1 flex flex-col mt-4 md:mt-0">
                                        <label className="text-base font-semibold leading-none text-gray-800">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            className="text-base leading-none text-gray-900 p-4 focus:outline-none focus:border-indigo-700 mt-3 bg-gray-50 border rounded-lg border-gray-200 placeholder-gray-300"
                                            placeholder="Please input Phone"
                                            onChange={(event) => {
                                                const value = event.target.value;
                                                setInputPhone(value.replace(/[^0-9]/g, "").slice(0, 10));
                                            }}
                                            value={InputPhone}
                                        />
                                        <label className="text-red-500 text-xs mt-1">{Error?.phone}</label>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col mt-8">
                                    <label className="text-base font-semibold leading-none text-gray-800">
                                        Your Query
                                    </label>
                                    <textarea
                                        className="h-36 text-base leading-normal text-gray-900 p-4 focus:outline-none focus:border-indigo-700 mt-3 bg-gray-50 border rounded-lg border-gray-200 placeholder-gray-300 resize-none"
                                        placeholder="Enter your message here..."
                                        onChange={(event) => {
                                            if (event.target.value.length < 300)
                                                setInputMessage(event.target.value);
                                        }}
                                        value={InputMessage}
                                    />
                                    <label className="text-red-500 text-xs mt-1">
                                        {Error?.message}
                                    </label>
                                </div>

                                <p className="text-xs leading-3 text-gray-600 mt-6">
                                    By clicking submit you agree to our terms of service, privacy
                                    policy and how we use data as stated
                                </p>

                                <div className="flex justify-center mt-10">
                                    <button
                                        onClick={() => !IsLoading && SubmitContact()}
                                        className="w-full md:w-auto min-w-[200px] text-base font-semibold leading-none text-white py-5 px-10 bg-indigo-700 rounded-lg hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition-all shadow-lg"
                                        disabled={IsLoading}
                                    >
                                        {IsLoading ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                PLEASE WAIT
                                            </span>
                                        ) : "SUBMIT"}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Map Section */}
                <div className="h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0447959153394!2d77.07547797549878!3d28.50135737573001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19459ca9b8a5%3A0x9f94f0c1d3b3c5d7!2sPlot%20No.%20112%2C%20Udyog%20Vihar%20Phase%201%2C%20Sector%2020%2C%20Gurugram%2C%20Haryana%20122016!5e0!3m2!1sen!2sin!4v1704787200000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="CreditKlick Office - Plot No. 112, Udyog Vihar Phase-1, Gurugram"
                    />
                </div>
            </div>
            <Toaster position="top-center" />
        </div>
    );
}

// Simple Button component if not available globally
function Button({ children, className, onClick, variant = 'primary' }: any) {
    const baseClass = "px-6 py-2 rounded-lg font-medium transition-all"
    const variants: any = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
    }
    return (
        <button onClick={onClick} className={`${baseClass} ${variants[variant]} ${className}`}>
            {children}
        </button>
    )
}
