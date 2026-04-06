'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin', label: '数据看板', icon: 'chart' },
  { href: '/admin/users', label: '用户管理', icon: 'users' },
  { href: '/admin/activities', label: '活动管理', icon: 'activity' },
  { href: '/admin/withdrawals', label: '提现审核', icon: 'wallet' },
  { href: '/admin/announcements', label: '公告管理', icon: 'megaphone' },
  { href: '/admin/coupons', label: '优惠券管理', icon: 'ticket' },
  { href: '/admin/finance', label: '财务报表', icon: 'finance' },
  { href: '/admin/risk', label: '风控告警', icon: 'shield' },
  { href: '/admin/settings', label: '系统配置', icon: 'settings' },
]

function NavIcon({ type }: { type: string }) {
  const cls = "w-5 h-5"
  switch (type) {
    case 'chart': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17V7l4-4 4 5 6-6"/></svg>
    case 'users': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="3"/><circle cx="14" cy="7" r="2.5"/><path d="M1 17c0-3 2.5-5 6-5s6 2 6 5M14 12c2.5 0 5 1.5 5 4"/></svg>
    case 'activity': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 7h6M7 10h6M7 13h4"/></svg>
    case 'wallet': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M14 10h2" strokeLinecap="round"/></svg>
    case 'megaphone': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3v14l-8-3V6l8-3z"/><path d="M7 6H4a1 1 0 00-1 1v6a1 1 0 001 1h3"/></svg>
    case 'ticket': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M8 4v12M12 8v4"/></svg>
    case 'finance': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17V3M3 17h14M6 14V9M9 14V7M12 14V10M15 14V5"/></svg>
    case 'shield': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z"/><path d="M7 10l2 2 4-4"/></svg>
    case 'settings': return <svg className={cls} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="3"/><path d="M10 1v3M10 16v3M1 10h3M16 10h3M3.5 3.5l2 2M14.5 14.5l2 2M3.5 16.5l2-2M14.5 5.5l2-2"/></svg>
    default: return null
  }
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 bottom-0 bg-card border-r border-border-light flex flex-col z-30 transition-all ${collapsed ? 'w-16' : 'w-56'}`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-border-light">
          {!collapsed && <span className="text-lg font-bold text-text">TokenCPS</span>}
          {!collapsed && <span className="text-[10px] text-text-tertiary bg-accent-light text-accent px-1.5 py-0.5 rounded">Admin</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-text-tertiary hover:text-text p-1">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d={collapsed ? "M6 3l5 5-5 5" : "M10 3L5 8l5 5"}/></svg>
          </button>
        </div>
        <nav className="flex-1 py-2 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors mx-2 rounded-[--radius-sm] ${active ? 'text-accent bg-accent-light font-medium' : 'text-text-secondary hover:bg-hover'}`}>
                <NavIcon type={item.icon} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>
      {/* Main */}
      <main className={`flex-1 transition-all ${collapsed ? 'ml-16' : 'ml-56'}`}>
        <header className="h-14 border-b border-border-light bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
          <span className="text-sm text-text-secondary">运营管理后台</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-tertiary">admin@tokencps.com</span>
            <div className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-bold">A</div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
