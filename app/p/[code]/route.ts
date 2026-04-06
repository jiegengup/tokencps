import { NextRequest, NextResponse } from 'next/server';
import { recordClick } from '@/lib/utils/tracking';
import { checkClickFraud } from '@/lib/services/risk-control';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 构建正确的外部 URL（通过反代时使用 Host header）
    const proto = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || '58.87.69.241';
    const baseUrl = `${proto}://${host}`;

    // 风控检查
    const fraudCheck = checkClickFraud(ip, code);
    if (!fraudCheck.allowed) {
      console.warn(`[风控] 点击被拦截: ${fraudCheck.reason}`);
      return NextResponse.redirect(new URL('/buy', baseUrl), { status: 302 });
    }

    // 记录点击
    recordClick(code, ip, userAgent);

    // 设置追踪 Cookie（30天有效期）并重定向到C端落地页
    const response = NextResponse.redirect(
      new URL(`/buy?ref=${code}`, baseUrl),
      { status: 302 }
    );

    response.cookies.set('_tcps_ref', code, {
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('推广链接跳转失败:', error);
    return NextResponse.redirect(new URL('/buy', 'https://58.87.69.241'), { status: 302 });
  }
}
