'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [config, setConfig] = useState({
    platformName: 'TokenCPS联盟', commissionRate: 50, minWithdrawal: 10, withdrawalFee: 1,
    level1Rate: 50, level2Rate: 10, level3Rate: 5,
    dailyWithdrawalLimit: 50000, clickRateLimit: 10, orderRateLimit: 3,
  });
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const update = (key: string, value: string) => setConfig(prev => ({ ...prev, [key]: isNaN(Number(value)) ? value : Number(value) }));

  const sections = [
    { title: '基础配置', fields: [
      { key: 'platformName', label: '平台名称', type: 'text' },
      { key: 'commissionRate', label: '基础佣金比例 (%)', type: 'number' },
      { key: 'minWithdrawal', label: '最低提现金额 (元)', type: 'number' },
      { key: 'withdrawalFee', label: '提现手续费率 (%)', type: 'number' },
    ]},
    { title: '分销配置', fields: [
      { key: 'level1Rate', label: '一级佣金比例 (%)', type: 'number' },
      { key: 'level2Rate', label: '二级佣金比例 (%)', type: 'number' },
      { key: 'level3Rate', label: '三级佣金比例 (%)', type: 'number' },
    ]},
    { title: '风控配置', fields: [
      { key: 'dailyWithdrawalLimit', label: '单日提现上限 (元)', type: 'number' },
      { key: 'clickRateLimit', label: '点击频率限制 (次/小时)', type: 'number' },
      { key: 'orderRateLimit', label: '订单频率限制 (次/小时)', type: 'number' },
    ]},
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white"><div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4"><h1 className="text-xl font-bold">TokenCPS 管理后台</h1><span className="text-xs px-2 py-1 bg-orange-500 rounded">Admin</span></div>
        <nav className="flex space-x-6 text-sm">
          <Link href="/admin" className="text-gray-300 hover:text-white">数据概览</Link>
          <Link href="/admin/settings" className="text-orange-400">系统配置</Link>
          <Link href="/" className="text-gray-300 hover:text-white">返回前台</Link>
        </nav>
      </div></header>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">系统配置</h2>
        {saved && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">✅ 配置保存成功</div>}
        {sections.map(s => (
          <div key={s.title} className="card p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">{s.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {s.fields.map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input type={f.type} value={config[f.key as keyof typeof config]} onChange={e => update(f.key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleSave} className="btn-primary px-8 py-3">保存配置</button>
      </div>
    </div>
  );
}
