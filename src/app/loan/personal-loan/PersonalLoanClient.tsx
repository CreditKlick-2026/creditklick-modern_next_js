"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, IndianRupee, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const eligibility = [
    { id: 1, criteria: 'Nationality', salaried: 'Indian Resident', selfemployed: 'Indian Resident' },
    { id: 2, criteria: 'Age', salaried: '23 to 62 years', selfemployed: '25 to 70 years' },
    { id: 3, criteria: 'Work Experience', salaried: '3 years', selfemployed: '5 years of vintage with the current enterprise' },
    { id: 4, criteria: 'Minimum monthly income', salaried: 'Rs. 30,000 to Rs. 50,000 depending on the city of residence and age', selfemployed: 'Rs. 30,000 to Rs. 40,000 depending on the city of residence and age' }
]

const stepsToApply = [
    { id: 1, heading: 'STEP 1', content: 'Click on APPLY NOW' },
    { id: 2, heading: 'STEP 2', content: "Enter your mobile no. and click on 'I have read & agreed to the terms and conditions'." },
    { id: 3, heading: 'STEP 3', content: 'Click on VERIFY' },
    { id: 4, heading: 'STEP 4', content: 'Please enter OTP sent to your mobile no. and click NEXT' },
    { id: 5, heading: 'STEP 5', content: 'Please enter First Name, Last Name, Email Address, City and click on CONTINUE' },
    { id: 6, heading: 'STEP 6', content: 'Facility to check your Loan status on the go' }
]

const faqs = [
    {
        id: 1,
        question: 'What credit score is required to obtain a personal loan?',
        answer: "It all depends on the eligibility criteria that the lender has set. Lenders don't usually require a minimum credit score to get a personal loan. Although some lenders will lend to applicants with lower credit scores (less than 750), the interest rate is generally higher."
    },
    {
        id: 2,
        question: 'Can I cancel a personal mortgage after the loan amount has been paid?',
        answer: "You may cancel a personal loan at any time after disbursal, subject to the lender's terms. Cancellation fees and cancellation charges will apply to loans. All banks prohibit loan cancellation after the amount has been paid. You can prepay the loan amount according to the bank's terms and conditions and save the interest."
    },
    {
        id: 3,
        question: 'Is there a minimum income required to obtain a personal loan?',
        answer: 'Personal loans are available to those with a minimum monthly income. It varies from one lender to the next. For large lenders, such as public and private sector banks, the minimum income eligibility for personal loans is Rs. 15,000 per month or more.'
    },
    {
        id: 4,
        question: 'Can I get personal loans if I am a pensioner and have a pension account at one of the top banks in India?',
        answer: 'You can get a personal mortgage even if you are a retired person if your pension account is with one of the top banks. You should check that your bank offers personal loans to pensioners.'
    },
    {
        id: 5,
        question: 'What is the process for applying for a personal loan for a student?',
        answer: 'Students are generally not eligible for personal loans as they must have a steady source of income and good credit. A personal loan is possible if you have a steady monthly income and meet the other eligibility requirements.'
    },
    {
        id: 6,
        question: 'What personal loans can I get for my marriage?',
        answer: 'You can get a personal loan to cover wedding-related expenses. Personal loans have flexible repayment terms. Many lenders offer personal loans specifically designated as marriage/wedding loans.'
    }
]

const additionalCriteria = [
    'Employment stability: Minimum two years of work experience in the same job for salaried.',
    'Employment Type: Salaried workers work with reputable organisations, MNCs and private and public limited companies, and the government. Organisations, PSUs and large enterprises',
    'Credit Score: Preferably 750 or higher as higher credit scores increase loan approval chances',
    'Salary: At minimum Rs. 15,000 per month for salaried customers',
    'Self-employed professionals must ensure their business operations can continue without interruption for a minimum of two years.',
    'Income: At minimum Rs. 5 lakhs per annum for self-employed customers'
]

const documents = [
    { title: 'KYC Documents', content: 'Aadhar card, PAN card, voter ID card, driving licence or any other government-approved KYC document' },
    { title: 'Address Proof', content: 'Documents such as your electricity bill, rent agreement, or passport may be used as proof of address' },
    { title: 'Financial Documents', content: 'Bank account statement and other financial documents' },
    { title: 'Employee ID Card', content: '' }
]

