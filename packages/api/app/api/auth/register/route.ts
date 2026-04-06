import { NextRequest, NextResponse } from 'next/server'
import { hashSync } from 'bcryptjs'
import { mockDb, generateId, findUserByAccount } from '@/lib/mock'
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

    const existing = findUserByAccount(account)
    if (existing) {
      return NextResponse.json(fail('账号已存在'), { status: 409 })
    }

    const role = type === 'promoter' ? 'promoter' : 'consumer'
    const user = {
      id: generateId(),
      account,
      password: hashSync(password, 10),
      nickname: nickname || account,
      role,
      balance: role === 'consumer' ? 5 : 0, // $5 trial for consumers
      parentId: undefined as string | undefined,
      banned: false,
      growthPoints: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Check referral cookie/param
    const refCode = request.nextUrl.searchParams.get('ref')
    if (refCode) {
      const link = mockDb.promotionLinks.find(l => l.code === refCode)
      if (link) {
        user.parentId = link.userId
        link.registrations += 1
        // Create referral record
        mockDb.referrals.push({
          id: generateId(), inviterId: link.userId,
          inviteeId: user.id, inviteeRole: role,
          totalEarnings: 0, createdAt: new Date(),
        })
      }
    }

    mockDb.users.push(user as any)

    const token = await signToken({ userId: user.id, role: user.role })
    const { password: _, ...safeUser } = user

    return NextResponse.json(ok({ user: safeUser, token }), { status: 201 })
  } catch {
    return NextResponse.json(fail('注册失败'), { status: 500 })
  }
}
