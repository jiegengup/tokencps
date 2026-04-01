'use client'

import { useState, useEffect } from 'react'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10

  useEffect(() => {
    fetchUsers()
  }, [search, statusFilter, page])

  const fetchUsers = async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(search && { search }),
      ...(statusFilter !== 'all' && { status: statusFilter })
    })
    const res = await fetch(`/api/admin/users?${params}`)
    const data = await res.json()
    if (data.success) {
      setUsers(data.data.users)
      setTotal(data.data.total)
    }
    setLoading(false)
  }

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'disabled' : 'active'
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, status: newStatus })
    })
    const data = await res.json()
    if (data.success) {
      fetchUsers()
    }
  }

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="搜索手机号或邮箱"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">全部状态</option>
              <option value="active">正常</option>
              <option value="disabled">禁用</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">加载中...</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-[80px_120px_140px_200px_100px_100px_160px_120px_120px] gap-4 min-w-max">
                  <div className="font-semibold text-gray-700 py-3 border-b">ID</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">昵称</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">手机号</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">邮箱</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">角色</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">状态</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">注册时间</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">累计收益</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">操作</div>

                  {users.map((user) => (
                    <>
                      <div key={`${user.id}-id`} className="py-3 border-b text-sm">{user.id}</div>
                      <div key={`${user.id}-nickname`} className="py-3 border-b text-sm">{user.nickname}</div>
                      <div key={`${user.id}-phone`} className="py-3 border-b text-sm">{user.phone}</div>
                      <div key={`${user.id}-email`} className="py-3 border-b text-sm">{user.email}</div>
                      <div key={`${user.id}-role`} className="py-3 border-b text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role === 'admin' ? '管理员' : '普通用户'}
                        </span>
                      </div>
                      <div key={`${user.id}-status`} className="py-3 border-b text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status === 'active' ? '正常' : '禁用'}
                        </span>
                      </div>
                      <div key={`${user.id}-created`} className="py-3 border-b text-sm">{user.createdAt}</div>
                      <div key={`${user.id}-earnings`} className="py-3 border-b text-sm font-semibold text-green-600">¥{user.totalEarnings}</div>
                      <div key={`${user.id}-actions`} className="py-3 border-b text-sm">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`px-3 py-1 rounded text-xs ${
                            user.status === 'active'
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-green-500 text-white hover:bg-green-600'
                          }`}
                        >
                          {user.status === 'active' ? '禁用' : '启用'}
                        </button>
                      </div>
                    </>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                  共 {total} 条记录，第 {page}/{totalPages} 页
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    上一页
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                  >
                    下一页
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
