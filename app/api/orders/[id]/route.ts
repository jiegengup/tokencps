import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;

    // TODO: 从数据库查询
    const mockOrder = {
      id: orderId,
      orderNo: 'ORD1711234567ABC',
      userId: 'user123',
      promoterId: 'promoter123',
      productId: '1',
      productTitle: '高端蓝牙耳机 降噪无线耳机',
      productImage: '/images/product1.jpg',
      quantity: 1,
      totalAmount: 299.00,
      commission: 59.80,
      status: 'completed' as const,
      createdAt: new Date('2024-03-20'),
      paidAt: new Date('2024-03-20'),
      completedAt: new Date('2024-03-21'),
    };

    return NextResponse.json({
      success: true,
      data: mockOrder,
    });
  } catch (error) {
    console.error('获取订单详情失败:', error);
    return NextResponse.json(
      { success: false, message: '获取订单详情失败' },
      { status: 500 }
    );
  }
}

// 更新订单状态
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderId = params.id;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: '缺少状态参数' },
        { status: 400 }
      );
    }

    // TODO: 更新数据库
    // 如果状态变为 completed，需要给推广者发放佣金

    return NextResponse.json({
      success: true,
      message: '订单状态更新成功',
      data: { id: orderId, status },
    });
  } catch (error) {
    console.error('更新订单状态失败:', error);
    return NextResponse.json(
      { success: false, message: '更新订单状态失败' },
      { status: 500 }
    );
  }
}
