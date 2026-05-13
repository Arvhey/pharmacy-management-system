import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const ICONS = {
  success: <CheckCircle  size={18} className="text-emerald-400 shrink-0" />,
  error:   <XCircle     size={18} className="text-red-400 shrink-0"     />,
  warning: <AlertTriangle size={18} className="text-amber-400 shrink-0" />,
  info:    <Info         size={18} className="text-sky-400 shrink-0"    />,
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => { setVisible(false); onClose?.() }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!visible) return null

  return (
    <div className="flex items-start gap-3 bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 shadow-xl animate-slide-up min-w-[280px] max-w-sm">
      {ICONS[type]}
      <p className="text-sm text-dark-100 flex-1">{message}</p>
      <button onClick={() => { setVisible(false); onClose?.() }} className="text-dark-400 hover:text-dark-100 transition-colors ml-1">
        <X size={14} />
      </button>
    </div>
  )
}
