import {
  SolutionItem,
  icon3dShopping,
  icon3dHeart,
} from "./types";
import { otherIndustries } from "./industriesList";

export const industrySolutions: SolutionItem[] = [
  {
    slug: "e-commerce",
    icon3d: icon3dShopping,
    title: "E-commerce",
    heroBadge: "D2C AUTOMATION • CART RECOVERY",
    metaTitle: "WhatsApp Solutions for E-commerce & D2C Brands | Wapine",
    metaDescription: "Recover abandoned carts, send automated shipping updates, and boost D2C repeat sales with WhatsApp Shopify and WooCommerce automations.",
    tagline: "Recover carts. Ship notifications. Delight buyers.",
    description: "Automate order confirmations, real-time shipping updates, abandoned cart recovery drips, COD verification, and post-purchase reviews seamlessly on WhatsApp.",
    features: [
      "Abandoned cart recovery drips with 1-click checkout",
      "Order & shipping tracking alerts with live maps",
      "COD confirmation & address verification",
      "Native product catalog sharing inside WhatsApp",
      "Automated reorder reminders & VIP loyalty perks"
    ],
    stat: { value: "70%", label: "Fewer support tickets" },
    color: "from-orange-500 via-amber-500 to-yellow-600",
    accentBg: "bg-orange-950",
    lightBg: "bg-orange-50/70",
    metrics: [
      { label: "Cart Recovery", value: "32%", desc: "Abandoned checkouts recovered", color: "text-orange-600" },
      { label: "RTO Reduction", value: "45%", desc: "Through automated COD verification", color: "text-amber-600" },
      { label: "Repeat Orders", value: "3× Higher", desc: "Automated repurchase reminders", color: "text-yellow-600" },
      { label: "Support Deflection", value: "70%", desc: "Automated 'Where is my order' bot", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "D2C Brand Store",
      senderTag: "Verified Merchant",
      customerMsg: "Left items in cart 🛒",
      botTitle: "🎁 Alex, your cart is waiting!",
      botReply: "You left the AirPro Headphones in your cart. Complete your purchase in the next 30 mins to get FREE expedited shipping!",
      buttons: ["🛍️ Buy Now with 1-Click", "💳 Apply 10% Discount", "💬 Ask Product Question"],
      customerSelection: "🛍️ Buy Now with 1-Click",
      followUpStatus: "Order Placed Successfully",
      followUpText: "Order #D2C-771 confirmed! Tracking link will be sent here upon dispatch.",
      followUpButton: "📦 Track Package"
    },
    capabilities: [
      { title: "Native Shopify & WooCommerce Sync", desc: "1-click integration that automatically detects cart drop-offs and triggers personalized discount messages.", badge: "E-com Sync" },
      { title: "Automated COD Verification", desc: "Filter out fraudulent orders before shipping by requiring 1-click address & purchase confirmation.", badge: "RTO Shield" },
      { title: "Post-Purchase Review Collection", desc: "Collect 5-star customer reviews and UGC photos directly on WhatsApp 3 days after product delivery.", badge: "Social Proof" }
    ],
    funnelSteps: [
      { step: "01", title: "Cart Abandoned", desc: "Customer drops off at checkout on Shopify or WooCommerce." },
      { step: "02", title: "Timed Recovery Drip", desc: "WhatsApp sends personalized discount with 1-click checkout button." },
      { step: "03", title: "Order & Shipping Alerts", desc: "Real-time order tracking and dispatch notifications." },
      { step: "04", title: "Post-Purchase Review", desc: "Automate review collection and loyalty reward points." }
    ],
    comparison: [
      { metric: "Cart Recovery Rate", traditional: "8% - 12% (Email)", whatsapp: "25% - 35% (WhatsApp)" },
      { metric: "COD Return-to-Origin (RTO)", traditional: "25% - 35% high RTO", whatsapp: "Reduced by 45% with verification" },
      { metric: "Customer Repeat Rate", traditional: "Low engagement", whatsapp: "3x higher repeat purchases" }
    ],
    faqs: [
      { q: "Does Wapine connect with Shopify and WooCommerce?", a: "Yes, we support native webhooks and 1-click app integration for automated cart recovery, tracking, and catalog sync." }
    ]
  },
  {
    slug: "healthcare",
    icon3d: icon3dHeart,
    title: "Healthcare",
    heroBadge: "PATIENT CARE • SECURE MESSAGING",
    metaTitle: "WhatsApp Healthcare Solutions | Patient Care & Appointments | Wapine",
    metaDescription: "Automate patient appointment booking, prescription reminders, lab report deliveries, and telemedicine links on WhatsApp with bank-grade security.",
    tagline: "Appointment reminders and proactive patient care.",
    description: "Automate patient appointment bookings, doctor consultations, prescription alerts, secure lab report delivery, and follow-up care instructions directly via WhatsApp.",
    features: [
      "Appointment reminders & 1-click reschedule",
      "Prescription & medicine refill alerts",
      "Secure lab report PDF delivery",
      "Telemedicine consultation links",
      "Pre-op & post-op care instructions"
    ],
    stat: { value: "85%", label: "Fewer appointment no-shows" },
    color: "from-rose-600 via-pink-600 to-red-600",
    accentBg: "bg-rose-950",
    lightBg: "bg-rose-50/70",
    metrics: [
      { label: "No-Show Reduction", value: "85%", desc: "With timed 24h & 2h reminders", color: "text-rose-600" },
      { label: "Report Delivery Time", value: "Instant", desc: "Direct PDF delivery to patients", color: "text-red-600" },
      { label: "Staff Phone Load", value: "-60%", desc: "Automated clinic appointment bot", color: "text-pink-600" },
      { label: "Patient Satisfaction", value: "96%", desc: "Proactive care & medicine alerts", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "Metro Health Clinic",
      senderTag: "Verified Healthcare Facility",
      customerMsg: "Need appointment with Dr. Sharma 🩺",
      botTitle: "🏥 Clinic Appointment Booking",
      botReply: "Dr. Sharma has open slots tomorrow at City Care Clinic. Select your preferred consultation timing:",
      buttons: ["🕒 10:30 AM", "🕒 02:00 PM", "🕒 05:30 PM"],
      customerSelection: "🕒 10:30 AM",
      followUpStatus: "Appointment Confirmed",
      followUpText: "Appointment booked for tomorrow at 10:30 AM. Clinic location map attached below.",
      followUpButton: "📍 Open Clinic on Maps"
    },
    capabilities: [
      { title: "Automated Appointment Bot", desc: "Allow patients to book, reschedule, or cancel consultations 24/7 without receptionist calls.", badge: "Self-Service" },
      { title: "Encrypted PDF Lab Reports", desc: "Send password-protected medical lab reports, blood tests, and scans securely to the patient.", badge: "HIPAA Compliant" }
    ],
    funnelSteps: [
      { step: "01", title: "Book Appointment", desc: "Patients select doctor, clinic, and slot directly in WhatsApp." },
      { step: "02", title: "Automated Reminders", desc: "Send timed reminder 24h & 2h before consultation with 1-click reschedule." },
      { step: "03", title: "Send Reports & Rx", desc: "Securely send PDF reports and digital prescriptions via API." },
      { step: "04", title: "Post-Care Check", desc: "Automated follow-up surveys and medicine refill reminders." }
    ],
    comparison: [
      { metric: "Appointment No-Shows", traditional: "25% - 30% missed appointments", whatsapp: "Reduced to under 5%" },
      { metric: "Report Delivery Time", traditional: "Physical pickup or lost emails", whatsapp: "Instant PDF delivery on chat" }
    ],
    faqs: [
      { q: "Is patient data confidential and secure?", a: "Yes. All WhatsApp communications are protected by end-to-end encryption and enterprise security standards." }
    ]
  },
  ...otherIndustries
];
