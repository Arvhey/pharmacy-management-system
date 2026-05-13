import { supabase } from './supabaseClient'

export const reportService = {
  async getSalesReport(from, to) {
    const { data, error } = await supabase
      .from('inventory_transactions')
      .select('*, medicines(name, category, unit_price)')
      .eq('type', 'out')
      .gte('created_at', from)
      .lte('created_at', to)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async getInventoryReport() {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('name')
    if (error) throw error
    return data
  },

  async getExpiryReport() {
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('expiry_date')
    if (error) throw error
    return data
  },

  async getDashboardStats() {
    const today = new Date()
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString()
    const endOfMonth   = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString()

    const [medicines, transactions] = await Promise.all([
      supabase.from('medicines').select('stock_quantity, unit_price, expiry_date, category'),
      supabase.from('inventory_transactions')
        .select('quantity, type, created_at, medicines(unit_price)')
        .gte('created_at', startOfMonth).lte('created_at', endOfMonth),
    ])

    if (medicines.error) throw medicines.error
    if (transactions.error) throw transactions.error

    const sales = transactions.data
      .filter(t => t.type === 'out')
      .reduce((s, t) => s + t.quantity * (t.medicines?.unit_price || 0), 0)

    const today30 = new Date(); today30.setDate(today30.getDate() + 30)
    const todayStr  = new Date().toISOString().split('T')[0]
    const today30Str = today30.toISOString().split('T')[0]

    return {
      totalMedicines:  medicines.data.length,
      monthlySales:    sales,
      lowStockCount:   medicines.data.filter(m => m.stock_quantity <= 10).length,
      expiringSoon:    medicines.data.filter(m => m.expiry_date >= todayStr && m.expiry_date <= today30Str).length,
    }
  },

  async getMonthlySalesTrend() {
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date()
      d.setMonth(d.getMonth() - (5 - i))
      return { year: d.getFullYear(), month: d.getMonth() + 1, label: d.toLocaleString('default', { month: 'short' }) }
    })

    const results = await Promise.all(months.map(async ({ year, month, label }) => {
      const from = new Date(year, month - 1, 1).toISOString()
      const to   = new Date(year, month, 0, 23, 59, 59).toISOString()
      const { data } = await supabase
        .from('inventory_transactions')
        .select('quantity, medicines(unit_price)')
        .eq('type', 'out').gte('created_at', from).lte('created_at', to)
      const total = (data || []).reduce((s, t) => s + t.quantity * (t.medicines?.unit_price || 0), 0)
      return { label, total }
    }))

    return results
  },
}
