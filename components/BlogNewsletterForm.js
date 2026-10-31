'use client'

import { useState } from 'react'

export default function BlogNewsletterForm() {
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hp }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Subscription failed.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Connection error.')
    }
  }

  return (
    <div className="border-2 border-ink bg-card p-6 shadow-[6px_6px_0px_var(--brick)] relative">
      <div className="flex items-center gap-2 font-complexity-notation text-brick mb-2 text-xs font-bold uppercase tracking-wider">
        <span className="material-symbols-outlined text-[16px]">mail</span>
        <span>NEWSLETTER</span>
      </div>
      <h3 className="font-headline-sm text-headline-sm text-ink mb-2 font-bold">
        Subscribe for Updates
      </h3>
      <p className="font-body-sm text-body-sm text-muted mb-5 leading-relaxed">
        Register your email to receive technical articles, workshop briefs, and announcements directly from the FLUX-ECS club.
      </p>

      {status === 'success' ? (
        <div className="p-3 border border-ink bg-paper text-ink font-complexity-notation text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-brick text-[18px]">verified</span>
          <span>Subscribed successfully! We will keep you updated.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div style={{ display: 'none' }}>
            <input
              type="text"
              name="hp_blog"
              tabIndex="-1"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="blog-sub-email"
              className="font-label-smallcaps text-label-smallcaps text-muted uppercase tracking-wider block mb-1 font-bold"
            >
              VESIT / Personal Email
            </label>
            <input
              id="blog-sub-email"
              type="email"
              required
              placeholder="2025.studentname@ves.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border-2 border-ink bg-paper text-ink font-body-md text-sm placeholder-muted/60 focus:outline-none focus:border-brick"
            />
          </div>

          {status === 'error' && (
            <p className="font-complexity-notation text-xs text-brick font-bold">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-2 w-full py-2.5 px-4 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[3px_3px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 font-bold cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">outgoing_mail</span>
            <span>{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
          </button>
        </form>
      )}

      <div className="mt-4 pt-3 border-t border-ink/30 flex items-center justify-between font-complexity-notation text-[10px] text-muted">
        <span>VESIT ECS</span>
        <span>NO SPAM</span>
      </div>
    </div>
  )
}
