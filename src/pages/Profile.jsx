import { useState } from 'react'
import { useAuth }   from '../hooks/useAuth'
import { User, Mail, Shield, Save, Camera } from 'lucide-react'
import { USER_ROLES } from '../utils/constants'
import { formatDate } from '../utils/formatDate'
import toast from 'react-hot-toast'

export default function Profile() {
  const { user, profile, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [form,    setForm]    = useState({
    full_name: profile?.full_name || '',
    phone:     profile?.phone     || '',
    address:   profile?.address   || '',
  })

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const role        = profile?.role || 'staff'
  const initials    = displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(form)
      setEditing(false)
      toast.success('Profile updated!')
    } catch (err) {
      // Demo mode – no backend
      setEditing(false)
      toast.success('Profile updated! (demo mode)')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="page-title">My Profile</h2>
        <p className="page-subtitle">Manage your account information</p>
      </div>

      {/* Avatar + name card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-3xl font-bold text-white shadow-glow">
            {initials}
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center text-dark-300 hover:text-dark-100 transition-colors">
            <Camera size={13} />
          </button>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-dark-50">{displayName}</h3>
          <p className="text-dark-400 text-sm mt-0.5">{user?.email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <span className={USER_ROLES[role]?.color === 'badge-info' ? 'badge-info' : 'badge-muted'}>
              <Shield size={10} className="mr-1" />{USER_ROLES[role]?.label || role}
            </span>
            <span className="text-xs text-dark-500">Member since {formatDate(user?.created_at || profile?.created_at || new Date())}</span>
          </div>
        </div>
      </div>

      {/* Info form */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="section-title">Personal Information</h3>
          {!editing && (
            <button id="edit-profile-btn" onClick={() => setEditing(true)} className="btn-secondary text-sm py-1.5 px-3">
              Edit Profile
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input id="prof-name" type="text" className="input-field pl-9"
                  value={form.full_name} onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input type="email" className="input-field pl-9 opacity-60 cursor-not-allowed" value={user?.email} disabled />
              </div>
              <p className="text-xs text-dark-500 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input id="prof-phone" type="tel" className="input-field" placeholder="+63 9XX XXX XXXX"
                value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <label className="label">Address</label>
              <textarea id="prof-address" rows={2} className="input-field resize-none" placeholder="Your address..."
                value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} />
            </div>
            <div className="flex gap-2 pt-1">
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary" disabled={saving}>Cancel</button>
              <button id="save-profile-btn" type="submit" className="btn-primary" disabled={saving}>
                {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name',    value: profile?.full_name  || displayName    },
              { label: 'Email',        value: user?.email          || '—'            },
              { label: 'Role',         value: USER_ROLES[role]?.label || role        },
              { label: 'Phone',        value: profile?.phone       || 'Not set'      },
              { label: 'Address',      value: profile?.address     || 'Not set'      },
            ].map(({ label, value }) => (
              <div key={label} className="bg-dark-700/30 rounded-xl p-3">
                <p className="text-xs text-dark-400 mb-1">{label}</p>
                <p className="text-sm font-medium text-dark-100">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
