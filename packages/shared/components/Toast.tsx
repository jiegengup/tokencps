'use client'
import React, { useState, useEffect, useCallback } from 'react'

interface ToastItem { id: number; message: string; type: 'success' | 'error' | 'info' }

let addToastFn: ((msg: string, type?: ToastItem['type']) => void) | null = null

export function toast(message: string, type: ToastItem['type'] = 'info') {
  addToastFn?.(message, type)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: ToastItem['type'] = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }, [])

  useEffect(() => { addToastFn = addToast; return () => { addToastFn = null } }, [addToast])

  const colors = { success: 'bg-success text-white', error: 'bg-danger text-white', info: 'bg-text text-white' }

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-2.5 rounded-[12px] text-sm shadow-lg animate-[slideIn_0.2s_ease] ${colors[t.type]}`}>
            {t.message}
          </div>
        ))}
      </div>
    </>
  )
}
