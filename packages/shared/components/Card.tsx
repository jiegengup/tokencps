'use client'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  padding?: 'sm' | 'md' | 'lg'
}

const paddings = { sm: 'p-3', md: 'p-5', lg: 'p-6' }

export function Card({ children, className = '', onClick, padding = 'md' }: CardProps) {
  return (
    <div
      className={`bg-card rounded-[12px] border border-border-light ${paddings[padding]} ${onClick ? 'cursor-pointer hover:border-border transition-colors' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
