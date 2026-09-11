'use client';

import { Link } from "@/lib/navigation";
import { Button } from "@/components/ui/Button";
import { MessageCircle, ArrowRight } from "lucide-react";

export function BlogDetailCta() {
  return (
    <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#0a1e15] to-[#072418] text-white relative overflow-hidden shadow-xl">
      <div className="max-w-xl">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-[#25D366]">
          <MessageCircle className="w-5 h-5" />
        </div>
        <h3 className="text-2xl font-black mb-2">
          Ready to scale your WhatsApp marketing?
        </h3>
        <p className="text-xs text-emerald-100/70 mb-6 leading-relaxed font-normal">
          Get started with official Meta Cloud API broadcasts, automated chatbots, and smart multi-agent inboxes today.
        </p>
        <Link href="/signup">
          <Button className="h-11 px-6 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#1ebe5d] text-gray-950">
            Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
