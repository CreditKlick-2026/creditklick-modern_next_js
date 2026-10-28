// CreditKlick - About page SVG illustrations (brand: #1d5fc9 / #dbe8fd)

const styles = `
.cka-twinkle, .cka-sway { transform-box: fill-box; transform-origin: center; }
.cka-sway { transform-origin: bottom center; }

@media (prefers-reduced-motion: no-preference) {
  .cka-twinkle { animation: cka-twinkle 2.4s ease-in-out infinite; }
  .cka-twinkle-2 { animation-delay: -0.8s; }
  .cka-sway    { animation: cka-sway 6s ease-in-out infinite; }
}

@keyframes cka-twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1); } }
@keyframes cka-sway    { 0%, 100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }
`;

export function AboutIllustrationStyles() {
    return <style>{styles}</style>;
}

function Sparkle({ x, y, size = 10, className = '' }: { x: number; y: number; size?: number; className?: string }) {
    const s = size;
    return (
        <path
            className={`cka-twinkle ${className}`}
            d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
            fill="#1d5fc9"
        />
    );
}

/** Journey: full-grown tree at the end of the timeline trunk */
export function TreeCrown({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 260 220" className={className} aria-hidden="true">
            <defs>
                <linearGradient id="cka-leaf-a" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5e95ed" />
                    <stop offset="1" stopColor="#1d5fc9" />
                </linearGradient>
                <linearGradient id="cka-leaf-b" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#dbe8fd" />
                    <stop offset="1" stopColor="#a1c2f7" />
                </linearGradient>
            </defs>
            <g className="cka-sway">
                {/* Trunk + branches */}
                <path d="M130 220V120" stroke="#1d5fc9" strokeWidth="6" strokeLinecap="round" />
                <path d="M130 168c-18-10-34-26-44-46M130 150c16-8 30-22 38-40" fill="none" stroke="#1d5fc9" strokeWidth="5" strokeLinecap="round" />
                {/* Crown */}
                <circle cx="80" cy="104" r="42" fill="url(#cka-leaf-b)" />
                <circle cx="180" cy="100" r="44" fill="url(#cka-leaf-b)" />
                <circle cx="128" cy="70" r="60" fill="url(#cka-leaf-a)" />
                <circle cx="96" cy="60" r="30" fill="#5e95ed" opacity="0.6" />
                <circle cx="168" cy="56" r="26" fill="#ffffff" opacity="0.18" />
                {/* Fruits: coins */}
                {[
                    [92, 96],
                    [150, 40],
                    [176, 110],
                    [118, 108],
                    [64, 120],
                ].map(([cx, cy], i) => (
                    <g key={i}>
                        <circle cx={cx} cy={cy} r="9" fill="#dbe8fd" stroke="#5e95ed" strokeWidth="2" />
                        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill="#142c52" fontFamily="system-ui, sans-serif">₹</text>
                    </g>
                ))}
            </g>
            <Sparkle x={230} y={40} size={9} />
            <Sparkle x={24} y={60} size={7} className="cka-twinkle-2" />
        </svg>
    );
}

/** Journey: roots at the bottom of the timeline trunk */
export function TreeRoots({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 90" className={className} aria-hidden="true">
            <ellipse cx="100" cy="70" rx="92" ry="14" fill="#dbe8fd" />
            <g fill="none" stroke="#1d5fc9" strokeWidth="4" strokeLinecap="round">
                <path d="M100 0v40" />
                <path d="M100 30c-10 14-30 22-54 30" />
                <path d="M100 30c10 14 30 22 54 30" />
                <path d="M100 38c-4 12-14 22-24 30" strokeWidth="3" />
                <path d="M100 38c4 12 14 22 24 30" strokeWidth="3" />
                <path d="M62 54c-10 2-20 8-26 14" strokeWidth="2.5" opacity="0.7" />
                <path d="M138 54c10 2 20 8 26 14" strokeWidth="2.5" opacity="0.7" />
            </g>
            <path d="M100 0v4" stroke="#1d5fc9" strokeWidth="6" strokeLinecap="round" />
        </svg>
    );
}

/** Mission: target with arrow */
export function MissionArt({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
            <circle cx="56" cy="64" r="46" fill="#dbe8fd" />
            <circle cx="56" cy="64" r="32" fill="#ffffff" />
            <circle cx="56" cy="64" r="20" fill="#a1c2f7" />
            <circle cx="56" cy="64" r="8" fill="#1d5fc9" />
            <path d="M56 64L104 16" stroke="#142c52" strokeWidth="4" strokeLinecap="round" />
            <path d="M96 10l14 0-4 14-8-6z" fill="#5e95ed" />
        </svg>
    );
}

/** Vision: telescope looking at a star */
export function VisionArt({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="#dbe8fd" />
            <g transform="rotate(-28 60 60)">
                <rect x="22" y="50" width="62" height="20" rx="6" fill="#1d5fc9" />
                <rect x="80" y="46" width="16" height="28" rx="4" fill="#142c52" />
                <rect x="12" y="54" width="12" height="12" rx="3" fill="#142c52" />
            </g>
            <path d="M56 74l-14 34M60 74l14 34" stroke="#142c52" strokeWidth="4" strokeLinecap="round" />
            <path d="M98 14l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#5e95ed" />
        </svg>
    );
}

/** Soft wave used between sections */
export function Wave({ className = '', flip = false, fill = '#dbe8fd' }: { className?: string; flip?: boolean; fill?: string }) {
    return (
        <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className={`ab-wave ${flip ? 'ab-wave-flip' : ''} ${className}`}
            aria-hidden="true"
        >
            <path d="M0 40c160 30 320 40 480 24S800 8 960 12s320 40 480 36V80H0z" fill={fill} />
        </svg>
    );
}
