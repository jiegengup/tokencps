'use client'

import { useState } from 'react'
import { Card, Button } from '@shared/index'
import { mockTeam, mockCustomers, mockDashboard } from '@/lib/promoter/mock-data'

const tabs = ['我的团队', '我的客户'] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function getCustomerStatus(c: typeof mockCustomers[number]) {
  const daysSince = (Date.now() - new Date(c.registeredAt).getTime()) / 86400000
  if (daysSince <= 7) return { label: '新客户', cls: 'bg-blue-50 text-blue-600' }
  if (c.totalOrders >= 3) return { label: '活跃', cls: 'bg-green-50 text-success' }
  return { label: '沉默', cls: 'bg-gray-100 text-text-tertiary' }
}

export default function TeamPage() {
  const [active, setActive] = useState<typeof tabs[number]>('我的团队')
  const [copied, setCopied] = useState(false)

  const inviteCode = 'TCPRO001'
  const inviteLink = `https://tokencps.com/invite/${inviteCode}`

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Page title */}
      <h1 className="text-xl font-bold text-text">团队与客户</h1>

      {/* Tab bar */}
      <div className="flex gap-1 bg-cream-dark rounded-[12px] p-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-colors ${
              active === tab
                ? 'bg-card text-text shadow-sm'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {active === '我的团队' ? <TeamTab onCopy={handleCopy} copied={copied} inviteCode={inviteCode} inviteLink={inviteLink} /> : <CustomerTab />}
    </div>
  )
}

/* ── Team Tab ── */
function TeamTab({ onCopy, copied, inviteCode, inviteLink }: {
  onCopy: (t: string) => void; copied: boolean; inviteCode: string; inviteLink: string
}) {
  const stats = [
    { label: '团队总人数', value: mockDashboard.teamSize },
    { label: '本月新增', value: 3 },
    { label: '团队总贡献佣金', value: '¥1,580' },
    { label: '团队抽成比例', value: '10%' },
  ]

  return (
    <div className="space-y-4">
      {/* Overview */}
      <Card>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-xs text-text-tertiary mb-1">{s.label}</p>
              <p className="text-lg font-bold text-text">{s.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Member list */}
      <Card>
        <h3 className="text-sm font-semibold text-text mb-3">团队成员</h3>
        <div className="divide-y divide-border-light">
          {mockTeam.map(m => (
            <div key={m.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-bold">
                  {m.nickname.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{m.nickname}</p>
                  <p className="text-xs text-text-tertiary">加入于 {formatDate(m.joinedAt)}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-text">¥{m.totalEarnings.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Invite section */}
      <Card>
        <h3 className="text-sm font-semibold text-text mb-3">邀请新成员</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-text-tertiary mb-1">邀请码</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-cream-dark text-text text-sm px-3 py-2 rounded-[8px] font-mono">{inviteCode}</code>
              <Button size="sm" variant="outline" onClick={() => onCopy(inviteCode)}>
                {copied ? '已复制' : '复制'}
              </Button>
            </div>
          </div>
          <div>
            <p className="text-xs text-text-tertiary mb-1">邀请链接</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-cream-dark text-text text-xs px-3 py-2 rounded-[8px] font-mono truncate">{inviteLink}</code>
              <Button size="sm" variant="outline" onClick={() => onCopy(inviteLink)}>
                {copied ? '已复制' : '复制'}
              </Button>
            </div>
          </div>
          <Button variant="secondary" fullWidth onClick={() => alert('海报生成中...')}>
            生成邀请海报
          </Button>
        </div>
      </Card>
    </div>
  )
}

/* ── Customer Tab ── */
function CustomerTab() {
  const totalCustomers = mockCustomers.length
  const newThisMonth = mockCustomers.filter(c => {
    const d = new Date(c.registeredAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
  const activeCount = mockCustomers.filter(c => c.totalOrders >= 3).length

  const overviewStats = [
    { label: '总客户数', value: totalCustomers },
    { label: '本月新增', value: newThisMonth },
    { label: '活跃客户数', value: activeCount },
  ]

  return (
    <div className="space-y-4">
      {/* Overview */}
      <Card>
        <div className="grid grid-cols-3 gap-4">
          {overviewStats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-xs text-text-tertiary mb-1">{s.label}</p>
              <p className="text-lg font-bold text-text">{s.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Customer list */}
      <Card>
        <h3 className="text-sm font-semibold text-text mb-3">客户列表</h3>
        <div className="divide-y divide-border-light">
          {mockCustomers.map(c => {
            const status = getCustomerStatus(c)
            return (
              <div key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream-dark text-text-secondary flex items-center justify-center text-xs font-bold">
                    {c.nickname.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-text">{c.nickname}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${status.cls}`}>{status.label}</span>
                    </div>
                    <p className="text-xs text-text-tertiary">注册于 {formatDate(c.registeredAt)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-text">¥{c.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-text-tertiary">{c.totalOrders} 笔订单</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
