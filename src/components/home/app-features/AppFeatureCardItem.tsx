import React from "react";
import { ArrowUpRight } from "lucide-react";
import { AppFeatureItem } from "./app-features.data";

export function AppFeatureCardItem({ feature }: { feature: AppFeatureItem }) {
  const Icon = feature.icon;

  return (
    <div className="af-card group">
      <div>
        {/* Top Bar inside card: Icon + Step / Tag */}
        <div className="af-top-bar">
          <div className="af-icon-box">
            <Icon className="h-5 w-5 stroke-[2]" aria-hidden="true" />
          </div>
          <span className="af-step-badge">
            {feature.step}
          </span>
        </div>

        {/* Card Title & Description */}
        <h3 className="af-card-title">
          {feature.title}
        </h3>
        <p className="af-card-desc">
          {feature.description}
        </p>
      </div>

      {/* Bottom Tag & Directional Arrow */}
      <div className="af-card-footer">
        <span className="af-tag-text">
          {feature.tag}
        </span>
        <ArrowUpRight className="af-arrow-icon" aria-hidden="true" />
      </div>
    </div>
  );
}

