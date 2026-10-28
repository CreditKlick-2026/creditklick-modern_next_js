import React from "react";
import Link from "next/link";
import { ServiceNode } from "./services.data";

export function ServiceMobileCard({ node }: { node: ServiceNode }) {
  const { Icon } = node;

  return (
    <Link
      href={node.href}
      className="dt-mobile-node-card group"
      style={{
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px",
        backgroundColor: "#ffffff",
        border: "1px solid rgba(226, 232, 240, 0.9)",
        textDecoration: "none",
        transition: "all 0.22s ease",
        position: "relative",
      }}
    >
      <div>
        {/* Top: Icon + Tag */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "6px", marginBottom: "10px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            minWidth: "36px",
            borderRadius: "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: node.iconBg,
            color: node.iconColor,
          }}>
            <Icon style={{ width: "18px", height: "18px" }} aria-hidden="true" />
          </div>
          {node.tag && (
            <span style={{
              fontSize: "9px",
              fontWeight: 700,
              color: node.iconColor,
              backgroundColor: node.iconBg,
              padding: "2px 6px",
              borderRadius: "0px",
              border: `1px solid ${node.iconColor}25`,
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}>
              {node.tag}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 style={{
          fontSize: "12.5px",
          fontWeight: 700,
          color: "#0f172a",
          marginBottom: "4px",
          lineHeight: 1.3,
        }}>
          {node.title}
        </h4>

        {/* Description */}
        <p style={{
          fontSize: "11px",
          color: "#64748b",
          lineHeight: 1.35,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        } as React.CSSProperties}>
          {node.desc}
        </p>
      </div>

      {/* Bottom: Learn more link */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: "10px",
        paddingTop: "6px",
        borderTop: "1px solid #f1f5f9",
        fontSize: "11px",
        fontWeight: 600,
        color: "#155dfc",
      }}>
        <span>Learn more</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "transform 0.2s ease" }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
