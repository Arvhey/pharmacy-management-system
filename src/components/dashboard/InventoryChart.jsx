import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PALETTE = [
  '#14b8a6', '#0d9488', '#f97316', '#fb923c',
  '#6366f1', '#8b5cf6', '#ec4899', '#94a3b8',
]

export default function InventoryChart({ data }) {
  if (!data) return <div className="h-52 flex items-center justify-center text-dark-400 text-sm">No data available</div>

  const chartData = {
    labels: data.labels,
    datasets: [{
      data:            data.data,
      backgroundColor: PALETTE.map(c => c + 'cc'),
      borderColor:     PALETTE,
      borderWidth:     2,
      hoverOffset:     8,
    }],
  }

  const options = {
    responsive:          true,
    maintainAspectRatio: false,
    cutout:              '65%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color:     '#94a3b8',
          boxWidth:  12,
          boxHeight: 12,
          padding:   14,
          font:      { size: 11 },
        },
      },
      tooltip: {
        backgroundColor: '#1e293b',
        borderColor:     '#334155',
        borderWidth:     1,
        titleColor:      '#f1f5f9',
        bodyColor:       '#94a3b8',
        padding:         10,
        callbacks: {
          label: ctx => ` ${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  }

  return <div className="h-52"><Doughnut data={chartData} options={options} /></div>
}
