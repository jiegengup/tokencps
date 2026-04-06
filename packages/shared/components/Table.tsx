'use client'
import React from 'react'

interface Column<T> {
  key: string
  title: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  rowKey?: string
  emptyText?: string
}

export function Table<T extends Record<string, any>>({ columns, data, rowKey = 'id', emptyText = '暂无数据' }: TableProps<T>) {
  if (!data.length) {
    return <div className="py-12 text-center text-text-tertiary text-sm">{emptyText}</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border-light">
            {columns.map(col => (
              <th key={col.key} className={`text-left py-3 px-3 text-text-tertiary font-medium ${col.className || ''}`}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row[rowKey]} className="border-b border-border-light last:border-0 hover:bg-cream-dark/50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className={`py-3 px-3 ${col.className || ''}`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
