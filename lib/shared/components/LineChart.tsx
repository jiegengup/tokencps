'use client'
import React from 'react'

interface LineChartProps {
  data: number[]
  labels?: string[]
  height?: number
  color?: string
  showDots?: boolean
}

export function LineChart({ data, labels, height = 160, color = '#C96442', showDots = true }: LineChartProps) {
  if (!data.length) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const w = 100
  const h = height
  const pad = 8

  const points = data.map((v, i) => ({
    x: pad + (i / Math.max(data.length - 1, 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2),
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1].x} ${h - pad} L ${points[0].x} ${h - pad} Z`

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
        <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {showDots && points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="white" stroke={color} strokeWidth="1.5" />
        ))}
      </svg>
      {labels && (
        <div className="flex justify-between px-2 mt-1">
          {labels.map((l, i) => <span key={i} className="text-[10px] text-text-tertiary">{l}</span>)}
        </div>
      )}
    </div>
  )
}
