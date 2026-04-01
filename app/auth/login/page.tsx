'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({ account: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.account.trim()) { setError('请输入手机号或邮箱'); return; }
    if (!formData.password || formData.password.length < 6) { setError('密码长度不能少于6位'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: formData.account, password: formData.password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        login(data.data.token, data.data.user);
        document.cookie = `token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        const redirectTo = data.data.user.role === 'admin' ? '/admin' : '/promoter';
        router.push(redirectTo);
      } else {
        setError(data.message || '登录失败');
      }
    } catch { setError('网络错误'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-sm mx-4">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>TokenCPS</Link>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>登录你的账户</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#FCEAEA', color: 'var(--danger)' }}>{error}</div>}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>手机号 / 邮箱</label>
              <input type="text" value={formData.account} onChange={e => setFormData({ ...formData, account: e.target.value })}
                className="input" placeholder="请输入手机号或邮箱" disabled={loading} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-primary)' }}>密码</label>
              <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="input" placeholder="请输入密码" disabled={loading} />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 disabled:opacity-50">
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          还没有账户？
          <Link href="/auth/register" className="ml-1 font-medium" style={{ color: 'var(--accent)' }}>注册购买</Link>
          <span className="mx-2">·</span>
          <Link href="/auth/register-promoter" className="font-medium" style={{ color: 'var(--accent)' }}>成为推广员</Link>
        </div>
      </div>
    </div>
  );
}
