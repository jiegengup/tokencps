'use client'

import { useState } from 'react'
import PromoterHeader from '@/components/layout/PromoterHeader'

type EntryType = '预估' | '确认' | '追回' | '提现'

const mockEntries: { id: number; time: string; desc: string; amount: string; type: EntryType }[] = [
  { id: 1, time: '2026-04-01 14:23', desc: '用户购买 ¥200 Claude API 套餐 → 预估佣金', amount: '+¥100', type: '预估' },
  { id: 2, time: '2026-04-01 10:05', desc: '用户使用 $50 → 实际佣金确认', amount: '+¥25', type: '确认' },
  { id: 3, time: '2026-03-31 18:42', desc: '用户购买 GPT Plus 年套餐 ¥1400 → 预估佣金', amount: '+¥700', type: '预估' },
  { id: 4, time: '2026-03-30 09:15', desc: '用户退款 $170 Claude API → 佣金追回', amount: '-¥75', type: '追回' },
  { id: 5, time: '2026-03-28 16:00', desc: '提现到支付宝 (尾号 8888)', amount: '-¥500', type: '提现' },
  { id: 6, time: '2026-03-25 11:33', desc: '用户购买 ¥350 Claude API 套餐 → 预估佣金', amount: '+¥175', type: '预估' },
  { id: 7, time: '2026-03-22 08:50', desc: '用户使用 $120 → 实际佣金确认', amount: '+¥60', type: '确认' },
  { id: 8, time: '2026-03-20 15:10', desc: '用户购买 GPT Plus 月套餐 ¥200 → 预估佣金', amount: '+¥100', type: '预估' },
  { id: 9, time: '2026-03-18 12:00', desc: '提现到微信零钱', amount: '-¥1000', type: '提现' },
  { id: 10, time: '2026-03-15 09:45', desc: '用户使用 $200 → 实际佣金确认', amount: '+¥100', type: '确认' },
]

const badgeMap: Record<EntryType, string> = {
  预估: 'badge badge-warning',
  确认: 'badge badge-success',
  追回: 'badge badge-danger',
  提现: 'badge badge-accent',
}

const filterOptions = ['全部', '预估', '确认', '追回', '提现'] as const

export default function CommissionPage() {
  const [filter, setFilter] = useState<typeof filterOptions[number]>('全部')

  const filtered = filter === '全部' ? mockEntries : mockEntries.filter(e => e.type === filter)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <PromoterHeader />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>佣金明细</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="stat-value">¥3,250</div>
            <div className="stat-label">预估佣金总额</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥2,580</div>
            <div className="stat-label">实际佣金总额</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥1,500</div>
            <div className="stat-label">已提现</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥1,580.50</div>
            <div className="stat-label">待提现</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="card p-6">
          <div className="flex gap-2 mb-6">
            {filterOptions.map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  border: '1px solid var(--border)',
                  backgroundColor: filter === opt ? 'var(--accent)' : 'transparent',
                  color: filter === opt ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: filter === opt ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Entries List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(entry => (
              <div
                key={entry.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--bg-primary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className={badgeMap[entry.type]}>{entry.type}</span>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{entry.desc}</div>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem', marginTop: 2 }}>{entry.time}</div>
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: entry.amount.startsWith('+') ? 'var(--accent)' : '#e53e3e',
                    minWidth: 80,
                    textAlign: 'right',
                  }}
                >
                  {entry.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
