import Link from 'next/link';
import { mockStatistics } from '@/lib/db/config';
import { formatMoney } from '@/lib/utils';

export default function DashboardPage() {
  const stats = mockStatistics;

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
              <Link href="/dashboard" className="text-orange-600 font-medium">推广中心</Link>
              <Link href="/products" className="text-gray-700 hover:text-orange-600">商品库</Link>
              <Link href="/orders" className="text-gray-700 hover:text-orange-600">订单</Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">推广达人</span>
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  👤
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 数据概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">今日收益</div>
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {formatMoney(stats.todayEarnings)}
            </div>
            <div className="text-xs text-gray-500">
              订单数: {stats.todayOrders}
            </div>
          </div>

          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">累计收益</div>
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {formatMoney(stats.totalEarnings)}
            </div>
            <div className="text-xs text-gray-500">
              总订单: {stats.totalOrders}
            </div>
          </div>

          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">今日点击</div>
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {stats.todayClicks}
            </div>
            <div className="text-xs text-gray-500">
              总点击: {stats.totalClicks}
            </div>
          </div>

          <div className="stat-card">
            <div className="text-sm text-gray-600 mb-1">转化率</div>
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {stats.conversionRate}%
            </div>
            <div className="text-xs text-gray-500">
              持续优化中
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 快捷操作 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">快捷操作</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/products" className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition">
                  <span className="text-3xl mb-2">🔍</span>
                  <span className="text-sm">选品推广</span>
                </Link>
                <Link href="/promotions" className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition">
                  <span className="text-3xl mb-2">🔗</span>
                  <span className="text-sm">推广链接</span>
                </Link>
                <Link href="/orders" className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition">
                  <span className="text-3xl mb-2">📊</span>
                  <span className="text-sm">订单查询</span>
                </Link>
                <Link href="/withdrawal" className="flex flex-col items-center p-4 hover:bg-orange-50 rounded-lg transition">
                  <span className="text-3xl mb-2">💰</span>
                  <span className="text-sm">申请提现</span>
                </Link>
              </div>
            </div>

            {/* 推广数据趋势 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">推广数据趋势</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <span className="text-gray-400">图表区域（待集成 Chart.js）</span>
              </div>
            </div>

            {/* 最近订单 */}
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">最近订单</h3>
                <Link href="/orders" className="text-sm text-orange-600 hover:text-orange-700">
                  查看全部 →
                </Link>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        📦
                      </div>
                      <div>
                        <div className="font-medium text-sm">高端蓝牙耳机</div>
                        <div className="text-xs text-gray-500">2024-03-{20 + i} 14:30</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-600 font-medium">+¥59.80</div>
                      <div className="text-xs text-green-600">已结算</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="space-y-6">
            {/* 账户信息 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">账户信息</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">可提现余额</span>
                  <span className="font-bold text-orange-600">¥1,580.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">待结算</span>
                  <span className="font-medium">¥320.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">已提现</span>
                  <span className="font-medium">¥14,100.00</span>
                </div>
                <button className="w-full btn-primary py-2 mt-4">
                  申请提现
                </button>
              </div>
            </div>

            {/* 推广工具 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">推广工具</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">我的邀请码</span>
                    <span className="text-orange-600 font-mono">DEMO001</span>
                  </div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                  <div className="text-sm">生成推广海报</div>
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition">
                  <div className="text-sm">推广素材库</div>
                </button>
              </div>
            </div>

            {/* 公告通知 */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">公告通知</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-orange-600 mb-1">🎉 新人福利</div>
                  <div className="text-gray-600 text-xs">首单佣金翻倍活动进行中</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium mb-1">📢 系统升级</div>
                  <div className="text-gray-600 text-xs">今晚22:00-23:00系统维护</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
