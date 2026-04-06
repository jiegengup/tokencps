'use client'

import Link from 'next/link'
import Image from 'next/image'

const RESOURCES = [
  {
    name: 'Claude API',
    desc: 'Anthropic 旗舰模型，Opus/Sonnet 全系列',
    logo: '/logos/claude.svg',
    color: '#D4A27F',
  },
  {
    name: 'GPT Plus',
    desc: 'OpenAI 会员账号，月卡形式',
    logo: '/logos/openai.svg',
    color: '#10A37F',
  },
  {
    name: 'Gemini API',
    desc: 'Google 多模态大模型，Pro/Ultra 全系列',
    logo: '/logos/gemini.svg',
    color: '#8E75B2',
  },
  {
    name: 'DeepSeek API',
    desc: 'DeepSeek V3/R1 开源推理模型',
    logo: null,
    letter: 'D',
    color: '#4D6BFE',
  },
  {
    name: '豆包API',
    desc: '字节跳动 国产大模型，高速稳定',
    logo: null,
    letter: '豆',
    color: '#3C8CFF',
  },
  {
    name: '通义千问API',
    desc: '阿里 Qwen 全系列开源模型',
    logo: null,
    letter: '通',
    color: '#6236FF',
  },
]

export function ResourceCoverage() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* 标题区 — 居中 */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] mb-3">
            资源覆盖全球顶级AI模型
          </h2>
          <p className="text-sm sm:text-base text-[#6B6560] max-w-2xl mx-auto leading-relaxed">
            全球主流大模型统一接入，一站式API分发管理；灵活佣金体系，助力推广员高效变现。
          </p>
        </div>

        {/* 6个卡片 — 3×2 网格，白色圆角卡片，左图标右文字 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {RESOURCES.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-xl border border-[#E8E4DF] p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              {/* Logo 图标 */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: r.color + '15' }}
              >
                {r.logo ? (
                  <Image
                    src={r.logo}
                    alt={r.name}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                ) : (
                  <span
                    className="text-lg font-bold"
                    style={{ color: r.color }}
                  >
                    {r.letter}
                  </span>
                )}
              </div>
              {/* 名称 + 描述 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">
                  {r.name}
                </h3>
                <p className="text-xs text-[#9B9590] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 底部按钮 + 说明 */}
        <div className="text-center mt-10">
          <Link
            href="/promotions"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C96442] hover:text-[#B85535] transition-colors"
          >
            查看全部模型类目
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3l4 4-4 4" />
            </svg>
          </Link>
          <p className="text-[10px] text-[#9B9590] mt-3">
            示例图用于展示功能与能力范围，具体以平台实际配置与规则为准。
          </p>
        </div>
      </div>
    </section>
  )
}
