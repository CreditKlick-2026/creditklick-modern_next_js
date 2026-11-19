import React from "react";
import { Lock, ShieldCheck, Database, CheckCircle2 } from "lucide-react";

export interface TrustPillar {
  icon: React.ReactNode;
  bg: string;
  title: string;
  desc: string;
}

export const ACCREDITATIONS: readonly string[] = [
  "ISO 27001",
  "ISO 9001",
  "RBI Compliant",
  "PCI DSS",
  "CRIF Audited",
  "MongoDB Certified",
];

export const TRUST_PILLARS: readonly TrustPillar[] = [
  {
    icon: <ShieldCheck className="w-4 h-4 text-brand" />,
    bg: "bg-brand-soft text-brand",
    title: "CRIF & Bureau Audited",
    desc: "Direct bureau pipeline adhering to strict RBI & CRIF High Mark security guidelines.",
  },
  {
    icon: <Database className="w-4 h-4 text-brand" />,
    bg: "bg-brand-soft text-brand",
    title: "MongoDB Certified Cloud",
    desc: "Enterprise isolated database clusters with AES-256 encryption at rest.",
  },
  {
    icon: <Lock className="w-4 h-4 text-brand" />,
    bg: "bg-brand-soft text-brand",
    title: "256-Bit SSL Encryption",
    desc: "Bank-grade transport layer security for every score check and application.",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-brand" />,
    bg: "bg-brand-soft text-brand",
    title: "100% Zero-Spam Policy",
    desc: "Your phone number & financial info are never sold to third-party telemarketers.",
  },
];
