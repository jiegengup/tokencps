import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { db } from '@/lib/db'
import { activities } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const rows = await db.select({
    id: activities.id,
    name: activities.name,
    description: activities.description,
    productType: activities.productType,
    commissionRate: activities.commissionRate,
    parentCommissionRate: activities.parentCommissionRate,
    active: activities.active,
    price: activities.price,
    coverImage: activities.coverImage,
    createdAt: activities.createdAt,
    updatedAt: activities.updatedAt,
  }).from(activities).where(eq(activities.active, true))

  return NextResponse.json(ok(rows))
}
