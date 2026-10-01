import { Facebook, Twitter, Youtube, Linkedin, Instagram } from "lucide-react";

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

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/creditklickfin/",
    icon: Facebook,
    iconColor: "text-blue-600 fill-current",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/creditklickfin",
    icon: Twitter,
    iconColor: "text-blue-400 fill-current",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@creditklickfin",
    icon: Youtube,
    iconColor: "text-red-600 fill-current",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/creditklickfin",
    icon: Linkedin,
    iconColor: "text-blue-500 fill-current",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/creditklickfin/",
    icon: Instagram,
    iconColor: "text-pink-500",
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
