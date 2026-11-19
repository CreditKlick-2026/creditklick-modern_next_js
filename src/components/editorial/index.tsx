import React from "react";
import Link from "next/link";
import ed from "./Editorial.module.css";

/** Every editorial class in one object: `ed.section`, `ed.btn`, `ed.cell`… */
export { ed };

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

type Tone = "white" | "beige" | "dark";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: Tone;
  tight?: boolean;
  flush?: boolean;
  children: React.ReactNode;
}

/** Full-width band with the 1200px content container inside. */
export function Section({ tone = "white", tight, flush, className, children, ...rest }: SectionProps) {
  return (
    <section
      className={cx(
        ed.section,
        tone === "beige" && ed.beige,
        tone === "dark" && ed.dark,
        tight && ed.sectionTight,
        flush && ed.sectionFlush,
        className
      )}
      {...rest}
    >
      <div className={ed.container}>{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  /** The one emphasised phrase of the headline: brand blue, italic serif */
  accent?: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  subtitle,
  align = "center",
  onDark,
  as: Heading = "h2",
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cx(ed.header, align === "left" && ed.headerLeft, onDark && ed.onDark, className)}>
      <span className={ed.eyebrow}>{eyebrow}</span>
      <Heading id={id} className={ed.title}>
        {title}
        {accent && (
          <>
            {" "}
            <span className={ed.titleAccent}>{accent}</span>
          </>
        )}
      </Heading>
      {subtitle && <p className={ed.subtitle}>{subtitle}</p>}
    </div>
  );
}

type Variant = "solid" | "outline" | "onDark" | "light";

interface EdButtonProps {
  href: string;
  variant?: Variant;
  small?: boolean;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const VARIANT: Record<Variant, string> = {
  solid: ed.btnSolid,
  outline: ed.btnOutline,
  onDark: ed.btnOnDark,
  light: ed.btnLight,
};

/** Link styled as an editorial button (mono label, square corners). */
export function EdButton({ href, variant = "solid", small, external, className, children, onClick }: EdButtonProps) {
  const cls = cx(ed.btn, VARIANT[variant], small && ed.btnSm, className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}
