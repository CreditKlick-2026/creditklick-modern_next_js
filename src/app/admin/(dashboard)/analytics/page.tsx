"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaChartLine, FaChartPie, FaSearch, FaMousePointer,
    FaMobileAlt, FaDesktop, FaClock, FaGlobe, FaCookieBite, FaExclamationTriangle,
    FaUsers, FaArrowUp, FaArrowDown, FaChartBar,
    FaChrome, FaFirefox, FaSafari, FaEdge, FaExternalLinkAlt, FaSync,
    FaEye, FaUserPlus, FaRedo, FaSignInAlt, FaFileAlt, FaCalendarAlt,
    FaPercentage, FaTachometerAlt, FaLayerGroup
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '@/services/api';

// Valid routes in the Next.js app
const VALID_ROUTES = [
    '/', '/about', '/blog', '/calculators', '/calculator/au', '/calculator/emi-calculator',
    '/calculator/idfc', '/calculator/nps-calculator', '/calculator/sbi-click', '/calculator/sbi-save',
    '/calculator/yes', '/contact', '/cookies-policy', '/credit-card/au-bank', '/credit-card/idfc-bank',
    '/credit-card/sbi-bank', '/credit-card/yes-bank', '/credit-cards', '/credit-score', '/download-report',
    '/emi', '/loan/business-loan', '/loan/gold-loan', '/loan/home-loan', '/loan/personal-loan', '/loans',
    '/login', '/posh-policy', '/privacy-policy', '/profile', '/refine', '/report-analysis', '/return-refund',
    '/terms-conditions', '/verify-otp', '/refinequeries', '/admin', '/admin/login', '/admin/dashboard',
    '/admin/analytics', '/admin/leads', '/admin/posts', '/admin/settings', '/admin/users',
];

const DYNAMIC_ROUTE_PATTERNS = [/^\/blog\/[^/]+$/i];

const normalizePath = (path: string): string => {
    let normalized = path.toLowerCase().trim();
    if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);
    return normalized;
};

