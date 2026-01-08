"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
    interface Window {
        Tawk_API?: any;
        Tawk_LoadStart?: Date;
    }
}

export function TawkToChat() {
    const pathname = usePathname()
    const isAdmin = pathname?.startsWith('/admin')

    useEffect(() => {
        // Tawk.to chat is temporarily disabled due to invalid widget ID
        // To re-enable, uncomment this code and update the widget ID below
        // Current widget ID '65d81eb58d261e1b5f6441ca' is returning 404 error

        /*
        if (isAdmin) return

        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/YOUR_WIDGET_ID/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode?.insertBefore(s1, s0);

        return () => {
            const tawkScript = document.querySelector('script[src*="tawk.to"]');
            if (tawkScript) {
                tawkScript.remove();
            }
            try {
                if (window.Tawk_API && typeof window.Tawk_API.hideWidget === 'function') {
                    window.Tawk_API.hideWidget();
                    window.Tawk_API = undefined;
                }
            } catch (e) {
                console.error('Error hiding Tawk widget:', e);
            }
            const tawkElements = document.querySelectorAll('div[class*="tawk"], iframe[title*="chat"], .widget-visible-frame, iframe[src*="tawk.to"]');
            tawkElements.forEach(el => el.remove());
        }
        */
    }, [isAdmin])

    if (isAdmin) return null

    return null
}
