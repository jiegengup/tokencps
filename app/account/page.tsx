'use client';
import { useState } from 'react';
import Link from 'next/link';
import ConsumerHeader from '@/components/layout/ConsumerHeader';

export default function AccountPage() {
  const [showKey, setShowKey] = useState<string | null>(null);

  const account = {
    email: 'demo@tokencps.com',
    balance: 220,
    totalCharged: 400,
    totalUsed: 180,
    keys: [
      { id: 'k1', key: 'sk-tcps-xxxxxxxxxxxxxxxxxxxx1234', name: '主 Key', created: '2024-03-15', lastUsed: '2024-04-01', usage: 150, status: 'active' },
      { id: 'k2', key: 'sk-tcps-xxxxxxxxxxxxxxxxxxxx5678', name: '测试 Key', created: '2024-03-20', lastUsed: '2024-03-28', usage: 30, status: 'active' },
    ],
    orders: [
      { id: 'ORD001', product: 'Claude API 标准版', amount: 200, credit: 220, date: '2024-03-15', status: '已完成' },
      { id: 'ORD002', product: 'Claude API 标准版', amount: 200, credit: 220, date: '2024-04-01', status: '已完成' },
    ],
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>我的账户</h1>

        {/* 余额概览 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="stat-card">
            <div className="stat-label">可用余额</div>
            <div className="stat-value" style={{ color: 'var(--accent)' }}>${account.balance}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">累计充值</div>
            <div className="stat-value">${account.totalCharged}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">已使用</div>
            <div className="stat-value">${account.totalUsed}</div>
          </div>
        </div>

        {/* API Keys */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>API Keys</h2>
            <button className="btn-primary text-sm py-1.5 px-4">创建新 Key</button>
          </div>
          <div className="space-y-3">
            {account.keys.map(k => (
              <div key={k.id} className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{k.name}</span>
                    <span className="badge badge-success">活跃</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setShowKey(showKey === k.id ? null : k.id)} className="text-xs" style={{ color: 'var(--accent)' }}>
                      {showKey === k.id ? '隐藏' : '显示'}
                    </button>
                    <button onClick={() => { navigator.clipboard.writeText(k.key); alert('已复制'); }} className="text-xs" style={{ color: 'var(--accent)' }}>复制</button>
                  </div>
                </div>
                <code className="text-xs block mb-2 font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {showKey === k.id ? k.key : k.key.replace(/(.{12}).*(.{4})/, '$1••••••••$2')}
                </code>
                <div className="flex items-center space-x-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  <span>创建: {k.created}</span>
                  <span>最后使用: {k.lastUsed}</span>
                  <span>已用: ${k.usage}</span>
                </div>
              </div>
            ))}
          </div>

          {/* API 接入信息 */}
          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>接入地址</h4>
            <code className="text-xs font-mono block" style={{ color: 'var(--accent)' }}>https://api.tokencps.com/v1</code>
            <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
              兼容 OpenAI API 格式，可直接替换 base_url 使用。
              <Link href="/guide" className="underline ml-1" style={{ color: 'var(--accent)' }}>查看配置教程</Link>
            </p>
          </div>
        </div>

        {/* 充值记录 */}
        <div className="card p-6">
          <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>充值记录</h2>
          <div className="space-y-2">
            {account.orders.map(o => (
              <div key={o.id} className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{o.product}</div>
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{o.date} · {o.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>¥{o.amount}</div>
                  <div className="text-xs" style={{ color: 'var(--success)' }}>到账 ${o.credit}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/products" className="btn-ghost text-sm mt-4 inline-block">继续充值 →</Link>
        </div>
      </div>
    </div>
  );
}
