import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthLayout() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  // Redirect already-authenticated users to dashboard
  if (user) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl -z-0" />

      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-500/30 mb-4 shadow-glow">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="28" height="20" rx="3" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="1.5"/>
              <path d="M12 18h8M16 14v8" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 8V6a2 2 0 012-2h12a2 2 0 012 2v2" stroke="#14b8a6" strokeWidth="1.5"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gradient">PharmaCare</h1>
          <p className="text-dark-400 text-sm mt-1">Pharmacy Management System</p>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
