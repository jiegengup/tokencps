'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const pathname = usePathname();
  const items = [
    { href: '/', icon: '🏠', label: '首页' },
    { href: '/products', icon: '📦', label: '商品' },
    { href: '/promotions', icon: '🔗', label: '推广' },
    { href: '/orders', icon: '📋', label: '订单' },
    { href: '/profile', icon: '👤', label: '我的' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around py-2">
        {items.map(item => {
          const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center py-1 px-3 ${active ? 'text-orange-600' : 'text-gray-500'}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
