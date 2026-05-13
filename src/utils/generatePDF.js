import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatDate, formatDateTime } from './formatDate'

export function generateInventoryPDF(medicines) {
  const doc = new jsPDF()
  const now = formatDateTime(new Date().toISOString())

  // Header
  doc.setFillColor(15, 118, 110)
  doc.rect(0, 0, 210, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('PharmaCare – Inventory Report', 14, 12)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${now}`, 14, 20)

  doc.setTextColor(0, 0, 0)

  autoTable(doc, {
    startY: 34,
    head: [['#', 'Name', 'Category', 'Stock', 'Unit', 'Unit Price', 'Expiry Date', 'Status']],
    body: medicines.map((m, i) => [
      i + 1,
      m.name,
      m.category,
      m.stock_quantity,
      m.unit,
      `₱${Number(m.unit_price).toFixed(2)}`,
      formatDate(m.expiry_date),
      m.stock_quantity === 0 ? 'Out of Stock' : m.stock_quantity <= 10 ? 'Low Stock' : 'In Stock',
    ]),
    headStyles:    { fillColor: [15, 118, 110], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 253, 252] },
    styles:        { fontSize: 8, cellPadding: 3 },
    columnStyles:  { 3: { halign: 'center' }, 5: { halign: 'right' } },
  })

  doc.save(`inventory_report_${Date.now()}.pdf`)
}

export function generateSalesPDF(transactions, from, to) {
  const doc = new jsPDF()
  const now = formatDateTime(new Date().toISOString())

  doc.setFillColor(15, 118, 110)
  doc.rect(0, 0, 210, 28, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('PharmaCare – Sales Report', 14, 12)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Period: ${formatDate(from)} – ${formatDate(to)}  |  Generated: ${now}`, 14, 20)

  doc.setTextColor(0, 0, 0)

  const total = transactions.reduce((s, t) => s + t.quantity * (t.medicines?.unit_price || 0), 0)

  autoTable(doc, {
    startY: 34,
    head:   [['Date', 'Medicine', 'Category', 'Qty', 'Unit Price', 'Total']],
    body: [
      ...transactions.map(t => [
        formatDateTime(t.created_at),
        t.medicines?.name || '—',
        t.medicines?.category || '—',
        t.quantity,
        `₱${Number(t.medicines?.unit_price || 0).toFixed(2)}`,
        `₱${(t.quantity * (t.medicines?.unit_price || 0)).toFixed(2)}`,
      ]),
      ['', '', '', '', 'TOTAL', `₱${total.toFixed(2)}`],
    ],
    headStyles:    { fillColor: [15, 118, 110], textColor: 255 },
    alternateRowStyles: { fillColor: [240, 253, 252] },
    styles:        { fontSize: 8, cellPadding: 3 },
    columnStyles:  { 3: { halign: 'center' }, 4: { halign: 'right' }, 5: { halign: 'right' } },
  })

  doc.save(`sales_report_${Date.now()}.pdf`)
}
