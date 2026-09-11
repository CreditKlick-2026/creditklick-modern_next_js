import { SolutionItem, icon3dMegaphone, icon3dHeadset } from "../types";

export const marketingAndSupportCases: SolutionItem[] = [
  {
    slug: "marketing-campaigns",
    icon3d: icon3dMegaphone,
    title: "Marketing Campaigns",
    heroBadge: "OFFICIAL META CLOUD API • BROADCAST SUITE",
    metaTitle: "WhatsApp Marketing Campaigns & Bulk Broadcast Software | Wapine",
    metaDescription: "Launch high-ROI WhatsApp broadcast campaigns with 98% open rates. Send rich media templates, interactive CTA buttons, dynamic variables, and track conversions.",
    tagline: "Broadcast to thousands. 98% open rate. 5× higher ROI.",
    description: "Reach customers directly in their primary WhatsApp inbox with personalized bulk broadcasts, flash sale alerts, rich media catalogs, and interactive CTA buttons powered by Official Meta Cloud API with zero risk of number bans.",
    features: [
      "High-speed broadcast engine (100,000+ messages/hour)",
      "Meta-approved rich media templates (Images, Videos, PDFs, Carousels)",
      "Interactive CTA buttons (URL links, Quick replies, Call now)",
      "Dynamic variable personalization ({{name}}, {{discount}}, {{orderId}})",
      "Smart tag-based audience segmentation & list cleaners",
      "Real-time delivery, read & button click tracking analytics"
    ],
    stat: { value: "98%", label: "Average Open Rate in <3 mins" },
    color: "from-[#0f6841] via-[#15803d] to-[#128C7E]",
    accentBg: "bg-emerald-950",
    lightBg: "bg-emerald-50/70",
    metrics: [
      { label: "Average Open Rate", value: "98%", desc: "Read within 3 minutes of delivery", color: "text-emerald-600" },
      { label: "Click-Through Rate", value: "45-60%", desc: "Interactive CTA button clicks", color: "text-teal-600" },
      { label: "Broadcast Speed", value: "100k+/hr", desc: "Enterprise Cloud API throughput", color: "text-blue-600" },
      { label: "Conversion Lift", value: "4.2×", desc: "Higher ROI vs Email & SMS", color: "text-purple-600" },
    ],
    chatSimulation: {
      senderName: "Wapine Store",
      senderTag: "Verified Official Account",
      customerMsg: "Hi, any weekend offers going on right now? 🎉",
      botTitle: "⚡ FLASH SALE: 40% OFF THIS WEEKEND",
      botReply: "Hey Alex! Get 40% OFF on all premium collections valid till midnight. Use code WEEKEND40 at checkout!",
      buttons: ["🛍️ Shop Collection", "🎁 Claim 40% Code", "💬 Talk to Stylist"],
      customerSelection: "🎁 Claim 40% Code",
      followUpStatus: "Coupon Applied Automatically",
      followUpText: "Your code WEEKEND40 is active! Free shipping added to your cart.",
      followUpButton: "👉 Complete Order (₹1,499)"
    },
    capabilities: [
      { title: "High-Throughput Broadcast Engine", desc: "Send 1,000 to 500,000+ messages per campaign with intelligent rate limiting and queue management.", badge: "Enterprise Scale" },
      { title: "Hyper-Targeted Audience Segmentation", desc: "Filter contacts by custom tags, past purchase behavior, city, or engagement score to send relevant offers.", badge: "Precision Targeting" },
      { title: "Rich Media & Interactive CTA Buttons", desc: "Engage buyers with high-res product photos, video demos, catalog carousels, and one-tap checkout links.", badge: "High Engagement" },
      { title: "Real-Time Delivery & Click Heatmap", desc: "Monitor sent, delivered, read, and CTA click rates in real time to optimize ongoing campaigns.", badge: "Live Analytics" },
      { title: "Automated Drip Retargeting", desc: "Auto-trigger follow-up reminders to users who opened the broadcast but didn't click within 24 hours.", badge: "Higher ROI" },
      { title: "Meta Opt-In & Quality Score Shield", desc: "Automatically handle unsubscribe keywords (STOP/OPT-OUT) to keep your phone number quality rating high.", badge: "Ban Protection" }
    ],
    funnelSteps: [
      { step: "01", title: "Segment Your Audience", desc: "Import CSV or sync from CRM. Filter contacts by tags, location, or past purchase history." },
      { step: "02", title: "Design Meta Template", desc: "Create rich media templates with dynamic parameters {{1}}, {{2}} and interactive CTA buttons." },
      { step: "03", title: "Broadcast at Scale", desc: "Launch instantly or schedule across timezones with Cloud API anti-throttling delivery." },
      { step: "04", title: "Track Clicks & Automate", desc: "Measure real-time button clicks and trigger automated chatbot responses to close sales." }
    ],
    comparison: [
      { metric: "Average Open Rate", traditional: "15% - 20% (Email)", whatsapp: "98% (WhatsApp)" },
      { metric: "Click-Through Rate (CTR)", traditional: "2% - 3% (Email)", whatsapp: "45% - 60% (WhatsApp)" },
      { metric: "Read Time", traditional: "6 to 24 hours", whatsapp: "Within 3 minutes" },
      { metric: "Deliverability", traditional: "Spam / Promotions Tab", whatsapp: "Direct to Primary Chat" },
      { metric: "Media Richness", traditional: "Heavy HTML (Spam Risk)", whatsapp: "Images, Videos, Buttons & PDFs" },
      { metric: "Customer Interactivity", traditional: "No-reply email addresses", whatsapp: "2-way instant conversation" }
    ],
    faqs: [
      { q: "Can my WhatsApp Business number get banned for sending broadcasts?", a: "No. Because Wapine operates exclusively on the Official Meta Cloud API with pre-approved message templates and opt-in validation, your number remains 100% compliant with zero risk of bans." },
      { q: "How many marketing broadcast messages can I send per day?", a: "Meta uses a tiering system: Tier 1 (1,000 unique users/day), Tier 2 (10,000/day), Tier 3 (100,000/day), and Tier 4 (Unlimited/day). As you maintain good quality score, Meta automatically upgrades your tier." },
      { q: "Can I personalize every broadcast message?", a: "Yes. You can use dynamic variables like {{name}}, {{product}}, {{coupon_code}}, {{expiry_date}}, and unique tracking URLs for every individual contact." },
      { q: "How does button click tracking work in Wapine?", a: "Wapine tracks every interaction in real time: exactly who received, opened, and clicked each specific CTA button (e.g. 'Claim Offer' vs 'Talk to Sales')." },
      { q: "Can we automate follow-ups for users who didn't click?", a: "Yes. You can set up automated retargeting drip sequences that automatically send a reminder to users who received the campaign but haven't responded within a chosen timeframe." }
    ]
  },
  {
    slug: "customer-support",
    icon3d: icon3dHeadset,
    title: "Customer Support",
    heroBadge: "SHARED TEAM INBOX • 24/7 AI CHATBOT",
    metaTitle: "WhatsApp Customer Support & Multi-Agent Team Inbox | Wapine",
    metaDescription: "Resolve customer queries 5x faster with 24/7 AI chatbot automation and seamless live human agent handoff on a unified WhatsApp team inbox.",
    tagline: "Resolve queries 5× faster with AI + human agents.",
    description: "Offer instant 24/7 customer support through automated AI chatbots for repetitive queries and seamless live handoff to human agents on a shared multi-agent inbox.",
    features: [
      "AI chatbot for 24/7 FAQs and self-service",
      "Multi-agent team inbox with role permissions",
      "Automated ticket routing & round-robin assignment",
      "Canned responses, internal notes & macros",
      "SLA breach alerts & QA wallboard metrics",
      "CSAT feedback collection on chat resolution"
    ],
    stat: { value: "5×", label: "Faster resolution time" },
    color: "from-violet-600 via-purple-600 to-indigo-600",
    accentBg: "bg-violet-950",
    lightBg: "bg-violet-50/70",
    metrics: [
      { label: "First Response Time", value: "< 5s", desc: "Instant automated bot response", color: "text-violet-600" },
      { label: "Resolution Speed", value: "5× Faster", desc: "Compared to email ticket queues", color: "text-purple-600" },
      { label: "CSAT Score", value: "94%+", desc: "Positive customer ratings", color: "text-emerald-600" },
      { label: "Cost Reduction", value: "70%", desc: "Lower operational cost per ticket", color: "text-blue-600" },
    ],
    chatSimulation: {
      senderName: "Wapine Support Desk",
      senderTag: "Official Customer Care",
      customerMsg: "Hi, I need help tracking my order #WP-8921 📦",
      botTitle: "🤖 Automated Order Lookup",
      botReply: "Found your order! Status: Out for delivery today with BlueDart. Expected arrival by 4:00 PM.",
      buttons: ["📍 Live Map Tracking", "🔄 Change Delivery Time", "👤 Talk to Agent"],
      customerSelection: "👤 Talk to Agent",
      followUpStatus: "Agent Connected in 8 seconds",
      followUpText: "Neha from Support has joined the chat. How can I assist you further, Alex?",
      followUpButton: "💬 Chat with Neha"
    },
    capabilities: [
      { title: "Shared Multi-Agent Team Inbox", desc: "Allow 5 to 500+ support agents to manage conversations simultaneously from a single verified number.", badge: "Omnichannel" },
      { title: "Automated AI Ticket Triage", desc: "AI instantly categorizes customer intent (Billing, Technical, Order Status) and routes to the right specialist.", badge: "AI Routing" },
      { title: "Canned Responses & Internal Notes", desc: "Speed up replies with keyboard shortcuts (/faq, /refund) and leave private notes visible only to team members.", badge: "Agent Tools" },
      { title: "SLA Tracking & Live Wallboards", desc: "Monitor queue volume, first response time, agent activity, and average resolution time live on TV wallboards.", badge: "Analytics" }
    ],
    funnelSteps: [
      { step: "01", title: "Customer Messages", desc: "Customer reaches out via WhatsApp QR code, website widget, or phone number." },
      { step: "02", title: "AI First Response", desc: "Chatbot answers common FAQs, tracks orders, and collects customer details." },
      { step: "03", title: "Smart Team Routing", desc: "Complex tickets auto-assign to the best available agent based on department and load." },
      { step: "04", title: "Resolve & CSAT", desc: "Agent resolves the issue, logs notes, and the bot collects instant CSAT rating." }
    ],
    comparison: [
      { metric: "First Response Time", traditional: "4 to 24 hours (Email/Portal)", whatsapp: "Instant (< 5 seconds)" },
      { metric: "Agent Efficiency", traditional: "1 phone call at a time", whatsapp: "5-8 concurrent chats" },
      { metric: "Customer CSAT Score", traditional: "65% - 75%", whatsapp: "94%+" },
      { metric: "Resolution Cost", traditional: "₹40 - ₹80 per phone call", whatsapp: "₹2 - ₹5 per chat" }
    ],
    faqs: [
      { q: "Can multiple team members use one WhatsApp number?", a: "Yes. Wapine's Shared Team Inbox allows unlimited support agents to reply from a single verified WhatsApp number simultaneously." },
      { q: "How does the bot hand off to a human agent?", a: "When a user asks for an agent or when intent is unhandled, the conversation transitions smoothly into the agent queue with notification alerts." },
      { q: "Can we track agent performance and SLAs?", a: "Yes, Wapine provides full wallboard analytics, SLA breach alerts, response time metrics, and QA scoring." }
    ]
  }
];
