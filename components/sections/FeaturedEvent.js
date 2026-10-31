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
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-space-sm">
          <span className="px-2 py-0.5 bg-brick text-paper font-complexity-notation text-[11px] uppercase tracking-wider font-bold">
            Imminent Conclave
          </span>
          <span className="font-label-smallcaps text-label-smallcaps uppercase text-muted tracking-widest font-bold">
            &bull; Next on the Calendar
          </span>
        </div>

        {/* Feature Card: 2px ink border with 6px solid offset brick-red shadow */}
        <div className="border-2 border-ink bg-card shadow-[6px_6px_0px_var(--brick)] relative">
          {/* Tan Information Bar */}
          <div className="border-b-2 border-ink bg-tan px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 font-complexity-notation text-complexity-notation text-ink font-semibold">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span className="font-bold">2nd - 3rd November 2026</span>
              <span className="text-ink/50">|</span>
              <span className="material-symbols-outlined text-[18px]">apartment</span>
              <span>2nd Floor, VESIT</span>
              <span className="text-ink/50">|</span>
              <span className="material-symbols-outlined text-[18px]">schedule</span>
              <span>1:00 pm - 3:30 pm</span>
            </div>
            <div className="font-complexity-notation text-xs uppercase px-2 py-0.5 border border-ink bg-paper text-ink font-bold">
              Upcoming Event
            </div>
          </div>

          <div className="p-6 lg:p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            {/* Poster / Visual side */}
            <div className="lg:col-span-5 flex flex-col justify-between border-2 border-ink bg-paper p-4 shadow-[3px_3px_0px_var(--ink)]">
              <div>
                <div className="relative w-full h-72 border-2 border-ink overflow-hidden mb-4 bg-card flex items-center justify-center">
                  <Image
                    src={algoEvent.poster}
                    alt="Algorithm's Auction Poster"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    onError={(e) => {
                      // fallback to logo or solid frame if poster not yet supplied by user
                      e.target.style.display = 'none'
                    }}
                  />
                  {/* Fallback Graphic Badge */}
                  <div className="p-6 text-center">
                    <span className="font-complexity-notation text-xs font-bold text-brick block uppercase tracking-widest mb-1">
                      Department Conclave
                    </span>
                    <span className="font-headline-sm text-headline-sm uppercase font-bold text-ink block">
                      Algorithm&apos;s Auction
                    </span>
                    <span className="font-title-editorial italic text-muted text-sm mt-2 block">
                      Every move is a strategy. Every bid is a gamble.
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-ink text-paper font-complexity-notation text-[10px] uppercase font-bold">
                    PL-2026-ECS
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="font-headline-sm text-headline-sm text-ink uppercase tracking-wide font-bold">
                    {algoEvent.title}
                  </p>
                  <p className="font-title-editorial text-title-editorial italic text-brick">
                    &ldquo;{algoEvent.posterLine}&rdquo;
                  </p>
                  <p className="font-complexity-notation text-complexity-notation text-ink tracking-wider pt-2 font-bold">
                    {algoEvent.shortLine}
                  </p>
                </div>
              </div>
            </div>

            {/* Details & Structure Side */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-space-md">
              <div className="space-y-space-sm">
                <div className="border-b-2 border-ink pb-3">
                  <h3 className="font-headline-md text-headline-md text-ink leading-tight font-bold mb-2">
                    {algoEvent.title}
                  </h3>
                  <p className="font-body-md text-body-md text-muted leading-relaxed">
                    {algoEvent.intro}
                  </p>
                </div>

                {/* Two-day structure with swallow-tail notched ribbons */}
                <div className="space-y-3 pt-2">
                  {/* Day 1 */}
                  <div className="border-2 border-ink bg-paper p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-brick text-paper font-label-smallcaps text-[13px] px-3 py-1 uppercase tracking-wider font-bold [clip-path:polygon(0_0,100%_0,90%_50%,100%_100%,0_100%)] pr-5">
                        {algoEvent.day1.label}
                      </div>
                      <span className="font-body-sm text-body-sm text-ink font-medium">
                        {algoEvent.day1.items.join(' • ')}
                      </span>
                    </div>
                    <span className="font-complexity-notation text-[11px] text-muted shrink-0 font-bold">
                      2ND FLOOR • 1:00 PM
                    </span>
                  </div>

                  {/* Day 2 */}
                  <div className="border-2 border-ink bg-paper p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="bg-brick text-paper font-label-smallcaps text-[13px] px-3 py-1 uppercase tracking-wider font-bold [clip-path:polygon(0_0,100%_0,90%_50%,100%_100%,0_100%)] pr-5">
                        {algoEvent.day2.label}
                      </div>
                      <span className="font-body-sm text-body-sm text-ink font-medium">
                        {algoEvent.day2.items.join(' • ')}
                      </span>
                    </div>
                    <span className="font-complexity-notation text-[11px] text-muted shrink-0 font-bold">
                      2ND FLOOR • 1:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Registration Action Strips */}
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
                    <span>Join WhatsApp Community</span>
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                  </a>
                </div>

                {/* Contact Registry Panel */}
                <div className="border border-ink bg-paper p-3">
                  <span className="font-label-smallcaps text-[11px] uppercase tracking-widest text-muted block mb-2 border-b border-ink/30 pb-1 font-bold">
                    Club Secretariat Contacts (Queries &amp; Registry)
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
