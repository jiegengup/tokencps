import { NextRequest, NextResponse } from 'next/server'

const mockOrders = [
  {
    id: '1',
    orderNo: 'ORD20240315001',
    productName: 'Claude API 套餐 - 专业版',
    buyerName: '张三',
    promoterName: '李四',
    amount: '299.00',
    commission: '29.90',
    status: 'completed',
    createdAt: '2024-03-15 10:30'
  },
  {
    id: '2',
    orderNo: 'ORD20240316002',
    productName: 'Claude API 套餐 - 企业版',
    buyerName: '王五',
    promoterName: '赵六',
    amount: '999.00',
    commission: '99.90',
    status: 'paid',
    createdAt: '2024-03-16 14:22'
  },
  {
    id: '3',
    orderNo: 'ORD20240317003',
    productName: 'Claude API 套餐 - 基础版',
    buyerName: '孙七',
    promoterName: null,
    amount: '99.00',
    commission: '0.00',
    status: 'pending',
    createdAt: '2024-03-17 09:15'
  },
  {
    id: '4',
    orderNo: 'ORD20240318004',
    productName: 'Claude API 套餐 - 专业版',
    buyerName: '周八',
    promoterName: '吴九',
    amount: '299.00',
    commission: '29.90',
    status: 'completed',
    createdAt: '2024-03-18 16:45'
  },
  {
    id: '5',
    orderNo: 'ORD20240319005',
    productName: 'Claude API 套餐 - 企业版',
    buyerName: '郑十',
    promoterName: '李四',
    amount: '999.00',
    commission: '99.90',
    status: 'cancelled',
    createdAt: '2024-03-19 11:20'
  },
  {
    id: '6',
    orderNo: 'ORD20240320006',
    productName: 'Claude API 套餐 - 基础版',
    buyerName: '陈一',
    promoterName: '张三',
    amount: '99.00',
    commission: '9.90',
    status: 'completed',
    createdAt: '2024-03-20 13:50'
  }
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const status = searchParams.get('status') || ''

  let filtered = [...mockOrders]

  if (status && status !== 'all') {
    filtered = filtered.filter(o => o.status === status)
  }

  const total = filtered.length
  const start = (page - 1) * pageSize
  const orders = filtered.slice(start, start + pageSize)

  return NextResponse.json({
    success: true,
    data: { orders, total }
  })
}
