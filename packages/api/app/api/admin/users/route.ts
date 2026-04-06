import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth || auth.role !== 'admin') {
    return NextResponse.json(fail('无权限'), { status: 403 })
  }

  const { searchParams } = request.nextUrl
  const role = searchParams.get('role')
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const search = searchParams.get('search')

  let users = [...mockDb.users]
  if (role) users = users.filter(u => u.role === role)
  if (search) users = users.filter(u =>
    u.account.includes(search) || u.nickname?.includes(search)
  )

  const total = users.length
  const items = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice((page - 1) * pageSize, page * pageSize)
    .map(({ password: _, ...u }) => u)

  return NextResponse.json(ok({ items, total, page, pageSize }))
}
