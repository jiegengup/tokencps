'use client'
import { useState } from 'react'
import PromoterHeader from '@/components/layout/PromoterHeader'

const mockRecords = [
  { id: 1, amount: 500.00, time: '2026-03-28 14:23', status: '已打款', account: '138****9012' },
  { id: 2, amount: 200.00, time: '2026-03-15 09:11', status: '待审核', account: '138****9012' },
  { id: 3, amount: 300.00, time: '2026-03-01 16:45', status: '已拒绝', account: '138****9012' },
]

const statusClass: Record<string, string> = {
  '已打款': 'badge badge-success',
  '待审核': 'badge badge-warning',
  '已拒绝': 'badge badge-danger',
}

export default function WithdrawalPage() {
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState('')
  const balance = 1580.50

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <PromoterHeader />
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>提现</h1>

        {/* 余额卡片 */}
        <div className="card p-6 text-center">
          <div className="stat-label">可提现余额</div>
          <div className="stat-value" style={{ fontSize: '2.5rem', color: 'var(--accent)' }}>¥{balance.toFixed(2)}</div>
        </div>

        {/* 规则说明 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>提现规则</h2>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>• 最低提现金额：<strong style={{ color: 'var(--text-primary)' }}>¥1.00</strong></li>
            <li>• 到账时间：T+7 工作日（审核通过后）</li>
            <li>• 提现前需完成<strong style={{ color: 'var(--accent)' }}>实名认证</strong></li>
          </ul>
        </div>

        {/* 实名认证状态 */}
        <div className="card p-6 flex items-center justify-between">
          <div>
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>实名认证</div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>张 * 明 · 身份证尾号 1234</div>
          </div>
          <span className="badge badge-success">已认证</span>
        </div>

        {/* 提现表单 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>申请提现</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>提现金额（元）</label>
              <input
                className="input w-full"
                type="number"
                placeholder="请输入提现金额"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>最低 ¥1，最高 ¥{balance.toFixed(2)}</div>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>收款方式</label>
              <div className="input w-full flex items-center gap-2" style={{ cursor: 'default' }}>
                <span style={{ color: 'var(--accent)' }}>支付宝</span>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>支付宝账号</label>
              <input
                className="input w-full"
                type="text"
                placeholder="请输入支付宝账号"
                value={account}
                onChange={e => setAccount(e.target.value)}
              />
            </div>
            <button className="btn-primary w-full">提交提现申请</button>
          </div>
        </div>

        {/* 提现记录 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>提现记录</h2>
          <div className="space-y-3">
            {mockRecords.map(r => (
              <div key={r.id} className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div className="font-medium" style={{ color: 'var(--text-primary)' }}>¥{r.amount.toFixed(2)}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{r.time} · 支付宝 {r.account}</div>
                </div>
                <span className={statusClass[r.status]}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
