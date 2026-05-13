import { formatDate, daysUntilExpiry } from '../../utils/formatDate'
import { LOW_STOCK_THRESHOLD } from '../../utils/constants'
import { Package, Calendar, DollarSign, Hash, Building2, Truck, AlertTriangle } from 'lucide-react'

export default function MedicineDetails({ medicine }) {
  if (!medicine) return null
  const days   = daysUntilExpiry(medicine.expiry_date)
  const isLow  = medicine.stock_quantity <= LOW_STOCK_THRESHOLD
  const isOut  = medicine.stock_quantity === 0
  const isExp  = days !== null && days < 0
  const isSoon = days !== null && days >= 0 && days <= 30

  return (
    <div className="space-y-5">
      {/* Alerts */}
      {(isOut || isLow || isExp || isSoon) && (
        <div className="space-y-2">
          {isOut  && <div className="flex gap-2 p-3 bg-red-900/20 border border-red-800/40 rounded-xl text-red-400 text-sm"><AlertTriangle size={16}/> Out of stock — needs immediate reorder</div>}
          {!isOut && isLow  && <div className="flex gap-2 p-3 bg-amber-900/20 border border-amber-800/40 rounded-xl text-amber-400 text-sm"><AlertTriangle size={16}/> Low stock — only {medicine.stock_quantity} {medicine.unit}(s) remaining</div>}
          {isExp  && <div className="flex gap-2 p-3 bg-red-900/20 border border-red-800/40 rounded-xl text-red-400 text-sm"><Calendar size={16}/> Expired on {formatDate(medicine.expiry_date)}</div>}
          {isSoon && !isExp && <div className="flex gap-2 p-3 bg-amber-900/20 border border-amber-800/40 rounded-xl text-amber-400 text-sm"><Calendar size={16}/> Expires in {days} day(s) — {formatDate(medicine.expiry_date)}</div>}
        </div>
      )}

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Package,    label: 'Generic Name',  value: medicine.generic_name || '—' },
          { icon: Hash,       label: 'Category',      value: medicine.category            },
          { icon: Package,    label: 'Stock',         value: `${medicine.stock_quantity} ${medicine.unit}(s)` },
          { icon: DollarSign, label: 'Unit Price',    value: `₱${Number(medicine.unit_price).toFixed(2)}` },
          { icon: DollarSign, label: 'Selling Price', value: medicine.selling_price ? `₱${Number(medicine.selling_price).toFixed(2)}` : '—' },
          { icon: Calendar,   label: 'Expiry Date',   value: formatDate(medicine.expiry_date) },
          { icon: Building2,  label: 'Manufacturer',  value: medicine.manufacturer || '—' },
          { icon: Truck,      label: 'Supplier',      value: medicine.supplier || '—'     },
          { icon: Hash,       label: 'Batch No.',     value: medicine.batch_number || '—' },
          { icon: Package,    label: 'Reorder Level', value: medicine.reorder_level ? `${medicine.reorder_level} ${medicine.unit}(s)` : '—' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-dark-700/30 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={12} className="text-dark-400" />
              <p className="text-xs text-dark-400 font-medium">{label}</p>
            </div>
            <p className="text-sm font-semibold text-dark-100">{value}</p>
          </div>
        ))}
      </div>

      {medicine.description && (
        <div className="bg-dark-700/30 rounded-xl p-3">
          <p className="text-xs text-dark-400 font-medium mb-1">Description</p>
          <p className="text-sm text-dark-200">{medicine.description}</p>
        </div>
      )}
    </div>
  )
}
