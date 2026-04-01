'use client';
import Link from 'next/link';
import ConsumerHeader from '@/components/layout/ConsumerHeader';
import ConsumerFooter from '@/components/layout/ConsumerFooter';

export default function HomePage() {
  const products = [
    { id: 'claude-50', name: 'Claude API 入门版', desc: '¥50 → $50 额度', price: 50, bonus: '0%', tag: '' },
    { id: 'claude-200', name: 'Claude API 标准版', desc: '¥200 → $220 额度', price: 200, bonus: '+10%', tag: '热门' },
    { id: 'claude-500', name: 'Claude API 进阶版', desc: '¥500 → $575 额度', price: 500, bonus: '+15%', tag: '' },
    { id: 'claude-2000', name: 'Claude API 企业版', desc: '¥2000 → $2400 额度', price: 2000, bonus: '+20%', tag: '最划算' },
    { id: 'gpt-plus', name: 'GPT Plus 月卡', desc: '独立账号 · 30天有效', price: 99, bonus: '', tag: '' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Claude API，<br />人民币直充
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            无需境外信用卡，¥1 = $1 使用额度。支持微信、支付宝付款，即买即用。
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/products" className="btn-primary py-3 px-6">查看套餐</Link>
            <Link href="/guide" className="btn-secondary py-3 px-6">使用教程</Link>
          </div>
        </div>
      </section>

      {/* 公告 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="card-flat p-4 flex items-center space-x-3">
          <span className="badge badge-accent">公告</span>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            新用户注册即送 $5 Claude 体验额度，立即注册体验 →
          </p>
        </div>
      </section>

      {/* 商品列表 — 参考链动小店框架 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>商品列表</h2>
        <div className="space-y-3">
          {products.map(p => (
            <Link
              key={p.id}
              href={`/purchase/${p.id}`}
              className="card flex items-center justify-between p-5 group cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: 'var(--accent-light)' }}>
                  {p.id.startsWith('gpt') ? '🤖' : '⚡'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
                    {p.tag && <span className="badge badge-accent">{p.tag}</span>}
                    {p.bonus && <span className="text-xs" style={{ color: 'var(--success)' }}>赠送{p.bonus}</span>}
                  </div>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{p.desc}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>¥{p.price}</span>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>购买 →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 为什么选择我们 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>为什么选择 TokenCPS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '💰', title: '人民币直充', desc: '微信/支付宝付款，无需境外信用卡，无汇率损失' },
            { icon: '⚡', title: '即买即用', desc: '付款后自动发放 API Key，配置教程一键跟着做' },
            { icon: '🛡️', title: '稳定可靠', desc: '多货源保障，API 稳定性 99.9%，7×24 技术支持' },
          ].map(f => (
            <div key={f.title} className="card p-6">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 社交证明 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 text-center">
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>已服务 <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>2,680+</span> 用户</p>
      </section>

      <ConsumerFooter />
    </div>
  );
}
