'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// SVG icons inline for zero dependencies
const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const ZoomIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default function EventsView({ initialEvents = [] }) {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [lightboxPoster, setLightboxPoster] = useState(null)

  const displayedEvents = useMemo(() => {
    return initialEvents.filter((e) => (e.status || 'upcoming') === activeTab)
  }, [initialEvents, activeTab])

  return (
    <div className="min-h-screen bg-[#0D1014] text-[#EFF0F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ==============================================================
            PAGE HEADER: Clean academic & engineering identity (Carbon & Crimson)
           ============================================================== */}
        <header className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400">
            <span>Department of Electronics &amp; Computer Science</span>
            <span>·</span>
            <span>VESIT</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-display">
            Events
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
            Technical tournaments, hands-on workshops, and exhibitions organized by the
            Department of Electronics &amp; Computer Science, VESIT.
          </p>
        </header>

        {/* ==============================================================
            TAB SWITCHER: Upcoming vs Past
           ============================================================== */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-lg inline-flex mb-8">
          {['upcoming', 'past'].map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer capitalize ${
                  isActive ? 'text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="events-active-pill"
                    className="absolute inset-0 bg-white rounded-md z-0 shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="relative z-10">
                  {tab === 'upcoming' ? 'Upcoming' : 'Past'}
                </span>
              </button>
            )
          })}
        </div>

        {/* ==============================================================
            EVENTS GRID: Minimal 3:4 Poster-First Layout
           ============================================================== */}
        <AnimatePresence mode="wait">
          {displayedEvents.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {displayedEvents.map((event) => {
                const poster = event.poster_url || event.poster
                const hasPoster = Boolean(poster)
                const isUpcoming = event.status === 'upcoming'
                const slug = event.slug || event.id

                return (
                  <article
                    key={slug}
                    className="group bg-[#12161C] border border-white/10 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:border-white/25 hover:-translate-y-1 shadow-lg"
                  >
                    {/* Poster Area: 3:4 aspect ratio tailored for graphics team artwork */}
                    <div className="relative w-full aspect-[3/4] bg-[#1B2026] overflow-hidden">
                      {hasPoster ? (
                        <>
                          <Image
                            src={poster}
                            alt={`${event.title} official poster`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                          />

                          {/* Zoom poster button on hover */}
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxPoster({
                                src: poster,
                                title: event.title,
                                date: event.date,
                              })
                            }
                            aria-label="Enlarge poster"
                            className="absolute bottom-3 right-3 p-2 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black"
                          >
                            <ZoomIcon />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-6 text-center text-gray-500 font-mono text-xs">
                          <span>Poster coming soon</span>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="px-2.5 py-1 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md text-gray-200 border border-white/15">
                          {event.category || 'Event'}
                        </span>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isUpcoming
                              ? 'bg-[#D94A5B] text-white shadow-sm'
                              : 'bg-white/20 text-gray-300 backdrop-blur-md'
                          }`}
                        >
                          {isUpcoming ? 'Registration Open' : 'Concluded'}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                      <div className="space-y-3">
                        <Link href={`/events/${slug}`}>
                          <h2 className="text-lg font-bold text-white group-hover:text-[#D94A5B] transition-colors leading-snug">
                            {event.title}
                          </h2>
                        </Link>

                        <div className="flex flex-col gap-1.5 text-xs text-gray-400 font-mono">
                          <div className="flex items-center gap-2">
                            <CalendarIcon />
                            <span>{event.date}</span>
                          </div>
                          {event.time && (
                            <div className="flex items-center gap-2">
                              <ClockIcon />
                              <span>{event.time}</span>
                            </div>
                          )}
                          {event.venue && (
                            <div className="flex items-center gap-2">
                              <LocationIcon />
                              <span>{event.venue}</span>
                            </div>
                          )}
                        </div>

                        {event.summary && (
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {event.summary}
                          </p>
                        )}
                      </div>

                      {/* Action CTA */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <Link
                          href={`/events/${slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#D94A5B] transition-colors"
                        >
                          <span>Event details</span>
                          <ArrowRightIcon />
                        </Link>

                        {isUpcoming && event.registration_url && (
                          <a
                            href={event.registration_url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white text-[11px] font-mono font-semibold transition-colors"
                          >
                            Register ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </motion.div>
          ) : (
            <motion.div
              key={`${activeTab}-empty`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 px-6 text-center border border-dashed border-white/15 rounded-xl text-gray-400"
            >
              <p className="text-sm font-semibold text-gray-300">
                {activeTab === 'upcoming'
                  ? 'No upcoming events scheduled yet.'
                  : 'No past events in archive.'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Posters and announcements will appear as soon as the council publishes them.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==============================================================
          LIGHTBOX MODAL: Inspect Graphics Team Posters in Full Resolution
         ============================================================== */}
      <AnimatePresence>
        {lightboxPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxPoster(null)}
          >
            <div
              className="relative max-w-lg w-full bg-[#12161C] border border-white/20 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{lightboxPoster.title}</h3>
                  <span className="text-[11px] font-mono text-gray-400">{lightboxPoster.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxPoster(null)}
                  className="p-1 rounded text-gray-400 hover:text-white cursor-pointer"
                  aria-label="Close modal"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="relative w-full aspect-[3/4] bg-black">
                <Image
                  src={lightboxPoster.src}
                  alt={lightboxPoster.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 600px) 100vw, 500px"
                />
              </div>

              <div className="p-3 bg-black/40 text-center border-t border-white/10">
                <span className="text-[11px] font-mono text-gray-400">
                  Official artwork by FluxECS Graphics Team
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
