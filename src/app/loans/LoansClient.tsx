"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const loanTypes = [
    { name: 'Personal Loan', image: '/assets/Images/Loans/PL1.png', href: '/loan/personal-loan', color: 'from-blue-500 to-blue-600' },
    { name: 'Home Loan', image: '/assets/Images/Loans/HL1.png', href: '/loan/home-loan', color: 'from-green-500 to-green-600' },
    { name: 'Business Loan', image: '/assets/Images/Loans/BL2.png', href: '/loan/business-loan', color: 'from-purple-500 to-purple-600' }
]

const loanDetails = [
    {
        heading: 'One Stop Shop for Multiple Products',
        content: 'CreditKlick provides an array of loan solutions tailored to meet your individual needs. Whether it\'s a personal loan, home loan or car loan, CreditKlick has multiple reliable choices in each case.'
    },
    {
        heading: 'Lowest interest rates',
        content: 'CreditKlick partners with industrial giants to offer you the lowest interest rates on personal, car or home loans. This translates into savings over time in the form of lower monthly payments for you.'
    },
    {
        heading: 'Ease of use',
        content: 'CreditKlick.com has been designed with ease of use in mind; all you have to do is select your loan option and answer a series of straightforward questions.'
    },
    {
        heading: 'Simple online comparison',
        content: 'CreditKlick uses various parameters when assessing loans for suitability - rate of interest, EMIs, processing fees, customer feedback.'
    },
    {
        heading: 'Transparency',
        content: 'Transparency is paramount when it comes to loans. CreditKlick.com ensures all loan options presented to you are open and have no hidden charges.'
    },
    {
        heading: 'Privacy & Trust',
        content: 'CreditKlick takes your privacy seriously. Any personal information provided to us is solely shared with your chosen lender.'
    }
]

const loanSteps = [
    {
        step: 'Step 1',
        content: 'Go to CreditKlick\'s website and select the LOANS menu option. Choose which type of loan you need from options such as Personal Loan, Home Loan, or Business Loan.'
    },
    {
        step: 'Step 2',
        content: 'Enter all required information such as loan amount, preferred tenure, income and employment details. CreditKlick provides an intuitive wizard to guide you.'
    },
    {
        step: 'Step 3',
        content: 'Once you\'ve selected a loan option, you can begin the application process. CreditKlick will require some additional details before approving your application.'
    },
    {
        step: 'Step 4',
        content: 'Once you submit your application, you will receive an e-approval. Your loan application will then be transferred to the lender of your choice.'
    }
]

export default function LoansClient() {
    return (
        <div>
            {/* Animated Strip */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-500 py-4 overflow-hidden"
            >
                <div className="flex items-center justify-center text-white font-bold">
                    <span className="mr-4">WE PROVIDE</span>
                    <motion.div
                        animate={{ x: ['0%', '-100%'] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="flex space-x-8"
                    >
                        <span>PERSONAL LOAN</span>
                        <span className="mx-8">•</span>
                        <span>HOME LOAN</span>
                        <span className="mx-8">•</span>
                        <span>BUSINESS LOAN</span>
                        <span className="mx-8">•</span>
                        <span>PERSONAL LOAN</span>
                        <span className="mx-8">•</span>
                        <span>HOME LOAN</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Loan Types */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <p className="text-lg text-blue-900 font-semibold uppercase">
                            We are here to help you. <br /> Choose the kind of loan
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {loanTypes.map((loan, index) => (
                            <motion.div key={loan.name} variants={fadeInUp}>
                                <Link href={loan.href}>
                                    <Card className="text-center p-6 h-full group">
                                        <img
                                            src={loan.image}
                                            alt={loan.name}
                                            className="rounded-xl shadow-lg mb-4 mx-auto group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <h3 className="text-lg font-semibold text-blue-800 mb-4">{loan.name}</h3>
                                        <Button variant="default" className="group-hover:bg-blue-700">
                                            Apply Now
                                        </Button>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Why CreditKlick */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            The Importance of Choosing the Right Loan in India
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Loans have become an essential component of modern society, especially in India.
                            From buying a house, to car repairs, to education or personal emergencies, there is a loan for everyone!
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                            Why Apply for a Loan at CreditKlick?
                        </h3>

                        <div className="space-y-6">
                            {loanDetails.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500"
                                >
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">{item.heading}</h4>
                                    <p className="text-gray-600">{item.content}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center my-12">
                            <Link href="/credit-score">
                                <Button variant="gradient" size="lg">
                                    Apply for Loan Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                            How to get a Loan through CreditKlick?
                        </h3>

                        <div className="space-y-4">
                            {loanSteps.map((item, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 uppercase mb-1">{item.step}</h4>
                                        <p className="text-gray-600 text-sm">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
