'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Card, LineChart, Button } from '@shared/index'
import { useAuthStore } from '@/lib/promoter/store'

function formatTime(iso: string) {
  const d = new Date(iso)
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [dashboard, setDashboard] = useState<any>(null)
  const [commissions, setCommissions] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [trendRange, setTrendRange] = useState<'7d' | '30d'>('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = { 'Authorization': `Bearer ${getCookie('token')}` }
        const [dashRes, commRes, notiRes] = await Promise.all([
          fetch('/api/dashboard/promoter', { headers }),
          fetch('/api/commissions?pageSize=10', { headers }),
          fetch('/api/notifications?unread=true', { headers }),
        ])
        const dash = await dashRes.json()
        const comm = await commRes.json()
        const noti = await notiRes.json()
        if (dash.success) setDashboard(dash.data)
        if (comm.success) setCommissions(comm.data?.items || [])
        if (noti.success) setNotifications(noti.data?.notifications || [])
      } catch (e) {
        console.error('Dashboard fetch failed:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Build trend data from real commission records (simplified)
  const trendData = useMemo(() => {
    const days: string[] = []
    const commissionsArr: number[] = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      days.push(`${d.getMonth() + 1}/${d.getDate()}`)
      const dayComm = commissions.filter(c => {
        const cd = new Date(c.createdAt)
        return cd.toDateString() === d.toDateString()
      }).reduce((sum, c) => {
        const amt = typeof c.amount === 'string' ? parseFloat(c.amount) : c.amount
        return sum + (amt > 0 ? amt : 0)
      }, 0)
      commissionsArr.push(dayComm)
    }
    return { days, commissions: commissionsArr }
  }, [commissions])

  if (loading) {
    return <div className="flex items-center justify-center h-64"><p className="text-text-tertiary">加载中...</p></div>
  }

  const totalConfirmed = Number(dashboard?.totalConfirmed || 0)
  const totalTeam = Number(dashboard?.totalTeam || 0)
  const totalClawback = Number(dashboard?.totalClawback || 0)
  const withdrawable = Number(dashboard?.withdrawable || 0)

  return (
    <div className="space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-semibold text-text">
          {user?.nickname || '推广达人'}，今天也要加油
        </h1>
        <p className="text-sm text-text-tertiary mt-1">数据中心 · 实时概览</p>
      </div>

      {/* Top card — today's commission */}
      <Card className="bg-accent text-white border-none" padding="lg">
        <p className="text-sm opacity-80">累计佣金总额</p>
        <p className="text-4xl font-bold mt-1 tracking-tight">
          ¥{totalConfirmed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-4 mt-3 text-sm opacity-90">
          <span>团队佣金 ¥{totalTeam.toLocaleString()}</span>
          {totalClawback > 0 && <span>追回 -¥{totalClawback.toLocaleString()}</span>}
        </div>
      </Card>

      {/* 4 data cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">累计佣金总额</p>
          <p className="text-xl font-semibold text-text mt-1">¥{totalConfirmed.toLocaleString()}</p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">可提现金额</p>
          <p className="text-xl font-semibold text-success mt-1">¥{withdrawable.toLocaleString()}</p>
          <Link href="/finance" className="text-xs text-accent mt-1 inline-block">去提现 →</Link>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">推广链接数</p>
          <p className="text-xl font-semibold text-text mt-1">{dashboard?.totalLinks || 0}</p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">团队总人数</p>
          <p className="text-xl font-semibold text-text mt-1">{dashboard?.teamSize || 0}</p>
        </Card>
      </div>

      {/* Trend chart */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-text">佣金趋势</p>
          <div className="flex bg-cream-dark rounded-lg p-0.5">
            <button onClick={() => setTrendRange('7d')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${trendRange === '7d' ? 'bg-card text-text shadow-sm' : 'text-text-tertiary'}`}>
              近 7 日
            </button>
            <button onClick={() => setTrendRange('30d')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${trendRange === '30d' ? 'bg-card text-text shadow-sm' : 'text-text-tertiary'}`}>
              近 30 日
            </button>
          </div>
        </div>
        <LineChart data={trendData.commissions} labels={trendData.days} height={160} />
      </Card>

      {/* Real-time feed from commissions */}
      <Card>
        <p className="text-sm font-medium text-text mb-3">最近交易动态</p>
        {commissions.length === 0 ? (
          <p className="text-sm text-text-tertiary py-4 text-center">暂无佣金记录</p>
        ) : (
          <div className="divide-y divide-border-light">
            {commissions.slice(0, 5).map((c) => {
              const amt = typeof c.amount === 'string' ? parseFloat(c.amount) : c.amount
              const typeLabels: Record<string, string> = {
                estimated: '预估', confirmed: '实际', clawback: '追回', team: '团队'
              }
              return (
                <div key={c.id} className="flex items-center justify-between py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text truncate">{c.description || `${typeLabels[c.type] || ''}佣金`}</p>
                    <p className="text-xs text-text-tertiary mt-0.5">{formatTime(c.createdAt)}</p>
                  </div>
                  <span className={`text-sm font-medium ml-3 shrink-0 ${amt >= 0 ? 'text-success' : 'text-danger'}`}>
                    {amt >= 0 ? '+' : ''}¥{Math.abs(amt).toFixed(2)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/promotions"><Button variant="outline" fullWidth size="sm">生成推广链接</Button></Link>
        <Link href="/finance"><Button variant="outline" fullWidth size="sm">查看佣金明细</Button></Link>
        <Link href="/team"><Button variant="outline" fullWidth size="sm">邀请推广员</Button></Link>
      </div>
    </div>
  )
}

function getCookie(name: string): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : ''
}
