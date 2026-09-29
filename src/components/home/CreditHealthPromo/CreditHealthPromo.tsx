"use client";

import React from "react";
import Image from "next/image";
import { GlobalButton } from "@/components/ui";

const discoverImg = "/assets/heroimages/discover.4c95c246e689d0ca4a91-_1__1.webp";

export function CreditHealthPromo() {
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
            <GlobalButton
              href="/credit-score"
              prefetch={true}
              variant="shine"
              size="lg"
              className="md:w-auto w-full"
            >
              Check Now
            </GlobalButton>
          </div>
        </div>
        <div className="w-full flex justify-center mt-8 md:mt-0">
          <Image
            src={discoverImg}
            width={400}
            height={400}
            className="m-auto object-contain max-h-[400px]"
            alt="Discover Credit Health"
          />
        </div>
      </div>
    </div>
  );
}

export default CreditHealthPromo;
