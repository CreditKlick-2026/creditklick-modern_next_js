"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/services/api";

const generateId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [visitorId, setVisitorId] = useState<string>("");
    const [sessionId, setSessionId] = useState<string>("");

    useEffect(() => {
        // Initialize IDs
        let vid = Cookies.get("visitorId");
        if (!vid) {
            vid = generateId();
            Cookies.set("visitorId", vid, { expires: 365 });
        }
        setVisitorId(vid);

        let sid = sessionStorage.getItem("sessionId");
        if (!sid) {
            sid = generateId();
            sessionStorage.setItem("sessionId", sid);
        }
        setSessionId(sid);
    }, []);

    useEffect(() => {
        if (!visitorId || !sessionId) return;

        const trackPage = async () => {
            try {
                const fullUrl = window.location.href;
                const referrer = document.referrer;
                const userAgent = window.navigator.userAgent;
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;

                // Detect device type simple logic
                const isMobile = /Mobi|Android/i.test(userAgent);
                const deviceType = isMobile ? "mobile" : "desktop";

                // Detect browser simple logic
                let browser = "Unknown";
                if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
                else if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
                else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
                else if (userAgent.indexOf("Edge") > -1) browser = "Edge";

                await api.post("/analytics/view", {
                    sessionId,
                    visitorId,
                    path: pathname,
                    fullUrl,
                    title: document.title,
                    referrer,
                    device: {
                        type: deviceType,
                        browser,
                        screenWidth,
                        screenHeight,
                    },
                    location: {}, // IP based location will be handled by backend if needed
                });
            } catch (error) {
                console.error("Analytics tracking failed", error);
            }
        };

        // Debounce slightly to avoid double firing on strict mode or rapid changes
        const timeoutId = setTimeout(() => {
            trackPage();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [pathname, searchParams, visitorId, sessionId]);

    return null;
}
