const MODELS = [
  {
    title: '个人推广员',
    desc: '有社群/朋友圈流量的个人，零门槛注册，分享链接即可赚佣金，自买也省钱。',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="10" r="5" />
        <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    title: '团队长/KOL',
    desc: '有团队或粉丝基础，邀请下级推广员永久抽成10%，团队越大收益越高。',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="8" r="4" />
        <circle cx="6" cy="14" r="3" /><circle cx="22" cy="14" r="3" />
        <path d="M4 24c0-3 2-5.5 5-6.5M19 17.5c3 1 5 3.5 5 6.5M9 24c0-3.5 2.2-6 5-6s5 2.5 5 6" />
      </svg>
    ),
  },
  {
    title: '技术圈/企业',
    desc: 'SEO从业者、技术博主、开发者社区运营，精准流量高转化，批量推广高收益。',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="20" height="16" rx="2" />
        <path d="M10 14l2 2 4-4" />
        <path d="M4 10h20" />
      </svg>
    ),
  },
]

export function BusinessModels() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">适配三类推广员的业务模式</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MODELS.map((m) => (
            <div key={m.title} className="bg-card border border-border rounded-[--radius-md] p-8 text-center hover:shadow-sm transition-shadow">
              <div className="w-14 h-14 rounded-full bg-accent-light text-accent flex items-center justify-center mx-auto mb-5">
                {m.icon}
              </div>
              <h3 className="font-semibold text-text text-lg mb-3">{m.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
