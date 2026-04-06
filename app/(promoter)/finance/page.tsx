'use client'

import React, { useState, useEffect } from 'react'
import { Card, Button, Modal } from '@shared/index'
import { getCookie } from '@/lib/utils/cookie'

type Tab = 'commissions' | 'withdrawals'
type CommissionFilter = 'all' | 'estimated' | 'confirmed' | 'clawback' | 'team'

const typeBadge: Record<string, { label: string; cls: string }> = {
  estimated: { label: '待确认', cls: 'bg-blue-50 text-blue-600' },
  confirmed: { label: '实际佣金', cls: 'bg-emerald-50 text-emerald-600' },
  clawback: { label: '佣金追回', cls: 'bg-red-50 text-red-600' },
  team: { label: '团队抽成', cls: 'bg-purple-50 text-purple-600' },
}

const statusBadge: Record<string, { label: string; cls: string }> = {
  pending: { label: '处理中', cls: 'bg-amber-50 text-amber-600' },
  approved: { label: '已审核', cls: 'bg-blue-50 text-blue-600' },
  paid: { label: '已到账', cls: 'bg-emerald-50 text-emerald-600' },
  rejected: { label: '已拒绝', cls: 'bg-red-50 text-red-600' },
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

const filters: { key: CommissionFilter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'estimated', label: '待确认' },
  { key: 'confirmed', label: '实际佣金' },
  { key: 'clawback', label: '佣金追回' },
  { key: 'team', label: '团队抽成' },
]

