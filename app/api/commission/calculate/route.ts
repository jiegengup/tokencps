import { NextRequest, NextResponse } from 'next/server';
import { calculateCommission, calculateGPTPlusCommission } from '@/lib/services/commission-v2';

export async function POST(request: NextRequest) {
  try {
    const { orderAmount, hasParent, type } = await request.json();
    if (!orderAmount || typeof orderAmount !== 'number') {
      return NextResponse.json({ success: false, message: '请提供有效的订单金额' }, { status: 400 });
    }

    if (type === 'gpt') {
      const commission = calculateGPTPlusCommission(orderAmount);
      return NextResponse.json({
        success: true,
        data: { type: 'gpt', orderAmount, promoterCommission: commission, rate: '70%', settlement: '一次性' },
      });
    }

    const result = calculateCommission(orderAmount, !!hasParent);
    return NextResponse.json({
      success: true,
      data: { type: 'claude', orderAmount, hasParent: !!hasParent, ...result },
    });
  } catch {
    return NextResponse.json({ success: false, message: '计算失败' }, { status: 500 });
  }
}
