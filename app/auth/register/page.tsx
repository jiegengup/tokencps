'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteCode: '',
    agreed: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleGetCode = async () => {
    if (!formData.phone.trim()) {
      setError('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setError('请输入正确的手机号');
      return;
    }

    setError('');
    setCountdown(60);

    try {
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || '发送验证码失败');
        setCountdown(0);
      }
    } catch (err) {
      setError('网络错误，请重试');
      setCountdown(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 表单验证
    if (!formData.phone.trim()) {
      setError('请输入手机号');
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      setError('请输入正确的手机号');
      return;
    }
    if (!formData.code.trim()) {
      setError('请输入验证码');
      return;
    }
    if (!formData.email.trim()) {
      setError('请输入邮箱');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('请输入正确的邮箱格式');
      return;
    }
    if (!formData.password) {
      setError('请设置密码');
      return;
    }
    if (formData.password.length < 6 || formData.password.length > 20) {
      setError('密码长度应为6-20位');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    if (!formData.agreed) {
      setError('请阅读并同意用户协议和隐私政策');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.password,
          inviteCode: formData.inviteCode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // 注册成功，跳转到登录页
        router.push('/auth/login?registered=true');
      } else {
        setError(data.message || '注册失败，请重试');
      }
    } catch (err) {
      setError('网络错误，请检查连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            加入TokenCPS联盟
          </h1>
          <p className="text-gray-600">开启您的推广赚钱之旅</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              手机号
            </label>
            <div className="flex space-x-2">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                placeholder="请输入手机号"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleGetCode}
                disabled={countdown > 0 || loading}
                className="px-4 py-3 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {countdown > 0 ? `${countdown}秒` : '获取验证码'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              验证码
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="请输入验证码"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="请输入邮箱"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              设置密码
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="6-20位字母、数字组合"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              确认密码
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="请再次输入密码"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              邀请码（可选）
            </label>
            <input
              type="text"
              value={formData.inviteCode}
              onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              placeholder="填写邀请码可获得额外奖励"
              disabled={loading}
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              checked={formData.agreed}
              onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
              className="mt-1 rounded text-orange-600 focus:ring-orange-500"
              disabled={loading}
            />
            <span className="ml-2 text-sm text-gray-600">
              我已阅读并同意
              <Link href="/terms" className="text-orange-600 hover:text-orange-700">《用户协议》</Link>
              和
              <Link href="/privacy" className="text-orange-600 hover:text-orange-700">《隐私政策》</Link>
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '注册中...' : '立即注册'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-600">已有账户？</span>
          <Link href="/auth/login" className="text-orange-600 hover:text-orange-700 font-medium ml-1">
            立即登录
          </Link>
        </div>
      </div>
    </div>
  );
}
