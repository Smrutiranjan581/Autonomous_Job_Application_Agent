import { useRef, useState } from 'react'
import { FileText, Target, PenLine, Pin, BarChart2, Search, Download, Briefcase } from 'lucide-react'
import { uploadResume, uploadJobFile, uploadJobText } from '../api'
import toast from 'react-hot-toast'

const QuickBtn = ({ icon: Icon, label, color, onClick }) => (
  <button onClick={onClick} style={{
    background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 10,
    padding: '11px 14px', cursor: 'pointer', textAlign: 'left',
    color: '#ccc', fontSize: 13, display: 'flex', alignItems: 'center', gap: 10,
    transition: 'all .2s', width: '100%'
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = color || '#6c63ff'}
    onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a4a'}
  >
    <Icon size={15} color={color || '#6c63ff'} />
    {label}
  </button>
)

export default function Sidebar({ onQuickSend, onPDFOpen, resumeLoaded, jobLoaded, setResumeLoaded, setJobLoaded }) {
  const resumeRef = useRef()
  const jobRef    = useRef()
  const [jobText, setJobText] = useState('')

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const tid = toast.loading('Uploading resume...')
    try {
      await uploadResume(file)
      setResumeLoaded(file.name)
      toast.success('Resume uploaded & parsed!', { id: tid })
      onQuickSend(`I have uploaded my resume "${file.name}". Please acknowledge it's ready.`)
    } catch {
      toast.error('Resume upload failed', { id: tid })
    }
  }

  const handleJobFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const tid = toast.loading('Uploading job description...')
    try {
      const res = await uploadJobFile(file)
      setJobLoaded(file.name)
      toast.success('Job description uploaded!', { id: tid })
      onQuickSend(`Job description uploaded from file "${file.name}". Preview: ${res.data.preview}`)
    } catch {
      toast.error('Job upload failed', { id: tid })
    }
  }

  const handleJobTextSubmit = async () => {
    if (!jobText.trim()) { toast.error('Paste a job description first'); return }
    const tid = toast.loading('Saving job description...')
    try {
      await uploadJobText(jobText)
      setJobLoaded('Pasted text')
      setJobText('')
      toast.success('Job description saved!', { id: tid })
      onQuickSend(`Job description saved. Preview: ${jobText.slice(0, 200)}`)
    } catch {
      toast.error('Failed to save', { id: tid })
    }
  }

  return (
    <aside style={{
      width: 270,
      minWidth: 270,
      maxWidth: 270,
      background: '#0f0f1e',
      borderRight: '1px solid #2a2a4a',
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      padding: '18px 14px 30px 14px',
      overflowY: 'auto',
      overflowX: 'hidden',
      flex: '0 0 270px',
    }}>
      {/* Quick Actions */}
      <p style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Quick Actions</p>
      <QuickBtn icon={FileText}  label="Parse Resume"       onClick={() => onQuickSend('Parse my resume and extract key skills, experience and education')} />
      <QuickBtn icon={Target}    label="Score Job Match"    color="#3ecfcf" onClick={() => onQuickSend('Score my resume against the job description and give a detailed match percentage')} />
      <QuickBtn icon={PenLine}   label="Write Cover Letter" color="#ff8c42" onClick={() => onQuickSend('Write a professional tailored cover letter based on my resume and the job description')} />
      <QuickBtn icon={Pin}       label="Track Application"  color="#ff6584" onClick={() => onQuickSend('Track this job application in the database')} />
      <QuickBtn icon={Search}    label="Skill Gap Analysis" color="#f7c948" onClick={() => onQuickSend('Identify the skill gaps between my resume and the job description')} />
      <QuickBtn icon={BarChart2} label="Application Report" onClick={() => onQuickSend('Show me my full application tracker report')} />
      <QuickBtn icon={Download}  label="Download as PDF"    color="#3ecfcf" onClick={onPDFOpen} />

      <div style={{ height: 1, background: '#2a2a4a', margin: '8px 0' }} />

      {/* Resume Upload */}
      <p style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Upload Resume</p>
      <div onClick={() => resumeRef.current.click()} style={{
        border: `2px dashed ${resumeLoaded ? '#3ecfcf' : '#2a2a4a'}`,
        borderRadius: 10, padding: '14px 10px', textAlign: 'center',
        cursor: 'pointer', color: resumeLoaded ? '#3ecfcf' : '#555', fontSize: 12,
        transition: 'all .2s'
      }}>
        <FileText size={22} style={{ margin: '0 auto 6px' }} />
        {resumeLoaded ? `✓ ${resumeLoaded}` : 'Click to upload PDF / TXT'}
      </div>
      <input ref={resumeRef} type="file" accept=".pdf,.txt" style={{ display: 'none' }} onChange={handleResumeUpload} />

      <div style={{ height: 1, background: '#2a2a4a', margin: '8px 0' }} />

      {/* Job Description Upload */}
      <p style={{ fontSize: 10, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Job Description</p>
      <div onClick={() => jobRef.current.click()} style={{
        border: `2px dashed ${jobLoaded ? '#ff8c42' : '#2a2a4a'}`,
        borderRadius: 10, padding: '14px 10px', textAlign: 'center',
        cursor: 'pointer', color: jobLoaded ? '#ff8c42' : '#555', fontSize: 12,
        transition: 'all .2s'
      }}>
        <Briefcase size={22} style={{ margin: '0 auto 6px' }} />
        {jobLoaded ? `✓ ${jobLoaded}` : 'Click to upload Job Description'}
      </div>
      <input ref={jobRef} type="file" accept=".pdf,.txt" style={{ display: 'none' }} onChange={handleJobFileUpload} />

      <textarea
        value={jobText}
        onChange={e => setJobText(e.target.value)}
        placeholder="Or paste job description here..."
        style={{
          background: '#1a1a2e', border: '1px solid #2a2a4a', borderRadius: 10,
          color: '#ccc', fontSize: 12, padding: 10, resize: 'vertical',
          minHeight: 80, fontFamily: 'inherit', outline: 'none', marginTop: 4
        }}
      />
      <button onClick={handleJobTextSubmit} style={{
        background: 'linear-gradient(135deg,#6c63ff,#5a52e0)',
        border: 'none', borderRadius: 9, padding: '9px 0',
        color: '#fff', fontSize: 13, cursor: 'pointer', fontWeight: 500,
        marginBottom: 20
      }}>
        Submit Job Description
      </button>
    </aside>
  )
}
