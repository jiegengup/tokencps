import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { searchParams } = request.nextUrl
  const type = searchParams.get('type') // estimated, confirmed, clawback, team
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')

  let commissions = mockDb.commissions.filter(c => c.userId === auth.userId)
  if (type) {
    commissions = commissions.filter(c => c.type === type)
  }

  const total = commissions.length
  const items = commissions
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice((page - 1) * pageSize, page * pageSize)

  const summary = {
    totalEstimated: mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'estimated')
      .reduce((s, c) => s + Number(c.amount), 0),
    totalConfirmed: mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'confirmed')
      .reduce((s, c) => s + Number(c.amount), 0),
    totalClawback: mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'clawback')
      .reduce((s, c) => s + Number(c.amount), 0),
    totalTeam: mockDb.commissions
      .filter(c => c.userId === auth.userId && c.type === 'team')
      .reduce((s, c) => s + Number(c.amount), 0),
  }

  return NextResponse.json(ok({ items, total, page, pageSize, summary }))
}
