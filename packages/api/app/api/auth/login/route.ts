import { NextRequest, NextResponse } from 'next/server'
import { compareSync } from 'bcryptjs'
import { findUserByAccount } from '@/lib/mock'
import { signToken } from '@/lib/middleware/auth'
import { ok, fail } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { account, password } = body

    if (!account || !password) {
      return NextResponse.json(fail('账号和密码不能为空'), { status: 400 })
    }

    const user = findUserByAccount(account)
    if (!user) {
      return NextResponse.json(fail('账号或密码错误'), { status: 401 })
    }

    if (!compareSync(password, user.password)) {
      return NextResponse.json(fail('账号或密码错误'), { status: 401 })
    }

    if (user.banned) {
      return NextResponse.json(fail('账号已被封禁'), { status: 403 })
    }

    const token = await signToken({ userId: user.id, role: user.role })
    const { password: _, ...safeUser } = user

    return NextResponse.json(ok({ user: safeUser, token }))
  } catch {
    return NextResponse.json(fail('登录失败'), { status: 500 })
  }
}
