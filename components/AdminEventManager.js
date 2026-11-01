'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminEventManager({ initialEvents = [] }) {
  const [events, setEvents] = useState(initialEvents)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingPoster, setUploadingPoster] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    title: '',
    slug: '',
    category: 'Competitive Coding',
    date: '',
    time: '',
    venue: 'Lab 201, VESIT, Mumbai',
    summary: '',
    description: '',
    poster_url: '',
    registration_url: '',
    eligibility: 'Open to FE, SE, TE, and BE students of the Department of Electronics & Computer Science.',
    syllabus: '',
    rules: '',
    timeline_image: '',
    status: 'upcoming',
    is_published: true,
  }

  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Handle direct poster image file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingPoster(true)
    setFeedback(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.ok && data.url) {
        setForm((prev) => ({ ...prev, poster_url: data.url }))
        setFeedback({ type: 'success', message: 'Poster artwork uploaded successfully!' })
      } else {
        setFeedback({ type: 'error', message: data.error || 'Upload failed' })
      }
    } catch {
      setFeedback({ type: 'error', message: 'Error uploading poster file.' })
    } finally {
      setUploadingPoster(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const isEdit = Boolean(editingId)
      const url = isEdit ? `/api/events/${editingId}` : '/api/events'
      const method = isEdit ? 'PATCH' : 'POST'

      // Prepare payload
      const payload = {
        ...form,
        // Convert rules multiline string into array of rules
        rules: typeof form.rules === 'string'
          ? form.rules.split('\n').map((r) => r.trim()).filter(Boolean)
          : form.rules,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.ok) {
        setFeedback({
          type: 'success',
          message: isEdit
            ? `Event "${form.title}" successfully updated and saved!`
            : `Event "${form.title}" successfully published to the registry!`,
        })

        if (isEdit) {
          setEvents((prev) =>
            prev.map((item) => ((item.slug || item.id) === editingId ? data.event : item))
          )
          setEditingId(null)
        } else if (data.event) {
          setEvents((prev) => [data.event, ...prev])
        }

        setForm(emptyForm)
      } else {
        setFeedback({ type: 'error', message: data.error || 'Operation failed.' })
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error communicating with events API.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (evt) => {
    const id = evt.slug || evt.id
    setEditingId(id)

    // Pre-populate all fields
    const rulesText = Array.isArray(evt.rules)
      ? evt.rules.join('\n')
      : (evt.rules || '')

    setForm({
      title: evt.title || '',
      slug: evt.slug || '',
      category: evt.category || 'Competitive Coding',
      date: evt.date || '',
      time: evt.time || '',
      venue: evt.venue || 'Lab 201, VESIT, Mumbai',
      summary: evt.summary || '',
      description: evt.description || '',
      poster_url: evt.poster_url || evt.poster || '',
      registration_url: evt.registration_url || evt.registerUrl || '',
      eligibility: evt.eligibility || 'Open to FE, SE, TE, and BE students of the Department of Electronics & Computer Science.',
      syllabus: evt.syllabus || '',
      rules: rulesText,
      timeline_image: evt.timeline_image || '',
      status: evt.status || 'upcoming',
      is_published: evt.is_published !== undefined ? Boolean(evt.is_published) : true,
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
    setFeedback(null)
  }

  const handleTogglePublish = async (evt) => {
    const slug = evt.slug || evt.id
    const newStatus = !evt.is_published

    try {
      const res = await fetch(`/api/events/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      })

      const data = await res.json()
      if (data.ok) {
        setEvents((prev) =>
          prev.map((item) => ((item.slug || item.id) === slug ? { ...item, is_published: newStatus } : item))
        )
        setFeedback({
          type: 'success',
          message: `Event "${evt.title}" is now ${newStatus ? 'Published (Live)' : 'Draft (Hidden from public)'}.`,
        })
      }
    } catch {
      alert('Failed to update publication status.')
    }
  }

  const handleDelete = async (slugOrId, title) => {
    if (!confirm(`Are you sure you want to permanently delete "${title || slugOrId}" from the events registry?`)) {
      return
    }

    try {
      const res = await fetch(`/api/events/${slugOrId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.ok) {
        setEvents((prev) => prev.filter((item) => (item.slug || item.id) !== slugOrId))
        if (editingId === slugOrId) {
          handleCancelEdit()
        }
        setFeedback({ type: 'success', message: `Event "${title || slugOrId}" removed.` })
      }
    } catch {
      alert('Failed to delete event.')
    }
  }

  return (
    <div className="space-y-12">
      {/* ==============================================================
          ADD / EDIT COMPREHENSIVE EVENT FORM
         ============================================================== */}
      <section className={`border rounded-xl p-6 sm:p-8 shadow-2xl transition-all ${
        editingId ? 'bg-[#141920] border-[#D94A5B] shadow-[0_0_30px_rgba(217,74,91,0.2)]' : 'bg-[#12161C] border-white/10'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-6">
          <div>
            <span className={`text-[11px] font-mono uppercase tracking-widest font-bold block ${
              editingId ? 'text-[#D94A5B] animate-pulse' : 'text-gray-400'
            }`}>
              {editingId ? `Editing Event: ${editingId}` : 'Create & Publish New Event'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display uppercase tracking-tight mt-0.5">
              {editingId ? `Edit Event: ${form.title || 'Untitled'}` : 'Event Publication Editor'}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-gray-200 transition-colors cursor-pointer self-start sm:self-center"
            >
              ✕ Exit Edit Mode
            </button>
          )}
        </div>

        {feedback && (
          <div
            className={`p-4 mb-6 text-xs font-mono rounded-lg border flex items-center justify-between gap-3 ${
              feedback.type === 'success'
                ? 'bg-green-950/50 border-green-700/60 text-green-300'
                : 'bg-red-950/50 border-red-700/60 text-red-300'
            }`}
          >
            <span>{feedback.message}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Section A: Core Identity */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D94A5B] font-bold">
              1. General Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Algorithm's Auction 2.0"
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                />
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                >
                  <option value="Competitive Coding">Competitive Coding</option>
                  <option value="Hardware & Robotics">Hardware &amp; Robotics</option>
                  <option value="Embedded Systems">Embedded Systems</option>
                  <option value="Hands-on Workshop">Hands-on Workshop</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Tech Talk">Tech Talk</option>
                </select>
              </div>
            </div>

            {/* Subtitle / Summary */}
            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Summary Tagline (Displayed on card headers)
              </label>
              <input
                type="text"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="e.g. VESIT's premier algorithmic problem-solving auction and sprint"
                className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
              />
            </div>
          </div>

          {/* Section B: Date, Time & Venue */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D94A5B] font-bold">
              2. Schedule &amp; Venue
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Display Date *
                </label>
                <input
                  type="text"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  placeholder="e.g. November 15, 2026"
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Time Schedule
                </label>
                <input
                  type="text"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  placeholder="e.g. 11:00 AM - 3:00 PM"
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Venue Location
                </label>
                <input
                  type="text"
                  name="venue"
                  value={form.venue}
                  onChange={handleChange}
                  placeholder="e.g. Lab 201 (IoTA), VESIT"
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                />
              </div>
            </div>
          </div>

          {/* Section C: Poster Artwork & Preview */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D94A5B] font-bold">
              3. Visual Poster Artwork (3:4 Ratio)
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Upload Poster Image File
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingPoster}
                      className="block w-full text-xs text-gray-400 file:mr-3 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#D94A5B] file:text-white hover:file:bg-[#e45a6b] cursor-pointer"
                    />
                    {uploadingPoster && (
                      <span className="text-xs font-mono text-[#D94A5B] animate-pulse flex-shrink-0">
                        Uploading file...
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Or Direct Poster URL
                  </label>
                  <input
                    type="text"
                    name="poster_url"
                    value={form.poster_url}
                    onChange={handleChange}
                    placeholder="/posters/algorithms-auction.jpg or https://..."
                    className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#D94A5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Google Form Registration URL
                  </label>
                  <input
                    type="url"
                    name="registration_url"
                    value={form.registration_url}
                    onChange={handleChange}
                    placeholder="https://forms.gle/..."
                    className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#D94A5B]"
                  />
                </div>
              </div>

              {/* 3:4 Poster Preview Box */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Poster Preview (3:4 Ratio)
                </span>
                <div className="w-full max-w-[190px] aspect-[3/4] bg-[#1B2026] border border-white/15 rounded-lg relative overflow-hidden flex items-center justify-center shadow-xl">
                  {form.poster_url ? (
                    <Image
                      src={form.poster_url}
                      alt="Poster live preview"
                      fill
                      unoptimized
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <span className="text-[11px] text-gray-500 text-center p-3 font-mono">
                      No poster uploaded yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section D: In-Depth Content & Description */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D94A5B] font-bold">
              4. Overview &amp; Specifications
            </h3>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Full Description / Event Overview *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed explanation of the format, competition rounds, and takeaways..."
                className="w-full px-4 py-3 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Eligibility &amp; Target Audience
                </label>
                <input
                  type="text"
                  name="eligibility"
                  value={form.eligibility}
                  onChange={handleChange}
                  placeholder="e.g. Open to FE, SE, TE, and BE students of ECS."
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Syllabus / Topics Covered
                </label>
                <input
                  type="text"
                  name="syllabus"
                  value={form.syllabus}
                  onChange={handleChange}
                  placeholder="e.g. Arrays, Strings, Sorting, Binary Search, Trees, DP"
                  className="w-full px-4 py-2.5 bg-[#1B2026] border border-white/15 rounded-lg text-white text-sm focus:outline-none focus:border-[#D94A5B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                Rules &amp; Guidelines (One rule per line)
              </label>
              <textarea
                name="rules"
                rows={4}
                value={form.rules}
                onChange={handleChange}
                placeholder="Teams of 2-3 members.&#10;Bring your college ID card.&#10;Only one laptop allowed during auction rounds."
                className="w-full px-4 py-3 bg-[#1B2026] border border-white/15 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#D94A5B]"
              />
            </div>
          </div>

          {/* Section E: Publication State & Submission */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-gray-200">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={form.is_published}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#D94A5B] rounded bg-[#1B2026] accent-[#D94A5B]"
                />
                <span className="font-semibold">Published (Live to public)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-mono text-gray-200">
                <span>Status:</span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="px-2.5 py-1.5 bg-[#1B2026] border border-white/15 rounded text-xs text-white"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past / Concluded</option>
                </select>
              </label>
            </div>

            <div className="flex items-center gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2.5 rounded-lg text-xs font-mono text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#D94A5B] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg hover:bg-[#e45a6b] transition-all disabled:opacity-50 cursor-pointer shadow-[0_2px_12px_rgba(217,74,91,0.35)]"
              >
                {isSubmitting
                  ? 'Saving...'
                  : editingId
                  ? 'Save Changes'
                  : 'Publish Event'}
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* ==============================================================
          ACTIVE EVENTS REGISTRY TABLE (EDIT / DELETE / VIEW)
         ============================================================== */}
      <section className="border border-white/10 bg-[#12161C] rounded-xl overflow-hidden shadow-2xl">
        <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white font-display uppercase tracking-tight">
              Events Docket ({events.length})
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-0.5">
              Click &quot;Edit&quot; on any event to update all fields in real-time
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {events.length === 0 ? (
            <p className="p-8 text-center text-gray-400 text-sm">
              No events found in registry.
            </p>
          ) : (
            events.map((evt) => {
              const id = evt.slug || evt.id
              const poster = evt.poster_url || evt.poster
              const isCurrentlyEditing = editingId === id

              return (
                <div
                  key={id}
                  className={`p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
                    isCurrentlyEditing ? 'bg-[#D94A5B]/10 border-l-4 border-l-[#D94A5B]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Poster thumbnail (3:4 aspect ratio) */}
                    <div className="w-14 aspect-[3/4] bg-[#1B2026] border border-white/15 rounded relative overflow-hidden flex-shrink-0 shadow-md">
                      {poster ? (
                        <Image
                          src={poster}
                          alt={evt.title}
                          fill
                          className="object-cover"
                          sizes="56px"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] font-mono text-gray-500">
                          No poster
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-gray-300">
                          {evt.category || 'Event'}
                        </span>

                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                            evt.status === 'upcoming'
                              ? 'bg-blue-950 text-blue-300 border border-blue-800'
                              : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          {evt.status === 'upcoming' ? 'Upcoming' : 'Past'}
                        </span>

                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                            evt.is_published
                              ? 'bg-green-950/80 text-green-300 border border-green-700/60'
                              : 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                          }`}
                        >
                          {evt.is_published ? '● Live' : '○ Draft'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white font-display uppercase tracking-tight truncate max-w-md">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {evt.date} {evt.venue && `· ${evt.venue}`}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 self-end md:self-center">
                    {/* View Live Page Link */}
                    {evt.slug && (
                      <Link
                        href={`/events/${evt.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-mono transition-colors"
                        title="Open live event page"
                      >
                        View ↗
                      </Link>
                    )}

                    {/* Quick Toggle Publish */}
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(evt)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer border ${
                        evt.is_published
                          ? 'border-amber-700/50 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60'
                          : 'border-green-700/50 bg-green-950/40 text-green-300 hover:bg-green-900/60'
                      }`}
                      title={evt.is_published ? 'Unpublish (make draft)' : 'Publish (make visible)'}
                    >
                      {evt.is_published ? 'Unpublish' : 'Publish'}
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => handleEdit(evt)}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                        isCurrentlyEditing
                          ? 'bg-[#D94A5B] text-white font-bold'
                          : 'bg-[#1B2026] hover:bg-[#252C35] text-white border border-white/15'
                      }`}
                    >
                      {isCurrentlyEditing ? 'Editing Now' : 'Edit'}
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(id, evt.title)}
                      className="px-3 py-1.5 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-mono transition-colors cursor-pointer"
                      title="Permanently delete event"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}
