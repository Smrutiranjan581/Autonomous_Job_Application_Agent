import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Bot, User } from 'lucide-react'

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: 'linear-gradient(135deg,#6c63ff,#3ecfcf)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Bot size={16} color="#fff" />
      </div>
      <div style={{
        display: 'flex', gap: 5, padding: '12px 16px',
        background: '#1a1a2e', border: '1px solid #2a2a4a',
        borderRadius: '14px 14px 14px 4px'
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: '50%', background: '#6c63ff',
            display: 'inline-block',
            animation: 'bounce 1.2s infinite',
            animationDelay: `${i * 0.2}s`
          }} />
        ))}
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex', gap: 12, maxWidth: 820,
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignSelf: isUser ? 'flex-end' : 'flex-start'
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: isUser
          ? 'linear-gradient(135deg,#ff6584,#ff8c42)'
          : 'linear-gradient(135deg,#6c63ff,#3ecfcf)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {isUser ? <User size={16} color="#fff" /> : <Bot size={16} color="#fff" />}
      </div>
      <div style={{
        padding: '12px 16px', borderRadius: 14, fontSize: 14, lineHeight: 1.7,
        maxWidth: 680,
        background: isUser
          ? 'linear-gradient(135deg,#6c63ff,#5a52e0)'
          : '#1a1a2e',
        border: isUser ? 'none' : '1px solid #2a2a4a',
        borderTopRightRadius: isUser ? 4 : 14,
        borderTopLeftRadius: isUser ? 14 : 4,
        color: isUser ? '#fff' : '#ddd'
      }}>
        {isUser
          ? <p style={{ margin: 0 }}>{msg.text}</p>
          : <ReactMarkdown components={{
              p: ({ children }) => <p style={{ margin: '0 0 8px' }}>{children}</p>,
              ul: ({ children }) => <ul style={{ paddingLeft: 18, margin: '4px 0' }}>{children}</ul>,
              li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
              strong: ({ children }) => <strong style={{ color: '#fff' }}>{children}</strong>,
              code: ({ children }) => <code style={{ background: '#0f0f1e', padding: '2px 6px', borderRadius: 4, fontSize: 12, color: '#3ecfcf' }}>{children}</code>
            }}>{msg.text}</ReactMarkdown>
        }
        <p style={{ fontSize: 10, color: isUser ? 'rgba(255,255,255,0.5)' : '#555', marginTop: 6, textAlign: isUser ? 'right' : 'left' }}>
          {msg.time}
        </p>
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, typing }) {
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  return (
    <>
      <style>{`
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); }
          30% { transform: translateY(-7px); }
        }
      `}</style>
      <div style={{
        flex: 1, overflowY: 'auto', padding: '24px 28px',
        display: 'flex', flexDirection: 'column', gap: 20
      }}>
        {/* Welcome card */}
        <div style={{
          background: 'linear-gradient(135deg,#12122a,#1a1a3e)',
          border: '1px solid #2a2a4a', borderRadius: 16,
          padding: 28, textAlign: 'center', marginBottom: 8
        }}>
          <h2 style={{ fontSize: 22, color: '#fff', marginBottom: 8 }}>👋 Welcome to Job Application AI Agent</h2>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.7 }}>
            Upload your resume & job description, then let the AI handle the rest.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
            {['📄 Parse Resume','→','🎯 Score Match','→','✍️ Cover Letter','→','📌 Track','→','📧 Email'].map((s, i) => (
              <span key={i} style={{
                background: s === '→' ? 'transparent' : '#1a1a2e',
                border: s === '→' ? 'none' : '1px solid #2a2a4a',
                borderRadius: 20, padding: s === '→' ? '0' : '5px 12px',
                fontSize: 12, color: s === '→' ? '#555' : '#aaa'
              }}>{s}</span>
            ))}
          </div>
        </div>

        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {typing && <TypingDots />}
        <div ref={bottomRef} />
      </div>
    </>
  )
}
