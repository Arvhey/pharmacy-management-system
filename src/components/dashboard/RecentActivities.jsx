import { ArrowDownCircle, ArrowUpCircle, AlertTriangle, Clock } from 'lucide-react'
import { recentActivities } from '../../data/dummyData'
import { formatRelative }   from '../../utils/formatDate'

const TYPE_CONFIG = {
  stock_in:  { icon: ArrowDownCircle, color: 'text-emerald-400', bg: 'bg-emerald-900/30' },
  stock_out: { icon: ArrowUpCircle,   color: 'text-red-400',     bg: 'bg-red-900/30'     },
  alert:     { icon: AlertTriangle,   color: 'text-amber-400',   bg: 'bg-amber-900/30'   },
}

export default function RecentActivities({ activities = recentActivities }) {
  return (
    <div className="space-y-3">
      {activities.length === 0 && (
        <div className="text-center py-8 text-dark-400 text-sm">No recent activities</div>
      )}
      {activities.map(activity => {
        const cfg = TYPE_CONFIG[activity.type] || TYPE_CONFIG.alert
        const Icon = cfg.icon
        return (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-dark-700/30 hover:bg-dark-700/50 transition-colors">
            <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
              <Icon size={15} className={cfg.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-dark-200 leading-tight">{activity.message}</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock size={10} className="text-dark-500" />
                <span className="text-xs text-dark-500">{activity.time}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
