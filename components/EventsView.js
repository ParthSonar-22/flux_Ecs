'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { events } from '@/data/events'
import { WHATSAPP_URL } from '@/data/site'
import { faculty, seniorCouncil, juniorCouncil } from '@/data/team'

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
      {/* Page header */}
      <section className="w-full px-4 lg:px-margin py-space-lg lg:py-space-xl bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-handwritten text-xl text-brick block">Events &amp; Workshops</span>
            <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-ink leading-none tracking-tight font-bold">
              What we do
            </h1>
            <p className="font-body-lg text-body-lg text-muted max-w-2xl">
              Competitive coding tournaments, hands-on hardware exhibitions, and student interaction sessions.
            </p>
          </div>

          {/* Simple Tab switcher */}
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
              Upcoming (1)
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
              Past Events (1)
            </button>
          </div>
        </div>
      </section>

      {/* UPCOMING: Algorithm's Auction */}
      {activeTab === 'upcoming' && (
        <div className="w-full px-4 lg:px-margin py-space-xl flex flex-col space-y-space-lg">
          <article className="relative bg-card border-2 border-ink shadow-[6px_6px_0px_var(--brick)] overflow-hidden">
            {/* Header info bar */}
            <div className="border-b-2 border-ink bg-tan px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-complexity-notation text-[11px] px-2.5 py-1 bg-brick text-paper tracking-wider uppercase font-bold">
                  Upcoming Event
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
              {/* Poster — Hero element of the card, large & slightly rotated */}
              <div className="lg:col-span-5 border-b-2 lg:border-b-0 lg:border-r-2 border-ink p-6 md:p-8 bg-paper flex flex-col items-center justify-center">
                <div
                  className="relative border-2 border-ink overflow-hidden bg-card w-full shadow-lg"
                  style={{ transform: 'rotate(-1.5deg)', maxWidth: '400px' }}
                >
                  <div className="relative w-full aspect-[698/428] bg-tan">
                    <Image
                      src={algo.poster}
                      alt="Algorithm's Auction official artwork"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <div className="p-3 bg-paper border-t-2 border-ink text-center">
                    <p className="font-handwritten text-xl text-brick">
                      &ldquo;{algo.posterLine}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Sub-caption */}
                <span className="font-complexity-notation text-xs text-muted mt-4 block text-center">
                  Official Event Poster · Department of ECS × FLUX-ECS
                </span>
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

                {/* Date / venue / time — monospace for real facts */}
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
        </div>
      )}

      {/* PAST: IoTA Archives (Scrapbook / Photo Album Layout) */}
      {activeTab === 'past' && (
        <div className="w-full px-4 lg:px-margin py-space-xl flex flex-col space-y-space-lg">
          <article className="relative bg-card border-2 border-ink shadow-[6px_6px_0px_var(--tan)] overflow-hidden">
            {/* Header */}
            <div className="border-b-2 border-ink bg-tan px-6 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-complexity-notation text-[11px] px-2.5 py-1 bg-ink text-paper tracking-wider uppercase font-bold">
                  Concluded Exhibition
                </span>
                <span className="font-complexity-notation text-[12px] tracking-wider uppercase text-ink font-semibold">
                  First Year (FE) Induction Program · VESIT ECS
                </span>
              </div>
              <span className="font-complexity-notation text-complexity-notation text-ink uppercase font-bold">
                7th September 2026
              </span>
            </div>

            {/* Scrapbook Photo Album Strip — natural aspect ratio, no stretched photos */}
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

              {/* 3 Polaroid / Album style cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Album Item 1: Lab 201 */}
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

                {/* Album Item 2: Lab 203 */}
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

                {/* Album Item 3: Lab 215 */}
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

            {/* Footer switcher */}
            <div className="border-t-2 border-ink bg-tan p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-ink">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-complexity-notation text-[11px] uppercase tracking-wider font-bold">
                  Induction Exhibition Concluded · September 2026
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('upcoming')}
                className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>View upcoming events</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
