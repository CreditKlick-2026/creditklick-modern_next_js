"use client"
import { motion } from 'framer-motion';

export const IconApply = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
            <linearGradient id="paperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#F1F5F9" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.1" />
            </filter>
        </defs>

        {/* Background Circle Glow */}
        <motion.circle
            cx="50" cy="50" r="45"
            fill="url(#paperGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="drop-shadow-sm"
        />

        {/* Paper Form */}
        <motion.g
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <rect x="30" y="20" width="40" height="50" rx="4" fill="white" stroke="#E2E8F0" strokeWidth="2" filter="url(#shadow)" />
            {/* Header */}
            <rect x="35" y="28" width="30" height="4" rx="2" fill="#3B82F6" />
            {/* Lines */}
            <rect x="35" y="38" width="20" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="35" y="46" width="30" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="35" y="54" width="25" height="3" rx="1.5" fill="#CBD5E1" />
        </motion.g>

        {/* Gold Coin */}
        <motion.g
            initial={{ scale: 0, x: -20, rotate: -180 }}
            animate={{ scale: active ? 1 : 0, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        >
            <circle cx="75" cy="75" r="12" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <circle cx="75" cy="75" r="8" fill="#FCD34D" />
            <text x="75" y="79" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309">₹</text>
        </motion.g>

        {/* Pencil Animation */}
        <motion.g
            initial={{ x: 20, y: -20, opacity: 0 }}
            animate={{ x: active ? 0 : 20, y: active ? 0 : -20, opacity: active ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
        >
            <path d="M65 45 L75 35 L80 40 L70 50 Z" fill="#F59E0B" />
            <path d="M65 45 L62 52 L68 49 Z" fill="#333" />
        </motion.g>

        {/* Checkmarks appearing */}
        <motion.path
            d="M36 40 L38 42 L42 38"
            fill="none" stroke="#22C55E" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.3 }}
        />
        <motion.path
            d="M36 48 L38 50 L42 46"
            fill="none" stroke="#22C55E" strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
        />
    </svg>
);

export const IconValuation = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
        </defs>

        {/* Base Platform */}
        <motion.ellipse
            cx="50" cy="80" rx="30" ry="10"
            fill="#E2E8F0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
        />

        {/* Gold Item */}
        <motion.g
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
            <path d="M35 55 Q50 35 65 55 T95 55" stroke="url(#goldGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="55" r="15" fill="url(#goldGrad)" />
            <circle cx="50" cy="55" r="10" fill="#FEF3C7" opacity="0.5" />
        </motion.g>

        {/* Magnifying Glass */}
        <motion.g
            initial={{ x: 30, y: -30, opacity: 0 }}
            animate={{
                x: active ? 0 : 30,
                y: active ? 0 : -30,
                opacity: active ? 1 : 0,
                rotate: active ? [0, -10, 10, 0] : 0
            }}
            transition={{
                opacity: { duration: 0.3, delay: 0.5 },
                x: { duration: 0.5, delay: 0.5 },
                y: { duration: 0.5, delay: 0.5 },
                rotate: { duration: 2, repeat: Infinity, delay: 1 }
            }}
        >
            <circle cx="60" cy="45" r="20" stroke="#3B82F6" strokeWidth="4" fill="rgba(255,255,255,0.4)" />
            <line x1="48" y1="57" x2="35" y2="70" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />

            {/* Sparkle inside glass */}
            <motion.circle
                cx="58" cy="43" r="2" fill="white"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
            />
        </motion.g>
    </svg>
);

export const IconApproval = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Shield Background */}
        <motion.path
            d="M50 10 L80 25 V50 C80 70 50 90 50 90 C50 90 20 70 20 50 V25 L50 10 Z"
            fill="#EFF6FF"
            stroke="#3B82F6"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: active ? 1 : 0.8 }}
            transition={{ type: "spring" }}
        />

        {/* Approved Stamp Ring */}
        <motion.circle
            cx="50" cy="50" r="25"
            stroke="#22C55E" strokeWidth="3"
            strokeDasharray="5 5"
            fill="none"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: active ? 1 : 0, rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Checkmark */}
        <motion.path
            d="M35 50 L45 60 L65 40"
            fill="none" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, scale: 0 }}
            animate={{ pathLength: active ? 1 : 0, scale: active ? 1 : 0 }}
            transition={{ delay: 0.4, type: "spring" }}
        />

        {/* Confetti/Stars */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
            <motion.g key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: active ? 1 : 0, scale: active ? [0, 1.2, 0] : 0 }}
                transition={{ delay: 0.8 + (i * 0.1), repeat: active ? Infinity : 0, repeatDelay: 2 }}
                style={{ transformOrigin: "50% 50%" }}
            >
                <circle cx={50 + 35 * Math.cos(angle * Math.PI / 180)} cy={50 + 35 * Math.sin(angle * Math.PI / 180)} r="3" fill="#F59E0B" />
            </motion.g>
        ))}
    </svg>
);

export const IconDisbursal = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        {/* Phone */}
        <motion.rect
            x="30" y="20" width="40" height="70" rx="5"
            fill="#1E293B"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
        />
        <rect x="32" y="25" width="36" height="55" fill="#334155" rx="1" />

        {/* Bank App Screen header */}
        <rect x="32" y="25" width="36" height="15" fill="#3B82F6" rx="1" />

        {/* Incoming Money Animation */}
        <motion.g>
            {[1, 2, 3].map((_, i) => (
                <motion.circle
                    key={i}
                    cx="50" cy={10 - (i * 15)} r="6"
                    fill="#FCD34D" stroke="#B45309" strokeWidth="1"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{
                        y: active ? 50 : -50,
                        opacity: active ? [0, 1, 0] : 0,
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeIn"
                    }}
                >
                    <text x="0" y="2" textAnchor="middle" fontSize="6" fill="#B45309" dy=".1em">₹</text>
                </motion.circle>
            ))}
        </motion.g>

        {/* Success Message on Phone */}
        <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5 }}
            transition={{ delay: 1.5 }}
        >
            <circle cx="50" cy="55" r="10" fill="#22C55E" />
            <path d="M45 55 L48 58 L55 51" stroke="white" strokeWidth="2" fill="none" />
            <text x="50" y="75" textAnchor="middle" fontSize="4" fill="green" fontWeight="bold">RECEIVED</text>
        </motion.g>

    </svg>
);
