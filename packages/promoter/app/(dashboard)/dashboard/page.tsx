'use client'

import React from 'react'
import Link from 'next/link'
import { Card, LineChart, Button } from '@tokencps/shared'
import { mockDashboard, mockTrendData, mockCommissions } from '@/lib/mock-data'
import { useAuthStore } from '@/lib/store'

function formatTime(iso: string) {
  const d = new Date(iso)
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

export default function DashboardPage() {
  const { user } = useAuthStore()

  const todayEstimated = 128.5
  const todayConfirmed = 75
  const yesterdayEstimated = 114.7
  const diff = todayEstimated - yesterdayEstimated
  const diffPct = ((diff / yesterdayEstimated) * 100).toFixed(0)
  const isUp = diff >= 0

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

      {/* 7-day trend chart */}
      <Card>
        <p className="text-sm font-medium text-text mb-3">近 7 日佣金趋势</p>
        <LineChart
          data={mockTrendData.commissions}
          labels={mockTrendData.days}
          height={160}
        />
      </Card>

      {/* Real-time transaction notifications */}
      <Card>
        <p className="text-sm font-medium text-text mb-3">最近交易动态</p>
        <div className="space-y-3">
          {mockCommissions.slice(0, 4).map((c) => (
            <div key={c.id} className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text truncate">{c.description}</p>
                <p className="text-xs text-text-tertiary mt-0.5">
                  {formatTime(c.createdAt)}
                </p>
              </div>
              <span
                className={`text-sm font-medium ml-3 shrink-0 ${
                  c.amount >= 0 ? 'text-success' : 'text-danger'
                }`}
              >
                {c.amount >= 0 ? '+' : ''}¥{Math.abs(c.amount).toFixed(2)}
              </span>
            </div>
          ))}
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
