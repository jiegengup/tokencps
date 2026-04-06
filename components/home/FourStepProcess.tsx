import Link from 'next/link'

const STEPS = [
  {
    num: '01',
    title: '注册账号',
    desc: '手机号注册，1分钟完成',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '选择活动',
    desc: '浏览可推广的AI模型活动',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '生成链接',
    desc: '一键生成专属推广链接和海报',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
  {
    num: '04',
    title: '推广赚佣金',
    desc: '分享链接，用户购买即赚佣金',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9.5c-.5-1-1.5-1.5-3-1.5-2 0-3 1-3 2.5s1.5 2 3 2.5 3 1 3 2.5-1 2.5-3 2.5c-1.5 0-2.5-.5-3-1.5" />
        <path d="M12 6v2M12 16v2" />
      </svg>
    ),
  },
]

export function FourStepProcess() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">4步完成开通与推广</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative bg-card border border-border rounded-[--radius-md] p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <div className="text-xs text-accent font-semibold mb-2">Step {i + 1}</div>
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
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-10">
          <Link href="/auth/register" className="bg-accent text-white px-8 py-3 rounded-[--radius-md] text-sm font-medium hover:bg-accent-hover transition-colors text-center">
            免费注册
          </Link>
          <Link href="/commission" className="border border-border text-text-secondary px-8 py-3 rounded-[--radius-md] text-sm font-medium hover:border-text-tertiary hover:text-text transition-colors text-center">
            了解佣金方案
          </Link>
        </div>
      </div>
    </section>
  )
}
