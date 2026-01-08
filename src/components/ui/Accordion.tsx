"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
    className?: string
}

function Accordion({ items, className }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    return (
        <div className={cn('space-y-2', className)}>
            {items.map((item, index) => (
                <AccordionItemComponent
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                    {item.content}
                </AccordionItemComponent>
            ))}
        </div>
    )
}

interface AccordionItemProps {
    title: string
    children: React.ReactNode
    isOpen?: boolean
    onClick?: () => void
    className?: string
}

function AccordionItemComponent({ title, children, isOpen, onClick, className }: AccordionItemProps) {
    return (
        <div className={cn('border border-gray-200 rounded-xl overflow-hidden', className)}>
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900">{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="px-4 pb-4 text-gray-600">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export { Accordion, AccordionItemComponent as AccordionItem }
