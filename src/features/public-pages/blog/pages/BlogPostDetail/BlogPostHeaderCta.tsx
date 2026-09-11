import React from "react";
import { Phone } from "lucide-react";

interface BlogPostHeaderCtaProps {
  ctaBanner?: {
    enabled?: boolean;
    title?: string;
    subtitle?: string;
    formTitle?: string;
    buttonText?: string;
  };
}

export const BlogPostHeaderCta: React.FC<BlogPostHeaderCtaProps> = ({ ctaBanner }) => {
  if (!ctaBanner?.enabled) return null;

  return (
    <div className="w-full bg-[#f0fdf4] rounded-2xl shadow-sm border border-emerald-100 overflow-hidden mb-8 flex flex-col md:flex-row">
      <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative overflow-hidden">
        <h3 className="text-2xl md:text-[1.75rem] font-bold text-emerald-950 mb-3 leading-tight max-w-[400px]">
          {ctaBanner.title || "Scale WhatsApp Marketing with Official API"}
        </h3>
        <p className="text-[15px] text-slate-600 max-w-[320px] flex items-start gap-2">
          <span className="text-[#0f6841] mt-1">●</span>
          {ctaBanner.subtitle || "Send bulk broadcasts, automate chatbots, and connect your store in minutes."}
        </p>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <div className="w-64 h-64 rounded-full bg-emerald-400 blur-3xl"></div>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 md:max-w-[420px] bg-white m-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100">
        <h4 className="font-bold text-slate-900 text-lg mb-5">{ctaBanner.formTitle || "Let's Get Started"}</h4>
        <div className="relative mb-5">
          <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="tel" 
            placeholder="Mobile Number" 
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0f6841] focus:ring-2 focus:ring-[#0f6841]/20 text-sm transition-all" 
          />
        </div>
        <div className="flex items-start gap-3 mb-6">
          <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-[#0f6841] focus:ring-[#0f6841]" />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            I agree to receive product updates and automated WhatsApp demo notifications from Wapine.
          </p>
        </div>
        <button className="w-full bg-[#0f6841] text-white font-bold py-3.5 rounded-xl hover:bg-[#0c5636] transition-colors shadow-md shadow-[#0f6841]/20">
          {ctaBanner.buttonText || "Start Free Trial"}
        </button>
      </div>
    </div>
  );
};
