'use client';
import { useState } from 'react';
import Link from 'next/link';
import BarChart from '@/components/ui/BarChart';
import LineChart from '@/components/ui/LineChart';
import { formatMoney } from '@/lib/utils';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('week');
  const earningsData = [
    { label: '周一', value: 320 }, { label: '周二', value: 480 }, { label: '周三', value: 560 },
    { label: '周四', value: 420 }, { label: '周五', value: 680 }, { label: '周六', value: 890 }, { label: '周日', value: 750 },
  ];
  const sourceData = [
    { label: 'API套餐', value: 45 }, { label: '蓝牙耳机', value: 28 }, { label: '智能手表', value: 18 },
    { label: '充电器', value: 12 }, { label: '其他', value: 8 },
  ];
  const funnel = [
    { stage: '页面展示', count: 12580, rate: 100 },
    { stage: '链接点击', count: 3680, rate: 29.3 },
    { stage: '下单', count: 1240, rate: 33.7 },
    { stage: '支付', count: 980, rate: 79.0 },
    { stage: '完成', count: 856, rate: 87.3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
        <nav className="flex space-x-6"><Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link><Link href="/dashboard/analytics" className="text-orange-600 font-medium">数据分析</Link></nav>
      </div></header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">数据分析</h1>
          <div className="flex space-x-2">
            {[{ v: 'today', l: '今日' }, { v: 'week', l: '本周' }, { v: 'month', l: '本月' }].map(t => (
              <button key={t.v} onClick={() => setPeriod(t.v)} className={`px-4 py-2 rounded-lg text-sm ${period === t.v ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}>{t.l}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card p-6"><LineChart data={earningsData} title="收益趋势" /></div>
          <div className="card p-6"><BarChart data={sourceData} title="订单来源分布" /></div>
        </div>
        {/* 转化漏斗 */}
        <div className="card p-6 mb-6">
          <h4 className="font-semibold mb-6">转化漏斗</h4>
          <div className="space-y-3">
            {funnel.map((f, i) => (
              <div key={i} className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 w-20">{f.stage}</span>
                <div className="flex-1 flex justify-center">
                  <div className="h-10 rounded transition-all duration-500 flex items-center justify-center text-white text-sm font-medium"
                    style={{ width: `${f.rate}%`, backgroundColor: `rgba(249, 115, 22, ${1 - i * 0.15})` }}>
                    {f.count.toLocaleString()}
                  </div>
                </div>
                <span className="text-sm text-gray-500 w-16 text-right">{i > 0 ? `${f.rate}%` : ''}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">{formatMoney(4100)}</div><div className="text-sm text-gray-600">本周收益</div></div>
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">856</div><div className="text-sm text-gray-600">成交订单</div></div>
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">6.8%</div><div className="text-sm text-gray-600">转化率</div></div>
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">{formatMoney(4.79)}</div><div className="text-sm text-gray-600">客单价佣金</div></div>
        </div>
      </div>
    </div>
  );
}
