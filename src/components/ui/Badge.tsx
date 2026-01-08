import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
    size?: 'sm' | 'default' | 'lg'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
        default: 'bg-blue-100 text-blue-800',
        secondary: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-cyan-100 text-cyan-800',
        outline: 'border border-gray-300 text-gray-700 bg-transparent',
    }

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
    }

    return (
        <span
            ref={ref}
            className={cn(
                'inline-flex items-center font-medium rounded-full',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
})

Badge.displayName = 'Badge'

export { Badge }
