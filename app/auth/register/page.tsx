'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ phone: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.email.trim()) { setError('请输入邮箱'); return; }
    if (!formData.password || formData.password.length < 6) { setError('密码至少6位'); return; }
    if (formData.password !== formData.confirmPassword) { setError('两次密码不一致'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: formData.phone || '13800000001', role: 'consumer' }),
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

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>TokenCPS</Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>注册账户，开始使用 Claude API</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#FCEAEA', color: 'var(--danger)' }}>{error}</div>}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>邮箱</label>
              <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="input" placeholder="your@email.com" disabled={loading} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>手机号 <span className="font-normal" style={{ color: 'var(--text-tertiary)' }}>(选填)</span></label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="input" placeholder="13800138000" disabled={loading} />
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

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 disabled:opacity-50">
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          <p className="mt-4 text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
            注册即表示同意 <Link href="/terms" className="underline">用户协议</Link> 和 <Link href="/privacy" className="underline">隐私政策</Link>
          </p>
        </div>

        <div className="mt-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          已有账户？<Link href="/auth/login" className="ml-1 font-medium" style={{ color: 'var(--accent)' }}>登录</Link>
        </div>
      </div>
    </div>
  );
}
