import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, size = 'md', footer }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const sizeClasses = {
    sm:  'max-w-sm',
    md:  'max-w-lg',
    lg:  'max-w-2xl',
    xl:  'max-w-4xl',
    full:'max-w-6xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className={`relative w-full ${sizeClasses[size]} glass-card animate-slide-up max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-700">
          <h3 className="text-lg font-semibold text-dark-50">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-dark-400 hover:text-dark-100 hover:bg-dark-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 p-5 border-t border-dark-700">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
