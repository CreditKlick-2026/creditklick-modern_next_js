import {
  SolutionItem,
  icon3dRocket,
  icon3dChart,
  icon3dEducation,
  icon3dShield,
  icon3dShopping,
} from "./types";

export const moreCategorySolutions: SolutionItem[] = [
  {
    slug: "developers",
    icon3d: icon3dRocket,
    title: "Developers",
    heroBadge: "REST API • WEBHOOKS • SDKS",
    metaTitle: "WhatsApp Cloud API for Developers | REST API & Webhooks | Wapine",
    metaDescription: "Build WhatsApp automations with modern REST APIs, real-time webhooks, SDKs for Node.js/Python, and sandbox environments.",
    tagline: "Modern REST API and Webhooks integration.",
    description: "Build custom WhatsApp experiences with our ultra-fast REST API and receive real-time webhooks for incoming messages, delivery statuses, and chatbot flows.",
    features: ["REST API (< 10ms latency)", "Real-time webhooks", "Comprehensive interactive docs", "Sandbox environment & Postman collection", "Official Meta Cloud API"],
    stat: { value: "<10ms", label: "API Latency" },
    color: "from-blue-600 via-indigo-600 to-slate-800",
    accentBg: "bg-blue-950",
    lightBg: "bg-blue-50/70",
    metrics: [
      { label: "API Latency", value: "< 10ms", desc: "Sub-second execution time", color: "text-blue-600" },
      { label: "SDKs Available", value: "Node, Py, PHP", desc: "Ready-to-use client libraries", color: "text-indigo-600" },
      { label: "Webhook Speed", value: "Real-time", desc: "Immediate status notifications", color: "text-emerald-600" },
      { label: "Uptime", value: "99.99%", desc: "High availability clusters", color: "text-purple-600" },
    ],
    chatSimulation: {
      senderName: "Wapine API Bot",
      senderTag: "Developer Sandbox",
      customerMsg: "POST /v1/messages { to: '+919876543210' } 💻",
      botTitle: "HTTP 200 OK • Message Dispatched",
      botReply: "{ status: 'sent', id: 'wamid.HBgLM...', latency_ms: 8.4 }",
      buttons: ["📖 Read API Docs", "🚀 Test in Postman", "🔑 Generate API Keys"],
      customerSelection: "📖 Read API Docs",
      followUpStatus: "Webhook Received: status=delivered",
      followUpText: "Webhook payload delivered to https://your-server.com/webhook",
      followUpButton: "⚡ Open Webhooks Console"
    },
    capabilities: [
      { title: "Ultra-Fast REST APIs & Webhooks", desc: "Build in minutes with developer-first documentation, Postman collection, and SDKs.", badge: "Dev First" }
    ]
  },
  {
    slug: "agencies",
    icon3d: icon3dChart,
    title: "Agencies",
    heroBadge: "MULTI-TENANT SUB-ACCOUNTS • WHITE-LABEL",
    metaTitle: "WhatsApp Marketing Platform for Agencies | Multi-Client | Wapine",
    metaDescription: "Manage multiple client WhatsApp accounts from a single dashboard with sub-accounts, white-label reports, and agency discounts.",
    tagline: "Manage multiple client accounts from one unified portal.",
    description: "Manage WhatsApp marketing and customer support for multiple client brands from a single centralized dashboard with white-label reporting options.",
    features: ["Multi-client sub-accounts", "White-label client reporting", "Granular role-based permissions", "Wholesale volume messaging rates", "Dedicated agency partner manager"],
    stat: { value: "100+", label: "Agency Partners" },
    color: "from-indigo-600 via-purple-600 to-pink-600",
    accentBg: "bg-indigo-950",
    lightBg: "bg-indigo-50/70",
    metrics: [
      { label: "Client Sub-Accounts", value: "Unlimited", desc: "Independent billing & access", color: "text-indigo-600" },
      { label: "Agency Margin", value: "High Profit", desc: "Wholesale tier pricing", color: "text-purple-600" },
      { label: "White-Label Reports", value: "1-Click PDF", desc: "Custom brand branding", color: "text-pink-600" },
      { label: "Partner Support", value: "Dedicated TAM", desc: "Direct WhatsApp support group", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "Agency Partner Portal",
      senderTag: "Multi-Client Management",
      customerMsg: "Generate monthly ROI report for Client A 📈",
      botTitle: "📊 Client A Marketing Report Ready",
      botReply: "Client A broadcast generated ₹8.4L revenue with 48,000 WhatsApp messages (4.8x ROAS).",
      buttons: ["📄 Download White-Label PDF", "⚙️ Manage Sub-Accounts", "💳 View Client Wallet"],
      customerSelection: "📄 Download White-Label PDF",
      followUpStatus: "White-Label PDF Ready",
      followUpText: "Your agency logo and branding have been applied to the export.",
      followUpButton: "📥 Download Agency_Report.pdf"
    },
    capabilities: [
      { title: "Multi-Client Sub-Account Architecture", desc: "Easily switch between clients, isolate credit balances, and assign team permissions.", badge: "Multi-Tenant" }
    ]
  },
  {
    slug: "education",
    icon3d: icon3dEducation,
    title: "Education",
    heroBadge: "ADMISSIONS • STUDENT NOTIFICATIONS",
    metaTitle: "WhatsApp for Schools, Colleges & EdTech | Wapine",
    metaDescription: "Keep parents and students updated with admission alerts, fee reminders, exam results, and course counseling on WhatsApp.",
    tagline: "Student alerts, admissions & parent notifications.",
    description: "Keep parents and students informed with automated admission counseling, class schedules, fee reminders, exam results, and attendance alerts.",
    features: ["Admission counseling bots", "Automated fee reminders & payment links", "Exam results & report cards", "Class schedule updates", "Attendance alerts"],
    stat: { value: "95%", label: "Parent engagement" },
    color: "from-amber-500 via-yellow-500 to-orange-600",
    accentBg: "bg-amber-950",
    lightBg: "bg-amber-50/70",
    metrics: [
      { label: "Parent Open Rate", value: "95%", desc: "Direct school updates on phone", color: "text-amber-600" },
      { label: "Fee Collection Speed", value: "3× Faster", desc: "Direct UPI & Netbanking links", color: "text-yellow-600" },
      { label: "Admission Queries", value: "80% Automated", desc: "24/7 course counseling bot", color: "text-orange-600" },
      { label: "Attendance Alerts", value: "Instant", desc: "Real-time daily notifications", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "Oxford Global Academy",
      senderTag: "Verified Educational Institution",
      customerMsg: "Fee payment status for Rohan (Class 10-A) 🎓",
      botTitle: "📚 Term 2 Tuition Fee Reminder",
      botReply: "Dear Parent, Term 2 fee (₹18,500) is due by Friday. Pay securely via UPI below with zero convenience fee:",
      buttons: ["💳 Pay ₹18,500 via UPI", "📄 Download Fee Receipt", "📞 Contact Accounts Office"],
      customerSelection: "💳 Pay ₹18,500 via UPI",
      followUpStatus: "Payment Received Successfully",
      followUpText: "Receipt #RCP-9921 generated. Stored in parent portal.",
      followUpButton: "📥 Download Receipt PDF"
    },
    capabilities: [
      { title: "24/7 Admission Counseling Chatbot", desc: "Automate prospectus sharing, eligibility checks, and fee structure queries.", badge: "Admissions" }
    ]
  },
  {
    slug: "finance",
    icon3d: icon3dShield,
    title: "Finance & Banking",
    heroBadge: "BANK-GRADE SECURITY • 2FA & ALERTS",
    metaTitle: "Secure WhatsApp Banking & Financial Notifications | Wapine",
    metaDescription: "Send secure transaction alerts, account balance updates, loan EMI reminders, and fraud alerts via WhatsApp API.",
    tagline: "Secure alerts, OTPs and banking updates.",
    description: "Send secure transaction alerts, balance updates, fraud detection warnings, loan EMI payment reminders, and policy documents reliably.",
    features: ["Bank-grade encrypted alerts", "Loan EMI reminder sequences", "Instant OTP & 2FA delivery", "Policy & statement PDF delivery", "KYC status updates"],
    stat: { value: "100%", label: "Bank-grade security" },
    color: "from-emerald-700 via-teal-700 to-green-800",
    accentBg: "bg-emerald-950",
    lightBg: "bg-emerald-50/70",
    metrics: [
      { label: "Security Standard", value: "Bank-Grade", desc: "End-to-end encrypted protocol", color: "text-emerald-600" },
      { label: "OTP Delivery", value: "< 2s", desc: "Priority authentication route", color: "text-teal-600" },
      { label: "EMI Collection", value: "+28%", desc: "Automated payment reminder links", color: "text-green-600" },
      { label: "Statement Delivery", value: "100% Digital", desc: "Encrypted PDF statements", color: "text-blue-600" },
    ],
    chatSimulation: {
      senderName: "FinTrust Bank",
      senderTag: "Official Financial Services",
      customerMsg: "Transaction Alert: ₹4,500 debited 💳",
      botTitle: "🔒 Transaction Verified",
      botReply: "₹4,500 was paid at Amazon India on Card ending in 8812. Available balance: ₹62,400.",
      buttons: ["✅ It was me", "⚠️ Block Card & Report", "📄 Download Statement"],
      customerSelection: "📄 Download Statement",
      followUpStatus: "Encrypted PDF Sent",
      followUpText: "Password for opening the statement is your DOB (DDMMYYYY).",
      followUpButton: "📄 Statement_Aug2026.pdf"
    },
    capabilities: [
      { title: "Priority Authentication Routing", desc: "Deliver critical 2FA OTPs and security alerts with zero queuing delay.", badge: "High Security" }
    ]
  },
  {
    slug: "retail",
    icon3d: icon3dShopping,
    title: "Retail",
    heroBadge: "OMNICHANNEL • QR CODES • LOYALTY",
    metaTitle: "WhatsApp Omnichannel Retail & In-Store Solutions | Wapine",
    metaDescription: "Drive foot traffic and online sales with WhatsApp in-store QR codes, loyalty programs, flash sales, and click-and-collect.",
    tagline: "In-store & online omnichannel engagement.",
    description: "Bridge the gap between online and offline with in-store QR codes, exclusive VIP flash sales, click-and-collect updates, and digital loyalty cards via WhatsApp.",
    features: ["In-store scan-to-chat QR codes", "Flash sale broadcast alerts", "Digital loyalty card updates", "Click-and-collect notifications", "Receipt & warranty delivery"],
    stat: { value: "30%", label: "Higher foot traffic" },
    color: "from-pink-600 via-rose-600 to-purple-600",
    accentBg: "bg-pink-950",
    lightBg: "bg-pink-50/70",
    metrics: [
      { label: "In-Store Engagement", value: "30%+", desc: "Scan-to-connect QR codes", color: "text-pink-600" },
      { label: "Loyalty Repurchases", value: "2.4×", desc: "Digital points & perks on chat", color: "text-rose-600" },
      { label: "Click & Collect", value: "15 min", desc: "Instant pickup ready notification", color: "text-purple-600" },
      { label: "Digital Receipts", value: "100%", desc: "Paperless bill via WhatsApp", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "Urban Lifestyle Store",
      senderTag: "Verified Retail Chain",
      customerMsg: "Scanned QR code at Store #12 🛍️",
      botTitle: "🎉 Welcome to Urban Lifestyle!",
      botReply: "Thanks for visiting our Connaught Place store! You've earned 150 Loyalty Points today. Redeem 10% OFF on your bill:",
      buttons: ["🎁 Show Cashier Voucher", "👗 Browse New Arrivals", "📦 Track Click & Collect"],
      customerSelection: "🎁 Show Cashier Voucher",
      followUpStatus: "Voucher Active (10% OFF)",
      followUpText: "Show barcode #UL-9941 to the cashier at checkout.",
      followUpButton: "🎟️ Show Barcode Discount"
    },
    capabilities: [
      { title: "In-Store QR Code Lead Capture", desc: "Turn offline store foot traffic into lifelong digital WhatsApp subscribers with ease.", badge: "Omnichannel" }
    ]
  },
];
