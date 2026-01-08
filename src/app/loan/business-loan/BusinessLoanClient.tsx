"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, IndianRupee, Percent, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
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

const additionalCriteria = [
    'Self-employed professionals and self-employed non-professionals can apply for the loan',
    'Self-employed professionals include chartered accountants, chartered accountants and company secretaries. Only those applicants who can show proof of their qualifications and are also practising their profession are eligible to apply.',
    'Non-professional traders and manufacturers are examples of self-employed professionals.',
    'These entities include partnerships, limited liability partnerships and private limited companies.',
    'A minimum turnover of Rs.40 Lakh may be required for the business.',
    'A minimum of three years of experience is required in your current business.',
    'You must have at least five years\' experience in the business.',
    'For the past two years, the business should have made a profit.',
    'A minimum annual income (ITR) is required to be Rs. 1.5 lakh per annum.',
    'The applicants should be between 25 and 55 years old.',
    'You should have filed the IT returns for the past year.',
    'Lenders might only offer loans for businesses in certain areas.'
]

const documents = [
    'Duly filled application form along with passport size photograph',
    'KYC documents of the applicant including PAN card, Passport, Aadhar Card, Driving License, Voter ID card, Utility Bills (Water/Electricity Bills)',
    'Last 1 years\' bank statement',
    'Copy of Non-Collateral Overdraft, if any',
    'Copy of Business Incorporation',
    'Any other document required by the lender'
]

const stepsToApply = [
    { id: 1, heading: 'STEP 1', content: 'Click on APPLY NOW' },
    { id: 2, heading: 'STEP 2', content: "Enter your mobile no. and click on 'I have read & agreed to the terms and conditions'." },
    { id: 3, heading: 'STEP 3', content: 'Click on VERIFY' },
    { id: 4, heading: 'STEP 4', content: 'Please enter OTP sent to your mobile no. and click NEXT' },
    { id: 5, heading: 'STEP 5', content: 'Please enter First Name, Last Name, Email Address, City and click on CONTINUE' },
    { id: 6, heading: 'STEP 6', content: 'Facility to check your Loan status on the go' }
]

const reasonsForLoan = [
    { title: 'When starting a new business', content: 'A business loan is available to entrepreneurs who have a business idea and want to make it a profitable venture. To ensure that your loan application is approved, proving that your business idea can generate significant profits to repay the loan interest is essential.' },
    { title: 'To expand your business', content: 'A business loan can be a great way to arrange the funds needed to expand an organisation. A business expansion could include opening a new department, launching a product, or upgrading an existing one.' },
    { title: 'To buy machinery and equipment', content: 'A business needs to have a steady supply of a product that is in high demand. The organisation may need to invest in new technology and equipment to increase production.' },
    { title: 'To manage cash flows within an organisation', content: 'Small businesses often have difficulty ensuring that there is sufficient cash flow. A business may struggle to meet its working capital requirements.' },
    { title: 'Working capital required for business', content: 'It is hard to pay regular expenses like salaries, supplies and raw materials when cash flow is low in an organisation.' },
    { title: 'Turn business losses into profits', content: 'A business loan can be used even for less successful businesses with a practical plan that includes significant changes in business operations.' },
    { title: 'To repay previous debts', content: 'It is a good idea to repay several small debts with a large loan to avoid hefty interest payments.' },
    { title: 'Running a seasonal business', content: 'It might be difficult to manage expenses when your business is only in high demand during certain times of the year. You can get a short-term loan for your business.' }
]

