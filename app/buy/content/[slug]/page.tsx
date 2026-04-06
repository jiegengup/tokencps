'use client'
import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/app/buy/components/Header'
import articles from '@/lib/consumer/articles'

export default function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = articles[slug]
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <article>
          <h1 className="text-3xl font-bold text-text mb-3">{article.title}</h1>
          <p className="text-text-secondary mb-8">{article.description}</p>
          <div className="prose prose-neutral max-w-none">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-semibold text-text mt-8 mb-4">{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-medium text-text mt-6 mb-3">{line.slice(4)}</h3>
              if (line.startsWith('- ')) return <li key={i} className="text-text-secondary ml-4 mb-1">{line.slice(2)}</li>
              if (line.startsWith('```')) return null
              if (line.startsWith('|')) return <p key={i} className="text-sm text-text-secondary font-mono">{line}</p>
              if (line.trim()) return <p key={i} className="text-text-secondary mb-3 leading-relaxed">{line}</p>
              return null
            })}
          </div>
        </article>

        {/* Purchase CTA */}
        <div className="mt-12 bg-card rounded-xl border border-border-light p-8 text-center">
          <h3 className="text-lg font-semibold text-text mb-2">立即体验 Claude API</h3>
          <p className="text-text-secondary text-sm mb-4">注册送 $5 额度，人民币直付，无需信用卡</p>
          <div className="flex gap-3 justify-center">
            <Link href="/buy/auth/register" className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-hover transition-colors">
              免费注册
            </Link>
            <Link href="/buy/recharge" className="px-6 py-2.5 border border-border text-text rounded-lg text-sm font-medium hover:bg-hover transition-colors">
              查看套餐
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-text-secondary mb-4">相关文章</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(articles).filter(([k]) => k !== slug).slice(0, 4).map(([k, a]) => (
              <Link key={k} href={`/buy/content/${k}`} className="bg-card rounded-lg border border-border-light p-4 hover:border-border transition-colors">
                <div className="text-sm font-medium text-text mb-1">{a.title}</div>
                <div className="text-xs text-text-tertiary">{a.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
