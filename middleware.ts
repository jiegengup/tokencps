import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tokencps-dev-secret-key-min-32-chars!!'
)

// 需要认证的路由
const protectedRoutes = ['/dashboard', '/promotions', '/withdrawal', '/profile', '/admin', '/account', '/notifications', '/finance', '/team', '/buy/dashboard', '/buy/keys', '/buy/usage', '/buy/orders', '/buy/recharge', '/buy/settings']
// 需要管理员权限的路由
const adminRoutes = ['/admin']
// 公开路由（不需要认证）
const publicRoutes = ['/', '/auth', '/api/auth', '/p', '/guide', '/terms', '/privacy', '/promoter-agreement', '/help', '/feedback', '/buy/auth', '/buy/docs', '/buy/content']
// /buy 落地页单独处理（精确匹配，不匹配子路由）
const exactPublicRoutes = ['/buy']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是公开路由
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  ) || exactPublicRoutes.includes(pathname)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // 检查是否是受保护的路由
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 从 cookie 或 Authorization header 读取 token
  let token = request.cookies.get('token')?.value
  
  if (!token) {
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    }
  }

  // 没有 token，重定向到登录页
  if (!token) {
    // 根据路由决定重定向到哪个登录页
    const isBuyRoute = pathname.startsWith('/buy/')
    const loginPath = isBuyRoute ? '/buy/auth/login' : '/auth/login'
    const loginUrl = new URL(loginPath, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    // 验证 JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET)
    
    // 检查是否是管理员路由
    const isAdminRoute = adminRoutes.some(route => 
      pathname === route || pathname.startsWith(`${route}/`)
    )

    if (isAdminRoute && payload.role !== 'admin') {
      // 非管理员访问管理员路由，重定向到首页
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 验证通过，继续请求
    return NextResponse.next()
  } catch (error) {
    // token 无效或过期，重定向到登录页
    const isBuyRoute = pathname.startsWith('/buy/')
    const loginPath = isBuyRoute ? '/buy/auth/login' : '/auth/login'
    const loginUrl = new URL(loginPath, request.url)
    loginUrl.searchParams.set('redirect', pathname)
    const response = NextResponse.redirect(loginUrl)
    // 清除无效的 token
    response.cookies.delete('token')
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
