'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/app/buy/components/Header'
import { api, mockDailyUsage, mockModelUsage } from '@/lib/consumer/mock-api'
import type { UsageResponse } from '@shared/index'

type Range = 'today' | '7d' | '30d' | 'custom'

const rangeLabels: Record<Range, string> = {
  today: '今日',
  '7d': '近 7 天',
  '30d': '近 30 天',
  custom: '自定义',
}

function sliceData(range: Range) {
  switch (range) {
    case 'today': return mockDailyUsage.slice(-1)
    case '7d': return mockDailyUsage.slice(-7)
    case '30d':
    case 'custom':
    default: return mockDailyUsage
  }
}

function exportCSV(data: typeof mockDailyUsage) {
  const header = '日期,Token消耗,费用($)'
  const rows = data.map(d => `${d.date},${d.tokens},${d.cost.toFixed(4)}`)
  const csv = [header, ...rows].join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `usage-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function UsagePage() {
  const [usage, setUsage] = useState<UsageResponse | null>(null)
  const [range, setRange] = useState<Range>('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => { api.usage.get().then(u => { setUsage(u); setLoading(false) }) }, [])

  const data = sliceData(range)
  const maxTokens = Math.max(...data.map(d => d.tokens))
  const totalTokens = data.reduce((s, d) => s + d.tokens, 0)
  const totalCost = data.reduce((s, d) => s + d.cost, 0)

  if (loading) return <div className="min-h-screen bg-bg"><Header /><div className="flex justify-center pt-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div></div>

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-text">用量统计</h1>
          <div className="flex items-center gap-3">
            <div className="inline-flex bg-bg-secondary rounded-lg p-0.5">
              {(['today', '7d', '30d', 'custom'] as Range[]).map(r => (
                <button key={r} onClick={() => setRange(r)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${range === r ? 'bg-card text-text shadow-sm' : 'text-text-secondary'}`}>
                  {rangeLabels[r]}
                </button>
              ))}
            </div>
            <button onClick={() => exportCSV(data)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-accent text-white hover:opacity-90 transition-opacity">
              导出 CSV
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '总 Token', value: (totalTokens / 1000).toFixed(0) + 'K' },
            { label: '总消耗', value: '$' + totalCost.toFixed(2) },
            { label: '剩余额度', value: '$' + (usage?.remaining.toFixed(2) || '0') },
            { label: '活跃 Key', value: String(usage?.keys.length || 0) },
          ].map(c => (
            <div key={c.label} className="bg-card rounded-xl border border-border-light p-4">
              <div className="text-xs text-text-tertiary mb-1">{c.label}</div>
              <div className="text-xl font-bold text-text">{c.value}</div>
            </div>
          ))}
        </div>

        {/* Token Chart (SVG Bar) */}
        <div className="bg-card rounded-xl border border-border-light p-6 mb-6">
          <h3 className="text-sm font-medium text-text mb-4">Token 消耗趋势</h3>
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${data.length * 40 + 20} 160`} className="w-full min-w-[400px] h-40">
              {data.map((d, i) => {
                const h = (d.tokens / maxTokens) * 120
                const x = i * 40 + 10
                return (
                  <g key={i}>
                    <rect x={x} y={130 - h} width="24" height={h} rx="4" fill="var(--color-accent)" opacity="0.8" />
                    <text x={x + 12} y="148" textAnchor="middle" className="text-[8px] fill-text-tertiary">{d.date.slice(5)}</text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Model Usage */}
        <div className="bg-card rounded-xl border border-border-light p-6 mb-6">
          <h3 className="text-sm font-medium text-text mb-4">按模型分类</h3>
          <div className="space-y-3">
            {mockModelUsage.map(m => (
              <div key={m.model}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text">{m.model}</span>
                  <span className="text-text-secondary">{(m.tokens / 1000).toFixed(0)}K tokens / ${m.cost.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Per-Key Usage */}
        {usage && (
          <div className="bg-card rounded-xl border border-border-light p-6">
            <h3 className="text-sm font-medium text-text mb-4">按 Key 分组</h3>
            <div className="space-y-2">
              {usage.keys.map(k => (
                <div key={k.id} className="flex items-center justify-between p-3 rounded-lg bg-bg">
                  <div>
                    <div className="text-sm text-text">{k.name || '未命名'}</div>
                    <div className="text-xs text-text-tertiary">{k.lastUsedAt ? `最后使用 ${new Date(k.lastUsedAt).toLocaleDateString('zh-CN')}` : '未使用'}</div>
                  </div>
                  <div className="text-sm font-medium text-text">${k.usedAmount.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Balance Alert Setting */}
        <div className="mt-6 bg-accent-light/30 rounded-xl p-5">
          <h3 className="text-sm font-medium text-text mb-2">余额预警</h3>
          <p className="text-xs text-text-secondary mb-3">当余额低于设定值时，系统会发送通知提醒你充值。</p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-text-secondary">余额低于</span>
            <input type="number" defaultValue={10} className="w-20 px-2 py-1.5 rounded-lg border border-border bg-card text-sm text-center focus:outline-none focus:border-accent" />
            <span className="text-sm text-text-secondary">美元时通知</span>
          </div>
        </div>
      </main>
    </div>
  )
}