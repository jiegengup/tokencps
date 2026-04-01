'use client'
import { useState } from 'react'

const promoterSteps = [
  { step: 1, title: '注册推广员账号', desc: '在平台注册并申请推广员资格，审核通过后即可开始推广。' },
  { step: 2, title: '生成专属推广链接', desc: '在推广员后台获取您的专属邀请码或推广链接。' },
  { step: 3, title: '分享给潜在用户', desc: '将链接分享给朋友、粉丝或社群，引导他们注册购买。' },
  { step: 4, title: '佣金自动入账', desc: '用户成功购买套餐后，佣金自动结算到您的账户，随时可申请提现。' },
]

const userSteps = [
  { step: 1, title: '选择并购买套餐', desc: '在套餐页面选择合适的 Token 套餐，完成支付。' },
  { step: 2, title: '获取 API Key', desc: '支付完成后，在「我的账户」页面获取您的专属 API Key。' },
  { step: 3, title: '配置并开始使用', desc: '将 API Key 填入您的 AI 客户端，即可开始调用 Claude 模型。' },
]

const faqs = [
  { q: '推广佣金比例是多少？', a: '普通推广员佣金为成交金额的 50%。若您有上级推广员，您获得 40%，上级永久抽成 10%。' },
  { q: '提现最低金额是多少？', a: '最低提现金额为 ¥1，审核通过后 T+7 工作日到账。' },
  { q: 'API Key 有使用限制吗？', a: '每个 Key 的使用量由您购买的套餐 Token 数决定，用完后可继续充值购买。' },
  { q: '支持哪些 Claude 模型？', a: '目前支持 Claude 3.5 Sonnet、Claude 3 Opus、Claude 3 Haiku 等主流模型，具体以套餐说明为准。' },
  { q: 'Token 会过期吗？', a: '购买的 Token 有效期为 1 年，请在有效期内使用。' },
  { q: '如何查看我的推广收益？', a: '登录推广员后台，在「佣金明细」页面可查看所有历史收益和提现记录。' },
]

const openclawCode = `import anthropic

client = anthropic.Anthropic(
    api_key="YOUR_API_KEY",
    base_url="https://api.tokencps.com",
)

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ],
)
print(message.content)`

const officialCode = `import anthropic

client = anthropic.Anthropic(
    api_key="YOUR_OFFICIAL_API_KEY",
)

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, Claude!"}
    ],
)
print(message.content)`

export default function GuidePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>使用指南</h1>
          <p style={{ color: 'var(--text-secondary)' }}>快速上手 TokenCPS，开始您的 AI 之旅</p>
        </div>

        {/* 推广员新手指南 */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>推广员新手指南</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promoterSteps.map(s => (
              <div key={s.step} className="card p-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3" style={{ backgroundColor: 'var(--accent)', color: '#fff' }}>{s.step}</div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* C端使用教程 */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>C 端用户教程</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {userSteps.map(s => (
              <div key={s.step} className="card p-6 flex-1">
                <div className="text-2xl font-bold mb-2" style={{ color: 'var(--accent)' }}>0{s.step}</div>
                <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* API 配置教程 */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>API 配置教程</h2>
          <div className="space-y-4">
            <div className="card p-6">
              <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>方式一：通过 TokenCPS 中转（推荐）</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>使用平台 API Key + 中转地址，享受更低价格：</p>
              <pre className="text-xs p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}><code>{openclawCode}</code></pre>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>方式二：Claude 官方 API</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>直接使用官方 API Key（需自行购买）：</p>
              <pre className="text-xs p-4 rounded-lg overflow-x-auto" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}><code>{officialCode}</code></pre>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>常见问题</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="card">
                <button
                  className="w-full text-left p-5 flex items-center justify-between"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--accent)', fontSize: '1.2rem' }}>{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm" style={{ color: 'var(--text-secondary)' }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="card p-8 text-center">
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>准备好开始了吗？</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>立即注册成为推广员，分享 AI 的力量，轻松赚取佣金。</p>
          <div className="flex gap-3 justify-center">
            <a href="/register" className="btn-primary">立即注册</a>
            <a href="/packages" className="btn-secondary">查看套餐</a>
          </div>
        </section>
      </div>
    </div>
  )
}
