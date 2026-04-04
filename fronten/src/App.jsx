import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Header      from './components/Header'
import Sidebar     from './components/Sidebar'
import ChatWindow  from './components/ChatWindow'
import ChatInput   from './components/ChatInput'
import ReportModal from './components/ReportModal'
import PDFModal    from './components/PDFModal'
import { checkHealth, sendChat } from './api'

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export default function App() {
  const [messages,     setMessages]     = useState([])
  const [typing,       setTyping]       = useState(false)
  const [status,       setStatus]       = useState('checking')
  const [reportOpen,   setReportOpen]   = useState(false)
  const [pdfOpen,      setPdfOpen]      = useState(false)
  const [lastResponse, setLastResponse] = useState('')
  const [resumeLoaded, setResumeLoaded] = useState('')
  const [jobLoaded,    setJobLoaded]    = useState('')

  useEffect(() => {
    checkHealth()
      .then(r => {
        setStatus(r.data.status === 'ok' ? 'ok' : 'error')
        addAgentMsg(r.data.status === 'ok'
          ? '✅ Agent connected and ready!\n\nUpload your **resume** and **job description** from the sidebar, then ask me anything.'
          : '⚠️ ' + r.data.message)
      })
      .catch(() => {
        setStatus('error')
        addAgentMsg('❌ Cannot connect to backend. Make sure `python app.py` is running on port 8000.')
      })
  }, [])

  const addAgentMsg = (text) =>
    setMessages(prev => [...prev, { role: 'agent', text, time: now() }])

  const handleSend = async (text) => {
    setMessages(prev => [...prev, { role: 'user', text, time: now() }])
    setTyping(true)
    try {
      const res   = await sendChat(text)
      const reply = res.data.response || res.data.error || 'Something went wrong.'
      const pdfUrl = res.data.pdf_url
      addAgentMsg(reply)
      setLastResponse(reply)

      // Auto-download PDF if backend generated one
      if (pdfUrl) {
        setTimeout(() => {
          const a = document.createElement('a')
          a.href = pdfUrl
          a.download = 'Cover_Letter.pdf'
          a.click()
          addAgentMsg('📄 **Cover letter PDF has been automatically downloaded!** Check your Downloads folder.')
        }, 800)
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'Agent error. Check backend is running.'
      addAgentMsg('❌ ' + msg)
    } finally {
      setTyping(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#1a1a2e', color: '#fff', border: '1px solid #2a2a4a' }
      }} />

      <Header status={status} onReport={() => setReportOpen(true)} />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <Sidebar
          onQuickSend={handleSend}
          onPDFOpen={() => setPdfOpen(true)}
          resumeLoaded={resumeLoaded}
          jobLoaded={jobLoaded}
          setResumeLoaded={setResumeLoaded}
          setJobLoaded={setJobLoaded}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <ChatWindow messages={messages} typing={typing} />
          <ChatInput onSend={handleSend} disabled={typing} />
        </div>
      </div>

      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} />
      <PDFModal    open={pdfOpen}    onClose={() => setPdfOpen(false)} lastResponse={lastResponse} />
    </div>
  )
}
