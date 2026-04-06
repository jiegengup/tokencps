'use client'
import { useState } from 'react'
import { Modal } from '@tokencps/shared/components/Modal'
import { useAuthStore } from '@/lib/store'

const steps = [
  { title: '欢迎使用 TokenCPS！', desc: '你已获得 $5 免费体验额度，可以立即开始使用 Claude API。' },
  { title: '选择套餐充值', desc: '前往充值页选择适合你的套餐，微信支付宝直接付款，人民币 1:1 美元额度。' },
  { title: '获取 API Key', desc: '一键生成 API Key，复制到你的应用中即可调用 Claude / GPT 模型。' },
]

export function OnboardingModal() {
  const { isFirstLogin, setFirstLogin } = useAuthStore()
  const [step, setStep] = useState(0)

  if (!isFirstLogin) return null

  return (
    <Modal open={isFirstLogin} onClose={() => setFirstLogin(false)} maxWidth="max-w-lg">
      <div className="pt-2 text-center">
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-accent' : 'w-4 bg-border'}`} />
          ))}
        </div>
        <div className="w-14 h-14 rounded-full bg-accent-light text-accent flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {step + 1}
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">{steps[step].title}</h3>
        <p className="text-text-secondary text-sm mb-8 max-w-sm mx-auto">{steps[step].desc}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setFirstLogin(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text">
            跳过
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} className="px-6 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              下一步
            </button>
          ) : (
            <button onClick={() => setFirstLogin(false)} className="px-6 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              开始使用
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}
