import Link from 'next/link'

export function BottomCTA() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-gradient-to-br from-[#1A1A1A] to-[#2D2A27]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 leading-relaxed">
          AI 时代的流量入口，每一次推广都在连接人与智能的未来
        </h2>
        <p className="text-white/60 text-sm mb-10 leading-relaxed">
          全球顶级大模型，一个平台全覆盖。推广 AI，从 TokenCPS 开始。
        </p>
        <Link href="/auth/register" className="inline-block bg-accent text-white px-10 py-3.5 rounded-[--radius-md] text-sm font-medium hover:bg-accent-hover transition-colors">
          立即加入 TokenCPS 联盟
        </Link>
      </div>
    </section>
  )
}
