'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils';

export default function RankingsPage() {
  const [period, setPeriod] = useState('month');
  const rankings = [
    { rank: 1, nickname: '推广之王', orders: 580, earnings: 28600 },
    { rank: 2, nickname: '佣金猎手', orders: 420, earnings: 21500 },
    { rank: 3, nickname: '分享达人', orders: 380, earnings: 18900 },
    { rank: 4, nickname: '推广达人', orders: 320, earnings: 15680 },
    { rank: 5, nickname: '小王同学', orders: 280, earnings: 13200 },
    { rank: 6, nickname: '营销高手', orders: 250, earnings: 11800 },
    { rank: 7, nickname: '流量王者', orders: 220, earnings: 10500 },
    { rank: 8, nickname: '带货能手', orders: 190, earnings: 9200 },
    { rank: 9, nickname: '推广新星', orders: 160, earnings: 7800 },
    { rank: 10, nickname: '赚钱小能手', orders: 140, earnings: 6500 },
    { rank: 11, nickname: '联盟先锋', orders: 120, earnings: 5800 },
    { rank: 12, nickname: '推广小白', orders: 100, earnings: 4600 },
    { rank: 13, nickname: '佣金收割机', orders: 85, earnings: 3900 },
    { rank: 14, nickname: '分享家', orders: 70, earnings: 3200 },
    { rank: 15, nickname: '新手上路', orders: 50, earnings: 2100 },
  ];
  const myRank = 4;
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
        <nav className="flex space-x-6"><Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link></nav>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">🏆 推广排行榜</h1>
          <p className="text-orange-100">你的当前排名：第 {myRank} 名</p>
        </div>
        <div className="flex justify-center space-x-2 mb-6">
          {[{ v: 'week', l: '本周' }, { v: 'month', l: '本月' }, { v: 'all', l: '总榜' }].map(t => (
            <button key={t.v} onClick={() => setPeriod(t.v)} className={`px-6 py-2 rounded-full text-sm font-medium ${period === t.v ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>{t.l}</button>
          ))}
        </div>
        {/* 前三名 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {rankings.slice(0, 3).map((r, i) => (
            <div key={r.rank} className={`card p-6 text-center ${i === 0 ? 'ring-2 ring-yellow-400' : ''}`}>
              <div className="text-4xl mb-2">{medals[i]}</div>
              <div className="font-bold">{r.nickname}</div>
              <div className="text-2xl font-bold text-orange-600 mt-2">{formatMoney(r.earnings)}</div>
              <div className="text-xs text-gray-500 mt-1">{r.orders} 单</div>
            </div>
          ))}
        </div>
        {/* 排行列表 */}
        <div className="card">
          {rankings.slice(3).map(r => (
            <div key={r.rank} className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 ${r.rank === myRank ? 'bg-orange-50' : ''}`}>
              <div className="flex items-center space-x-4">
                <span className={`w-8 text-center font-bold ${r.rank === myRank ? 'text-orange-600' : 'text-gray-400'}`}>{r.rank}</span>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">{r.nickname[0]}</div>
                <div><div className="font-medium text-sm">{r.nickname} {r.rank === myRank && <span className="text-xs text-orange-600">(我)</span>}</div><div className="text-xs text-gray-500">{r.orders} 单</div></div>
              </div>
              <div className="text-orange-600 font-bold">{formatMoney(r.earnings)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
