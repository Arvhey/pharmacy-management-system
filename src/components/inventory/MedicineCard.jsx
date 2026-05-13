import { daysUntilExpiry } from '../../utils/formatDate'
import { LOW_STOCK_THRESHOLD } from '../../utils/constants'
import { AlertTriangle, Package, Calendar } from 'lucide-react'

export default function MedicineCard({ medicine, onEdit, onView }) {
  const days  = daysUntilExpiry(medicine.expiry_date)
  const isLow = medicine.stock_quantity <= LOW_STOCK_THRESHOLD
  const isOut = medicine.stock_quantity === 0
  const isBad = days !== null && days <= 30

  return (
    <div
      onClick={() => onView?.(medicine)}
      className="glass-card p-4 cursor-pointer hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center text-xl shrink-0">
          💊
        </div>
        {(isOut || isLow || isBad) && (
          <AlertTriangle size={15} className={isOut ? 'text-red-400' : 'text-amber-400'} />
        )}
      </div>

      <h3 className="font-semibold text-dark-100 text-sm leading-tight mb-0.5 group-hover:text-primary-400 transition-colors line-clamp-2">
        {medicine.name}
      </h3>
      <p className="text-xs text-dark-500 mb-3">{medicine.category}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-dark-700/40 rounded-lg p-2">
          <p className="text-dark-400 mb-0.5">Stock</p>
          <p className={`font-bold ${isOut ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-dark-100'}`}>
            {medicine.stock_quantity} {medicine.unit}
          </p>
        </div>
        <div className="bg-dark-700/40 rounded-lg p-2">
          <p className="text-dark-400 mb-0.5">Price</p>
          <p className="font-bold text-dark-100">₱{Number(medicine.unit_price).toFixed(2)}</p>
        </div>
      </div>

      {/* Edit button */}
      <button
        id={`card-edit-${medicine.id}`}
        onClick={e => { e.stopPropagation(); onEdit?.(medicine) }}
        className="mt-3 w-full btn-secondary text-xs py-1.5 justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Edit Medicine
      </button>
    </div>
  )
}
