import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                'relative overflow-hidden rounded-md bg-gray-200',
                'after:absolute after:inset-0 after:-translate-x-full',
                'after:animate-[shimmer_2s_infinite]',
                'after:bg-gradient-to-r after:from-transparent after:via-white/40 after:to-transparent',
                className
            )}
            {...props}
        />
    )
}

function SkeletonCard() {
    return (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="mt-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    )
}

interface SkeletonTextProps {
    lines?: number
}

function SkeletonText({ lines = 3 }: SkeletonTextProps) {
    return (
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')} />
            ))}
        </div>
    )
}

export { Skeleton, SkeletonCard, SkeletonText }
