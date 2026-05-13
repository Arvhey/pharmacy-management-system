import { FileText, TrendingUp, Package, Calendar } from 'lucide-react'

const REPORT_TYPES = [
  {
    id:          'sales',
    icon:        TrendingUp,
    title:       'Sales Report',
    description: 'Monthly sales breakdown by medicine and category',
    color:       'from-emerald-600/20 to-emerald-500/10',
    border:      'border-emerald-500/20',
    iconColor:   'text-emerald-400',
    bg:          'bg-emerald-900/30',
  },
  {
    id:          'inventory',
    icon:        Package,
    title:       'Inventory Report',
    description: 'Full stock listing with prices and quantities',
    color:       'from-primary-600/20 to-primary-500/10',
    border:      'border-primary-500/20',
    iconColor:   'text-primary-400',
    bg:          'bg-primary-900/30',
  },
  {
    id:          'expiry',
    icon:        Calendar,
    title:       'Expiry Report',
    description: 'Medicines expiring soon or already expired',
    color:       'from-amber-600/20 to-amber-500/10',
    border:      'border-amber-500/20',
    iconColor:   'text-amber-400',
    bg:          'bg-amber-900/30',
  },
]

export default function ReportCard({ onGenerate }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {REPORT_TYPES.map(r => {
        const Icon = r.icon
        return (
          <button
            key={r.id}
            id={`report-card-${r.id}`}
            onClick={() => onGenerate(r.id)}
            className={`glass-card p-5 bg-gradient-to-br ${r.color} border ${r.border}
                        hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300
                        text-left group`}
          >
            <div className={`w-11 h-11 rounded-xl ${r.bg} flex items-center justify-center mb-4`}>
              <Icon size={22} className={r.iconColor} />
            </div>
            <h3 className="font-semibold text-dark-100 mb-1 group-hover:text-white transition-colors">{r.title}</h3>
            <p className="text-xs text-dark-400 leading-relaxed">{r.description}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-dark-400 group-hover:text-dark-200 transition-colors">
              <FileText size={12} /> Generate &amp; Download PDF
            </div>
          </button>
        )
      })}
    </div>
  )
}
