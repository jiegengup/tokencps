'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { MobileNav } from '@tokencps/shared'

const chartIcon = <svg viewBox="0 0 20 20" fill="none" className="w-full h-full"><path d="M3 17V7l4-4 4 5 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const targetIcon = <svg viewBox="0 0 20 20" fill="none" className="w-full h-full"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
const teamIcon = <svg viewBox="0 0 20 20" fill="none" className="w-full h-full"><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 17c0-3 2.5-5 6-5s6 2 6 5M14 12c2.5 0 5 1.5 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
const walletIcon = <svg viewBox="0 0 20 20" fill="none" className="w-full h-full"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M14 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
const userIcon = <svg viewBox="0 0 20 20" fill="none" className="w-full h-full"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 18c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>

const tabs = [
  { key: 'dashboard', label: '数据中心', icon: chartIcon, href: '/dashboard' },
  { key: 'promotions', label: '推广中心', icon: targetIcon, href: '/promotions' },
  { key: 'team', label: '团队客户', icon: teamIcon, href: '/team' },
  { key: 'finance', label: '财务中心', icon: walletIcon, href: '/finance' },
  { key: 'profile', label: '我的', icon: userIcon, href: '/profile' },
]

function getActiveTab(pathname: string) {
  if (pathname.startsWith('/profile')) return 'profile'
  if (pathname.startsWith('/finance')) return 'finance'
  if (pathname.startsWith('/team')) return 'team'
  if (pathname.startsWith('/promotions')) return 'promotions'
  return 'dashboard'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const active = getActiveTab(pathname)

  return (
    <div className="min-h-screen bg-cream pb-16 md:pb-0">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 bg-card border-r border-border-light flex-col z-30">
        <div className="p-5 border-b border-border-light">
          <span className="text-lg font-bold text-text">TokenCPS</span>
          <span className="text-xs text-text-tertiary ml-1">推广后台</span>
        </div>
        <nav className="flex-1 py-3">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => router.push(tab.href)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${active === tab.key ? 'text-accent bg-accent-light font-medium' : 'text-text-secondary hover:bg-cream-dark'}`}>
              <span className="w-5 h-5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main content */}
      <main className="md:ml-56">
        <div className="max-w-4xl mx-auto px-4 py-5">
          {children}
        </div>
      </main>
      {/* Mobile bottom nav */}
      <MobileNav tabs={tabs} active={active} onNavigate={(href) => router.push(href)} />
    </div>
  )
}
