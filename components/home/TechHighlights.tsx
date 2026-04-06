const TECH_ITEMS = [
  {
    title: '多节点负载均衡',
    desc: '全球多区域 API 节点部署，智能路由分发，确保低延迟高可用',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="4" r="2.5" /><circle cx="4" cy="16" r="2.5" /><circle cx="16" cy="16" r="2.5" />
        <path d="M10 6.5v4M8.5 12l-3 2M11.5 12l3 2" />
      </svg>
    ),
  },
  {
    title: '模型响应缓存',
    desc: '热门 Prompt 智能缓存，Token 消耗降低 30%，响应速度提升 50%',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
        <path d="M6 9h4M6 12h2" /><path d="M14 8l-2 2 2 2" />
      </svg>
    ),
  },
  {
    title: '99.9% SLA 保障',
    desc: '7×24 小时服务监控，故障自动切换备用通道，服务中断秒级恢复',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16z" />
        <path d="M10 6v4l3 2" />
      </svg>
    ),
  },
  {
    title: '数据传输加密',
    desc: '全链路 TLS 1.3 加密，API Key 独立隔离，请求日志脱敏存储',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="12" height="8" rx="1.5" />
        <path d="M7 9V6a3 3 0 0 1 6 0v3" />
        <circle cx="10" cy="13" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: '智能限流防护',
    desc: 'QPS 弹性扩缩容，DDoS 防护，异常调用自动熔断',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-4z" />
        <path d="M7 10l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: '多模型统一网关',
    desc: '一个 API 端点接入多家模型，无缝切换 Claude/GPT/Gemini，降低集成成本',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10h4M14 10h4" />
        <rect x="6" y="6" width="8" height="8" rx="2" />
        <path d="M10 2v4M10 14v4" />
      </svg>
    ),
  },
]

export function TechHighlights() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">技术架构与数据安全</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_ITEMS.map((t) => (
            <div key={t.title} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-[--radius-sm] bg-accent-light text-accent flex items-center justify-center mb-4">{t.icon}</div>
              <h3 className="font-semibold text-text mb-1.5">{t.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
