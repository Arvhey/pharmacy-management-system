import { useState } from 'react'
import { useTheme }  from '../context/ThemeContext'
import { Sun, Moon, Bell, Shield, Database, Palette, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { LOW_STOCK_THRESHOLD, EXPIRY_SOON_DAYS } from '../utils/constants'

export default function Settings() {
  const { isDark, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState({ lowStock: true, expiry: true, newStock: false })
  const [thresholds,    setThresholds]    = useState({ lowStock: LOW_STOCK_THRESHOLD, expirySoon: EXPIRY_SOON_DAYS })

  function handleNotif(key) {
    setNotifications(p => ({ ...p, [key]: !p[key] }))
    toast.success('Notification preference saved')
  }

  function handleSaveThresholds(e) {
    e.preventDefault()
    toast.success('Thresholds updated!')
  }

  const Toggle = ({ id, value, onChange }) => (
    <button id={id} onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-primary-600' : 'bg-dark-600'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )

  const Section = ({ icon: Icon, title, children }) => (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-primary-600/20 flex items-center justify-center">
          <Icon size={16} className="text-primary-400" />
        </div>
        <h3 className="section-title">{title}</h3>
      </div>
      {children}
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="page-title">Settings</h2>
        <p className="page-subtitle">Customize your PharmaCare experience</p>
      </div>

      {/* Appearance */}
      <Section icon={Palette} title="Appearance">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? <Moon size={18} className="text-dark-300" /> : <Sun size={18} className="text-dark-300" />}
            <div>
              <p className="text-sm font-medium text-dark-100">{isDark ? 'Dark Mode' : 'Light Mode'}</p>
              <p className="text-xs text-dark-400">Switch between dark and light themes</p>
            </div>
          </div>
          <Toggle id="theme-toggle-settings" value={isDark} onChange={toggleTheme} />
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notifications">
        <div className="space-y-4">
          {[
            { key: 'lowStock', label: 'Low Stock Alerts',  sub: 'Notify when medicines are running low' },
            { key: 'expiry',   label: 'Expiry Alerts',     sub: 'Notify when medicines are expiring soon' },
            { key: 'newStock', label: 'New Stock Arrivals', sub: 'Notify on new inventory additions' },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between py-1">
              <div>
                <p className="text-sm font-medium text-dark-100">{label}</p>
                <p className="text-xs text-dark-400">{sub}</p>
              </div>
              <Toggle id={`notif-${key}`} value={notifications[key]} onChange={() => handleNotif(key)} />
            </div>
          ))}
        </div>
      </Section>

      {/* Thresholds */}
      <Section icon={Shield} title="Alert Thresholds">
        <form onSubmit={handleSaveThresholds} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Low Stock Threshold</label>
              <input id="threshold-low" type="number" min={1} max={100}
                className="input-field"
                value={thresholds.lowStock}
                onChange={e => setThresholds(p => ({ ...p, lowStock: e.target.value }))} />
              <p className="text-xs text-dark-500 mt-1">Units at which to warn</p>
            </div>
            <div>
              <label className="label">Expiry Warning (days)</label>
              <input id="threshold-expiry" type="number" min={1} max={180}
                className="input-field"
                value={thresholds.expirySoon}
                onChange={e => setThresholds(p => ({ ...p, expirySoon: e.target.value }))} />
              <p className="text-xs text-dark-500 mt-1">Days before expiry to warn</p>
            </div>
          </div>
          <button id="save-thresholds" type="submit" className="btn-primary">Save Thresholds</button>
        </form>
      </Section>

      {/* System info */}
      <Section icon={Database} title="System Information">
        <div className="space-y-3">
          {[
            { label: 'Version',   value: 'v1.0.0'    },
            { label: 'Database',  value: 'Supabase (PostgreSQL)' },
            { label: 'Framework', value: 'React 18 + Vite'       },
            { label: 'UI',        value: 'Tailwind CSS v3'        },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-1.5 border-b border-dark-700/40 last:border-0">
              <span className="text-sm text-dark-400">{label}</span>
              <span className="text-sm font-medium text-dark-200">{value}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
