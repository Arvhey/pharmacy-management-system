import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function SalesChart({ data }) {
  if (!data) return <div className="h-64 flex items-center justify-center text-dark-400 text-sm">No data available</div>

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(ds => ({
      ...ds,
      tension:         0.4,
      fill:            true,
      borderWidth:     2.5,
      pointRadius:     4,
      pointHoverRadius:6,
      pointBackgroundColor: '#14b8a6',
      pointBorderColor:     '#0f172a',
      pointBorderWidth:     2,
      backgroundColor: 'rgba(20,184,166,0.08)',
      borderColor:     '#14b8a6',
    })),
  }

  const options = {
    responsive:          true,
    maintainAspectRatio: false,
    interaction:         { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        borderColor:     '#334155',
        borderWidth:     1,
        titleColor:      '#f1f5f9',
        bodyColor:       '#94a3b8',
        padding:         12,
        callbacks: {
          label: ctx => ` ₱${Number(ctx.parsed.y).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: {
        grid:  { color: 'rgba(51,65,85,0.5)' },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
      y: {
        grid:  { color: 'rgba(51,65,85,0.5)' },
        ticks: {
          color: '#64748b',
          font:  { size: 11 },
          callback: v => `₱${Number(v).toLocaleString()}`,
        },
        beginAtZero: true,
      },
    },
  }

  return <div className="h-64"><Line data={chartData} options={options} /></div>
}
