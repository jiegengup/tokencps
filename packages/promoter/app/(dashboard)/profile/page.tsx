'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card } from '@tokencps/shared'
import { useAuthStore } from '@/lib/store'
import { mockNotifications } from '@/lib/mock-data'

const unreadCount = mockNotifications.filter(n => !n.read).length

const menuItems = [
  { label: '素材中心', desc: '朋友圈文案 / 海报 / 话术', href: '/profile/materials' },
  { label: '收益计算器', desc: '预估你的推广收入', href: '/profile/calculator' },
  { label: '消息通知', desc: '系统消息与佣金提醒', href: '/profile/notifications', badge: unreadCount },
  { label: '帮助中心', desc: '常见问题与使用指南', href: '' },
  { label: '推广员合作协议', desc: '权利与义务说明', href: '' },
]

const Arrow = () => (
  <svg className="w-4 h-4 text-text-tertiary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const initials = (user?.nickname || '推广').slice(0, 1)

  const handleLogout = () => { logout(); router.push('/') }

  return (
    <div className="space-y-5">
      {/* User info */}
      <Card padding="lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-semibold text-text truncate">{user?.nickname || '推广达人'}</p>
            <p className="text-sm text-text-tertiary">{user?.account || 'demo_promoter'}</p>
            <p className="text-xs text-accent mt-1">邀请码: TCPRO001</p>
          </div>
        </div>
      </Card>

      {/* Menu list */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const inner = (
            <Card key={item.label} className="cursor-pointer hover:bg-cream-dark transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text">{item.label}</span>
                    {item.badge ? (
                      <span className="px-1.5 py-0.5 text-xs bg-danger text-white rounded-full leading-none">{item.badge}</span>
                    ) : null}
                  </div>
                  <p className="text-xs text-text-tertiary mt-0.5">{item.desc}</p>
                </div>
                <Arrow />
              </div>
            </Card>
          )
          return item.href ? <Link key={item.label} href={item.href}>{inner}</Link> : <div key={item.label}>{inner}</div>
        })}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 text-sm text-danger bg-card rounded-[12px] border border-border hover:bg-cream-dark transition-colors"
      >
        退出登录
      </button>
    </div>
  )
}
