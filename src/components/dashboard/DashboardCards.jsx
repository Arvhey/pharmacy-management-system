import { TrendingUp, TrendingDown } from 'lucide-react'

export default function DashboardCards({ stats }) {
  const cards = [
    {
      id:      'total-medicines',
      label:   'Total Medicines',
      value:   stats?.totalMedicines ?? '—',
      icon:    '💊',
      color:   'from-primary-600/20 to-primary-500/10',
      border:  'border-primary-500/20',
      trend:   null,
    },
    {
      id:      'monthly-sales',
      label:   'Monthly Sales',
      value:   stats ? `₱${Number(stats.monthlySales).toLocaleString('en-PH', { minimumFractionDigits: 2 })}` : '—',
      icon:    '💰',
      color:   'from-emerald-600/20 to-emerald-500/10',
      border:  'border-emerald-500/20',
      trend:   { up: true, label: '+12.5% vs last month' },
    },
    {
      id:      'low-stock',
      label:   'Low Stock Items',
      value:   stats?.lowStockCount ?? '—',
      icon:    '⚠️',
      color:   'from-amber-600/20 to-amber-500/10',
      border:  'border-amber-500/20',
      trend:   stats?.lowStockCount > 0 ? { up: false, label: 'Needs reorder' } : null,
    },
    {
      id:      'expiring-soon',
      label:   'Expiring Soon',
      value:   stats?.expiringSoon ?? '—',
      icon:    '📅',
      color:   'from-red-600/20 to-red-500/10',
      border:  'border-red-500/20',
      trend:   stats?.expiringSoon > 0 ? { up: false, label: 'Within 30 days' } : null,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.id}
          id={card.id}
          className={`glass-card p-5 bg-gradient-to-br ${card.color} border ${card.border}
                      hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300`}
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-medium text-dark-400 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-dark-50">{card.value}</p>
            </div>
            <span className="text-2xl">{card.icon}</span>
          </div>
          {card.trend && (
            <div className={`flex items-center gap-1 text-xs font-medium
              ${card.trend.up ? 'text-emerald-400' : 'text-red-400'}`}>
              {card.trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {card.trend.label}
            </div>
          )}
          {!card.trend && <div className="h-4" />}
        </div>
      ))}
    </div>
  )
}
