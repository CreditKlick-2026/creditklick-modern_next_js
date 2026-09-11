import icon3dShopping from "@/assets/icons/solutions/3d-shopping.png";
import icon3dMegaphone from "@/assets/icons/solutions/3d-megaphone.png";
import icon3dBell from "@/assets/icons/solutions/3d-bell.png";
import icon3dShield from "@/assets/icons/solutions/3d-shield.png";
import icon3dChart from "@/assets/icons/solutions/3d-chart.png";
import icon3dHeart from "@/assets/icons/solutions/3d-heart.png";
import icon3dTruck from "@/assets/icons/solutions/3d-truck.png";
import icon3dBuilding from "@/assets/icons/solutions/3d-building.png";
import icon3dEducation from "@/assets/icons/solutions/3d-education.png";
import icon3dRocket from "@/assets/icons/contact/3d-rocket.png";
import icon3dHeadset from "@/assets/icons/contact/3d-headset.png";
import icon3dLocation from "@/assets/icons/contact/3d-location.png";

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
