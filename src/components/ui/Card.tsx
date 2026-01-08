import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean
    children: React.ReactNode
}

function Card({ className, children, hover = true, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-xl border border-gray-100 bg-white p-6 shadow-lg',
                hover && 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props}>
            {children}
        </div>
    )
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn('text-xl font-semibold text-gray-900', className)} {...props}>
            {children}
        </h3>
    )
}

function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn('text-sm text-gray-500', className)} {...props}>
            {children}
        </p>
    )
}

function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('', className)} {...props}>
            {children}
        </div>
    )
}

function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex items-center pt-4', className)} {...props}>
            {children}
        </div>
    )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
