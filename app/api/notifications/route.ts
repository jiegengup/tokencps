import { NextRequest, NextResponse } from 'next/server'

// Mock 通知数据
const mockNotifications = [
  {
    id: '1',
    userId: 'user_001',
    type: 'system',
    title: '系统通知',
    content: '欢迎使用 TokenCPS 推广平台！',
    read: false,
    createdAt: '2024-03-20 10:00'
  },
  {
    id: '2',
    userId: 'user_001',
    type: 'order',
    title: '新订单通知',
    content: '您推广的商品「Claude API 套餐 - 专业版」产生了一笔新订单，订单金额 ¥299.00',
    read: false,
    createdAt: '2024-03-20 14:30'
  },
  {
    id: '3',
    userId: 'user_001',
    type: 'commission',
    title: '佣金到账通知',
    content: '您获得了 ¥29.90 的推广佣金，订单号：ORD20240320001',
    read: false,
    createdAt: '2024-03-20 15:00'
  },
  {
    id: '4',
    userId: 'user_001',
    type: 'order',
    title: '订单完成通知',
    content: '订单 ORD20240319002 已完成，佣金已结算',
    read: true,
    createdAt: '2024-03-19 16:20'
  },
  {
    id: '5',
    userId: 'user_001',
    type: 'withdrawal',
    title: '提现审核通过',
    content: '您的提现申请已通过审核，金额 ¥1000.00 将在 1-3 个工作日内到账',
    read: true,
    createdAt: '2024-03-18 11:00'
  },
  {
    id: '6',
    userId: 'user_001',
    type: 'system',
    title: '平台升级通知',
    content: '平台将于今晚 23:00-24:00 进行系统维护升级，期间可能无法访问',
    read: true,
    createdAt: '2024-03-17 09:30'
  },
  {
    id: '7',
    userId: 'user_001',
    type: 'commission',
    title: '佣金到账通知',
    content: '您获得了 ¥99.90 的推广佣金，订单号：ORD20240316003',
    read: true,
    createdAt: '2024-03-16 13:45'
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get('userId') || 'user_001'
  const type = searchParams.get('type')
  const read = searchParams.get('read')

  let filtered = mockNotifications.filter(n => n.userId === userId)

  if (type) {
    filtered = filtered.filter(n => n.type === type)
  }

  if (read !== null && read !== undefined) {
    const isRead = read === 'true'
    filtered = filtered.filter(n => n.read === isRead)
  }

  // 按时间倒序
  filtered.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const unreadCount = mockNotifications.filter(n => n.userId === userId && !n.read).length

  return NextResponse.json({
    success: true,
    data: {
      notifications: filtered,
      unreadCount
    }
  })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { notificationId, markAllRead, userId } = body

  if (markAllRead && userId) {
    // 标记所有为已读
    mockNotifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true
      }
    })
    return NextResponse.json({
      success: true,
      message: '所有通知已标记为已读'
    })
  }

  if (notificationId) {
    // 标记单个为已读
    const notification = mockNotifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      return NextResponse.json({
        success: true,
        message: '通知已标记为已读'
      })
    }
  }

  return NextResponse.json({
    success: false,
    message: '无效的请求'
  })
}
