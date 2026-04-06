'use client'

import React, { useState } from 'react'

type Activity = {
  id: number
  name: string
  supplier: string
  commission: string
  online: boolean
  participants: number
  orders: number
  status: '进行中' | '已结束' | '草稿'
  createdAt: string
}

const MOCK_ACTIVITIES: Activity[] = [
  { id: 1, name: 'Claude API推广', supplier: 'Anthropic', commission: '15%', online: true, participants: 1280, orders: 3456, status: '进行中', createdAt: '2026-03-01' },
  { id: 2, name: 'GPT Plus推广', supplier: 'OpenAI', commission: '12%', online: true, participants: 960, orders: 2180, status: '进行中', createdAt: '2026-02-15' },
  { id: 3, name: 'Gemini Pro推广', supplier: 'Google', commission: '10%', online: false, participants: 540, orders: 1120, status: '已结束', createdAt: '2026-01-20' },
  { id: 4, name: 'DeepSeek推广', supplier: 'DeepSeek', commission: '18%', online: true, participants: 720, orders: 1890, status: '进行中', createdAt: '2026-03-10' },
  { id: 5, name: '豆包推广', supplier: '字节跳动', commission: '14%', online: false, participants: 310, orders: 680, status: '草稿', createdAt: '2026-03-20' },
  { id: 6, name: '通义千问推广', supplier: '阿里云', commission: '13%', online: false, participants: 450, orders: 920, status: '已结束', createdAt: '2025-12-05' },
]

const TABS = ['全部', '进行中', '已结束', '草稿'] as const

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<string>('全部')
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES)

  const filtered = activeTab === '全部' ? activities : activities.filter(a => a.status === activeTab)

  const toggleOnline = (id: number) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, online: !a.online } : a))
  }

  const statusBadge = (status: Activity['status']) => {
    const map = {
      '进行中': 'bg-success-light text-success',
      '已结束': 'bg-bg-secondary text-text-tertiary',
      '草稿': 'bg-warning-light text-warning',
    }
    return map[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">活动管理</h1>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[--radius-sm] transition-colors">
          + 创建活动
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-bg-secondary p-1 rounded-[--radius-sm] w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-[--radius-sm] transition-colors ${
              activeTab === tab
                ? 'bg-card text-text font-medium shadow-sm'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab}
            {tab !== '全部' && (
              <span className="ml-1.5 text-xs text-text-tertiary">
                {activities.filter(a => a.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="grid gap-4">
        {filtered.map(activity => (
          <div key={activity.id} className="bg-card border border-border-light rounded-[--radius-md] p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-base font-semibold text-text">{activity.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="text-text-tertiary">货源</span>
                    <p className="text-text font-medium">{activity.supplier}</p>
                  </div>
                  <div>
                    <span className="text-text-tertiary">佣金比例</span>
                    <p className="text-accent font-semibold">{activity.commission}</p>
                  </div>
                  <div>
                    <span className="text-text-tertiary">参与人数</span>
                    <p className="text-text font-medium">{activity.participants.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-text-tertiary">总订单</span>
                    <p className="text-text font-medium">{activity.orders.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-xs text-text-tertiary mt-3">创建时间: {activity.createdAt}</p>
              </div>

              {/* Toggle */}
              <div className="flex flex-col items-end gap-2 ml-6 shrink-0">
                <span className="text-xs text-text-tertiary">{activity.online ? '已上线' : '已下线'}</span>
                <button
                  onClick={() => toggleOnline(activity.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    activity.online ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    activity.online ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-tertiary text-sm">
          暂无活动数据
        </div>
      )}
    </div>
  )
}
