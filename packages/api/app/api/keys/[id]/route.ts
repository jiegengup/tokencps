import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'
import crypto from 'crypto'

type Params = { params: Promise<{ id: string }> }

export async function DELETE(request: NextRequest, { params }: Params) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const { id } = await params
  const idx = mockDb.apiKeys.findIndex(k => k.id === id && k.userId === auth.userId)
  if (idx === -1) return NextResponse.json(fail('Key不存在'), { status: 404 })

  mockDb.apiKeys.splice(idx, 1)
  return NextResponse.json(ok(null, '删除成功'))
}
