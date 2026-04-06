'use client';
import Link from 'next/link';
import { formatMoney } from '@/lib/utils';

export default function MembershipPage() {
  const totalEarnings = 15680;
  const levels = [
    { name: '青铜', threshold: 0, bonus: 0, icon: '🥉' },
    { name: '白银', threshold: 1000, bonus: 2, icon: '⬜' },
    { name: '黄金', threshold: 5000, bonus: 5, icon: '🥇' },
    { name: '铂金', threshold: 20000, bonus: 8, icon: '💎' },
    { name: '钻石', threshold: 50000, bonus: 12, icon: '👑' },
  ];
  const currentIdx = 2; // 黄金
  const next = levels[3];
  const progress = Math.round(((totalEarnings - 5000) / (20000 - 5000)) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm"><div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">TokenCPS联盟</Link>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-5xl">🥇</span>
            <div><div className="text-sm opacity-80">当前等级</div><div className="text-3xl font-bold">黄金推广员</div></div>
          </div>
          <div className="mb-2 flex justify-between text-sm"><span>距离铂金还需 {formatMoney(next.threshold - totalEarnings)}</span><span>{progress}%</span></div>
          <div className="w-full bg-white/30 rounded-full h-3"><div className="bg-white rounded-full h-3 transition-all" style={{ width: `${progress}%` }}></div></div>
        </div>
        <div className="card p-6 mb-6">
          <h3 className="font-semibold mb-4">当前权益</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['佣金+5%', '专属客服', '提现免手续费', '活动优先参与'].map(b => (
              <div key={b} className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg"><span className="text-green-500">✓</span><span className="text-sm">{b}</span></div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-4">等级对比</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b">
                <th className="py-3 text-left">等级</th><th className="py-3">门槛</th><th className="py-3">佣金加成</th><th className="py-3">专属客服</th><th className="py-3">免手续费</th>
              </tr></thead>
              <tbody>
                {levels.map((l, i) => (
                  <tr key={l.name} className={`border-b ${i === currentIdx ? 'bg-orange-50 font-medium' : ''}`}>
                    <td className="py-3">{l.icon} {l.name} {i === currentIdx && <span className="text-xs text-orange-600">(当前)</span>}</td>
                    <td className="py-3 text-center">{formatMoney(l.threshold)}</td>
                    <td className="py-3 text-center text-orange-600">+{l.bonus}%</td>
                    <td className="py-3 text-center">{i >= 2 ? '✓' : '—'}</td>
                    <td className="py-3 text-center">{i >= 2 ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
