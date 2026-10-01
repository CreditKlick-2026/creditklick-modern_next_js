const icon3dShopping = "/images/icons/3d-shopping.png";
const icon3dMegaphone = "/images/icons/3d-megaphone.png";
const icon3dBell = "/images/icons/3d-bell.png";
const icon3dShield = "/images/icons/3d-shield.png";
const icon3dChart = "/images/icons/3d-chart.png";
const icon3dHeart = "/images/icons/3d-heart.png";
const icon3dTruck = "/images/icons/3d-truck.png";
const icon3dBuilding = "/images/icons/3d-building.png";
const icon3dEducation = "/images/icons/3d-education.png";
const icon3dRocket = "/images/icons/3d-rocket.png";
const icon3dHeadset = "/images/icons/3d-headset.png";
const icon3dLocation = "/images/icons/3d-location.png";

export {
  icon3dShopping,
  icon3dMegaphone,
  icon3dBell,
  icon3dShield,
  icon3dChart,
  icon3dHeart,
  icon3dTruck,
  icon3dBuilding,
  icon3dEducation,
  icon3dRocket,
  icon3dHeadset,
  icon3dLocation,
};

export interface ChatSimulation {
  senderName: string;
  senderTag: string;
  customerMsg: string;
  botTitle?: string;
  botReply: string;
  mediaBanner?: string;
  buttons?: string[];
  customerSelection?: string;
  followUpStatus?: string;
  followUpText?: string;
  followUpButton?: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
  desc: string;
  color: string;
}

export interface CoreCapability {
  title: string;
  desc: string;
  badge: string;
}

export interface ComparisonRow {
  metric: string;
  traditional: string;
  whatsapp: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FunnelStep {
  step: string;
  title: string;
  desc: string;
}

export interface SolutionItem {
  slug: string;
  icon3d: any;
  title: string;
  heroBadge?: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  description: string;
  features: string[];
  stat: { value: string; label: string };
  color: string;
  accentBg: string;
  lightBg: string;
  chatSimulation: ChatSimulation;
  metrics: MetricHighlight[];
  capabilities: CoreCapability[];
  funnelSteps?: FunnelStep[];
  comparison?: ComparisonRow[];
  faqs?: FAQItem[];
}
