import React from "react";
import Link from "next/link";
import { ServiceNode } from "./services.data";

export function ServiceMobileCard({ node }: { node: ServiceNode }) {
  const { Icon } = node;

  return (
    <Link href={node.href} className="dt-mobile-node-card">
      {/* Icon */}
      <div style={{
        width: "44px",
        height: "44px",
        minWidth: "44px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        backgroundColor: node.iconBg,
        color: node.iconColor,
        transition: "transform 0.2s ease",
      }}>
        <Icon style={{ width: "20px", height: "20px" }} aria-hidden="true" />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", marginBottom: "2px" }}>
          <p style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#1e293b",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            transition: "color 0.2s ease",
          }}>
            {node.title}
          </p>
          {node.tag && (
            <span style={{
              fontSize: "9.5px",
              fontWeight: 600,
              color: "#2563eb",
              backgroundColor: "#eff6ff",
              padding: "2px 8px",
              borderRadius: "9999px",
              border: "1px solid #dbeafe",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}>
              {node.tag}
            </span>
          )}
        </div>
        <p style={{
          fontSize: "12px",
          color: "#64748b",
          lineHeight: 1.4,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        } as React.CSSProperties}>
          {node.desc}
        </p>
      </div>

      {/* Arrow */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0, transition: "transform 0.2s ease, stroke 0.2s ease" }}
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}
