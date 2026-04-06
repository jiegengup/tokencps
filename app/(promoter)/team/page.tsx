'use client'

import { useState, useEffect } from 'react'
import { Card, Button } from '@shared/index'
import { getCookie } from '@/lib/utils/cookie'

const tabs = ['我的团队', '我的客户'] as const

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function getCustomerStatus(c: any) {
  const daysSince = (Date.now() - new Date(c.registeredAt).getTime()) / 86400000
  if (daysSince <= 7) return { label: '新客户', cls: 'bg-blue-50 text-blue-600' }
  if (c.totalOrders >= 3) return { label: '活跃', cls: 'bg-green-50 text-success' }
  return { label: '沉默', cls: 'bg-gray-100 text-text-tertiary' }
}

export default function TeamPage() {
  const [active, setActive] = useState<typeof tabs[number]>('我的团队')
  const [copied, setCopied] = useState(false)
  const [team, setTeam] = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [teamTotal, setTeamTotal] = useState(0)
  const [customerTotal, setCustomerTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = { 'Authorization': `Bearer ${getCookie('token')}` }
        const [teamRes, custRes, meRes] = await Promise.all([
          fetch('/api/team', { headers }),
          fetch('/api/customers', { headers }),
          fetch('/api/auth/me', { headers }),
        ])
        const teamData = await teamRes.json()
        const custData = await custRes.json()
        const meData = await meRes.json()
        if (teamData.success) {
          setTeam(teamData.data?.members || [])
          setTeamTotal(teamData.data?.total || 0)
        }
        if (custData.success) {
          setCustomers(custData.data?.customers || [])
          setCustomerTotal(custData.data?.total || 0)
        }
        if (meData.success) setUser(meData.data)
      } catch (e) {
        console.error('Team fetch failed:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'http://58.87.69.241'
  const inviteLink = `${baseUrl}/auth/register?type=promoter&ref=${user?.id || ''}`
  const inviteCode = user?.id || 'loading...'

  if (loading) {
    return <div className="flex items-center justify-center h-64"><p className="text-text-tertiary">加载中...</p></div>
  }

  const teamEarnings = team.reduce((s, m) => s + Number(m.totalEarnings || 0), 0)
  const newThisMonth = team.filter(m => {
    const d = new Date(m.joinedAt)
    const now = new Date()
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

  const activeCustomers = customers.filter(c => c.totalOrders >= 3).length

  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-text">团队与客户</h1>

      {/* Tab bar */}
      <div className="flex gap-1 bg-cream-dark rounded-[12px] p-1">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActive(tab)}
            className={`flex-1 py-2 text-sm font-medium rounded-[10px] transition-colors ${
              active === tab ? 'bg-card text-text shadow-sm' : 'text-text-secondary hover:text-text'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {active === '我的团队' && (
        <div className="space-y-4">
          <Card>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-text-tertiary mb-1">团队总人数</p><p className="text-lg font-bold text-text">{teamTotal}</p></div>
              <div><p className="text-xs text-text-tertiary mb-1">本月新增</p><p className="text-lg font-bold text-text">{newThisMonth}</p></div>
              <div><p className="text-xs text-text-tertiary mb-1">团队总贡献佣金</p><p className="text-lg font-bold text-text">¥{teamEarnings.toLocaleString()}</p></div>
              <div><p className="text-xs text-text-tertiary mb-1">团队抽成比例</p><p className="text-lg font-bold text-text">10%</p></div>
            </div>
          </Card>

          {team.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-text mb-3">团队成员</h3>
              <div className="divide-y divide-border-light">
                {team.map(m => (
                  <div key={m.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center text-xs font-bold">
                        {(m.nickname || '?').charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text">{m.nickname || '匿名用户'}</p>
                        <p className="text-xs text-text-tertiary">加入于 {formatDate(m.joinedAt)}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-text">¥{Number(m.totalEarnings || 0).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-semibold text-text mb-3">邀请新成员</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-tertiary mb-1">邀请链接</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-cream-dark text-text text-xs px-3 py-2 rounded-[8px] font-mono truncate">{inviteLink}</code>
                  <Button size="sm" variant="outline" onClick={() => handleCopy(inviteLink)}>
                    {copied ? '已复制' : '复制'}
                  </Button>
                </div>
              </div>
              <Button variant="secondary" fullWidth onClick={() => alert('海报生成中...')}>
                生成邀请海报
              </Button>
            </div>
          </Card>
        </div>
      )}

      {active === '我的客户' && (
        <div className="space-y-4">
          <Card>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center"><p className="text-xs text-text-tertiary mb-1">总客户数</p><p className="text-lg font-bold text-text">{customerTotal}</p></div>
              <div className="text-center"><p className="text-xs text-text-tertiary mb-1">本月新增</p><p className="text-lg font-bold text-text">{customerTotal}</p></div>
              <div className="text-center"><p className="text-xs text-text-tertiary mb-1">活跃客户数</p><p className="text-lg font-bold text-text">{activeCustomers}</p></div>
            </div>
          </Card>

          {customers.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-text mb-3">客户列表</h3>
              <div className="divide-y divide-border-light">
                {customers.map(c => {
                  const status = getCustomerStatus(c)
                  return (
                    <div key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cream-dark text-text-secondary flex items-center justify-center text-xs font-bold">
                          {(c.nickname || '?').charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-text">{c.nickname}</p>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${status.cls}`}>{status.label}</span>
                          </div>
                          <p className="text-xs text-text-tertiary">注册于 {formatDate(c.registeredAt)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-text">¥{Number(c.totalSpent || 0).toLocaleString()}</p>
                        <p className="text-xs text-text-tertiary">{c.totalOrders} 笔订单</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {customers.length === 0 && (
            <Card><p className="text-sm text-text-tertiary text-center py-4">暂无客户，分享推广链接即可获取</p></Card>
          )}
        </div>
      )}
    </div>
  )
}
