import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const commissions = mockDb.commissions.filter(c => c.userId === auth.userId)
  const links = mockDb.promotionLinks.filter(l => l.userId === auth.userId)
  const team = mockDb.referrals.filter(r => r.inviterId === auth.userId)

  const totalEstimated = commissions
    .filter(c => c.type === 'estimated')
    .reduce((s, c) => s + Number(c.amount), 0)
  const totalConfirmed = commissions
    .filter(c => c.type === 'confirmed')
    .reduce((s, c) => s + Number(c.amount), 0)
  const totalClawback = commissions
    .filter(c => c.type === 'clawback')
    .reduce((s, c) => s + Number(c.amount), 0)
  const totalTeam = commissions
    .filter(c => c.type === 'team')
    .reduce((s, c) => s + Number(c.amount), 0)

  const withdrawable = totalConfirmed + totalTeam - totalClawback
    - mockDb.withdrawals
        .filter(w => w.userId === auth.userId && w.status !== 'rejected')
        .reduce((s, w) => s + Number(w.amount), 0)

  return NextResponse.json(ok({
    totalEstimated,
    totalConfirmed,
    totalClawback,
    totalTeam,
    withdrawable: Math.max(0, withdrawable),
    totalLinks: links.length,
    totalClicks: links.reduce((s, l) => s + l.clicks, 0),
    totalRegistrations: links.reduce((s, l) => s + l.registrations, 0),
    totalOrders: links.reduce((s, l) => s + l.orders, 0),
    teamSize: team.length,
  }))
}
