import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Layers, BarChart2 } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/',                icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/inventory',       icon: Package,         label: 'Inventory' },
  { to: '/medicine-groups', icon: Layers,          label: 'Groups'    },
  { to: '/reports',         icon: BarChart2,       label: 'Reports'   },
]

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-800/90 backdrop-blur-md border-t border-dark-700/50 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center w-full h-full space-y-1 rounded-xl transition-colors duration-200
                ${isActive ? 'text-primary-400' : 'text-dark-400 hover:text-dark-200'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1 rounded-lg transition-all duration-200 ${isActive ? 'bg-primary-600/20' : ''}`}>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className="text-[10px] font-medium leading-none">{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
