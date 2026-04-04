import axios from 'axios'

const api = axios.create({ baseURL: '/' })

export const checkHealth   = ()        => api.get('/health')
export const sendChat      = (message) => api.post('/chat', { message })
export const getReport     = ()        => api.get('/report')
export const uploadResume  = (file)    => { const f = new FormData(); f.append('file', file); return api.post('/upload-resume', f) }
export const uploadJobFile = (file)    => { const f = new FormData(); f.append('file', file); return api.post('/upload-job', f) }
export const uploadJobText = (text)    => api.post('/upload-job', { text })
export const generatePDF   = (data)    => api.post('/generate-pdf', data, { responseType: 'blob' })
