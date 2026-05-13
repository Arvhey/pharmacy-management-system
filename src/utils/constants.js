export const MEDICINE_CATEGORIES = [
  'Analgesics',
  'Antibiotics',
  'Antifungals',
  'Antihistamines',
  'Antihypertensives',
  'Antidiabetics',
  'Antacids',
  'Antivirals',
  'Cardiovascular',
  'Dermatologicals',
  'Dietary Supplements',
  'Gastrointestinal',
  'Hormones',
  'Neurological',
  'Ophthalmology',
  'Respiratory',
  'Vitamins & Minerals',
  'Other',
]

export const UNITS = ['tablet', 'capsule', 'ml', 'mg', 'g', 'bottle', 'sachet', 'patch', 'vial', 'ampule']

export const STOCK_STATUS = {
  OUT_OF_STOCK: { label: 'Out of Stock', color: 'badge-danger', threshold: 0 },
  LOW_STOCK:    { label: 'Low Stock',    color: 'badge-warning', threshold: 10 },
  IN_STOCK:     { label: 'In Stock',     color: 'badge-success', threshold: Infinity },
}

export const TRANSACTION_TYPES = {
  in:         { label: 'Stock In',    color: 'text-emerald-400' },
  out:        { label: 'Stock Out',   color: 'text-red-400'     },
  adjustment: { label: 'Adjustment', color: 'text-sky-400'      },
}

export const USER_ROLES = {
  admin: { label: 'Administrator', color: 'badge-info'    },
  staff: { label: 'Staff',         color: 'badge-muted'   },
}

export const LOW_STOCK_THRESHOLD  = 10
export const EXPIRY_SOON_DAYS     = 30

export const ROUTES = {
  LOGIN:     '/login',
  REGISTER:  '/register',
  DASHBOARD: '/',
  INVENTORY: '/inventory',
  GROUPS:    '/medicine-groups',
  REPORTS:   '/reports',
  PROFILE:   '/profile',
  SETTINGS:  '/settings',
}
