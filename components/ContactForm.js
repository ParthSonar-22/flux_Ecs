'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: 'FE',
    category: "Algorithm's Auction",
    message: '',
    hp: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok && data.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          year: 'FE',
          category: "Algorithm's Auction",
          message: '',
          hp: '',
        })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to send message.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network connection error. Please try again.')
    }
  }

  return (
    <div className="bg-card border-2 border-ink shadow-[6px_6px_0px_var(--brick)] p-space-md lg:p-space-lg">
      <div className="border-b-2 border-ink pb-space-sm mb-space-md">
        <div className="flex items-center justify-between">
          <span className="handwritten-eyebrow text-xl sm:text-2xl font-bold text-brick">
            Direct Message
          </span>
          <span className="font-complexity-notation text-xs font-bold text-ink bg-tan px-2 py-0.5 border border-ink">
            VESIT ECS
          </span>
        </div>
        <h2 className="font-headline-md text-xl sm:text-2xl md:text-headline-md text-ink uppercase tracking-tight mt-1 font-bold">
          Send Us a Message
        </h2>
        <p className="font-body-md text-sm sm:text-body-md text-muted">
          Got questions about events, workshops, or club activities? Drop your details below and our council will get back to you.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-paper border-2 border-ink shadow-[4px_4px_0px_var(--ink)] text-center space-y-3">
          <span className="material-symbols-outlined text-brick text-[36px]">
            verified
          </span>
          <h3 className="font-headline-sm text-xl font-bold text-ink">
            Message Sent Successfully
          </h3>
          <p className="font-body-md text-muted max-w-md mx-auto">
            Thanks for reaching out! A council member will reply to your email shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-4 px-6 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps uppercase tracking-wider text-xs font-bold shadow-[2px_2px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-space-md">
          {/* Honeypot */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="hp"
              tabIndex="-1"
              value={formData.hp}
              onChange={handleChange}
            />
          </div>

          {/* Row 1: Name & Student Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label
                className="font-label-smallcaps text-xs uppercase tracking-wider text-ink block font-bold"
                htmlFor="sender-name"
              >
                Your Full Name <span className="text-brick">*</span>
              </label>
              <input
                id="sender-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Advait Sharma"
                className="w-full bg-paper border-2 border-ink px-3 py-2.5 font-body-md text-ink placeholder:text-muted/50 focus:outline-none focus:border-brick transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="font-label-smallcaps text-xs uppercase tracking-wider text-ink block font-bold"
                htmlFor="sender-email"
              >
                VESIT / Personal Email <span className="text-brick">*</span>
              </label>
              <input
                id="sender-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="2025.studentname@ves.ac.in"
                className="w-full bg-paper border-2 border-ink px-3 py-2.5 font-complexity-notation text-base sm:text-sm text-ink placeholder:text-muted/50 focus:outline-none focus:border-brick transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Academic Year & Inquiry Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="space-y-1.5">
              <label
                className="font-label-smallcaps text-xs uppercase tracking-wider text-ink block font-bold"
                htmlFor="academic-year"
              >
                Academic Year <span className="text-brick">*</span>
              </label>
              <div className="relative">
                <select
                  id="academic-year"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full appearance-none bg-paper border-2 border-ink px-3 py-2.5 font-complexity-notation text-base sm:text-sm text-ink focus:outline-none focus:border-brick transition-colors cursor-pointer"
                >
                  <option value="FE">First Year (FE)</option>
                  <option value="SE">Second Year (SE - ECS)</option>
                  <option value="TE">Third Year (TE - ECS)</option>
                  <option value="BE">Final Year (BE - ECS)</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-ink text-[20px]">
                  arrow_drop_down
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="font-label-smallcaps text-xs uppercase tracking-wider text-ink block font-bold"
                htmlFor="inquiry-category"
              >
                Inquiry Category <span className="text-brick">*</span>
              </label>
              <div className="relative">
                <select
                  id="inquiry-category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none bg-paper border-2 border-ink px-3 py-2.5 font-complexity-notation text-base sm:text-sm text-ink focus:outline-none focus:border-brick transition-colors cursor-pointer"
                >
                  <option value="Algorithm's Auction">Algorithm&apos;s Auction</option>
                  <option value="Event / Workshop Inquiry">Event / Workshop Inquiry</option>
                  <option value="General question">General question</option>
                  <option value="Collaboration or sponsorship">Collaboration or sponsorship</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-ink text-[20px]">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="space-y-1.5">
            <label
              className="font-label-smallcaps text-xs uppercase tracking-wider text-ink block font-bold"
              htmlFor="dispatch-message"
            >
              Your Message <span className="text-brick">*</span>
            </label>
            <textarea
              id="dispatch-message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              placeholder="Ask about team registrations, rules, event dates, or upcoming workshops..."
              className="w-full bg-paper border-2 border-ink p-3 font-body-md text-ink placeholder:text-muted/50 focus:outline-none focus:border-brick transition-colors"
            />
          </div>

          {status === 'error' && (
            <p className="font-complexity-notation text-xs text-brick font-bold">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider border-2 border-ink shadow-[6px_6px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_var(--ink)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all font-bold cursor-pointer disabled:opacity-50"
            >
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
            <div className="flex items-center gap-2 text-muted">
              <span className="material-symbols-outlined text-[16px]">mail</span>
              <span className="font-complexity-notation text-[11px] uppercase tracking-wider">
                Direct to flux.ecs@ves.ac.in
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
