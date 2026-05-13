import { supabase } from './supabaseClient'

export const medicineService = {
  async getAll(filters = {}) {
    let query = supabase.from('medicines').select('*').order('name')
    if (filters.category) query = query.eq('category', filters.category)
    if (filters.search)   query = query.ilike('name', `%${filters.search}%`)
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('medicines').select('*').eq('id', id).single()
    if (error) throw error
    return data
  },

  async create(medicine) {
    const { data, error } = await supabase
      .from('medicines').insert(medicine).select().single()
    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('medicines').update(updates).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase.from('medicines').delete().eq('id', id)
    if (error) throw error
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('medicines').select('category').order('category')
    if (error) throw error
    return [...new Set(data.map(d => d.category).filter(Boolean))]
  },

  async getLowStock(threshold = 10) {
    const { data, error } = await supabase
      .from('medicines').select('*').lte('stock_quantity', threshold).order('stock_quantity')
    if (error) throw error
    return data
  },

  async getExpiringSoon(days = 30) {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() + days)
    const { data, error } = await supabase
      .from('medicines').select('*')
      .lte('expiry_date', cutoff.toISOString().split('T')[0])
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .order('expiry_date')
    if (error) throw error
    return data
  },
}
