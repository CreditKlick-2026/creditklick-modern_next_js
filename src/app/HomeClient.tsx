"use client"

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
// Dynamic imports for heavy libraries - chart.js is ~200KB, only needed for EMI calculator
const DoughnutChart = dynamic(
    () => import('react-chartjs-2').then(async (mod) => {
        const { Chart, ArcElement, Tooltip, Legend } = await import('chart.js')
        Chart.register(ArcElement, Tooltip, Legend)
        return mod.Doughnut
    }),
    { ssr: false }
)

import ScoreAnimation from '@/components/animations/ScoreAnimation'

// Dynamic imports for hidden slide animation components to reduce initial bundle size
const CardAnimation = dynamic(() => import('@/components/animations/CardAnimation'), { ssr: false })
const LoanAnimation = dynamic(() => import('@/components/animations/LoanAnimation'), { ssr: false })
const AppSlider = dynamic(() => import('@/components/animations/AppSlider'), { ssr: false })

// Direct image URLs to avoid JS bundle bloat from static imports
const ccico = '/assets/heroimages/ccgifw.webp'
const ploico = '/assets/heroimages/persloan2.webp'
const bloico = '/assets/heroimages/busiloan2.webp'
const calico = '/assets/heroimages/calc2.webp'
const credscore = '/assets/heroimages/credscore2.webp'
const refineico = '/assets/heroimages/refine2.webp'
const discoverImg = '/assets/heroimages/discover.4c95c246e689d0ca4a91-_1__1.webp'
const expertImg = '/assets/heroimages/expert2.webp'
const ani = '/assets/heroimages/ani.webp'
const ein = '/assets/heroimages/ein.webp'
const fox = '/assets/heroimages/fox.webp'
const ksnt = '/assets/heroimages/ksnt.webp'
const lokmattimes = '/assets/heroimages/lokmat.webp'
const theprint = '/assets/heroimages/theprint.webp'
const Logo = '/assets/img/newlogo.webp'

const sliderData = [
    {
        id: 1,
        text1: 'Get Your Latest & FREE',
        text2: 'Credit Report',
        text3: "The smart choice when it comes to finding credit that's just right for you",
        url: '/credit-score',
        btntext: 'CHECK FREE CREDIT SCORE',
        animation: 'score'
    },
    {
        id: 2,
        text1: 'THE WAIT IS OVER',
        text2: 'OUR FINANCE APP IS HERE',
        text3: 'Get all your credit histories in your hand, check your CRIF credit score and apply for various loans and cards.',
        url: 'https://play.google.com/store/apps/details?id=com.creditklick.creditklick',
        btntext: 'DOWNLOAD NOW',
        animation: 'app'
    },
    {
        id: 3,
        text1: 'Instant Credit Card Approval',
        text2: 'Enjoy Premium Benefits',
        text3: '100% Contactless Application Process with instant approval from top banks',
        url: '/credit-cards',
        btntext: 'APPLY FOR CREDIT CARD',
        animation: 'card'
    },
    {
        id: 4,
        text1: 'Instant Loan Approval',
        text2: 'Enjoy Premium Benefits',
        text3: '100% Contactless Application Process with instant approval from top banks',
        url: '/loans',
        btntext: 'APPLY FOR LOAN',
        animation: 'loan'
    }
]

