import { useState, useEffect } from 'react'
import { MEDICINE_CATEGORIES, UNITS } from '../../utils/constants'
import { Save, X } from 'lucide-react'

const EMPTY = {
  name: '', generic_name: '', category: '', stock_quantity: '', unit: 'tablet',
  unit_price: '', selling_price: '', manufacturer: '', supplier: '',
  batch_number: '', expiry_date: '', reorder_level: '', description: '',
}

export default function MedicineForm({ initial, onSubmit, onCancel, loading }) {
  const [form,   setForm]   = useState(initial || EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => { if (initial) setForm(initial) }, [initial])

  function validate() {
    const e = {}
    if (!form.name)            e.name            = 'Name is required'
    if (!form.category)        e.category        = 'Category is required'
    if (form.stock_quantity === '' || form.stock_quantity < 0) e.stock_quantity = 'Stock quantity required'
    if (!form.unit_price || form.unit_price <= 0) e.unit_price = 'Valid unit price required'
    if (!form.expiry_date)     e.expiry_date     = 'Expiry date is required'
    return e
  }

  function handle(field, value) {
    setForm(p => ({ ...p, [field]: value }))
    setErrors(p => ({ ...p, [field]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSubmit({
      ...form,
      stock_quantity: Number(form.stock_quantity),
      unit_price:     Number(form.unit_price),
      selling_price:  Number(form.selling_price || 0),
      reorder_level:  Number(form.reorder_level || 10),
    })
  }

  const F = ({ id, label, field, type = 'text', required, placeholder, children }) => (
    <div>
      <label className="label">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      {children || (
        <input id={id} type={type} placeholder={placeholder}
          className={`input-field ${errors[field] ? 'border-red-500' : ''}`}
          value={form[field]} onChange={e => handle(field, e.target.value)} />
      )}
      {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <F id="f-name"         label="Medicine Name"  field="name"         required placeholder="e.g. Paracetamol 500mg" />
        <F id="f-generic"      label="Generic Name"   field="generic_name" placeholder="e.g. Acetaminophen" />
        <F id="f-category"     label="Category"       field="category"     required>
          <select id="f-category" className={`select-field ${errors.category ? 'border-red-500' : ''}`}
            value={form.category} onChange={e => handle('category', e.target.value)}>
            <option value="">Select category</option>
            {MEDICINE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
        </F>
        <div className="grid grid-cols-2 gap-2">
          <F id="f-stock" label="Stock Qty" field="stock_quantity" type="number" required placeholder="0">
            <input id="f-stock" type="number" min="0"
              className={`input-field ${errors.stock_quantity ? 'border-red-500' : ''}`}
              value={form.stock_quantity} onChange={e => handle('stock_quantity', e.target.value)} />
            {errors.stock_quantity && <p className="text-red-400 text-xs mt-1">{errors.stock_quantity}</p>}
          </F>
          <F id="f-unit" label="Unit" field="unit">
            <select id="f-unit" className="select-field" value={form.unit} onChange={e => handle('unit', e.target.value)}>
              {UNITS.map(u => <option key={u}>{u}</option>)}
            </select>
          </F>
        </div>
        <F id="f-uprice"  label="Unit Price (₱)"    field="unit_price"    type="number" required placeholder="0.00" />
        <F id="f-sprice"  label="Selling Price (₱)" field="selling_price" type="number" placeholder="0.00" />
        <F id="f-expiry"  label="Expiry Date"        field="expiry_date"  type="date"   required />
        <F id="f-reorder" label="Reorder Level"      field="reorder_level" type="number" placeholder="10" />
        <F id="f-mfg"     label="Manufacturer"       field="manufacturer" placeholder="e.g. Unilab" />
        <F id="f-supplier"label="Supplier"           field="supplier"     placeholder="e.g. MedSupply Co." />
        <F id="f-batch"   label="Batch Number"       field="batch_number" placeholder="e.g. BN2024001" />
      </div>
      <F id="f-desc" label="Description" field="description" placeholder="Optional description...">
        <textarea id="f-desc" rows={2} placeholder="Optional description..."
          className="input-field resize-none"
          value={form.description} onChange={e => handle('description', e.target.value)} />
      </F>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>
          <X size={15} /> Cancel
        </button>
        <button id="medicine-submit" type="submit" className="btn-primary" disabled={loading}>
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
          {loading ? 'Saving...' : initial ? 'Update Medicine' : 'Add Medicine'}
        </button>
      </div>
    </form>
  )
}
