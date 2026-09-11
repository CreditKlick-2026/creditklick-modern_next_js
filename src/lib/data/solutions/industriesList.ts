import {
  SolutionItem,
  icon3dLocation,
  icon3dTruck,
  icon3dBuilding,
} from "./types";

export const otherIndustries: SolutionItem[] = [
  {
    slug: "real-estate",
    icon3d: icon3dLocation,
    title: "Real Estate",
    heroBadge: "PROPERTY INQUIRIES • SITE VISITS",
    metaTitle: "WhatsApp Real Estate Marketing & Site Visit Automation | Wapine",
    metaDescription: "Capture property buyers, automate site visit bookings, share brochures, and nurture real estate leads on WhatsApp.",
    tagline: "Property alerts, site visits & fast inquiries.",
    description: "Send instant property brochures, automate site visit appointments, share walkthrough videos, and nurture high-value real estate buyers efficiently.",
    features: [
      "Property brochure PDF & video tour sharing",
      "Site visit booking & calendar sync",
      "Google Maps location sharing for easy navigation",
      "Payment milestone & construction updates",
      "Automated lead routing across sales agents"
    ],
    stat: { value: "5×", label: "Faster lead response time" },
    color: "from-emerald-600 via-teal-600 to-green-600",
    accentBg: "bg-emerald-950",
    lightBg: "bg-emerald-50/70",
    metrics: [
      { label: "Site Visit Turnout", value: "78%", desc: "With automated location reminders", color: "text-emerald-600" },
      { label: "Brochure Views", value: "95%", desc: "Direct PDF delivery in chat", color: "text-teal-600" },
      { label: "Lead Response Time", value: "< 10s", desc: "Instant property details bot", color: "text-green-600" },
      { label: "Close Rate", value: "+35%", desc: "Faster prospect nurturing", color: "text-blue-600" },
    ],
    chatSimulation: {
      senderName: "Prestige Heights",
      senderTag: "Verified Luxury Homes",
      customerMsg: "Interested in 3BHK pricing and floor plan 🏢",
      botTitle: "🏡 Prestige Heights • 3BHK Luxury Residences",
      botReply: "Hi Rahul! 3BHK units start at ₹1.45 Cr with private balcony. Download the floor plan brochure below:",
      buttons: ["📄 Download 3BHK Floor Plan", "📅 Book Weekend Site Visit", "📞 Call Property Advisor"],
      customerSelection: "📅 Book Weekend Site Visit",
      followUpStatus: "Site Visit Confirmed",
      followUpText: "Confirmed for Saturday at 11:00 AM. Relationship manager Deepak will welcome you with sample flat tour.",
      followUpButton: "📍 Open Site Location on Maps"
    },
    capabilities: [
      { title: "Instant Brochure & Video Delivery", desc: "Never lose a buyer on a slow email. Send interactive property PDFs and video walkthroughs directly on chat.", badge: "Media Rich" },
      { title: "Site Visit Calendar Scheduler", desc: "Automate appointment slots and send Google Maps pins 2 hours before the visit.", badge: "Site Visits" }
    ],
    funnelSteps: [
      { step: "01", title: "Ad Lead Capture", desc: "Prospective buyer clicks property ad on Instagram/Facebook." },
      { step: "02", title: "Instant Brochure Bot", desc: "Bot sends floor plan, pricing, and video walkthrough instantly." },
      { step: "03", title: "Book Site Visit", desc: "Buyer picks weekend site visit slot and receives Google Maps location." },
      { step: "04", title: "Sales Closer Assignment", desc: "Relationship manager is notified with full buyer preference history." }
    ],
    comparison: [
      { metric: "Lead Response Time", traditional: "4 - 8 hours average", whatsapp: "Instant (< 10 seconds)" },
      { metric: "Site Visit Turnout", traditional: "30% - 40% attendance", whatsapp: "75%+ with automated location alerts" }
    ],
    faqs: [
      { q: "Can we send property location maps on WhatsApp?", a: "Yes, you can share Google Maps pins, brochures, PDF floor plans, and video tours directly." }
    ]
  },
  {
    slug: "logistics",
    icon3d: icon3dTruck,
    title: "Logistics",
    heroBadge: "DISPATCH & LIVE TRACKING • POD",
    metaTitle: "WhatsApp Logistics & Real-Time Delivery Tracking | Wapine",
    metaDescription: "Deliver real-time parcel tracking, driver dispatch alerts, Proof of Delivery, and route updates via WhatsApp API.",
    tagline: "Delivery tracking, dispatch & Proof of Delivery.",
    description: "Real-time delivery tracking, driver assignment notifications, proof of delivery confirmations, and route optimization alerts with 99.9% delivery SLA.",
    features: ["Live delivery tracking links", "Driver assignment notifications", "Proof of delivery (POD) confirmations", "Address verification & pin drop", "Real-time dispatch updates"],
    stat: { value: "99%", label: "On-time delivery tracking" },
    color: "from-amber-600 to-yellow-600",
    accentBg: "bg-amber-950",
    lightBg: "bg-amber-50/70",
    metrics: [
      { label: "Tracking Visibility", value: "99%", desc: "Direct to recipient phone", color: "text-amber-600" },
      { label: "Delivery Success", value: "96%", desc: "With address verification", color: "text-yellow-600" },
      { label: "WISMO Tickets", value: "-75%", desc: "Automated tracking bot", color: "text-emerald-600" },
      { label: "Dispatch Speed", value: "< 2s", desc: "Instant driver webhooks", color: "text-blue-600" },
    ],
    chatSimulation: {
      senderName: "Swift Logistics",
      senderTag: "Verified Courier Partner",
      customerMsg: "Where is parcel #SW-44102? 🚚",
      botTitle: "📦 Parcel Out for Delivery",
      botReply: "Your shipment is on the delivery van! Driver Ramesh is 4 stops away from your address.",
      buttons: ["📍 Track Live Driver Location", "📞 Call Delivery Partner", "🚪 Leave at Front Door"],
      customerSelection: "🚪 Leave at Front Door",
      followUpStatus: "Driver Notified",
      followUpText: "Driver has received your safe drop instructions. Photo POD will be shared upon delivery.",
      followUpButton: "📷 View Digital POD"
    },
    capabilities: [
      { title: "Real-Time Tracking Webhooks", desc: "Send instant live map links to buyers upon parcel dispatch.", badge: "Real-Time" }
    ]
  },
  {
    slug: "enterprise",
    icon3d: icon3dBuilding,
    title: "Enterprise",
    heroBadge: "CUSTOM INFRASTRUCTURE • 99.99% SLA",
    metaTitle: "Enterprise WhatsApp Business API Platform & Custom SLAs | Wapine",
    metaDescription: "Enterprise-grade WhatsApp API infrastructure, custom SLAs, dedicated IP pools, role-based access, and 99.99% uptime.",
    tagline: "Custom enterprise solutions at global scale.",
    description: "White-label solutions, custom SLAs, dedicated infrastructure, enterprise security, and 24/7 priority support for high-volume organizations.",
    features: ["White-label solutions", "Custom SLAs (99.99% uptime)", "Dedicated infrastructure & IPs", "Role-based access & SSO", "24/7 VIP priority support"],
    stat: { value: "99.9%", label: "Uptime SLA Guarantee" },
    color: "from-slate-700 via-gray-800 to-slate-900",
    accentBg: "bg-slate-950",
    lightBg: "bg-slate-50/70",
    metrics: [
      { label: "Uptime SLA", value: "99.99%", desc: "Dedicated cloud clusters", color: "text-slate-700" },
      { label: "Throughput", value: "1,000 req/s", desc: "High-frequency concurrency", color: "text-gray-800" },
      { label: "Dedicated IP Pool", value: "Custom", desc: "Isolated network routing", color: "text-emerald-600" },
      { label: "Support SLA", value: "< 15 mins", desc: "Dedicated enterprise manager", color: "text-blue-600" },
    ],
    chatSimulation: {
      senderName: "Enterprise Global",
      senderTag: "Dedicated VPC Instance",
      customerMsg: "Ping status on Dedicated Cluster 🖥️",
      botTitle: "🛡️ Enterprise Cluster Status: Healthy",
      botReply: "Cluster VPC-Alpha: 99.99% uptime, 1.2M messages processed today, 0 throttled queues.",
      buttons: ["📊 View VPC Metrics", "🔒 Security Audit Logs", "📞 Contact Assigned TAM"],
      customerSelection: "📊 View VPC Metrics",
      followUpStatus: "All Services Operational",
      followUpText: "Metrics synced to Datadog / CloudWatch dashboard.",
      followUpButton: "📈 Open Enterprise Console"
    },
    capabilities: [
      { title: "Dedicated Infrastructure & IP Pools", desc: "Custom private cloud deployment for enterprise compliance and zero multi-tenant contention.", badge: "Dedicated Cloud" }
    ]
  }
];
