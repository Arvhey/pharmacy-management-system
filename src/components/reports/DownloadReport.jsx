import { Download, Loader } from 'lucide-react'

export default function DownloadReport({ onDownload, loading, label = 'Download PDF' }) {
  return (
    <button
      id="download-report-btn"
      onClick={onDownload}
      disabled={loading}
      className="btn-primary"
    >
      {loading
        ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        : <Download size={15} />
      }
      {loading ? 'Generating...' : label}
    </button>
  )
}