const isValidRoute = (path: string): boolean => {
    const normalizedPath = normalizePath(path);
    if (VALID_ROUTES.some(route => route.toLowerCase() === normalizedPath)) return true;
    return DYNAMIC_ROUTE_PATTERNS.some(pattern => pattern.test(normalizedPath));
};

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, subValue, subLabel, trend }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    subValue?: string | number;
    subLabel?: string;
    trend?: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
        <div className="flex items-start justify-between">
            <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-800">{value}</span>
                    {trend !== undefined && (
                        <span className={`text-xs flex items-center gap-0.5 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend >= 0 ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                            {Math.abs(trend)}%
                        </span>
                    )}
                </div>
                {subValue !== undefined && (
                    <p className="text-xs text-gray-400 mt-1">{subLabel}: <span className="font-medium">{subValue}</span></p>
                )}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="text-white" size={20} />
            </div>
        </div>
    </motion.div>
);

// Hourly Traffic Chart
const HourlyChart = ({ data }: { data: { hour: number; views: number; visitors: number }[] }) => {
    const fullData = Array.from({ length: 24 }, (_, i) => {
        const existing = data.find(d => d.hour === i);
        return existing || { hour: i, views: 0, visitors: 0 };
    });
    const maxViews = Math.max(...fullData.map(d => d.views), 1);
    const currentHour = new Date().getHours();

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <FaClock className="text-green-600" /> Hourly Traffic (24h)
                </h3>
                <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded" /> Views</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded" /> Current Hour</span>
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="flex items-end gap-[3px] h-36 min-w-[600px]">
                    {fullData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
                            <div className="relative w-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${Math.max(4, (item.views / maxViews) * 120)}px` }}
                                    transition={{ duration: 0.5, delay: index * 0.02 }}
                                    className={`w-full rounded-t transition-colors ${item.hour === currentHour
                                        ? 'bg-gradient-to-t from-green-500 to-green-400'
                                        : 'bg-gradient-to-t from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500'
                                        }`}
                                />
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                    {item.hour}:00 - {item.views} views
                                </div>
                            </div>
                            {index % 3 === 0 && (
                                <span className="text-[9px] text-gray-400 mt-1">{item.hour}h</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Daily Traffic Line Chart (Professional with Axes & Labels)
const DailyChart = ({ data }: { data: { date: string; views: number; visitors: number }[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // If no data, show mockup or empty state
    if (!data || data.length === 0) return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-center h-[300px] text-gray-400">
            No traffic data available for this period.
        </div>
    );

    // Calculations
    const maxViews = Math.max(...data.map(d => d.views), 10); // Minimum scale of 10
    const totalViews = data.reduce((sum, d) => sum + d.views, 0);
    const avgViews = Math.round(totalViews / data.length);

    // Chart Dimensions (Fixed height, dynamic width but constrained)
    const containerHeight = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartHeight = containerHeight - margin.top - margin.bottom;

    // SVG coordinate system width
    const chartWidth = Math.max(data.length * 50, 800);

    // Helper functions
    const getX = (index: number) => (index / (data.length - 1)) * chartWidth;
    const getY = (value: number) => chartHeight - (value / maxViews) * chartHeight;

    // Generate Path (Smooth Curve)
    const generatePath = (dataPoints: typeof data, isArea = false) => {
        if (dataPoints.length === 0) return "";
        let d = `M ${getX(0)} ${getY(dataPoints[0].views)}`;
        for (let i = 0; i < dataPoints.length - 1; i++) {
            const x0 = getX(i);
            const y0 = getY(dataPoints[i].views);
            const x1 = getX(i + 1);
            const y1 = getY(dataPoints[i + 1].views);
            const cx0 = x0 + (x1 - x0) * 0.4; // Control point 1
            const cx1 = x1 - (x1 - x0) * 0.4; // Control point 2
            d += ` C ${cx0} ${y0}, ${cx1} ${y1}, ${x1} ${y1}`;
        }
        if (isArea) {
            d += ` L ${getX(dataPoints.length - 1)} ${chartHeight} L ${getX(0)} ${chartHeight} Z`;
        }
        return d;
    };

    const pathD = generatePath(data);
    const areaPathD = generatePath(data, true);

    // Y Axis Ticks (5 steps: 0, 25%, 50%, 75%, 100%)
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(p => Math.round(maxViews * p));

    return (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaChartLine className="text-blue-500" /> Daily Traffic Trend
                    </h3>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{totalViews.toLocaleString()} <span className="text-sm font-normal text-gray-500">views</span></div>
                </div>
            </div>

            {/* Scrollable Container for X-axis overflow if needed */}
            <div className="flex-1 w-full overflow-x-auto overflow-y-hidden relative custom-scrollbar">
                <div style={{ width: '100%', minWidth: '600px', height: `${containerHeight}px`, position: 'relative' }}>
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${chartWidth + margin.left + margin.right} ${containerHeight}`}
                        preserveAspectRatio="none"
                    >
                        <g transform={`translate(${margin.left}, ${margin.top})`}>
                            {/* Gradients */}
                            <defs>
                                <linearGradient id="chartGradientNew" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines & Y-Axis Labels */}
                            {yTicks.map((tick, i) => {
                                const y = getY(tick);
                                return (
                                    <g key={i}>
                                        {/* Horizontal Grid Line */}
                                        <line
                                            x1="0" y1={y}
                                            x2={chartWidth} y2={y}
                                            stroke="#e5e7eb"
                                            strokeWidth="1"
                                            strokeDasharray={i === 0 ? "" : "4 4"} // Solid line for 0 base
                                        />
                                        {/* Y-Axis Label */}
                                        <text
                                            x="-10" y={y + 4}
                                            textAnchor="end"
                                            fontSize="12"
                                            fill="#6b7280"
                                        >
                                            {tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* Area Fill */}
                            <motion.path
                                d={areaPathD}
                                fill="url(#chartGradientNew)"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />

                            {/* Line Stroke */}
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Interactive Points (Dots + X-Axis Labels) */}
                            {data.map((d, i) => {
                                const x = getX(i);
                                const y = getY(d.views);
                                const isHovered = hoveredIndex === i;
                                // Show date label logic: Show if few items, or every Nth item
                                const showLabel = data.length < 15 || i % Math.ceil(data.length / 10) === 0;

                                return (
                                    <g key={i}
                                        onMouseEnter={() => setHoveredIndex(i)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        {/* Hover Hit Area */}
                                        <rect
                                            x={x - (chartWidth / data.length / 2)}
                                            y="0"
                                            width={chartWidth / data.length}
                                            height={chartHeight}
                                            fill="transparent"
                                            className="cursor-crosshair"
                                        />

                                        {/* Vertical Guide Line (Hover) */}
                                        {isHovered && (
                                            <line
                                                x1={x} y1={0} x2={x} y2={chartHeight}
                                                stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4"
                                            />
                                        )}

                                        {/* Data Point */}
                                        <circle
                                            cx={x} cy={y}
                                            r={isHovered ? 6 : 4}
                                            fill={isHovered ? "#2563eb" : "white"}
                                            stroke="#2563eb"
                                            strokeWidth="2"
                                            className="transition-all duration-200"
                                        />

                                        {/* X-Axis Label */}
                                        {showLabel && (
                                            <text
                                                x={x} y={chartHeight + 20}
                                                textAnchor="middle"
                                                fontSize="11"
                                                fill="#6b7280"
                                            >
                                                {new Date(d.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                            </text>
                                        )}

                                        {/* Tooltip (Fixed position or near mouse) */}
                                        {isHovered && (
                                            <g pointerEvents="none">
                                                <rect
                                                    x={x < chartWidth / 2 ? x + 10 : x - 130}
                                                    y={y - 50 < 0 ? y + 10 : y - 50}
                                                    width="120" height="60"
                                                    rx="6" fill="#1f2937" opacity="0.9"
                                                />
                                                <text
                                                    x={x < chartWidth / 2 ? x + 70 : x - 70}
                                                    y={y - 50 < 0 ? y + 30 : y - 30}
                                                    textAnchor="middle"
                                                    fill="white" fontSize="12" fontWeight="bold"
                                                >
                                                    {d.views} Views
                                                </text>
                                                <text
                                                    x={x < chartWidth / 2 ? x + 70 : x - 70}
                                                    y={y - 50 < 0 ? y + 50 : y - 10}
                                                    textAnchor="middle"
                                                    fill="#d1d5db" fontSize="10"
                                                >
                                                    {new Date(d.date).toDateString()}
                                                </text>
                                            </g>
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

// Donut Chart
const DonutChart = ({ data, title, icon: Icon }: {
    data: { label: string; value: number; color: string }[];
    title: string;
    icon: any;
}) => {
    const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
    let cumulativePercent = 0;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon className="text-purple-600" /> {title}
            </h3>
            <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        {data.map((item, i) => {
                            const percent = (item.value / total) * 100;
                            const dashArray = `${percent} ${100 - percent}`;
                            const dashOffset = -cumulativePercent;
                            cumulativePercent += percent;
                            return (
                                <circle
                                    key={i}
                                    cx="18" cy="18" r="15.9"
                                    fill="none"
                                    stroke={item.color}
                                    strokeWidth="3.5"
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={dashOffset}
                                    strokeLinecap="round"
                                />
                            );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-gray-800">{total}</span>
                        <span className="text-[10px] text-gray-400">Total</span>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    {data.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-gray-600">{item.label}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold text-gray-800">{item.value}</span>
                                <span className="text-xs text-gray-400 ml-1">({((item.value / total) * 100).toFixed(0)}%)</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Horizontal Bar Chart
const HorizontalBarChart = ({ data, title, icon: Icon, color = 'blue' }: {
    data: { label: string; value: number }[];
    title: string;
    icon: any;
    color?: string;
}) => {
    const maxVal = Math.max(...data.map(d => d.value), 1);
    const colors: Record<string, string> = {
        blue: 'from-blue-500 to-blue-600',
        purple: 'from-purple-500 to-purple-600',
        green: 'from-green-500 to-green-600',
        orange: 'from-orange-500 to-orange-600',
        teal: 'from-teal-500 to-teal-600',
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon className={`text-${color}-600`} /> {title}
            </h3>
            <div className="space-y-3">
                {data.slice(0, 8).map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 truncate max-w-[200px]">{item.label}</span>
                            <span className="font-bold text-gray-800">{item.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(item.value / maxVal) * 100}%` }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
                            />
                        </div>
                    </div>
                ))}
                {data.length === 0 && <p className="text-gray-400 text-center py-4">No data available</p>}
            </div>
        </div>
    );
};

