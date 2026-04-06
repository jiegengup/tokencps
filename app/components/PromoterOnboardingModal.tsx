'use client'
import React, { useState } from 'react'
import { Modal, Button } from '@shared/index'

interface OnboardingModalProps {
  open: boolean
  onClose: () => void
}

const steps = [
  {
    icon: <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/><path d="M18 22c0-1 .5-3 3-3s3 2 3 3-1.5 2-3 3v2M24 32v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M15 10l2 4M33 10l-2 4M10 18l4 1M38 18l-4 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent"/></svg>,
    title: '欢迎加入 TokenCPS 联盟！',
    desc: '我们帮你轻松推广全球顶级AI模型，赚取丰厚佣金',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><rect x="8" y="10" width="32" height="28" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 18h32M20 26h8M20 31h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="38" cy="14" r="6" fill="currentColor" className="text-accent" opacity=".2"/><path d="M36 14h4M38 12v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-accent"/></svg>,
    title: '选择推广活动，一键复制推广链接',
    desc: '丰富的AI模型活动，专属链接和海报一键生成',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><path d="M14 34l-4 4V18a4 4 0 014-4h20a4 4 0 014 4v12a4 4 0 01-4 4H14z" stroke="currentColor" strokeWidth="2"/><path d="M18 22h12M18 27h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    title: '分享到社群/朋友圈',
    desc: '用户通过你的链接购买，你即可赚取佣金',
  },
  {
    icon: <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><rect x="10" y="8" width="28" height="32" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M18 20h12M18 26h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="34" r="3" stroke="currentColor" strokeWidth="2" className="text-accent"/></svg>,
    title: '查看佣金，随时提现',
    desc: '实时查看收益数据，满额即可申请提现',
  },
]

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const [cur, setCur] = useState(0)
  const step = steps[cur]
  const isLast = cur === steps.length - 1

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center pt-2">
        {/* Step dots */}
        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === cur ? 'w-6 bg-accent' : 'w-1.5 bg-border'}`} />
          ))}
        </div>

        {/* Illustration */}
        <div className="w-16 h-16 rounded-full bg-accent-light text-accent flex items-center justify-center mb-4">
          {step.icon}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-text mb-2">{step.title}</h3>
        <p className="text-sm text-text-secondary mb-8 px-2">{step.desc}</p>

        {/* Navigation */}
        <div className="w-full flex items-center gap-3">
          {cur > 0 && (
            <Button variant="outline" size="md" onClick={() => setCur(cur - 1)} className="flex-1">上一步</Button>
          )}
          {!isLast && cur === 0 && (
            <Button variant="ghost" size="md" onClick={onClose} className="flex-1">跳过</Button>
          )}
          {isLast ? (
            <Button size="md" onClick={onClose} fullWidth>开始使用</Button>
          ) : (
            <Button size="md" onClick={() => setCur(cur + 1)} className="flex-1">下一步</Button>
          )}
        </div>

        {/* Step counter */}
        <p className="text-xs text-text-tertiary mt-4">{cur + 1} / {steps.length}</p>
      </div>
    </Modal>
  )
}
