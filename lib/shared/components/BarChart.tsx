'use client'
import React from 'react'

interface BarChartProps {
  data: number[]
  labels?: string[]
  height?: number
  color?: string
}

export function BarChart({ data, labels, height = 160, color = '#C96442' }: BarChartProps) {
  if (!data.length) return null
  const max = Math.max(...data, 1)

  return (
    <div className="w-full">
      <div className="flex items-end gap-1.5 justify-between" style={{ height }}>
        {data.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
            <div
              className="w-full rounded-t-[4px] transition-all duration-300 min-h-[2px]"
              style={{ height: `${(v / max) * 100}%`, backgroundColor: color, opacity: 0.7 + (v / max) * 0.3 }}
            />
          </div>
        ))}
      </div>
      {labels && (
        <div className="flex justify-between mt-1.5">
          {labels.map((l, i) => <span key={i} className="text-[10px] text-text-tertiary flex-1 text-center">{l}</span>)}
        </div>
      )}
    </div>
  )
}
