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

type Activity = {
  id: number
  name: string
  source: string
  costCny: string
  costUsd: string
  commission: number
  status: '进行中' | '备用' | '已停止'
}

const initialActivities: Activity[] = [
  { id: 1, name: 'Claude API 推广 (selao)', source: 'selao', costCny: '0.2', costUsd: '1', commission: 50, status: '进行中' },
  { id: 2, name: 'Claude API 推广 (xinxu)', source: 'xinxu', costCny: '0.35', costUsd: '1', commission: 50, status: '备用' },
]

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Activity>>({})
  const [showNew, setShowNew] = useState(false)
  const [newForm, setNewForm] = useState<Partial<Activity>>({ commission: 50, status: '进行中' })

  const startEdit = (a: Activity) => {
    setEditingId(a.id)
    setEditForm({ ...a })
  }

  const saveEdit = () => {
    setActivities(prev => prev.map(a => a.id === editingId ? { ...a, ...editForm } as Activity : a))
    setEditingId(null)
  }

  const addNew = () => {
    const id = Date.now()
    setActivities(prev => [...prev, { id, name: newForm.name || '新活动', source: newForm.source || '', costCny: newForm.costCny || '0', costUsd: newForm.costUsd || '1', commission: newForm.commission || 50, status: newForm.status as Activity['status'] || '备用' }])
    setShowNew(false)
    setNewForm({ commission: 50, status: '进行中' })
  }

  const statusColors: Record<string, string> = {
    '进行中': 'badge badge-accent',
    '备用': 'badge',
    '已停止': 'badge',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <AdminNav />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>活动-货源管理</h1>
          <button className="btn-primary" onClick={() => setShowNew(true)}>+ 新建活动</button>
        </div>

        <div className="card p-0 overflow-hidden mb-6">
          <div className="p-4 border-b" style={{ backgroundColor: '#F5F0E8' }}>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>⚠️ 货源名称和成本信息仅管理员可见，推广员不可见</p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: 'var(--text-secondary)', backgroundColor: '#F9F8F4' }} className="border-b">
                <th className="text-left px-6 py-3">活动名称</th>
                <th className="text-left px-6 py-3">货源（内部）</th>
                <th className="text-left px-6 py-3">成本（内部）</th>
                <th className="text-left px-6 py-3">佣金比例</th>
                <th className="text-left px-6 py-3">状态</th>
                <th className="text-left px-6 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(a => (
                <tr key={a.id} className="border-b" style={{ color: 'var(--text-primary)' }}>
                  {editingId === a.id ? (
                    <>
                      <td className="px-6 py-3"><input className="input text-sm" value={editForm.name || ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} /></td>
                      <td className="px-6 py-3"><input className="input text-sm w-24" value={editForm.source || ''} onChange={e => setEditForm(f => ({ ...f, source: e.target.value }))} /></td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1">
                          <span>¥</span><input className="input text-sm w-16" value={editForm.costCny || ''} onChange={e => setEditForm(f => ({ ...f, costCny: e.target.value }))} />
                          <span>=</span><span>$</span><input className="input text-sm w-12" value={editForm.costUsd || ''} onChange={e => setEditForm(f => ({ ...f, costUsd: e.target.value }))} />
                        </div>
                      </td>
                      <td className="px-6 py-3"><input className="input text-sm w-20" type="number" value={editForm.commission || 0} onChange={e => setEditForm(f => ({ ...f, commission: Number(e.target.value) }))} /></td>
                      <td className="px-6 py-3">
                        <select className="input text-sm" value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value as Activity['status'] }))}>
                          <option>进行中</option><option>备用</option><option>已停止</option>
                        </select>
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <button className="btn-primary text-xs" onClick={saveEdit}>保存</button>
                        <button className="btn-secondary text-xs" onClick={() => setEditingId(null)}>取消</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3 font-medium">{a.name}</td>
                      <td className="px-6 py-3"><span className="font-mono text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F0EBE0', color: 'var(--accent)' }}>{a.source}</span></td>
                      <td className="px-6 py-3 font-mono text-xs">¥{a.costCny} = ${a.costUsd}</td>
                      <td className="px-6 py-3">{a.commission}%</td>
                      <td className="px-6 py-3"><span className={statusColors[a.status]}>{a.status}</span></td>
                      <td className="px-6 py-3"><button className="btn-secondary text-xs" onClick={() => startEdit(a)}>编辑</button></td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showNew && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>新建活动</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>活动名称</label>
                <input className="input w-full" value={newForm.name || ''} onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))} placeholder="活动名称" />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>货源（内部）</label>
                <input className="input w-full" value={newForm.source || ''} onChange={e => setNewForm(f => ({ ...f, source: e.target.value }))} placeholder="如 selao" />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>成本 ¥/每$1</label>
                <input className="input w-full" value={newForm.costCny || ''} onChange={e => setNewForm(f => ({ ...f, costCny: e.target.value }))} placeholder="0.2" />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>佣金比例 %</label>
                <input className="input w-full" type="number" value={newForm.commission || 50} onChange={e => setNewForm(f => ({ ...f, commission: Number(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>状态</label>
                <select className="input w-full" value={newForm.status} onChange={e => setNewForm(f => ({ ...f, status: e.target.value as Activity['status'] }))}>
                  <option>进行中</option><option>备用</option><option>已停止</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="btn-primary" onClick={addNew}>创建</button>
              <button className="btn-secondary" onClick={() => setShowNew(false)}>取消</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
