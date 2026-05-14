import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import Modal from '../ui/Modal'
import RegisterForm from './RegisterForm'

export default function LoginForm() {
  const { signIn } = useAuth()
  const navigate   = useNavigate()
  const [form,     setForm]     = useState({ email: '', password: '' })
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  function validate() {
    const e = {}
    if (!form.email)    e.email    = 'Email is required'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await signIn(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-8">
      <h2 className="text-xl font-bold text-dark-50 mb-1">Sign In</h2>
      <p className="text-dark-400 text-sm mb-6">Enter your credentials to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="label">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              id="login-email"
              type="email"
              className={`input-field pl-9 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="admin@pharmacare.com"
              value={form.email}
              onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })) }}
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              className={`input-field pl-9 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              value={form.password}
              onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: '' })) }}
            />
            <button type="button" onClick={() => setShowPass(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        <button id="login-submit" type="submit" disabled={loading}
          className="btn-primary w-full justify-center py-2.5">
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <LogIn size={16} />}
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-dark-400 text-sm mt-6">
        Don't have an account?{' '}
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
        >
          Register
        </button>
      </p>

      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Create Account"
        size="lg"
      >
        <RegisterForm onClose={() => setIsRegisterModalOpen(false)} isModal={true} />
      </Modal>
    </div>
  )
}
