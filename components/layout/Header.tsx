'use client'

import { useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  nickname: string
  avatar?: string
  balance: number
  role: string
}

interface HeaderProps {
  isLoggedIn: boolean
  user?: User
  currentPath: string
}

export default function Header({ isLoggedIn, user, currentPath }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  const navItems = [
    { href: '/', label: '首页' },
    { href: '/products', label: '商品列表' },
    { href: '/dashboard', label: '控制台', requireAuth: true },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TokenCPS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (item.requireAuth && !isLoggedIn) return null
              const isActive = currentPath === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  } transition-colors`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  注册
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
                >
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt={user?.nickname}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.nickname}
                    </div>
                    <div className="text-xs text-gray-500">
                      余额: ¥{user?.balance.toFixed(2)}
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-200">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      个人中心
                    </Link>
                    <Link
                      href="/finance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      我的订单
                    </Link>
                    <Link
                      href="/promotions"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      推广管理
                    </Link>
                    <Link
                      href="/finance"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      提现
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 font-medium"
                      >
                        管理后台
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navItems.map((item) => {
              if (item.requireAuth && !isLoggedIn) return null
              const isActive = currentPath === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            {!isLoggedIn ? (
              <div className="mt-4 space-y-2">
                <Link
                  href="/auth/login"
                  className="block text-center py-2 text-gray-700 border border-gray-300 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  登录
                </Link>
                <Link
                  href="/auth/register"
                  className="block text-center py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  注册
                </Link>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={user?.avatar || '/default-avatar.png'}
                    alt={user?.nickname}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {user?.nickname}
                    </div>
                    <div className="text-sm text-gray-500">
                      余额: ¥{user?.balance.toFixed(2)}
                    </div>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  个人中心
                </Link>
                <Link
                  href="/finance"
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  我的订单
                </Link>
                <Link
                  href="/promotions"
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  推广管理
                </Link>
                <Link
                  href="/finance"
                  className="block py-2 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  提现
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="block py-2 text-blue-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    管理后台
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-red-600 mt-2"
                >
                  退出登录
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
