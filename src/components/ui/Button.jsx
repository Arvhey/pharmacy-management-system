export default function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  type      = 'button',
  disabled  = false,
  loading   = false,
  onClick,
  className = '',
  id,
}) {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    danger:    'btn-danger',
    ghost:     'btn-ghost',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: '',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
