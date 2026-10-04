export interface FooterLink {
  name: string;
  href: string;
  isHighlight?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { name: "Credit Score", href: "/credit-score" },
      { name: "Credit Card", href: "/credit-cards" },
      { name: "Credit Refine", href: "/refine", isHighlight: true },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", href: "/about" },
      { name: "Careers", href: "https://www.stefto.com/careers/" },
      { name: "Contact us", href: "/contact" },
      { name: "Blogs", href: "/blog" },
      { name: "Register Complaint", href: "/register-complaint" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { name: "EMI Calculator", href: "/emi" },
      { name: "AU VALUE Calculator", href: "/calculator/au" },
      { name: "IDFC FIRST VALUE Calculator", href: "/calculator/idfc" },
      { name: "SBI SCLICK VALUE Calculator", href: "/calculator/sbi-click" },
      { name: "YES BANK VALUE Calculator", href: "/calculator/yes" },
    ],
  },
  {
    title: "Legal & Governance",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms and Conditions", href: "/terms-conditions" },
      { name: "Return & Refund Policy", href: "/return-refund" },
      { name: "Posh Policy", href: "/posh-policy" },
      { name: "Cookies Policy", href: "/cookies-policy" },
      { name: "Grievance Redressal", href: "/grievance-redressal" },
    ],
  },
];

export interface SocialLinkItem {
  name: string;
  href: string;
  badgeClass: string;
  svgPath: string;
  viewBox?: string;
}

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/creditklickfin/",
    badgeClass: "badge-facebook",
    svgPath:
      "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    viewBox: "0 0 24 24",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/creditklickfin",
    badgeClass: "badge-twitter",
    svgPath:
      "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
    viewBox: "0 0 24 24",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@creditklickfin",
    badgeClass: "badge-youtube",
    svgPath:
      "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    viewBox: "0 0 24 24",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/creditklickfin",
    badgeClass: "badge-linkedin",
    svgPath:
      "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
    viewBox: "0 0 24 24",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/creditklickfin/",
    badgeClass: "badge-instagram",
    svgPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    viewBox: "0 0 24 24",
  },
];

export const COMPANY_ADDRESS =
  "HEADOFFICE - PLOT 112 UDYOG VIHAR PHASE-1 GURGAON, HARYANA, 122016";

export const LEGAL_LINKS = [
  { name: "Terms of Use", href: "/terms-conditions" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Grievance Redressal", href: "/grievance-redressal" },
  { name: "Cookies Policy", href: "/cookies-policy" },
  { name: "POSH Policy", href: "/posh-policy" },
];
