'use client'
import { useState } from 'react'
import { Header } from '@/app/buy/components/Header'
import { toast } from '@shared/components/Toast'
import { getCookie } from '@/lib/utils/cookie'

const plans = [
  { price: 50, usd: 50, bonus: 0, label: '入门', desc: '适合体验和轻度使用' },
  { price: 200, usd: 220, bonus: 10, label: '标准', desc: '日常开发推荐', hot: true },
  { price: 500, usd: 575, bonus: 15, label: '进阶', desc: '团队和重度用户' },
  { price: 2000, usd: 2400, bonus: 20, label: '企业', desc: '大规模 API 调用', best: true },
]

type Channel = 'wechat' | 'alipay'

export default function RechargePage() {
  const [selected, setSelected] = useState(200)
  const [channel, setChannel] = useState<Channel>('wechat')
  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(false)
  const [showGpt, setShowGpt] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/recharge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
        body: JSON.stringify({ amountCNY: selected, channel, coupon: coupon || undefined }),
      })
      const data = await res.json()
      if (data.success) {
        toast(`订单创建成功！到账 $${data.data.amountUSD}`, 'success')
      } else { toast(data.message || '支付失败', 'error') }
    } catch { toast('支付失败，请重试', 'error') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Banner */}
        <div className="bg-accent-light/50 rounded-xl px-6 py-4 mb-8 text-center">
          <p className="text-sm text-accent font-medium">人民币直付，无需境外信用卡 | 官方同等质量，价格更优</p>
        </div>

        {/* Claude API Plans */}
        <h2 className="text-lg font-semibold text-text mb-4">Claude API 套餐</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {plans.map(p => (
            <button key={p.price} onClick={() => setSelected(p.price)}
              className={`relative text-left bg-card rounded-xl border p-5 transition-all ${
                selected === p.price ? 'border-accent shadow-sm ring-1 ring-accent/20' : 'border-border-light hover:border-border'
              }`}>
              {p.hot && <span className="absolute -top-2.5 right-3 bg-accent text-white text-xs px-2 py-0.5 rounded-full">热门</span>}
              {p.best && <span className="absolute -top-2.5 right-3 bg-success text-white text-xs px-2 py-0.5 rounded-full">最划算</span>}
              <div className="text-xs text-text-tertiary mb-1">{p.label}</div>
              <div className="text-2xl font-bold text-text mb-0.5">¥{p.price}</div>
              <div className="text-sm text-accent font-medium">到账 ${p.usd}</div>
              {p.bonus > 0 && <div className="text-xs text-success mt-1">+{p.bonus}% 赠送</div>}
              <div className="text-xs text-text-tertiary mt-2">{p.desc}</div>
            </button>
          ))}
        </div>

        {/* GPT Plus */}
        <div className="mb-8">
          <button onClick={() => setShowGpt(!showGpt)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-text">
            <span>GPT Plus 月卡</span>
            <svg className={`w-4 h-4 transition-transform ${showGpt ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {showGpt && (
            <div className="mt-3 bg-card rounded-xl border border-border-light p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-lg font-bold text-text">¥99<span className="text-sm font-normal text-text-secondary">/月</span></div>
                  <div className="text-xs text-text-tertiary">GPT Plus 共享账号</div>
                </div>
                <button onClick={() => { toast('GPT Plus 订单已创建（Mock）', 'success') }} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
                  购买
                </button>
              </div>
              <div className="bg-warning/10 border border-warning/20 rounded-lg px-3 py-2 text-xs text-warning">
                注意：无质保、不退款、账号问题不负责。购买即表示知悉并同意。
              </div>
            </div>
          )}
        </div>

        {/* Payment Section */}
        <div className="bg-card rounded-xl border border-border-light p-6">
          <h3 className="text-sm font-medium text-text mb-4">支付方式</h3>
          <div className="flex gap-3 mb-4">
            {(['wechat', 'alipay'] as Channel[]).map(ch => (
              <button key={ch} onClick={() => setChannel(ch)}
                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all ${
                  channel === ch ? 'border-accent bg-accent-light/30 text-accent' : 'border-border-light text-text-secondary hover:border-border'
                }`}>
                {ch === 'wechat' ? '微信支付' : '支付宝'}
              </button>
            ))}
          </div>

          {/* Coupon */}
          <div className="mb-4">
            <label className="block text-sm text-text-secondary mb-1">优惠券</label>
            <input type="text" value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="输入优惠券码（可选）" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>

          {/* Summary */}
          <div className="bg-bg rounded-lg p-4 mb-4 text-sm">
            <div className="flex justify-between mb-1"><span className="text-text-secondary">充值金额</span><span className="text-text">¥{selected}</span></div>
            <div className="flex justify-between mb-1"><span className="text-text-secondary">到账额度</span><span className="text-accent font-medium">${plans.find(p => p.price === selected)?.usd}</span></div>
            {plans.find(p => p.price === selected)?.bonus! > 0 && (
              <div className="flex justify-between"><span className="text-text-secondary">赠送</span><span className="text-success">+{plans.find(p => p.price === selected)?.bonus}%</span></div>
            )}
          </div>

          <button onClick={handlePay} disabled={loading} className="w-full py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50">
            {loading ? '处理中...' : `支付 ¥${selected}`}
          </button>
          <p className="text-xs text-text-tertiary text-center mt-3">支持退款，按剩余额度退还</p>
        </div>
      </main>
    </div>
  )
}
