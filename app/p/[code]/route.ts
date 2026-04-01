import { NextRequest, NextResponse } from 'next/server';
import { recordClick } from '@/lib/utils/tracking';
import { checkClickFraud } from '@/lib/services/risk-control';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 风控检查
    const fraudCheck = checkClickFraud(ip, code);
    if (!fraudCheck.allowed) {
      console.warn(`[风控] 点击被拦截: ${fraudCheck.reason}`);
      // 仍然重定向，但不记录有效点击
      return NextResponse.redirect(new URL('/products', request.url), { status: 302 });
    }

    // 记录点击
    recordClick(code, ip, userAgent);

    // 设置追踪 Cookie（30天有效期）并重定向到商品页
    const response = NextResponse.redirect(
      new URL(`/products?ref=${code}`, request.url),
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
    return NextResponse.redirect(new URL('/products', request.url), { status: 302 });
  }
}
