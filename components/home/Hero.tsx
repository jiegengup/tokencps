import Link from 'next/link'

export function Hero() {
  return (
    <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs tracking-widest uppercase text-text-tertiary bg-cream-dark px-4 py-1.5 rounded-full mb-6">
          全球AI模型推广联盟平台
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-text leading-tight mb-6">
          TokenCPS · 一站式接入<br className="hidden sm:block" />全球AI顶级模型
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
          覆盖 Claude、Gemini、GPT、DeepSeek、豆包等场景。提供资源管理、推广分发、数据对账与规则结算能力，支持个人与团队合规开展推广。
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <span className="text-xs text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium">高佣金50%·实时到账</span>
          <span className="text-xs text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium">推广了X万笔·累计分佣X万元</span>
          <span className="text-xs text-accent bg-accent-light px-3 py-1.5 rounded-full font-medium">邀请下级·永久锁客</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/auth/register" className="bg-accent text-white px-8 py-3 rounded-[--radius-md] text-sm font-medium hover:bg-accent-hover transition-colors">
            免费注册 · 立即开始推广
          </Link>
          <Link href="/promotions" className="border border-border text-text-secondary px-8 py-3 rounded-[--radius-md] text-sm font-medium hover:border-text-tertiary hover:text-text transition-colors">
            查看推广活动 · 了解佣金方案
          </Link>
        </div>
      </div>
    </section>
  )
}
