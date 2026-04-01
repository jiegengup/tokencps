'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ConsumerHeader from '@/components/layout/ConsumerHeader';

const PRODUCTS: Record<string, { name: string; price: number; credit: number; bonus: number; type: string; warning?: string }> = {
  'claude-50': { name: 'Claude API 入门版', price: 50, credit: 50, bonus: 0, type: 'claude' },
  'claude-200': { name: 'Claude API 标准版', price: 200, credit: 220, bonus: 10, type: 'claude' },
  'claude-500': { name: 'Claude API 进阶版', price: 500, credit: 575, bonus: 15, type: 'claude' },
  'claude-2000': { name: 'Claude API 企业版', price: 2000, credit: 2400, bonus: 20, type: 'claude' },
  'gpt-plus': { name: 'GPT Plus 月卡', price: 99, credit: 0, bonus: 0, type: 'gpt', warning: '无质保、不退款、账号问题不负责' },
};

export default function PurchasePage() {
  const params = useParams();
  const productId = params.productId as string;
  const product = PRODUCTS[productId];
  const [payMethod, setPayMethod] = useState('wechat');
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-center">
          <p style={{ color: 'var(--text-secondary)' }}>商品不存在</p>
          <Link href="/products" className="btn-primary mt-4 inline-block">返回商品列表</Link>
        </div>
      </div>
    );
  }

  const handlePay = async () => {
    if (product.warning && !agreed) { alert('请先确认免责声明'); return; }
    setLoading(true);
    // Mock 虎皮椒支付
    setTimeout(() => {
      alert('支付功能待接入虎皮椒，当前为演示模式。\n\n支付成功后将自动发放 API Key。');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ConsumerHeader />
      <div className="max-w-lg mx-auto px-4 py-12">
        <Link href="/products" className="text-sm mb-6 inline-block" style={{ color: 'var(--text-tertiary)' }}>← 返回商品列表</Link>

        <h1 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>确认订单</h1>

        <div className="card p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>{product.name}</div>
              {product.type === 'claude' && (
                <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  到账 ${product.credit} 额度
                  {product.bonus > 0 && <span style={{ color: 'var(--success)' }}> (含赠送{product.bonus}%)</span>}
                </div>
              )}
              {product.type === 'gpt' && (
                <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>独立账号 · 30天有效</div>
              )}
            </div>
            <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>¥{product.price}</div>
          </div>

          {product.warning && (
            <div className="p-3 rounded-lg mb-4 text-sm" style={{ backgroundColor: '#FDF4E0', color: 'var(--warning)' }}>
              ⚠️ {product.warning}
            </div>
          )}

          {product.type === 'claude' && (
            <div className="text-xs p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>
              付款后自动发放 API Key + 接入地址 + 配置教程。按实际 API 调用扣费，支持退款（按剩余额度退）。
            </div>
          )}
        </div>

        {/* 支付方式 */}
        <div className="card p-6 mb-4">
          <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>支付方式</h3>
          <div className="space-y-2">
            {[{ id: 'wechat', label: '微信支付', icon: '💬' }, { id: 'alipay', label: '支付宝', icon: '🔵' }].map(m => (
              <label key={m.id} className="flex items-center p-3 rounded-lg cursor-pointer border" style={{ borderColor: payMethod === m.id ? 'var(--accent)' : 'var(--border-light)', backgroundColor: payMethod === m.id ? 'var(--accent-light)' : 'transparent' }}>
                <input type="radio" name="pay" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="mr-3" />
                <span className="mr-2">{m.icon}</span>
                <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{m.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 免责确认 */}
        {product.warning && (
          <label className="flex items-start space-x-2 mb-4 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1" />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>我已知悉：{product.warning}</span>
          </label>
        )}

        <button onClick={handlePay} disabled={loading || (!!product.warning && !agreed)} className="btn-primary w-full py-3 disabled:opacity-50">
          {loading ? '处理中...' : `支付 ¥${product.price}`}
        </button>

        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-tertiary)' }}>
          支付由虎皮椒提供，支持微信/支付宝 · 费率 0.6%
        </p>
      </div>
    </div>
  );
}
