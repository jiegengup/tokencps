'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/consumer/store'

const navItems = [
  { href: '/buy/dashboard', label: '控制台' },
  { href: '/buy/recharge', label: '充值' },
  { href: '/buy/keys', label: 'API Key' },
  { href: '/buy/usage', label: '用量统计' },
  { href: '/buy/orders', label: '订单记录' },
  { href: '/buy/docs', label: '帮助文档' },
  { href: '/buy/settings', label: '账号设置' },
]

export function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  return (
    <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold text-text tracking-tight">
            TokenCPS
          </Link>
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    pathname === item.href
                      ? 'bg-accent-light text-accent font-medium'
                      : 'text-text-secondary hover:text-text hover:bg-hover'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-text-secondary hidden sm:block">{user.nickname || user.account}</span>
              <button onClick={logout} className="text-sm text-text-tertiary hover:text-text">退出</button>
            </>
          ) : (
            <Link href="/buy/auth/login" className="text-sm text-accent hover:text-accent-hover font-medium">登录</Link>
          )}
        </div>
      </div>
    </header>
  )
}
