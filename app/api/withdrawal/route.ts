import { NextRequest, NextResponse } from 'next/server';

// 提现申请
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, method, account, accountName } = body;

    // 验证必填字段
    if (!userId || !amount || !method || !account) {
      return NextResponse.json(
        { success: false, message: '请填写完整信息' },
        { status: 400 }
      );
    }

    // 验证提现金额
    if (amount < 10) {
      return NextResponse.json(
        { success: false, message: '最低提现金额为10元' },
        { status: 400 }
      );
    }

    // TODO: 查询用户余额
    const userBalance = 1580.50; // Mock 数据

    if (amount > userBalance) {
      return NextResponse.json(
        { success: false, message: '余额不足' },
        { status: 400 }
      );
    }

    // 计算手续费（1%）
    const fee = Math.floor(amount * 0.01 * 100) / 100;
    const actualAmount = amount - fee;

    // TODO: 保存到数据库
    const withdrawal = {
      id: Math.random().toString(36).substring(7),
      userId,
      amount,
      fee,
      actualAmount,
      method,
      account,
      accountName,
      status: 'pending' as const,
      createdAt: new Date(),
    };

    // TODO: 扣除用户余额

    return NextResponse.json({
      success: true,
      message: '提现申请已提交，预计1-3个工作日到账',
      data: withdrawal,
    });
  } catch (error) {
    console.error('提现申请失败:', error);
    return NextResponse.json(
      { success: false, message: '提现申请失败' },
      { status: 500 }
    );
  }
}

// 获取提现记录
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
    const mockWithdrawals = [
      {
        id: '1',
        userId,
        amount: 500.00,
        fee: 5.00,
        actualAmount: 495.00,
        method: 'alipay' as const,
        account: 'user@example.com',
        status: 'completed' as const,
        createdAt: new Date('2024-03-20'),
        processedAt: new Date('2024-03-21'),
      },
      {
        id: '2',
        userId,
        amount: 300.00,
        fee: 3.00,
        actualAmount: 297.00,
        method: 'wechat' as const,
        account: '138****8000',
        status: 'pending' as const,
        createdAt: new Date('2024-03-25'),
      },
    ];

    return NextResponse.json({
      success: true,
      data: mockWithdrawals,
    });
  } catch (error) {
    console.error('获取提现记录失败:', error);
    return NextResponse.json(
      { success: false, message: '获取提现记录失败' },
      { status: 500 }
    );
  }
}
