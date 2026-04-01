'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ActivitiesPage() {
  const [tab, setTab] = useState('active');
  const activities = [
    { id: '1', title: '🎉 新人首单佣金翻倍', desc: '新注册推广员首笔成交订单佣金翻倍，最高可得200元额外奖励', start: '2024-03-01', end: '2024-06-30', reward: '佣金翻倍 + 最高200元奖励', status: 'active', participants: 1280 },
    { id: '2', title: '🏆 推广冲刺赛', desc: '本月推广订单数TOP10可获得额外现金奖励，第一名奖励5000元', start: '2024-04-01', end: '2024-04-30', reward: 'TOP1: ¥5000 / TOP2: ¥3000 / TOP3: ¥1000', status: 'active', participants: 856 },
    { id: '3', title: '👥 邀请有礼', desc: '每成功邀请一位好友注册并完成首单，双方各得50元奖励', start: '2024-04-15', end: '2024-05-15', reward: '邀请人+被邀请人各得¥50', status: 'upcoming', participants: 0 },
    { id: '4', title: '🎊 春节推广狂欢', desc: '春节期间所有商品佣金比例上调5%', start: '2024-02-01', end: '2024-02-15', reward: '佣金比例+5%', status: 'ended', participants: 2100 },
  ];
  const filtered = tab === 'all' ? activities : activities.filter(a => a.status === (tab === 'active' ? 'active' : tab === 'upcoming' ? 'upcoming' : 'ended'));
  const statusMap: Record<string, { text: string; class: string }> = { active: { text: '进行中', class: 'bg-green-100 text-green-700' }, upcoming: { text: '即将开始', class: 'bg-blue-100 text-blue-700' }, ended: { text: '已结束', class: 'bg-gray-100 text-gray-700' } };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">运营活动</h1>
        <div className="flex space-x-2 mb-6">
          {[{ v: 'active', l: '进行中' }, { v: 'upcoming', l: '即将开始' }, { v: 'ended', l: '已结束' }, { v: 'all', l: '全部' }].map(t => (
            <button key={t.v} onClick={() => setTab(t.v)} className={`px-4 py-2 rounded-lg text-sm ${tab === t.v ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>{t.l}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map(a => {
            const s = statusMap[a.status];
            return (
              <div key={a.id} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold">{a.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${s.class}`}>{s.text}</span>
                </div>
                <p className="text-gray-600 mb-3">{a.desc}</p>
                <div className="bg-orange-50 rounded-lg p-3 mb-3">
                  <div className="text-sm"><span className="text-gray-600">奖励：</span><span className="text-orange-600 font-medium">{a.reward}</span></div>
                  <div className="text-xs text-gray-500 mt-1">活动时间：{a.start} ~ {a.end}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{a.participants > 0 ? `${a.participants} 人已参与` : '即将开放'}</span>
                  {a.status === 'active' && <button className="btn-primary">立即参与</button>}
                  {a.status === 'upcoming' && <button className="px-6 py-2 border border-orange-500 text-orange-600 rounded-full">提醒我</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
