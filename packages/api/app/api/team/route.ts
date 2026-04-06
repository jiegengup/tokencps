import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  // Find users invited by this promoter
  const referrals = mockDb.referrals.filter(r => r.inviterId === auth.userId)
  const members = referrals.map(ref => {
    const user = mockDb.users.find(u => u.id === ref.inviteeId)
    return {
      id: ref.inviteeId,
      nickname: user?.nickname,
      role: user?.role,
      joinedAt: ref.createdAt,
      totalEarnings: ref.totalEarnings,
    }
  })

  return NextResponse.json(ok({
    total: members.length,
    members,
  }))
}