const thingsToConsider = [
    { title: 'Calculate how much your business requires', content: 'Lenders often offer large loans to self-employed and business owners. Evaluating your financing needs and finding a loan that can help you finance your business is essential. You should not borrow more than you need as the repayments may be difficult.' },
    { title: 'Learn more about the types of loans available to businesses', content: 'Many banks and lenders offer multiple business loans as part of their product range. There are many options for repayment, including loan terms, loan amounts, tenures and repayment options.' },
    { title: 'Your credit score is a measure of your creditworthiness', content: 'A person with good credit is less likely to default on their payments. Before approving a loan, lenders will usually inspect your credit score. A credit score of at least 750 is recommended.' },
    { title: 'Learn the repayment terms', content: 'For business loans, the amount borrowed is usually repaid using Equated Monthly Installments. Lenders will usually consider your ability to repay the loan.' },
    { title: 'Review the charges', content: 'The charges for business loans include interest rate, preclosure fee and documentation fees, as well as processing fee. There may also be a part-payment fee or default fee.' }
]

const faqs = [
    {
        id: 1,
        question: 'What security do I need to provide to obtain a loan for my business?',
        answer: 'A business loan does not require collateral or security. However, a careful review of your documents will confirm this. To find out what the terms and conditions of your lender requirements are, you can review them.'
    },
    {
        id: 2,
        question: 'I am a physician and have been practicing for ten years. To start my own practice, can I get a loan for a business?',
        answer: 'All practicing professionals are eligible for business loans, provided they can provide proof of their qualifications.'
    },
    {
        id: 3,
        question: 'Do I need to give my personal information to use the EMI calculator and calculate EMIs for my business loan?',
        answer: 'You will not be asked to provide personal information when calculating your expected EMI. The EMI calculator requires only the amount of the loan you are applying for, the term of the loan and the interest rate.'
    },
    {
        id: 4,
        question: 'What are the purposes of a business loan?',
        answer: 'A business loan can be applied for: Small business financing, Working Capital Finance, Renovation of your home, Finance for business expansion.'
    },
    {
        id: 5,
        question: 'How much liquidity is the Reserve Bank of India (RBI) under the AtmanirbharBharat Abhiyan plan?',
        answer: 'The RBI will inject Rs.3.74 million crores, of which Targeted Long Term Repo Operations will be worth Rs.1 crore. One hundred basis points will cut the Cash Reserve Ratio to 3% net demand and time liabilities of Rs.1.37 million crores.'
    },
    {
        id: 6,
        question: 'Does the government have a moratorium on the payment of loans to businesses?',
        answer: 'Yes, you will receive a repayment term of 4 years with a one-year moratorium.'
    }
]

