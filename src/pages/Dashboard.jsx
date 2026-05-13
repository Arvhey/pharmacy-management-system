import DashboardCards   from '../components/dashboard/DashboardCards'
import SalesChart        from '../components/dashboard/SalesChart'
import InventoryChart    from '../components/dashboard/InventoryChart'
import RecentActivities  from '../components/dashboard/RecentActivities'
import Loader            from '../components/ui/Loader'
import { useReports }    from '../hooks/useReports'

export default function Dashboard() {
  const { dashboardStats, salesTrend, categoryData, loading } = useReports()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h2 className="page-title">Good day! 👋</h2>
        <p className="page-subtitle">Here's what's happening in your pharmacy today.</p>
      </div>

      {/* Stat cards */}
      {loading
        ? <Loader text="Loading dashboard..." />
        : <DashboardCards stats={dashboardStats} />
      }

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Sales chart – 2/3 */}
        <div className="xl:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="section-title">Sales Trend</h3>
              <p className="text-xs text-dark-400">Last 6 months</p>
            </div>
            <span className="badge-success">Monthly</span>
          </div>
          <SalesChart data={salesTrend} />
        </div>

        {/* Category chart – 1/3 */}
        <div className="glass-card p-5">
          <div className="mb-4">
            <h3 className="section-title">By Category</h3>
            <p className="text-xs text-dark-400">Inventory distribution</p>
          </div>
          <InventoryChart data={categoryData} />
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="section-title">Recent Activities</h3>
            <p className="text-xs text-dark-400">Latest stock movements and alerts</p>
          </div>
        </div>
        <RecentActivities />
      </div>
    </div>
  )
}
