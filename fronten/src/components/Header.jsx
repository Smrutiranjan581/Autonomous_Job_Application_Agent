import { Bot, Activity, BarChart2 } from 'lucide-react'

export default function Header({ status, onReport }) {
  return (
    <header style={{
      background: 'linear-gradient(135deg,#12122a,#1a1a3e)',
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid #2a2a4a',
      boxShadow: '0 2px 24px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'linear-gradient(135deg,#6c63ff,#3ecfcf)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Bot size={22} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>Job Application AI Agent</h1>
          <p style={{ fontSize: 11, color: '#888' }}>Powered by GPT-4o-mini · LangChain · React</p>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12 }}>
          <Activity size={13} color={status === 'ok' ? '#3ecfcf' : '#ff6584'} />
          <span style={{ color: status === 'ok' ? '#3ecfcf' : '#ff6584' }}>
            {status === 'ok' ? 'Agent Online' : status === 'checking' ? 'Connecting...' : 'Offline'}
          </span>
        </div>
        <button onClick={onReport} style={{
          padding: '8px 16px', borderRadius: 9,
          border: '1px solid #6c63ff', color: '#6c63ff',
          background: 'transparent', cursor: 'pointer', fontSize: 13,
          display: 'flex', alignItems: 'center', gap: 6
        }}>
          <BarChart2 size={14} /> View Report
        </button>
      </div>
    </header>
  )
}