export default function BusinessLoanClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const [openAccordion, setOpenAccordion] = useState<string | null>(null)

    const toggleFaq = (id: number) => {
        setOpenFaq(openFaq === id ? null : id)
    }

    const toggleAccordion = (id: string) => {
        setOpenAccordion(openAccordion === id ? null : id)
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
                                    BUSINESS LOAN
                                </h1>
                                <p className="text-blue-800 text-justify">
                                    Small businesses and entrepreneurs can get business loans to meet their capital needs.
                                    Over 20 financial institutions offer tailored business loans at attractive rates to meet
                                    your financial needs.
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
                                    src="/assets/Images/businessloan.png"
                                    alt="Business Loan"
                                    className="object-contain rounded-xl max-w-xs"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <Clock className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Apply in just 5 minutes</p>
                        <p className="text-gray-600">
                            Now a days, it is not difficult to apply for a loan in 5 minutes. Since money lending
                            and loan applications started online, applying for instant loans became easy
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ delay: 0.1 }} className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <CheckCircle className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Get approved within 72 hours</p>
                        <p className="text-gray-600">
                            The path to achieving your life goals may be often hindered by financial hurdles.
                            Now with 72 hours Loans you can avail instant offers for a range of uses
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ delay: 0.2 }} className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <IndianRupee className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Get loans up to Rs. 50 lakhs</p>
                        <p className="text-gray-600">
                            Avail Business Loan of up to Rs.50 Lakh at attractive interest rates to meet
                            personal urgencies that can crop up anytime in life.
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ delay: 0.3 }} className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <Percent className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Competitive interest rates</p>
                        <p className="text-gray-600">
                            Interest for loans with similar terms charged by private lending institutions in
                            the same area to borrowers of equivalent creditworthiness.
                        </p>
                    </motion.div>
                </div>

                <div className="text-center mt-8">
                    <Link href="/credit-score">
                        <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                            Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Eligibility Section */}
            <section className="container mx-auto mt-10 px-4">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center space-y-4">
                    <h2 className="text-xl font-bold text-blue-800">Business Loan Eligibility Criteria</h2>
                    <p className="text-blue-700">
                        The following factors are taken into consideration when a lender goes through your loan application.
                        If you meet these criteria, you are eligible for a Business loan:
                    </p>

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
                                        <td className="border border-blue-200 p-3">{item.salaried}</td>
                                        <td className="border border-blue-200 p-3">{item.selfemployed}</td>
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
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-blue-800 text-center mb-4">Document required for a Business Loan</h2>
                    <p className="text-blue-700 mb-4">
                        Keep the following documents on hand when filling the online application form
                    </p>

                    <ul className="space-y-3">
                        {documents.map((doc, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span className="text-gray-700">{doc}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </section>

            {/* How to Apply Section */}
            <section className="container mx-auto my-8 px-4">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-blue-900 text-center mb-6">HOW TO APPLY</h2>
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                        {stepsToApply.map((step) => (
                            <div key={step.id} className="bg-white p-4 rounded-xl hover:shadow-lg transition-shadow text-center">
                                <p className="text-xl text-blue-400 font-semibold mb-3">{step.heading}</p>
                                <p className="text-blue-800">{step.content}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="text-center mt-8">
                    <Link href="/credit-score">
                        <Button variant="gradient" size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700">
                            Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Accordion Sections */}
            <section className="container mx-auto mb-10 px-4">
                <div className="max-w-3xl mx-auto space-y-4">
                    {/* Reasons Accordion */}
                    <Card className="overflow-hidden">
                        <button
                            onClick={() => toggleAccordion('reasons')}
                            className="w-full flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 text-left font-medium text-blue-900"
                        >
                            <span>There are many reasons to take a business loan.</span>
                            {openAccordion === 'reasons' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openAccordion === 'reasons' && (
                            <div className="p-4 bg-white">
                                <p className="text-blue-800 font-semibold mb-4">
                                    You can apply for a loan for your business for many reasons. This scheme should only be used when the following conditions are met.
                                </p>
                                <ul className="space-y-4">
                                    {reasonsForLoan.map((reason, index) => (
                                        <li key={index}>
                                            <p className="font-semibold text-blue-900">• {reason.title}</p>
                                            <p className="ml-4 text-gray-600">{reason.content}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Card>

                    {/* Things to Consider Accordion */}
                    <Card className="overflow-hidden">
                        <button
                            onClick={() => toggleAccordion('consider')}
                            className="w-full flex justify-between items-center p-4 bg-blue-100 hover:bg-blue-200 text-left font-medium text-blue-900"
                        >
                            <span>Things to consider when applying for a business loan</span>
                            {openAccordion === 'consider' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {openAccordion === 'consider' && (
                            <div className="p-4 bg-white">
                                <p className="text-blue-800 font-semibold mb-4">
                                    Here are some things you need to consider before applying for a loan for your business:
                                </p>
                                <ul className="space-y-4">
                                    {thingsToConsider.map((thing, index) => (
                                        <li key={index}>
                                            <p className="font-semibold text-blue-900">{thing.title}:</p>
                                            <p className="text-gray-600">{thing.content}</p>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-4 font-semibold text-gray-700">
                                    These are just a few things you need to consider when applying for a loan. It is a good idea to compare different lenders' offers before choosing one that best suits your needs.
                                </p>
                            </div>
                        )}
                    </Card>
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
                        Apply for Business Loan <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
            </section>
        </div>
    )
}
