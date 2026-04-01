import { NextRequest, NextResponse } from 'next/server'

const mockWithdrawals = [
  {
    id: '1',
    userName: '张三',
    amount: '1000.00',
    fee: '10.00',
    actualAmount: '990.00',
    method: '支付宝',
    account: 'zhangsan@alipay.com',
    status: 'pending',
    createdAt: '2024-03-20 10:30'
  },
  {
    id: '2',
    userName: '李四',
    amount: '2000.00',
    fee: '20.00',
    actualAmount: '1980.00',
    method: '微信',
    account: 'lisi_wx_12345',
    status: 'processing',
    createdAt: '2024-03-19 14:22'
  },
  {
    id: '3',
    userName: '王五',
    amount: '500.00',
    fee: '5.00',
    actualAmount: '495.00',
    method: '银行卡',
    account: '6222 **** **** 1234',
    status: 'completed',
    createdAt: '2024-03-18 09:15'
  },
  {
    id: '4',
    userName: '赵六',
    amount: '3000.00',
    fee: '30.00',
    actualAmount: '2970.00',
    method: '支付宝',
    account: 'zhaoliu@alipay.com',
    status: 'rejected',
    createdAt: '2024-03-17 16:45'
  },
  {
    id: '5',
    userName: '孙七',
    amount: '1500.00',
    fee: '15.00',
    actualAmount: '1485.00',
    method: '微信',
    account: 'sunqi_wx_67890',
    status: 'pending',
    createdAt: '2024-03-21 11:20'
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status') || ''

  let filtered = [...mockWithdrawals]

  if (status && status !== 'all') {
    filtered = filtered.filter(w => w.status === status)
  }

  return NextResponse.json({
    success: true,
    data: { withdrawals: filtered }
  })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, action, reason } = body

  const withdrawal = mockWithdrawals.find(w => w.id === id)
  if (!withdrawal) {
    return NextResponse.json({
      success: false,
      message: '提现记录不存在'
    })
  }

  if (action === 'approve') {
    withdrawal.status = 'processing'
    return NextResponse.json({
      success: true,
      message: '提现申请已通过，正在处理中'
    })
  } else if (action === 'reject') {
    withdrawal.status = 'rejected'
    return NextResponse.json({
      success: true,
      message: `提现申请已拒绝：${reason}`
    })
  }

  return NextResponse.json({
    success: false,
    message: '无效的操作'
  })
}
