import Link from 'next/link';
import { formatMoney, formatDate } from '@/lib/utils';

export default function OrdersPage() {
  // Mock 数据
  const orders = [
    {
      id: '1',
      orderNo: 'ORD1711234567ABC',
      productTitle: '高端蓝牙耳机 降噪无线耳机',
      productImage: '/images/product1.jpg',
      quantity: 1,
      totalAmount: 299.00,
      commission: 59.80,
      status: 'completed',
      createdAt: new Date('2024-03-20'),
      paidAt: new Date('2024-03-20'),
      completedAt: new Date('2024-03-21'),
    },
    {
      id: '2',
      orderNo: 'ORD1711234568DEF',
      productTitle: '智能手表 运动健康监测',
      productImage: '/images/product2.jpg',
      quantity: 1,
      totalAmount: 399.00,
      commission: 79.80,
      status: 'paid',
      createdAt: new Date('2024-03-25'),
      paidAt: new Date('2024-03-25'),
    },
    {
      id: '3',
      orderNo: 'ORD1711234569GHI',
      productTitle: '无线充电器 快充版',
      productImage: '/images/product3.jpg',
      quantity: 2,
      totalAmount: 198.00,
      commission: 39.60,
      status: 'pending',
      createdAt: new Date('2024-03-28'),
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { text: '待支付', class: 'bg-yellow-100 text-yellow-800' },
      paid: { text: '已支付', class: 'bg-blue-100 text-blue-800' },
      completed: { text: '已完成', class: 'bg-green-100 text-green-800' },
      cancelled: { text: '已取消', class: 'bg-gray-100 text-gray-800' },
      refunded: { text: '已退款', class: 'bg-red-100 text-red-800' },
    };
    return badges[status as keyof typeof badges] || badges.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TokenCPS联盟
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link>
              <Link href="/orders" className="text-orange-600 font-medium">订单</Link>
              <Link href="/withdrawal" className="text-gray-700 hover:text-orange-600">提现</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 筛选标签 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              全部订单
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              待支付
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              已支付
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              已完成
            </button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              已取消
            </button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">总订单数</div>
            <div className="text-2xl font-bold text-orange-600">856</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">总佣金</div>
            <div className="text-2xl font-bold text-orange-600">¥15,680</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">本月订单</div>
            <div className="text-2xl font-bold text-orange-600">128</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">本月佣金</div>
            <div className="text-2xl font-bold text-orange-600">¥2,580</div>
          </div>
        </div>

        {/* 订单列表 */}
        <div className="space-y-4">
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div key={order.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">订单号: {order.orderNo}</span>
                    <span className={`text-xs px-2 py-1 rounded ${badge.class}`}>
                      {badge.text}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-3xl">📦</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {order.productTitle}
                    </h3>
                    <div className="text-sm text-gray-500">
                      数量: {order.quantity}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900 mb-1">
                      {formatMoney(order.totalAmount)}
                    </div>
                    <div className="text-sm text-orange-600">
                      佣金: {formatMoney(order.commission)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {order.status === 'pending' && '等待买家付款'}
                    {order.status === 'paid' && `已支付 ${order.paidAt ? formatDate(order.paidAt) : ''}`}
                    {order.status === 'completed' && `已完成 ${order.completedAt ? formatDate(order.completedAt) : ''}`}
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      href={`/orders/${order.id}`}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      查看详情
                    </Link>
                    {order.status === 'pending' && (
                      <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        去支付
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 分页 */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              上一页
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
