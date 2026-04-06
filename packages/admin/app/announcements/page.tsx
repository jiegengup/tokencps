'use client'

import React, { useState } from 'react'

type Audience = '全部' | '推广员' | 'C端用户'
type Status = '已发布' | '草稿' | '已下线'
type Tab = '全部' | '已发布' | '草稿' | '已下线'

interface Announcement {
  id: string
  title: string
  audience: Audience
  status: Status
  publishedAt: string
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'A10001', title: '平台佣金规则升级通知', audience: '推广员', status: '已发布', publishedAt: '2026-03-28 10:00' },
  { id: 'A10002', title: '五一促销活动即将开启', audience: '全部', status: '已发布', publishedAt: '2026-03-25 14:30' },
  { id: 'A10003', title: '新用户注册赠送优惠券', audience: 'C端用户', status: '草稿', publishedAt: '-' },
  { id: 'A10004', title: '系统维护公告（3月20日）', audience: '全部', status: '已下线', publishedAt: '2026-03-18 09:00' },
  { id: 'A10005', title: '推广员等级制度说明', audience: '推广员', status: '已发布', publishedAt: '2026-03-10 16:00' },
]

const TABS: Tab[] = ['全部', '已发布', '草稿', '已下线']

const audienceStyle: Record<Audience, string> = {
  '全部': 'bg-info-light text-info',
  '推广员': 'bg-accent-light text-accent',
  'C端用户': 'bg-success-light text-success',
}

const statusStyle: Record<Status, string> = {
  '已发布': 'bg-success-light text-success',
  '草稿': 'bg-warning-light text-warning',
  '已下线': 'bg-danger-light text-danger',
}

export default function AnnouncementsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('全部')

  const filtered = MOCK_ANNOUNCEMENTS.filter((a) => {
    if (activeTab === '全部') return true
    return a.status === activeTab
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text">公告管理</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-[--radius-sm] hover:opacity-90 transition-opacity">
          发布公告
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs rounded-[--radius-sm] font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-hover'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">标题</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">目标受众</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">状态</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">发布时间</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-tertiary">暂无公告</td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id} className="border-b border-border-light last:border-b-0 hover:bg-hover transition-colors">
                    <td className="px-4 py-3 text-text font-medium">{a.title}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${audienceStyle[a.audience]}`}>
                        {a.audience}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${statusStyle[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{a.publishedAt}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="px-2 py-1 text-xs text-accent hover:bg-accent-light rounded-[--radius-sm] transition-colors">编辑</button>
                        {a.status === '已发布' && (
                          <button className="px-2 py-1 text-xs text-danger hover:bg-danger-light rounded-[--radius-sm] transition-colors">下线</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer summary */}
      <div className="text-xs text-text-tertiary">
        共 {filtered.length} 条记录
      </div>
    </div>
  )
}
