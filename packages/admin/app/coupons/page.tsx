'use client'

import React, { useState } from 'react'

type CouponType = '满减' | '折扣' | '固定'
type CouponStatus = '生效中' | '已过期' | '未开始'

interface Coupon {
  id: string
  name: string
  type: CouponType
  value: number
  condition: string
  issued: number
  total: number
  used: number
  startDate: string
  endDate: string
  status: CouponStatus
}

const MOCK_COUPONS: Coupon[] = [
  { id: 'C1001', name: '新用户满减券', type: '满减', value: 20, condition: '满100可用', issued: 500, total: 1000, used: 320, startDate: '2026-03-01', endDate: '2026-06-30', status: '生效中' },
  { id: 'C1002', name: '会员8折券', type: '折扣', value: 8, condition: '无门槛', issued: 300, total: 500, used: 210, startDate: '2026-02-01', endDate: '2026-04-30', status: '生效中' },
  { id: 'C1003', name: '推广员专属减免', type: '固定', value: 15, condition: '推广员专享', issued: 200, total: 200, used: 180, startDate: '2025-12-01', endDate: '2026-02-28', status: '已过期' },
  { id: 'C1004', name: '五一大促满减', type: '满减', value: 50, condition: '满200可用', issued: 0, total: 2000, used: 0, startDate: '2026-04-25', endDate: '2026-05-05', status: '未开始' },
  { id: 'C1005', name: '限时9折券', type: '折扣', value: 9, condition: '满50可用', issued: 800, total: 1000, used: 650, startDate: '2026-01-15', endDate: '2026-03-15', status: '已过期' },
]

function formatValue(type: CouponType, value: number) {
  if (type === '满减' || type === '固定') return `¥${value}`
  return `${value}折`
}

const statusStyle = (status: CouponStatus) => {
  const map = {
    '生效中': 'bg-success-light text-success',
    '已过期': 'bg-bg-secondary text-text-tertiary',
    '未开始': 'bg-warning-light text-warning',
  }
  return map[status]
}

const typeStyle = (type: CouponType) => {
  const map = {
    '满减': 'bg-accent-light text-accent',
    '折扣': 'bg-warning-light text-warning',
    '固定': 'bg-info-light text-info',
  }
  return map[type]
}

export default function CouponsPage() {
  const [coupons] = useState<Coupon[]>(MOCK_COUPONS)

  const totalIssued = coupons.reduce((s, c) => s + c.issued, 0)
  const totalUsed = coupons.reduce((s, c) => s + c.used, 0)
  const usageRate = totalIssued > 0 ? ((totalUsed / totalIssued) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">优惠券管理</h1>
        <button className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[--radius-sm] transition-colors">
          + 创建优惠券
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
          <p className="text-xs text-text-tertiary mb-1">总发放量</p>
          <p className="text-2xl font-bold text-text">{totalIssued.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
          <p className="text-xs text-text-tertiary mb-1">已使用</p>
          <p className="text-2xl font-bold text-success">{totalUsed.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border-light rounded-[--radius-md] p-4">
          <p className="text-xs text-text-tertiary mb-1">使用率</p>
          <p className="text-2xl font-bold text-accent">{usageRate}%</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">名称</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">类型</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">面值</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">使用条件</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">已发放/总量</th>
                <th className="text-right px-4 py-3 font-medium text-text-secondary">已使用</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">有效期</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">状态</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">操作</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-border-light last:border-b-0 hover:bg-hover transition-colors">
                  <td className="px-4 py-3 text-text font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${typeStyle(c.type)}`}>{c.type}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-text">{formatValue(c.type, c.value)}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.condition}</td>
                  <td className="px-4 py-3 text-right text-text">{c.issued}/{c.total}</td>
                  <td className="px-4 py-3 text-right text-text">{c.used}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{c.startDate} ~ {c.endDate}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${statusStyle(c.status)}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="px-2 py-1 text-xs text-accent hover:bg-accent-light rounded-[--radius-sm] transition-colors">编辑</button>
                      {c.status !== '已过期' && (
                        <button className="px-2 py-1 text-xs text-danger hover:bg-danger-light rounded-[--radius-sm] transition-colors">停用</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-text-tertiary">
        共 {coupons.length} 张优惠券
      </div>
    </div>
  )
}