const RenderAnimation = ({ type }: { type: string }) => {
    switch (type) {
        case 'score': return <ScoreAnimation />
        case 'app': return <AppSlider />
        case 'card': return <CardAnimation />
        case 'loan': return <LoanAnimation />
        default: return <ScoreAnimation />
    }
}
function Slidernew() {
    const [current, setCurrent] = useState(0)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)
    const sliderIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const length = sliderData.length
    const minSwipeDistance = 50

    const nextSlide = () => setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1))

    const startSlider = () => {
        if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current)
        sliderIntervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
        }, 3000)
    }

    const stopSlider = () => {
        if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current)
    }

    useEffect(() => {
        startSlider()
        return () => stopSlider()
    }, [length])

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
        stopSlider()
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            nextSlide()
        }
        if (isRightSwipe) {
            prevSlide()
        }
        startSlider()
    }

    return (
        <div className="flex items-center justify-between mx-auto container overflow-hidden md:h-96 sm:my-20 my-1 touch-pan-y"
            onMouseEnter={stopSlider}
            onMouseLeave={startSlider}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div className="m-1 p-1 rounded-full shadow-lg bg-white sm:block hidden z-10">
                <ChevronLeft className="sm:text-lg text-sm cursor-pointer w-5 h-5" onClick={prevSlide} />
            </div>
            <div className="carousel-wrapper px-1 mx-auto flex-1 relative h-full">
                {sliderData.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`transition-all duration-500 ${index === current ? 'block opacity-100' : 'hidden opacity-0'}`}
                    >
                        {index === current && (
                            <div className="sm:flex sm:w-full sm:pl-0 md:pl-2">
                                <div className="flex-col m-auto justify-center h-4/5 space-y-3 md:pl-8">
                                    <h1 className="sm:text-md md:text-xl lg:text-2xl text-lg md:text-left text-center font-semibold text-blue-600 mt-2">
                                        {slide.text1}
                                    </h1>
                                    <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-xl md:text-left text-center font-semibold text-blue-900 my-2">
                                        {slide.text2}
                                    </h1>
                                    <h1 className="md:text-xl text-sm font-normal md:text-left text-center text-blue-900 md:mt-4">
                                        {slide.text3}
                                    </h1>
                                    <Link href={slide.url} target={slide.url.startsWith('http') ? '_blank' : '_self'}>
                                        <button className="md:mx-0 mx-auto font-semibold text-sm lg:text-md tracking-wider shadow-xl bg-blue-500 rounded text-white border-blue-400 border px-3 py-2 lg:p-4 my-4 flex items-center hover:bg-blue-600 transition-colors">
                                            {slide.btntext}
                                            <ArrowRight className="text-lg ml-2 w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                                <div className="m-auto sm:p-2 w-4/5">
                                    <div className="w-56 sm:w-64 md:w-64 lg:w-72 xl:w-96 mx-auto">
                                        <RenderAnimation type={slide.animation} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="m-1 p-1 rounded-full shadow-lg bg-white sm:block hidden z-10">
                <ChevronRight className="sm:text-lg text-sm cursor-pointer w-5 h-5" onClick={nextSlide} />
            </div>
        </div>
    )
}

function Product() {
    const productData = [
        { link: '/credit-score', img: credscore, text: 'CREDIT SCORE' },
        { link: '/credit-cards', img: ccico, text: 'CARDS' },
        { link: '/loan/personal-loan', img: ploico, text: 'PERSONAL LOANS' },
        { link: '/loan/business-loan', img: bloico, text: 'BUSINESS LOAN' },
        { link: '/refine', img: refineico, text: 'CREDIT REFINE' },
        { link: '/calculators', img: calico, text: 'CALCULATORS' }
    ];

    const scrollRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const container = scrollRef.current
        if (!container) return
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
        }, { threshold: 0.05 })
        observer.observe(container)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer || !isInView) return

        let animationFrameId: number

        const scroll = () => {
            if (!isPaused && scrollContainer) {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
            }
            animationFrameId = requestAnimationFrame(scroll)
        }
        animationFrameId = requestAnimationFrame(scroll)

        return () => cancelAnimationFrame(animationFrameId)
    }, [isPaused, isInView])

    return (
        <div className="my-4 w-full overflow-hidden py-4 bg-white">
            <div className="relative w-full">
                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-6 px-4 py-2 overflow-x-auto no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {[...productData, ...productData, ...productData, ...productData].map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-32 sm:w-40 md:w-44">
                            <div className="w-full h-full bg-gray-50 py-4 px-3 rounded-xl border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex flex-col items-center justify-center group">
                                <Link href={item.link} prefetch={true} className="flex flex-col items-center justify-center w-full">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 relative mb-2">
                                        <Image
                                            src={item.img}
                                            alt={item.text}
                                            className="object-contain group-hover:scale-125 transition-transform duration-500 ease-in-out"
                                            fill
                                            sizes="(max-width: 640px) 40px, 56px"
                                        />
                                    </div>
                                    <p className="font-semibold text-gray-800 group-hover:text-black tracking-wider text-center text-xs sm:text-sm whitespace-nowrap transition-colors duration-300">
                                        {item.text}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Cibilstr() {
    return (
        <div className="rounded-xl px-6 mt-6 bg-white container mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1 mt-20 mb-10 justify-between items-center bg-white rounded-2xl p-8 shadow-sm">
                <div className="sm:max-w-lg m-auto space-y-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-blue-900 md:text-5xl">
                        Discover your Credit Health for FREE
                    </h1>
                    <h2 className="text-xl font-semibold tracking-tight text-blue-900 md:text-3xl">
                        Check your Credit Score today
                    </h2>
                    <p className="mt-4 md:text-xl text-md text-gray-500">
                        Get a better understanding of your financial health with a free
                        Credit Score check today. Discover where you stand and take
                        control of your Credit with ease!
                    </p>
                    <div className="md:flex-none flex w-full md:justify-start justify-center font-medium">
                        <Link
                            href="/credit-score"
                            prefetch={true}
                            className="bg-blue-600 md:w-auto w-full text-center text-white hover:bg-indigo-700 py-3 px-8 rounded-md border border-transparent shadow-lg transition-all"
                        >
                            Check Now
                        </Link>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-8 md:mt-0">
                    <Image src={discoverImg} width={400} height={400} className="m-auto object-contain max-h-[400px]" alt="Discover Credit Health" />
                </div>
            </div>
        </div>
    )
}

function CalcHero() {
    type CalculatorType = 'personal' | 'home' | 'car';
    const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('personal')
    const [loanAmount, setLoanAmount] = useState(500000)
    const [interestRate, setInterestRate] = useState(15)
    const [tenure, setTenure] = useState(60)

    const loanConfigs = {
        personal: { name: 'PERSONAL LOAN', minAmount: 20000, maxAmount: 10000000, minRate: 1, maxRate: 30, minTenure: 6, maxTenure: 120, defaultAmount: 500000, defaultRate: 15, defaultTenure: 60 },
        home: { name: 'HOME LOAN', minAmount: 50000, maxAmount: 50000000, minRate: 1, maxRate: 30, minTenure: 1, maxTenure: 360, defaultAmount: 5000000, defaultRate: 8.5, defaultTenure: 240 },
        car: { name: 'CAR LOAN', minAmount: 200000, maxAmount: 5500000, minRate: 9, maxRate: 25, minTenure: 12, maxTenure: 108, defaultAmount: 800000, defaultRate: 9, defaultTenure: 60 }
    }

    const handleLoanTypeChange = (type: CalculatorType) => {
        setActiveCalculator(type)
        const config = loanConfigs[type]
        setLoanAmount(config.defaultAmount)
        setInterestRate(config.defaultRate)
        setTenure(config.defaultTenure)
    }

    const calculations = useMemo(() => {
        const P = loanAmount
        const R = interestRate / 12 / 100
        const N = tenure
        const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1)
        const calculatedEmi = isNaN(emi) ? 0 : Math.round(emi)
        const totalAmt = calculatedEmi * N
        const totalInt = totalAmt - P
        return {
            emi: calculatedEmi,
            totalInterest: totalInt > 0 ? totalInt : 0,
            totalAmount: totalAmt > 0 ? totalAmt : 0
        }
    }, [loanAmount, interestRate, tenure])

    const chartData = {
        labels: ['Total Interest', 'Principal'],
        datasets: [
            {
                data: [calculations.totalInterest, loanAmount],
                backgroundColor: ['#BCE0FF', '#68ABE4'],
                borderColor: ['#68ABE4', '#BCE0FF'],
                borderWidth: 1,
            }
        ]
    }

    return (
        <div className="flex flex-col justify-center md:w-4/6 w-5/6 mx-auto my-10 shadow-lg p-2 rounded-xl">
            <div className="w-full">
                <div className="mt-2 px-4 md:flex">
                    <button
                        className={`py-2 px-4 text-left mx-auto w-full md:w-1/3 ${activeCalculator === 'personal'
                            ? 'bg-blue-400 text-white shadow-lg rounded-xl'
                            : 'bg-white'
                            } my-1 flex flex-col items-start`}
                        onClick={() => handleLoanTypeChange('personal')}
                    >
                        <h1 className="sm:text-[14px] md:text-lg text-[10px] font-semibold">
                            Personal Loan EMI Calculator
                        </h1>
                        <p className="md:text-sm text-[10px] md:block hidden">
                            Determine the cost of facilitating immediate liquidity.
                        </p>
                    </button>
                    <button
                        className={`py-2 px-4 text-left mx-auto w-full md:w-1/3 ${activeCalculator === 'home'
                            ? 'bg-blue-400 text-white shadow-lg rounded-xl'
                            : 'bg-white'
                            } my-1 flex flex-col items-start`}
                        onClick={() => handleLoanTypeChange('home')}
                    >
                        <h1 className="sm:text-[14px] md:text-lg text-[10px] font-semibold">
                            Home Loan EMI Calculator
                        </h1>
                        <p className="md:text-sm text-[10px] md:block hidden">
                            Estimate the cost of realizing your ideal home.
                        </p>
                    </button>
                    <button
                        className={`py-2 px-4 text-left mx-auto w-full md:w-1/3 ${activeCalculator === 'car'
                            ? 'bg-blue-400 text-white shadow-lg rounded-xl'
                            : 'bg-white'
                            } my-1 flex flex-col items-start`}
                        onClick={() => handleLoanTypeChange('car')}
                    >
                        <h1 className="sm:text-[14px] md:text-lg text-[10px] font-semibold">
                            Car Loan EMI Calculator
                        </h1>
                        <p className="md:text-sm text-[10px] md:block hidden">
                            Compute the cost of personalizing your car.
                        </p>
                    </button>
                </div>
            </div>

            <div className="md:flex">
                <div className="p-4 md:w-1/2">
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-100">
                        <p className="font-semibold md:text-lg text-xs">
                            EMI calculator for
                        </p>
                        <h1 className="font-semibold md:text-2xl text-md text-blue-900">
                            {loanConfigs[activeCalculator].name}
                        </h1>
                    </div>

                    <div className="w-5/6 mx-auto font-semibold text-xs md:text-sm py-4">
                        <div>
                            <span className="flex justify-between py-3">
                                <p>Loan Amount(₹)</p>
                                <p>₹{loanAmount.toLocaleString('en-IN')}</p>
                            </span>
                            <input
                                type="range"
                                min={loanConfigs[activeCalculator].minAmount}
                                max={loanConfigs[activeCalculator].maxAmount}
                                step={10000}
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(Number(e.target.value))}
                                className="w-11/12 flex mx-auto"
                            />
                        </div>

                        <div>
                            <span className="flex justify-between py-3">
                                <p>Interest Rate %</p>
                                <p>{interestRate}%</p>
                            </span>
                            <input
                                type="range"
                                min={loanConfigs[activeCalculator].minRate}
                                max={loanConfigs[activeCalculator].maxRate}
                                step={0.1}
                                value={interestRate}
                                onChange={(e) => setInterestRate(Number(e.target.value))}
                                className="w-11/12 flex mx-auto"
                            />
                        </div>

                        <div>
                            <span className="flex justify-between py-3">
                                <p>Tenure (Months)</p>
                                <p>{tenure}</p>
                            </span>
                            <input
                                type="range"
                                min={loanConfigs[activeCalculator].minTenure}
                                max={loanConfigs[activeCalculator].maxTenure}
                                step={1}
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="w-11/12 flex mx-auto"
                            />
                        </div>

                        <div className="font-semibold text-xs md:text-sm pt-4 border-t mt-4">
                            <span className="flex justify-between py-2">
                                <p>Monthly EMI</p>
                                <p className="text-blue-600 font-bold">₹{calculations.emi.toLocaleString('en-IN')}</p>
                            </span>
                            <span className="flex justify-between py-2">
                                <p>Total Interest Payable</p>
                                <p>₹{calculations.totalInterest.toLocaleString('en-IN')}</p>
                            </span>
                            <span className="flex justify-between py-2">
                                <p>Total Amount Payable</p>
                                <p>₹{calculations.totalAmount.toLocaleString('en-IN')}</p>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2 p-4 flex flex-col items-center justify-center">
                    <div className="w-64 h-64">
                        <DoughnutChart data={chartData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Refinestr() {
    return (
        <div className="my-10 bg-[#152a4e] container mx-auto rounded-xl overflow-hidden shadow-lg">
            <div className="bg-[#152a4e] py-10 px-6 sm:px-12 lg:px-16">
                <div className="mx-auto flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="md:text-4xl text-2xl font-semibold tracking-tight text-white">
                            How does our Credit Refine Work?
                        </h2>
                        <h2 className="mt-6 text-lg leading-8 text-gray-300">
                            We analyse your credit report to understand the impact of
                            negative accounts on your credit score.
                        </h2>
                        <p className="md:text-4xl text-2xl text-white mt-8">
                            Talk to our Expert
                        </p>
                        <div className="my-10 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 lg:justify-start">
                            <Link
                                href="/refine"
                                className="rounded-md bg-white px-3.5 py-2.5 text-md font-base text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Connect Me To Credit Consultant
                            </Link>
                            <Link
                                href="/credit-score"
                                className="text-md font-semibold leading-6 text-white hover:text-blue-200"
                            >
                                Check Free Credit Score <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-8 lg:mt-0 lg:w-1/3">
                        <div className="relative w-full max-w-[300px] aspect-square">
                            <Image
                                src={expertImg}
                                alt="Credit Expert"
                                className="object-contain rounded-xl bg-white/5"
                                fill
                                sizes="(max-width: 640px) 280px, 400px"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Media() {
    const mediaLinks = [
        { url: "https://aninews.in/news/business/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick20230530190234/", img: ani },
        { url: "https://www.lokmattimes.com/business/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/", img: lokmattimes },
        { url: "https://theprint.in/ani-press-releases/ims-introduces-credit-refine-a-revolutionary-product-by-creditklick/1602841/", img: theprint },
        { url: "https://www.einpresswire.com/article/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry", img: ein },
        { url: "https://fox59.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/", img: fox },
        { url: "https://www.ksnt.com/business/press-releases/ein-presswire/622077441/incredible-management-service-pvt-ltd-launches-new-subsidiary-creditklick-to-revolutionize-the-credit-industry/", img: ksnt }
    ]

    return (
        <div className="mx-auto my-16 container px-4">
            <p className="text-center text-teal-800 font-semibold text-3xl my-8">
                OUR MEDIA COVERAGE
            </p>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
                {mediaLinks.map((item, index) => (
                    <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 flex items-center justify-center hover:scale-105 transition-transform"
                    >
                        <div className="w-full bg-white border border-gray-100 shadow-md p-4 rounded-lg flex items-center justify-center h-24 relative">
                            <Image src={item.img} width={120} height={40} alt="Media coverage" className="object-contain max-h-full" />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

function Contactstr() {
    return (
        <div className="mx-auto max-w-7xl my-16 px-4">
            <div className="mx-auto bg-gradient-to-l p-6 py-10 from-blue-100 to-gray-100 shadow-lg rounded-xl">
                <div className="mx-auto max-w-2xl lg:text-center space-y-10">
                    <p className="md:text-4xl text-2xl font-semibold tracking-tight text-blue-900">
                        Being Customer-Centric, we focus on client&apos;s needs before
                        offering a solution
                    </p>
                    <p className="text-xl leading-8 text-teal-800">
                        You&apos;re at the center of our story, not just a statistic. Join
                        us on your journey to improve your credit score with our
                        confidential and expert Credit Improvement Services.
                    </p>
                    <div className="flex items-center justify-center">
                        <Link
                            href="/credit-score"
                            className="px-6 py-3 text-lg font-semibold bg-blue-600 text-center rounded-md text-white shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            Check Free Credit Score
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Carousel() {
    const partnerImages = [
        { id: 1, url: '/assets/AUSFB.webp' },
        { id: 2, url: '/assets/BAJAJ.webp' },
        { id: 3, url: '/assets/CITIB.webp' },
        { id: 4, url: '/assets/CLIX.webp' },
        { id: 5, url: '/assets/hinduja.webp' },
        { id: 6, url: '/assets/IDFC.webp' },
        { id: 7, url: '/assets/IIFL.webp' },
        { id: 8, url: '/assets/KOTAKB.webp' },
        { id: 9, url: '/assets/paytm.webp' },
        { id: 10, url: '/assets/RBLB.webp' },
        { id: 11, url: '/assets/SBI.webp' },
        { id: 12, url: '/assets/tata.webp' },
        { id: 13, url: '/assets/YESB.webp' },
        { id: 14, url: '/assets/ZEST.webp' },
        { id: 15, url: '/assets/CASHE.webp' }
    ]

    return (
        <div className="container mx-auto">
            <div className="md:text-5xl mb-4 text-4xl font-semibold text-start text-gray-900">
                Our Partners
            </div>
            <div className="SliderX mx-2 overflow-hidden">
                <div className="sliderP">
                    <div className="slide-trackP flex">
                        <div className="flex items-center">
                            {partnerImages.map((image) => (
                                <img
                                    key={image.id}
                                    src={image.url}
                                    alt="partners"
                                    className="my-2 md:px-20 px-6 max-h-12 w-auto"
                                />
                            ))}
                            {partnerImages.map((image) => (
                                <img
                                    key={`dup-${image.id}`}
                                    src={image.url}
                                    alt="partners"
                                    className="my-2 md:px-20 px-6 max-h-12 w-auto"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Testimonials() {
    const testimonialData = [
        { id: 1, name: "Rahul Sharma", role: "Business Owner", content: "CreditKlick helped me get my business loan approved in just 48 hours! Highly recommended.", rating: 5, bg: "bg-blue-50" },
        { id: 2, name: "Priya Patel", role: "Software Engineer", content: "Checking my credit score was so easy and detailed. The insights helped me improve it significantly.", rating: 5, bg: "bg-white border-blue-100" },
        { id: 3, name: "Amit Verma", role: "Marketing Manager", content: "I got a great deal on my travel credit card through their platform. Smooth process.", rating: 4, bg: "bg-gray-50" },
        { id: 4, name: "Sneha Gupta", role: "Entrepreneur", content: "The EMI calculator is very accurate. It helped me plan my home loan repayment effectively.", rating: 5, bg: "bg-blue-50" },
        { id: 5, name: "Vikram Singh", role: "Freelancer", content: "Excellent customer support! They guided me through the credit repair process step by step.", rating: 5, bg: "bg-white border-blue-100" },
        { id: 6, name: "Anjali Rao", role: "Teacher", content: "Very user-friendly app. I check my score regularly now without any hassle.", rating: 4, bg: "bg-gray-50" },
        { id: 7, name: "Rohit Kumar", role: "IT Professional", content: "Found the best personal loan interest rates here. Saved me a lot of money.", rating: 5, bg: "bg-blue-50" },
        { id: 8, name: "Kavita Das", role: "Doctor", content: "Trustworthy and transparent. No hidden charges for checking reports.", rating: 5, bg: "bg-white border-blue-100" },
    ];

    const sectionRef = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
        }, { threshold: 0.05 })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section ref={sectionRef} className="py-16 bg-white overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-3xl md:text-5xl font-semibold text-blue-900 mb-4">What Our Users Say</h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Join thousands of satisfied customers who have improved their financial health with CreditKlick.</p>
            </div>

            <div className="relative w-full mb-8 flex overflow-hidden">
                <motion.div
                    className="flex gap-6 whitespace-nowrap"
                    animate={isInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                    style={{ minWidth: "100%" }}
                >
                    {[...testimonialData, ...testimonialData].map((item, index) => (
                        <div key={`rtl-${index}`} className={`w-80 md:w-96 flex-shrink-0 p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow ${item.bg.includes('border') ? item.bg : item.bg + ' border-transparent'}`}>
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-3">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.role}</p>
                                </div>
                                <div className="ml-auto flex text-yellow-400 text-xs">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < item.rating ? '★' : '☆'}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm md:text-base italic whitespace-normal text-wrap">"{item.content}"</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="relative w-full flex overflow-hidden">
                <motion.div
                    className="flex gap-6 whitespace-nowrap"
                    animate={isInView ? { x: ["-50%", "0%"] } : { x: "0%" }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
                    style={{ minWidth: "100%" }}
                >
                    {[...testimonialData, ...testimonialData].reverse().map((item, index) => (
                        <div key={`ltr-${index}`} className={`w-80 md:w-96 flex-shrink-0 p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow ${item.bg.includes('border') ? item.bg : item.bg + ' border-transparent'}`}>
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-3">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm md:text-base">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.role}</p>
                                </div>
                                <div className="ml-auto flex text-yellow-400 text-xs">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>{i < item.rating ? '★' : '☆'}</span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm md:text-base italic whitespace-normal text-wrap">"{item.content}"</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function AppDownloadSection() {
    const appFeatures = [
        { title: "One-Tap Credit Score", desc: "Check your score instantly with a single tap.", icon: <Image src={Logo} alt="CK" width={48} height={48} className="w-12 h-12 object-contain bg-white rounded-full p-1" /> },
        { title: "Personalized Loan Offers", desc: "Get offers tailored just for you.", icon: "🎁" },
        { title: "Secure & Private", desc: "Your data is encrypted and safe with us.", icon: "🔒" },
    ];
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % appFeatures.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-8 md:py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0 z-10 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                            Your Finance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                in Your Pocket
                            </span>
                        </h2>
                        <p className="text-sm md:text-lg text-blue-100 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
                            Experience the fastest way to manage your credit health. Download the CreditKlick app today.
                        </p>

                        <div className="flex flex-col gap-2 md:gap-4 py-2 text-left">
                            {appFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`p-2 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${index === activeFeature ? 'bg-white/10 border-blue-400/50' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                                    onClick={() => setActiveFeature(index)}
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="flex-shrink-0">
                                            <span className="text-lg md:text-2xl">{feature.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className={`text-xs md:text-base font-bold ${index === activeFeature ? 'text-white' : 'text-gray-400'}`}>{feature.title}</h4>
                                            {index === activeFeature && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="text-[10px] md:text-sm text-blue-200 mt-1"
                                                >
                                                    {feature.desc}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 md:mt-8 flex justify-center md:justify-start gap-4">
                            <a href="https://play.google.com/store/apps/details?id=com.creditklick.creditklick" target="_blank" rel="noopener noreferrer" className="bg-white text-blue-900 px-5 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2 text-xs md:text-base">
                                Download App
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="md:w-1/2 relative z-10 flex justify-center w-full">
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative w-40 h-[300px] md:w-64 md:h-[500px] border-4 md:border-8 border-gray-800 rounded-[2rem] md:rounded-[3rem] bg-gray-900 overflow-hidden shadow-2xl"
                    >
                        <div className="w-full h-full bg-slate-800 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeature}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-black text-white p-2 text-center"
                                >
                                    <div>
                                        <div className="text-3xl md:text-6xl mb-2 md:mb-4 flex justify-center">
                                            {appFeatures[activeFeature].icon}
                                        </div>
                                        <h3 className="text-xs md:text-xl font-bold">{appFeatures[activeFeature].title}</h3>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function VideoTestimonials() {
    const videoData = [
        { id: 'VEaKBXTf204', title: 'Customer Success Story' },
        { id: '7PC0wwHhKrg', title: 'Customer Success Story' },
        { id: 'Mp224Mj4ViY', title: 'Customer Success Story' },
        { id: 'qEJDixK8CfI', title: 'Customer Success Story' },
        { id: 'Uts_pqL1ELg', title: 'Customer Success Story' },
    ];

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-semibold text-blue-900 mb-4">Credit Score Fundamentals</h2>
                    <p className="text-gray-600 text-lg">Credit Knowledge that empowers you. <span className='hover:cursor-pointer hover:underline'>
                        <a href="https://www.youtube.com/channel/UCNBL-tGSmQQroB9HHDGHToA"> creditklick.</a>
                    </span>
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videoData.map((video) => (
                        <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-blue-900">{video.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function HomeClient() {
    return (
        <div className="min-h-screen">
            <Slidernew />
            <Product />
            <Cibilstr />
            <CalcHero />
            <Refinestr />
            {/* Commented for future use - "Unlock Your Gold's Value" section */}
            {/* <GoldLoanSection /> */}
            <Media />
            {/* Commented for future use - "Your Finance in Your Pocket" section */}
            {/* <AppDownloadSection /> */}
            {/* Commented for future use - "Credit Score Fundamentals" section */}
            {/* <VideoTestimonials /> */}
            {/* Commented for future use - "What Our Users Say" section */}
            {/* <Testimonials /> */}
            <Carousel />
            <Contactstr />

        </div>
    )
}
