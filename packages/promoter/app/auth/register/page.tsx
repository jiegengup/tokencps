'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuthStore()
  const [account, setAccount] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!account || !password) return setError('请填写账号和密码')
    if (password !== confirm) return setError('两次密码不一致')
    if (!agreed) return setError('请先同意推广员合作协议')
    setError('')
    setLoading(true)
    try {
      const ok = await register(account, password, nickname || undefined)
      if (ok) router.push('/dashboard')
      else setError('注册失败，账号可能已存在')
    } catch { setError('注册失败，请重试') }
    finally { setLoading(false) }
  }

  const inputCls = 'w-full px-4 py-3 rounded-[12px] border border-border bg-cream text-text placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-accent/30'

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text tracking-tight">TokenCPS</h1>
          <p className="mt-2 text-sm text-text/60">注册推广员账号，开始赚取佣金</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-[12px] border border-border p-6 space-y-4">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <input type="text" placeholder="账号" value={account} onChange={e => setAccount(e.target.value)} className={inputCls} />
          <input type="text" placeholder="昵称（选填）" value={nickname} onChange={e => setNickname(e.target.value)} className={inputCls} />
          <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} className={inputCls} />
          <input type="password" placeholder="确认密码" value={confirm} onChange={e => setConfirm(e.target.value)} className={inputCls} />
          <label className="flex items-start gap-2 text-sm text-text/70 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#C96442]" />
            <span>我已阅读并同意《推广员合作协议》</span>
          </label>
          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-accent text-white font-medium rounded-[12px] hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? '注册中...' : '注册'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-text/60 space-y-2">
          <p>已有账号？<Link href="/auth/login" className="text-accent hover:underline">立即登录</Link></p>
          <p><Link href="/" className="hover:underline">← 返回首页</Link></p>
        </div>
      </div>
    </div>
  )
}
