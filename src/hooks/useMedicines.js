import { useState, useEffect, useCallback } from 'react'
import { medicineService } from '../services/supabase/medicineService'
import { dummyMedicines } from '../data/dummyData'
import toast from 'react-hot-toast'

const USE_DUMMY = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')

export function useMedicines(filters = {}) {
  const [medicines, setMedicines] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)

  const fetchMedicines = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      if (USE_DUMMY) {
        let data = [...dummyMedicines]
        if (filters.category) data = data.filter(m => m.category === filters.category)
        if (filters.search)   data = data.filter(m => m.name.toLowerCase().includes(filters.search.toLowerCase()))
        setMedicines(data)
      } else {
        const data = await medicineService.getAll(filters)
        setMedicines(data)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filters.category, filters.search])

  useEffect(() => { fetchMedicines() }, [fetchMedicines])

  const addMedicine = async (medicine) => {
    try {
      if (USE_DUMMY) {
        const newMed = { ...medicine, id: Date.now().toString() }
        setMedicines(prev => [...prev, newMed])
        toast.success('Medicine added successfully')
        return newMed
      }
      const newMed = await medicineService.create(medicine)
      setMedicines(prev => [...prev, newMed])
      toast.success('Medicine added successfully')
      return newMed
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }

  const updateMedicine = async (id, updates) => {
    try {
      if (USE_DUMMY) {
        setMedicines(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m))
        toast.success('Medicine updated successfully')
        return updates
      }
      const updated = await medicineService.update(id, updates)
      setMedicines(prev => prev.map(m => m.id === id ? updated : m))
      toast.success('Medicine updated successfully')
      return updated
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }

  const deleteMedicine = async (id) => {
    try {
      if (!USE_DUMMY) await medicineService.delete(id)
      setMedicines(prev => prev.filter(m => m.id !== id))
      toast.success('Medicine deleted')
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }

  return { medicines, loading, error, refetch: fetchMedicines, addMedicine, updateMedicine, deleteMedicine }
}
