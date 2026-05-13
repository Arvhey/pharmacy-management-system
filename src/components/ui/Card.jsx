export default function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div className={`glass-card ${padding ? 'p-5' : ''} ${hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}
