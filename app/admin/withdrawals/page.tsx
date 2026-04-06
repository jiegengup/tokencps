'use client'

import React, { useState, useEffect } from 'react'

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : ""
}

type Status = 'pending' | 'approved' | 'rejected'

interface Withdrawal {
  id: string
  promoter: string
  amount: number
  method: string
  appliedAt: string
  status: Status
}

const TABS: { key: Status | 'all'; label: string }[] = [
  { key: 'pending', label: '待审核' },
  { key: 'approved', label: '已通过' },
  { key: 'rejected', label: '已拒绝' },
  { key: 'all', label: '全部' },
]

const STATUS_MAP: Record<Status, { label: string; cls: string }> = {
  pending: { label: '待审核', cls: 'bg-warning-light text-warning' },
  approved: { label: '已通过', cls: 'bg-success-light text-success' },
  rejected: { label: '已拒绝', cls: 'bg-danger-light text-danger' },
}

export default function WithdrawalsPage() {
  const [tab, setTab] = useState<Status | 'all'>('pending')
  const [data, setData] = useState<Withdrawal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/withdrawals', {
      headers: { Authorization: 'Bearer ' + getCookie('token') },
    })
      .then(res => res.json())
      .then(json => setData(json.data || json || []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = tab === 'all' ? data : data.filter(w => w.status === tab)
  const pendingCount = data.filter(w => w.status === 'pending').length
  const approvedToday = data.filter(w => w.status === 'approved').length
  const approvedAmount = data.filter(w => w.status === 'approved').reduce((s, w) => s + w.amount, 0)

  function handleAction(id: string, action: 'approved' | 'rejected') {
    setData(prev => prev.map(w => w.id === id ? { ...w, status: action } : w))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-text">提现审核</h1>
        <p className="text-sm text-text-tertiary mt-1">审核推广员的提现申请</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
          <p className="text-xs text-text-tertiary">待审核数</p>
          <p className="text-2xl font-bold text-warning mt-1">{pendingCount}</p>
        </div>
        <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
          <p className="text-xs text-text-tertiary">今日已审核</p>
          <p className="text-2xl font-bold text-text mt-1">{approvedToday}</p>
        </div>
        <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
          <p className="text-xs text-text-tertiary">今日通过金额</p>
          <p className="text-2xl font-bold text-success mt-1">¥{approvedAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-bg-secondary rounded-[--radius-sm] p-1 w-fit">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-1.5 text-sm rounded-[6px] transition-colors ${
              tab === t.key
                ? 'bg-card text-text font-medium shadow-sm'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {t.label}
            {t.key === 'pending' && pendingCount > 0 && (
              <span className="ml-1.5 text-xs bg-warning-light text-warning px-1.5 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-text-tertiary">加载中...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-hover">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">申请ID</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">推广员</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">金额</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">提现方式</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">申请时间</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">状态</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-text-tertiary">暂无数据</td>
                </tr>
              ) : (
                filtered.map(w => {
                  const st = STATUS_MAP[w.status]
                  return (
                    <tr key={w.id} className="border-b border-border-light last:border-0 hover:bg-hover transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-text-secondary">{w.id}</td>
                      <td className="px-4 py-3 text-text">{w.promoter}</td>
                      <td className="px-4 py-3 text-right font-medium text-text">¥{w.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-text-secondary">{w.method}</td>
                      <td className="px-4 py-3 text-text-tertiary text-xs">{w.appliedAt}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {w.status === 'pending' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleAction(w.id, 'approved')}
                              className="px-3 py-1 text-xs rounded-[6px] bg-success text-white hover:opacity-90 transition-opacity"
                            >
                              通过
                            </button>
                            <button
                              onClick={() => handleAction(w.id, 'rejected')}
                              className="px-3 py-1 text-xs rounded-[6px] bg-danger text-white hover:opacity-90 transition-opacity"
                            >
                              拒绝
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-text-tertiary">--</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
