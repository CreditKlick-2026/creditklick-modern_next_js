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
    icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
    bg: "bg-blue-100/90 text-blue-700",
    title: "CRIF & Bureau Audited",
    desc: "Direct bureau pipeline adhering to strict RBI & CRIF High Mark security guidelines.",
  },
  {
    icon: <Database className="w-4 h-4 text-emerald-600" />,
    bg: "bg-emerald-100/90 text-emerald-700",
    title: "MongoDB Certified Cloud",
    desc: "Enterprise isolated database clusters with AES-256 encryption at rest.",
  },
  {
    icon: <Lock className="w-4 h-4 text-indigo-600" />,
    bg: "bg-indigo-100/90 text-indigo-700",
    title: "256-Bit SSL Encryption",
    desc: "Bank-grade transport layer security for every score check and application.",
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-teal-600" />,
    bg: "bg-teal-100/90 text-teal-700",
    title: "100% Zero-Spam Policy",
    desc: "Your phone number & financial info are never sold to third-party telemarketers.",
  },
];
