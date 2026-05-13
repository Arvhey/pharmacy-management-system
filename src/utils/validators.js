// Field validators
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) return 'This field is required'
    return null
  },

  email: (value) => {
    if (!value) return 'Email is required'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(value)) return 'Invalid email address'
    return null
  },

  password: (value) => {
    if (!value) return 'Password is required'
    if (value.length < 8) return 'Password must be at least 8 characters'
    return null
  },

  positiveNumber: (value) => {
    if (value === '' || value === null || value === undefined) return 'This field is required'
    if (isNaN(value) || Number(value) < 0) return 'Must be a positive number'
    return null
  },

  expiryDate: (value) => {
    if (!value) return 'Expiry date is required'
    const date = new Date(value)
    if (isNaN(date)) return 'Invalid date'
    if (date < new Date()) return 'Expiry date must be in the future'
    return null
  },

  // Validate a form object: { field: value }, rules: { field: [validatorFn] }
  validateForm(values, rules) {
    const errors = {}
    for (const [field, ruleFns] of Object.entries(rules)) {
      for (const fn of ruleFns) {
        const err = fn(values[field])
        if (err) { errors[field] = err; break }
      }
    }
    return errors
  },
}
