'use client'

import Image from 'next/image'
import { events } from '@/data/events'
import { WHATSAPP_URL } from '@/data/site'

export default function FeaturedEvent() {
  const algoEvent = events.find((e) => e.slug === 'algorithms-auction') || events[0]

  return (
    <section
      className="w-full bg-card border-b-2 border-ink py-space-xl px-4 lg:px-margin"
      id="featured-event"
    >
      <div className="max-w-7xl mx-auto">
        {/* Simple heading with handwritten label */}
        <div className="mb-space-sm">
          <span className="handwritten-eyebrow text-2xl sm:text-3xl font-bold text-brick mb-1">
            Mark your calendar
          </span>
          <h2 className="font-headline-lg text-headline-lg text-ink font-bold">
            Upcoming: Algorithm&apos;s Auction
          </h2>
        </div>

        {/* Feature Card: 2px ink border with offset brick shadow */}
        <div className="border-2 border-ink bg-card shadow-[6px_6px_0px_var(--brick)] relative">
          {/* Tan info bar with real facts only */}
          <div className="border-b-2 border-ink bg-tan px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 font-complexity-notation text-complexity-notation text-ink font-semibold">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span className="font-bold">2nd – 3rd November 2026</span>
              <span className="text-ink/50">|</span>
              <span className="material-symbols-outlined text-[18px]">apartment</span>
              <span>2nd Floor, VESIT</span>
              <span className="text-ink/50">|</span>
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>1:00 pm – 3:30 pm</span>
            </div>
            <span className="px-2.5 py-0.5 bg-brick text-paper font-complexity-notation text-[11px] uppercase tracking-wider font-bold">
              Upcoming
            </span>
          </div>

          <div className="p-6 lg:p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Poster — large and slightly rotated */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div
                className="relative border-2 border-ink overflow-hidden bg-card shadow-lg w-full"
                style={{ transform: 'rotate(-1.5deg)', maxWidth: '380px' }}
              >
                <div className="relative w-full aspect-[698/428] bg-tan">
                  <Image
                    src={algoEvent.poster}
                    alt="Algorithm's Auction official poster"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="px-4 py-3 bg-paper border-t-2 border-ink text-center">
                  <p className="font-handwritten text-xl text-brick">
                    &ldquo;{algoEvent.posterLine}&rdquo;
                  </p>
                </div>
              </div>
              <span className="font-complexity-notation text-xs text-muted mt-3 text-center">
                Think. Bid. Solve. Win.
              </span>
            </div>

            {/* Details Side */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <p className="font-body-md text-body-md text-ink leading-relaxed">
                  {algoEvent.intro}
                </p>

                {/* Day breakdown */}
                <div className="space-y-3 pt-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-ink/20 pb-3">
                    <div
                      className="bg-brick text-paper font-label-smallcaps text-[13px] px-3 py-1 uppercase tracking-wider font-bold shrink-0"
                      style={{ clipPath: 'polygon(0 0,100% 0,90% 50%,100% 100%,0 100%)', paddingRight: '1.2rem' }}
                    >
                      {algoEvent.day1.label}
                    </div>
                    <span className="font-body-sm text-body-sm text-ink">{algoEvent.day1.items.join(' · ')}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div
                      className="bg-brick text-paper font-label-smallcaps text-[13px] px-3 py-1 uppercase tracking-wider font-bold shrink-0"
                      style={{ clipPath: 'polygon(0 0,100% 0,90% 50%,100% 100%,0 100%)', paddingRight: '1.2rem' }}
                    >
                      {algoEvent.day2.label}
                    </div>
                    <span className="font-body-sm text-body-sm text-ink">{algoEvent.day2.items.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 border-t-2 border-ink space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold"
                    href={algoEvent.registerUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Register via Google Form</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-ink bg-tan text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold"
                    href={WHATSAPP_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Join WhatsApp Group</span>
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                  </a>
                </div>

                {/* Contact info — real facts */}
                <div className="border border-ink/30 bg-paper p-3">
                  <span className="font-label-smallcaps text-[11px] uppercase tracking-widest text-muted block mb-2 font-bold">
                    Got questions? Reach out to council leads:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 font-complexity-notation text-xs text-ink">
                    {algoEvent.contacts.map((c) => (
                      <div key={c.name}>
                        {c.name} <span className="text-muted">({c.role}):</span>{' '}
                        <span className="font-bold">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
