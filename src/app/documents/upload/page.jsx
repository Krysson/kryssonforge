'use client'

import { useState } from 'react'

export default function UploadForm({ projectId }) {
  const [file, setFile] = useState(null)

  const handleFileChange = event => {
    setFile(event.target.files[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('projectId', projectId)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    if (res.ok) {
      alert(`File uploaded successfully: ${data.url}`)
    } else {
      alert(`File upload failed: ${data.error}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='file'
        onChange={handleFileChange}
      />
      <button type='submit'>Upload</button>
    </form>
  )
}
