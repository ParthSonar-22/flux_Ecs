'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

let openModalFn = () => {}

export function openNewsletterModal() {
  openModalFn()
}

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    openModalFn = () => {
      setIsOpen(true)
      setStatus('idle')
      setErrorMessage('')
      setEmail('')
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hp: honeypot }),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Subscription failed. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection.')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false)
      }}
    >
      <div className="relative w-full max-w-md border-2 border-ink bg-paper p-6 shadow-[8px_8px_0px_var(--brick)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 border-2 border-ink bg-card flex items-center justify-center text-ink hover:bg-tan active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-11 h-11 border-2 border-ink bg-paper p-1.5 shadow-[2.5px_2.5px_0px_var(--brick)] shrink-0 flex items-center justify-center">
              <Logo className="w-full h-full text-ink" />
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 border border-ink bg-tan text-ink text-[11px] font-bold uppercase tracking-wider font-complexity-notation">
                FLUX-ECS Updates
              </span>
              <h3 className="font-headline-sm text-headline-sm text-ink font-bold leading-tight">
                Get Club Updates
              </h3>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-muted mt-1">
            Receive event announcements, workshop schedules, and project logs directly in your inbox.
          </p>
        </div>

        {status === 'success' ? (
          <div className="border-2 border-ink bg-card p-4 text-center mt-4 space-y-2">
            <span className="material-symbols-outlined text-brick text-[32px]">
              check_circle
            </span>
            <p className="font-headline-sm text-[1.1rem] font-bold text-ink">
              You&apos;re Subscribed!
            </p>
            <p className="font-body-sm text-muted">
              We&apos;ll keep you posted on upcoming competitions and lab workshops.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-1.5 border-2 border-ink bg-brick text-paper font-label-smallcaps uppercase font-bold text-[12px] shadow-[2px_2px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {/* Honeypot field (hidden) */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website_hp"
                tabIndex="-1"
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="newsletter-email"
                className="block font-complexity-notation text-[12px] uppercase tracking-wider text-ink font-bold mb-1"
              >
                VESIT / Personal Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="2025.studentname@ves.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border-2 border-ink bg-card text-ink placeholder-muted/60 focus:outline-none focus:border-brick font-body-md text-body-md"
              />
            </div>

            {status === 'error' && (
              <p className="font-body-sm text-[13px] text-brick font-bold">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 border-2 border-ink bg-brick text-paper font-label-smallcaps uppercase tracking-wider font-bold shadow-[3px_3px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 cursor-pointer"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
