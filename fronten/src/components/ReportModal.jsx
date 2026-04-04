import { useEffect, useState } from 'react'
import { X, BarChart2 } from 'lucide-react'
import { getReport } from '../api'

export default function ReportModal({ open, onClose }) {
  const [report, setReport] = useState('Loading...')

  useEffect(() => {
    if (!open) return
    getReport()
      .then(r => setReport(r.data.report || 'No applications tracked yet.'))
      .catch(() => setReport('Failed to load report.'))
  }, [open])

  if (!open) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#12122a', border: '1px solid #2a2a4a', borderRadius: 18,
        padding: 28, width: 620, maxWidth: '92vw', maxHeight: '80vh',
        display: 'flex', flexDirection: 'column', gap: 16
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart2 size={20} color="#6c63ff" />
            <h2 style={{ color: '#fff', fontSize: 18 }}>Application Tracker Report</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
            <X size={20} />
          </button>
        </div>
        <pre style={{
          background: '#0f0f1e', border: '1px solid #2a2a4a', borderRadius: 10,
          padding: 16, fontSize: 13, color: '#ccc', whiteSpace: 'pre-wrap',
          lineHeight: 1.7, overflowY: 'auto', flex: 1
        }}>{report}</pre>
        <button onClick={onClose} style={{
          background: '#6c63ff', border: 'none', borderRadius: 9,
          padding: '10px 0', color: '#fff', cursor: 'pointer', fontSize: 14
        }}>Close</button>
      </div>
    </div>
  )
}
