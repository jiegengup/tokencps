'use client'

import React, { useState, useEffect } from 'react'
import { getCookie } from '@/lib/utils/cookie'

type Role = '推广员' | 'C端用户'
type Status = '正常' | '已封禁'
type Tab = '全部' | '推广员' | 'C端用户' | '已封禁'

interface User {
  id: string
  nickname: string
  role: Role
  registeredAt: string
  orders: number
  totalSpent: number
  status: Status
}

const TABS: Tab[] = ['全部', '推广员', 'C端用户', '已封禁']

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('全部')
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users', {
      headers: { Authorization: 'Bearer ' + getCookie('token') },
    })
      .then(res => res.json())
      .then(json => setUsers(json.data || json || []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = users.filter((u) => {
    if (activeTab === '推广员' && u.role !== '推广员') return false
    if (activeTab === 'C端用户' && u.role !== 'C端用户') return false
    if (activeTab === '已封禁' && u.status !== '已封禁') return false
    if (search && !u.nickname.includes(search) && !u.id.includes(search)) return false
    return true
  })

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold text-text">用户管理</h1>

      {/* Search + Filter Tabs */}
      <div className="bg-card border border-border-light rounded-[--radius-md] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          placeholder="搜索用户ID或昵称…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 h-9 px-3 text-sm rounded-[--radius-sm] border border-border bg-bg text-text placeholder:text-text-tertiary outline-none focus:border-accent transition-colors"
        />
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs rounded-[--radius-sm] font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-hover'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border-light rounded-[--radius-md] overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-12 text-center text-text-tertiary">加载中...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-light bg-bg-secondary/50">
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">用户ID</th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">昵称</th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">角色</th>
                  <th className="text-left px-4 py-3 font-medium text-text-secondary">注册时间</th>
                  <th className="text-right px-4 py-3 font-medium text-text-secondary">订单数</th>
                  <th className="text-right px-4 py-3 font-medium text-text-secondary">累计消费</th>
                  <th className="text-center px-4 py-3 font-medium text-text-secondary">状态</th>
                  <th className="text-center px-4 py-3 font-medium text-text-secondary">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-text-tertiary">暂无匹配用户</td>
                  </tr>
                ) : (
                  filtered.map((u) => (
                    <tr key={u.id} className="border-b border-border-light last:border-b-0 hover:bg-hover transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-text-secondary">{u.id}</td>
                      <td className="px-4 py-3 text-text font-medium">{u.nickname}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          u.role === '推广员'
                            ? 'bg-accent-light text-accent'
                            : 'bg-info-light text-info'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{u.registeredAt}</td>
                      <td className="px-4 py-3 text-right text-text">{u.orders}</td>
                      <td className="px-4 py-3 text-right text-text">¥{u.totalSpent.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          u.status === '正常'
                            ? 'bg-success-light text-success'
                            : 'bg-danger-light text-danger'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="px-2 py-1 text-xs text-accent hover:bg-accent-light rounded-[--radius-sm] transition-colors">查看</button>
                          <button className={`px-2 py-1 text-xs rounded-[--radius-sm] transition-colors ${
                            u.status === '正常'
                              ? 'text-danger hover:bg-danger-light'
                              : 'text-success hover:bg-success-light'
                          }`}>
                            {u.status === '正常' ? '封禁' : '解封'}
                          </button>
                          <button className="px-2 py-1 text-xs text-text-secondary hover:bg-hover rounded-[--radius-sm] transition-colors">标签</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Footer summary */}
      <div className="text-xs text-text-tertiary">
        共 {filtered.length} 条记录
      </div>
    </div>
  )
}
