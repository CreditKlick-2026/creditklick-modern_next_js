import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
    value: string
    label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: SelectOption[]
    placeholder?: string
    error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    className,
    options = [],
    placeholder = 'Select option',
    error,
    ...props
}, ref) => (
    <div className="relative">
        <select
            ref={ref}
            className={cn(
                'w-full px-4 py-3 pr-10 rounded-lg border bg-white appearance-none cursor-pointer',
                'text-gray-900 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300',
                className
            )}
            {...props}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
))

Select.displayName = 'Select'

export { Select }