export default function FinancePage() {
  const [tab, setTab] = useState<Tab>('commissions')
  const [filter, setFilter] = useState<CommissionFilter>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [alipay, setAlipay] = useState('')
  const [commissions, setCommissions] = useState<any[]>([])
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [summary, setSummary] = useState({ totalEstimated: 0, totalConfirmed: 0, totalClawback: 0, totalTeam: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = { 'Authorization': `Bearer ${getCookie('token')}` }
        const [commRes, wdRes] = await Promise.all([
          fetch('/api/commissions', { headers }),
          fetch('/api/withdrawal/records', { headers }),
        ])
        const commData = await commRes.json()
        const wdData = await wdRes.json()
        if (commData.success) {
          setCommissions(commData.data?.items || [])
          setSummary(commData.data?.summary || { totalEstimated: 0, totalConfirmed: 0, totalClawback: 0, totalTeam: 0 })
        }
        if (wdData.success) setWithdrawals(wdData.data || [])
      } catch (e) {
        console.error('Finance fetch failed:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = filter === 'all' ? commissions : commissions.filter(c => c.type === filter)

  const handleWithdraw = async () => {
    try {
      const res = await fetch('/api/withdrawal/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('token')}` },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      })
      const data = await res.json()
      if (data.success) {
        alert('提现申请成功')
        setModalOpen(false)
        setAmount('')
      } else {
        alert(data.message || '提现失败')
      }
    } catch (e) {
      alert('提现失败')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64"><p className="text-text-tertiary">加载中...</p></div>
  }

  const withdrawable = Math.max(0, summary.totalConfirmed + summary.totalTeam - summary.totalClawback)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-text">财务中心</h1>
        <p className="text-sm text-text-tertiary mt-1">佣金明细与提现管理</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-dark rounded-[12px] p-1">
        {([['commissions', '佣金明细'], ['withdrawals', '提现']] as const).map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-colors ${tab === k ? 'bg-card text-text shadow-sm' : 'text-text-secondary'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'commissions' && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <Card padding="sm"><p className="text-xs text-text-tertiary">本月预估</p><p className="text-lg font-bold text-text mt-0.5">¥{summary.totalEstimated.toLocaleString()}</p></Card>
            <Card padding="sm"><p className="text-xs text-text-tertiary">本月实际</p><p className="text-lg font-bold text-success mt-0.5">¥{summary.totalConfirmed.toLocaleString()}</p></Card>
            <Card padding="sm"><p className="text-xs text-text-tertiary">本月追回</p><p className="text-lg font-bold text-danger mt-0.5">¥{summary.totalClawback.toLocaleString()}</p></Card>
            <Card padding="sm">
              <p className="text-xs text-text-tertiary">本月净收入</p>
              <p className="text-lg font-bold text-accent mt-0.5">¥{(summary.totalConfirmed - summary.totalClawback + summary.totalTeam).toLocaleString()}</p>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filters.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${filter === f.key ? 'bg-accent text-white' : 'bg-cream-dark text-text-secondary'}`}>
                {f.label}
              </button>
            ))}
          </div>

          {/* Commission list */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <Card padding="sm"><p className="text-sm text-text-tertiary text-center py-4">暂无佣金记录</p></Card>
            ) : (
              filtered.map(c => {
                const amt = typeof c.amount === 'string' ? parseFloat(c.amount) : c.amount
                const badge = typeBadge[c.type] || typeBadge.estimated
                const positive = amt >= 0
                return (
                  <Card key={c.id} padding="sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`shrink-0 px-2 py-0.5 text-[11px] font-medium rounded-full ${badge.cls}`}>{badge.label}</span>
                          <span className="text-xs text-text-tertiary">{fmtDate(c.createdAt)}</span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1 truncate">{c.description}</p>
                      </div>
                      <span className={`shrink-0 ml-3 text-base font-semibold ${positive ? 'text-success' : 'text-danger'}`}>
                        {positive ? '+' : ''}¥{Math.abs(amt).toFixed(2)}
                      </span>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      )}

      {tab === 'withdrawals' && (
        <div className="space-y-4">
          <Card className="text-center" padding="lg">
            <p className="text-sm text-text-tertiary">可提现金额</p>
            <p className="text-4xl font-bold text-text mt-2">¥{withdrawable.toLocaleString()}</p>
            <Button className="mt-4" size="lg" fullWidth onClick={() => setModalOpen(true)}>申请提现</Button>
          </Card>

          <Card padding="sm">
            <p className="text-xs font-medium text-text mb-2">提现规则</p>
            <ul className="space-y-1 text-xs text-text-secondary">
              <li className="flex items-start gap-1.5"><span className="text-accent mt-0.5">•</span>满 ¥1 即可申请提现</li>
              <li className="flex items-start gap-1.5"><span className="text-accent mt-0.5">•</span>提现到账周期为 T+7 个工作日</li>
              <li className="flex items-start gap-1.5"><span className="text-accent mt-0.5">•</span>首次提现需完成实名认证</li>
            </ul>
          </Card>

          {withdrawals.length > 0 && (
            <div>
              <p className="text-sm font-medium text-text mb-2">提现记录</p>
              <div className="space-y-2">
                {withdrawals.map(w => {
                  const badge = statusBadge[w.status] || statusBadge.pending
                  return (
                    <Card key={w.id} padding="sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-text-tertiary">{fmtDate(w.createdAt)}</span>
                          <p className="text-base font-semibold text-text mt-0.5">¥{Number(w.amount).toLocaleString()}</p>
                        </div>
                        <span className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full ${badge.cls}`}>{badge.label}</span>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {withdrawals.length === 0 && (
            <Card><p className="text-sm text-text-tertiary text-center py-4">暂无提现记录</p></Card>
          )}
        </div>
      )}

      {/* Withdraw modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="申请提现">
        <div className="space-y-4 mt-2">
          <div>
            <label className="block text-sm text-text-secondary mb-1">提现金额</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="请输入提现金额"
              className="w-full px-4 py-2.5 rounded-[12px] border border-border-light bg-cream text-text text-sm outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">支付宝账号</label>
            <input type="text" value={alipay} onChange={e => setAlipay(e.target.value)}
              placeholder="请输入支付宝账号"
              className="w-full px-4 py-2.5 rounded-[12px] border border-border-light bg-cream text-text text-sm outline-none focus:border-accent transition-colors" />
          </div>
          <Button fullWidth size="lg" onClick={handleWithdraw}>确认提现</Button>
        </div>
      </Modal>
    </div>
  )
}
