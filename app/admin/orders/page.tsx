'use client'

import { useState, useEffect } from 'react'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 10

  useEffect(() => {
    fetchOrders()
  }, [statusFilter, page])

  const fetchOrders = async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(statusFilter !== 'all' && { status: statusFilter })
    })
    const res = await fetch(`/api/admin/orders?${params}`)
    const data = await res.json()
    if (data.success) {
      setOrders(data.data.orders)
      setTotal(data.data.total)
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(total / pageSize)

  const statusLabels: Record<string, { text: string; color: string }> = {
    pending: { text: '待支付', color: 'bg-yellow-100 text-yellow-700' },
    paid: { text: '已支付', color: 'bg-blue-100 text-blue-700' },
    completed: { text: '已完成', color: 'bg-green-100 text-green-700' },
    cancelled: { text: '已取消', color: 'bg-gray-100 text-gray-700' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">订单管理</h1>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex gap-2 mb-6">
            {['all', 'pending', 'paid', 'completed', 'cancelled'].map(status => (
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
            <>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-[140px_200px_120px_120px_100px_100px_100px_160px_140px] gap-4 min-w-max">
                  <div className="font-semibold text-gray-700 py-3 border-b">订单号</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">商品</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">买家</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">推广者</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">金额</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">佣金</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">状态</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">时间</div>
                  <div className="font-semibold text-gray-700 py-3 border-b">操作</div>

                  {orders.map((order) => (
                    <>
                      <div key={`${order.id}-id`} className="py-3 border-b text-sm font-mono">{order.orderNo}</div>
                      <div key={`${order.id}-product`} className="py-3 border-b text-sm">{order.productName}</div>
                      <div key={`${order.id}-buyer`} className="py-3 border-b text-sm">{order.buyerName}</div>
                      <div key={`${order.id}-promoter`} className="py-3 border-b text-sm">{order.promoterName || '-'}</div>
                      <div key={`${order.id}-amount`} className="py-3 border-b text-sm font-semibold">¥{order.amount}</div>
                      <div key={`${order.id}-commission`} className="py-3 border-b text-sm text-green-600">¥{order.commission}</div>
                      <div key={`${order.id}-status`} className="py-3 border-b text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${statusLabels[order.status].color}`}>
                          {statusLabels[order.status].text}
                        </span>
                      </div>
                      <div key={`${order.id}-time`} className="py-3 border-b text-sm">{order.createdAt}</div>
                      <div key={`${order.id}-actions`} className="py-3 border-b text-sm">
                        <button className="text-blue-600 hover:underline text-xs">
                          查看详情
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
