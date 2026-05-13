import { useAuth } from '../../context/AuthContext'
import { USER_ROLES } from '../../utils/constants'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function UserProfile({ compact = false }) {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const role        = profile?.role || 'staff'
  const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

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
    <div className="flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium text-dark-100 leading-tight">{displayName}</p>
        <p className="text-xs text-dark-400">{USER_ROLES[role]?.label || role}</p>
      </div>
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-bold shadow-glow">
        {initials}
      </div>
    </div>
  )
}
