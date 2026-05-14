import { Outlet } from 'react-router-dom'
import Sidebar    from '../components/sidebar/Sidebar'
import Navbar     from '../components/navbar/Navbar'
import BottomNav  from '../components/navbar/BottomNav'
import { useSidebar } from '../context/SidebarContext'

export default function MainLayout() {
  const { isOpen, isMobileOpen, closeMobile } = useSidebar()

  return (
    <div className="flex h-screen overflow-hidden bg-dark-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300`}>
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 pb-24 lg:p-6 lg:pb-6 animate-in">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
