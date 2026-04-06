'use client'

import Link from 'next/link'

const AI_MODELS = [
  'Claude', 'ChatGPT', 'Gemini', 'DeepSeek', '豆包', '通义千问',
  '文心一言', 'Kimi', 'Llama', 'Mistral', 'Grok', 'Copilot',
  'Midjourney', 'Stable Diffusion', 'Suno',
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-text tracking-tight">TokenCPS</Link>
            <div className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
              <Link href="/" className="hover:text-text transition-colors">首页</Link>
              <Link href="/promotions" className="hover:text-text transition-colors">推广活动</Link>
              <Link href="/commission" className="hover:text-text transition-colors">佣金说明</Link>
              <Link href="/help" className="hover:text-text transition-colors">帮助中心</Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm text-text-secondary hover:text-text transition-colors px-3 py-1.5">登录</Link>
            <Link href="/auth/register" className="text-sm bg-accent text-white px-4 py-1.5 rounded-[--radius-sm] hover:bg-accent-hover transition-colors">注册</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs tracking-widest uppercase text-text-tertiary bg-cream-dark px-4 py-1.5 rounded-full mb-6">全球AI模型推广联盟平台</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-text leading-tight mb-6">TokenCPS · 一站式接入<br className="hidden sm:block" />全球AI顶级模型</h1>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">覆盖 Claude、Gemini、GPT、DeepSeek 等主流大模型，为推广员提供高佣金、实时结算、永久锁客的一站式推广平台</p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="text-xs text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium">高佣金50% · 实时到账</span>
            <span className="text-xs text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium">推广了X万笔 · 累计分佣X万元</span>
            <span className="text-xs text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium">邀请下级 · 永久锁客</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/auth/register" className="bg-accent text-white px-8 py-3 rounded-[--radius-md] text-sm font-medium hover:bg-accent-hover transition-colors">免费注册 · 立即开始推广</Link>
            <Link href="/promotions" className="border border-border text-text-secondary px-8 py-3 rounded-[--radius-md] text-sm font-medium hover:border-text-tertiary hover:text-text transition-colors">查看推广活动 · 了解佣金方案</Link>
          </div>
        </div>
      </section>

      {/* Sections rendered below */}
      <ModelLogoWall />
      <ResourceCoverage />
      <ProductCapabilities />
      <FourStepProcess />
      <TechHighlights />
      <Compliance />
      <BottomCTA />
      <Footer />
    </div>
  )
}

