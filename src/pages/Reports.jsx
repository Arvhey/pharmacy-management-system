import { useState } from 'react'
import ReportCard      from '../components/reports/ReportCard'
import ReportTable     from '../components/reports/ReportTable'
import DownloadReport  from '../components/reports/DownloadReport'
import SalesChart      from '../components/dashboard/SalesChart'
import { useReports }  from '../hooks/useReports'
import { useMedicines } from '../hooks/useMedicines'
import { generateInventoryPDF, generateSalesPDF } from '../utils/generatePDF'
import { dummyMedicines, dummyTransactions } from '../data/dummyData'
import toast from 'react-hot-toast'

const today       = new Date().toISOString().split('T')[0]
const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]

export default function Reports() {
  const { salesTrend } = useReports()
  const { medicines }  = useMedicines()
  const [from,     setFrom]     = useState(firstOfMonth)
  const [to,       setTo]       = useState(today)
  const [active,   setActive]   = useState(null)
  const [tableData, setTableData] = useState([])
  const [dlLoading, setDlLoading] = useState(false)

  async function handleGenerate(type) {
    setActive(type)
    if (type === 'inventory') setTableData(medicines)
    if (type === 'sales') {
      // In demo use dummy transactions
      const enriched = dummyTransactions
        .filter(t => t.type === 'out')
        .map(t => ({ ...t, medicines: dummyMedicines.find(m => m.id === t.medicine_id) }))
      setTableData(enriched)
    }
    if (type === 'expiry') {
      const sorted = [...medicines].sort((a, b) => new Date(a.expiry_date) - new Date(b.expiry_date))
      setTableData(sorted)
      setActive('inventory')
    }
  }

  async function handleDownload() {
    setDlLoading(true)
    try {
      if (active === 'sales') {
        const enriched = dummyTransactions
          .filter(t => t.type === 'out')
          .map(t => ({ ...t, medicines: dummyMedicines.find(m => m.id === t.medicine_id) }))
        generateSalesPDF(enriched, from, to)
      } else {
        generateInventoryPDF(tableData.length ? tableData : medicines)
      }
      toast.success('PDF downloaded!')
    } catch (err) {
      toast.error('PDF generation failed')
    } finally {
      setDlLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="page-title">Reports</h2>
          <p className="page-subtitle">Generate and download pharmacy reports as PDF</p>
        </div>
        {active && <DownloadReport onDownload={handleDownload} loading={dlLoading} />}
      </div>

      {/* Report type cards */}
      <ReportCard onGenerate={handleGenerate} />

      {/* Sales trend chart */}
      <div className="glass-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="section-title">Sales Trend</h3>
            <p className="text-xs text-dark-400">Monthly revenue overview</p>
          </div>
          <div className="flex items-center gap-2">
            <input id="report-from" type="date" value={from} onChange={e => setFrom(e.target.value)}
              className="input-field text-sm py-1.5" />
            <span className="text-dark-500 text-sm">to</span>
            <input id="report-to" type="date" value={to} onChange={e => setTo(e.target.value)}
              className="input-field text-sm py-1.5" />
          </div>
        </div>
        <SalesChart data={salesTrend} />
      </div>

      {/* Report table preview */}
      {active && tableData.length > 0 && (
        <div className="glass-card overflow-hidden" style={{ padding: 0 }}>
          <div className="flex items-center justify-between p-4 border-b border-dark-700">
            <div>
              <h3 className="section-title capitalize">{active} Report Preview</h3>
              <p className="text-xs text-dark-400">{tableData.length} records</p>
            </div>
            <DownloadReport onDownload={handleDownload} loading={dlLoading} label="Download PDF" />
          </div>
          <div className="p-4">
            <ReportTable type={active} data={tableData} />
          </div>
        </div>
      )}
    </div>
  )
}