// Real-time Active Users Card
const RealtimeCard = ({ count, pages }: { count: number; pages: { page: string; users: number }[] }) => (
    <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                Live Right Now
            </h3>
            <FaUsers size={22} />
        </div>
        <div className="text-4xl font-bold mb-1">{count}</div>
        <p className="text-green-100 text-sm mb-4">Active users (last 5 min)</p>
        {pages.length > 0 && (
            <div className="border-t border-white/20 pt-3 space-y-1.5">
                <p className="text-[10px] text-green-200 uppercase tracking-wider">Most Active Pages</p>
                {pages.slice(0, 3).map((p, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="truncate max-w-[160px] opacity-90">{p.page}</span>
                        <span className="font-bold">{p.users}</span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// Browser Icon
const BrowserIcon = ({ browser }: { browser: string }) => {
    const name = browser?.toLowerCase() || '';
    if (name.includes('chrome')) return <FaChrome className="text-yellow-500" />;
    if (name.includes('firefox')) return <FaFirefox className="text-orange-500" />;
    if (name.includes('safari')) return <FaSafari className="text-blue-500" />;
    if (name.includes('edge')) return <FaEdge className="text-blue-600" />;
    return <FaGlobe className="text-gray-500" />;
};

// Comparison Card (Dynamic based on range)
const WeeklyComparison = ({ data, range }: { data: { thisWeek: number; lastWeek: number; change: number }, range: string }) => {
    const isPositive = data.change >= 0;

    let title = 'Period Comparison';
    let currentLabel = 'Current Period';
    let prevLabel = 'Previous Period';

    if (range === '24h') {
        title = 'Day over Day';
        currentLabel = 'Today';
        prevLabel = 'Yesterday';
    } else if (range === '7d') {
        title = 'Week over Week';
        currentLabel = 'This Week';
        prevLabel = 'Last Week';
    } else if (range === '30d') {
        title = 'Month over Month';
        currentLabel = 'This Month';
        prevLabel = 'Last Month';
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-600" /> {title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{currentLabel}</p>
                    <p className="text-2xl font-bold text-gray-800">{data.thisWeek.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{prevLabel}</p>
                    <p className="text-2xl font-bold text-gray-600">{data.lastWeek.toLocaleString()}</p>
                </div>
            </div>
            <div className={`mt-4 flex items-center justify-center gap-2 p-3 rounded-lg ${isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                {isPositive ? <FaArrowUp className="text-green-600" /> : <FaArrowDown className="text-red-600" />}
                <span className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{data.change}%
                </span>
                <span className="text-sm text-gray-500">change</span>
            </div>
        </div>
    );
};

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [extendedStats, setExtendedStats] = useState<any>(null);
    const [realtimeData, setRealtimeData] = useState<any>({ activeUsersCount: 0, activePages: [] });
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('7d');
    const [activeTab, setActiveTab] = useState<'overview' | 'traffic' | 'users' | 'content'>('overview');

    useEffect(() => {
        fetchAllStats();
        const interval = setInterval(fetchAllStats, 30000);
        const realtimeInterval = setInterval(fetchRealtime, 10000);
        return () => { clearInterval(interval); clearInterval(realtimeInterval); };
    }, [timeRange]);

    const fetchAllStats = async () => {
        try {
            const [statsRes, analyzeRes, extendedRes] = await Promise.all([
                api.get(`/analytics/stats?range=${timeRange}`),
                api.get(`/analytics/analyze`),
                api.get(`/analytics/extended?range=${timeRange}`)
            ]);
            if (statsRes.data.success) {
                setStats({ ...statsRes.data.data, lowPerformingPages: analyzeRes.data.success ? analyzeRes.data.data : [] });
            }
            if (extendedRes.data.success) setExtendedStats(extendedRes.data.data);
            fetchRealtime();
        } catch (error: any) {
            console.error('Failed to fetch analytics:', error);
            if (loading) toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const fetchRealtime = async () => {
        try {
            const res = await api.get('/analytics/realtime');
            if (res.data.success) setRealtimeData(res.data.data);
        } catch (error) { console.error('Realtime fetch error:', error); }
    };

    if (loading && !stats) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading analytics...</p>
            </div>
        </div>
    );

    // Calculate insights
    const totalSearches = stats?.topSearches?.reduce((acc: number, curr: any) => acc + curr.count, 0) || 0;
    const cookieAccepted = stats?.cookieConsentStats?.accepted || 0;
    const cookieRejected = stats?.cookieConsentStats?.rejected || 0;
    const cookieTotal = cookieAccepted + cookieRejected;
    const consentRate = cookieTotal > 0 ? Math.round((cookieAccepted / cookieTotal) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
                    <p className="text-gray-500 text-sm">Comprehensive insights for better decisions</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchAllStats} className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors" title="Refresh">
                        <FaSync className={`text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                        {['24h', '7d', '30d', 'all'].map((range) => (
                            <button key={range} onClick={() => setTimeRange(range)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${timeRange === range ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
                                {range.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
                {[
                    { id: 'overview', label: 'Overview', icon: FaLayerGroup },
                    { id: 'traffic', label: 'Traffic Analysis', icon: FaChartLine },
                    { id: 'users', label: 'User Behavior', icon: FaUsers },
                    { id: 'content', label: 'Content & SEO', icon: FaFileAlt }
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <tab.icon size={14} /> {tab.label}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                            <StatCard title="Total Page Views" value={(stats?.summary?.totalViews || 0).toLocaleString()} icon={FaEye} color="bg-blue-500"
                                trend={extendedStats?.weeklyComparison?.change ? Number(extendedStats.weeklyComparison.change) : undefined} />
                            <StatCard title="Unique Visitors" value={(stats?.summary?.uniqueVisitors || 0).toLocaleString()} icon={FaGlobe} color="bg-purple-500" />
                            <StatCard title="New Visitors" value={(extendedStats?.visitorTypes?.new || 0).toLocaleString()} icon={FaUserPlus} color="bg-green-500"
                                subValue={extendedStats?.visitorTypes?.returning || 0} subLabel="Returning" />
                            <StatCard title="Bounce Rate" value={`${extendedStats?.bounceRate || 0}%`} icon={FaPercentage} color="bg-red-500" />
                            <StatCard title="Avg Session" value={`${extendedStats?.avgSessionMinutes || 0} min`} icon={FaClock} color="bg-teal-500" />
                            <StatCard title="Total Searches" value={totalSearches.toLocaleString()} icon={FaSearch} color="bg-orange-500" />
                        </div>

                        {/* Main Charts */}
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                {extendedStats?.dailyTraffic?.length > 0 && <DailyChart data={extendedStats.dailyTraffic} />}
                            </div>
                            <RealtimeCard count={realtimeData.activeUsersCount} pages={realtimeData.activePages} />
                        </div>

                        {/* Secondary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <DonutChart title="Visitor Types" icon={FaUsers} data={[
                                { label: 'New Visitors', value: extendedStats?.visitorTypes?.new || 0, color: '#3b82f6' },
                                { label: 'Returning', value: extendedStats?.visitorTypes?.returning || 0, color: '#10b981' },
                            ]} />
                            <DonutChart title="Cookie Consent" icon={FaCookieBite} data={[
                                { label: 'Accepted', value: cookieAccepted, color: '#10b981' },
                                { label: 'Rejected', value: cookieRejected, color: '#ef4444' },
                                { label: 'Pending', value: stats?.cookieConsentStats?.pending || 0, color: '#f59e0b' },
                            ]} />
                            {extendedStats?.weeklyComparison && <WeeklyComparison data={extendedStats.weeklyComparison} range={timeRange} />}
                        </div>
                    </motion.div>
                )}

                {/* TRAFFIC TAB */}
                {activeTab === 'traffic' && (
                    <motion.div key="traffic" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                        {extendedStats?.hourlyTraffic && <HourlyChart data={extendedStats.hourlyTraffic} />}

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <HorizontalBarChart title="Peak Traffic Hours" icon={FaClock} color="purple"
                                data={(extendedStats?.peakHours || []).map((p: any) => ({ label: `${String(p.hour).padStart(2, '0')}:00 - ${String(p.hour + 1).padStart(2, '0')}:00`, value: p.count }))} />
                            <HorizontalBarChart title="Top Referral Sources" icon={FaExternalLinkAlt} color="green"
                                data={(extendedStats?.topReferrers || []).map((r: any) => ({ label: r.source || 'Direct Traffic', value: r.count }))} />
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Device Stats */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FaDesktop className="text-gray-600" /> Device Distribution
                                </h3>
                                <div className="space-y-4">
                                    {stats?.deviceStats?.map((d: any, i: number) => {
                                        const total = stats.deviceStats.reduce((sum: number, x: any) => sum + x.count, 0) || 1;
                                        const pct = ((d.count / total) * 100).toFixed(1);
                                        return (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={`p-3 rounded-lg ${d._id === 'mobile' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                                    {d._id === 'mobile' ? <FaMobileAlt size={20} /> : <FaDesktop size={20} />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-medium text-gray-700 capitalize">{d._id}</span>
                                                        <span className="font-bold text-gray-800">{d.count} <span className="text-gray-400 text-sm">({pct}%)</span></span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className={`h-full rounded-full ${d._id === 'mobile' ? 'bg-purple-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {!stats?.deviceStats?.length && <p className="text-gray-400 text-center py-4">No device data</p>}
                                </div>
                            </div>

                            {/* Browser Stats */}
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <FaChrome className="text-yellow-500" /> Browser Usage
                                </h3>
                                <div className="space-y-4">
                                    {extendedStats?.browserStats?.map((b: any, i: number) => {
                                        const total = extendedStats.browserStats.reduce((sum: number, x: any) => sum + x.count, 0) || 1;
                                        const pct = ((b.count / total) * 100).toFixed(1);
                                        return (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="p-2 bg-gray-100 rounded-lg"><BrowserIcon browser={b.browser} /></div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-medium text-gray-700">{b.browser || 'Unknown'}</span>
                                                        <span className="font-bold text-gray-800">{b.count} <span className="text-gray-400 text-sm">({pct}%)</span></span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                                        <div className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: `${pct}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {!extendedStats?.browserStats?.length && <p className="text-gray-400 text-center py-4">No browser data</p>}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && (
                    <motion.div key="users" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                        {/* User Insights Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard title="New Visitors" value={(extendedStats?.visitorTypes?.new || 0).toLocaleString()} icon={FaUserPlus} color="bg-blue-500" />
                            <StatCard title="Returning Visitors" value={(extendedStats?.visitorTypes?.returning || 0).toLocaleString()} icon={FaRedo} color="bg-green-500" />
                            <StatCard title="Avg Pages/Session" value={
                                ((stats?.summary?.totalViews || 0) / Math.max(stats?.summary?.uniqueVisitors || 1, 1)).toFixed(1)
                            } icon={FaFileAlt} color="bg-purple-500" />
                            <StatCard title="Consent Rate" value={`${consentRate}%`} icon={FaCookieBite} color="bg-teal-500" />
                        </div>

                        {/* Recent Events Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <FaClock className="text-blue-600" /> Recent User Activity
                                </h3>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Live Feed</span>
                            </div>
                            <div className="hidden md:block overflow-x-auto max-h-[450px]">
                                <table className="w-full text-sm min-w-[600px]">
                                    <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {stats?.recentEvents?.map((event: any, i: number) => {
                                            const badges: Record<string, { bg: string; text: string; label: string }> = {
                                                'cookie_accept': { bg: 'bg-green-100', text: 'text-green-700', label: '✓ Cookie Accept' },
                                                'cookie_reject': { bg: 'bg-red-100', text: 'text-red-700', label: '✗ Cookie Reject' },
                                                'page_view': { bg: 'bg-blue-100', text: 'text-blue-700', label: '👁 Page View' },
                                                'click': { bg: 'bg-purple-100', text: 'text-purple-700', label: '👆 Click' },
                                                'search': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '🔍 Search' },
                                            };
                                            const badge = badges[event.eventType] || { bg: 'bg-gray-100', text: 'text-gray-700', label: event.eventType };
                                            return (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="px-6 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>{badge.label}</span>
                                                    </td>
                                                    <td className="px-6 py-3 text-gray-600 truncate max-w-[250px]">{event.path || '/'}</td>
                                                    <td className="px-6 py-3 text-right text-gray-400 text-xs">{new Date(event.timestamp).toLocaleTimeString()}</td>
                                                </tr>
                                            );
                                        })}
                                        {!stats?.recentEvents?.length && (
                                            <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400">No recent events</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile Card View */}
                            <div className="md:hidden max-h-[450px] overflow-y-auto divide-y divide-gray-100 p-4">
                                {stats?.recentEvents?.map((event: any, i: number) => {
                                    const badges: Record<string, { bg: string; text: string; label: string }> = {
                                        'cookie_accept': { bg: 'bg-green-100', text: 'text-green-700', label: '✓ Cookie Accept' },
                                        'cookie_reject': { bg: 'bg-red-100', text: 'text-red-700', label: '✗ Cookie Reject' },
                                        'page_view': { bg: 'bg-blue-100', text: 'text-blue-700', label: '👁 Page View' },
                                        'click': { bg: 'bg-purple-100', text: 'text-purple-700', label: '👆 Click' },
                                        'search': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: '🔍 Search' },
                                    };
                                    const badge = badges[event.eventType] || { bg: 'bg-gray-100', text: 'text-gray-700', label: event.eventType };
                                    return (
                                        <div key={i} className="py-3 flex items-start justify-between">
                                            <div className="space-y-1">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>{badge.label}</span>
                                                <p className="text-sm text-gray-700 break-all">{event.path || '/'}</p>
                                            </div>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                    );
                                })}
                                {!stats?.recentEvents?.length && <p className="text-center text-gray-400 py-4">No recent events</p>}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* CONTENT TAB */}
                {activeTab === 'content' && (
                    <motion.div key="content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Search Queries */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <FaSearch className="text-orange-500" /> Top Search Queries
                                    </h3>
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">User Intent</span>
                                </div>
                                <div className="hidden md:block overflow-x-auto max-h-[350px]">
                                    <table className="w-full text-sm min-w-[600px]">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Query</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Searches</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {stats?.topSearches?.map((item: any, i: number) => (
                                                <tr key={i} className="hover:bg-gray-50">
                                                    <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                                                    <td className="px-6 py-3 font-medium text-gray-800">{item._id}</td>
                                                    <td className="px-6 py-3 text-right font-bold text-gray-700">{item.count}</td>
                                                </tr>
                                            ))}
                                            {!stats?.topSearches?.length && (
                                                <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-400">No search data</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Mobile List View */}
                                <div className="md:hidden max-h-[350px] overflow-y-auto divide-y divide-gray-100 p-4">
                                    {stats?.topSearches?.map((item: any, i: number) => (
                                        <div key={i} className="py-3 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-400 w-4">{i + 1}</span>
                                                <span className="font-medium text-gray-800">{item._id}</span>
                                            </div>
                                            <span className="font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded text-xs">{item.count}</span>
                                        </div>
                                    ))}
                                    {!stats?.topSearches?.length && <p className="text-center text-gray-400 py-4">No search data</p>}
                                </div>
                            </div>

                            {/* Top Pages */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                        <FaChartBar className="text-green-600" /> Top Performing Pages
                                    </h3>
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">SEO</span>
                                </div>
                                <div className="hidden md:block overflow-x-auto max-h-[350px]">
                                    <table className="w-full text-sm min-w-[600px]">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Views</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {stats?.topPages?.map((page: any, i: number) => {
                                                const routeValid = isValidRoute(page.path);
                                                return (
                                                    <tr key={i} className={`hover:bg-gray-50 ${!routeValid ? 'bg-red-50/40' : ''}`}>
                                                        <td className="px-6 py-3 truncate max-w-[200px]">
                                                            <a href={page.path} target="_blank" rel="noopener noreferrer"
                                                                className={`hover:underline flex items-center gap-1 ${routeValid ? 'text-blue-600' : 'text-gray-400'}`}>
                                                                {page.path} <FaExternalLinkAlt size={10} />
                                                            </a>
                                                        </td>
                                                        <td className="px-6 py-3 text-center">
                                                            {routeValid
                                                                ? <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">✓ OK</span>
                                                                : <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1 justify-center"><FaExclamationTriangle size={10} /> 404</span>
                                                            }
                                                        </td>
                                                        <td className="px-6 py-3 text-right font-bold text-gray-700">{page.totalViews}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* Mobile Card View */}
                                <div className="md:hidden max-h-[350px] overflow-y-auto divide-y divide-gray-100 p-4">
                                    {stats?.topPages?.map((page: any, i: number) => {
                                        const routeValid = isValidRoute(page.path);
                                        return (
                                            <div key={i} className={`py-3 space-y-2 ${!routeValid ? 'opacity-75' : ''}`}>
                                                <div className="flex justify-between items-start">
                                                    <a href={page.path} target="_blank" rel="noopener noreferrer"
                                                        className={`text-sm font-medium hover:underline break-all ${routeValid ? 'text-blue-600' : 'text-gray-400'}`}>
                                                        {page.path}
                                                    </a>
                                                    <span className="font-bold text-gray-800 ml-2">{page.totalViews}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    {routeValid
                                                        ? <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">✓ OK</span>
                                                        : <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1"><FaExclamationTriangle size={10} /> 404</span>
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Low Performing / SEO Opportunities */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <FaExclamationTriangle className="text-amber-500" /> SEO Opportunities (Low Traffic Pages)
                                </h3>
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Needs Attention</span>
                            </div>
                            <div className="hidden md:block overflow-x-auto max-h-[300px]">
                                <table className="w-full text-sm min-w-[600px]">
                                    <thead className="bg-gray-50 sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Views</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {stats?.lowPerformingPages?.map((page: any, i: number) => {
                                            const routeValid = isValidRoute(page.path);
                                            return (
                                                <tr key={i} className={`hover:bg-gray-50 ${!routeValid ? 'bg-red-50/40' : ''}`}>
                                                    <td className="px-6 py-3 truncate max-w-[300px]">
                                                        <a href={page.path} target="_blank" rel="noopener noreferrer" className={`hover:underline ${routeValid ? 'text-blue-600' : 'text-gray-400'}`}>
                                                            {page.path}
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-3 text-center">
                                                        {routeValid
                                                            ? <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">✓ OK</span>
                                                            : <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">404</span>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-3 text-right text-gray-700">{page.totalViews}</td>
                                                    <td className="px-6 py-3 text-right text-gray-400 text-xs">{page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : '—'}</td>
                                                </tr>
                                            );
                                        })}
                                        {!stats?.lowPerformingPages?.length && (
                                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400">No data available</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile Card View */}
                            <div className="md:hidden max-h-[300px] overflow-y-auto divide-y divide-gray-100 p-4">
                                {stats?.lowPerformingPages?.map((page: any, i: number) => {
                                    const routeValid = isValidRoute(page.path);
                                    return (
                                        <div key={i} className="py-3 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <a href={page.path} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium hover:underline break-all ${routeValid ? 'text-blue-600' : 'text-gray-400'}`}>
                                                    {page.path}
                                                </a>
                                                <span className="font-bold text-gray-700 ml-2">{page.totalViews}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span className="text-gray-400">{page.updatedAt ? new Date(page.updatedAt).toLocaleDateString() : 'Never Updated'}</span>
                                                {routeValid
                                                    ? <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">✓ OK</span>
                                                    : <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">404</span>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                                {!stats?.lowPerformingPages?.length && <p className="text-center text-gray-400 py-4">No data available</p>}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
