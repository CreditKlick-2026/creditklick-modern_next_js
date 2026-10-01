// @ts-nocheck
import { useEffect, useRef } from "react";
import animationData from "./animationjson/Score.json";
import { getLottie } from "@/lib/lottie-global";

const ScoreAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let animation: any = null;
        let cancelled = false;

        getLottie().then((lottie) => {
            if (cancelled || !lottie || !containerRef.current) return;

            animation = lottie.loadAnimation({
                container: containerRef.current,
                animationData,
                renderer: "svg",
                loop: true,
                autoplay: true,
            });
        });

        return () => {
            cancelled = true;
            animation?.destroy();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default ScoreAnimation;
