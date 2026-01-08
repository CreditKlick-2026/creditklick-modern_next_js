import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpinnerProps {
    className?: string
    size?: 'sm' | 'default' | 'lg' | 'xl'
}

function Spinner({ className, size = 'default' }: SpinnerProps) {
    const sizes = {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
    }

    return (
        <Loader2 className={cn('animate-spin text-blue-600', sizes[size], className)} />
    )
}

interface LoadingScreenProps {
    message?: string
}

function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="text-center">
                <Spinner size="xl" className="mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600">{message}</p>
            </div>
        </div>
    )
}

function LoadingDots() {
    return (
        <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce animation-delay-100" />
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-bounce animation-delay-200" />
        </div>
    )
}

export { Spinner, LoadingScreen, LoadingDots }
