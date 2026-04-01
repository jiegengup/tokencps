'use client'
import PromoterHeader from '@/components/layout/PromoterHeader'

const mockCustomers = [
  { id: 1, nickname: '用户A**', registerTime: '2026-01-15', recharge: 299.00, estimatedCommission: 14.95, actualCommission: 14.95, status: '已结算' },
  { id: 2, nickname: '用户B**', registerTime: '2026-02-03', recharge: 99.00, estimatedCommission: 4.95, actualCommission: 0, status: '待结算' },
  { id: 3, nickname: '用户C**', registerTime: '2026-02-20', recharge: 599.00, estimatedCommission: 29.95, actualCommission: 29.95, status: '已结算' },
  { id: 4, nickname: '用户D**', registerTime: '2026-03-08', recharge: 199.00, estimatedCommission: 9.95, actualCommission: 0, status: '待结算' },
  { id: 5, nickname: '用户E**', registerTime: '2026-03-25', recharge: 0, estimatedCommission: 0, actualCommission: 0, status: '未充值' },
]

const statusClass: Record<string, string> = {
  '已结算': 'badge badge-success',
  '待结算': 'badge badge-warning',
  '未充值': 'badge',
}

export default function CustomersPage() {
  const totalRecharge = mockCustomers.reduce((s, c) => s + c.recharge, 0)
  const totalActual = mockCustomers.reduce((s, c) => s + c.actualCommission, 0)

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <PromoterHeader />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>我推广的用户</h1>

        {/* 概览 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="stat-value">{mockCustomers.length}</div>
            <div className="stat-label">推广用户总数</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥{totalRecharge.toFixed(2)}</div>
            <div className="stat-label">用户总充值</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--accent)' }}>¥{totalActual.toFixed(2)}</div>
            <div className="stat-label">实际获得佣金</div>
          </div>
        </div>

        {/* 用户列表 */}
        <div className="card p-6">
          <div className="text-xs mb-4 px-3 py-2 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>
            根据隐私保护要求，手机号及邮箱信息不予显示。
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th className="text-left py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>昵称</th>
                  <th className="text-left py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>注册时间</th>
                  <th className="text-right py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>充值金额</th>
                  <th className="text-right py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>预估佣金</th>
                  <th className="text-right py-2 pr-4" style={{ color: 'var(--text-tertiary)' }}>实际佣金</th>
                  <th className="text-right py-2" style={{ color: 'var(--text-tertiary)' }}>状态</th>
                </tr>
              </thead>
              <tbody>
                {mockCustomers.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-primary)' }}>{c.nickname}</td>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-secondary)' }}>{c.registerTime}</td>
                    <td className="py-3 pr-4 text-right" style={{ color: 'var(--text-primary)' }}>¥{c.recharge.toFixed(2)}</td>
                    <td className="py-3 pr-4 text-right" style={{ color: 'var(--text-secondary)' }}>¥{c.estimatedCommission.toFixed(2)}</td>
                    <td className="py-3 pr-4 text-right" style={{ color: 'var(--accent)' }}>¥{c.actualCommission.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className={statusClass[c.status] || 'badge'}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
