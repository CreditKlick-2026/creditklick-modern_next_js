import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
        {children}
    </div>
))
Tabs.displayName = 'Tabs'

const TabsList = forwardRef<HTMLDivElement, TabsProps>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg',
            className
        )}
        {...props}
    >
        {children}
    </div>
))
TabsList.displayName = 'TabsList'

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    active?: boolean
    children: React.ReactNode
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className, active, children, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            active
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900',
            className
        )}
        {...props}
    >
        {children}
    </button>
))
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = forwardRef<HTMLDivElement, TabsProps>(({ className, children, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('mt-4', className)}
        {...props}
    >
        {children}
    </div>
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