export default function PersonalLoanClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const toggleFaq = (id: number) => {
        setOpenFaq(openFaq === id ? null : id)
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <section className="mx-4 mt-10">
                <div className="container mx-auto">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-blue-100 rounded-xl shadow-md overflow-hidden"
                    >
                        <div className="md:flex">
                            <div className="p-10 space-y-6 md:flex-1">
                                <h1 className="text-2xl font-bold text-blue-900 uppercase">
                                    PERSONAL LOAN
                                </h1>
                                <p className="text-blue-800 text-justify">
                                    CreditKlick offers personal loans from more than 30 banks and non-bank
                                    financial institutions suitable for different consumer segments. Consumers
                                    can compare key loan features from the best lenders and apply for the best
                                    loan option. We have also formed unique partnerships with multiple banks and
                                    NBFCs to offer pre-approved/pre-qualified personal loans with end-to-end
                                    digital processing and instant disbursement.
                                </p>
                                <Link href="/credit-score">
                                    <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                                        Apply Now
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="md:shrink-0 p-5 flex items-center justify-center">
                                <img
                                    src="/assets/pers.png"
                                    alt="Personal Loan"
                                    className="object-contain rounded-xl max-w-xs"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="hover:shadow-xl m-2 p-6 rounded-xl bg-white"
                    >
                        <Clock className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">
                            Minimal Documentation
                        </p>
                        <p className="text-gray-600">
                            The Personal Loan Documentation process at CreditKlick varies from
                            individual to individual. The requirements are based on your
                            profession, income and loan ...
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="hover:shadow-xl m-2 p-6 rounded-xl bg-white"
                    >
                        <CheckCircle className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">
                            Balance Transfer
                        </p>
                        <p className="text-gray-600">
                            Balance Transfer Facility to all existing Personal Loan holders
                            running a successful Personal Loan with an external Bank: with the
                            transfer of the Loan the applicant will benefit.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="hover:shadow-xl m-2 p-6 rounded-xl bg-white"
                    >
                        <IndianRupee className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">
                            Minimum Rs50,000 Loan Amount
                        </p>
                        <p className="text-gray-600">
                            The best personal loan banks in India for a ₹ 50,000 loans as they
                            offer personal loan at lowest rate of 10.49%.
                        </p>
                    </motion.div>
                </div>

                <div className="text-center mt-8">
                    <Link href="/credit-score">
                        <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                            Apply Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Eligibility Section */}
            <section className="container mx-auto mt-10 px-4">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-xl font-bold text-blue-800">
                        Personal Loan Eligibility Criteria
                    </h2>
                    <p className="text-blue-700">
                        The following factors are taken into consideration when a lender goes
                        through your loan application. If you meet these criteria, you are
                        eligible for a personal loan:
                    </p>

                    {/* Eligibility Table */}
                    <div className="overflow-x-auto">
                        <table className="table-auto mx-auto border-collapse">
                            <thead className="bg-blue-200 text-blue-900">
                                <tr>
                                    <th className="border border-blue-300 p-3">Criteria</th>
                                    <th className="border border-blue-300 p-3">Salaried</th>
                                    <th className="border border-blue-300 p-3">Self-Employed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eligibility.map((item) => (
                                    <tr key={item.id} className="bg-white">
                                        <td className="border border-blue-200 p-3 font-medium">{item.criteria}</td>
                                        <td className="border border-blue-200 p-3">{item.salaried ? item.salaried : ''}</td>
                                        <td className="border border-blue-200 p-3">{item.selfemployed ? item.selfemployed : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Additional Criteria */}
                    <div className="text-left md:mx-8 mt-4">
                        <ul className="space-y-2">
                            {additionalCriteria.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </section>

            {/* Documents Section */}
            <section className="container mx-auto my-8 px-4">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-gray-100 p-6 rounded-lg"
                >
                    <h2 className="text-xl font-bold text-blue-800 text-center mb-4">
                        Document required for a Personal Loan
                    </h2>
                    <p className="text-blue-700 mb-4">
                        Keep the following documents on hand when filling the online application form
                    </p>

                    <ul className="space-y-3">
                        {documents.map((doc, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span>
                                    <b className="text-gray-800">{doc.title}</b>
                                    {doc.content && ` - ${doc.content}`}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="text-red-600 mt-4">
                        Note - Latest Salary Slip or Form 16, Bank account statement of the last 6 months
                    </p>
                </motion.div>
            </section>

            {/* How to Apply Section */}
            <section className="container mx-auto my-8 px-4">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-gray-100 p-6 rounded-lg"
                >
                    <h2 className="text-xl font-bold text-blue-900 text-center mb-6">
                        HOW TO APPLY
                    </h2>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                        {stepsToApply.map((step) => (
                            <div
                                key={step.id}
                                className="bg-white p-4 rounded-xl hover:shadow-lg transition-shadow text-center"
                            >
                                <p className="text-xl text-blue-400 font-semibold mb-3">
                                    {step.heading}
                                </p>
                                <p className="text-blue-800">
                                    {step.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="text-center mt-8">
                    <Link href="/credit-score">
                        <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                            Apply Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="relative">
                <div
                    className="w-full h-64 md:h-96 bg-gradient-to-r from-blue-600 to-blue-800"
                    style={{
                        backgroundImage: 'url(https://i.ibb.co/DQ4FZhL/pattern-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute top-0 left-0 right-0 text-center py-20">
                    <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white">
                        Frequently asked questions
                    </h2>
                </div>

                <div className="flex flex-col items-center justify-center px-4 pb-10 -mt-32 md:-mt-48">
                    <div className="lg:w-1/2 md:w-8/12 sm:w-9/12 w-full space-y-4">
                        {faqs.map((faq) => (
                            <motion.div
                                key={faq.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="p-6 bg-white shadow-lg">
                                    <div
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={() => toggleFaq(faq.id)}
                                    >
                                        <h3 className="text-base md:text-lg font-semibold text-gray-800 pr-4">
                                            {faq.question}
                                        </h3>
                                        <button className="focus:outline-none text-blue-600">
                                            {openFaq === faq.id ? (
                                                <ChevronUp className="w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {openFaq === faq.id && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="text-gray-600 mt-4"
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="text-center py-8">
                <Link href="/credit-score">
                    <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                        Apply for Personal Loan
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
            </section>
        </div>
    )
}
