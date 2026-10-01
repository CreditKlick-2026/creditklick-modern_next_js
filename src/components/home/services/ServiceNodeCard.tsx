import React from "react";
import Link from "next/link";
import { ServiceNode } from "./services.data";

interface ServiceNodeCardProps {
  node: ServiceNode;
  index: number;
  isRightColumn?: boolean;
}

export function ServiceNodeCard({ node, index, isRightColumn = false }: ServiceNodeCardProps) {
  const { Icon } = node;
  const hoverColor = isRightColumn ? "group-hover:text-emerald-700" : "group-hover:text-blue-700";

  return (
    <Link
      href={node.href}
      className="dt-node-card group"
      style={{
        marginLeft: !isRightColumn && (index === 1 || index === 2) ? "20px" : "0px",
        marginRight: isRightColumn && (index === 1 || index === 2) ? "20px" : "0px",
      }}
    >
      <span className="dt-corner-bracket dt-corner-tl" />
      <span className="dt-corner-bracket dt-corner-tr" />
      <span className="dt-corner-bracket dt-corner-bl" />
      <span className="dt-corner-bracket dt-corner-br" />

      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: node.iconBg, color: node.iconColor }}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>
      <div className="overflow-hidden">
        <p className={`text-xs font-bold text-slate-800 ${hoverColor} transition-colors truncate`}>
          {node.title}
        </p>
        <p className="text-[11px] text-slate-500 line-clamp-1 leading-tight mt-0.5">
          {node.desc}
        </p>
      </div>
    </Link>
  );
}
