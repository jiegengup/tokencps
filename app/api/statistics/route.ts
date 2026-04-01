import { NextRequest, NextResponse } from 'next/server';
import { mockStatistics } from '@/lib/db/config';

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

    // TODO: 从数据库查询真实数据
    const statistics = {
      ...mockStatistics,
      userId,
    };

    return NextResponse.json({
      success: true,
      data: statistics,
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return NextResponse.json(
      { success: false, message: '获取统计数据失败' },
      { status: 500 }
    );
  }
}
