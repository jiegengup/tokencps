'use client'

import Image from 'next/image'

/**
 * Logo 墙 — 1:1 复刻万单联盟的错落排列白底风格
 * 真实品牌 Logo 使用 SVG 文件，无 SVG 的用品牌色字母
 */

interface BrandItem {
  name: string
  company: string
  logo: string | null
  letter?: string
  color: string
}

const AI_BRANDS: BrandItem[] = [
  { name: 'Claude', company: 'Anthropic', logo: '/logos/claude.svg', color: '#D4A27F' },
  { name: 'ChatGPT', company: 'OpenAI', logo: '/logos/openai.svg', color: '#10A37F' },
  { name: 'Gemini', company: 'Google', logo: '/logos/gemini.svg', color: '#8E75B2' },
  { name: 'DeepSeek', company: '', logo: null, letter: 'DS', color: '#4D6BFE' },
  { name: '豆包', company: '字节跳动', logo: null, letter: '豆', color: '#3C8CFF' },
  { name: '通义千问', company: '阿里', logo: null, letter: '通', color: '#6236FF' },
  { name: '文心一言', company: '百度', logo: null, letter: '文', color: '#2932E1' },
  { name: 'Kimi', company: '月之暗面', logo: null, letter: 'K', color: '#000000' },
  { name: 'Llama', company: 'Meta', logo: '/logos/llama.svg', color: '#0467DF' },
  { name: 'Mistral', company: '', logo: '/logos/mistral.svg', color: '#FA520F' },
]

export function LogoWall() {
  return (
    <section className="py-10 border-t border-[#E8E4DF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 错落排列的白底 Logo 方块 */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {AI_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center gap-2.5 bg-white border border-[#E8E4DF] rounded-lg px-4 py-2.5 hover:shadow-sm hover:border-[#C96442]/30 transition-all group cursor-default"
            >
              {/* Logo 或字母 */}
              <div className="w-7 h-7 flex items-center justify-center shrink-0">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={22}
                    height={22}
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <span
                    className="text-xs font-bold opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: brand.color }}
                  >
                    {brand.letter}
                  </span>
                )}
              </div>
              {/* 名称 */}
              <span className="text-xs font-medium text-[#9B9590] group-hover:text-[#1A1A1A] transition-colors whitespace-nowrap">
                {brand.name}
              </span>
              {brand.company && (
                <span className="text-[10px] text-[#9B9590]/60 group-hover:text-[#9B9590] transition-colors whitespace-nowrap hidden sm:inline">
                  {brand.company}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
