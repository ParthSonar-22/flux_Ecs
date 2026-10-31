'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { events, clubPillars, termRoadmap, isPast } from '@/data/events'
import { WHATSAPP_URL } from '@/data/site'
import { openNewsletterModal } from '@/components/NewsletterModal'

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

  const upcomingList = events.filter((e) => !isPast(e))
  const pastList = events.filter((e) => isPast(e))

  const algo = events.find((e) => e.slug === 'algorithms-auction') || events[0]
  const iota = events.find((e) => e.slug === 'iota-archives') || events[1]
  const hardwareExhibit = events.find((e) => e.slug === 'senior-hardware-exhibit')

  const otherUpcoming = upcomingList.filter((e) => e.slug !== 'algorithms-auction')

  return (
    <div className="flex flex-col w-full">
      {/* Page Header & What We Do Showcase */}
      <section className="w-full px-4 lg:px-margin py-space-lg lg:py-space-xl bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Title and Tab Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-ink/20">
            <div className="space-y-3">
              <span className="font-handwritten text-xl text-brick block">Events &amp; Workshops</span>
              <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-ink leading-none tracking-tight font-bold">
                What we do
              </h1>
              <p className="font-body-lg text-body-lg text-muted max-w-2xl">
                Competitive coding tournaments, hands-on hardware exhibitions, peer project jams, and senior mentorship.
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex items-center border-2 border-ink bg-card p-1 self-start md:self-end">
              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2 font-label-smallcaps text-label-smallcaps uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'bg-brick text-paper shadow-[2px_2px_0px_var(--ink)]'
                    : 'text-ink hover:text-brick'
                }`}
              >
                Upcoming ({upcomingList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2 font-label-smallcaps text-label-smallcaps uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activeTab === 'past'
                    ? 'bg-brick text-paper shadow-[2px_2px_0px_var(--ink)]'
                    : 'text-ink hover:text-brick'
                }`}
              >
                Past Activities ({pastList.length})
              </button>
            </div>
          </div>

          {/* 4 Core Club Activity Pillars */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-complexity-notation text-xs uppercase tracking-wider text-brick font-bold">
                Four Pillars of FLUX-ECS
              </span>
              <span className="font-complexity-notation text-xs text-muted">
                Department of Electronics &amp; Computer Science · VESIT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clubPillars.map((pillar) => (
                <div
                  key={pillar.number}
                  className="bg-card border-2 border-ink p-5 flex flex-col justify-between shadow-[3px_3px_0px_var(--ink)] transition-transform hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-ink/20 pb-2">
                      <span className="font-complexity-notation text-xs font-bold text-brick">
                        {pillar.number}
                      </span>
                      <span className="font-complexity-notation text-[11px] px-2 py-0.5 bg-tan border border-ink/30 font-bold text-ink uppercase">
                        {pillar.lab}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-lg text-ink font-bold leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="font-body-sm text-xs text-muted leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-ink/10 flex flex-wrap gap-1.5">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-complexity-notation text-[10px] px-1.5 py-0.5 bg-paper border border-ink/20 text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Term Activity Roadmap */}
          <div className="bg-tan border-2 border-ink p-5 md:p-6 shadow-[4px_4px_0px_var(--ink)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink/20 pb-2">
              <div>
                <span className="font-handwritten text-xl text-brick block">Term Activity Roadmap</span>
                <h4 className="font-headline-sm text-lg text-ink font-bold">
                  Academic Year 2026–2027 Schedule of Proceedings
                </h4>
              </div>
              <span className="font-complexity-notation text-xs text-muted font-bold">
                Odd &amp; Even Semesters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {termRoadmap.map((item, idx) => (
                <div
                  key={item.period}
                  className={`p-3 border-2 border-ink flex flex-col justify-between ${
                    item.isHighlighted
                      ? 'bg-paper shadow-[3px_3px_0px_var(--brick)] ring-1 ring-brick'
                      : item.status === 'Concluded'
                      ? 'bg-card/70 opacity-90'
                      : 'bg-card'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-complexity-notation text-[11px] font-bold text-ink">
                        {item.period}
                      </span>
                      <span
                        className={`font-complexity-notation text-[9px] uppercase px-1.5 py-0.5 font-bold ${
                          item.status === 'Active Flagship'
                            ? 'bg-brick text-paper'
                            : item.status === 'Concluded'
                            ? 'bg-ink text-paper'
                            : 'bg-tan border border-ink/30 text-ink'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="font-headline-sm text-sm text-ink font-bold leading-snug">
                      {item.title}
                    </div>
                    <div className="font-complexity-notation text-[10px] text-brick font-semibold">
                      {item.venue}
                    </div>
                    <p className="font-body-sm text-[11px] text-muted leading-tight">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-ink/10 flex items-center justify-between text-[10px] font-complexity-notation text-muted">
                    <span>Phase 0{idx + 1}</span>
                    {item.isHighlighted && <span className="text-brick font-bold">● Active Now</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING TAB */}
      {activeTab === 'upcoming' && (
        <div className="w-full px-4 lg:px-margin py-space-xl flex flex-col space-y-space-lg">
          {/* Flagship: Algorithm's Auction */}
          <article className="relative bg-card border-2 border-ink shadow-[6px_6px_0px_var(--brick)] overflow-hidden">
            {/* Header info bar */}
            <div className="border-b-2 border-ink bg-tan px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-complexity-notation text-[11px] px-2.5 py-1 bg-brick text-paper tracking-wider uppercase font-bold">
                  Featured Flagship Tournament
                </span>
                <span className="font-complexity-notation text-[12px] tracking-wider uppercase text-ink font-semibold">
                  Department of Electronics &amp; Computer Science × FluxECS
                </span>
              </div>
              <div className="flex items-center gap-2 font-complexity-notation text-complexity-notation text-ink font-bold">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                <span>2nd – 3rd November 2026</span>
              </div>
            </div>

            {/* Poster + details layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 border-b-2 border-ink">
              {/* Poster Column */}
              <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 md:p-8 bg-paper flex flex-col items-center justify-center space-y-4">
                <div
                  className="relative border-2 border-ink overflow-hidden bg-card w-full shadow-lg"
                  style={{ transform: 'rotate(-1.5deg)', maxWidth: '420px' }}
                >
                  <div className="relative w-full aspect-[698/428] bg-tan">
                    <Image
                      src={algo.poster}
                      alt="Algorithm's Auction official artwork"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                  </div>
                  <div className="p-3 bg-paper border-t-2 border-ink text-center">
                    <p className="font-handwritten text-xl text-brick">
                      &ldquo;{algo.posterLine}&rdquo;
                    </p>
                  </div>
                </div>

                <span className="font-complexity-notation text-xs text-muted block text-center">
                  Official Event Poster · Department of ECS × FLUX-ECS
                </span>

                {/* Official Schedule Timeline Poster */}
                {algo.timelineImage && (
                  <div className="w-full max-w-[420px] bg-card border-2 border-ink p-3 shadow-md">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-ink/20">
                      <span className="font-handwritten text-lg text-brick">Official Visual Timeline</span>
                      <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted font-bold">
                        Day 1 &amp; Day 2
                      </span>
                    </div>
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-tan border border-ink/20">
                      <Image
                        src={algo.timelineImage}
                        alt="Algorithm's Auction schedule breakdown"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Details Column */}
              <div className="lg:col-span-7 p-6 md:p-10 space-y-6">
                <div className="space-y-2">
                  <span className="font-handwritten text-2xl text-brick block">Strategy &amp; Logic Competition</span>
                  <h2 className="font-headline-lg text-headline-lg tracking-tight text-ink leading-none font-bold">
                    {algo.title}
                  </h2>
                  <p className="font-title-editorial text-title-editorial text-muted italic font-medium">
                    {algo.shortLine}
                  </p>
                </div>

                <p className="font-body-lg text-body-lg text-ink leading-relaxed">
                  {algo.intro}
                </p>

                {/* Date / venue / time */}
                <div className="w-full bg-tan border-2 border-ink p-4 flex flex-col md:flex-row md:items-center justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink text-ink shadow-[2px_2px_0px_var(--ink)]">
                  <div className="pb-3 md:pb-0 md:pr-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                    <div>
                      <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">When</span>
                      <span className="font-complexity-notation text-complexity-notation font-bold">2nd – 3rd Nov 2026</span>
                    </div>
                  </div>
                  <div className="py-3 md:py-0 md:px-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                    <div>
                      <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">Where</span>
                      <span className="font-complexity-notation text-complexity-notation font-bold">2nd Floor, VESIT</span>
                    </div>
                  </div>
                  <div className="pt-3 md:pt-0 md:pl-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[24px]">schedule</span>
                    <div>
                      <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">Time</span>
                      <span className="font-complexity-notation text-complexity-notation font-bold">1:00 pm – 3:30 pm</span>
                    </div>
                  </div>
                </div>

                {/* Day 1 & Day 2 breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="relative bg-paper border-2 border-ink p-5 pt-8">
                    <div
                      className="absolute -top-3 left-4 px-3 py-0.5 bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)', paddingRight: '1.2rem' }}
                    >
                      Day 1: Learn the Logic
                    </div>
                    <ul className="space-y-2 font-body-sm text-body-sm text-ink pt-1">
                      {algo.day1.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-brick font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative bg-paper border-2 border-ink p-5 pt-8">
                    <div
                      className="absolute -top-3 left-4 px-3 py-0.5 bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)', paddingRight: '1.2rem' }}
                    >
                      Day 2: Bid. Solve. Win.
                    </div>
                    <ul className="space-y-2 font-body-sm text-body-sm text-ink pt-1">
                      {algo.day2.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-brick font-bold">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* What's in it for you */}
                <div className="border border-ink/20 bg-paper p-4 space-y-2">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-brick font-bold block">
                    What&apos;s in it for you:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-body-sm text-sm text-ink">
                    <p>• Explore algorithms &amp; sharpen problem-solving</p>
                    <p>• Strategic coin bidding with peers</p>
                    <p>• Build skills useful for placements</p>
                    <p>• Certificate of Participation for all</p>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider border-2 border-ink shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold"
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

            {/* Contacts */}
            <div className="bg-paper p-6 md:p-8">
              <div className="mb-4 border-b border-ink/20 pb-2">
                <span className="font-handwritten text-lg text-brick block">Student Contacts</span>
                <h4 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink font-bold">
                  Got questions? Reach out to the organizers:
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {algo.contacts.map((c) => (
                  <div key={c.name} className="bg-card border border-ink/20 p-3.5">
                    <span className="font-complexity-notation text-[10px] text-brick tracking-wider uppercase block font-bold">
                      {c.role}
                    </span>
                    <div className="font-headline-sm text-base text-ink font-bold">{c.name}</div>
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

          {/* Additional Upcoming Term Activities */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-ink pb-3">
              <div>
                <span className="font-handwritten text-2xl text-brick block">Upcoming Activity Docket</span>
                <h3 className="font-headline-md text-headline-md text-ink font-bold">
                  Hands-on Workshops &amp; Hackathons in Even Semester
                </h3>
              </div>
              <span className="font-complexity-notation text-xs text-muted">
                3 More Scheduled Initiatives
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherUpcoming.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border-2 border-ink p-6 shadow-[4px_4px_0px_var(--ink)] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-ink/20 pb-2">
                      <span className="font-complexity-notation text-[11px] px-2 py-0.5 bg-brick text-paper font-bold uppercase">
                        Scheduled
                      </span>
                      <span className="font-complexity-notation text-xs font-bold text-ink">
                        {item.time}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="font-complexity-notation text-xs text-brick font-bold">
                        {item.venue}
                      </div>
                      <h4 className="font-headline-sm text-xl text-ink font-bold leading-tight">
                        {item.title}
                      </h4>
                      <p className="font-title-editorial text-sm text-muted italic">
                        {item.shortLine}
                      </p>
                    </div>

                    <p className="font-body-sm text-sm text-ink leading-relaxed">
                      {item.intro}
                    </p>

                    {item.highlights && (
                      <div className="bg-paper border border-ink/20 p-3 space-y-1.5">
                        <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block">
                          Agenda Highlights:
                        </span>
                        <ul className="space-y-1 font-body-sm text-xs text-ink">
                          {item.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-1.5">
                              <span className="text-brick font-bold">·</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-5 mt-4 border-t border-ink/20 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={openNewsletterModal}
                      className="w-full text-center px-4 py-2.5 bg-paper border-2 border-ink text-ink font-label-smallcaps text-xs uppercase tracking-wider font-bold hover:bg-tan transition-colors shadow-[2px_2px_0px_var(--ink)] cursor-pointer"
                    >
                      Get Notified When Registration Opens
                    </button>
                    {item.contacts && item.contacts[0] && (
                      <span className="font-complexity-notation text-[11px] text-muted text-center block pt-1">
                        Coordinator: {item.contacts[0].name} ({item.contacts[0].role})
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PAST ACTIVITIES TAB */}
      {activeTab === 'past' && (
        <div className="w-full px-4 lg:px-margin py-space-xl flex flex-col space-y-space-lg">
          {/* IoTA Archives Scrapbook */}
          <article className="relative bg-card border-2 border-ink shadow-[6px_6px_0px_var(--tan)] overflow-hidden">
            {/* Header */}
            <div className="border-b-2 border-ink bg-tan px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-complexity-notation text-[11px] px-2.5 py-1 bg-ink text-paper tracking-wider uppercase font-bold">
                  Concluded Induction Exhibition
                </span>
                <span className="font-complexity-notation text-[12px] tracking-wider uppercase text-ink font-semibold">
                  First Year (FE) Induction Program · VESIT ECS
                </span>
              </div>
              <span className="font-complexity-notation text-complexity-notation text-ink uppercase font-bold">
                7th September 2026
              </span>
            </div>

            {/* Scrapbook Photo Album Strip */}
            <div className="p-6 md:p-10 border-b-2 border-ink bg-paper space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ink/20 pb-3">
                <div>
                  <span className="font-handwritten text-2xl text-brick block">Exhibition Scrapbook</span>
                  <h3 className="font-headline-md text-headline-md text-ink font-bold">
                    Snapshots from the Labs
                  </h3>
                </div>
                <span className="font-complexity-notation text-xs text-muted">
                  3 Labs · 10+ Projects · FE 2026 Batch
                </span>
              </div>

              {/* 3 Album cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Lab 201 */}
                <div
                  className="bg-card border-2 border-ink p-3 shadow-md flex flex-col justify-between"
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  <div className="relative w-full aspect-[4/3] bg-tan border border-ink/30 overflow-hidden">
                    <Image
                      src="/photos/lab201/lab201-1.jpg"
                      alt="Lab 201 Hardware demonstrations"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                  <div className="pt-3 pb-1 text-center">
                    <p className="font-handwritten text-xl text-ink font-bold">Lab 201 — Hardware</p>
                    <p className="font-body-sm text-xs text-muted mt-0.5">
                      Robotics, RF circuits &amp; FPGA demos
                    </p>
                    <p className="font-complexity-notation text-[11px] text-brick mt-2 font-semibold">
                      Harsh Patange &amp; Riya Pailwan on bench
                    </p>
                  </div>
                </div>

                {/* Lab 203 */}
                <div
                  className="bg-card border-2 border-ink p-3 shadow-md flex flex-col justify-between"
                  style={{ transform: 'rotate(1.5deg)' }}
                >
                  <div className="relative w-full aspect-[4/3] bg-tan border border-ink/30 overflow-hidden">
                    <Image
                      src="/photos/lab203/lab203-1.jpg"
                      alt="Lab 203 Software project presentations"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                  <div className="pt-3 pb-1 text-center">
                    <p className="font-handwritten text-xl text-ink font-bold">Lab 203 — Software</p>
                    <p className="font-body-sm text-xs text-muted mt-0.5">
                      Computer vision classifier &amp; web portals
                    </p>
                    <p className="font-complexity-notation text-[11px] text-brick mt-2 font-semibold">
                      Aayan Shaikh &amp; Paarth Patil presenting
                    </p>
                  </div>
                </div>

                {/* Lab 215 */}
                <div
                  className="bg-card border-2 border-ink p-3 shadow-md flex flex-col justify-between"
                  style={{ transform: 'rotate(-0.5deg)' }}
                >
                  <div className="relative w-full aspect-[4/3] bg-tan border border-ink/30 overflow-hidden">
                    <Image
                      src="/photos/lab215/lab215-1.jpg"
                      alt="Lab 215 Senior Fresher interaction"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 360px"
                    />
                  </div>
                  <div className="pt-3 pb-1 text-center">
                    <p className="font-handwritten text-xl text-ink font-bold">Lab 215 — Interaction</p>
                    <p className="font-body-sm text-xs text-muted mt-0.5">
                      Senior guidance, GitHub &amp; college roadmap
                    </p>
                    <p className="font-complexity-notation text-[11px] text-brick mt-2 font-semibold">
                      Shantanu Gaikwad &amp; Jr. Council officers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description & Labs Content */}
            <div className="p-6 md:p-10 space-y-6">
              <div className="space-y-2">
                <span className="font-handwritten text-2xl text-brick block">Induction Exhibition</span>
                <h2 className="font-headline-lg text-headline-lg tracking-tight text-ink font-bold">
                  {iota.title}
                </h2>
                <p className="font-title-editorial text-title-editorial text-muted italic">
                  {iota.shortLine}
                </p>
              </div>

              {/* Date / venue info strip */}
              <div className="w-full bg-tan border-2 border-ink p-4 flex flex-col md:flex-row md:items-center justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink text-ink">
                <div className="pb-3 md:pb-0 md:pr-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">event_available</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">Date</span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">7th September 2026</span>
                  </div>
                </div>
                <div className="py-3 md:py-0 md:px-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">domain</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">Venue</span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">{iota.venue}</span>
                  </div>
                </div>
                <div className="pt-3 md:pt-0 md:pl-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[24px]">groups</span>
                  <div>
                    <span className="font-label-smallcaps text-[11px] uppercase tracking-wider block text-muted font-bold">Audience</span>
                    <span className="font-complexity-notation text-complexity-notation font-bold">FE Induction Cohort &amp; Seniors</span>
                  </div>
                </div>
              </div>

              {/* Summary note */}
              <div className="border-l-4 border-brick pl-4 py-2 bg-paper/50">
                <p className="font-body-lg text-body-lg text-ink leading-relaxed">{iota.intro}</p>
              </div>

              {/* Lab breakdown cards */}
              <div className="space-y-4 pt-2">
                <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink border-b border-ink/20 pb-2 font-bold">
                  What happened in each lab
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
                  {iota.labs.map((lab) => (
                    <div
                      key={lab.id}
                      className="bg-paper border border-ink/30 p-5 flex flex-col justify-between shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-ink/20 pb-2 mb-3">
                          <span className="px-2.5 py-0.5 bg-brick text-paper font-complexity-notation text-[11px] font-bold">
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
                        <div className="border-t border-ink/10 pt-3">
                          <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block mb-1">
                            Demonstrated Projects:
                          </span>
                          <ul className="space-y-1.5 font-body-sm text-xs text-ink">
                            {lab.projects.map((proj) => (
                              <li key={proj} className="flex items-start gap-1.5">
                                <span className="text-brick font-bold">·</span>
                                <span>{proj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Council presence & Credits */}
              <div className="border-2 border-ink bg-paper p-6 space-y-5">
                <div className="border-b border-ink/20 pb-2">
                  <span className="font-handwritten text-xl text-brick block">Council on Duty</span>
                  <h4 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink font-bold">
                    Who ran this event &amp; where members were stationed:
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Faculty */}
                  <div className="bg-card border border-ink/20 p-4 space-y-2">
                    <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block">
                      Faculty Leadership
                    </span>
                    <div className="font-headline-sm text-lg text-ink font-bold">Yogesh Pandit Sir</div>
                    <p className="font-body-sm text-xs text-muted">Council In-charge, Dept. of ECS</p>
                    <div className="font-headline-sm text-lg text-ink font-bold pt-2">Abhishek Chaudhari Sir</div>
                    <p className="font-body-sm text-xs text-muted">Faculty Advisor, Dept. of ECS</p>
                  </div>

                  {/* Senior Council */}
                  <div className="bg-card border border-ink/20 p-4 space-y-2">
                    <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block">
                      Senior Council (Labs 201 &amp; 203)
                    </span>
                    <p className="font-body-sm text-xs text-ink leading-relaxed">
                      <strong>Harsh Patange</strong> (President) &amp; <strong>Riya Pailwan</strong> (Hardware Head) ran hardware benches in Lab 201.
                    </p>
                    <p className="font-body-sm text-xs text-ink leading-relaxed pt-1">
                      <strong>Aayan Shaikh</strong> (Technical Head), <strong>Paarth Patil</strong>, and <strong>Abhishek Patil</strong> ran AI/software demos in Lab 203.
                    </p>
                  </div>

                  {/* Junior Council */}
                  <div className="bg-card border border-ink/20 p-4 space-y-2">
                    <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold block">
                      Operations &amp; Junior Council (Lab 215)
                    </span>
                    <p className="font-body-sm text-xs text-ink leading-relaxed">
                      <strong>Shantanu Gaikwad</strong> (VP), <strong>Varnika Mandal Chaurasia</strong> (Ops Head), and <strong>Arnav Abhale</strong> (Finance Head) managed student flow and scheduling.
                    </p>
                    <p className="font-body-sm text-xs text-ink leading-relaxed pt-1">
                      <strong>Parth Sonar</strong>, <strong>Aarya Tanwade</strong>, <strong>Tanush Haryan</strong>, <strong>Atharva Vaidya</strong>, and <strong>Yogita Gupta</strong> coordinated batches and freshman guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Past Exhibit 2: Senior Hardware Showcase */}
          {hardwareExhibit && (
            <article className="relative bg-card border-2 border-ink shadow-[4px_4px_0px_var(--ink)] p-6 md:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-ink pb-3">
                <div>
                  <span className="font-handwritten text-xl text-brick block">Archival Bench Showcase</span>
                  <h3 className="font-headline-md text-2xl text-ink font-bold">
                    {hardwareExhibit.title}
                  </h3>
                  <p className="font-title-editorial text-sm text-muted italic">
                    {hardwareExhibit.shortLine}
                  </p>
                </div>
                <span className="font-complexity-notation text-xs font-bold text-ink">
                  22nd August 2026 · Lab 201
                </span>
              </div>

              <p className="font-body-md text-ink leading-relaxed">
                {hardwareExhibit.intro}
              </p>

              {hardwareExhibit.projects && (
                <div className="bg-paper border border-ink/20 p-4 space-y-2">
                  <span className="font-complexity-notation text-xs uppercase text-brick font-bold block">
                    Bench Projects &amp; Demonstrations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-body-sm text-xs text-ink">
                    {hardwareExhibit.projects.map((proj) => (
                      <div key={proj} className="flex items-start gap-1.5">
                        <span className="text-brick font-bold">·</span>
                        <span>{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hardwareExhibit.credits && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-complexity-notation text-xs text-muted pt-2 border-t border-ink/10">
                  <span className="font-bold text-ink">Led by:</span>
                  {hardwareExhibit.credits.map((cr) => (
                    <span key={cr}>{cr}</span>
                  ))}
                </div>
              )}
            </article>
          )}

          {/* Switch back banner */}
          <div className="border-2 border-ink bg-tan p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-ink">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-complexity-notation text-[11px] uppercase tracking-wider font-bold">
                Concluded Term Proceedings · Department of ECS
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('upcoming')}
              className="font-label-smallcaps text-xs uppercase tracking-wider text-brick hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <span>View upcoming events ({upcomingList.length})</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
