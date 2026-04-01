'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/auth-store';

export default function PromoterHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const navItems = [
    { href: '/promoter', label: '数据概览' },
    { href: '/promoter/links', label: '推广链接' },
    { href: '/promoter/commission', label: '佣金明细' },
    { href: '/promoter/withdrawal', label: '提现' },
    { href: '/promoter/team', label: '我的团队' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: 'var(--border-light)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4">
            <Link href="/promoter" className="font-bold" style={{ color: 'var(--text-primary)' }}>
              TokenCPS <span className="text-xs font-normal" style={{ color: 'var(--text-tertiary)' }}>推广中心</span>
            </Link>
            {/* 导航 — PC */}
            <nav className="hidden md:flex items-center space-x-1 ml-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-sm ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/" className="text-xs hover:underline" style={{ color: 'var(--text-tertiary)' }}>去购买</Link>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.nickname || '推广员'}</span>
            <button onClick={() => { logout(); window.location.href = '/auth/login'; }} className="text-xs" style={{ color: 'var(--text-tertiary)' }}>退出</button>
          </div>
        </div>
      </div>

      {/* 移动端导航 */}
      <nav className="md:hidden overflow-x-auto border-t" style={{ borderColor: 'var(--border-light)' }}>
        <div className="flex px-4 space-x-1 py-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link text-xs whitespace-nowrap ${pathname === item.href ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
