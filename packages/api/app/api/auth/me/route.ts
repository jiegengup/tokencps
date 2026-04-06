import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) {
    return NextResponse.json(fail('未登录'), { status: 401 })
  }

  const user = mockDb.users.find(u => u.id === auth.userId)
  if (!user) {
    return NextResponse.json(fail('用户不存在'), { status: 404 })
  }

  const { password: _, ...safeUser } = user
  return NextResponse.json(ok(safeUser))
}
