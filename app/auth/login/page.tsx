'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/promoter/store'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !password) return setError('请填写账号和密码')
    setError('')
    setLoading(true)
    try {
      const ok = await login(account, password)
      if (ok) {
        const { user } = useAuthStore.getState()
        if (user?.role === 'admin') router.push('/admin')
        else router.push('/dashboard')
      }
      else setError('账号或密码错误')
    } catch { setError('登录失败，请重试') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text tracking-tight">TokenCPS</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-[12px] border border-border p-6 space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input
            type="text" placeholder="账号" value={account}
            onChange={e => setAccount(e.target.value)}
            className="w-full px-4 py-3 rounded-[12px] border border-border bg-cream text-text placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-accent/30"
          />
          <input
            type="password" placeholder="密码" value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-[12px] border border-border bg-cream text-text placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-accent/30"
          />
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-accent text-white font-medium rounded-[12px] hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-text/60 space-y-2">
          <p>还没有账号？<Link href="/auth/register" className="text-accent hover:underline">立即注册</Link></p>
          <p><Link href="/" className="hover:underline">← 返回首页</Link></p>
        </div>
      </div>
    </div>
  )
}
