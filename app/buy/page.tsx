'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/app/buy/components/Header'

type Mode = 'tech' | 'beginner'

const plans = [
  { price: 50, usd: 50, bonus: 0, label: '入门' },
  { price: 200, usd: 220, bonus: 10, label: '标准', hot: true },
  { price: 500, usd: 575, bonus: 15, label: '进阶' },
  { price: 2000, usd: 2400, bonus: 20, label: '企业', best: true },
]

export default function LandingPage() {
  const [mode, setMode] = useState<Mode>('tech')

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      {/* Mode Toggle */}
      <div className="flex justify-center pt-8">
        <div className="inline-flex bg-bg-secondary rounded-xl p-1">
          <button
            onClick={() => setMode('tech')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'tech' ? 'bg-card text-text shadow-sm' : 'text-text-secondary'
            }`}
          >
            技术圈版
          </button>
          <button
            onClick={() => setMode('beginner')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'beginner' ? 'bg-card text-text shadow-sm' : 'text-text-secondary'
            }`}
          >
            小白版
          </button>
        </div>
      </div>

      {mode === 'tech' ? <TechVersion /> : <BeginnerVersion />}
    </div>
  )
}

function TechVersion() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text mb-4 leading-tight">
          Claude API / GPT，人民币直付，即买即用
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          稳定低延迟，多节点冗余，99.9% SLA。支持微信支付宝，无需境外信用卡。
        </p>
      </section>

      {/* Price Comparison */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-center mb-8">价格对比</h2>
        <div className="bg-card rounded-xl border border-border-light overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-bg-secondary/50">
                <th className="text-left px-6 py-3 font-medium text-text-secondary">项目</th>
                <th className="text-center px-6 py-3 font-medium text-accent">TokenCPS</th>
                <th className="text-center px-6 py-3 font-medium text-text-secondary">官方直购</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              <tr><td className="px-6 py-3">Claude API 价格</td><td className="text-center px-6 py-3 text-accent font-medium">¥1 = $1</td><td className="text-center px-6 py-3">需美元信用卡</td></tr>
              <tr><td className="px-6 py-3">支付方式</td><td className="text-center px-6 py-3 text-accent font-medium">微信 / 支付宝</td><td className="text-center px-6 py-3">Visa / Mastercard</td></tr>
              <tr><td className="px-6 py-3">充值赠送</td><td className="text-center px-6 py-3 text-accent font-medium">最高 +20%</td><td className="text-center px-6 py-3">无</td></tr>
              <tr><td className="px-6 py-3">API 稳定性</td><td className="text-center px-6 py-3 text-accent font-medium">99.9% SLA</td><td className="text-center px-6 py-3">99.9% SLA</td></tr>
              <tr><td className="px-6 py-3">退款</td><td className="text-center px-6 py-3 text-accent font-medium">支持，按余额退</td><td className="text-center px-6 py-3">不支持</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Plans */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-center mb-8">选择套餐</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map(p => (
            <div key={p.price} className={`relative bg-card rounded-xl border p-6 text-center transition-shadow hover:shadow-md ${p.hot ? 'border-accent shadow-sm' : 'border-border-light'}`}>
              {p.hot && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs px-3 py-0.5 rounded-full">热门</span>}
              {p.best && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-white text-xs px-3 py-0.5 rounded-full">最划算</span>}
              <div className="text-text-secondary text-sm mb-1">{p.label}</div>
              <div className="text-3xl font-bold text-text mb-1">¥{p.price}</div>
              <div className="text-accent font-medium mb-1">到账 ${p.usd}</div>
              {p.bonus > 0 && <div className="text-xs text-success">+{p.bonus}% 赠送</div>}
              <Link href="/buy/auth/register" className="mt-4 block w-full py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
                立即购买
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-6 bg-card rounded-xl border border-border-light px-8 py-5">
          <div><div className="text-2xl font-bold text-text">12,580+</div><div className="text-sm text-text-secondary">已服务用户</div></div>
          <div className="w-px h-10 bg-border-light" />
          <div><div className="text-2xl font-bold text-text">99.9%</div><div className="text-sm text-text-secondary">API 可用率</div></div>
          <div className="w-px h-10 bg-border-light" />
          <div><div className="text-2xl font-bold text-text">$2.8M+</div><div className="text-sm text-text-secondary">累计调用额度</div></div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-16">
        <Link href="/buy/auth/register" className="inline-block px-8 py-3 bg-accent text-white rounded-xl text-base font-medium hover:bg-accent-hover transition-colors">
          注册并开始使用
        </Link>
        <p className="text-sm text-text-tertiary mt-3">注册即送 $5 免费体验额度</p>
      </section>
    </main>
  )
}

function BeginnerVersion() {
  const steps = [
    { num: '1', title: '注册账号', desc: '手机号或邮箱，30秒完成注册，立即获得 $5 免费体验额度。' },
    { num: '2', title: '选择套餐充值', desc: '微信或支付宝扫码支付，人民币直付，无需境外信用卡。' },
    { num: '3', title: '获取 Key，开始使用', desc: '一键生成 API Key，复制到你的应用中，即可调用 Claude / GPT。' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-text mb-4 leading-tight">
          3步用上全球最强 AI 模型
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto">
          无需翻墙，无需信用卡。注册即送 $5 体验额度，微信支付宝直接充值。
        </p>
      </section>

      <section className="mb-16 space-y-6">
        {steps.map(s => (
          <div key={s.num} className="flex items-start gap-5 bg-card rounded-xl border border-border-light p-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
              {s.num}
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">{s.title}</h3>
              <p className="text-text-secondary text-sm">{s.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="text-center mb-16">
        <div className="bg-card rounded-xl border border-border-light p-8">
          <h2 className="text-xl font-semibold mb-2">Claude 能做什么？</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
            {['写代码', '翻译文档', '数据分析', '文案创作', '学术研究', '客服对话', '内容总结', '头脑风暴'].map(t => (
              <div key={t} className="bg-bg-secondary rounded-lg py-3 text-text-secondary">{t}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center pb-16">
        <Link href="/buy/auth/register" className="inline-block px-8 py-3 bg-accent text-white rounded-xl text-base font-medium hover:bg-accent-hover transition-colors">
          免费体验 Claude
        </Link>
        <p className="text-sm text-text-tertiary mt-3">注册送 $5 额度，够用好几天</p>
      </section>
    </main>
  )
}
