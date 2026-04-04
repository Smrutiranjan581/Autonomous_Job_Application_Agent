import { useState, useRef } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('')
  const ref = useRef()

  const handleSend = () => {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText('')
    ref.current.style.height = 'auto'
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const autoResize = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div style={{ padding: '14px 28px 20px', borderTop: '1px solid #2a2a4a', background: '#0a0a14' }}>
      <div style={{
        display: 'flex', gap: 10, alignItems: 'flex-end',
        background: '#1a1a2e', border: '1px solid #2a2a4a',
        borderRadius: 14, padding: '10px 14px',
        transition: 'border-color .2s'
      }}
        onFocus={e => e.currentTarget.style.borderColor = '#6c63ff'}
        onBlur={e => e.currentTarget.style.borderColor = '#2a2a4a'}
      >
        <textarea
          ref={ref}
          rows={1}
          value={text}
          onChange={e => { setText(e.target.value); autoResize(e) }}
          onKeyDown={handleKey}
          placeholder="Ask me anything — e.g. Write a cover letter for Software Engineer at Google..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#e0e0e0', fontSize: 14, resize: 'none',
            maxHeight: 120, lineHeight: 1.6, fontFamily: 'inherit'
          }}
        />
        <button onClick={handleSend} disabled={disabled || !text.trim()} style={{
          width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
          background: disabled || !text.trim()
            ? '#2a2a4a'
            : 'linear-gradient(135deg,#6c63ff,#5a52e0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .2s', flexShrink: 0
        }}>
          <Send size={16} color="#fff" />
        </button>
      </div>
      <p style={{ fontSize: 11, color: '#444', marginTop: 7, textAlign: 'center' }}>
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
