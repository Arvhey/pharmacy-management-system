import { supabase } from './supabaseClient'

export const inventoryService = {
  async getTransactions(filters = {}) {
    let query = supabase
      .from('inventory_transactions')
      .select('*, medicines(name, category)')
      .order('created_at', { ascending: false })
    if (filters.type)       query = query.eq('type', filters.type)
    if (filters.medicine_id) query = query.eq('medicine_id', filters.medicine_id)
    if (filters.from)       query = query.gte('created_at', filters.from)
    if (filters.to)         query = query.lte('created_at', filters.to)
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async addTransaction(transaction) {
    const { data, error } = await supabase
      .from('inventory_transactions').insert(transaction).select().single()
    if (error) throw error
    return data
  },

  async adjustStock(medicineId, quantity, type, notes = '') {
    // Insert transaction record
    await inventoryService.addTransaction({
      medicine_id: medicineId,
      quantity,
      type,       // 'in' | 'out' | 'adjustment'
      notes,
    })
    // Update medicine stock
    const { data: med } = await supabase
      .from('medicines').select('stock_quantity').eq('id', medicineId).single()
    const newStock = type === 'in'
      ? med.stock_quantity + quantity
      : type === 'out'
        ? med.stock_quantity - quantity
        : quantity
    await supabase.from('medicines')
      .update({ stock_quantity: newStock }).eq('id', medicineId)
    return newStock
  },

  async getSummary() {
    const { data, error } = await supabase
      .from('medicines')
      .select('stock_quantity, unit_price, category, expiry_date')
    if (error) throw error

    const today  = new Date().toISOString().split('T')[0]
    const soon   = new Date(); soon.setDate(soon.getDate() + 30)
    const soonStr = soon.toISOString().split('T')[0]

    return {
      totalProducts:  data.length,
      totalValue:     data.reduce((s, m) => s + m.stock_quantity * m.unit_price, 0),
      lowStock:       data.filter(m => m.stock_quantity <= 10).length,
      outOfStock:     data.filter(m => m.stock_quantity === 0).length,
      expiringSoon:   data.filter(m => m.expiry_date >= today && m.expiry_date <= soonStr).length,
    }
  },
}