/* ── AI Model Logo Wall ── */
function ModelLogoWall() {
  return (
    <section className="py-12 border-t border-border-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center sm:overflow-visible">
          {AI_MODELS.map((name) => (
            <span
              key={name}
              className="shrink-0 text-sm font-medium text-text-tertiary grayscale hover:grayscale-0 hover:text-accent transition-all duration-200 cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Resource Coverage ── */
const RESOURCES = [
  { title: 'Claude API', desc: 'Anthropic 旗舰模型，长文本理解与代码生成领先', icon: 'C' },
  { title: 'GPT Plus', desc: 'OpenAI 全系列模型，覆盖 GPT-4o / o1 / o3', icon: 'G' },
  { title: 'Gemini Pro', desc: 'Google 多模态大模型，视觉与推理能力突出', icon: 'Ge' },
  { title: 'DeepSeek', desc: '国产开源之光，性价比极高的推理模型', icon: 'D' },
  { title: '豆包 / 通义', desc: '字节 & 阿里旗舰模型，中文场景深度优化', icon: '豆' },
  { title: '更多资源', desc: 'Kimi、文心一言、Mistral、Llama 等持续接入中', icon: '+' },
]

function ResourceCoverage() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">资源覆盖全球顶级AI模型</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">一个平台推广所有主流大模型，无需多平台切换</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESOURCES.map((r) => (
            <div key={r.title} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-[--radius-sm] bg-accent-light text-accent flex items-center justify-center text-sm font-bold mb-4">{r.icon}</div>
              <h3 className="font-semibold text-text mb-1.5">{r.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Product Capabilities ── */
const CAPABILITIES = [
  {
    title: '资源活动管理',
    desc: '统一管理多模型推广活动，灵活配置佣金比例与推广规则',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    title: '推广链接生成',
    desc: '一键生成专属推广链接与二维码，支持多渠道追踪',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    title: '数据实时对账',
    desc: '推广数据实时可见，点击、注册、付费全链路透明',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 6-10" />
      </svg>
    ),
  },
  {
    title: '结算与规则透明',
    desc: 'T+7 自动结算，佣金规则公开透明，支持多种提现方式',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
      </svg>
    ),
  },
]

function ProductCapabilities() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">产品能力</h2>
        <p className="text-text-tertiary text-center text-sm mb-12">资源管理 · 推广分发 · 数据对账 · 规则结算</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-[--radius-sm] bg-accent-light text-accent flex items-center justify-center mb-4">{c.icon}</div>
              <h3 className="font-semibold text-text mb-1.5">{c.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── 4-Step Process ── */
const STEPS = [
  { num: '01', title: '注册账号', desc: '填写基本信息，快速完成推广员注册' },
  { num: '02', title: '选择活动', desc: '浏览可推广的AI模型活动，选择感兴趣的产品' },
  { num: '03', title: '生成链接', desc: '一键生成专属推广链接，支持多渠道分发' },
  { num: '04', title: '推广赚佣金', desc: '分享链接开始推广，实时查看收益数据' },
]

function FourStepProcess() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">4步完成开通与推广</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative bg-card border border-border rounded-[--radius-md] p-6 text-center">
              <div className="text-3xl font-bold text-accent/20 mb-3">{s.num}</div>
              <h3 className="font-semibold text-text mb-1.5">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-text-tertiary">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Tech Highlights ── */
const TECH_ITEMS = [
  { title: '多节点负载均衡', desc: '全球多区域部署，智能路由分配请求' },
  { title: '模型响应缓存', desc: '高频请求智能缓存，降低延迟提升体验' },
  { title: '99.9% SLA', desc: '企业级可用性保障，7×24 小时监控' },
  { title: '数据传输加密', desc: 'TLS 1.3 全链路加密，保障数据安全' },
  { title: '智能限流防护', desc: '自适应流控策略，防止恶意调用与滥用' },
  { title: '多模型统一网关', desc: '统一 API 网关，屏蔽底层模型差异' },
]

function TechHighlights() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">技术架构与数据安全</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">企业级基础设施，为推广业务保驾护航</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_ITEMS.map((t) => (
            <div key={t.title} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 1v14M1 8h14" />
                </svg>
              </div>
              <h3 className="font-semibold text-text mb-1">{t.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Compliance ── */
const COMPLIANCE_ITEMS = [
  { title: '佣金透明可查', desc: '每笔佣金来源清晰，推广员可随时查询明细' },
  { title: 'T+7 结算保障', desc: '佣金 T+7 自动结算到账，无拖延无克扣' },
  { title: '模型调用审计', desc: '完整的调用日志审计，确保合规运营' },
  { title: '多通道容灾', desc: '多供应商冗余切换，保障服务连续性' },
  { title: '密钥安全隔离', desc: 'API 密钥独立隔离存储，杜绝泄露风险' },
  { title: '协议法律保障', desc: '正式合作协议，明确双方权利与义务' },
]

function Compliance() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">合规与保障</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">透明规则、安全架构、法律保障，让推广无后顾之忧</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPLIANCE_ITEMS.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="w-8 h-8 rounded-full bg-success-light text-success flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8.5l3.5 3.5L13 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-text mb-1">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Bottom CTA ── */
function BottomCTA() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#1A1A1A] to-[#2D2A27]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-white/60 text-sm mb-6 leading-relaxed">AI 时代的流量入口，每一次推广都在连接人与智能的未来</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">立即加入 TokenCPS 联盟</h2>
        <Link href="/auth/register" className="inline-block bg-accent text-white px-10 py-3.5 rounded-[--radius-md] text-sm font-medium hover:bg-accent-hover transition-colors">
          立即加入 TokenCPS 联盟
        </Link>
      </div>
    </section>
  )
}

/* ── Footer ── */
function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-tertiary">
        <span>&copy; {new Date().getFullYear()} TokenCPS. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-text-secondary transition-colors">用户协议</Link>
          <Link href="/privacy" className="hover:text-text-secondary transition-colors">隐私政策</Link>
          <Link href="/promoter-agreement" className="hover:text-text-secondary transition-colors">推广员合作协议</Link>
        </div>
      </div>
    </footer>
  )
}
