import { useState } from 'react'
import { X, Download } from 'lucide-react'
import { generatePDF } from '../api'
import toast from 'react-hot-toast'

export default function PDFModal({ open, onClose, lastResponse }) {
  const [title,   setTitle]   = useState('Cover Letter')
  const [content, setContent] = useState('')

  const handleOpen = () => { setContent(lastResponse || ''); }

  if (!open) return null

  const handleDownload = async () => {
    const text = content.trim()
    if (!text) { toast.error('No content to generate PDF from'); return }
    const tid = toast.loading('Generating PDF...')
    try {
      const res  = await generatePDF({ type: 'cover_letter', title, content: text })
      const url  = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }))
      const a    = document.createElement('a')
      a.href     = url
      a.download = title.replace(/\s+/g, '_') + '.pdf'
      a.click()
      URL.revokeObjectURL(url)
      toast.success('PDF downloaded!', { id: tid })
      onClose()
    } catch {
      toast.error('PDF generation failed', { id: tid })
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#12122a', border: '1px solid #2a2a4a', borderRadius: 18,
        padding: 28, width: 640, maxWidth: '92vw', maxHeight: '85vh',
        display: 'flex', flexDirection: 'column', gap: 14
      }} ref={() => handleOpen()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Download size={20} color="#3ecfcf" />
            <h2 style={{ color: '#fff', fontSize: 18 }}>Generate PDF</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
            <X size={20} />
          </button>
        </div>

        <div>
          <label style={{ fontSize: 12, color: '#888' }}>Document Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)}
            style={{
              width: '100%', marginTop: 6, padding: '10px 12px',
              background: '#0f0f1e', border: '1px solid #2a2a4a',
              borderRadius: 8, color: '#fff', fontSize: 13, outline: 'none'
            }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <label style={{ fontSize: 12, color: '#888' }}>
            Content <span style={{ color: '#555' }}>(auto-filled from last agent response)</span>
          </label>
          <textarea value={content} onChange={e => setContent(e.target.value)}
            style={{
              flex: 1, marginTop: 6, padding: '10px 12px', minHeight: 220,
              background: '#0f0f1e', border: '1px solid #2a2a4a',
              borderRadius: 8, color: '#ccc', fontSize: 13,
              outline: 'none', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6
            }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleDownload} style={{
            flex: 1, background: 'linear-gradient(135deg,#6c63ff,#5a52e0)',
            border: 'none', borderRadius: 9, padding: '11px 0',
            color: '#fff', cursor: 'pointer', fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}>
            <Download size={15} /> Download PDF
          </button>
          <button onClick={onClose} style={{
            flex: 1, background: '#1a1a2e', border: '1px solid #2a2a4a',
            borderRadius: 9, padding: '11px 0',
            color: '#aaa', cursor: 'pointer', fontSize: 14
          }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
