"use client"

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Percent, Database, MapPin, FileCheck, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
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
        question: "Do I qualify for a home loan to cover the home's value?",
        answer: "No, you can't get a mortgage to the total value of your property because the Reserve Bank of India (RBI) has put a cap on the loan-to-value (LTV) proportion of loans for housing. According to the RBI guidelines, the LTV ratio could be increased to 90 per cent of the property's value for loans up to Rs 30 lakh. For loans of more than 30 lakhs and up to 75 lakhs in the case of Rs 75 lakh, the LTV ratio is limited to 80 per cent of the property's value. Likewise, for loans exceeding 75 lakhs in value, the LTV ratio could go up to 75 per cent of the property's value. It means that at least 10 per cent of the remaining value has to be paid by the lender as a down amount."
    },
    {
        id: 2,
        question: 'How can lenders determine the EMI creditworthiness of their mortgage applicants?',
        answer: "Lenders consider the ability to repay homeowners when assessing their loan application and amount admissibility. House loan lenders generally prefer to lend to home loan applicants with the total EMIs, which includes the EMI of the home loan, which is less than 50-60 per cent of their monthly income. Therefore, home loan applicants can use the online mortgage EMI calculator to determine the best amount of a house loan and length, depending on their capacity to repay."
    },
    {
        id: 3,
        question: 'What credit score do I need to be eligible for a mortgage for my home?',
        answer: 'Lenders prefer sanctioning mortgages for homeowners with a score of 750 or over since good credit scores indicate good credit habits and reduce the risk of credit for lenders. It is why lenders often provide lower interest rates for those with high credit scores. However, some lenders offer loans to homeowners with poor credit scores at higher interest rates.'
    },
    {
        id: 4,
        question: 'Who can co- sign on a home loan ?',
        answer: 'The spouse of your blood relatives, like your mother, father and siblings, can co-sign on a home loan with you. In addition, all co-owners of the property are required to be co-applicants on mortgages for housing.'
    },
    {
        id: 5,
        question: 'Are there any charges for prepayments for a home loan?',
        answer: 'In the case of home loans with floating rates, lenders do not apply a prepayment penalty by RBI guidelines. However, lenders can impose a penalty for early payment in the case of prepayment for mortgages with fixed rates.'
    },
    {
        id: 6,
        question: 'Can I get two loans for my home simultaneously?',
        answer: 'Yes, suppose the creditor of the second loan to you has confidence in your capacity to pay, your credit profile, and the specifics of the pledged property and the property you are pledging. In that case, you may be eligible for another loan to buy another property.'
    }
]

const salariedCriteria = [
    { title: 'Age', content: 'The minimum age to apply for a home loan is 21 years, and the maximum age is 58 years or retirement age, whichever is earlier. A home loan should be repaid before the borrower exceeds the age limit set by the Internal Revenue Service.' },
    { title: 'Income', content: 'The minimum net income required for a salaried individual is Rs. 20.00 thousand per month' },
    { title: 'Work experience and job stability', content: 'The applicant should have at least 2 years of work experience in a full time job.' },
    { title: 'Repayment history for all loans', content: 'A salaried person applying for a home loan should have a clear repayment history for all existing and closed loans and credit cards.' },
    { title: 'Type of Residence', content: 'A loan applicant must reside at the current residence for at least the last 6 months, or it should be an owned or parental property.' },
    { title: 'Credit score', content: 'Employees applying for a home loan should have a CIBIL score (credit score) of at least 700. The CIBIL score depends on your repayment history on bank transactions, loans and credit cards. A good CIBIL score depends on your clear repayment behavior on loans and credit cards. Cases with a CIBIL score of less than 700 will be referred to the bank\'s policy and risk team for a deviation from loan approval.' }
]

const selfEmployedCriteria = [
    { title: 'Age', content: 'The minimum age to apply for a home loan is 21 years and the maximum age is 65 years. A home loan should be repaid before the borrower exceeds the age limit set by the lender.' },
    { title: 'Income', content: 'The minimum net income required for a self-employed person is Rs. 2.50 lacs per annum.' },
    { title: 'Work experience and professional stability', content: 'The loan applicant must have been in business for at least 3 years at the time of applying for the loan.' },
    { title: 'Repayment history of all loans', content: 'A self-employed person applying for a home loan should have a clear repayment history for all existing and closed loans and credit cards taken in the name of the business or individual.' },
    { title: 'Type of Residence', content: 'A loan applicant must reside at the current residence for at least the last 6 months or it should be owned or parental property.' },
    { title: 'Credit Bureau Score', content: 'Self-employed individuals applying for a home loan must have a CIBIL score (credit bureau score) of at least 700. The CIBIL score depends on your repayment history on bank transactions, loans and credit cards.' }
]

