'use client'

import React, { useState } from 'react'
import { Card } from '@tokencps/shared'

const priceOptions = [50, 200, 500, 2000]

export default function CalculatorPage() {
  const [people, setPeople] = useState(100)
  const [rate, setRate] = useState(5)
  const [price, setPrice] = useState(200)

  const daily = people * (rate / 100) * price * 0.5
  const monthly = daily * 30
  const yearly = daily * 365
  const teamBonus = monthly * 0.1

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold text-text">收益计算器</h1>

      {/* Inputs */}
      <Card>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text">每日推广人数</span>
              <span className="text-accent font-medium">{people} 人</span>
            </div>
            <input
              type="range" min={10} max={1000} step={10} value={people}
              onChange={e => setPeople(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)]"
            />
            <div className="flex justify-between text-xs text-text-tertiary mt-1">
              <span>10</span><span>1000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text">预估转化率</span>
              <span className="text-accent font-medium">{rate}%</span>
            </div>
            <input
              type="range" min={1} max={20} step={1} value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full accent-[var(--color-accent)]"
            />
            <div className="flex justify-between text-xs text-text-tertiary mt-1">
              <span>1%</span><span>20%</span>
            </div>
          </div>

          <div>
            <p className="text-sm text-text mb-2">预估客单价</p>
            <div className="grid grid-cols-4 gap-2">
              {priceOptions.map(p => (
                <button
                  key={p}
                  onClick={() => setPrice(p)}
                  className={`py-2 text-sm rounded-[12px] border transition-colors ${
                    price === p
                      ? 'bg-accent text-white border-accent'
                      : 'bg-card text-text border-border hover:border-accent'
                  }`}
                >
                  ¥{p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Results */}
      <Card className="bg-accent text-white border-none" padding="lg">
        <p className="text-sm opacity-80 mb-3">预估收益</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-70">日收益</p>
            <p className="text-2xl font-bold">¥{daily.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-xs opacity-70">月收益</p>
            <p className="text-2xl font-bold">¥{monthly.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div>
            <p className="text-xs opacity-70">年收益</p>
            <p className="text-2xl font-bold">¥{yearly.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}</p>
          </div>
          <div>
            <p className="text-xs opacity-70">团队额外收益/月</p>
            <p className="text-2xl font-bold">+¥{teamBonus.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs opacity-60 mt-0.5">邀请10位推广员</p>
          </div>
        </div>
      </Card>

      <p className="text-xs text-text-tertiary text-center px-4 leading-relaxed">
        以上为预估数据，实际收益取决于推广效果与用户消费情况。坚持推广，收益会随时间稳步增长。
      </p>
    </div>
  )
}
