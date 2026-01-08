import { cn } from '@/lib/utils'

interface ProgressProps {
    value?: number
    max?: number
    className?: string
    showLabel?: boolean
}

function Progress({ value = 0, max = 100, className, showLabel = false }: ProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    return (
        <div className={cn('w-full', className)}>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showLabel && (
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{value}</span>
                    <span>{max}</span>
                </div>
            )}
        </div>
    )
}

interface CircularProgressProps {
    value?: number
    max?: number
    size?: number
    strokeWidth?: number
    className?: string
}

function CircularProgress({ value = 0, max = 100, size = 120, strokeWidth = 10, className }: CircularProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (percentage / 100) * circumference

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth={strokeWidth}
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className="transition-all duration-500 ease-out"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{Math.round(percentage)}%</span>
            </div>
        </div>
    )
}

export { Progress, CircularProgress }
