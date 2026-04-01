'use client'
import Link from 'next/link'
import { useState } from 'react'

const AdminNav = () => (
  <nav style={{ backgroundColor: '#1A1A1A' }} className="px-6 py-3 flex items-center gap-6">
    <span className="text-white font-bold text-lg mr-4">TokenCPS 管理后台</span>
    <Link href="/admin" className="text-white hover:text-orange-300 text-sm">数据概览</Link>
    <Link href="/admin/activities" className="text-white hover:text-orange-300 text-sm">活动管理</Link>
    <Link href="/admin/withdrawals" className="text-white hover:text-orange-300 text-sm">提现审核</Link>
    <Link href="/admin/users" className="text-white hover:text-orange-300 text-sm">用户管理</Link>
    <Link href="/" className="text-gray-400 hover:text-white text-sm ml-auto">返回前台</Link>
  </nav>
)

const recentOrders = [
  { id: 'ORD-20240401-001', user: '张三', plan: 'Pro月度', amount: '¥199', commission: '¥99.5', promoter: '李推广', time: '10:23' },
  { id: 'ORD-20240401-002', user: '王五', plan: 'Basic月度', amount: '¥99', commission: '¥49.5', promoter: '王大力', time: '10:45' },
  { id: 'ORD-20240401-003', user: '赵六', plan: 'Pro年度', amount: '¥1,990', commission: '¥995', promoter: '李推广', time: '11:02' },
  { id: 'ORD-20240401-004', user: '孙七', plan: 'Basic月度', amount: '¥99', commission: '¥49.5', promoter: '陈小花', time: '11:30' },
  { id: 'ORD-20240401-005', user: '周八', plan: 'Pro月度', amount: '¥199', commission: '¥99.5', promoter: '王大力', time: '11:58' },
]

export default function AdminDashboard() {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <AdminNav />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>数据概览</h1>

        {/* 核心指标 */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <div className="stat-value">¥12,800</div>
            <div className="stat-label">今日 GMV</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥5,120</div>
            <div className="stat-label">今日佣金支出</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">¥3,840</div>
            <div className="stat-label">平台利润</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">86</div>
            <div className="stat-label">活跃推广员</div>
          </div>
        </div>

        {/* 财务数据 */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>本月财务数据</h2>
          <div className="grid grid-cols-4 gap-6">
            {[
              { label: '本月 GMV', value: '¥384,000' },
              { label: '佣金支出', value: '¥153,600' },
              { label: '提现金额', value: '¥98,400' },
              { label: '平台利润', value: '¥115,200' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{item.value}</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 最近订单 */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>最近订单</h2>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: 'var(--text-secondary)' }} className="border-b border-gray-200">
                <th className="text-left py-2">订单号</th>
                <th className="text-left py-2">用户</th>
                <th className="text-left py-2">套餐</th>
                <th className="text-left py-2">金额</th>
                <th className="text-left py-2">佣金</th>
                <th className="text-left py-2">推广员</th>
                <th className="text-left py-2">时间</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o.id} className="border-b border-gray-100" style={{ color: 'var(--text-primary)' }}>
                  <td className="py-2 font-mono text-xs">{o.id}</td>
                  <td className="py-2">{o.user}</td>
                  <td className="py-2">{o.plan}</td>
                  <td className="py-2 font-semibold">{o.amount}</td>
                  <td className="py-2" style={{ color: 'var(--accent)' }}>{o.commission}</td>
                  <td className="py-2">{o.promoter}</td>
                  <td className="py-2" style={{ color: 'var(--text-tertiary)' }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
