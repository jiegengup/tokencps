import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'
import crypto from 'crypto'

type Params = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: Params) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { id } = await params
  const key = mockDb.apiKeys.find(k => k.id === id && k.userId === auth.userId)
  if (!key) return NextResponse.json(fail('Key不存在'), { status: 404 })

  key.key = `sk-tc-${crypto.randomBytes(24).toString('hex')}`
  return NextResponse.json(ok(key, 'Key已重置'))
}
