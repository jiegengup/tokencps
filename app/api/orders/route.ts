import { NextRequest, NextResponse } from 'next/server';
import { calculateCommission } from '@/lib/utils';

// 创建订单
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId, quantity, promotionCode } = body;

    // 验证必填字段
    if (!userId || !productId || !quantity) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数' },
        { status: 400 }
      );
    }

    // TODO: 查询商品信息
    const product = {
      id: productId,
      price: 299,
      commissionRate: 20,
    };

    // 计算订单金额
    const totalAmount = product.price * quantity;
    const commission = calculateCommission(product.price, product.commissionRate) * quantity;

    // 生成订单号
    const orderNo = 'ORD' + Date.now() + Math.random().toString(36).substring(2, 8).toUpperCase();

    // TODO: 查询推广者ID（通过 promotionCode）
    const promoterId = promotionCode ? 'promoter123' : userId;

    // TODO: 保存到数据库
    const order = {
      id: Math.random().toString(36).substring(7),
      orderNo,
      userId,
      promoterId,
      productId,
      quantity,
      totalAmount,
      commission,
      status: 'pending' as const,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: '订单创建成功',
      data: order,
    });
  } catch (error) {
    console.error('创建订单失败:', error);
    return NextResponse.json(
      { success: false, message: '创建订单失败' },
      { status: 500 }
    );
  }
}

// 获取订单列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type'); // 'buyer' | 'promoter'

    if (!userId) {
      return NextResponse.json(
        { success: false, message: '缺少用户ID' },
        { status: 400 }
      );
    }

    // TODO: 从数据库查询
    const mockOrders = [
      {
        id: '1',
        orderNo: 'ORD1711234567ABC',
        userId: type === 'buyer' ? userId : 'buyer123',
        promoterId: type === 'promoter' ? userId : 'promoter123',
        productId: '1',
        productTitle: '高端蓝牙耳机 降噪无线耳机',
        quantity: 1,
        totalAmount: 299.00,
        commission: 59.80,
        status: 'completed' as const,
        createdAt: new Date('2024-03-20'),
        paidAt: new Date('2024-03-20'),
        completedAt: new Date('2024-03-21'),
      },
      {
        id: '2',
        orderNo: 'ORD1711234568DEF',
        userId: type === 'buyer' ? userId : 'buyer456',
        promoterId: type === 'promoter' ? userId : 'promoter456',
        productId: '2',
        productTitle: '智能手表 运动健康监测',
        quantity: 1,
        totalAmount: 399.00,
        commission: 79.80,
        status: 'paid' as const,
        createdAt: new Date('2024-03-25'),
        paidAt: new Date('2024-03-25'),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockOrders,
    });
  } catch (error) {
    console.error('获取订单列表失败:', error);
    return NextResponse.json(
      { success: false, message: '获取订单列表失败' },
      { status: 500 }
    );
  }
}
