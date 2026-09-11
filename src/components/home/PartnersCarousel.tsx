"use client"

import Image from 'next/image'

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

export function PartnersCarousel() {
    return (
        <div className="container mx-auto my-12">
            <div className="md:text-5xl mb-6 text-4xl font-semibold text-start text-gray-900">
                Our Partners
            </div>
            <div className="SliderX w-full max-w-full overflow-hidden overflow-x-clip px-2">

                <div className="sliderP">
                    <div className="slide-trackP flex items-center">
                        <div className="flex items-center gap-8 md:gap-16">
                            {partnerImages.map((image) => (
                                <div key={image.id} className="relative h-10 w-28 md:w-36 flex-shrink-0">
                                    <Image
                                        src={image.url}
                                        alt="partner logo"
                                        fill
                                        sizes="(max-width: 768px) 112px, 144px"
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                            {partnerImages.map((image) => (
                                <div key={`dup-${image.id}`} className="relative h-10 w-28 md:w-36 flex-shrink-0">
                                    <Image
                                        src={image.url}
                                        alt="partner logo"
                                        fill
                                        sizes="(max-width: 768px) 112px, 144px"
                                        className="object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
