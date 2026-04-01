import { NextResponse } from 'next/server';
import { getRiskAlerts } from '@/lib/services/risk-control';

export async function GET() {
  try {
    const alerts = getRiskAlerts();
    return NextResponse.json({ success: true, data: alerts });
  } catch (error) {
    console.error('获取风控告警失败:', error);
    return NextResponse.json({ success: false, message: '获取风控告警失败' }, { status: 500 });
  }
}
