import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const keys = mockDb.apiKeys.filter(k => k.userId === auth.userId)
  const totalUsed = keys.reduce((s, k) => s + Number(k.usedAmount), 0)
  const user = mockDb.users.find(u => u.id === auth.userId)

  return NextResponse.json(ok({
    totalBalance: Number(user?.balance || 0),
    totalUsed,
    remaining: Number(user?.balance || 0) - totalUsed,
    keys: keys.map(k => ({
      id: k.id,
      name: k.name,
      usedAmount: k.usedAmount,
      lastUsedAt: k.lastUsedAt,
    })),
  }))
}
