'use client'

import React, { useState, useRef, useEffect } from 'react'

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : ""
}

type CouponType = '满减' | '折扣' | '固定金额'
type CouponStatus = '生效中' | '已过期' | '未开始'

interface Coupon {
  id: string
  name: string
  type: CouponType
  value: number
  condition: number
  conditionLabel: string
  issued: number
  total: number
  used: number
  startDate: string
  endDate: string
  status: CouponStatus
}

interface CreateForm {
  name: string
  type: CouponType
  value: string
  condition: string
  startDate: string
  endDate: string
  total: string
}

const EMPTY_FORM: CreateForm = { name: '', type: '满减', value: '', condition: '', startDate: '', endDate: '', total: '' }

function formatValue(type: CouponType, value: number) {
  if (type === '折扣') return `${value}折`
  return `¥${value}`
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
  const map: Record<CouponType, string> = {
    '满减': 'bg-accent-light text-accent',
    '折扣': 'bg-warning-light text-warning',
    '固定金额': 'bg-info-light text-info',
  }
  return map[type]
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState<CreateForm>(EMPTY_FORM)
  const [distDropdown, setDistDropdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const distRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/admin/coupons', {
      headers: { Authorization: 'Bearer ' + getCookie('token') },
    })
      .then(res => res.json())
      .then(json => setCoupons(json.data || json || []))
      .finally(() => setLoading(false))
  }, [])

  const totalIssued = coupons.reduce((s, c) => s + c.issued, 0)
  const totalUsed = coupons.reduce((s, c) => s + c.used, 0)
  const usageRate = totalIssued > 0 ? ((totalUsed / totalIssued) * 100).toFixed(1) : '0'

  // Close distribution dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (distRef.current && !distRef.current.contains(e.target as Node)) {
        setDistDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleCreate() {
    const body = {
      name: form.name,
      type: form.type,
      value: Number(form.value) || 0,
      condition: Number(form.condition) || 0,
      conditionLabel: Number(form.condition) > 0 ? `满${form.condition}可用` : '无门槛',
      total: Number(form.total) || 0,
      startDate: form.startDate,
      endDate: form.endDate,
    }
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (res.ok) {
        const newCoupon: Coupon = json.data || json
        setCoupons(prev => [newCoupon, ...prev])
      }
    } catch {}
    setForm(EMPTY_FORM)
    setShowCreate(false)
  }

  function handleDistribute(couponId: string, target: string) {
    alert(`优惠券 ${couponId} 已${target}`)
    setDistDropdown(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">优惠券管理</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[--radius-sm] transition-colors"
        >
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

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-card border border-border-light rounded-[--radius-md] w-full max-w-md mx-4 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">创建优惠券</h2>
              <button onClick={() => { setShowCreate(false); setForm(EMPTY_FORM) }} className="text-text-tertiary hover:text-text text-xl leading-none">&times;</button>
            </div>
            <div className="space-y-4">
              {/* 名称 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">优惠券名称</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="例：新用户满减券"
                  className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text placeholder:text-text-tertiary focus:outline-none focus:border-accent"
                />
              </div>
              {/* 类型 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">类型</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value as CouponType })}
                  className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text focus:outline-none focus:border-accent"
                >
                  <option value="满减">满减</option>
                  <option value="折扣">折扣</option>
                  <option value="固定金额">固定金额</option>
                </select>
              </div>
              {/* 面额/折扣值 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  {form.type === '折扣' ? '折扣值（如 8 表示8折）' : '面额（元）'}
                </label>
                <input
                  type="number"
                  value={form.value}
                  onChange={e => setForm({ ...form, value: e.target.value })}
                  placeholder={form.type === '折扣' ? '例：8' : '例：20'}
                  className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text placeholder:text-text-tertiary focus:outline-none focus:border-accent"
                />
              </div>
              {/* 使用条件 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">最低消费（元，0为无门槛）</label>
                <input
                  type="number"
                  value={form.condition}
                  onChange={e => setForm({ ...form, condition: e.target.value })}
                  placeholder="例：100"
                  className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text placeholder:text-text-tertiary focus:outline-none focus:border-accent"
                />
              </div>
              {/* 有效期 */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">开始日期</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={e => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">结束日期</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={e => setForm({ ...form, endDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              {/* 发放数量 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">发放数量</label>
                <input
                  type="number"
                  value={form.total}
                  onChange={e => setForm({ ...form, total: e.target.value })}
                  placeholder="例：1000"
                  className="w-full px-3 py-2 text-sm bg-bg border border-border rounded-[--radius-sm] text-text placeholder:text-text-tertiary focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            {/* Modal buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowCreate(false); setForm(EMPTY_FORM) }}
                className="px-4 py-2 text-sm text-text-secondary bg-bg-secondary hover:bg-hover border border-border-light rounded-[--radius-sm] transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.name || !form.value || !form.startDate || !form.endDate || !form.total}
                className="px-4 py-2 text-sm text-white bg-accent hover:bg-accent-hover rounded-[--radius-sm] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                确认创建
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-12 text-center text-text-tertiary">加载中...</div>
          ) : (
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
                    <td className="px-4 py-3 text-text-secondary">{c.conditionLabel}</td>
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
                          <div className="relative" ref={distDropdown === c.id ? distRef : undefined}>
                            <button
                              onClick={() => setDistDropdown(distDropdown === c.id ? null : c.id)}
                              className="px-2 py-1 text-xs text-success hover:bg-success-light rounded-[--radius-sm] transition-colors"
                            >
                              发放
                            </button>
                            {distDropdown === c.id && (
                              <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border-light rounded-[--radius-sm] shadow-lg z-10 overflow-hidden">
                                <button
                                  onClick={() => handleDistribute(c.id, '全员发放')}
                                  className="w-full text-left px-3 py-2 text-sm text-text hover:bg-hover transition-colors"
                                >
                                  全员发放
                                </button>
                                <button
                                  onClick={() => handleDistribute(c.id, '指定推广员客户发放')}
                                  className="w-full text-left px-3 py-2 text-sm text-text hover:bg-hover transition-colors border-t border-border-light"
                                >
                                  指定推广员客户
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        {c.status !== '已过期' && (
                          <button className="px-2 py-1 text-xs text-danger hover:bg-danger-light rounded-[--radius-sm] transition-colors">停用</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs text-text-tertiary">
        共 {coupons.length} 张优惠券
      </div>
    </div>
  )
}
