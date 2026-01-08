import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

const variants = {
    default: {
        container: 'bg-blue-50 border-blue-200 text-blue-800',
        icon: Info,
        iconClass: 'text-blue-500'
    },
    success: {
        container: 'bg-green-50 border-green-200 text-green-800',
        icon: CheckCircle,
        iconClass: 'text-green-500'
    },
    warning: {
        container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        icon: AlertTriangle,
        iconClass: 'text-yellow-500'
    },
    error: {
        container: 'bg-red-50 border-red-200 text-red-800',
        icon: AlertCircle,
        iconClass: 'text-red-500'
    }
}

interface AlertProps {
    variant?: 'default' | 'success' | 'warning' | 'error'
    title?: string
    children: React.ReactNode
    onClose?: () => void
    className?: string
}

function Alert({
    variant = 'default',
    title,
    children,
    onClose,
    className
}: AlertProps) {
    const config = variants[variant]
    const Icon = config.icon

    return (
        <div className={cn(
            'relative flex gap-4 p-4 rounded-lg border',
            config.container,
            className
        )}>
            <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', config.iconClass)} />
            <div className="flex-1">
                {title && <h4 className="font-semibold mb-1">{title}</h4>}
                <div className="text-sm">{children}</div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 hover:opacity-70 transition-opacity"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}

export { Alert }
