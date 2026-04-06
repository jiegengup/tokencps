'use client'

import React, { useState } from 'react'
import { Card } from '@tokencps/shared'

type Section = { title: string; items: { label: string; text: string }[] }

const sections: Section[] = [
  {
    title: '朋友圈文案',
    items: [
      { label: '技术版', text: 'Claude API 国内直连，¥1=$1，支持支付宝微信，开发者必备 → [链接]' },
      { label: '小白版', text: '想用最强AI？3步搞定，还送$5体验额度 → [链接]' },
      { label: '效率版', text: '用了Claude写代码，效率翻3倍，同事都来问我怎么搞的 → [链接]' },
      { label: '对比版', text: 'ChatGPT Plus要$20/月，这个方案按量付费更划算，不用的时候不花钱 → [链接]' },
      { label: '限时版', text: '新用户注册送$5体验额度，Claude/GPT随便用，手慢无 → [链接]' },
    ],
  },
  {
    title: '社群话术',
    items: [
      { label: '入群欢迎', text: '欢迎加入AI工具交流群！我们提供Claude/GPT国内直连服务，按量付费，新人送$5体验 → [链接]' },
      { label: '日常分享', text: '今天用Claude帮我写了一个完整的后端服务，省了至少2天时间，真香 → [链接]' },
      { label: '答疑引导', text: '很多朋友问怎么用Claude API，其实3步就搞定：注册→充值→调用，支持支付宝 → [链接]' },
    ],
  },
  {
    title: 'GitHub README 模板',
    items: [
      { label: 'README', text: '## 🚀 Claude API 国内直连方案\n\n支持 Opus / Sonnet 全系列模型\n\n```bash\ncurl https://api.tokencps.com/v1/chat \\\n  -H "Authorization: Bearer YOUR_KEY" \\\n  -d \'{"model":"claude-opus-4-0","messages":[...]}\'\n```\n\n[立即注册 →](链接)' },
    ],
  },
]

const posters = ['海报模板 1', '海报模板 2', '海报模板 3']

export default function MaterialsPage() {
  const [open, setOpen] = useState<Record<string, boolean>>({ '朋友圈文案': true })
  const [copied, setCopied] = useState<string | null>(null)

  const toggle = (title: string) => setOpen(p => ({ ...p, [title]: !p[title] }))

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-text">素材中心</h1>

      {sections.map((sec) => (
        <Card key={sec.title}>
          <button onClick={() => toggle(sec.title)} className="w-full flex items-center justify-between">
            <span className="text-sm font-medium text-text">{sec.title}</span>
            <span className="text-text-tertiary text-xs">{open[sec.title] ? '收起' : '展开'}</span>
          </button>
          {open[sec.title] && (
            <div className="mt-3 space-y-3">
              {sec.items.map((item, i) => {
                const id = `${sec.title}-${i}`
                return (
                  <div key={id} className="p-3 bg-cream rounded-[12px]">
                    <p className="text-xs text-accent font-medium mb-1">{item.label}</p>
                    <p className="text-sm text-text whitespace-pre-wrap">{item.text}</p>
                    <button
                      onClick={() => copy(item.text, id)}
                      className="mt-2 text-xs px-3 py-1 rounded-full bg-accent text-white hover:opacity-90 transition-opacity"
                    >
                      {copied === id ? '已复制' : '复制'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      ))}

      {/* Poster templates */}
      <Card>
        <p className="text-sm font-medium text-text mb-3">推广海报模板</p>
        <div className="grid grid-cols-3 gap-3">
          {posters.map((p) => (
            <div key={p} className="aspect-[3/4] bg-cream-dark rounded-[12px] flex items-center justify-center text-xs text-text-tertiary">
              {p}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
