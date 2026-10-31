'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { events } from '@/data/events'
import { WHATSAPP_URL } from '@/data/site'

export default function EventsView() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get('tab') === 'past' ? 'past' : 'upcoming'
  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'past' || tab === 'upcoming') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const algo = events.find((e) => e.slug === 'algorithms-auction') || events[0]
  const iota = events.find((e) => e.slug === 'iota-archives') || events[1]

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: EDITORIAL HEADER & ARCHIVAL MASTHEAD */}
      <section className="w-full px-4 lg:px-margin pt-space-md pb-space-lg">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between pb-space-sm border-b-2 border-ink gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-ink text-paper font-complexity-notation text-complexity-notation tracking-widest uppercase font-bold">
              DOC. REF &sect; EVT-2026
            </span>
            <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted">
              Curated Registry of Proceedings
            </span>
          </div>
          <div className="font-complexity-notation text-[12px] text-ink tracking-widest uppercase flex items-center gap-2 font-bold">
            <span className="inline-block w-2 h-2 bg-brick"></span>
            <span>SESSION 2026 &bull; VOL. IV</span>
          </div>
        </div>

        {/* Editorial Typography Title Block */}
        <div className="pt-space-md pb-space-sm grid grid-cols-1 lg:grid-cols-12 gap-gutter items-baseline">
          <div className="lg:col-span-8 space-y-2">
            <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-brick block font-bold">
              Departmental Public Program
            </span>
            <h1 className="font-headline-lg text-headline-lg tracking-tight text-ink font-bold">
              Events &amp; Exhibitions
            </h1>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="font-title-editorial text-title-editorial italic text-muted leading-snug">
              Competitive hackathons, algorithmic auctions, and hands-on hardware showcases at VESIT ECS.
            </p>
          </div>
        </div>

        {/* Triple-rule Broadsheet Divider with Center Glyph */}
        <div className="relative py-4 flex items-center justify-center">
          <div className="w-full border-t-2 border-ink"></div>
          <div className="absolute px-4 bg-paper flex items-center gap-2 text-brick font-complexity-notation text-xs uppercase tracking-widest font-bold">
            <span>&sect;</span>
            <span className="font-label-smallcaps text-label-smallcaps text-ink">
              CATALOGUE CHRONOLOGY
            </span>
            <span>&sect;</span>
          </div>
        </div>

        {/* Docket Selector Bar */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-tan border-2 border-ink shadow-[4px_4px_0px_var(--ink)]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-ink">filter_list</span>
            <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink tracking-wider font-bold">
              Docket Selector:
            </span>
          </div>
          <div className="inline-flex p-1 bg-paper border-2 border-ink rounded-sm gap-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-1.5 font-label-smallcaps text-label-smallcaps uppercase transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-ink text-paper shadow-[2px_2px_0px_var(--brick)] font-bold'
                  : 'text-ink hover:bg-tan'
              }`}
            >
              Upcoming Docket (1)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('past')}
              className={`px-5 py-1.5 font-label-smallcaps text-label-smallcaps uppercase transition-all cursor-pointer ${
                activeTab === 'past'
                  ? 'bg-ink text-paper shadow-[2px_2px_0px_var(--brick)] font-bold'
                  : 'text-ink hover:bg-tan'
              }`}
            >
              Archived Exhibits (1)
            </button>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENT VIEW */}
      {activeTab === 'upcoming' && (
        <div className="w-full px-4 lg:px-margin pb-space-xl flex flex-col space-y-space-lg">
          <article className="relative bg-card border-2 border-ink rounded-[14px] shadow-[6px_6px_0px_var(--brick)] overflow-hidden">
            {/* Top Bar Ribbon Layer */}
            <div className="border-b-2 border-ink bg-paper px-6 py-4 flex flex-wrap items-center justify-between gap-4 relative">
              <div className="flex items-center gap-3">
                <span className="font-complexity-notation text-[11px] px-2 py-0.5 bg-brick text-paper tracking-wider uppercase font-bold">
                  Active Dispatch
                </span>
                <span className="font-complexity-notation text-[12px] tracking-wider uppercase text-ink font-semibold">
                  {algo.presentedBy}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-complexity-notation text-[11px] text-muted uppercase">
                  Classification:
                </span>
                <span className="font-complexity-notation text-complexity-notation font-bold px-2 py-0.5 border border-ink bg-paper text-brick">
                  O(log N) Strategy
                </span>
              </div>
            </div>

            {/* Poster Image Frame */}
            <div className="p-6 md:p-8 border-b-2 border-ink bg-paper">
              <div className="relative w-full h-80 sm:h-96 border-2 border-ink overflow-hidden bg-card flex items-center justify-center">
                <Image
                  src={algo.poster}
                  alt="Algorithm's Auction Official Poster"
                  fill
                  priority
                  className="object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="p-8 text-center">
                  <span className="font-complexity-notation text-sm font-bold text-brick uppercase tracking-widest block mb-2">
                    Department of ECS &bull; VESIT
                  </span>
                  <span className="font-headline-lg text-headline-lg uppercase font-bold text-ink block">
                    {algo.title}
                  </span>
                  <span className="font-title-editorial italic text-muted text-lg mt-2 block">
                    {algo.posterLine}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Headline Block with Poster Slogan */}
            <div className="p-6 md:p-10 space-y-6">
              <div className="space-y-3">
                <div className="inline-block border-b-2 border-brick pb-1">
                  <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-[0.2em] text-brick font-bold">
                    Premier Intellectual Tournament
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg tracking-tight text-ink leading-none font-bold">
                  {algo.title}
                </h2>
                <p className="font-title-editorial text-title-editorial text-brick italic font-medium">
                  &ldquo;{algo.posterLine}&rdquo;
                </p>
              </div>

              {/* Callout Punch-line Banner */}
              <div className="p-4 bg-paper border-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border-2 border-ink bg-brick text-paper flex items-center justify-center font-complexity-notation text-sm font-bold">
                    &Delta;
                  </span>
                  <span className="font-headline-sm text-headline-sm uppercase tracking-wide text-ink font-bold">
                    {algo.shortLine}
                  </span>
                </div>
                <span className="font-complexity-notation text-[11px] tracking-wider uppercase text-muted font-bold">
                  Specially Curated Across All Years
                </span>
              </div>

              {/* Editorial Intro Passage */}
              <div className="max-w-4xl">
                <p className="font-body-lg text-body-lg text-ink leading-relaxed">
                  {algo.intro}
                </p>
              </div>

              {/* Tan Information Ledger Strip */}
              <div className="w-full bg-tan border-2 border-ink p-4 flex flex-col md:flex-row md:items-center justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink text-ink">
                <div className="pb-3 md:pb-0 md:pr-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">
                      Scheduled Dates
                    </span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">
                      2nd – 3rd November 2026
                    </span>
                  </div>
                </div>
                <div className="py-3 md:py-0 md:px-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">
                      Assembly Quarter
                    </span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">
                      2nd Floor, VESIT
                    </span>
                  </div>
                </div>
                <div className="pt-3 md:pt-0 md:pl-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">schedule</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">
                      Operating Window
                    </span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">
                      1:00 pm – 3:30 pm IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Two Structural Program Panels (Day 1 & Day 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-space-sm">
                {/* Day 1 Panel */}
                <div className="relative bg-paper border-2 border-ink p-6 pt-10 shadow-[4px_4px_0px_var(--ink)] flex flex-col justify-between">
                  <div
                    className="absolute -top-3 left-4 px-4 py-1 bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[2px_2px_0px_var(--ink)] font-bold"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)',
                      paddingRight: '1.5rem',
                    }}
                  >
                    Day 1: Curriculum
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-ink pb-2">
                      <h3 className="font-headline-sm text-headline-sm text-ink font-bold">
                        {algo.day1.label}
                      </h3>
                      <span className="font-body-sm text-body-sm italic text-muted">
                        {algo.day1.date}
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-body-md text-body-md text-ink">
                      {algo.day1.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="font-complexity-notation text-brick text-xs mt-1 font-bold">
                            &sect;
                          </span>
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-3 border-t border-ink/30 flex items-center justify-between text-muted font-complexity-notation text-[11px] uppercase font-bold">
                    <span>VENUE: 2ND FLOOR</span>
                    <span>TIME: 1:00 PM – 3:30 PM</span>
                  </div>
                </div>

                {/* Day 2 Panel */}
                <div className="relative bg-paper border-2 border-ink p-6 pt-10 shadow-[4px_4px_0px_var(--ink)] flex flex-col justify-between">
                  <div
                    className="absolute -top-3 left-4 px-4 py-1 bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[2px_2px_0px_var(--ink)] font-bold"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)',
                      paddingRight: '1.5rem',
                    }}
                  >
                    Day 2: Live Tournament Floor
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-ink pb-2">
                      <h3 className="font-headline-sm text-headline-sm text-ink font-bold">
                        {algo.day2.label}
                      </h3>
                      <span className="font-body-sm text-body-sm italic text-muted">
                        {algo.day2.date}
                      </span>
                    </div>
                    <ul className="space-y-2.5 font-body-md text-body-md text-ink">
                      {algo.day2.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="font-complexity-notation text-brick text-xs mt-1 font-bold">
                            &sect;
                          </span>
                          <span className="font-semibold">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-3 border-t border-ink/30 flex items-center justify-between text-muted font-complexity-notation text-[11px] uppercase font-bold">
                    <span>VENUE: 2ND FLOOR</span>
                    <span>TIME: 1:00 PM – 3:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Dividends & Academic Yields Module */}
              <div className="border-2 border-ink bg-paper p-6 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                  <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink font-bold">
                    Dividends &amp; Academic Yields (&ldquo;What&apos;s in it for you&rdquo;)
                  </h3>
                  <span className="font-complexity-notation text-[11px] uppercase text-brick font-bold">
                    Charter &sect; ECS-BOND
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {algo.whatsInItForYou.map((benefit, idx) => (
                    <div key={benefit} className="p-3 bg-card border border-ink">
                      <span className="font-complexity-notation text-xs text-brick font-bold block mb-1">
                        0{idx + 1} / BENEFIT
                      </span>
                      <p className="font-body-sm text-body-sm text-ink">{benefit}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-tan border border-ink flex items-center gap-3">
                  <span className="material-symbols-outlined text-brick text-[20px]">info</span>
                  <p className="font-body-sm text-body-sm text-ink italic">
                    <strong>Nota Bene:</strong> &ldquo;{algo.note}&rdquo;
                  </p>
                </div>
              </div>

              {/* Closing Punchline & Registration CTA Bar */}
              <div className="bg-ink text-paper p-6 border-2 border-ink flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[4px_4px_0px_var(--brick)]">
                <div className="space-y-1">
                  <span className="font-complexity-notation text-[11px] text-tan uppercase tracking-widest">
                    Imperial Mandate:
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-paper italic">
                    &ldquo;{algo.closing}&rdquo;
                  </h4>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider border-2 border-paper shadow-[4px_4px_0px_var(--paper)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold"
                    href={algo.registerUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Register on Google Form</span>
                    <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 px-5 py-3 bg-paper text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_var(--tan)] hover:bg-tan hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold"
                    href={WHATSAPP_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Join WhatsApp Group</span>
                    <span className="material-symbols-outlined text-[18px]">forum</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contacts Dispatch Desk */}
            <div className="border-t-2 border-ink bg-paper p-6 md:p-8">
              <div className="mb-4 flex items-center justify-between border-b border-ink pb-2">
                <h4 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink font-bold">
                  Council Inquiries &amp; Stewards on Duty
                </h4>
                <span className="font-complexity-notation text-[11px] text-muted uppercase">
                  Dept Secretariat Hotlines
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {algo.contacts.map((c) => (
                  <div key={c.name} className="bg-card border-2 border-ink p-3.5 shadow-[3px_3px_0px_var(--ink)]">
                    <span className="font-complexity-notation text-[10px] text-brick tracking-wider uppercase block font-bold">
                      {c.role}
                    </span>
                    <div className="font-headline-sm text-base text-ink font-bold">
                      {c.name}
                    </div>
                    <a
                      className="font-complexity-notation text-xs text-ink hover:text-brick mt-1 block font-bold"
                      href={`tel:${c.phone.replace(/\s+/g, '')}`}
                    >
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}

      {/* PAST EVENT / EXHIBITION VIEW */}
      {activeTab === 'past' && (
        <div className="w-full px-4 lg:px-margin pb-space-xl flex flex-col space-y-space-lg">
          <article className="relative bg-card border-2 border-ink rounded-[14px] shadow-[6px_6px_0px_var(--brick)] overflow-hidden">
            {/* Archival Header Ribbon */}
            <div className="border-b-2 border-ink bg-paper px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-complexity-notation text-[11px] px-2 py-0.5 bg-ink text-paper tracking-wider uppercase font-bold">
                  Archived Exhibition
                </span>
                <span className="font-complexity-notation text-[12px] tracking-wider uppercase text-ink font-semibold">
                  First Year (FE) Induction Program &bull; VESIT ECS
                </span>
              </div>
              <div className="font-complexity-notation text-complexity-notation text-muted uppercase font-bold">
                Status: Concluded &amp; Filed
              </div>
            </div>

            {/* Cover photo from /public/photos */}
            <div className="p-6 md:p-8 border-b-2 border-ink bg-paper">
              <div className="relative w-full h-80 sm:h-96 border-2 border-ink overflow-hidden bg-tan">
                <Image
                  src={iota.cover}
                  alt="IoTA Archives Induction Exhibition 2026"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="p-6 md:p-10 space-y-6">
              <div className="space-y-2">
                <div className="inline-block border-b-2 border-brick pb-1">
                  <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-[0.2em] text-brick font-bold">
                    Tri-Laboratory Demonstration Exposition
                  </span>
                </div>
                <h2 className="font-headline-lg text-headline-lg tracking-tight text-ink font-bold">
                  {iota.title}
                </h2>
                <p className="font-title-editorial text-title-editorial text-muted italic">
                  {iota.shortLine}
                </p>
              </div>

              {/* Tan Archival Metadata Ribbon */}
              <div className="w-full bg-tan border-2 border-ink p-4 flex flex-col md:flex-row md:items-center justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink text-ink">
                <div className="pb-3 md:pb-0 md:pr-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">event_available</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">
                      Execution Date
                    </span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">
                      7th September 2026
                    </span>
                  </div>
                </div>
                <div className="py-3 md:py-0 md:px-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">domain</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">
                      Physical Quarters
                    </span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">
                      {iota.venue}
                    </span>
                  </div>
                </div>
                <div className="pt-3 md:pt-0 md:pl-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">groups</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">
                      Attendee Scope
                    </span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">
                      FE Inductees + ECS Cohort
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Prose */}
              <div className="border-l-4 border-brick pl-4 py-1">
                <p className="font-body-lg text-body-lg text-ink leading-relaxed">
                  {iota.intro}
                </p>
              </div>

              {/* Project Breakdown Across the 3 Labs (Derived cleanly from markdown write-up) */}
              <div className="space-y-3 pt-2">
                <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink border-b border-ink pb-1 font-bold">
                  Laboratory Layout &amp; Project Demarcations
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                  {iota.labs.map((lab) => (
                    <div
                      key={lab.id}
                      className="bg-paper border-2 border-ink p-5 shadow-[4px_4px_0px_var(--ink)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-ink pb-2 mb-3">
                          <span className="px-2 py-0.5 bg-brick text-paper font-complexity-notation text-[11px] font-bold">
                            {lab.label}
                          </span>
                          <span className="font-complexity-notation text-[11px] text-muted uppercase">
                            {lab.focus}
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-xl text-ink font-bold mb-2">
                          {lab.label} — {lab.focus}
                        </h4>
                        <p className="font-body-sm text-body-sm text-muted mb-4 leading-relaxed">
                          {lab.description}
                        </p>
                        <ul className="space-y-2 font-body-sm text-body-sm text-ink">
                          {lab.projects.map((proj) => (
                            <li key={proj} className="flex items-start gap-2">
                              <span className="font-complexity-notation text-brick text-xs mt-0.5 font-bold">
                                &bull;
                              </span>
                              <span>{proj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 pt-3 border-t border-ink/30 font-complexity-notation text-[11px] text-brick font-bold uppercase">
                        &sect; Domain: {lab.focus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Archival Photo Gallery with Lab Badges & Captions */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between border-b border-ink pb-1">
                  <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink font-bold">
                    Photographic Folio &amp; Physical Evidence
                  </h3>
                  <span className="font-complexity-notation text-[11px] uppercase text-muted font-bold">
                    Archival Plates 01 – 03
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  {iota.gallery.map((item, idx) => (
                    <figure
                      key={item.src}
                      className="bg-paper border-2 border-ink p-3 shadow-[4px_4px_0px_var(--ink)] space-y-3"
                    >
                      <div className="relative w-full h-56 border border-ink overflow-hidden bg-tan">
                        <Image
                          src={item.src}
                          alt={`${item.label} exhibition photograph`}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-brick text-paper font-complexity-notation text-[10px] tracking-wider uppercase font-bold border border-ink">
                          {item.label} Plate
                        </span>
                      </div>
                      <figcaption className="space-y-1">
                        <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick block font-bold">
                          Plate 0{idx + 1}: {item.label}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              {/* Council Lead Credits Box */}
              <div className="border-2 border-ink bg-paper p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-ink pb-2">
                  <h4 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink font-bold">
                    Exhibition Governance &amp; Council Lead Credits
                  </h4>
                  <span className="font-complexity-notation text-[11px] uppercase text-muted font-bold">
                    Authenticated Roll
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border-2 border-ink p-4">
                    <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block mb-1">
                      Faculty Stewardship
                    </span>
                    <div className="font-headline-sm text-lg text-ink font-bold">
                      Yogesh Pandit Sir
                    </div>
                    <p className="font-body-sm text-body-sm text-muted mt-1">
                      Council In-charge, Dept. of Electronics &amp; Computer Science, VESIT.
                    </p>
                  </div>
                  <div className="bg-card border-2 border-ink p-4">
                    <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block mb-1">
                      Executive Leadership
                    </span>
                    <div className="font-headline-sm text-lg text-ink font-bold">
                      Harsh
                    </div>
                    <p className="font-body-sm text-body-sm text-muted mt-1">
                      President, FLUX-ECS Council.
                    </p>
                  </div>
                  <div className="bg-card border-2 border-ink p-4">
                    <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block mb-1">
                      Project Teams &amp; Volunteers
                    </span>
                    <div className="font-headline-sm text-lg text-ink font-bold">
                      Participating Teams
                    </div>
                    <p className="font-body-sm text-body-sm text-muted mt-1">
                      Participating project teams and volunteers across senior cohorts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Register Sign-Off Strip */}
            <div className="border-t-2 border-ink bg-tan p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-ink">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-complexity-notation text-[11px] uppercase tracking-wider font-bold">
                  Archived with Departmental Record &bull; Session 2026-Q3
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>Return to Active Docket</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
