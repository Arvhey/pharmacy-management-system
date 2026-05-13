import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-fade-in">
        {/* Big 404 */}
        <div className="relative mb-6">
          <p className="text-[120px] font-extrabold text-dark-800 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl animate-pulse-slow">💊</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-dark-50 mb-2">Page Not Found</h1>
        <p className="text-dark-400 text-sm mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It may have been moved or the URL might be incorrect.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home size={16} /> Back to Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn-secondary">
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
