import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { users, referrals } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const refs = await db.select().from(referrals).where(eq(referrals.inviterId, auth.userId))

  const members = await Promise.all(refs.map(async (ref) => {
    const [user] = await db.select({ nickname: users.nickname, role: users.role }).from(users).where(eq(users.id, ref.inviteeId)).limit(1)
    return {
      id: ref.inviteeId,
      nickname: user?.nickname,
      role: user?.role,
      joinedAt: ref.createdAt,
      totalEarnings: Number(ref.totalEarnings),
    }
  }))

  return NextResponse.json(ok({ total: members.length, members }))
}
