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

const promoters = [
  { id: 1, name: '李推广', phone: '138****8888', regTime: '2024-01-15', orders: 48, commission: '¥9,600', status: '正常' },
  { id: 2, name: '王大力', phone: '139****6666', regTime: '2024-02-03', orders: 35, commission: '¥7,000', status: '正常' },
  { id: 3, name: '陈小花', phone: '136****5555', regTime: '2024-02-20', orders: 22, commission: '¥4,400', status: '正常' },
  { id: 4, name: '张推广', phone: '137****7777', regTime: '2024-03-01', orders: 10, commission: '¥2,000', status: '暂停' },
  { id: 5, name: '刘销售', phone: '135****9999', regTime: '2024-03-15', orders: 5, commission: '¥1,000', status: '正常' },
]

const cUsers = [
  { id: 1, name: '张三', email: 'z***g@qq.com', regTime: '2024-03-10', recharge: '¥399', balance: '¥180', promoter: '李推广' },
  { id: 2, name: '王五', email: 'w***u@163.com', regTime: '2024-03-12', recharge: '¥199', balance: '¥50', promoter: '王大力' },
  { id: 3, name: '赵六', email: 'z***u@gmail.com', regTime: '2024-03-18', recharge: '¥1,990', balance: '¥1,200', promoter: '李推广' },
  { id: 4, name: '孙七', email: 's***i@qq.com', regTime: '2024-03-22', recharge: '¥99', balance: '¥20', promoter: '陈小花' },
  { id: 5, name: '周八', email: 'z***a@163.com', regTime: '2024-03-28', recharge: '¥199', balance: '¥130', promoter: '王大力' },
]

export default function UsersPage() {
  const [tab, setTab] = useState<'promoters' | 'cusers'>('promoters')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('全部')

  const filteredPromoters = promoters.filter(p =>
    (search === '' || p.name.includes(search) || p.phone.includes(search)) &&
    (statusFilter === '全部' || p.status === statusFilter)
  )

  const filteredCUsers = cUsers.filter(u =>
    (search === '' || u.name.includes(search) || u.email.includes(search))
  )

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <AdminNav />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>用户管理</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
          {(['promoters', 'cusers'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setSearch(''); setStatusFilter('全部') }}
              className="px-6 py-2 text-sm font-medium transition-colors"
              style={{
                color: tab === t ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {t === 'promoters' ? '推广员' : 'C端用户'}
            </button>
          ))}
        </div>

        {/* 搜索 + 筛选 */}
        <div className="flex gap-4 mb-6">
          <input
            className="input w-64"
            placeholder={tab === 'promoters' ? '搜索昵称/手机号' : '搜索昵称/邮箱'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {tab === 'promoters' && (
            <select className="input" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option>全部</option><option>正常</option><option>暂停</option>
            </select>
          )}
        </div>

        {/* 推广员列表 */}
        {tab === 'promoters' && (
          <div className="card p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: 'var(--text-secondary)', backgroundColor: '#F9F8F4' }} className="border-b">
                  <th className="text-left px-6 py-3">昵称</th>
                  <th className="text-left px-6 py-3">手机号</th>
                  <th className="text-left px-6 py-3">注册时间</th>
                  <th className="text-left px-6 py-3">推广订单数</th>
                  <th className="text-left px-6 py-3">累计佣金</th>
                  <th className="text-left px-6 py-3">状态</th>
                </tr>
              </thead>
              <tbody>
                {filteredPromoters.map(p => (
                  <tr key={p.id} className="border-b" style={{ color: 'var(--text-primary)' }}>
                    <td className="px-6 py-3 font-medium">{p.name}</td>
                    <td className="px-6 py-3 font-mono">{p.phone}</td>
                    <td className="px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{p.regTime}</td>
                    <td className="px-6 py-3">{p.orders}</td>
                    <td className="px-6 py-3 font-semibold" style={{ color: 'var(--accent)' }}>{p.commission}</td>
                    <td className="px-6 py-3">
                      <span className={p.status === '正常' ? 'badge badge-accent' : 'badge'}>{p.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* C端用户列表 */}
        {tab === 'cusers' && (
          <div className="card p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: 'var(--text-secondary)', backgroundColor: '#F9F8F4' }} className="border-b">
                  <th className="text-left px-6 py-3">昵称</th>
                  <th className="text-left px-6 py-3">邮箱</th>
                  <th className="text-left px-6 py-3">注册时间</th>
                  <th className="text-left px-6 py-3">充值金额</th>
                  <th className="text-left px-6 py-3">余额</th>
                  <th className="text-left px-6 py-3">来源推广员</th>
                </tr>
              </thead>
              <tbody>
                {filteredCUsers.map(u => (
                  <tr key={u.id} className="border-b" style={{ color: 'var(--text-primary)' }}>
                    <td className="px-6 py-3 font-medium">{u.name}</td>
                    <td className="px-6 py-3 font-mono text-xs">{u.email}</td>
                    <td className="px-6 py-3" style={{ color: 'var(--text-secondary)' }}>{u.regTime}</td>
                    <td className="px-6 py-3 font-semibold">{u.recharge}</td>
                    <td className="px-6 py-3" style={{ color: 'var(--accent)' }}>{u.balance}</td>
                    <td className="px-6 py-3">{u.promoter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
