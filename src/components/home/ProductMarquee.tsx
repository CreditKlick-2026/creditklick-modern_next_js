"use client"

import Link from 'next/link'
import Image from 'next/image'

const ccico = '/assets/heroimages/ccgifw.webp'
const ploico = '/assets/heroimages/persloan2.webp'
const bloico = '/assets/heroimages/busiloan2.webp'
const calico = '/assets/heroimages/calc2.webp'
const credscore = '/assets/heroimages/credscore2.webp'
const refineico = '/assets/heroimages/refine2.webp'

const productData = [
    { link: '/credit-score', img: credscore, text: 'CREDIT SCORE' },
    { link: '/credit-cards', img: ccico, text: 'CARDS' },
    { link: '/loan/personal-loan', img: ploico, text: 'PERSONAL LOANS' },
    { link: '/loan/business-loan', img: bloico, text: 'BUSINESS LOAN' },
    { link: '/refine', img: refineico, text: 'CREDIT REFINE' },
    { link: '/calculators', img: calico, text: 'CALCULATORS' }
]

export function ProductMarquee() {
    return (
        <div className="my-4 w-full max-w-full overflow-hidden overflow-x-clip py-4 bg-white">
            <div className="relative w-full max-w-full overflow-hidden overflow-x-clip">
                <div className="product-track flex gap-4 sm:gap-6 px-4 py-2">

                    {[...productData, ...productData, ...productData, ...productData].map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-32 sm:w-40 md:w-44">
                            <div className="w-full h-full bg-gray-50 py-4 px-3 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer flex flex-col items-center justify-center group">
                                <Link
                                    href={item.link}
                                    prefetch={true}
                                    className="flex flex-col items-center justify-center w-full"
                                >
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
