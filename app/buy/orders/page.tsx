'use client'
import { useEffect, useState } from 'react'
import { Header } from '@/app/buy/components/Header'
import { Modal } from '@shared/components/Modal'
import type { Order } from '@shared/index'

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : ""
}

const statusMap: Record<string, { label: string; cls: string }> = {
  pending: { label: '待支付', cls: 'bg-warning/10 text-warning' },
  paid: { label: '已支付', cls: 'bg-info/10 text-info' },
  completed: { label: '已完成', cls: 'bg-success/10 text-success' },
  refunded: { label: '已退款', cls: 'bg-danger/10 text-danger' },
  cancelled: { label: '已取消', cls: 'bg-border text-text-tertiary' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Order | null>(null)
  const [toast, setToast] = useState('')

  const handleRefund = () => {
    if (!confirm('确认申请退款？提交后将由客服审核处理。')) return
    setToast('退款申请已提交')
    setTimeout(() => setToast(''), 3000)
  }

  useEffect(() => {
    fetch('/api/orders', { headers: { 'Authorization': `Bearer ${getCookie('token')}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setOrders(data.data.items || []); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold text-text mb-6">订单记录</h1>

        {loading ? (
          <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" /></div>
        ) : orders.length === 0 ? (
          <div className="bg-card rounded-xl border border-border-light p-12 text-center">
            <p className="text-text-secondary text-sm">暂无订单记录</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => {
              const s = statusMap[o.status] || statusMap.pending
              return (
                <button key={o.id} onClick={() => setDetail(o)} className="w-full text-left bg-card rounded-xl border border-border-light p-5 hover:border-border transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-text">{o.type === 'claude_api' ? 'Claude API 充值' : 'GPT Plus 月卡'}</div>
                      <div className="text-xs text-text-tertiary mt-0.5">{new Date(o.createdAt).toLocaleString('zh-CN')}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div><span className="text-text-tertiary">支付</span> <span className="text-text font-medium">¥{o.amountCNY}</span></div>
                    <div><span className="text-text-tertiary">到账</span> <span className="text-accent font-medium">${o.amountUSD}</span></div>
                    {o.paymentChannel && <div className="text-text-tertiary">{o.paymentChannel === 'wechat' ? '微信支付' : '支付宝'}</div>}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Order Detail Modal */}
        <Modal open={!!detail} onClose={() => setDetail(null)} title="订单详情" maxWidth="max-w-lg">
          {detail && (
            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm"><span className="text-text-secondary">订单号</span><span className="text-text font-mono text-xs">{detail.id}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">类型</span><span className="text-text">{detail.type === 'claude_api' ? 'Claude API 充值' : 'GPT Plus 月卡'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">支付金额</span><span className="text-text font-medium">¥{detail.amountCNY}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">到账额度</span><span className="text-accent font-medium">${detail.amountUSD}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">支付方式</span><span className="text-text">{detail.paymentChannel === 'wechat' ? '微信支付' : '支付宝'}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">状态</span><span className={`text-xs px-2 py-0.5 rounded-full ${statusMap[detail.status].cls}`}>{statusMap[detail.status].label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-text-secondary">创建时间</span><span className="text-text">{new Date(detail.createdAt).toLocaleString('zh-CN')}</span></div>
              {detail.refundedAmount > 0 && (
                <div className="flex justify-between text-sm"><span className="text-text-secondary">已退款</span><span className="text-danger">¥{detail.refundedAmount}</span></div>
              )}
              {detail.status === 'completed' && (
                <>
                  <div className="border-t border-border-light my-2" />
                  <button onClick={handleRefund} className="w-full text-center text-sm text-danger hover:text-danger/80 py-2 rounded-lg border border-danger/20 hover:bg-danger/5 transition-colors">
                    申请退款
                  </button>
                </>
              )}
            </div>
          )}
        </Modal>

        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border-light shadow-lg rounded-lg px-5 py-3 text-sm text-text animate-fade-in z-50">
            {toast}
          </div>
        )}
      </main>
    </div>
  )
}
