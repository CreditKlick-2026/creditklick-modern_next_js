// @ts-nocheck
import Lottie from "lottie-web";
import { useEffect, useRef } from "react";
import animationData from "./animationjson/Loan.json";

const LoanAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const animation = Lottie.loadAnimation({
                container,
                animationData,
                renderer: "svg",
                loop: true,
                autoplay: true,
            });

            return () => {
                animation.destroy();
            };
        }
    }, []);

    return <div ref={containerRef} />;
};

export default LoanAnimation;
