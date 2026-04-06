'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/app/buy/components/Header'
import { OnboardingModal } from '@/app/buy/components/OnboardingModal'
import { useAuthStore, useDashboardStore } from '@/lib/consumer/store'
import { toast } from '@shared/components/Toast'

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : ""
}

export default function DashboardPage() {
  const user = useAuthStore(s => s.user)
  const { data, keys, setData, setKeys } = useDashboardStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getCookie('token')
    const headers = { 'Authorization': `Bearer ${token}` }
    Promise.all([
      fetch('/api/dashboard/consumer', { headers }).then(r => r.json()),
      fetch('/api/keys', { headers }).then(r => r.json()),
    ]).then(([dRes, kRes]) => {
      if (dRes.success) setData(dRes.data)
      if (kRes.success) setKeys(kRes.data)
      setLoading(false)
    })
  }, [setData, setKeys])

  if (loading) return <div className="min-h-screen bg-bg"><Header /><div className="flex justify-center pt-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div></div>

  const isNew = !data || data.totalRecharge === 0

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <OnboardingModal />
      <main className="max-w-5xl mx-auto px-6 py-8">
        {isNew ? <NewUserDashboard /> : <ReturningDashboard data={data!} keys={keys} />}
      </main>
    </div>
  )
}

function NewUserDashboard() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card rounded-xl border border-border-light p-8 text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-accent-light text-accent flex items-center justify-center text-3xl mx-auto mb-4">
          &#x1f44b;
        </div>
        <h2 className="text-xl font-semibold text-text mb-2">欢迎来到 TokenCPS</h2>
        <p className="text-text-secondary text-sm mb-1">你已获得 <span className="text-accent font-medium">$5</span> 免费体验额度</p>
        <p className="text-text-tertiary text-xs mb-6">3 步开始使用全球顶级 AI 模型</p>
        <div className="space-y-4 text-left max-w-sm mx-auto">
          {[
            { n: '1', t: '充值', d: '选择套餐，微信支付宝直付', href: '/buy/recharge' },
            { n: '2', t: '获取 API Key', d: '一键生成，复制即用', href: '/buy/keys' },
            { n: '3', t: '配置到应用', d: '查看接入文档和代码示例', href: '/buy/docs' },
          ].map(s => (
            <Link key={s.n} href={s.href} className="flex items-center gap-4 p-4 rounded-lg border border-border-light hover:border-accent/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{s.n}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text">{s.t}</div>
                <div className="text-xs text-text-tertiary">{s.d}</div>
              </div>
              <svg className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link href="/buy/recharge" className="inline-block px-8 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-hover transition-colors">
          立即充值
        </Link>
      </div>
    </div>
  )
}

function ReturningDashboard({ data, keys }: { data: import('@shared/index').ConsumerDashboard; keys: import('@shared/index').APIKeyInfo[] }) {
  const copyKey = (key: string) => { navigator.clipboard.writeText(key); toast('已复制到剪贴板', 'success') }

  return (
    <>
      {/* Balance Warning */}
      {data.remaining < 10 && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl px-5 py-3 mb-6 flex items-center justify-between">
          <span className="text-sm text-danger">余额不足 $10，建议及时充值以免影响使用</span>
          <Link href="/buy/recharge" className="text-sm text-danger font-medium hover:underline">去充值</Link>
        </div>
      )}

      {/* Balance Card */}
      <div className="bg-card rounded-xl border border-border-light p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-text-secondary mb-1">可用额度</div>
            <div className="text-4xl font-bold text-text">${data.remaining.toFixed(2)}</div>
          </div>
          <Link href="/buy/recharge" className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
            快捷充值
          </Link>
        </div>
        <div className="flex gap-6 text-sm">
          <div><span className="text-text-tertiary">已使用</span> <span className="text-text font-medium">${data.totalUsed.toFixed(2)}</span></div>
          <div><span className="text-text-tertiary">累计充值</span> <span className="text-text font-medium">${data.totalRecharge}</span></div>
          <div><span className="text-text-tertiary">订单数</span> <span className="text-text font-medium">{data.totalOrders}</span></div>
        </div>
      </div>

      {/* Quick Actions + Keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Quick Actions */}
        <div className="bg-card rounded-xl border border-border-light p-5">
          <h3 className="text-sm font-medium text-text mb-3">快捷操作</h3>
          <div className="space-y-2">
            <Link href="/buy/keys" className="flex items-center justify-between p-3 rounded-lg hover:bg-hover transition-colors">
              <span className="text-sm text-text">管理 API Key</span>
              <span className="text-xs text-text-tertiary">{data.activeKeys} 个活跃</span>
            </Link>
            <Link href="/buy/usage" className="flex items-center justify-between p-3 rounded-lg hover:bg-hover transition-colors">
              <span className="text-sm text-text">查看用量详情</span>
              <svg className="w-4 h-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/buy/orders" className="flex items-center justify-between p-3 rounded-lg hover:bg-hover transition-colors">
              <span className="text-sm text-text">订单记录</span>
              <svg className="w-4 h-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-card rounded-xl border border-border-light p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text">API Key</h3>
            <Link href="/buy/keys" className="text-xs text-accent hover:text-accent-hover">管理</Link>
          </div>
          <div className="space-y-2">
            {keys.slice(0, 3).map(k => (
              <div key={k.id} className="flex items-center justify-between p-3 rounded-lg bg-bg">
                <div className="min-w-0">
                  <div className="text-sm text-text truncate">{k.name || 'Unnamed'}</div>
                  <div className="text-xs text-text-tertiary font-mono">{k.key.slice(0, 12)}...{k.key.slice(-4)}</div>
                </div>
                <button onClick={() => copyKey(k.key)} className="text-xs text-accent hover:text-accent-hover flex-shrink-0 ml-2">复制</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tip Card */}
      <div className="bg-accent-light/50 rounded-xl p-5">
        <div className="text-sm font-medium text-accent mb-1">你知道吗？</div>
        <p className="text-sm text-text-secondary">Claude 还可以用来写代码、翻译文档、数据分析、文案创作。升级到 ¥200 档位可享受 10% 赠送额度。</p>
      </div>
    </>
  )
}
