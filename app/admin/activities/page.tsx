'use client'

import React, { useState } from 'react'

type Activity = {
  id: number
  name: string
  supplier: string
  commission: string
  parentCommission: string
  description: string
  online: boolean
  participants: number
  orders: number
  status: '进行中' | '已结束' | '草稿'
  createdAt: string
}

const SUPPLIERS = ['Anthropic', 'OpenAI', 'Google', 'DeepSeek', '字节跳动', '阿里云'] as const

const MOCK_ACTIVITIES: Activity[] = [
  { id: 1, name: 'Claude API推广', supplier: 'Anthropic', commission: '15', parentCommission: '5', description: 'Claude API套餐推广活动', online: true, participants: 1280, orders: 3456, status: '进行中', createdAt: '2026-03-01' },
  { id: 2, name: 'GPT Plus推广', supplier: 'OpenAI', commission: '12', parentCommission: '4', description: 'GPT Plus账号推广', online: true, participants: 960, orders: 2180, status: '进行中', createdAt: '2026-02-15' },
  { id: 3, name: 'Gemini Pro推广', supplier: 'Google', commission: '10', parentCommission: '3', description: 'Gemini Pro推广活动', online: false, participants: 540, orders: 1120, status: '已结束', createdAt: '2026-01-20' },
  { id: 4, name: 'DeepSeek推广', supplier: 'DeepSeek', commission: '18', parentCommission: '6', description: 'DeepSeek模型推广', online: true, participants: 720, orders: 1890, status: '进行中', createdAt: '2026-03-10' },
  { id: 5, name: '豆包推广', supplier: '字节跳动', commission: '14', parentCommission: '4', description: '豆包大模型推广', online: false, participants: 310, orders: 680, status: '草稿', createdAt: '2026-03-20' },
  { id: 6, name: '通义千问推广', supplier: '阿里云', commission: '13', parentCommission: '4', description: '通义千问推广活动', online: false, participants: 450, orders: 920, status: '已结束', createdAt: '2025-12-05' },
]

const TABS = ['全部', '进行中', '已结束', '草稿'] as const

type ModalForm = {
  name: string
  supplier: string
  commission: string
  parentCommission: string
  description: string
}

const emptyForm: ModalForm = { name: '', supplier: 'Anthropic', commission: '', parentCommission: '', description: '' }

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState<string>('全部')
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<ModalForm>(emptyForm)

  const filtered = activeTab === '全部' ? activities : activities.filter(a => a.status === activeTab)

  const toggleOnline = (id: number) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, online: !a.online } : a))
  }

  const openCreate = () => {
    setEditingId(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (activity: Activity) => {
    setEditingId(activity.id)
    setForm({
      name: activity.name,
      supplier: activity.supplier,
      commission: activity.commission,
      parentCommission: activity.parentCommission,
      description: activity.description,
    })
    setModalOpen(true)
  }

  const handleSave = () => {
    if (!form.name || !form.commission || !form.parentCommission) return
    if (editingId !== null) {
      setActivities(prev => prev.map(a => a.id === editingId ? {
        ...a, name: form.name, supplier: form.supplier,
        commission: form.commission, parentCommission: form.parentCommission,
        description: form.description,
      } : a))
    } else {
      const newActivity: Activity = {
        id: Date.now(), name: form.name, supplier: form.supplier,
        commission: form.commission, parentCommission: form.parentCommission,
        description: form.description, online: false, participants: 0,
        orders: 0, status: '草稿', createdAt: new Date().toISOString().slice(0, 10),
      }
      setActivities(prev => [newActivity, ...prev])
    }
    setModalOpen(false)
  }

  const statusBadge = (status: Activity['status']) => {
    const map = {
      '进行中': 'bg-success-light text-success',
      '已结束': 'bg-bg-secondary text-text-tertiary',
      '草稿': 'bg-warning-light text-warning',
    }
    return map[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">活动管理</h1>
        <button onClick={openCreate} className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-[--radius-sm] transition-colors">
          + 创建活动
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-bg-secondary p-1 rounded-[--radius-sm] w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-sm rounded-[--radius-sm] transition-colors ${
              activeTab === tab
                ? 'bg-card text-text font-medium shadow-sm'
                : 'text-text-secondary hover:text-text'
            }`}
          >
            {tab}
            {tab !== '全部' && (
              <span className="ml-1.5 text-xs text-text-tertiary">
                {activities.filter(a => a.status === tab).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Activity Cards */}
      <div className="grid gap-4">
        {filtered.map(activity => (
          <div key={activity.id} className="bg-card border border-border-light rounded-[--radius-md] p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-base font-semibold text-text">{activity.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="text-text-tertiary">货源</span>
                    <p className="text-text font-medium">{activity.supplier}</p>
                  </div>
                  <div>
                    <span className="text-text-tertiary">佣金比例</span>
                    <p className="text-accent font-semibold">{activity.commission}%</p>
                  </div>
                  <div>
                    <span className="text-text-tertiary">参与人数</span>
                    <p className="text-text font-medium">{activity.participants.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-text-tertiary">总订单</span>
                    <p className="text-text font-medium">{activity.orders.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-xs text-text-tertiary mt-3">创建时间: {activity.createdAt}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 ml-6 shrink-0">
                <span className="text-xs text-text-tertiary">{activity.online ? '已上线' : '已下线'}</span>
                <button
                  onClick={() => toggleOnline(activity.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    activity.online ? 'bg-success' : 'bg-border'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    activity.online ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </button>
                <button
                  onClick={() => openEdit(activity)}
                  className="mt-1 px-3 py-1 text-xs text-accent border border-border-light rounded-[--radius-sm] hover:bg-hover transition-colors"
                >
                  编辑
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-text-tertiary text-sm">
          暂无活动数据
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div className="relative bg-card border border-border-light rounded-[--radius-md] shadow-xl w-full max-w-lg mx-4 p-6">
            <h2 className="text-lg font-bold text-text mb-5">
              {editingId !== null ? '编辑活动' : '创建活动'}
            </h2>
            <div className="space-y-4">
              {/* 活动名称 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">活动名称</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="请输入活动名称"
                  className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors"
                />
              </div>
              {/* 货源 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">货源</label>
                <select
                  value={form.supplier}
                  onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))}
                  className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors"
                >
                  {SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {/* 佣金比例 + 上级抽成 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">佣金比例(%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.commission}
                    onChange={e => setForm(f => ({ ...f, commission: e.target.value }))}
                    placeholder="如 15"
                    className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">上级抽成比例(%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.parentCommission}
                    onChange={e => setForm(f => ({ ...f, parentCommission: e.target.value }))}
                    placeholder="如 5"
                    className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              {/* 活动描述 */}
              <div>
                <label className="block text-sm text-text-secondary mb-1">活动描述</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="请输入活动描述"
                  rows={3}
                  className="w-full px-3 py-2 text-sm text-text bg-bg border border-border rounded-[--radius-sm] outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-sm text-text-secondary border border-border rounded-[--radius-sm] hover:bg-hover transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-accent hover:bg-accent-hover text-white font-medium rounded-[--radius-sm] transition-colors"
              >
                {editingId !== null ? '保存修改' : '创建'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}