import { useState, useEffect } from 'react'
import { reportService } from '../services/supabase/reportService'
import { dummySalesData, dummyCategoryData } from '../data/dummyData'
import toast from 'react-hot-toast'

const USE_DUMMY = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('your-project')

export function useReports() {
  const [dashboardStats, setDashboardStats] = useState(null)
  const [salesTrend,     setSalesTrend]     = useState(null)
  const [loading,        setLoading]        = useState(true)

  useEffect(() => { fetchDashboard() }, [])

  async function fetchDashboard() {
    setLoading(true)
    try {
      if (USE_DUMMY) {
        setDashboardStats({ totalMedicines: 8, monthlySales: 21500, lowStockCount: 3, expiringSoon: 2 })
        setSalesTrend(dummySalesData)
      } else {
        const [stats, trend] = await Promise.all([
          reportService.getDashboardStats(),
          reportService.getMonthlySalesTrend(),
        ])
        setDashboardStats(stats)
        setSalesTrend({
          labels:   trend.map(t => t.label),
          datasets: [{ label: 'Sales (₱)', data: trend.map(t => t.total), borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,0.1)', tension: 0.4, fill: true }],
        })
      }
    } catch (err) {
      toast.error('Failed to load report data')
    } finally {
      setLoading(false)
    }
  }

  async function getSalesReport(from, to) {
    if (USE_DUMMY) return []
    try {
      return await reportService.getSalesReport(from, to)
    } catch (err) {
      toast.error(err.message)
      return []
    }
  }

  async function getInventoryReport() {
    if (USE_DUMMY) return []
    try {
      return await reportService.getInventoryReport()
    } catch (err) {
      toast.error(err.message)
      return []
    }
  }

  return { dashboardStats, salesTrend, loading, getSalesReport, getInventoryReport, categoryData: dummyCategoryData }
}
