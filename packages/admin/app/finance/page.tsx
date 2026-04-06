'use client'

import { useState } from 'react'

type Period = 'today' | 'week' | 'month' | 'quarter'

const PERIODS: { key: Period; label: string }[] = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'quarter', label: '本季度' },
]

const MONTHLY_DATA = [
  { month: '2025-11', income: 48500, commission: 9700, withdrawal: 6200, other: 1800 },
  { month: '2025-12', income: 62300, commission: 12460, withdrawal: 8100, other: 2100 },
  { month: '2026-01', income: 55800, commission: 11160, withdrawal: 7500, other: 1950 },
  { month: '2026-02', income: 71200, commission: 14240, withdrawal: 9800, other: 2400 },
  { month: '2026-03', income: 83600, commission: 16720, withdrawal: 11200, other: 2800 },
  { month: '2026-04', income: 12580, commission: 2516, withdrawal: 1800, other: 450 },
]

const SUMMARY_BY_PERIOD: Record<Period, {
  income: number
  commission: number
  withdrawal: number
  other: number
}> = {
  today: { income: 12580, commission: 2516, withdrawal: 1800, other: 450 },
  week: { income: 38200, commission: 7640, withdrawal: 5100, other: 1200 },
  month: { income: 83600, commission: 16720, withdrawal: 11200, other: 2800 },
  quarter: { income: 167380, commission: 33476, withdrawal: 22500, other: 5650 },
}

function fmt(n: number) {
  return '¥' + n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function pct(a: number, b: number) {
  if (b === 0) return '0.0%'
  return ((a / b) * 100).toFixed(1) + '%'
}

export default function FinancePage() {
  const [period, setPeriod] = useState<Period>('month')
  const s = SUMMARY_BY_PERIOD[period]
  const totalExpense = s.commission + s.withdrawal + s.other
  const profit = s.income - totalExpense
  const profitRate = pct(profit, s.income)

  const STATS = [
    { label: '总收入', value: fmt(s.income), color: 'text-text' },
    { label: '总支出', value: fmt(totalExpense), color: 'text-danger' },
    { label: '佣金支出', value: fmt(s.commission), color: 'text-text-secondary' },
    { label: '提现支出', value: fmt(s.withdrawal), color: 'text-text-secondary' },
    { label: '净利润', value: fmt(profit), color: profit >= 0 ? 'text-success' : 'text-danger' },
    { label: '利润率', value: profitRate, color: profit >= 0 ? 'text-success' : 'text-danger' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text">财务报表</h1>
          <p className="text-sm text-text-tertiary mt-1">收支明细与利润分析</p>
        </div>
        <div className="flex gap-1 bg-bg-secondary rounded-[--radius-sm] p-1">
          {PERIODS.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-4 py-1.5 text-sm rounded-[6px] transition-colors ${
                period === p.key
                  ? 'bg-card text-text font-medium shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {STATS.map(st => (
          <div key={st.label} className="bg-card border border-border-light rounded-[--radius-md] p-4">
            <p className="text-xs text-text-tertiary">{st.label}</p>
            <p className={`text-xl font-bold mt-1 ${st.color}`}>{st.value}</p>
          </div>
        ))}
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="px-6 py-4 border-b border-border-light">
          <h2 className="text-base font-semibold text-text">月度收支明细</h2>
          <p className="text-xs text-text-tertiary mt-0.5">近6个月财务数据</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border-light bg-hover">
              <th className="text-left px-4 py-3 font-medium text-text-secondary">月份</th>
              <th className="text-right px-4 py-3 font-medium text-text-secondary">收入</th>
              <th className="text-right px-4 py-3 font-medium text-text-secondary">佣金支出</th>
              <th className="text-right px-4 py-3 font-medium text-text-secondary">提现支出</th>
              <th className="text-right px-4 py-3 font-medium text-text-secondary">其他支出</th>
              <th className="text-right px-4 py-3 font-medium text-text-secondary">净利润</th>
            </tr>
          </thead>
          <tbody>
            {MONTHLY_DATA.map(row => {
              const rowProfit = row.income - row.commission - row.withdrawal - row.other
              return (
                <tr key={row.month} className="border-b border-border-light last:border-0 hover:bg-hover transition-colors">
                  <td className="px-4 py-3 text-text font-medium">{row.month}</td>
                  <td className="px-4 py-3 text-right text-text">{fmt(row.income)}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">{fmt(row.commission)}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">{fmt(row.withdrawal)}</td>
                  <td className="px-4 py-3 text-right text-text-secondary">{fmt(row.other)}</td>
                  <td className={`px-4 py-3 text-right font-medium ${rowProfit >= 0 ? 'text-success' : 'text-danger'}`}>
                    {fmt(rowProfit)}
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="bg-hover border-t border-border">
              <td className="px-4 py-3 text-text font-semibold">合计</td>
              <td className="px-4 py-3 text-right text-text font-semibold">
                {fmt(MONTHLY_DATA.reduce((s, r) => s + r.income, 0))}
              </td>
              <td className="px-4 py-3 text-right text-text-secondary font-medium">
                {fmt(MONTHLY_DATA.reduce((s, r) => s + r.commission, 0))}
              </td>
              <td className="px-4 py-3 text-right text-text-secondary font-medium">
                {fmt(MONTHLY_DATA.reduce((s, r) => s + r.withdrawal, 0))}
              </td>
              <td className="px-4 py-3 text-right text-text-secondary font-medium">
                {fmt(MONTHLY_DATA.reduce((s, r) => s + r.other, 0))}
              </td>
              <td className="px-4 py-3 text-right text-success font-semibold">
                {fmt(MONTHLY_DATA.reduce((s, r) => s + r.income - r.commission - r.withdrawal - r.other, 0))}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
