'use client'
import React from 'react'

interface PaginationProps {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

export function Pagination({ page, total, pageSize, onChange }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  if (totalPages <= 1) return null

  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) pages.push(i)
    else if (pages[pages.length - 1] !== '...') pages.push('...')
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button onClick={() => onChange(page - 1)} disabled={page <= 1} className="px-3 py-1.5 text-sm rounded-[8px] text-text-secondary hover:bg-cream-dark disabled:opacity-30">上一页</button>
      {pages.map((p, i) =>
        p === '...' ? <span key={i} className="px-2 text-text-tertiary">...</span> : (
          <button key={i} onClick={() => onChange(p)} className={`px-3 py-1.5 text-sm rounded-[8px] ${p === page ? 'bg-accent text-white' : 'text-text-secondary hover:bg-cream-dark'}`}>{p}</button>
        )
      )}
      <button onClick={() => onChange(page + 1)} disabled={page >= totalPages} className="px-3 py-1.5 text-sm rounded-[8px] text-text-secondary hover:bg-cream-dark disabled:opacity-30">下一页</button>
    </div>
  )
}