export default function HomeLoanClient() {
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
                                    HOME LOAN
                                </h1>
                                <p className="text-blue-800 text-justify">
                                    Banks and Housing Finance Companies (HFCs) offer housing loans ranging from 75% to 90%
                                    of the value of the property, depending on the creditworthiness of the borrower, subject
                                    to lending limits set by banks and the RBI. The term of a home loan can be up to 30 years
                                    and is based on the age of the borrower and their ability to repay the loan. At CreditKlick.com,
                                    we help you evaluate home loan interest rates and other services offered by leading banks
                                    and HFCs. You can also apply online to get the best option for your credit report.
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
                                    src="/assets/authloan.png"
                                    alt="Home Loan"
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
                        <Percent className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Low EMI</p>
                        <p className="text-gray-600">
                            Apply for higher loan amount with an extended tenure of 30 years to enjoy low EMIs
                        </p>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ delay: 0.1 }} className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <Database className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Vast database of CreditKlick approved projects</p>
                        <p className="text-gray-600">Enjoy faster loan disbursement in projects approved by us</p>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ delay: 0.2 }} className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <MapPin className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Trackmyloan</p>
                        <p className="text-gray-600">Facility to check your Home Loan status on the go</p>
                    </motion.div>

                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        transition={{ delay: 0.3 }} className="hover:shadow-xl m-2 p-6 rounded-xl bg-white">
                        <FileCheck className="w-16 h-16 text-blue-600 mb-4" />
                        <p className="font-semibold text-lg text-blue-600 mb-2">Simplified Disbursement</p>
                        <p className="text-gray-600">Hassle-free disbursement with minimal documentation</p>
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
                    <h2 className="text-xl font-bold text-blue-800">Home Loan Eligibility Criteria</h2>
                    <p className="text-blue-700">
                        The following factors are taken into consideration when a lender goes through your loan application.
                        If you meet these criteria, you are eligible for a home loan:
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
                </motion.div>
            </section>

            {/* Documents Section */}
            <section className="container mx-auto my-8 px-4">
                <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-blue-800 text-center mb-4">Document required for a Home Loan</h2>
                    <p className="text-blue-700 mb-6">
                        Housing loans provided by banks and NBFCs are secured loans and are provided for a long term,
                        taking into account the amount of the loan and the income of the individual. Different lenders
                        or financiers have different criteria for credit worthiness which include age, income, business,
                        job stability etc.
                    </p>

                    <h3 className="text-lg font-bold text-blue-700 mb-4">
                        Home Loan Income Eligibility and criteria for Salaried Individuals
                    </h3>
                    <ul className="space-y-3 mb-6">
                        {salariedCriteria.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span><b className="text-gray-800">{item.title} - </b>{item.content}</span>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-lg font-bold text-blue-700 mb-4">
                        Income requirements and criteria for self-employed entrepreneurs for a housing loan
                    </h3>
                    <p className="text-blue-700 mb-4">
                        An independent contractor must be a resident of India and have valid KYC (know your customer)
                        and financial statements, as well as a regular and stable monthly business income to repay the loan.
                    </p>
                    <ul className="space-y-3 mb-6">
                        {selfEmployedCriteria.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <span className="text-blue-600">•</span>
                                <span><b className="text-gray-800">{item.title} - </b>{item.content}</span>
                            </li>
                        ))}
                    </ul>

                    <p className="font-semibold text-gray-800 mb-4">
                        To be eligible to apply for housing loan under self-employed scheme, the loan applicant should
                        be running his own business and may be engaged in trade, manufacturing, service, consultancy
                        or professional practice like CA, CS, doctor etc. He should pay income tax and other taxes
                        required by law on time.
                    </p>

                    <p className="text-red-600">
                        NOTE: Apart from the parameters mentioned above, your credit eligibility for a mortgage also
                        depends on the type of property you're purchasing and the area in which the home is situated.
                    </p>
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

            {/* FAQ Section */}
            <section className="relative">
                <div className="w-full h-64 md:h-96 bg-gradient-to-r from-blue-600 to-blue-800"
                    style={{ backgroundImage: 'url(https://i.ibb.co/DQ4FZhL/pattern-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="absolute top-0 left-0 right-0 text-center py-20">
                    <h2 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white">Frequently asked questions</h2>
                </div>

                <div className="flex flex-col items-center justify-center px-4 pb-10 -mt-32 md:-mt-48">
                    <div className="lg:w-1/2 md:w-8/12 sm:w-9/12 w-full space-y-4">
                        {faqs.map((faq) => (
                            <motion.div key={faq.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <Card className="p-6 bg-white shadow-lg">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFaq(faq.id)}>
                                        <h3 className="text-base md:text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                                        <button className="focus:outline-none text-blue-600">
                                            {openFaq === faq.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {openFaq === faq.id && (
                                        <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-gray-600 mt-4">
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
                        Apply for Home Loan <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </Link>
            </section>
        </div>
    )
}
