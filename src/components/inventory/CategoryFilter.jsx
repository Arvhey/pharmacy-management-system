import { MEDICINE_CATEGORIES } from '../../utils/constants'
import { Filter } from 'lucide-react'

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="relative min-w-[160px]">
      <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 pointer-events-none" />
      <select
        id="category-filter"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="select-field pl-8 text-sm"
      >
        <option value="">All Categories</option>
        {MEDICINE_CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  )
}
