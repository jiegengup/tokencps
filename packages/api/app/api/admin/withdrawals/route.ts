import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const withdrawals = mockDb.withdrawals
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(w => {
      const user = mockDb.users.find(u => u.id === w.userId)
      return { ...w, userAccount: user?.account, userNickname: user?.nickname }
    })

  return NextResponse.json(ok(withdrawals))
}
