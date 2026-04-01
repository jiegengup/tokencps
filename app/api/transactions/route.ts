import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    if (!userId) {
      return NextResponse.json({ success: false, message: '缺少用户ID' }, { status: 400 });
    }

    // Mock 交易流水数据
    const allTransactions = [
      { id: '1', userId, type: 'income', amount: 59.80, balance: 1580.50, relatedOrderId: 'ORD001', description: '推广佣金 - 高端蓝牙耳机', createdAt: new Date('2024-03-21') },
      { id: '2', userId, type: 'income', amount: 79.80, balance: 1520.70, relatedOrderId: 'ORD002', description: '推广佣金 - 智能手表', createdAt: new Date('2024-03-20') },
      { id: '3', userId, type: 'withdrawal', amount: -500.00, balance: 1440.90, description: '提现到支付宝', createdAt: new Date('2024-03-19') },
      { id: '4', userId, type: 'income', amount: 39.60, balance: 1940.90, relatedOrderId: 'ORD003', description: '推广佣金 - 无线充电器', createdAt: new Date('2024-03-18') },
      { id: '5', userId, type: 'refund', amount: -59.80, balance: 1901.30, relatedOrderId: 'ORD004', description: '订单退款 - 佣金扣回', createdAt: new Date('2024-03-17') },
      { id: '6', userId, type: 'income', amount: 119.60, balance: 1961.10, relatedOrderId: 'ORD005', description: '推广佣金 - 蓝牙耳机x2', createdAt: new Date('2024-03-16') },
    ];

    let filtered = allTransactions;
    if (type && type !== 'all') {
      filtered = filtered.filter(t => t.type === type);
    }

    const total = filtered.length;
    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return NextResponse.json({
      success: true,
      data: {
        transactions: data,
        pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
      },
    });
  } catch (error) {
    console.error('获取交易流水失败:', error);
    return NextResponse.json({ success: false, message: '获取交易流水失败' }, { status: 500 });
  }
}
