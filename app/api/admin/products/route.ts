import { NextRequest, NextResponse } from 'next/server'

const mockProducts = [
  {
    id: '1',
    title: 'Claude API 套餐 - 基础版',
    price: '99.00',
    commission: '9.90',
    commissionRate: '10',
    stock: 999,
    sales: 156,
    status: 'active'
  },
  {
    id: '2',
    title: 'Claude API 套餐 - 专业版',
    price: '299.00',
    commission: '29.90',
    commissionRate: '10',
    stock: 999,
    sales: 89,
    status: 'active'
  },
  {
    id: '3',
    title: 'Claude API 套餐 - 企业版',
    price: '999.00',
    commission: '99.90',
    commissionRate: '10',
    stock: 999,
    sales: 34,
    status: 'active'
  },
  {
    id: '4',
    title: 'Claude API 套餐 - 旗舰版',
    price: '2999.00',
    commission: '299.90',
    commissionRate: '10',
    stock: 500,
    sales: 12,
    status: 'active'
  },
  {
    id: '5',
    title: 'Claude API 套餐 - 体验版',
    price: '29.00',
    commission: '2.90',
    commissionRate: '10',
    stock: 0,
    sales: 523,
    status: 'inactive'
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: { products: mockProducts }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { title, price, commission, stock } = body

  const commissionRate = ((parseFloat(commission) / parseFloat(price)) * 100).toFixed(1)

  const newProduct = {
    id: String(mockProducts.length + 1),
    title,
    price,
    commission,
    commissionRate,
    stock: parseInt(stock),
    sales: 0,
    status: 'active'
  }

  mockProducts.push(newProduct)

  return NextResponse.json({
    success: true,
    message: '商品添加成功',
    data: { product: newProduct }
  })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  const { id, status } = body

  const product = mockProducts.find(p => p.id === id)
  if (product) {
    product.status = status
  }

  return NextResponse.json({
    success: true,
    message: `商品已${status === 'active' ? '上架' : '下架'}`
  })
}
