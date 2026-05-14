import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { USER_ROLES } from '../../utils/constants'
import { LogOut, User, Settings } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function UserProfile({ compact = false }) {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const role        = profile?.role || 'staff'
  const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleSignOut() {
    try { await signOut() } catch {}
    navigate('/login')
    toast.success('Signed out')
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2">
        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-dark-100 truncate">{displayName}</p>
          <p className="text-xs text-dark-400 truncate">{USER_ROLES[role]?.label || role}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 focus:outline-none hover:opacity-80 transition-opacity"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-dark-100 leading-tight">{displayName}</p>
          <p className="text-xs text-dark-400">{USER_ROLES[role]?.label || role}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-glow">
          {initials}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-xl shadow-card overflow-hidden z-50 animate-slide-up">
          <div className="p-3 border-b border-dark-700 sm:hidden">
            <p className="text-sm font-medium text-dark-100 leading-tight truncate">{displayName}</p>
            <p className="text-xs text-dark-400 truncate">{USER_ROLES[role]?.label || role}</p>
          </div>
          <div className="p-1">
            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-dark-200 hover:text-dark-50 hover:bg-dark-700/50 rounded-lg transition-colors">
              <User size={16} /> Profile
            </Link>
            <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-dark-200 hover:text-dark-50 hover:bg-dark-700/50 rounded-lg transition-colors">
              <Settings size={16} /> Settings
            </Link>
            <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors mt-1">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
