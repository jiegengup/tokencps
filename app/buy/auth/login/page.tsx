'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/consumer/store'

function getCookie(name: string): string {
  if (typeof document === "undefined") return ""
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : ""
}

export default function LoginPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const login = useAuthStore(s => s.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !password) { setError('请填写账号和密码'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password }),
      })
      const data = await res.json()
      if (data.success && data.data) {
        login(data.data.user, data.data.token)
        document.cookie = `token=${data.data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
        router.push('/buy/dashboard')
      } else { setError(data.message || '登录失败') }
    } catch { setError('登录失败，请重试') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-text">TokenCPS</Link>
          <p className="text-text-secondary text-sm mt-2">登录你的账号</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border-light p-6 space-y-4">
          {error && <div className="text-sm text-danger bg-danger/10 rounded-lg px-3 py-2">{error}</div>}
          <div>
            <label className="block text-sm text-text-secondary mb-1">账号</label>
            <input type="text" value={account} onChange={e => setAccount(e.target.value)} placeholder="邮箱或手机号" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">密码</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="输入密码" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50">
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="text-center text-sm text-text-secondary mt-4">
          还没有账号？<Link href="/buy/auth/register" className="text-accent hover:text-accent-hover">立即注册</Link>
        </p>
      </div>
    </div>
  )
}
