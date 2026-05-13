// Utility: format dates
export function formatDate(dateStr, options = {}) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
    ...options,
  })
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleString('en-US', {
    year:   'numeric',
    month:  'short',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  })
}

export function formatRelative(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  const now  = new Date()
  const diff = now - date
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'Just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7)   return `${days}d ago`
  return formatDate(dateStr)
}

export function daysUntilExpiry(expiryDateStr) {
  if (!expiryDateStr) return null
  const expiry = new Date(expiryDateStr)
  const today  = new Date()
  const diff   = expiry - today
  return Math.ceil(diff / 86400000)
}
