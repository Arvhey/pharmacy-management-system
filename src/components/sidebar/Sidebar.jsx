import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from '../../context/SidebarContext'
import SidebarMenu from './SidebarMenu'

export default function Sidebar() {
  const { isOpen, isMobileOpen, toggle, closeMobile } = useSidebar()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`
        hidden lg:flex flex-col bg-dark-800/80 backdrop-blur-md border-r border-dark-700/50
        transition-all duration-300 ease-in-out relative shrink-0
        ${isOpen ? 'w-60' : 'w-16'}
      `}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-dark-700/50 ${!isOpen ? 'justify-center' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center shrink-0 shadow-glow">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="8" width="28" height="20" rx="3" fill="#14b8a6" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5"/>
              <path d="M12 18h8M16 14v8" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M8 8V6a2 2 0 012-2h12a2 2 0 012 2v2" stroke="#14b8a6" strokeWidth="1.5"/>
            </svg>
          </div>
          {isOpen && (
            <div>
              <p className="font-bold text-dark-50 text-sm leading-tight">PharmaCare</p>
              <p className="text-dark-500 text-xs">Management System</p>
            </div>
          )}
        </div>

        {/* Menu */}
        <SidebarMenu collapsed={!isOpen} />

        {/* Collapse toggle */}
        <button
          onClick={toggle}
          className="absolute -right-3.5 top-20 w-7 h-7 rounded-full bg-dark-700 border border-dark-600
                     flex items-center justify-center text-dark-400 hover:text-dark-100 hover:bg-dark-600
                     transition-all duration-200 shadow-lg z-10"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* Mobile sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-dark-800 border-r border-dark-700/50
        transform transition-transform duration-300 ease-in-out lg:hidden
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-dark-700/50">
          <div className="w-9 h-9 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center shadow-glow">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <rect x="2" y="8" width="28" height="20" rx="3" fill="#14b8a6" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="1.5"/>
              <path d="M12 18h8M16 14v8" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M8 8V6a2 2 0 012-2h12a2 2 0 012 2v2" stroke="#14b8a6" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-dark-50 text-sm leading-tight">PharmaCare</p>
            <p className="text-dark-500 text-xs">Management System</p>
          </div>
        </div>
        <SidebarMenu collapsed={false} />
      </aside>
    </>
  )
}
