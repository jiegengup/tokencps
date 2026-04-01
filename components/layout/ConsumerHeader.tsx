'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function ConsumerHeader() {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuthStore();

  const navItems = [
    { href: '/', label: '首页' },
    { href: '/products', label: '商品列表' },
    { href: '/orders', label: '订单查询' },
    { href: '/help', label: '常见问题' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: 'var(--border-light)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>TokenCPS</span>
            <span className="badge badge-accent text-xs">官方</span>
          </Link>

          {/* 导航 — PC */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 右侧操作 */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link href="/account" className="nav-link hidden sm:block">我的账户</Link>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.nickname || user?.email}</span>
                <button onClick={() => { logout(); window.location.href = '/'; }} className="btn-ghost text-sm py-1.5 px-3">退出</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn-ghost text-sm py-1.5 px-3">登录</Link>
                <Link href="/auth/register" className="btn-primary text-sm py-1.5 px-4">注册</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
