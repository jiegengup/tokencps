import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const records = mockDb.withdrawals
    .filter(w => w.userId === auth.userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json(ok(records))
}
