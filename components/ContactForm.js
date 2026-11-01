'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    year: 'SE',
    category: "Algorithm's Auction",
    message: '',
    hp: '', // honeypot
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (formData.hp) return

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
          year: 'SE',
          category: "Algorithm's Auction",
          message: '',
          hp: '',
        })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to dispatch message. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network connection error. Please try again.')
    }
  }

  return (
    <div className="bg-[#12161C] border border-white/10 rounded-xl p-6 sm:p-8 shadow-xl">
      <div className="border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold">
            Direct Dispatch
          </span>
          <span className="font-mono text-[11px] text-gray-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
            VESIT · ECS
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
          Send Us a Message
        </h2>
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          Questions about events, lab benches, or technical workshops? Drop your details below and our council will respond promptly.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-[#171C23] border border-emerald-500/30 rounded-xl text-center space-y-3">
          <span className="inline-block p-2 rounded-full bg-emerald-500/10 text-emerald-400 text-2xl">
            ✓
          </span>
          <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight">
            Message Dispatched Successfully
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Thank you for reaching out! A FluxECS officer will reply to your student email shortly.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-4 px-5 py-2 border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono uppercase tracking-wider text-xs font-semibold rounded-lg transition-all"
          >
            Send Another Dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="hp"
              tabIndex={-1}
              value={formData.hp}
              onChange={handleChange}
            />
          </div>

          {/* Row 1: Name & Student Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                className="font-mono text-xs uppercase tracking-wider text-gray-300 block font-semibold"
                htmlFor="sender-name"
              >
                Your Full Name <span className="text-[#D94A5B]">*</span>
              </label>
              <input
                id="sender-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aarya Tanwade"
                className="w-full bg-[#171C23] border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:border-[#D94A5B] outline-none transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="font-mono text-xs uppercase tracking-wider text-gray-300 block font-semibold"
                htmlFor="sender-email"
              >
                VESIT / Personal Email <span className="text-[#D94A5B]">*</span>
              </label>
              <input
                id="sender-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="2025.studentname@ves.ac.in"
                className="w-full bg-[#171C23] border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-500 focus:border-[#D94A5B] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Academic Year & Inquiry Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                className="font-mono text-xs uppercase tracking-wider text-gray-300 block font-semibold"
                htmlFor="academic-year"
              >
                Academic Year <span className="text-[#D94A5B]">*</span>
              </label>
              <select
                id="academic-year"
                name="year"
                required
                value={formData.year}
                onChange={handleChange}
                className="w-full bg-[#171C23] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm font-mono focus:border-[#D94A5B] outline-none transition-colors cursor-pointer"
              >
                <option value="FE">First Year (FE)</option>
                <option value="SE">Second Year (SE - ECS)</option>
                <option value="TE">Third Year (TE - ECS)</option>
                <option value="BE">Final Year (BE - ECS)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label
                className="font-mono text-xs uppercase tracking-wider text-gray-300 block font-semibold"
                htmlFor="inquiry-category"
              >
                Inquiry Category <span className="text-[#D94A5B]">*</span>
              </label>
              <select
                id="inquiry-category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#171C23] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm font-mono focus:border-[#D94A5B] outline-none transition-colors cursor-pointer"
              >
                <option value="Algorithm's Auction">Algorithm&apos;s Auction</option>
                <option value="Event / Workshop Inquiry">Event / Workshop Inquiry</option>
                <option value="General question">General question</option>
                <option value="Collaboration or sponsorship">Collaboration or sponsorship</option>
              </select>
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="space-y-1.5">
            <label
              className="font-mono text-xs uppercase tracking-wider text-gray-300 block font-semibold"
              htmlFor="dispatch-message"
            >
              Your Message <span className="text-[#D94A5B]">*</span>
            </label>
            <textarea
              id="dispatch-message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Ask about team registrations, rules, event dates, or upcoming workshops..."
              className="w-full bg-[#171C23] border border-white/15 rounded-lg p-3 text-white text-sm placeholder:text-gray-500 focus:border-[#D94A5B] outline-none leading-relaxed transition-colors"
            />
          </div>

          {status === 'error' && (
            <p className="font-mono text-xs text-red-400 bg-red-950/40 border border-red-500/30 p-3 rounded-lg">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#D94A5B] hover:bg-[#e45a6b] text-white font-mono text-xs uppercase tracking-wider rounded-lg shadow-[0_4px_16px_rgba(217,74,91,0.3)] transition-all font-bold cursor-pointer disabled:opacity-50"
            >
              <span>{status === 'loading' ? 'Dispatching...' : 'Send Message →'}</span>
            </button>
            <span className="font-mono text-xs text-gray-400">
              Direct dispatch to council secretariat
            </span>
          </div>
        </form>
      )}
    </div>
  )
}
