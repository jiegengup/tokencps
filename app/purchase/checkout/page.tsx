'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';

type PaymentMethod = 'alipay' | 'wechat' | 'balance';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('alipay');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (items.length === 0) {
      setError('购物车为空');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          items,
          total,
          paymentMethod,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        router.push(`/orders/${data.orderId}`);
      } else {
        const data = await res.json();
        setError(data.message || '支付失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">购物车为空</p>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg"
          >
            去选购
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">确认订单</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* 订单信息 */}
          <div className="col-span-2 space-y-6">
            {/* 商品列表 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">订单商品</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-b-0">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">数量: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-orange-500">¥{item.price}</div>
                      <div className="text-sm text-gray-500">
                        小计: ¥{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 支付方式 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">支付方式</h2>
              <div className="grid grid-cols-3 gap-4">
                <div
                  onClick={() => setPaymentMethod('alipay')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all text-center ${
                    paymentMethod === 'alipay'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-4xl mb-2">💳</div>
                  <div className="font-medium text-gray-900">支付宝</div>
                </div>
                <div
                  onClick={() => setPaymentMethod('wechat')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all text-center ${
                    paymentMethod === 'wechat'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-4xl mb-2">💚</div>
                  <div className="font-medium text-gray-900">微信支付</div>
                </div>
                <div
                  onClick={() => setPaymentMethod('balance')}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all text-center ${
                    paymentMethod === 'balance'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="text-4xl mb-2">💰</div>
                  <div className="font-medium text-gray-900">余额支付</div>
                  {user?.balance !== undefined && (
                    <div className="text-xs text-gray-500 mt-1">
                      余额: ¥{user.balance.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 订单摘要 */}
          <div className="col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">订单摘要</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>商品总额</span>
                  <span>¥{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>优惠</span>
                  <span className="text-green-500">-¥0.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">应付金额</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    ¥{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '处理中...' : '确认支付'}
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                点击确认支付即表示同意服务条款
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
