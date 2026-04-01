import Link from 'next/link';
import { formatMoney } from '@/lib/utils';

export default function AdminDashboard() {
  const platformStats = {
    totalUsers: 10256,
    todayNewUsers: 38,
    totalOrders: 85600,
    todayOrders: 320,
    totalRevenue: 25680000,
    todayRevenue: 96800,
    totalCommission: 12840000,
    todayCommission: 48400,
    pendingWithdrawals: 15,
    pendingAmount: 12500,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 管理后台导航 */}
      <header className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">TokenCPS 管理后台</h1>
              <span className="text-xs px-2 py-1 bg-orange-500 rounded">Admin</span>
            </div>
            <nav className="flex items-center space-x-6 text-sm">
              <Link href="/admin" className="text-orange-400">数据概览</Link>
              <Link href="/admin/users" className="text-gray-300 hover:text-white">用户管理</Link>
              <Link href="/admin/orders" className="text-gray-300 hover:text-white">订单管理</Link>
              <Link href="/admin/products" className="text-gray-300 hover:text-white">商品管理</Link>
              <Link href="/admin/withdrawals" className="text-gray-300 hover:text-white">提现审核</Link>
              <Link href="/" className="text-gray-300 hover:text-white">返回前台</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">数据概览</h2>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="card p-4">
            <div className="text-sm text-gray-500">总用户数</div>
            <div className="text-2xl font-bold mt-1">{platformStats.totalUsers.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">今日 +{platformStats.todayNewUsers}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-500">总订单数</div>
            <div className="text-2xl font-bold mt-1">{platformStats.totalOrders.toLocaleString()}</div>
            <div className="text-xs text-green-600 mt-1">今日 +{platformStats.todayOrders}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-500">总营收</div>
            <div className="text-2xl font-bold mt-1">{formatMoney(platformStats.totalRevenue)}</div>
            <div className="text-xs text-green-600 mt-1">今日 +{formatMoney(platformStats.todayRevenue)}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-500">总佣金支出</div>
            <div className="text-2xl font-bold mt-1">{formatMoney(platformStats.totalCommission)}</div>
            <div className="text-xs text-green-600 mt-1">今日 +{formatMoney(platformStats.todayCommission)}</div>
          </div>
          <div className="card p-4 border-l-4 border-red-500">
            <div className="text-sm text-gray-500">待审核提现</div>
            <div className="text-2xl font-bold text-red-600 mt-1">{platformStats.pendingWithdrawals}</div>
            <div className="text-xs text-red-600 mt-1">金额 {formatMoney(platformStats.pendingAmount)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 最近注册用户 */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">最近注册用户</h3>
              <Link href="/admin/users" className="text-sm text-orange-600">查看全部 →</Link>
            </div>
            <div className="space-y-3">
              {[
                { name: '用户A', phone: '139****1001', time: '5分钟前', status: 'active' },
                { name: '用户B', phone: '138****2002', time: '15分钟前', status: 'active' },
                { name: '用户C', phone: '137****3003', time: '1小时前', status: 'active' },
                { name: '用户D', phone: '136****4004', time: '2小时前', status: 'inactive' },
              ].map((u, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">
                      {u.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.phone}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{u.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 待审核提现 */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">待审核提现</h3>
              <Link href="/admin/withdrawals" className="text-sm text-orange-600">查看全部 →</Link>
            </div>
            <div className="space-y-3">
              {[
                { user: '推广达人', amount: 500, method: '支付宝', time: '10分钟前' },
                { user: '小王', amount: 1200, method: '微信', time: '30分钟前' },
                { user: '张三', amount: 800, method: '银行卡', time: '1小时前' },
              ].map((w, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium">{w.user}</div>
                    <div className="text-xs text-gray-500">{w.method} · {w.time}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-orange-600">{formatMoney(w.amount)}</span>
                    <button className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      通过
                    </button>
                    <button className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                      拒绝
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 热门商品 */}
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">热门推广商品</h3>
              <Link href="/admin/products" className="text-sm text-orange-600">查看全部 →</Link>
            </div>
            <div className="space-y-3">
              {[
                { title: '高端蓝牙耳机', sales: 5680, commission: 59.8 },
                { title: '智能手表', sales: 3200, commission: 79.8 },
                { title: '无线充电器', sales: 2100, commission: 19.8 },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-300">#{i + 1}</span>
                    <div>
                      <div className="text-sm font-medium">{p.title}</div>
                      <div className="text-xs text-gray-500">销量: {p.sales}</div>
                    </div>
                  </div>
                  <span className="text-sm text-orange-600">佣金 {formatMoney(p.commission)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 系统状态 */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">系统状态</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">API 服务</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">正常运行</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm">数据库</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">正常连接</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm">Redis 缓存</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">待配置</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm">支付服务</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">待接入</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
