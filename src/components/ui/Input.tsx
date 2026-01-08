import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', error, ...props }, ref) => {
    return (
        <div className="w-full">
            <input
                type={type}
                className={cn(
                    'flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-base',
                    'placeholder:text-gray-400',
                    'focus:outline-none focus:ring-2 focus:ring-offset-0',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    'transition-all duration-200',
                    error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
                    className
                )}
                ref={ref}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
})

Input.displayName = 'Input'

export { Input }
