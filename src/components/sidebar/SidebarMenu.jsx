import { LayoutDashboard, Package, Layers, BarChart2, User, Settings, LogOut } from 'lucide-react'
import SidebarItem from './SidebarItem'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const NAV_ITEMS = [
  { to: '/',                icon: LayoutDashboard, label: 'Dashboard'        },
  { to: '/inventory',       icon: Package,         label: 'Inventory'        },
  { to: '/medicine-groups', icon: Layers,           label: 'Medicine Groups'  },
  { to: '/reports',         icon: BarChart2,        label: 'Reports'          },
]

const BOTTOM_ITEMS = [
  { to: '/profile',  icon: User,     label: 'Profile'  },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function SidebarMenu({ collapsed }) {
  const { signOut } = useAuth()
  const navigate    = useNavigate()

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/login')
      toast.success('Signed out successfully')
    } catch (err) {
      // In demo mode just navigate
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col flex-1 px-3 py-4 gap-1 overflow-y-auto scrollbar-hide">
      {/* Navigation group */}
      <div className="space-y-0.5">
        {!collapsed && (
          <p className="text-xs font-semibold text-dark-500 uppercase tracking-widest px-3 mb-2">Navigation</p>
        )}
        {NAV_ITEMS.map(item => (
          <SidebarItem key={item.to} {...item} collapsed={collapsed} />
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom group */}
      <div className="space-y-0.5">
        {!collapsed && (
          <p className="text-xs font-semibold text-dark-500 uppercase tracking-widest px-3 mb-2">Account</p>
        )}
        {BOTTOM_ITEMS.map(item => (
          <SidebarItem key={item.to} {...item} collapsed={collapsed} />
        ))}
        <SidebarItem icon={LogOut} label="Sign Out" onClick={handleSignOut} collapsed={collapsed} />
      </div>
    </div>
  )
}
