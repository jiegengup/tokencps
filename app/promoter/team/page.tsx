'use client'
import { useState } from 'react'
import PromoterHeader from '@/components/layout/PromoterHeader'

const mockTeam = [
  { id: 1, nickname: '小明**', joinTime: '2026-01-10', orders: 23, commission: 45.60 },
  { id: 2, nickname: '推广**', joinTime: '2026-01-22', orders: 11, commission: 18.20 },
  { id: 3, nickname: '用户**', joinTime: '2026-02-05', orders: 7, commission: 9.80 },
  { id: 4, nickname: '达人**', joinTime: '2026-02-18', orders: 34, commission: 67.30 },
  { id: 5, nickname: '新人**', joinTime: '2026-03-01', orders: 2, commission: 3.50 },
]

export default function TeamPage() {
  const [copied, setCopied] = useState(false)
  const inviteCode = 'PROMO2026X'
  const inviteLink = `https://tokencps.com/register?ref=${inviteCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <PromoterHeader />
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>团队管理</h1>

        {/* 团队概览 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="stat-card">
            <div className="stat-value">5</div>
            <div className="stat-label">直属下级人数</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent)' }}>¥144.40</div>
            <div className="stat-label">团队贡献佣金</div>
          </div>
        </div>

        {/* 邀请码 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>我的邀请码</h2>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 input font-mono text-lg" style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}>
              {inviteCode}
            </div>
            <button className="btn-primary" onClick={handleCopy}>
              {copied ? '已复制' : '复制链接'}
            </button>
          </div>
          <div className="text-xs p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>
            {inviteLink}
          </div>
        </div>

        {/* 邀请奖励说明 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>邀请奖励</h2>
          <div className="text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
            <p>每成功邀请一名推广员注册并完成首笔成交，您将获得 <strong style={{ color: 'var(--accent)' }}>¥5 奖励</strong>（从被邀请人首笔佣金中扣除）。</p>
            <p>佣金分成规则：</p>
            <ul className="ml-4 space-y-1">
              <li>• 无上级推广员：您拿 <strong style={{ color: 'var(--text-primary)' }}>50%</strong></li>
              <li>• 有上级推广员：您拿 <strong style={{ color: 'var(--text-primary)' }}>40%</strong>，上级永久抽成 <strong style={{ color: 'var(--text-primary)' }}>10%</strong></li>
            </ul>
          </div>
        </div>

        {/* 下级列表 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>下级推广员</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>昵称</th>
                  <th className="text-left py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>注册时间</th>
                  <th className="text-right py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>推广订单</th>
                  <th className="text-right py-2" style={{ color: 'var(--text-tertiary)' }}>贡献佣金</th>
                </tr>
              </thead>
              <tbody>
                {mockTeam.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-primary)' }}>{m.nickname}</td>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-secondary)' }}>{m.joinTime}</td>
                    <td className="py-3 pr-4 text-right" style={{ color: 'var(--text-primary)' }}>{m.orders}</td>
                    <td className="py-3 text-right" style={{ color: 'var(--accent)' }}>¥{m.commission.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
