import { NextRequest, NextResponse } from 'next/server'

const mockUsers = [
  {
    id: '10001',
    nickname: '张三',
    phone: '13800138001',
    email: 'zhangsan@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-15 10:30',
    totalEarnings: '1,280.50'
  },
  {
    id: '10002',
    nickname: '李四',
    phone: '13800138002',
    email: 'lisi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-20 14:22',
    totalEarnings: '3,456.00'
  },
  {
    id: '10003',
    nickname: '王五',
    phone: '13800138003',
    email: 'wangwu@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-10 09:15',
    totalEarnings: '8,920.30'
  },
  {
    id: '10004',
    nickname: '赵六',
    phone: '13800138004',
    email: 'zhaoliu@example.com',
    role: 'user',
    status: 'disabled',
    createdAt: '2024-02-01 16:45',
    totalEarnings: '520.00'
  },
  {
    id: '10005',
    nickname: '孙七',
    phone: '13800138005',
    email: 'sunqi@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-10 11:20',
    totalEarnings: '2,100.80'
  },
  {
    id: '10006',
    nickname: '周八',
    phone: '13800138006',
    email: 'zhouba@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-15 13:50',
    totalEarnings: '756.20'
  },
  {
    id: '10007',
    nickname: '吴九',
    phone: '13800138007',
    email: 'wujiu@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-03-01 08:30',
    totalEarnings: '4,320.00'
  },
  {
    id: '10008',
    nickname: '郑十',
    phone: '13800138008',
    email: 'zhengshi@example.com',
    role: 'user',
    status: 'disabled',
    createdAt: '2024-03-10 15:10',
    totalEarnings: '180.50'
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''

  let filtered = [...mockUsers]

  if (search) {
    filtered = filtered.filter(u => 
      u.phone.includes(search) || u.email.includes(search)
    )
  }

  if (status && status !== 'all') {
    filtered = filtered.filter(u => u.status === status)
  }

  const total = filtered.length
  const start = (page - 1) * pageSize
  const users = filtered.slice(start, start + pageSize)

  return NextResponse.json({
    success: true,
    data: { users, total }
  })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { userId, status } = body

  // Mock 更新
  const user = mockUsers.find(u => u.id === userId)
  if (user) {
    user.status = status
  }

  return NextResponse.json({
    success: true,
    message: `用户状态已更新为${status === 'active' ? '正常' : '禁用'}`
  })
}
