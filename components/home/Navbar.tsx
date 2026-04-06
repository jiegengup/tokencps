'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-text tracking-tight">
            TokenCPS
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-text transition-colors">首页</Link>
            <Link href="/promotions" className="hover:text-text transition-colors">推广活动</Link>
            <Link href="/commission" className="hover:text-text transition-colors">佣金说明</Link>
            <Link href="/help" className="hover:text-text transition-colors">帮助中心</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-text-secondary hover:text-text transition-colors px-3 py-1.5">
            登录
          </Link>
          <Link href="/auth/register" className="text-sm bg-accent text-white px-5 py-2 rounded-[--radius-md] hover:bg-accent-hover transition-colors">
            立即注册
          </Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-text-secondary" aria-label="菜单">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <><path d="M3 5h14" /><path d="M3 10h14" /><path d="M3 15h14" /></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-cream px-4 py-4 space-y-3 animate-fade-in">
          <Link href="/" onClick={() => setOpen(false)} className="block text-sm text-text font-medium">首页</Link>
          <Link href="/promotions" onClick={() => setOpen(false)} className="block text-sm text-text-secondary">推广活动</Link>
          <Link href="/commission" onClick={() => setOpen(false)} className="block text-sm text-text-secondary">佣金说明</Link>
          <Link href="/help" onClick={() => setOpen(false)} className="block text-sm text-text-secondary">帮助中心</Link>
          <div className="pt-3 border-t border-border flex gap-3">
            <Link href="/auth/login" className="text-sm text-text-secondary px-3 py-2">登录</Link>
            <Link href="/auth/register" className="text-sm bg-accent text-white px-5 py-2 rounded-[--radius-md]">立即注册</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
