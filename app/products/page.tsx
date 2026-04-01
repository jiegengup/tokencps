'use client';
import Link from 'next/link';
import ConsumerHeader from '@/components/layout/ConsumerHeader';
import ConsumerFooter from '@/components/layout/ConsumerFooter';

export default function ProductsPage() {
  const claudePackages = [
    { id: 'claude-50', tier: '入门', charge: 50, bonus: 0, credit: 50, profit: '30%' },
    { id: 'claude-200', tier: '标准', charge: 200, bonus: 10, credit: 220, profit: '28%', popular: true },
    { id: 'claude-500', tier: '进阶', charge: 500, bonus: 15, credit: 575, profit: '27%' },
    { id: 'claude-2000', tier: '企业', charge: 2000, bonus: 20, credit: 2400, profit: '26%' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>商品列表</h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>选择适合你的套餐，¥1 = $1 Claude 使用额度</p>

        {/* Claude API 套餐 */}
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>⚡ Claude API 套餐</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {claudePackages.map(p => (
            <div key={p.id} className={`card p-6 relative ${p.popular ? 'ring-2' : ''}`} style={p.popular ? { borderColor: 'var(--accent)' } : {}}>
              {p.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge badge-accent px-3 py-1">热门</div>}
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{p.tier}</div>
              <div className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>¥{p.charge}</div>
              <div className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                到账 ${p.credit} 额度
                {p.bonus > 0 && <span style={{ color: 'var(--success)' }}> (+{p.bonus}%赠送)</span>}
              </div>
              <ul className="space-y-2 mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>✓ Claude Opus 4.6 全模型</li>
                <li>✓ 自动发放 API Key</li>
                <li>✓ 按实际用量扣费</li>
                {p.bonus > 0 && <li style={{ color: 'var(--success)' }}>✓ 额外赠送 {p.bonus}% 额度</li>}
              </ul>
              <Link href={`/purchase/${p.id}`} className={`btn-primary w-full py-2.5 text-center block ${p.popular ? '' : 'btn-secondary'}`}>
                立即购买
              </Link>
            </div>
          ))}
        </div>

        {/* GPT Plus */}
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>🤖 GPT Plus 月卡</h2>
        <div className="card p-6 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>GPT Plus 独立账号</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>30天有效 · 独立账号密码</div>
            </div>
            <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>¥99</div>
          </div>
          <div className="p-3 rounded-lg mb-4 text-sm" style={{ backgroundColor: '#FDF4E0', color: 'var(--warning)' }}>
            ⚠️ 无质保、不退款、账号问题不负责。购买即表示知悉。
          </div>
          <Link href="/purchase/gpt-plus" className="btn-primary w-full py-2.5 text-center block">购买月卡</Link>
        </div>
      </div>
      <ConsumerFooter />
    </div>
  );
}
