'use client'

import { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return typeof window !== 'undefined'
    ? createPortal(
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          {/* 遮罩层 */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          />

          {/* 弹窗内容 */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto animate-modal-in">
            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 内容区域 */}
            <div className="px-6 py-4">{children}</div>
          </div>
        </div>,
        document.body
      )
    : null
}

// 添加动画样式到全局 CSS
// @keyframes modal-in {
//   from {
//     transform: scale(0.95);
//     opacity: 0;
//   }
//   to {
//     transform: scale(1);
//     opacity: 1;
//   }
// }
// .animate-modal-in {
//   animation: modal-in 0.2s ease-out;
// }
