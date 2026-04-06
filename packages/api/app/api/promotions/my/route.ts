import { NextRequest, NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth'
import { mockDb } from '@/lib/mock'
import { ok, fail } from '@/lib/types'

export async function GET(request: NextRequest) {
  const auth = await getAuthUser(request)
  if (!auth) return NextResponse.json(fail('未登录'), { status: 401 })

  const links = mockDb.promotionLinks.filter(l => l.userId === auth.userId)
  // Enrich with activity info
  const enriched = links.map(link => {
    const activity = mockDb.activities.find(a => a.id === link.activityId)
    return { ...link, activityName: activity?.name, supplier: activity?.supplier }
  })

  return NextResponse.json(ok(enriched))
}
