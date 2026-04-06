'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/app/buy/components/Header'
import { getCookie } from '@/lib/utils/cookie'

interface UsageData {
  balance: number; totalUsed: number; remaining: number;
  totalRecharge: number; totalOrders: number; activeKeys: number;
}

export default function UsagePage() {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/usage', { headers: { 'Authorization': `Bearer ${getCookie('token')}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setUsage(data.data); setLoading(false) })
  }, [])

  if (loading) return <div className="min-h-screen bg-bg"><Header /><div className="flex justify-center pt-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div></div>

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold text-text mb-6">用量统计</h1>

        {/* Summary Cards */}
        {usage && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: '余额', value: '$' + usage.balance.toFixed(2) },
              { label: '已使用', value: '$' + usage.totalUsed.toFixed(2) },
              { label: '剩余额度', value: '$' + usage.remaining.toFixed(2) },
              { label: '活跃 Key', value: String(usage.activeKeys) },
            ].map(c => (
              <div key={c.label} className="bg-card rounded-xl border border-border-light p-4">
                <div className="text-xs text-text-tertiary mb-1">{c.label}</div>
                <div className="text-xl font-bold text-text">{c.value}</div>
              </div>
            ))}
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
