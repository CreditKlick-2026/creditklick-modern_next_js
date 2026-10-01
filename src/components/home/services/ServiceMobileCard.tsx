import React from "react";
import Link from "next/link";
import { ServiceNode } from "./services.data";

export function ServiceMobileCard({ node }: { node: ServiceNode }) {
  const { Icon } = node;

  return (
    <Link href={node.href} className="dt-mobile-node-card group">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: node.iconBg, color: node.iconColor }}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <p className="text-[13px] sm:text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
            {node.title}
          </p>
          {node.tag && (
            <span className="text-[9.5px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 flex-shrink-0 whitespace-nowrap">
              {node.tag}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-snug line-clamp-2">
          {node.desc}
        </p>
      </div>
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}
