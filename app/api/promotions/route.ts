import { NextRequest, NextResponse } from 'next/server';
import { generatePromotionLink } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, userId } = body;

    // 验证必填字段
    if (!productId || !userId) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数' },
        { status: 400 }
      );
    }

    // TODO: 验证用户和商品是否存在

    // 生成推广链接
    const promotionUrl = generatePromotionLink(productId, userId);
    const shortCode = promotionUrl.split('/').pop() || '';

    // TODO: 保存到数据库
    const promotionLink = {
      id: Math.random().toString(36).substring(7),
      userId,
      productId,
      shortCode,
      fullUrl: promotionUrl,
      clicks: 0,
      orders: 0,
      earnings: 0,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: '推广链接生成成功',
      data: promotionLink,
    });
  } catch (error) {
    console.error('生成推广链接失败:', error);
    return NextResponse.json(
      { success: false, message: '生成推广链接失败' },
      { status: 500 }
    );
  }
}

// 获取用户的推广链接列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: '缺少用户ID' },
        { status: 400 }
      );
    }

    // TODO: 从数据库查询
    const mockLinks = [
      {
        id: '1',
        userId,
        productId: '1',
        shortCode: 'ABC123',
        fullUrl: 'http://localhost:3000/p/ABC123',
        clicks: 156,
        orders: 12,
        earnings: 718.00,
        createdAt: new Date('2024-03-15'),
      },
      {
        id: '2',
        userId,
        productId: '2',
        shortCode: 'DEF456',
        fullUrl: 'http://localhost:3000/p/DEF456',
        clicks: 89,
        orders: 7,
        earnings: 558.60,
        createdAt: new Date('2024-03-20'),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockLinks,
    });
  } catch (error) {
    console.error('获取推广链接失败:', error);
    return NextResponse.json(
      { success: false, message: '获取推广链接失败' },
      { status: 500 }
    );
  }
}
