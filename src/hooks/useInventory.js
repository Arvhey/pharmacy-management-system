import { useState, useEffect } from 'react'
import { inventoryService } from '../services/supabase/inventoryService'
import { dummyTransactions, dummyMedicines } from '../data/dummyData'
import toast from 'react-hot-toast'

const USE_DUMMY = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')

export function useInventory(filters = {}) {
  const [transactions, setTransactions] = useState([])
  const [summary,      setSummary]      = useState(null)
  const [loading,      setLoading]      = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    setLoading(true)
    try {
      if (USE_DUMMY) {
        const txns = dummyTransactions.map(t => ({
          ...t,
          medicines: dummyMedicines.find(m => m.id === t.medicine_id),
        }))
        setTransactions(txns)
        setSummary({
          totalProducts: dummyMedicines.length,
          totalValue:    dummyMedicines.reduce((s, m) => s + m.stock_quantity * m.unit_price, 0),
          lowStock:      dummyMedicines.filter(m => m.stock_quantity <= 10).length,
          outOfStock:    dummyMedicines.filter(m => m.stock_quantity === 0).length,
          expiringSoon:  2,
        })
      } else {
        const [txns, summ] = await Promise.all([
          inventoryService.getTransactions(filters),
          inventoryService.getSummary(),
        ])
        setTransactions(txns)
        setSummary(summ)
      }
    } catch (err) {
      toast.error('Failed to load inventory data')
    } finally {
      setLoading(false)
    }
  }

  async function adjustStock(medicineId, quantity, type, notes) {
    try {
      if (!USE_DUMMY) {
        await inventoryService.adjustStock(medicineId, quantity, type, notes)
      }
      toast.success('Stock adjusted successfully')
      await fetchAll()
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }

  return { transactions, summary, loading, refetch: fetchAll, adjustStock }
}
