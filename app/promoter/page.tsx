'use client'

import PromoterHeader from '@/components/layout/PromoterHeader'
import Link from 'next/link'

const mockOrders = [
  { id: 1, userId: 'u***123', product: 'Claude API 套餐 100$', amount: 700, commission: 350, status: '已确认' },
  { id: 2, userId: 'u***456', product: 'GPT Plus 月套餐', amount: 200, commission: 100, status: '待确认' },
  { id: 3, userId: 'u***789', product: 'Claude API 套餐 50$', amount: 350, commission: 175, status: '已确认' },
  { id: 4, userId: 'u***234', product: 'GPT Plus 年套餐', amount: 1400, commission: 700, status: '待确认' },
  { id: 5, userId: 'u***567', product: 'Claude API 套餐 200$', amount: 1400, commission: 700, status: '已确认' },
]

export default function PromoterDashboard() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <PromoterHeader />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>推广员仪表盘</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <div className="stat-card">
            <div className="stat-value">¥128.50</div>
            <div className="stat-label">今日预估佣金</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥2,580</div>
            <div className="stat-label">本月实际佣金</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥1,580.50</div>
            <div className="stat-label">待提现余额</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥15,680</div>
            <div className="stat-label">累计收入</div>
          </div>
        </div>

        {/* Commission Explanation */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>佣金说明</h2>
          <div className="grid grid-cols-2 gap-6">
            <div style={{ borderRight: '1px solid var(--border)', paddingRight: '1.5rem' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-warning">预估佣金</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>用户购买套餐时立即计算，按套餐金额的 50% 估算。此金额尚未最终确认，可能因退款或使用情况调整。</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-success">实际佣金</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>按用户实际使用量结算，每月月末统一确认。确认后的佣金可申请提现，到账时间为 1-3 个工作日。</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>最近订单</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['用户ID', '商品名', '订单金额', '预估佣金', '状态'].map(h => (
                  <th key={h} style={{ color: 'var(--text-tertiary)', fontWeight: 500, padding: '8px 12px', textAlign: 'left', fontSize: '0.85rem' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{order.userId}</td>
                  <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{order.product}</td>
                  <td style={{ padding: '12px', color: 'var(--text-primary)' }}>¥{order.amount}</td>
                  <td style={{ padding: '12px', color: 'var(--accent)', fontWeight: 600 }}>+¥{order.commission}</td>
                  <td style={{ padding: '12px' }}>
                    <span className={order.status === '已确认' ? 'badge badge-success' : 'badge badge-warning'}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>快捷操作</h2>
          <div className="flex gap-4">
            <Link href="/promoter/links" className="btn-primary">生成推广链接</Link>
            <Link href="/promoter/commission" className="btn-secondary">查看佣金明细</Link>
            <button className="btn-secondary">申请提现</button>
          </div>
        </div>
      </main>
    </div>
  )
}
