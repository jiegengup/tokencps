'use client'
import React from 'react'

interface FooterProps {
  links?: { label: string; href: string }[]
  onNavigate?: (href: string) => void
}

export function Footer({ links = [], onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border-light bg-cream-dark py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} TokenCPS. All rights reserved.
          </div>
          {links.length > 0 && (
            <div className="flex items-center gap-4">
              {links.map(link => (
                <button key={link.href} onClick={() => onNavigate?.(link.href)} className="text-sm text-text-tertiary hover:text-text transition-colors">
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
