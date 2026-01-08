// @ts-nocheck
import Image from 'next/image';
import appsliderimg from "@/assets/Images/sliderappimg.png";

const AppSlider = () => {
    return (
        <div>
            <Image src={appsliderimg} alt="CreditKlick App" className="w-full h-auto object-contain" priority />
        </div>
    );
};

export default AppSlider;
