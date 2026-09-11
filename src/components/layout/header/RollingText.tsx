"use client"

import React from 'react'

interface RollingTextProps {
    text: string
    className?: string
    stagger?: number
}

export function RollingText({
    text,
    className = '',
    stagger = 0.02
}: RollingTextProps) {
    const chars = Array.from(text)

    return (
        <span
            className={`zet-rolling-wrapper select-none pointer-events-none ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                overflow: 'hidden',
                height: '1.3em',
                lineHeight: '1.3em',
                verticalAlign: 'middle'
            }}
            aria-label={text}
        >
            {chars.map((char, index) => (
                <span
                    key={index}
                    className="zet-rolling-track"
                    style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        height: '1.3em',
                        lineHeight: '1.3em',
                        transitionDelay: `${index * stagger}s`
                    }}
                    aria-hidden="true"
                >
                    <span
                        className="zet-rolling-char zet-char-default"
                        style={{
                            display: 'block',
                            height: '1.3em',
                            lineHeight: '1.3em',
                            whiteSpace: 'pre',
                            flexShrink: 0
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                    <span
                        className="zet-rolling-char zet-char-hover"
                        style={{
                            display: 'block',
                            height: '1.3em',
                            lineHeight: '1.3em',
                            whiteSpace: 'pre',
                            flexShrink: 0,
                            color: '#155dfc',
                            fontWeight: 600
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </span>
    )
}
