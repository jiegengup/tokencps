'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@tokencps/shared'

const steps = [
  {
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><circle cx="20" cy="14" r="6" stroke="currentColor" strokeWidth="2"/><path d="M8 34c0-6 5-10 12-10s12 4 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: '注册账号',
    desc: '手机号注册，1分钟完成',
  },
  {
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><rect x="6" y="8" width="28" height="24" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M6 16h28M16 16v16" stroke="currentColor" strokeWidth="2"/></svg>,
    title: '选择活动',
    desc: '浏览可推广的AI模型活动，选择适合你的',
  },
  {
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><path d="M12 28V12h10l6 6v10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M22 12v6h6M16 22h8M16 26h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: '生成链接',
    desc: '一键生成专属推广链接和海报',
  },
  {
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10"><circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2"/><path d="M20 14v6l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 20c0-2.2 1.8-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: '推广赚佣金',
    desc: '分享链接，用户购买即赚佣金',
  },
]

export default function GuidePage() {
  return (
    <div className="max-w-lg mx-auto py-6">
      <h1 className="text-xl font-bold text-text mb-1">新手引导</h1>
      <p className="text-sm text-text-secondary mb-6">4步开始推广赚钱</p>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <div key={i} className="bg-card rounded-[16px] p-4 flex items-start gap-4 border border-border-light">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center font-bold text-sm">{i + 1}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent">{s.icon}</span>
                <span className="font-semibold text-text">{s.title}</span>
              </div>
              <p className="text-sm text-text-secondary">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Link href="/promotions"><Button size="lg" fullWidth>开始推广</Button></Link>
        <Link href="/dashboard" className="text-sm text-text-tertiary hover:text-text">返回数据中心</Link>
      </div>
    </div>
  )
}
