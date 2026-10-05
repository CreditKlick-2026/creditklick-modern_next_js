'use client';

import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ScriptableContext
} from "chart.js";
import { Line } from "react-chartjs-2";
import { TrendingUp, ShieldCheck, CheckCircle2, Award, Zap } from "lucide-react";
import styles from "./RefinePage.module.css";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface Milestone {
    day: string;
    score: number;
    title: string;
    desc: string;
    badge: string;
}

const MILESTONES: Milestone[] = [
    {
        day: "Day 0",
        score: 585,
        title: "Forensic Bureau Audit",
        desc: "AI audit detected 2 wrong 60+ DPDs, 1 settled loan tag, and 8 unapproved hard inquiries.",
        badge: "Initial Audit"
    },
    {
        day: "Day 25",
        score: 628,
        title: "Inquiries Purged",
        desc: "8 unauthorized hard pulls challenged under RBI CICRA guidelines and successfully deleted.",
        badge: "+43 PTS"
    },
    {
        day: "Day 50",
        score: 692,
        title: "Wrong DPD Flags Removed",
        desc: "Lending bank admitted clerical reporting error; bureau records updated to zero overdue.",
        badge: "+107 PTS"
    },
    {
        day: "Day 75",
        score: 745,
        title: "Settlement Converted to NOC",
        desc: "Toxic 'Settled' tag rectified to clean 'Closed with Bank NOC' via Principal Nodal escalation.",
        badge: "+160 PTS"
    },
    {
        day: "Day 90",
        score: 778,
        title: "Prime 750+ Target Reached",
        desc: "Borrower qualifies for lowest-tier interest rates on ₹45L home loan and pre-approved cards.",
        badge: "GOAL ACHIEVED (+193 PTS)"
    }
];

export function RefineScoreChart() {
    const [activeIdx, setActiveIdx] = useState<number>(4);
    const [animatedScore, setAnimatedScore] = useState<number>(585);

    const activeMilestone = MILESTONES[activeIdx];

    // Smooth counter animation to target score
    useEffect(() => {
        let start = animatedScore;
        const target = activeMilestone.score;
        const duration = 400;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * ease);
            setAnimatedScore(current);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [activeIdx]);

    const chartData = {
        labels: MILESTONES.map((m) => m.day),
        datasets: [
            {
                label: "Credit Score",
                data: MILESTONES.map((m) => m.score),
                borderColor: "#2563eb",
                borderWidth: 3.5,
                pointBackgroundColor: MILESTONES.map((_, i) =>
                    i === activeIdx ? "#1d4ed8" : "#ffffff"
                ),
                pointBorderColor: MILESTONES.map((_, i) =>
                    i === activeIdx ? "#60a5fa" : "#2563eb"
                ),
                pointBorderWidth: MILESTONES.map((_, i) => (i === activeIdx ? 4 : 2.5)),
                pointRadius: MILESTONES.map((_, i) => (i === activeIdx ? 8 : 5)),
                pointHoverRadius: 9,
                tension: 0.38,
                fill: true,
                backgroundColor: (context: ScriptableContext<"line">) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
                    gradient.addColorStop(0, "rgba(37, 99, 235, 0.32)");
                    gradient.addColorStop(0.7, "rgba(37, 99, 235, 0.06)");
                    gradient.addColorStop(1, "rgba(37, 99, 235, 0.0)");
                    return gradient;
                }
            }
        ]
    };

    const chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: "#0f172a",
                titleColor: "#f8fafc",
                bodyColor: "#93c5fd",
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    title: (items: any) => {
                        const idx = items[0]?.dataIndex;
                        return `${MILESTONES[idx]?.day}: ${MILESTONES[idx]?.title}`;
                    },
                    label: (context: any) => `Credit Score: ${context.parsed.y} pts`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: "#64748b",
                    font: { size: 12, weight: "600" }
                }
            },
            y: {
                min: 550,
                max: 820,
                ticks: {
                    stepSize: 50,
                    color: "#94a3b8",
                    font: { size: 11 }
                },
                grid: {
                    color: "rgba(226, 232, 240, 0.6)"
                }
            }
        },
        onClick: (_: any, elements: any[]) => {
            if (elements.length > 0) {
                const clickedIndex = elements[0].index;
                setActiveIdx(clickedIndex);
            }
        }
    };

    return (
        <div className={styles.chartComponentWrap}>
            {/* Chart Top Header & Active Milestone Card */}
            <div className={styles.chartHeader}>
                <div>
                    <div className={styles.chartEyebrow}>
                        <TrendingUp size={15} />
                        <span>INTERACTIVE 90-DAY SCORE RECOVERY MODEL</span>
                    </div>
                    <h3 className={styles.chartTitle}>Credit Refine Recovery Trajectory</h3>
                    <p className={styles.chartSubtitle}>
                        Click any milestone on the timeline or chart below to explore dispute progress:
                    </p>
                </div>

                {/* Live Animated Score Gauge */}
                <div className={styles.liveScoreBadge}>
                    <span className={styles.liveScoreLabel}>Projected Score</span>
                    <div className={styles.liveScoreNumber}>
                        {animatedScore}
                        <span className={styles.liveScorePts}>pts</span>
                    </div>
                    <div className={styles.liveScoreStatus}>
                        {animatedScore >= 750 ? (
                            <span className={styles.statusPrime}>★ Prime 750+ (Approved)</span>
                        ) : animatedScore >= 680 ? (
                            <span className={styles.statusGood}>● Good Standing</span>
                        ) : (
                            <span className={styles.statusAudit}>⚠ Under Active Audit</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Interactive Timeline Tabs */}
            <div className={styles.timelineTabs}>
                {MILESTONES.map((m, idx) => (
                    <button
                        key={m.day}
                        type="button"
                        className={`${styles.timelineBtn} ${idx === activeIdx ? styles.timelineBtnActive : ""}`}
                        onClick={() => setActiveIdx(idx)}
                    >
                        <span className={styles.timelineDay}>{m.day}</span>
                        <span className={styles.timelineScore}>{m.score}</span>
                    </button>
                ))}
            </div>

            {/* Canvas Line Chart Container */}
            <div className={styles.chartCanvasContainer}>
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Active Milestone Detail Banner */}
            <div className={styles.milestoneCard}>
                <div className={styles.milestoneLeft}>
                    <div className={styles.milestonePill}>{activeMilestone.badge}</div>
                    <h4 className={styles.milestoneTitle}>{activeMilestone.title}</h4>
                    <p className={styles.milestoneDesc}>{activeMilestone.desc}</p>
                </div>
                <div className={styles.milestoneStat}>
                    <div className={styles.statLabel}>Score at {activeMilestone.day}</div>
                    <div className={styles.statNumber}>{activeMilestone.score}</div>
                    <div className={styles.statGain}>
                        {activeMilestone.score >= 585 ? `+${activeMilestone.score - 585} pts recovery` : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RefineScoreChart;
