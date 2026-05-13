import { formatDate, daysUntilExpiry } from '../../utils/formatDate'
import { LOW_STOCK_THRESHOLD } from '../../utils/constants'
import { Edit2, Trash2, Eye, AlertTriangle } from 'lucide-react'

function StockBadge({ qty }) {
  if (qty === 0)                  return <span className="badge-danger">Out of Stock</span>
  if (qty <= LOW_STOCK_THRESHOLD) return <span className="badge-warning">Low Stock</span>
  return                                 <span className="badge-success">In Stock</span>
}

function ExpiryBadge({ date }) {
  const days = daysUntilExpiry(date)
  if (days === null) return null
  if (days < 0)    return <span className="badge-danger">Expired</span>
  if (days <= 30)  return <span className="badge-warning">{days}d left</span>
  return                   <span className="text-xs text-dark-400">{formatDate(date)}</span>
}

export default function MedicineTable({ medicines, onEdit, onDelete, onView, loading }) {
  if (loading) return (
    <div className="py-16 text-center text-dark-400">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      Loading medicines...
    </div>
  )

  if (!medicines?.length) return (
    <div className="py-16 text-center text-dark-400">
      <p className="text-4xl mb-3">💊</p>
      <p className="font-medium">No medicines found</p>
      <p className="text-sm mt-1">Try adjusting your filters or add a new medicine</p>
    </div>
  )

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th className="hidden md:table-cell">Category</th>
            <th>Stock</th>
            <th className="hidden lg:table-cell">Unit Price</th>
            <th className="hidden lg:table-cell">Expiry</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med, idx) => (
            <tr key={med.id} className="animate-in">
              <td className="text-dark-500 text-xs">{idx + 1}</td>
              <td>
                <div>
                  <p className="font-medium text-dark-100">{med.name}</p>
                  <p className="text-xs text-dark-500 hidden sm:block">{med.generic_name}</p>
                </div>
              </td>
              <td className="hidden md:table-cell">
                <span className="badge-info">{med.category}</span>
              </td>
              <td>
                <span className="font-semibold text-dark-100">{med.stock_quantity}</span>
                <span className="text-dark-500 text-xs ml-1">{med.unit}</span>
              </td>
              <td className="hidden lg:table-cell text-dark-200">
                ₱{Number(med.unit_price).toFixed(2)}
              </td>
              <td className="hidden lg:table-cell">
                <ExpiryBadge date={med.expiry_date} />
              </td>
              <td><StockBadge qty={med.stock_quantity} /></td>
              <td>
                <div className="flex items-center justify-end gap-1">
                  <button
                    id={`view-${med.id}`}
                    onClick={() => onView?.(med)}
                    className="p-1.5 text-dark-400 hover:text-sky-400 hover:bg-sky-900/20 rounded-lg transition-colors"
                    title="View details"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    id={`edit-${med.id}`}
                    onClick={() => onEdit?.(med)}
                    className="p-1.5 text-dark-400 hover:text-primary-400 hover:bg-primary-900/20 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    id={`delete-${med.id}`}
                    onClick={() => onDelete?.(med)}
                    className="p-1.5 text-dark-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
