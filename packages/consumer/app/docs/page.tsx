'use client'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { toast } from '@tokencps/shared/components/Toast'

type Tab = 'quickstart' | 'api' | 'faq'

const codeExamples = {
  python: `import anthropic

client = anthropic.Anthropic(
    api_key="YOUR_API_KEY",
    base_url="https://api.tokencps.com"
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)
print(message.content[0].text)`,
  nodejs: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://api.tokencps.com',
});

const message = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
});
console.log(message.content[0].text);`,
  curl: `curl https://api.tokencps.com/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`,
}

const faqs = [
  { q: '什么是 API Key？', a: 'API Key 是你调用 Claude API 的凭证，类似于密码。每次 API 请求都需要携带 Key 进行身份验证。' },
  { q: '如何配置 OpenClaw？', a: '在 OpenClaw 设置中，将 API Base URL 设为 https://api.tokencps.com，填入你的 API Key 即可。' },
  { q: '支持哪些模型？', a: '支持 Claude Opus、Sonnet、Haiku 全系列模型，以及 GPT-4o 等主流模型。' },
  { q: '充值后多久到账？', a: '支付成功后即时到账，可立即使用。' },
  { q: '可以退款吗？', a: '支持退款，按剩余未使用额度退还。退款将在 1-3 个工作日内处理。' },
  { q: '$5 体验额度够用多久？', a: '日常对话大约可以使用 3-5 天，具体取决于使用的模型和对话长度。' },
  { q: 'API 稳定性如何？', a: '我们提供 99.9% SLA 保障，多节点冗余，自动故障转移。' },
  { q: '如何联系客服？', a: '可通过页面底部的联系方式或发送邮件至 support@tokencps.com。' },
]

export default function DocsPage() {
  const [tab, setTab] = useState<Tab>('quickstart')
  const [codeLang, setCodeLang] = useState<'python' | 'nodejs' | 'curl'>('python')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast('代码已复制', 'success') }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold text-text mb-6">帮助文档</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-bg-secondary rounded-xl p-1 mb-8">
          {([['quickstart', '快速开始'], ['api', 'API 接入'], ['faq', '常见问题']] as [Tab, string][]).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === k ? 'bg-card text-text shadow-sm' : 'text-text-secondary'}`}>
              {l}
            </button>
          ))}
        </div>

        {tab === 'quickstart' && (
          <div className="space-y-6">
            {[
              { n: '1', t: '注册并获取 API Key', d: '在 TokenCPS 注册账号，前往 API Key 管理页面创建你的 Key。新用户自动获得 $5 体验额度。' },
              { n: '2', t: '选择套餐充值', d: '根据使用量选择合适的套餐。¥200 档位最受欢迎，赠送 10% 额度。支持微信和支付宝。' },
              { n: '3', t: '配置并开始使用', d: '将 API Key 和端点地址配置到你的应用中。支持所有兼容 OpenAI 格式的客户端。' },
            ].map(s => (
              <div key={s.n} className="flex gap-4 bg-card rounded-xl border border-border-light p-5">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{s.n}</div>
                <div>
                  <h3 className="text-sm font-medium text-text mb-1">{s.t}</h3>
                  <p className="text-sm text-text-secondary">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'api' && (
          <div>
            <div className="bg-card rounded-xl border border-border-light p-5 mb-6">
              <h3 className="text-sm font-medium text-text mb-2">API 端点</h3>
              <code className="text-sm text-accent font-mono">https://api.tokencps.com/v1</code>
            </div>

            <div className="bg-card rounded-xl border border-border-light overflow-hidden">
              <div className="flex border-b border-border-light">
                {(['python', 'nodejs', 'curl'] as const).map(l => (
                  <button key={l} onClick={() => setCodeLang(l)}
                    className={`px-4 py-2.5 text-sm font-medium transition-colors ${codeLang === l ? 'text-accent border-b-2 border-accent' : 'text-text-secondary hover:text-text'}`}>
                    {l === 'nodejs' ? 'Node.js' : l === 'python' ? 'Python' : 'cURL'}
                  </button>
                ))}
              </div>
              <div className="relative">
                <pre className="p-5 text-sm text-text overflow-x-auto font-mono leading-relaxed bg-bg/50"><code>{codeExamples[codeLang]}</code></pre>
                <button onClick={() => copy(codeExamples[codeLang])} className="absolute top-3 right-3 text-xs text-accent hover:text-accent-hover bg-card px-2 py-1 rounded border border-border-light">
                  复制
                </button>
              </div>
            </div>
          </div>
        )}

        {tab === 'faq' && (
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={i} className="bg-card rounded-xl border border-border-light overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-sm font-medium text-text">{f.q}</span>
                  <svg className={`w-4 h-4 text-text-tertiary transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openFaq === i && <div className="px-5 pb-4 text-sm text-text-secondary">{f.a}</div>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
