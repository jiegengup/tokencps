import Link from 'next/link';
import { formatMoney, formatDate } from '@/lib/utils';

export default function PromotionsPage() {
  // Mock 数据
  const promotionLinks = [
    {
      id: '1',
      productTitle: '高端蓝牙耳机 降噪无线耳机',
      shortCode: 'ABC123',
      fullUrl: 'http://localhost:3000/p/ABC123',
      clicks: 156,
      orders: 12,
      earnings: 718.00,
      conversionRate: 7.7,
      createdAt: new Date('2024-03-15'),
    },
    {
      id: '2',
      productTitle: '智能手表 运动健康监测',
      shortCode: 'DEF456',
      fullUrl: 'http://localhost:3000/p/DEF456',
      clicks: 89,
      orders: 7,
      earnings: 558.60,
      conversionRate: 7.9,
      createdAt: new Date('2024-03-20'),
    },
    {
      id: '3',
      productTitle: '无线充电器 快充版',
      shortCode: 'GHI789',
      fullUrl: 'http://localhost:3000/p/GHI789',
      clicks: 45,
      orders: 3,
      earnings: 118.80,
      conversionRate: 6.7,
      createdAt: new Date('2024-03-25'),
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: 显示复制成功提示
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
              <Link href="/products" className="text-gray-700 hover:text-orange-600">商品库</Link>
              <Link href="/promotions" className="text-orange-600 font-medium">推广管理</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">推广链接管理</h1>
          <Link href="/products" className="btn-primary">
            + 创建新推广链接
          </Link>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">推广链接数</div>
            <div className="text-2xl font-bold text-orange-600">
              {promotionLinks.length}
            </div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">总点击量</div>
            <div className="text-2xl font-bold text-orange-600">
              {promotionLinks.reduce((sum, link) => sum + link.clicks, 0)}
            </div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">总订单数</div>
            <div className="text-2xl font-bold text-orange-600">
              {promotionLinks.reduce((sum, link) => sum + link.orders, 0)}
            </div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">总收益</div>
            <div className="text-2xl font-bold text-orange-600">
              {formatMoney(promotionLinks.reduce((sum, link) => sum + link.earnings, 0))}
            </div>
          </div>
        </div>

        {/* 推广链接列表 */}
        <div className="space-y-4">
          {promotionLinks.map((link) => (
            <div key={link.id} className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {link.productTitle}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-500">推广链接:</span>
                    <code className="text-sm bg-gray-100 px-3 py-1 rounded">
                      {link.fullUrl}
                    </code>
                    <button
                      onClick={() => copyToClipboard(link.fullUrl)}
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      📋 复制
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">
                    创建时间: {formatDate(link.createdAt)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{link.clicks}</div>
                  <div className="text-sm text-gray-500 mt-1">点击量</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{link.orders}</div>
                  <div className="text-sm text-gray-500 mt-1">订单数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatMoney(link.earnings)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">收益</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {link.conversionRate}%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">转化率</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-end space-x-2">
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  查看数据
                </button>
                <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                  生成海报
                </button>
                <button className="px-4 py-2 text-sm text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50">
                  分享链接
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 推广技巧 */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">💡 推广技巧</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <div className="font-medium mb-1">1. 选择热门商品</div>
              <div className="text-gray-600">高佣金、高销量的商品更容易转化</div>
            </div>
            <div>
              <div className="font-medium mb-1">2. 精准投放</div>
              <div className="text-gray-600">在相关社群、论坛分享推广链接</div>
            </div>
            <div>
              <div className="font-medium mb-1">3. 优化文案</div>
              <div className="text-gray-600">使用吸引人的标题和描述</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
