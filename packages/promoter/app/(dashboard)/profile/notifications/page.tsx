'use client'

import React, { useState } from 'react'
import { Card } from '@tokencps/shared'
import { mockNotifications } from '@/lib/mock-data'

const typeIcons: Record<string, { icon: string; color: string }> = {
  system:     { icon: '🔔', color: 'bg-blue-100' },
  commission: { icon: '💰', color: 'bg-green-100' },
  order:      { icon: '🛒', color: 'bg-orange-100' },
  withdrawal: { icon: '👛', color: 'bg-purple-100' },
  team:       { icon: '👥', color: 'bg-pink-100' },
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}分钟前`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}小时前`
  return `${Math.floor(hours / 24)}天前`
}

export default function NotificationsPage() {
  const [items, setItems] = useState(mockNotifications.map(n => ({ ...n })))

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })))
  const unreadCount = items.filter(n => !n.read).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text">消息通知</h1>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-xs text-accent hover:underline">
            全部标记已读
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.map((n) => {
          const t = typeIcons[n.type] || typeIcons.system
          return (
            <Card
              key={n.id}
              className={`transition-colors ${!n.read ? 'border-l-2 border-l-accent' : ''}`}
            >
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-base shrink-0`}>
                  {t.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${!n.read ? 'text-text' : 'text-text-secondary'}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
                  </div>
                  <p className="text-xs text-text-tertiary mt-0.5 line-clamp-2">{n.content}</p>
                  <p className="text-xs text-text-tertiary mt-1 opacity-60">{timeAgo(n.createdAt)}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-text-tertiary text-sm">暂无消息</div>
      )}
    </div>
  )
}
