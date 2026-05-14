import { Menu, Bell, Sun, Moon, Search } from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'
import { useTheme }   from '../../context/ThemeContext'
import UserProfile     from './UserProfile'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReports }  from '../../hooks/useReports'

const PAGE_TITLES = {
  '/':                { title: 'Dashboard',       sub: 'Overview of your pharmacy' },
  '/inventory':       { title: 'Inventory',       sub: 'Manage medicines and stock' },
  '/medicine-groups': { title: 'Medicine Groups', sub: 'Browse by category'        },
  '/reports':         { title: 'Reports',         sub: 'Sales and inventory analytics' },
  '/profile':         { title: 'My Profile',      sub: 'Account information'       },
  '/settings':        { title: 'Settings',        sub: 'App preferences'           },
}

export default function Navbar() {
  const { toggle: toggleSidebar } = useSidebar()
  const { isDark, toggleTheme }                  = useTheme()
  const location                                 = useLocation()
  const navigate                                 = useNavigate()
  const { dashboardStats }                       = useReports()
  const page = PAGE_TITLES[location.pathname] || { title: 'PharmaCare', sub: '' }

  const hasAlerts = dashboardStats?.lowStockCount > 0 || dashboardStats?.expiringSoon > 0

  return (
    <header className="relative z-50 h-16 flex items-center justify-between px-4 lg:px-6 bg-dark-800/60 backdrop-blur-md border-b border-dark-700/50 shrink-0 gap-4">
      {/* Left: menu + title */}
      <div className="flex items-center gap-3 min-w-0">


        <div className="min-w-0">
          <h1 className="text-base font-bold text-dark-50 leading-tight truncate">{page.title}</h1>
          <p className="text-xs text-dark-400 truncate hidden sm:block">{page.sub}</p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="p-2 rounded-lg text-dark-400 hover:text-dark-100 hover:bg-dark-700 transition-colors"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          id="notifications-btn"
          onClick={() => navigate('/inventory')}
          className="relative p-2 rounded-lg text-dark-400 hover:text-dark-100 hover:bg-dark-700 transition-colors"
          title={hasAlerts ? "You have pending stock alerts" : "Notifications"}
        >
          <Bell size={18} />
          {hasAlerts && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-dark-800 animate-pulse" />
          )}
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-dark-700 mx-1" />

        {/* User */}
        <UserProfile />
      </div>
    </header>
  )
}
