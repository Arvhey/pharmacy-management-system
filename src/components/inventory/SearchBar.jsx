import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search medicines...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
      <input
        id="search-bar"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-9 pr-8"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
