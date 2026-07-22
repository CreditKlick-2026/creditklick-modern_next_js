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
    const [visitorId] = useState<string>(() => {
        if (typeof window === "undefined") return "";
        let vid = Cookies.get("visitorId");
        if (!vid) {
            vid = generateId();
            Cookies.set("visitorId", vid, { expires: 365 });
        }
        return vid;
    });

    const [sessionId] = useState<string>(() => {
        if (typeof window === "undefined") return "";
        let sid = sessionStorage.getItem("sessionId");
        if (!sid) {
            sid = generateId();
            sessionStorage.setItem("sessionId", sid);
        }
        return sid;
    });

    useEffect(() => {
        if (!visitorId || !sessionId) return;

        const trackPage = async () => {
            try {
                const fullUrl = window.location.href;
                const referrer = document.referrer;
                const userAgent = window.navigator.userAgent;
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;

                const isMobile = /Mobi|Android/i.test(userAgent);
                const deviceType = isMobile ? "mobile" : "desktop";

                let browser = "Unknown";
                if (userAgent.indexOf("Firefox") > -1) browser = "Firefox";
                else if (userAgent.indexOf("Chrome") > -1) browser = "Chrome";
                else if (userAgent.indexOf("Safari") > -1) browser = "Safari";
                else if (userAgent.indexOf("Edge") > -1) browser = "Edge";

                const payload = {
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
                    location: {},
                };

                const endpoint = "/api/v1/analytics/view";
                const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                
                if (typeof navigator !== "undefined" && navigator.sendBeacon) {
                    const sent = navigator.sendBeacon(endpoint, blob);
                    if (!sent) {
                        await api.post("/analytics/view", payload).catch(() => {});
                    }
                } else {
                    await api.post("/analytics/view", payload).catch(() => {});
                }
            } catch {
                // Ignore analytics errors silently
            }
        };

        const timeoutId = setTimeout(() => {
            trackPage();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [pathname, searchParams, visitorId, sessionId]);

    return null;
}

