import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    className,
    label,
    error,
    ...props
}, ref) => (
    <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center">
            <input
                ref={ref}
                type="checkbox"
                className={cn(
                    'peer sr-only',
                    className
                )}
                {...props}
            />
            <div className={cn(
                'w-5 h-5 border-2 rounded transition-all duration-200',
                'peer-checked:bg-blue-600 peer-checked:border-blue-600',
                'peer-focus:ring-2 peer-focus:ring-blue-500/20',
                error ? 'border-red-500' : 'border-gray-300 group-hover:border-gray-400'
            )}>
                <Check className="h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
        </div>
        {label && (
            <span className="text-sm text-gray-700 select-none">{label}</span>
        )}
    </label>
))

Checkbox.displayName = 'Checkbox'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
    className,
    label,
    error,
    ...props
}, ref) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center">
            <input
                ref={ref}
                type="radio"
                className={cn(
                    'peer sr-only',
                    className
                )}
                {...props}
            />
            <div className={cn(
                'w-5 h-5 border-2 rounded-full transition-all duration-200',
                'peer-checked:border-blue-600',
                'peer-focus:ring-2 peer-focus:ring-blue-500/20',
                error ? 'border-red-500' : 'border-gray-300 group-hover:border-gray-400'
            )}>
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 scale-0 peer-checked:scale-100 transition-all" />
            </div>
        </div>
        {label && (
            <span className="text-sm text-gray-700 select-none">{label}</span>
        )}
    </label>
))

Radio.displayName = 'Radio'

export { Checkbox, Radio }
