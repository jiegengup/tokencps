import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

// 需要认证的路由
const protectedRoutes = ['/dashboard', '/orders', '/promotions', '/withdrawal', '/profile', '/admin']
// 需要管理员权限的路由
const adminRoutes = ['/admin']
// 公开路由（不需要认证）
const publicRoutes = ['/', '/auth', '/products', '/api/auth', '/p']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 检查是否是公开路由
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

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
    const loginUrl = new URL('/auth/login', request.url)
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
    const loginUrl = new URL('/auth/login', request.url)
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
