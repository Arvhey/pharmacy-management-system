import { useMemo } from 'react'
import { useMedicines }        from '../hooks/useMedicines'
import { MEDICINE_CATEGORIES } from '../utils/constants'
import { Package, TrendingDown } from 'lucide-react'
import Loader from '../components/ui/Loader'

export default function MedicineGroups() {
  const { medicines, loading } = useMedicines()

  const groups = useMemo(() => {
    return MEDICINE_CATEGORIES
      .map(cat => ({
        name:  cat,
        items: medicines.filter(m => m.category === cat),
      }))
      .filter(g => g.items.length > 0)
  }, [medicines])

  if (loading) return <Loader text="Loading medicine groups..." />

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="page-title">Medicine Groups</h2>
        <p className="page-subtitle">{groups.length} categories &bull; {medicines.length} total medicines</p>
      </div>

      {groups.length === 0 && (
        <div className="glass-card p-16 text-center text-dark-400">
          <p className="text-4xl mb-3">💊</p>
          <p className="font-medium">No medicines added yet</p>
        </div>
      )}

      <div className="space-y-6">
        {groups.map(group => {
          const totalQty   = group.items.reduce((s, m) => s + m.stock_quantity, 0)
          const totalValue = group.items.reduce((s, m) => s + m.stock_quantity * m.unit_price, 0)
          const lowItems   = group.items.filter(m => m.stock_quantity <= 10)

          return (
            <div key={group.name} className="glass-card overflow-hidden" style={{ padding: 0 }}>
              {/* Group header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-dark-700/30 border-b border-dark-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-600/20 border border-primary-500/20 flex items-center justify-center">
                    <Package size={18} className="text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-100">{group.name}</h3>
                    <p className="text-xs text-dark-400">{group.items.length} medicine{group.items.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <p className="text-dark-400">Total Stock</p>
                    <p className="font-bold text-dark-100">{totalQty.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-dark-400">Total Value</p>
                    <p className="font-bold text-primary-400">₱{totalValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                  </div>
                  {lowItems.length > 0 && (
                    <div className="flex items-center gap-1 badge-warning">
                      <TrendingDown size={11} />
                      {lowItems.length} low
                    </div>
                  )}
                </div>
              </div>

              {/* Medicine list */}
              <div className="divide-y divide-dark-700/30">
                {group.items.map(med => (
                  <div key={med.id} className="flex items-center justify-between px-4 py-3 hover:bg-dark-700/20 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-dark-100">{med.name}</p>
                      <p className="text-xs text-dark-500">{med.generic_name || '—'} &bull; {med.manufacturer || '—'}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs shrink-0">
                      <div className="text-right">
                        <p className="text-dark-400">Stock</p>
                        <p className={`font-bold ${med.stock_quantity === 0 ? 'text-red-400' : med.stock_quantity <= 10 ? 'text-amber-400' : 'text-dark-100'}`}>
                          {med.stock_quantity} {med.unit}
                        </p>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="text-dark-400">Price</p>
                        <p className="font-bold text-dark-100">₱{Number(med.unit_price).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
