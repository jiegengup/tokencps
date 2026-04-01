'use client';
import { useState } from 'react';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils';

export default function TeamPage() {
  const [levelFilter, setLevelFilter] = useState(0);
  const stats = { total: 10, level1Count: 3, level1Contribution: 1534, level2Count: 4, level2Contribution: 371, level3Count: 3, level3Contribution: 53, totalContribution: 1958 };
  const allMembers = [
    { id: 'r1', nickname: '小王', phone: '139****1001', level: 1, contribution: 516, joinedAt: '2024-02-01' },
    { id: 'r2', nickname: '小李', phone: '138****2002', level: 1, contribution: 378, joinedAt: '2024-02-15' },
    { id: 'r3', nickname: '小张', phone: '137****3003', level: 1, contribution: 640, joinedAt: '2024-01-20' },
    { id: 'r4', nickname: '小赵', phone: '136****4004', level: 2, contribution: 98, joinedAt: '2024-03-01' },
    { id: 'r5', nickname: '小孙', phone: '135****5005', level: 2, contribution: 156, joinedAt: '2024-03-10' },
    { id: 'r6', nickname: '小周', phone: '134****6006', level: 2, contribution: 72, joinedAt: '2024-03-15' },
    { id: 'r7', nickname: '小吴', phone: '133****7007', level: 2, contribution: 45, joinedAt: '2024-03-20' },
    { id: 'r8', nickname: '小郑', phone: '132****8008', level: 3, contribution: 16, joinedAt: '2024-03-25' },
    { id: 'r9', nickname: '小冯', phone: '131****9009', level: 3, contribution: 9, joinedAt: '2024-03-28' },
    { id: 'r10', nickname: '小陈', phone: '130****0010', level: 3, contribution: 28, joinedAt: '2024-03-30' },
  ];
  const members = levelFilter === 0 ? allMembers : allMembers.filter(m => m.level === levelFilter);
  const levelColors = { 1: 'bg-orange-100 text-orange-700', 2: 'bg-blue-100 text-blue-700', 3: 'bg-green-100 text-green-700' };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
        <nav className="flex space-x-6"><Link href="/dashboard" className="text-gray-700 hover:text-orange-600">推广中心</Link><Link href="/profile" className="text-gray-700 hover:text-orange-600">个人中心</Link></nav>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">我的团队</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">{stats.total}</div><div className="text-sm text-gray-600">团队总人数</div></div>
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">{stats.level1Count}</div><div className="text-sm text-gray-600">一级成员</div></div>
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">{stats.level2Count}</div><div className="text-sm text-gray-600">二级成员</div></div>
          <div className="stat-card text-center"><div className="text-2xl font-bold text-orange-600">{formatMoney(stats.totalContribution)}</div><div className="text-sm text-gray-600">团队总贡献</div></div>
        </div>
        <div className="card p-4 mb-6"><div className="flex items-center justify-between"><div><span className="text-sm text-gray-600">我的邀请码：</span><span className="font-mono text-orange-600 font-bold text-lg">DEMO001</span></div>
          <button onClick={() => { navigator.clipboard.writeText('http://localhost:3000/auth/register?invite=DEMO001'); alert('邀请链接已复制！'); }} className="btn-primary">复制邀请链接</button></div></div>
        <div className="card p-6">
          <div className="flex space-x-2 mb-4">
            {[{ v: 0, l: '全部' }, { v: 1, l: '一级' }, { v: 2, l: '二级' }, { v: 3, l: '三级' }].map(f => (
              <button key={f.v} onClick={() => setLevelFilter(f.v)} className={`px-4 py-2 rounded-lg text-sm ${levelFilter === f.v ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>{f.l}</button>
            ))}
          </div>
          <div className="space-y-3">
            {members.map(m => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">{m.nickname[0]}</div>
                  <div><div className="font-medium text-sm">{m.nickname} <span className={`text-xs px-2 py-0.5 rounded ${levelColors[m.level as keyof typeof levelColors]}`}>{m.level}级</span></div><div className="text-xs text-gray-500">{m.phone} · {m.joinedAt}</div></div>
                </div>
                <div className="text-right"><div className="text-orange-600 font-medium">{formatMoney(m.contribution)}</div><div className="text-xs text-gray-500">贡献佣金</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
