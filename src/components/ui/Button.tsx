"use client"

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Button = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | 'gradient'
        size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
    }
>(({
    className,
    variant = 'default',
    size = 'default',
    disabled,
    children,
    ...props
}, ref) => {
    const variants = {
        default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
        secondary: 'bg-white text-blue-700 border-2 border-blue-600 hover:bg-blue-50',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
        ghost: 'hover:bg-gray-100 text-gray-700',
        link: 'text-blue-600 underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-glow',
    }

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-xl',
        icon: 'h-10 w-10',
    }

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                'disabled:opacity-50 disabled:pointer-events-none',
                'transform hover:-translate-y-0.5 active:translate-y-0',
                variants[variant],
                sizes[size],
                className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export { Button }
