// @ts-nocheck
import Image from 'next/image';
const appsliderimg = "/images/Images/sliderappimg.png";

const AppSlider = () => {
    return (
        <div>
            <Image src={appsliderimg} alt="CreditKlick App" width={600} height={400} className="w-full h-auto object-contain" priority />
        </div>
    );
};

export default AppSlider;
