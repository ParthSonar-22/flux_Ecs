'use client'

import { useState } from 'react'

export default function BlogNewsletterCard() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid academic or personal email.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setMessage(data.message || 'Subscribed! You will receive new guides via email.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r from-[#171C23] via-[#12161C] to-[#171C23] p-8 lg:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        <div className="max-w-xl flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D94A5B] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#D94A5B] font-semibold">
              TRANSMISSION DISPATCH
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            GET NEW GUIDES DELIVERED.
          </h3>
          <p className="text-sm text-[#9EA6AF] leading-relaxed">
            Subscribe to instant email alerts whenever new tutorials, firmware boilerplates, or lab schematics are published by the council. Zero spam.
          </p>
        </div>

        <div className="w-full md:max-w-md">
          {status === 'success' ? (
            <div className="p-4 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-xs flex items-center gap-2">
              <span>✓</span>
              <span>{message}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                placeholder="your.email@ves.ac.in"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                disabled={status === 'loading'}
                className="flex-1 bg-[#0D1014] border border-white/20 focus:border-[#D94A5B] rounded px-4 py-2.5 text-xs text-white placeholder-[#656D7A] focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-5 py-2.5 bg-[#D94A5B] hover:bg-[#e45a6b] disabled:opacity-50 text-white font-mono text-xs uppercase tracking-wider font-semibold rounded transition-all shadow-[0_4px_16px_rgba(217,74,91,0.3)] whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-xs text-[#D94A5B] font-mono mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
