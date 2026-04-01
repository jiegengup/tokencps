'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPromoterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ phone: '', email: '', password: '', confirmPassword: '', inviteCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.phone.trim()) { setError('请输入手机号'); return; }
    if (!formData.email.trim()) { setError('请输入邮箱'); return; }
    if (!formData.password || formData.password.length < 6) { setError('密码至少6位'); return; }
    if (formData.password !== formData.confirmPassword) { setError('两次密码不一致'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role: 'promoter' }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/auth/login?registered=true');
      } else {
        setError(data.message || '注册失败');
      }
    } catch { setError('网络错误'); }
    finally { setLoading(false); }
  };

  const steps = [
    { num: '1', title: '注册账号', desc: '填写信息完成注册' },
    { num: '2', title: '获取链接', desc: '生成专属推广链接' },
    { num: '3', title: '分享推广', desc: '分享到社群/朋友圈' },
    { num: '4', title: '赚取佣金', desc: '用户下单你拿50%' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>TokenCPS</Link>
          <h1 className="text-3xl font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>成为推广员，零门槛赚钱</h1>
          <p style={{ color: 'var(--text-secondary)' }}>注册 → 拿链接 → 分享 → 到账，就这么简单</p>
        </div>

        {/* 步骤 */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {steps.map(s => (
            <div key={s.num} className="text-center">
              <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: 'var(--accent)', color: 'white' }}>{s.num}</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{s.title}</div>
              <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* 注册表单 */}
        <div className="max-w-sm mx-auto">
          <div className="card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#FCEAEA', color: 'var(--danger)' }}>{error}</div>}

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>手机号</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="input" placeholder="13800138000" disabled={loading} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>邮箱</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="input" placeholder="your@email.com" disabled={loading} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>密码</label>
                <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="input" placeholder="至少6位" disabled={loading} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>确认密码</label>
                <input type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="input" placeholder="再次输入密码" disabled={loading} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>邀请码 <span className="font-normal" style={{ color: 'var(--text-tertiary)' }}>(选填)</span></label>
                <input type="text" value={formData.inviteCode} onChange={e => setFormData({ ...formData, inviteCode: e.target.value })}
                  className="input" placeholder="填写邀请码可获额外奖励" disabled={loading} />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 disabled:opacity-50">
                {loading ? '注册中...' : '注册成为推广员'}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
            已有账户？<Link href="/auth/login" className="ml-1 font-medium" style={{ color: 'var(--accent)' }}>登录</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
