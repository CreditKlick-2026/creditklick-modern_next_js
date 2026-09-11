import { SolutionItem, icon3dRocket, icon3dBell, icon3dChart } from "../types";

export const leadGenAndNotificationsCases: SolutionItem[] = [
  {
    slug: "lead-generation",
    icon3d: icon3dRocket,
    title: "Lead Generation",
    heroBadge: "CLICK-TO-WHATSAPP ADS • CONVERSATIONAL QUALIFICATION",
    metaTitle: "WhatsApp Lead Generation Solution | Capture & Qualify Leads | Wapine",
    metaDescription: "Ditch boring web forms. Capture 3x more qualified leads on WhatsApp with Click-to-WhatsApp ads, automated qualification chatbots, and instant CRM sync.",
    tagline: "Capture & qualify high-intent leads instantly.",
    description: "Replace friction-heavy landing page forms with instant conversational WhatsApp flows. Capture 100% verified phone numbers, qualify prospects 24/7 with interactive AI chatbots, and auto-route hot leads to your sales team in seconds.",
    features: [
      "Click-to-WhatsApp Ads (CTWA) Integration with Meta Ads",
      "Interactive 24/7 Conversational Qualification Chatbot",
      "100% Verified Phone Numbers (Zero Fake Leads & Spam Bots)",
      "Instant Two-Way CRM Sync (HubSpot, Salesforce, Zoho, Sheets)",
      "Smart Multi-Agent Routing & Shared Team Inbox Handoff",
      "Automated Lead Nurturing & Follow-up Drip Sequences"
    ],
    stat: { value: "3×", label: "More qualified leads generated" },
    color: "from-[#0f6841] via-[#15803d] to-[#128C7E]",
    accentBg: "bg-emerald-950",
    lightBg: "bg-emerald-50/70",
    metrics: [
      { label: "Form Completion Rate", value: "78%", desc: "Conversational WhatsApp flow vs 2.5% web forms", color: "text-emerald-600" },
      { label: "Lead Qualification", value: "3× Higher", desc: "Automated budget & timeline scoring", color: "text-teal-600" },
      { label: "Speed-to-Lead", value: "< 5s", desc: "Instant automated sales outreach", color: "text-blue-600" },
      { label: "Fake Lead Rate", value: "0%", desc: "100% verified active mobile profiles", color: "text-purple-600" },
    ],
    chatSimulation: {
      senderName: "Wapine Growth Suite",
      senderTag: "Verified Business Lead Desk",
      customerMsg: "Hi, I saw your Instagram ad and want to know more! 🚀",
      botTitle: "🎯 30-Second Lead Matchmaker",
      botReply: "Welcome! Let's match you with the right solution in 30 seconds. What is your estimated monthly broadcast volume?",
      buttons: ["⚡ 1k - 10k / month", "🔥 10k - 100k / month", "🏢 100k+ Enterprise"],
      customerSelection: "🔥 10k - 100k / month",
      followUpStatus: "Lead Qualified • Pushed to CRM",
      followUpText: "Awesome! Based on your scale, Growth Tier gives you unlimited agent seats at ₹0.22/msg. Rahul from Solutions is assigned.",
      followUpButton: "📅 Book 15-Min Live Demo"
    },
    capabilities: [
      { title: "Click-to-WhatsApp (CTWA) Ad Tracker", desc: "Capture ads attribution data directly in WhatsApp and track exactly which Meta ad campaign drove the lead.", badge: "Ad Attribution" },
      { title: "24/7 AI Qualification Chatbot", desc: "Ask budget, intent, company size, and timeline interactively before routing to human sales closers.", badge: "Auto-Scoring" },
      { title: "100% Verified Phone Identity", desc: "Eliminate fake emails and invalid phone numbers forever. Every prospect is an active, verified mobile user.", badge: "Zero Spam" },
      { title: "Instant Two-Way CRM Sync", desc: "Seamlessly push qualified leads, chat transcripts, and custom tags into HubSpot, Salesforce, or Zoho.", badge: "CRM Integrations" },
      { title: "Smart Sales Routing & Inbox Handoff", desc: "Distribute hot prospects to available sales reps via round-robin or skill-based routing in the Shared Team Inbox.", badge: "Team Routing" },
      { title: "Automated Follow-Up Drip Sequences", desc: "Re-engage warm leads who dropped off with gentle timed reminder drips after 15 mins or 24 hours.", badge: "Lead Nurturing" }
    ],
    funnelSteps: [
      { step: "01", title: "Capture Traffic", desc: "Drive high-intent traffic via Meta Ads, QR codes, website chat widgets, or social bio links." },
      { step: "02", title: "Conversational Qualification", desc: "Automated chatbot asks budget, timeline, and requirements in a friendly 30-second chat." },
      { step: "03", title: "Instant CRM & Agent Sync", desc: "Lead data is pushed to your CRM and hot prospects are instantly routed to sales reps." },
      { step: "04", title: "Nurture & Convert", desc: "Automated follow-up drip sequences re-engage warm leads until they convert into paying customers." }
    ],
    comparison: [
      { metric: "Form Completion Rate", traditional: "2% - 3% on landing pages", whatsapp: "65% - 80% on WhatsApp Chat" },
      { metric: "Contact Verification", traditional: "30%+ fake emails/numbers", whatsapp: "100% verified phone numbers" },
      { metric: "Speed to Lead", traditional: "Hours to Days for callback", whatsapp: "< 5 seconds instant response" },
      { metric: "Re-engagement Rate", traditional: "< 15% email open rate", whatsapp: "98% WhatsApp open rate" },
      { metric: "Sales Conversion Lift", traditional: "Low conversion on static forms", whatsapp: "3.8x to 4.2x higher close rate" }
    ],
    faqs: [
      { q: "How do Click-to-WhatsApp (CTWA) Ads work with Wapine?", a: "When a potential buyer clicks your ad on Facebook or Instagram, it immediately opens a WhatsApp conversation with your verified business account with a pre-filled greeting, capturing the lead with zero landing page drop-off." },
      { q: "Can Wapine automatically push leads into our CRM?", a: "Yes. Wapine integrates natively with HubSpot, Salesforce, Zoho CRM, Google Sheets, LeadSquared, and custom REST API webhooks in real time." },
      { q: "How does the bot qualify leads before human handoff?", a: "The bot presents quick interactive single-tap buttons (e.g. Budget range, Location, Purchase timeline) and scores the lead before assigning it to the right sales closer." },
      { q: "What happens if a lead stops replying during the chat?", a: "Wapine triggers automated gentle reminder drips (e.g., after 15 minutes or 24 hours) with personalized offers to bring the prospect back into the conversation." },
      { q: "Can our sales reps take over the chat and call the leads?", a: "Yes! Sales agents can take over the live chat in Wapine's Shared Multi-Agent Inbox or dial the verified phone number directly from their CRM." }
    ]
  },
  {
    slug: "notifications-alerts",
    icon3d: icon3dBell,
    title: "Notifications & Alerts",
    heroBadge: "TRANSACTIONAL API • 99.99% UPTIME",
    metaTitle: "Automated WhatsApp Transactional Alerts & Notifications | Wapine",
    metaDescription: "Send instant transactional notifications, OTPs, appointment reminders, booking confirmations, and delivery updates via WhatsApp API.",
    tagline: "Critical updates delivered in seconds.",
    description: "Send instant transactional notifications — appointment reminders, booking confirmations, payment receipts, and delivery ETAs with 99.9% deliverability.",
    features: [
      "Booking confirmations & tickets",
      "Payment receipts & tax invoices (PDFs)",
      "Appointment reminders & 1-click reschedule",
      "Delivery dispatch & ETA live tracking",
      "High-priority OTP & 2FA authentication"
    ],
    stat: { value: "<3s", label: "Average delivery time" },
    color: "from-blue-600 via-indigo-600 to-cyan-600",
    accentBg: "bg-blue-950",
    lightBg: "bg-blue-50/70",
    metrics: [
      { label: "Delivery Speed", value: "< 3s", desc: "Ultra-fast global Cloud API delivery", color: "text-blue-600" },
      { label: "Deliverability Rate", value: "99.9%", desc: "Direct to lockscreen notification", color: "text-indigo-600" },
      { label: "Read Rate", value: "98%", desc: "Immediate customer visibility", color: "text-cyan-600" },
      { label: "Cost Savings", value: "40%", desc: "Lower than traditional SMS DLT", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "Wapine Airline",
      senderTag: "Verified Official Notification",
      customerMsg: "Status: Confirmed booking #AI-902",
      botTitle: "✈️ Flight Booking Confirmed",
      botReply: "Your flight AI-902 (DEL -> BOM) is confirmed for Tomorrow at 08:30 AM. Boarding pass attached below.",
      buttons: ["📥 Download Boarding Pass", "💺 Choose Meal / Seat", "🚗 Book Airport Cab"],
      customerSelection: "📥 Download Boarding Pass",
      followUpStatus: "PDF Document Delivered",
      followUpText: "Here is your digital Boarding Pass PDF. Have a safe journey!",
      followUpButton: "📄 View Boarding_Pass.pdf"
    },
    capabilities: [
      { title: "Sub-Second Global API Latency", desc: "Send critical OTPs, payment receipts, and alerts with average API execution latency under 10ms.", badge: "High Speed" },
      { title: "Rich PDF & Media Invoicing", desc: "Attach official tax invoices, tickets, and policy documents directly as downloadable PDF files.", badge: "Rich Docs" },
      { title: "Interactive Utility Buttons", desc: "Let customers confirm appointments, track packages, or download receipts with single-tap buttons.", badge: "High CTR" }
    ],
    funnelSteps: [
      { step: "01", title: "Event Trigger", desc: "Order placed, appointment booked, or transaction created in your system." },
      { step: "02", title: "API Call", desc: "Trigger Wapine Notification API with dynamic payload." },
      { step: "03", title: "Instant Delivery", desc: "WhatsApp delivers rich template directly to customer lockscreen." },
      { step: "04", title: "Status Tracking", desc: "Receive real-time webhooks for Sent, Delivered, and Read statuses." }
    ],
    comparison: [
      { metric: "Delivery Speed", traditional: "5 - 30 seconds (SMS)", whatsapp: "< 3 seconds" },
      { metric: "Cost per Notification", traditional: "High SMS DLT fees", whatsapp: "Low Meta Utility Tier" },
      { metric: "Rich Media & Links", traditional: "Plain text only (SMS)", whatsapp: "PDFs, images, maps & CTA buttons" },
      { metric: "Delivery Verification", traditional: "Unreliable SMS status", whatsapp: "100% accurate read receipts" }
    ],
    faqs: [
      { q: "Are transactional notifications cheaper than marketing messages?", a: "Yes, Meta categorizes transactional notifications as 'Utility' or 'Authentication' which have significantly lower rates than marketing messages." },
      { q: "Can customers reply to notification messages?", a: "Yes, you can enable conversational replies so customers can ask questions or confirm appointments directly." }
    ]
  },
  {
    slug: "sales-outreach",
    icon3d: icon3dChart,
    title: "Sales Outreach",
    heroBadge: "B2B PIPELINE • INTERACTIVE CATALOGS",
    metaTitle: "WhatsApp Sales Outreach & CRM Pipeline Acceleration | Wapine",
    metaDescription: "Accelerate sales pipeline and close deals faster with direct WhatsApp outreach, automated follow-ups, and interactive product catalogs.",
    tagline: "Convert prospects faster with direct outreach.",
    description: "Reach decision-makers directly on their phones. Run personalized outreach sequences that bypass spam folders, share interactive catalogs, and book meetings directly on WhatsApp.",
    features: [
      "B2B outreach sequences with personalized tags",
      "Direct-to-WhatsApp sales pipeline management",
      "Interactive product catalog & instant quotes",
      "Meeting scheduler integration (Calendly, Google Calendar)",
      "Secure payment links & 1-click checkout"
    ],
    stat: { value: "40%", label: "Higher conversion rate" },
    color: "from-amber-600 via-orange-600 to-rose-600",
    accentBg: "bg-amber-950",
    lightBg: "bg-amber-50/70",
    metrics: [
      { label: "Reply Rate", value: "48%", desc: "Direct executive outreach", color: "text-amber-600" },
      { label: "Deal Velocity", value: "3× Faster", desc: "Shortened sales cycle days", color: "text-orange-600" },
      { label: "Meeting Attendance", value: "92%", desc: "With automated WhatsApp reminders", color: "text-rose-600" },
      { label: "Conversion Rate", value: "+40%", desc: "Higher close rate vs cold email", color: "text-emerald-600" },
    ],
    chatSimulation: {
      senderName: "Wapine Enterprise",
      senderTag: "Verified Sales Executive",
      customerMsg: "Hi, can you send the enterprise catalog and pricing deck? 📊",
      botTitle: "💼 Enterprise Deck & Interactive Catalog",
      botReply: "Hi Vikram! Attached is our 2026 Enterprise Solutions Brochure. Which deployment tier fits best?",
      buttons: ["🏢 Dedicated Cloud Instance", "⚡ Multi-Tenant Growth", "📅 Schedule 1-on-1 Call"],
      customerSelection: "📅 Schedule 1-on-1 Call",
      followUpStatus: "Meeting Scheduled for Tomorrow",
      followUpText: "Calendar invite sent for Wednesday at 3:30 PM with our Head of Solutions.",
      followUpButton: "📅 Add to Google Calendar"
    },
    capabilities: [
      { title: "Direct Mobile Decision Maker Access", desc: "Bypass full email inboxes and spam filters to reach founders and managers on WhatsApp.", badge: "Direct Access" },
      { title: "Interactive Product Catalogs", desc: "Showcase complete inventory with images, descriptions, and instant checkout links inside chat.", badge: "Catalog Sync" },
      { title: "Automated Meeting Confirmations", desc: "Reduce meeting no-shows from 40% down to under 8% with automated WhatsApp calendar alerts.", badge: "No-Show Shield" }
    ],
    funnelSteps: [
      { step: "01", title: "Targeted Outreach", desc: "Send personalized high-value intros with dynamic variables." },
      { step: "02", title: "Interactive Catalogs", desc: "Share rich product collections with instant price quotes." },
      { step: "03", title: "Schedule Meetings", desc: "Let prospects book demo calendar slots directly inside chat." },
      { step: "04", title: "Collect Payment", desc: "Send secure payment links via Cashfree/Razorpay to close on the spot." }
    ],
    comparison: [
      { metric: "Response Rate", traditional: "1% - 3% (Cold Email)", whatsapp: "35% - 50% (WhatsApp)" },
      { metric: "Sales Cycle Length", traditional: "30 - 45 days", whatsapp: "7 - 14 days" },
      { metric: "Meeting Show-up Rate", traditional: "50% - 60%", whatsapp: "90%+ with WhatsApp reminders" }
    ],
    faqs: [
      { q: "Can we integrate with Calendly or Google Calendar?", a: "Yes, you can automate demo booking links and send instant calendar confirmation reminders." }
    ]
  }
];
