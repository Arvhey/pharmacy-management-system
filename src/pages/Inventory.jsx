import { useState, useMemo } from 'react'
import { Plus, LayoutGrid, List, RefreshCw } from 'lucide-react'
import MedicineTable   from '../components/inventory/MedicineTable'
import MedicineCard    from '../components/inventory/MedicineCard'
import MedicineForm    from '../components/inventory/MedicineForm'
import MedicineDetails from '../components/inventory/MedicineDetails'
import SearchBar       from '../components/inventory/SearchBar'
import CategoryFilter  from '../components/inventory/CategoryFilter'
import Modal           from '../components/ui/Modal'
import { useMedicines } from '../hooks/useMedicines'
import toast from 'react-hot-toast'

export default function Inventory() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('')
  const [view,     setView]     = useState('table')   // 'table' | 'grid'
  const [modal,    setModal]    = useState(null)       // null | 'add' | 'edit' | 'view' | 'delete'
  const [selected, setSelected] = useState(null)
  const [saving,   setSaving]   = useState(false)

  const filters = useMemo(() => ({ search, category }), [search, category])
  const { medicines, loading, refetch, addMedicine, updateMedicine, deleteMedicine } = useMedicines(filters)

  function openAdd()       { setSelected(null); setModal('add')    }
  function openEdit(med)   { setSelected(med);  setModal('edit')   }
  function openView(med)   { setSelected(med);  setModal('view')   }
  function openDelete(med) { setSelected(med);  setModal('delete') }
  function close()         { setModal(null); setSelected(null)     }

  async function handleSave(data) {
    setSaving(true)
    try {
      if (modal === 'add') await addMedicine(data)
      else                 await updateMedicine(selected.id, data)
      close()
    } finally { setSaving(false) }
  }

  async function handleDelete() {
    setSaving(true)
    try { await deleteMedicine(selected.id); close() }
    finally { setSaving(false) }
  }

  const totalValue = medicines.reduce((s, m) => s + m.stock_quantity * m.unit_price, 0)
  const lowCount   = medicines.filter(m => m.stock_quantity <= 10).length
  const outCount   = medicines.filter(m => m.stock_quantity === 0).length

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="page-title">Inventory</h2>
          <p className="page-subtitle">{medicines.length} medicines &bull; ₱{totalValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })} total value</p>
        </div>
        <div className="flex items-center gap-2">
          <button id="refresh-btn" onClick={refetch} className="btn-ghost p-2" title="Refresh"><RefreshCw size={16} /></button>
          <button id="add-medicine-btn" onClick={openAdd} className="btn-primary"><Plus size={16} /> Add Medicine</button>
        </div>
      </div>

      {/* Alerts summary */}
      {(lowCount > 0 || outCount > 0) && (
        <div className="flex flex-wrap gap-2">
          {outCount > 0 && <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/20 border border-red-800/40 rounded-lg text-red-400 text-xs font-medium">⚠️ {outCount} out of stock</div>}
          {lowCount > 0 && <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/20 border border-amber-800/40 rounded-lg text-amber-400 text-xs font-medium">⚠️ {lowCount} low stock</div>}
        </div>
      )}

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <SearchBar value={search} onChange={setSearch} className="flex-1" />
          <CategoryFilter value={category} onChange={setCategory} />
          <div className="flex items-center gap-1 bg-dark-700/50 rounded-lg p-1">
            <button id="view-table" onClick={() => setView('table')}
              className={`p-2 rounded-md transition-colors ${view === 'table' ? 'bg-primary-600 text-white' : 'text-dark-400 hover:text-dark-100'}`}>
              <List size={16} />
            </button>
            <button id="view-grid" onClick={() => setView('grid')}
              className={`p-2 rounded-md transition-colors ${view === 'grid' ? 'bg-primary-600 text-white' : 'text-dark-400 hover:text-dark-100'}`}>
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="glass-card overflow-hidden" style={{ padding: 0 }}>
        {view === 'table' ? (
          <div className="p-1">
            <MedicineTable medicines={medicines} loading={loading} onEdit={openEdit} onView={openView} onDelete={openDelete} />
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading
              ? Array(8).fill(0).map((_, i) => <div key={i} className="h-48 bg-dark-700/40 rounded-2xl animate-pulse" />)
              : medicines.map(m => <MedicineCard key={m.id} medicine={m} onEdit={openEdit} onView={openView} />)
            }
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={modal === 'add' || modal === 'edit'} onClose={close} size="lg"
        title={modal === 'add' ? 'Add New Medicine' : `Edit: ${selected?.name}`}>
        <MedicineForm initial={modal === 'edit' ? selected : null} onSubmit={handleSave} onCancel={close} loading={saving} />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={modal === 'view'} onClose={close} size="md" title={selected?.name}
        footer={<>
          <button className="btn-secondary" onClick={close}>Close</button>
          <button className="btn-primary" onClick={() => { close(); setTimeout(() => openEdit(selected), 50) }}>Edit</button>
        </>}>
        <MedicineDetails medicine={selected} />
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={modal === 'delete'} onClose={close} size="sm" title="Delete Medicine"
        footer={<>
          <button className="btn-secondary" onClick={close} disabled={saving}>Cancel</button>
          <button id="confirm-delete" className="btn-danger" onClick={handleDelete} disabled={saving}>
            {saving ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </>}>
        <p className="text-dark-300">Are you sure you want to delete <strong className="text-dark-100">{selected?.name}</strong>? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}
