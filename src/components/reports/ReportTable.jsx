import { formatDate, formatDateTime } from '../../utils/formatDate'

export default function ReportTable({ type, data }) {
  if (!data?.length) return (
    <div className="py-10 text-center text-dark-400 text-sm">No data available for this period.</div>
  )

  if (type === 'sales') return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Date</th><th>Medicine</th><th>Category</th><th className="text-center">Qty</th>
            <th className="text-right">Unit Price</th><th className="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((t, i) => (
            <tr key={t.id || i}>
              <td className="text-dark-500 text-xs">{i + 1}</td>
              <td className="text-xs text-dark-300">{formatDateTime(t.created_at)}</td>
              <td className="font-medium text-dark-100">{t.medicines?.name || '—'}</td>
              <td><span className="badge-info">{t.medicines?.category || '—'}</span></td>
              <td className="text-center">{t.quantity}</td>
              <td className="text-right">₱{Number(t.medicines?.unit_price || 0).toFixed(2)}</td>
              <td className="text-right font-semibold text-emerald-400">
                ₱{(t.quantity * (t.medicines?.unit_price || 0)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-dark-600">
            <td colSpan={6} className="py-3 px-4 text-right font-semibold text-dark-300">Total</td>
            <td className="py-3 px-4 text-right font-bold text-emerald-400">
              ₱{data.reduce((s, t) => s + t.quantity * (t.medicines?.unit_price || 0), 0).toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )

  if (type === 'inventory') return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th><th>Medicine</th><th>Category</th><th className="text-center">Stock</th>
            <th>Unit</th><th className="text-right">Unit Price</th><th>Expiry</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m, i) => (
            <tr key={m.id}>
              <td className="text-dark-500 text-xs">{i + 1}</td>
              <td>
                <p className="font-medium text-dark-100">{m.name}</p>
                <p className="text-xs text-dark-500">{m.generic_name}</p>
              </td>
              <td><span className="badge-info">{m.category}</span></td>
              <td className="text-center font-semibold text-dark-100">{m.stock_quantity}</td>
              <td className="text-dark-400">{m.unit}</td>
              <td className="text-right">₱{Number(m.unit_price).toFixed(2)}</td>
              <td className="text-xs text-dark-300">{formatDate(m.expiry_date)}</td>
              <td>
                {m.stock_quantity === 0
                  ? <span className="badge-danger">Out</span>
                  : m.stock_quantity <= 10
                    ? <span className="badge-warning">Low</span>
                    : <span className="badge-success">OK</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return null
}
