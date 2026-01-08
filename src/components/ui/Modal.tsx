"use client"

import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ModalProps extends Omit<HTMLMotionProps<'div'>, "title"> {
    isOpen: boolean
    onClose?: () => void
    title?: string
    description?: string
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'full'
    children: React.ReactNode
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({
    isOpen,
    onClose,
    title,
    description,
    children,
    className,
    size = 'default',
    ...props
}, ref) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const sizes = {
        sm: 'max-w-md',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    }

    if (!mounted) return null

    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            'relative w-full bg-white rounded-2xl shadow-2xl overflow-hidden',
                            sizes[size],
                            className
                        )}
                        ref={ref}
                        {...props}
                    >
                        {/* Header */}
                        {(title || onClose) && (
                            <div className="flex items-center justify-between p-6 border-b">
                                <div>
                                    {title && <h2 className="text-xl font-semibold">{title}</h2>}
                                    {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
                                </div>
                                {onClose && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    )
})

Modal.displayName = 'Modal'

interface ModalFooterProps {
    children: React.ReactNode
    className?: string
}

const ModalFooter = ({ children, className }: ModalFooterProps) => (
    <div className={cn('flex justify-end gap-3 pt-4 border-t -mx-6 -mb-6 mt-6 px-6 py-4 bg-gray-50', className)}>
        {children}
    </div>
)

export { Modal, ModalFooter }
