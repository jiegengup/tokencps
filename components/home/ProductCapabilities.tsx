const CAPABILITIES = [
  {
    num: '01',
    title: '资源活动管理',
    desc: '平台统一接入多家AI模型货源，每个推广活动独立配置佣金比例，推广员无需关心供应链。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '推广链接生成',
    desc: '一键生成专属推广链接，支持推广海报自动生成，内置社交证明（已有XXX人购买）。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '数据实时对账',
    desc: '预估佣金实时显示，实际佣金按使用量结算，每笔佣金变动都有完整流水记录。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 6-10" />
      </svg>
    ),
  },
  {
    num: '04',
    title: '结算与规则透明',
    desc: 'T+7 提现，¥1起提，佣金规则公开透明，支持团队裂变永久抽成。',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" /><path d="M6 15h4" />
      </svg>
    ),
  },
]

export function ProductCapabilities() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          产品能力：资源管理 · 推广分发 · 数据对账 · 规则结算
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CAPABILITIES.map((c) => (
            <div key={c.num} className="bg-card border border-border rounded-[--radius-md] p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <span className="text-3xl font-bold text-accent/20 leading-none">{c.num}</span>
                <div className="flex-1">
                  <div className="w-10 h-10 rounded-[--radius-sm] bg-accent-light text-accent flex items-center justify-center mb-3">{c.icon}</div>
                  <h3 className="font-semibold text-text mb-1.5">{c.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
