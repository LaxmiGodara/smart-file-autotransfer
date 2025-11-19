import React, { useState } from 'react'
import axios from 'axios'
import ResponseCard from './ResponseCard.jsx'
import { logClientError } from '../utils/logger.js'

export default function UploadForm() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onSelect = (e) => {
    const f = e.target.files?.[0]
    setFile(f || null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a valid .xlsx file')
      return
    }

    const form = new FormData()
    form.append('file', file)

    try {
      setLoading(true)
      setResult(null)
      setError(null)
      const { data } = await axios.post('/api/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setResult(data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed')
      logClientError('Upload error', { message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, borderRadius: 10 }}>
      <form onSubmit={onSubmit}>
        <input type="file" accept=".xlsx" onChange={onSelect} />
        <button
          type="submit"
          disabled={loading}
          style={{ marginLeft: 12, padding: '5px 12px', cursor: 'pointer' }}
        >
          {loading ? 'Processing…' : 'Upload'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: 10 }}>
          ❌ {error}
        </div>
      )}

      {result && (
        <div style={{ marginTop: 20 }}>
          <ResponseCard result={result} />
        </div>
      )}
    </div>
  )
}
