'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// Clean SVG Icons
const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const ZoomIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function EventDetailClient({ event }) {
  const [zoomPoster, setZoomPoster] = useState(false)
  const [activePhoto, setActivePhoto] = useState(null)

  const isUpcoming = event.status === 'upcoming'
  const hasPoster = Boolean(event.poster_url || event.poster)
  const posterSrc = event.poster_url || event.poster || ''

  return (
    <article className="min-h-screen bg-transparent text-[#EFF0F2] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Top Header & Status */}
        <header className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded text-xs font-mono font-semibold uppercase tracking-wider bg-white/5 border border-white/15 text-gray-300">
              {event.category || 'Event'}
            </span>
            <span
              className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider ${
                isUpcoming
                  ? 'bg-[#D94A5B] text-white shadow-[0_0_12px_rgba(217,74,91,0.4)]'
                  : 'bg-white/15 text-gray-300'
              }`}
            >
              {isUpcoming ? 'Registration Open' : 'Concluded Session'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display leading-tight">
            {event.title}
          </h1>

          {event.summary && (
            <p className="text-lg sm:text-xl text-gray-300 font-light max-w-3xl">
              {event.summary}
            </p>
          )}
        </header>

        {/* Main Grid: Poster + Essential Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Poster Column: Authentic 3:4 Aspect Ratio */}
          <div className="lg:col-span-5 space-y-3">
            <div
              className="relative w-full aspect-[3/4] bg-[#1B2026] border border-white/10 rounded-xl overflow-hidden cursor-pointer group shadow-2xl"
              onClick={() => hasPoster && setZoomPoster(true)}
            >
              {hasPoster ? (
                <>
                  <Image
                    src={posterSrc}
                    alt={`${event.title} official poster`}
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 transition-opacity">
                      <ZoomIcon />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-xs">
                  <span>Poster coming soon</span>
                </div>
              )}
            </div>

            {hasPoster && (
              <p className="text-[11px] font-mono text-gray-400 text-center">
                Official poster by FluxECS Graphics Team · Click to expand
              </p>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quick Facts Card */}
            <div className="p-5 bg-[#1B2026] border border-white/10 rounded-xl space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-200">
                <span className="text-[#D94A5B]">
                  <CalendarIcon />
                </span>
                <span className="font-semibold text-white">Date:</span>
                <span className="font-mono text-gray-300">{event.date}</span>
              </div>

              {event.time && (
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="text-[#D94A5B]">
                    <ClockIcon />
                  </span>
                  <span className="font-semibold text-white">Schedule:</span>
                  <span className="font-mono text-gray-300">{event.time}</span>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="text-[#D94A5B]">
                    <LocationIcon />
                  </span>
                  <span className="font-semibold text-white">Venue:</span>
                  <span className="font-mono text-gray-300">{event.venue}</span>
                </div>
              )}
            </div>

            {/* Overview Content */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-[#D94A5B] font-bold">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Registration Action */}
            {isUpcoming && event.registration_url && (
              <div className="pt-2">
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D94A5B] text-white font-semibold text-sm rounded-lg hover:bg-[#e45a6b] transition-all shadow-[0_4px_16px_rgba(217,74,91,0.3)]"
                >
                  <span>Register on Google Form ↗</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Schedule & Rules (Algorithm's Auction specific real details) */}
        {event.timeline_image && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Schedule Breakdown
            </h2>
            <div
              className="relative w-full aspect-[16/9] max-w-3xl bg-[#1B2026] border border-white/10 rounded-xl overflow-hidden cursor-pointer group shadow-lg"
              onClick={() => setActivePhoto({ src: event.timeline_image, label: 'Official Schedule Timeline' })}
            >
              <Image
                src={event.timeline_image}
                alt="Schedule breakdown"
                fill
                className="object-contain group-hover:scale-[1.01] transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                <span className="opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-full border border-white/20">
                  Expand Timeline
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Rules & Guidelines */}
        {((Array.isArray(event.rules) && event.rules.length > 0) || (typeof event.rules === 'string' && event.rules)) && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Rules &amp; Guidelines
            </h2>
            <ul className="space-y-2.5 bg-[#1B2026] border border-white/10 p-5 rounded-xl">
              {(Array.isArray(event.rules) ? event.rules : [event.rules]).map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D94A5B] mt-2 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Eligibility & Syllabus */}
        {(event.syllabus || event.eligibility) && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {event.eligibility && (
                <div className="p-5 bg-[#1B2026] border border-white/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D94A5B]">
                    Eligibility
                  </span>
                  <h3 className="text-base font-bold text-white font-display">Target Audience</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{event.eligibility}</p>
                </div>
              )}
              {event.syllabus && (
                <div className="p-5 bg-[#1B2026] border border-white/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D94A5B]">
                    Curriculum
                  </span>
                  <h3 className="text-base font-bold text-white font-display">Topics &amp; Syllabus</h3>
                  {Array.isArray(event.syllabus) ? (
                    <div className="space-y-2.5 mt-2">
                      {event.syllabus.map((s, idx) => (
                        <div key={idx} className="text-xs">
                          {typeof s === 'object' && s !== null ? (
                            <>
                              <span className="font-bold text-white block">{s.topic || s.title}</span>
                              <span className="text-gray-400">{s.desc || s.description}</span>
                            </>
                          ) : (
                            <span className="text-gray-300">{String(s)}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-300 leading-relaxed">{event.syllabus}</p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Bidding Rules if available */}
        {event.bidding_rules && event.bidding_rules.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Tournament Rules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.bidding_rules.map((rule) => (
                <div key={rule.badge} className="p-5 bg-[#1B2026] border border-white/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D94A5B]">
                    {rule.badge}
                  </span>
                  <h3 className="text-base font-bold text-white">{rule.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{rule.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Labs Demonstration (IoTA Archives) */}
        {event.labs && event.labs.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Exhibition Labs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {event.labs.map((lab) => (
                <div key={lab.id} className="p-5 bg-[#1B2026] border border-white/10 rounded-xl space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D94A5B] font-bold">
                    {lab.label}
                  </span>
                  <h3 className="text-base font-bold text-white">{lab.focus}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{lab.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Authentic Photo Gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Exhibition Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {event.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] bg-[#1B2026] border border-white/10 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setActivePhoto(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.label || 'Exhibition photo'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-2.5">
                    <span className="text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity line-clamp-1">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Student Coordinators */}
        {event.contacts && event.contacts.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-white/10">
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-display">
              Student Coordinators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {event.contacts.map((c) => (
                <div key={c.name} className="p-4 bg-[#1B2026] border border-white/10 rounded-lg space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#D94A5B] font-bold block">
                    {c.role}
                  </span>
                  <div className="text-sm font-bold text-white">{c.name}</div>
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, '')}`}
                    className="text-xs font-mono text-gray-400 hover:text-white block pt-1"
                  >
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal: Enlarge Official Poster */}
      <AnimatePresence>
        {zoomPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setZoomPoster(false)}
          >
            <div
              className="relative max-w-xl w-full bg-[#12161C] border border-white/20 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{event.title}</h3>
                  <span className="text-[11px] font-mono text-gray-400">{event.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setZoomPoster(false)}
                  className="p-1 rounded text-gray-400 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="relative w-full aspect-[3/4] bg-black">
                <Image
                  src={posterSrc}
                  alt={event.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 600px) 100vw, 550px"
                />
              </div>

              <div className="p-3 bg-black/40 text-center border-t border-white/10">
                <span className="text-[11px] font-mono text-gray-400">
                  Official poster by FluxECS Graphics Team
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal: Enlarge Gallery or Timeline Image */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#12161C] border border-white/20 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{activePhoto.label}</h3>
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="p-1 rounded text-gray-400 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="relative w-full aspect-[16/9] bg-black">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.label || 'Expanded view'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 900px) 100vw, 800px"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}
