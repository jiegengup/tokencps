'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, LineChart, Button } from '@shared/index'
import { mockDashboard, mockTrendData, mockCommissions } from '@/lib/promoter/mock-data'
import { useAuthStore } from '@/lib/promoter/store'

function formatTime(iso: string) {
  const d = new Date(iso)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${month}/${day} ${h}:${m}`
}

/** Generate 30-day mock data by repeating and varying the 7-day seed */
function generate30DayData() {
  const days: string[] = []
  const clicks: number[] = []
  const orders: number[] = []
  const commissions: number[] = []
  const base = new Date('2026-03-03')
  for (let i = 0; i < 30; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    days.push(`${d.getMonth() + 1}/${d.getDate()}`)
    const seed = mockTrendData.clicks[i % 7]
    const jitter = 0.8 + Math.sin(i * 0.7) * 0.4
    clicks.push(Math.round(seed * jitter))
    orders.push(Math.round(mockTrendData.orders[i % 7] * jitter))
    commissions.push(Math.round(mockTrendData.commissions[i % 7] * jitter))
  }
  return { days, clicks, orders, commissions }
}

const mock30DayData = generate30DayData()

/** Build feed items with the required display format */
function buildFeedItems() {
  return mockCommissions.map((c) => {
    const estimated = c.amount >= 0 ? `预估佣金+¥${c.amount.toFixed(0)}` : `回扣-¥${Math.abs(c.amount).toFixed(0)}`
    return {
      id: c.id,
      text: `${c.description}，${estimated}`,
      amount: c.amount,
      time: formatTime(c.createdAt),
    }
  })
}

const feedItems = buildFeedItems()

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [trendRange, setTrendRange] = useState<'7d' | '30d'>('7d')

  const trendData = useMemo(() => {
    return trendRange === '7d' ? mockTrendData : mock30DayData
  }, [trendRange])

  const todayEstimated = 128.5
  const todayConfirmed = 75
  const yesterdayEstimated = 114.7
  const diff = todayEstimated - yesterdayEstimated
  const diffPct = ((diff / yesterdayEstimated) * 100).toFixed(0)
  const isUp = diff >= 0

  return (
    <div className="space-y-5">
      {/* Scrolling marquee keyframes */}
      <style>{`
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .marquee-scroll {
          animation: marquee-vertical 20s linear infinite;
        }
        .marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Greeting */}
      <div>
        <h1 className="text-xl font-semibold text-text">
          {user?.nickname || '推广达人'}，今天也要加油
        </h1>
        <p className="text-sm text-text-tertiary mt-1">数据中心 · 实时概览</p>
      </div>

      {/* Top card — today's commission */}
      <Card className="bg-accent text-white border-none" padding="lg">
        <p className="text-sm opacity-80">今日预估佣金</p>
        <p className="text-4xl font-bold mt-1 tracking-tight">
          ¥{todayEstimated.toFixed(2)}
        </p>
        <div className="flex items-center gap-4 mt-3 text-sm opacity-90">
          <span>实际到账 ¥{todayConfirmed.toFixed(2)}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${isUp ? 'bg-white/20' : 'bg-white/20'}`}>
            {isUp ? '↑' : '↓'}{Math.abs(Number(diffPct))}% vs 昨日
          </span>
        </div>
      </Card>

      {/* 4 data cards — 2x2 grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">累计佣金总额</p>
          <p className="text-xl font-semibold text-text mt-1">
            ¥{mockDashboard.totalConfirmed.toLocaleString()}
          </p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">可提现金额</p>
          <p className="text-xl font-semibold text-success mt-1">
            ¥{mockDashboard.withdrawable.toLocaleString()}
          </p>
          <Link href="/finance" className="text-xs text-accent mt-1 inline-block">
            去提现 →
          </Link>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">今日新增客户</p>
          <p className="text-xl font-semibold text-text mt-1">3</p>
        </Card>
        <Card padding="sm">
          <p className="text-xs text-text-tertiary">团队总人数</p>
          <p className="text-xl font-semibold text-text mt-1">
            {mockDashboard.teamSize}
          </p>
        </Card>
      </div>

      {/* Trend chart with 7d / 30d toggle */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-text">佣金趋势</p>
          <div className="flex bg-cream-dark rounded-lg p-0.5">
            <button
              onClick={() => setTrendRange('7d')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                trendRange === '7d'
                  ? 'bg-card text-text shadow-sm'
                  : 'text-text-tertiary'
              }`}
            >
              近 7 日
            </button>
            <button
              onClick={() => setTrendRange('30d')}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                trendRange === '30d'
                  ? 'bg-card text-text shadow-sm'
                  : 'text-text-tertiary'
              }`}
            >
              近 30 日
            </button>
          </div>
        </div>
        <LineChart
          data={trendData.commissions}
          labels={trendData.days}
          height={160}
        />
      </Card>

      {/* Real-time transaction feed with vertical scroll */}
      <Card>
        <p className="text-sm font-medium text-text mb-3">实时交易动态</p>
        <div className="overflow-hidden h-[180px] relative">
          <div className="marquee-scroll">
            {/* Duplicate items for seamless loop */}
            {[...feedItems, ...feedItems].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="flex items-center justify-between py-2 border-b border-border-light last:border-b-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text truncate">{item.text}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">{item.time}</p>
                </div>
                <span
                  className={`text-sm font-medium ml-3 shrink-0 ${
                    item.amount >= 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {item.amount >= 0 ? '+' : ''}¥{Math.abs(item.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/promotions">
          <Button variant="outline" fullWidth size="sm">
            生成推广链接
          </Button>
        </Link>
        <Link href="/finance">
          <Button variant="outline" fullWidth size="sm">
            查看佣金明细
          </Button>
        </Link>
        <Link href="/team">
          <Button variant="outline" fullWidth size="sm">
            邀请推广员
          </Button>
        </Link>
      </div>
    </div>
  )
}