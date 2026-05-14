import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function RegisterForm({ onClose, isModal }) {
  const { signUp } = useAuth()
  const navigate   = useNavigate()
  const [form,     setForm]     = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: 'staff' })
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)

  function validate() {
    const e = {}
    if (!form.fullName) e.fullName = 'Full name is required'
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.password || form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    return e
  }

  const update = (field, value) => {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.fullName, form.role)
      toast.success('Account created! Please check your email to verify.')
      if (onClose) onClose()
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const field = (id, label, type, field, icon, placeholder, extra = {}) => (
    <div>
      <label className="label">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">{icon}</span>
        <input id={id} type={type} placeholder={placeholder}
          className={`input-field pl-9 ${extra.pr ? extra.pr : ''} ${errors[field] ? 'border-red-500' : ''}`}
          value={form[field]} onChange={e => update(field, e.target.value)} />
        {extra.toggle}
      </div>
      {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
    </div>
  )

  return (
    <div className={isModal ? "" : "glass-card p-8"}>
      {!isModal && (
        <>
          <h2 className="text-xl font-bold text-dark-50 mb-1">Create Account</h2>
          <p className="text-dark-400 text-sm mb-6">Register a new pharmacy staff account</p>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        {field('reg-name', 'Full Name', 'text', 'fullName', <User size={16}/>, 'John Dela Cruz')}

        {/* Email */}
        {field('reg-email', 'Email Address', 'email', 'email', <Mail size={16}/>, 'john@pharmacare.com')}

        {/* Role */}
        <div>
          <label className="label">Role</label>
          <select id="reg-role" className="select-field" value={form.role} onChange={e => update('role', e.target.value)}>
            <option value="staff">Staff</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="label">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input id="reg-password" type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters"
              className={`input-field pl-9 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              value={form.password} onChange={e => update('password', e.target.value)} />
            <button type="button" onClick={() => setShowPass(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label">Confirm Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input id="reg-confirm" type="password" placeholder="Repeat password"
              className={`input-field pl-9 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
          </div>
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <button id="reg-submit" type="submit" disabled={loading}
          className="btn-primary w-full justify-center py-2.5">
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <UserPlus size={16} />}
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}
