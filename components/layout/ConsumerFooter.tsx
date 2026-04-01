import Link from 'next/link';

export default function ConsumerFooter() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>TokenCPS</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Claude API / GPT Plus 官方授权分销平台，人民币直充，无需境外信用卡。
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3" style={{ color: 'var(--text-primary)' }}>产品</h4>
            <div className="space-y-2">
              <Link href="/products" className="block text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>Claude API 套餐</Link>
              <Link href="/products" className="block text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>GPT Plus 月卡</Link>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3" style={{ color: 'var(--text-primary)' }}>支持</h4>
            <div className="space-y-2">
              <Link href="/help" className="block text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>常见问题</Link>
              <Link href="/guide" className="block text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>使用教程</Link>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3" style={{ color: 'var(--text-primary)' }}>法律</h4>
            <div className="space-y-2">
              <Link href="/terms" className="block text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>用户协议</Link>
              <Link href="/privacy" className="block text-sm hover:underline" style={{ color: 'var(--text-secondary)' }}>隐私政策</Link>
            </div>
          </div>
        </div>
        <div className="divider my-8"></div>
        <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
          <span>© 2026 TokenCPS. All rights reserved.</span>
          <Link href="/promoter" className="hover:underline" style={{ color: 'var(--accent)' }}>推广赚钱 →</Link>
        </div>
      </div>
    </footer>
  );
}
