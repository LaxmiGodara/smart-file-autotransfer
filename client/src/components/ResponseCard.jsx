import React from 'react'

export default function ResponseCard({ result }) {
  const { message, totalRows, inserted, failed, errors, sample } = result

  const cardStyle = {
    background: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontFamily: 'system-ui, Arial'
  }

  const statusColor =
    failed === 0 ? '#22c55e' : failed < totalRows ? '#f59e0b' : '#ef4444'

  return (
    <div style={cardStyle}>
      <h3 style={{ color: '#111827' }}>📊 Upload Summary</h3>
      <p style={{ color: statusColor, fontWeight: 600 }}>{message}</p>

      <ul style={{ lineHeight: 1.8 }}>
        <li>📂 Total Rows: {totalRows}</li>
        <li>✅ Inserted: {inserted}</li>
        <li>⚠️ Failed: {failed}</li>
      </ul>

      {sample?.length > 0 && (
        <div>
          <h4>🧾 Sample Data</h4>
          <pre
            style={{
              background: '#fff',
              padding: 10,
              borderRadius: 6,
              overflowX: 'auto'
            }}
          >
{JSON.stringify(sample, null, 2)}
          </pre>
        </div>
      )}

      {errors?.length > 0 && (
        <div>
          <h4 style={{ color: '#b91c1c' }}>🚨 Error Details</h4>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>
                Row {err.row}: {err.issue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

