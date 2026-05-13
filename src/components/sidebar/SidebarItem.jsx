import { NavLink, useLocation } from 'react-router-dom'

export default function SidebarItem({ to, icon: Icon, label, badge, onClick, collapsed }) {
  const location = useLocation()
  const isActive = location.pathname === to

  if (onClick) {
    return (
      <button onClick={onClick}
        className={`sidebar-link group w-full ${isActive ? 'active' : ''}`}>
        <Icon size={18} className={`shrink-0 ${isActive ? 'text-primary-400' : 'text-dark-400 group-hover:text-dark-200'}`} />
        {!collapsed && <span className="flex-1 text-left">{label}</span>}
        {!collapsed && badge !== undefined && (
          <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </button>
    )
  }

  return (
    <NavLink to={to}
      className={({ isActive }) => `sidebar-link group ${isActive ? 'active' : ''}`}>
      {({ isActive }) => (
        <>
          <Icon size={18} className={`shrink-0 ${isActive ? 'text-primary-400' : 'text-dark-400 group-hover:text-dark-200'}`} />
          {!collapsed && <span className="flex-1">{label}</span>}
          {!collapsed && badge !== undefined && (
            <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}
