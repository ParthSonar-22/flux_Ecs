'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        router.refresh()
      } else {
        setStatus('error')
        setError(data.error || 'Authentication denied.')
      }
    } catch {
      setStatus('error')
      setError('Connection failure.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="admin-password"
          className="block font-complexity-notation text-[12px] uppercase tracking-wider text-ink font-bold mb-1"
        >
          Council Authorization Key
        </label>
        <input
          id="admin-password"
          type="password"
          required
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border-2 border-ink bg-card text-ink placeholder-muted focus:outline-none focus:border-brick font-mono"
        />
      </div>

      {status === 'error' && (
        <p className="font-complexity-notation text-[12px] text-brick font-bold">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-2.5 border-2 border-ink bg-brick text-paper font-label-smallcaps uppercase tracking-wider font-bold shadow-[3px_3px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50"
      >
        {status === 'loading' ? 'Authenticating...' : 'Authorize Terminal'}
      </button>
    </form>
  )
}
