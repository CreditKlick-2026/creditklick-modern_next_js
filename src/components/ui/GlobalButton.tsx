"use client";

import React from "react";
import "./buttons.css";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface GlobalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  color?: "navy" | "blue"; // 'navy' is #1c398e, 'blue' is #155dfc
  variant?: "solid" | "outline" | "ghost" | "shine";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  prefetch?: boolean;
}

export const GlobalButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  GlobalButtonProps
>(
  (
    {
      children,
      href,
      color = "navy",
      variant = "solid",
      size = "md",
      icon,
      iconPosition = "right",
      fullWidth = false,
      className,
      disabled,
      prefetch,
      ...props
    },
    ref
  ) => {
    const isBlue = color === "blue";

    const variantClass = isBlue
      ? {
          solid: "btn-blue",
          outline: "btn-blue btn-blue-outline",
          ghost: "btn-blue btn-blue-ghost",
          shine: "btn-blue btn-blue-shine",
        }[variant]
      : {
          solid: "btn-global",
          outline: "btn-global btn-global-outline",
          ghost: "btn-global btn-global-ghost",
          shine: "btn-global btn-global-shine",
        }[variant];

    const sizeClass = {
      sm: "btn-global-sm",
      md: "btn-global-md",
      lg: "btn-global-lg",
      xl: "btn-global-xl",
    }[size];

    const combinedClasses = cn(
      variantClass,
      sizeClass,
      fullWidth && "w-full",
      className
    );

    const content = (
      <span className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap">
        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        {typeof children === "string" ? <span>{children}</span> : children}
        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
      </span>
    );

    if (href) {
      return (
        <Link
          href={href}
          prefetch={prefetch}
          className={combinedClasses}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

GlobalButton.displayName = "GlobalButton";

export default GlobalButton;
