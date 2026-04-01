'use client'

import { useState, useEffect } from 'react'

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [rejectReason, setRejectReason] = useState('')
  const [rejectingId, setRejectingId] = useState<string | null>(null)

  useEffect(() => {
    fetchWithdrawals()
  }, [statusFilter])

  const fetchWithdrawals = async () => {
    setLoading(true)
    const params = new URLSearchParams({
      ...(statusFilter !== 'all' && { status: statusFilter })
    })
    const res = await fetch(`/api/admin/withdrawals?${params}`)
    const data = await res.json()
    if (data.success) {
      setWithdrawals(data.data.withdrawals)
    }
    setLoading(false)
  }

  const handleApprove = async (id: string) => {
    const res = await fetch('/api/admin/withdrawals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'approve' })
    })
    const data = await res.json()
    if (data.success) {
      alert(data.message)
      fetchWithdrawals()
    }
  }

  const handleReject = async (id: string) => {
    if (!rejectReason.trim()) {
      alert('请填写拒绝原因')
      return
    }
    const res = await fetch('/api/admin/withdrawals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'reject', reason: rejectReason })
    })
    const data = await res.json()
    if (data.success) {
      alert(data.message)
      setRejectingId(null)
      setRejectReason('')
      fetchWithdrawals()
    }
  }

  const statusLabels: Record<string, { text: string; color: string }> = {
    pending: { text: '待审核', color: 'bg-yellow-100 text-yellow-700' },
    processing: { text: '处理中', color: 'bg-blue-100 text-blue-700' },
    completed: { text: '已完成', color: 'bg-green-100 text-green-700' },
    rejected: { text: '已拒绝', color: 'bg-red-100 text-red-700' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">提现审核</h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-2 mb-6">
            {['all', 'pending', 'processing', 'completed', 'rejected'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? '全部' : statusLabels[status].text}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">加载中...</div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-[120px_100px_100px_100px_120px_200px_100px_160px_180px] gap-4 min-w-max">
                <div className="font-semibold text-gray-700 py-3 border-b">用户</div>
                <div className="font-semibold text-gray-700 py-3 border-b">金额</div>
                <div className="font-semibold text-gray-700 py-3 border-b">手续费</div>
                <div className="font-semibold text-gray-700 py-3 border-b">实际到账</div>
                <div className="font-semibold text-gray-700 py-3 border-b">提现方式</div>
                <div className="font-semibold text-gray-700 py-3 border-b">账户</div>
                <div className="font-semibold text-gray-700 py-3 border-b">状态</div>
                <div className="font-semibold text-gray-700 py-3 border-b">申请时间</div>
                <div className="font-semibold text-gray-700 py-3 border-b">操作</div>

                {withdrawals.map((item) => (
                  <>
                    <div key={`${item.id}-user`} className="py-3 border-b text-sm">{item.userName}</div>
                    <div key={`${item.id}-amount`} className="py-3 border-b text-sm font-semibold">¥{item.amount}</div>
                    <div key={`${item.id}-fee`} className="py-3 border-b text-sm text-red-600">¥{item.fee}</div>
                    <div key={`${item.id}-actual`} className="py-3 border-b text-sm font-semibold text-green-600">¥{item.actualAmount}</div>
                    <div key={`${item.id}-method`} className="py-3 border-b text-sm">{item.method}</div>
                    <div key={`${item.id}-account`} className="py-3 border-b text-sm font-mono text-xs">{item.account}</div>
                    <div key={`${item.id}-status`} className="py-3 border-b text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${statusLabels[item.status].color}`}>
                        {statusLabels[item.status].text}
                      </span>
                    </div>
                    <div key={`${item.id}-time`} className="py-3 border-b text-sm">{item.createdAt}</div>
                    <div key={`${item.id}-actions`} className="py-3 border-b text-sm">
                      {item.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                          >
                            通过
                          </button>
                          <button
                            onClick={() => setRejectingId(item.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            拒绝
                          </button>
                        </div>
                      )}
                      {rejectingId === item.id && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <input
                            type="text"
                            placeholder="拒绝原因"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-xs mb-2"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleReject(item.id)}
                              className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                            >
                              确认拒绝
                            </button>
                            <button
                              onClick={() => {
                                setRejectingId(null)
                                setRejectReason('')
                              }}
                              className="px-2 py-1 bg-gray-300 rounded text-xs"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
