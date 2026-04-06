'use client'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { useAuthStore } from '@/lib/store'
import { toast } from '@tokencps/shared/components/Toast'

export default function SettingsPage() {
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const [nickname, setNickname] = useState(user?.nickname || '')
  const [email, setEmail] = useState('')
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [balanceAlert, setBalanceAlert] = useState(true)
  const [rechargeNotify, setRechargeNotify] = useState(true)
  const [alertThreshold, setAlertThreshold] = useState(10)

  const saveProfile = () => { toast('个人信息已保存', 'success') }
  const changePassword = () => {
    if (!oldPwd || !newPwd) { toast('请填写完整', 'error'); return }
    if (newPwd !== confirmPwd) { toast('两次密码不一致', 'error'); return }
    if (newPwd.length < 6) { toast('密码至少6位', 'error'); return }
    toast('密码修改成功', 'success')
    setOldPwd(''); setNewPwd(''); setConfirmPwd('')
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold text-text mb-6">账号设置</h1>

        {/* Profile */}
        <section className="bg-card rounded-xl border border-border-light p-6 mb-6">
          <h2 className="text-sm font-medium text-text mb-4">个人信息</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-text-tertiary mb-1">昵称</label>
              <input type="text" value={nickname} onChange={e => setNickname(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-text-tertiary mb-1">绑定邮箱</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="输入邮箱地址" className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <button onClick={saveProfile} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              保存
            </button>
          </div>
        </section>

        {/* Change Password */}
        <section className="bg-card rounded-xl border border-border-light p-6 mb-6">
          <h2 className="text-sm font-medium text-text mb-4">修改密码</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-text-tertiary mb-1">当前密码</label>
              <input type="password" value={oldPwd} onChange={e => setOldPwd(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-text-tertiary mb-1">新密码</label>
              <input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="至少6位" className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-text-tertiary mb-1">确认新密码</label>
              <input type="password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
            <button onClick={changePassword} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              修改密码
            </button>
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="bg-card rounded-xl border border-border-light p-6 mb-6">
          <h2 className="text-sm font-medium text-text mb-4">通知偏好</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <span className="text-sm text-text">余额不足告警</span>
              <button onClick={() => setBalanceAlert(!balanceAlert)} className={`w-10 h-5 rounded-full transition-colors ${balanceAlert ? 'bg-accent' : 'bg-border'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${balanceAlert ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
            {balanceAlert && (
              <div className="flex items-center gap-2 pl-0">
                <span className="text-xs text-text-tertiary">余额低于</span>
                <input type="number" value={alertThreshold} onChange={e => setAlertThreshold(+e.target.value)} className="w-16 px-2 py-1 rounded border border-border bg-bg text-sm text-center focus:outline-none focus:border-accent" />
                <span className="text-xs text-text-tertiary">美元时通知</span>
              </div>
            )}
            <label className="flex items-center justify-between">
              <span className="text-sm text-text">充值成功通知</span>
              <button onClick={() => setRechargeNotify(!rechargeNotify)} className={`w-10 h-5 rounded-full transition-colors ${rechargeNotify ? 'bg-accent' : 'bg-border'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${rechargeNotify ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
          </div>
        </section>

        {/* Legal + Logout */}
        <section className="bg-card rounded-xl border border-border-light p-6">
          <div className="space-y-2 mb-4">
            <a href="/docs" className="block text-sm text-text-secondary hover:text-text py-1">用户服务协议</a>
            <a href="/docs" className="block text-sm text-text-secondary hover:text-text py-1">隐私政策</a>
          </div>
          <button onClick={logout} className="w-full py-2.5 border border-danger text-danger rounded-lg text-sm font-medium hover:bg-danger/5 transition-colors">
            退出登录
          </button>
        </section>
      </main>
    </div>
  )
}
