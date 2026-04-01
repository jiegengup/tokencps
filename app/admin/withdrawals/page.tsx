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

type Withdrawal = {
  id: number
  promoter: string
  amount: string
  method: string
  account: string
  applyTime: string
  status: '待审核' | '已打款' | '已拒绝'
  processTime?: string
}

const initialPending: Withdrawal[] = [
  { id: 1, promoter: '李推广', amount: '¥2,500', method: '支付宝', account: '138****8888', applyTime: '2024-04-01 09:12', status: '待审核' },
  { id: 2, promoter: '王大力', amount: '¥1,800', method: '微信', account: '139****6666', applyTime: '2024-04-01 10:35', status: '待审核' },
  { id: 3, promoter: '陈小花', amount: '¥960', method: '银行卡', account: '6228****1234', applyTime: '2024-04-01 11:20', status: '待审核' },
]

const initialProcessed: Withdrawal[] = [
  { id: 4, promoter: '张推广', amount: '¥3,200', method: '支付宝', account: '136****5555', applyTime: '2024-03-30 14:00', status: '已打款', processTime: '2024-03-30 16:30' },
  { id: 5, promoter: '刘大方', amount: '¥500', method: '微信', account: '137****7777', applyTime: '2024-03-29 09:00', status: '已拒绝', processTime: '2024-03-29 10:00' },
  { id: 6, promoter: '赵销售', amount: '¥1,100', method: '银行卡', account: '6222****9999', applyTime: '2024-03-28 16:00', status: '已打款', processTime: '2024-03-28 18:00' },
]

export default function WithdrawalsPage() {
  const [pending, setPending] = useState<Withdrawal[]>(initialPending)
  const [processed, setProcessed] = useState<Withdrawal[]>(initialProcessed)
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const approve = (id: number) => {
    const item = pending.find(w => w.id === id)!
    setPending(prev => prev.filter(w => w.id !== id))
    setProcessed(prev => [{ ...item, status: '已打款', processTime: new Date().toLocaleString('zh-CN') }, ...prev])
    setSelected(prev => { const s = new Set(prev); s.delete(id); return s })
  }

  const reject = (id: number) => {
    const item = pending.find(w => w.id === id)!
    setPending(prev => prev.filter(w => w.id !== id))
    setProcessed(prev => [{ ...item, status: '已拒绝', processTime: new Date().toLocaleString('zh-CN') }, ...prev])
    setSelected(prev => { const s = new Set(prev); s.delete(id); return s })
  }

  const toggleSelect = (id: number) => {
    setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  }

  const selectAll = () => {
    if (selected.size === pending.length) setSelected(new Set())
    else setSelected(new Set(pending.map(w => w.id)))
  }

  const batchApprove = () => {
    selected.forEach(id => approve(id))
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <AdminNav />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>提现审核</h1>

        {/* 待审核 */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>待审核 ({pending.length})</h2>
            <div className="flex gap-3">
              <button className="btn-secondary text-sm" onClick={selectAll}>{selected.size === pending.length && pending.length > 0 ? '取消全选' : '全选'}</button>
              {selected.size > 0 && <button className="btn-primary text-sm" onClick={batchApprove}>批量通过 ({selected.size})</button>}
            </div>
          </div>
          {pending.length === 0 ? (
            <p className="text-center py-8" style={{ color: 'var(--text-tertiary)' }}>暂无待审核申请</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: 'var(--text-secondary)' }} className="border-b">
                  <th className="text-left py-2 w-8"></th>
                  <th className="text-left py-2">推广员</th>
                  <th className="text-left py-2">金额</th>
                  <th className="text-left py-2">收款方式</th>
                  <th className="text-left py-2">收款账号</th>
                  <th className="text-left py-2">申请时间</th>
                  <th className="text-left py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {pending.map(w => (
                  <tr key={w.id} className="border-b" style={{ color: 'var(--text-primary)' }}>
                    <td className="py-3"><input type="checkbox" checked={selected.has(w.id)} onChange={() => toggleSelect(w.id)} /></td>
                    <td className="py-3 font-medium">{w.promoter}</td>
                    <td className="py-3 font-bold" style={{ color: 'var(--accent)' }}>{w.amount}</td>
                    <td className="py-3">{w.method}</td>
                    <td className="py-3 font-mono">{w.account}</td>
                    <td className="py-3" style={{ color: 'var(--text-tertiary)' }}>{w.applyTime}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="btn-primary text-xs" onClick={() => approve(w.id)}>通过</button>
                        <button className="btn-secondary text-xs" onClick={() => reject(w.id)}>拒绝</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* 已处理 */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>已处理记录</h2>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: 'var(--text-secondary)' }} className="border-b">
                <th className="text-left py-2">推广员</th>
                <th className="text-left py-2">金额</th>
                <th className="text-left py-2">收款方式</th>
                <th className="text-left py-2">收款账号</th>
                <th className="text-left py-2">状态</th>
                <th className="text-left py-2">处理时间</th>
              </tr>
            </thead>
            <tbody>
              {processed.map(w => (
                <tr key={w.id} className="border-b" style={{ color: 'var(--text-primary)' }}>
                  <td className="py-3">{w.promoter}</td>
                  <td className="py-3 font-semibold">{w.amount}</td>
                  <td className="py-3">{w.method}</td>
                  <td className="py-3 font-mono">{w.account}</td>
                  <td className="py-3">
                    <span className={w.status === '已打款' ? 'badge badge-accent' : 'badge'}>{w.status}</span>
                  </td>
                  <td className="py-3" style={{ color: 'var(--text-tertiary)' }}>{w.processTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
