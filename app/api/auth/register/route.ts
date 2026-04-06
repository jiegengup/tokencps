import { NextRequest, NextResponse } from 'next/server'
import { hashSync } from 'bcryptjs'
import { db } from '@/lib/db'
import { users, promotionLinks, referrals } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { signToken } from '@/lib/middleware/auth'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { account, password, nickname, type = 'consumer' } = body

    if (!account || !password) {
      return NextResponse.json(fail('账号和密码不能为空'), { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json(fail('密码至少6位'), { status: 400 })
    }

    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.account, account)).limit(1)
    if (existing) {
      return NextResponse.json(fail('账号已存在'), { status: 409 })
    }

    const role = type === 'promoter' ? 'promoter' : 'consumer'
    const refCode = request.nextUrl.searchParams.get('ref')

    const result = await db.transaction(async (tx) => {
      let parentId: string | null = null

      if (refCode) {
        const [link] = await tx.select().from(promotionLinks).where(eq(promotionLinks.code, refCode)).limit(1)
        if (link) {
          parentId = link.userId
          await tx.update(promotionLinks).set({ registrations: sql`${promotionLinks.registrations} + 1` }).where(eq(promotionLinks.id, link.id))
        }
      }

      const [newUser] = await tx.insert(users).values({
        account,
        password: hashSync(password, 10),
        nickname: nickname || account,
        role,
        balance: role === 'consumer' ? '5' : '0',
        parentId,
      }).returning()

      if (parentId) {
        await tx.insert(referrals).values({
          inviterId: parentId,
          inviteeId: newUser.id,
          inviteeRole: role,
        })
      }

      return newUser
    })

    const token = await signToken({ userId: result.id, role: result.role })
    const { password: _, ...safeUser } = result

    return NextResponse.json(ok({ user: safeUser, token }), { status: 201 })
  } catch {
    return NextResponse.json(fail('注册失败'), { status: 500 })
  }
}
