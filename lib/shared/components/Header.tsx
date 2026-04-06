'use client'
import React from 'react'

interface HeaderProps {
  logo?: React.ReactNode
  navItems?: { label: string; href: string }[]
  rightContent?: React.ReactNode
  onNavigate?: (href: string) => void
}

export function Header({ logo, navItems = [], rightContent, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {logo || <span className="text-lg font-bold text-text">TokenCPS</span>}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button key={item.href} onClick={() => onNavigate?.(item.href)} className="text-sm text-text-secondary hover:text-text transition-colors">
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        {rightContent && <div className="flex items-center gap-3">{rightContent}</div>}
      </div>
    </header>
  )
}
