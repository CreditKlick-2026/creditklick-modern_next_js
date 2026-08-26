import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import { Shell } from "@/components/layout/Shell";
import { ScrollTop } from "@/components/layout/ScrollTop";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: 'swap', // Font display swap for better performance
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: 'swap',
});

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
}

export const metadata: Metadata = {
  title: {
    default: "CreditKlick - Your Financial Partner",
    template: "%s | CreditKlick"
  },
  description: "CreditKlick - Check your credit score, compare loans, and get the best financial deals. India's fastest growing financial marketplace.",
  keywords: ["credit score", "free credit report", "personal loan", "home loan", "business loan", "credit card", "credit klick", "credit repair", "gold loan", "EMI calculator"],
  authors: [{ name: "CreditKlick" }],
  creator: "CreditKlick",
  publisher: "CreditKlick India",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://creditklick.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CreditKlick - Your Financial Partner",
    description: "Check your credit score and get best financial products",
    url: "https://creditklick.com",
    siteName: "CreditKlick",
    images: [
      {
        url: "/assets/creditklic_next_gen.png",
        width: 1200,
        height: 630,
        alt: "CreditKlick - India's trusted credit score platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CreditKlick - Your Financial Partner",
    description: "Check your credit score and get best financial products",
    images: ["/assets/creditklic_next_gen.png"],
    creator: "@creditklick",
    site: "@creditklick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: 'google50b7c1b7e64414ee',
    // yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  category: 'finance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data schemas
  const organizationSchema = getOrganizationSchema()
  const websiteSchema = getWebsiteSchema()

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://betaversion-creditklickapp.onrender.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://betaversion-creditklickapp.onrender.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Structured Data - Website Schema with Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <ScrollTop />
        <Shell>
          {children}
        </Shell>
        <Toaster position="top-center" />
        <CookieConsent />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>

        {/* Google Tag Manager - Non-blocking script loading */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5LMPZ9N');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LMPZ9N"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
