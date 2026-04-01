'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminHeader() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: '数据概览', icon: '📊' },
    { href: '/admin/users', label: '用户管理', icon: '👥' },
    { href: '/admin/orders', label: '订单管理', icon: '📦' },
    { href: '/admin/products', label: '商品管理', icon: '🛍️' },
    { href: '/admin/withdrawals', label: '提现审核', icon: '💰' },
  ]

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center">
            <Link href="/admin" className="text-xl font-bold">
              TokenCPS 管理后台
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Return to Frontend */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>返回前台</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
