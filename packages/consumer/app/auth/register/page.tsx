'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { api } from '@/lib/mock-api'

export default function RegisterPage() {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const login = useAuthStore(s => s.login)
  const setFirstLogin = useAuthStore(s => s.setFirstLogin)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !password) { setError('请填写完整信息'); return }
    if (password !== confirm) { setError('两次密码不一致'); return }
    if (password.length < 6) { setError('密码至少6位'); return }
    setLoading(true); setError('')
    try {
      const res = await api.auth.register(account, password)
      login(res.user, res.token)
      setFirstLogin(true)
      router.push('/dashboard')
    } catch { setError('注册失败，请重试') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-text">TokenCPS</Link>
          <p className="text-text-secondary text-sm mt-2">注册即送 $5 免费体验额度</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border-light p-6 space-y-4">
          {error && <div className="text-sm text-danger bg-danger/10 rounded-lg px-3 py-2">{error}</div>}
          <div>
            <label className="block text-sm text-text-secondary mb-1">账号</label>
            <input type="text" value={account} onChange={e => setAccount(e.target.value)} placeholder="邮箱或手机号" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">密码</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="至少6位" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-1">确认密码</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="再次输入密码" className="w-full px-3 py-2.5 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50">
            {loading ? '注册中...' : '注册'}
          </button>
          <p className="text-xs text-text-tertiary text-center">注册即表示同意<Link href="/docs" className="text-accent">服务协议</Link>和<Link href="/docs" className="text-accent">隐私政策</Link></p>
        </form>
        <p className="text-center text-sm text-text-secondary mt-4">
          已有账号？<Link href="/auth/login" className="text-accent hover:text-accent-hover">立即登录</Link>
        </p>
      </div>
    </div>
  )
}
