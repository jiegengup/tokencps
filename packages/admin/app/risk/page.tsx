'use client'

import React, { useState } from 'react'

type RiskLevel = '高' | '中' | '低'
type AlertStatus = '待处理' | '已处理'

interface RiskRule {
  key: string
  label: string
  description: string
  value: number
  unit: string
}

interface RiskAlert {
  id: string
  type: string
  description: string
  level: RiskLevel
  time: string
  status: AlertStatus
}

const DEFAULT_RULES: RiskRule[] = [
  { key: 'ip_register', label: '同IP多注册阈值', description: '同一IP在24小时内注册账号数超过该值触发告警', value: 5, unit: '个' },
  { key: 'large_order', label: '大额订单告警阈值', description: '单笔订单金额超过该值触发告警', value: 10000, unit: '元' },
  { key: 'refund_rate', label: '高退款率阈值', description: '推广员关联订单退款率超过该值触发告警', value: 30, unit: '%' },
  { key: 'promoter_anomaly', label: '推广员异常检测', description: '推广员短时间内产生异常大量订单触发告警', value: 50, unit: '单/小时' },
]

const MOCK_ALERTS: RiskAlert[] = [
  { id: 'RA001', type: '同IP多注册', description: 'IP 192.168.1.100 在2小时内注册了8个账号', level: '高', time: '2026-04-02 09:15', status: '待处理' },
  { id: 'RA002', type: '大额订单', description: '订单 #ORD20260402003 金额 ¥25,000，超出阈值', level: '中', time: '2026-04-02 08:42', status: '待处理' },
  { id: 'RA003', type: '高退款率', description: '推广员 张三(ID:1023) 近7日退款率达 42%', level: '高', time: '2026-04-01 22:30', status: '待处理' },
  { id: 'RA004', type: '推广员异常', description: '推广员 李四(ID:1087) 1小时内产生 78 笔订单', level: '高', time: '2026-04-01 18:05', status: '已处理' },
  { id: 'RA005', type: '大额订单', description: '订单 #ORD20260401021 金额 ¥15,800，超出阈值', level: '低', time: '2026-04-01 14:20', status: '已处理' },
  { id: 'RA006', type: '同IP多注册', description: 'IP 10.0.0.55 在6小时内注册了6个账号', level: '中', time: '2026-04-01 10:48', status: '已处理' },
]

const LEVEL_STYLE: Record<RiskLevel, string> = {
  '高': 'bg-danger-light text-danger',
  '中': 'bg-warning-light text-warning',
  '低': 'bg-success-light text-success',
}

const STATUS_STYLE: Record<AlertStatus, string> = {
  '待处理': 'bg-warning-light text-warning',
  '已处理': 'bg-success-light text-success',
}

export default function RiskPage() {
  const [rules, setRules] = useState<RiskRule[]>(DEFAULT_RULES)
  const [alerts, setAlerts] = useState<RiskAlert[]>(MOCK_ALERTS)

  const pendingCount = alerts.filter(a => a.status === '待处理').length

  function updateRule(key: string, value: number) {
    setRules(prev => prev.map(r => r.key === key ? { ...r, value } : r))
  }

  function handleAlert(id: string) {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: '已处理' } : a))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-text">风控告警</h1>
        {pendingCount > 0 && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full bg-danger text-white">
            {pendingCount}
          </span>
        )}
      </div>

      {/* Risk Rule Configuration */}
      <div className="bg-card border border-border-light rounded-[--radius-md] p-5">
        <h2 className="text-sm font-semibold text-text mb-4">风控规则配置</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.map(rule => (
            <div key={rule.key} className="border border-border-light rounded-[--radius-sm] p-4 bg-bg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text">{rule.label}</span>
              </div>
              <p className="text-xs text-text-tertiary mb-3">{rule.description}</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={rule.value}
                  onChange={e => updateRule(rule.key, Number(e.target.value))}
                  className="w-24 h-8 px-2 text-sm rounded-[--radius-sm] border border-border bg-card text-text outline-none focus:border-accent transition-colors"
                />
                <span className="text-xs text-text-secondary">{rule.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="px-5 py-4 border-b border-border-light">
          <h2 className="text-sm font-semibold text-text">近期告警</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">告警类型</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">描述</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">风险等级</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">时间</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">状态</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(a => (
                <tr key={a.id} className="border-b border-border-light last:border-b-0 hover:bg-hover transition-colors">
                  <td className="px-4 py-3 text-text font-medium whitespace-nowrap">{a.type}</td>
                  <td className="px-4 py-3 text-text-secondary max-w-xs">{a.description}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${LEVEL_STYLE[a.level]}`}>{a.level}</span>
                  </td>
                  <td className="px-4 py-3 text-text-tertiary text-xs whitespace-nowrap">{a.time}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${STATUS_STYLE[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {a.status === '待处理' ? (
                      <button
                        onClick={() => handleAlert(a.id)}
                        className="px-3 py-1 text-xs rounded-[6px] bg-accent text-white hover:opacity-90 transition-opacity"
                      >
                        处理
                      </button>
                    ) : (
                      <span className="text-xs text-text-tertiary">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-text-tertiary">
        共 {alerts.length} 条告警，{pendingCount} 条待处理
      </div>
    </div>
  )
}
