'use client'
import React from 'react'

interface Tab { key: string; label: string; icon: React.ReactNode; href: string }

interface MobileNavProps {
  tabs: Tab[]
  active: string
  onNavigate: (href: string) => void
}

export function MobileNav({ tabs, active, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border-light md:hidden">
      <div className="flex items-center justify-around h-14 px-1 safe-area-pb">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => onNavigate(tab.href)}
            className={`flex flex-col items-center justify-center flex-1 py-1 gap-0.5 transition-colors ${active === tab.key ? 'text-accent' : 'text-text-tertiary'}`}
          >
            <span className="w-5 h-5">{tab.icon}</span>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
