const COMPLIANCE_ITEMS = [
  {
    title: '佣金透明可查',
    desc: '预估+实际双轨制，每笔佣金流水链上可追溯，零暗扣',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" />
        <path d="M10 6v4l3 2" />
        <path d="M6 10h1" />
      </svg>
    ),
  },
  {
    title: 'T+7 结算保障',
    desc: '订单确认后 7 天自动结算，¥1 起提，到账有保障',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="14" height="13" rx="1.5" />
        <path d="M3 8h14" /><path d="M7 2v4M13 2v4" />
        <path d="M7 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: '模型调用审计',
    desc: '完整的 API 调用日志，Token 消耗明细实时可查，用量透明',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h12v12H4z" /><path d="M7 8h6M7 11h4" />
        <path d="M13 2v4M7 14v4" />
      </svg>
    ),
  },
  {
    title: '多通道容灾',
    desc: '主备货源自动切换，单一供应商故障不影响推广业务连续性',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10h4l2-4 2 8 2-6 2 4h2" />
      </svg>
    ),
  },
  {
    title: '密钥安全隔离',
    desc: '每个用户独立 API Key，密钥加密存储，泄露可一键重置',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="10" r="4" />
        <path d="M10 10h7" /><path d="M15 8v4M17 8v4" />
      </svg>
    ),
  },
  {
    title: '协议法律保障',
    desc: '推广员合作协议、用户服务协议、隐私政策齐全，权责清晰',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V6l7-4z" />
        <path d="M7 10l2 2 4-4" />
      </svg>
    ),
  },
]

export function Compliance() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">合规与保障</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPLIANCE_ITEMS.map((item) => (
            <div key={item.title} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-[--radius-sm] bg-success-light text-success flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="font-semibold text-text mb-1.5">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
