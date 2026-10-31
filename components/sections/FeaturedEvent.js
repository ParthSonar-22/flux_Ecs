'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { events } from '@/data/events'
import { WHATSAPP_URL } from '@/data/site'

export default function FeaturedEvent() {
  const algoEvent = events.find((e) => e.slug === 'algorithms-auction') || events[0]
  const [activePosterTab, setActivePosterTab] = useState('poster') // 'poster' | 'timeline'
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentAsset =
    activePosterTab === 'poster'
      ? {
          src: algoEvent.poster,
          label: "Algorithm's Auction — Official Event Poster",
          aspect: 'aspect-[723/1024]',
          sub: 'Department of Electronics and Computer Science × FLUX-ECS · 2nd–3rd November 2026',
        }
      : {
          src: algoEvent.timelineImage,
          label: "Algorithm's Auction — Official Schedule & Timeline",
          aspect: 'aspect-[16/9]',
          sub: 'Day 1: Learn the Logic · Day 2: Bid. Solve. Win.',
        }

  const bigOTiers = [
    { notation: 'O(1)', tier: 'Bronze', pts: '100 pts', bid: 'BID ?' },
    { notation: 'O(log n)', tier: 'Silver', pts: '250 pts', bid: 'BID ?' },
    { notation: 'O(n)', tier: 'Gold', pts: '500 pts', bid: 'BID ?' },
    { notation: 'O(n log n)', tier: 'Platinum', pts: '750 pts', bid: 'BID ?' },
    { notation: 'O(n²)', tier: 'Boss Round', pts: '1000 pts', bid: 'STEAL' },
  ]

  return (
    <section
      className="w-full bg-card border-b-2 border-ink py-space-xl px-4 lg:px-margin relative"
      id="featured-event"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Heading & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-brick animate-ping inline-block" />
              <span className="font-complexity-notation text-xs uppercase tracking-widest text-brick font-bold">
                Upcoming Flagship Event · Department of ECS
              </span>
            </div>
            <h2 className="font-display-hero text-2xl sm:text-3xl md:text-headline-lg lg:text-display-hero text-ink font-bold tracking-tight leading-none uppercase">
              Algorithm&apos;s Auction
            </h2>
            <p className="font-title-editorial text-title-editorial text-muted italic mt-1.5">
              &ldquo;Every move is a strategy. Every bid is a gamble.&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-complexity-notation text-xs px-3 py-1 bg-brick text-paper font-bold uppercase tracking-wider shadow-[2px_2px_0px_var(--ink)]">
              2nd – 3rd November 2026
            </span>
            <span className="font-complexity-notation text-xs px-3 py-1 bg-tan border border-ink text-ink font-bold uppercase">
              2nd Floor, VESIT
            </span>
          </div>
        </div>

        {/* Spectacular Showcase Grid */}
        <div className="border-2 border-ink bg-paper shadow-[8px_8px_0px_var(--ink)] relative">
          {/* Top Brass Meta Bar */}
          <div className="border-b-2 border-ink bg-tan px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 font-complexity-notation text-xs text-ink font-semibold">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-[18px] text-brick">calendar_month</span>
                <span>2nd &amp; 3rd November 2026</span>
              </span>
              <span className="text-ink/40">|</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">domain</span>
                <span>2nd Floor, Dept. of ECS, VESIT</span>
              </span>
              <span className="text-ink/40">|</span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>1:00 pm – 3:30 pm Daily</span>
              </span>
            </div>

            {/* Poster / Timeline tab switcher */}
            <div className="flex items-center border border-ink bg-card p-0.5">
              <button
                type="button"
                onClick={() => setActivePosterTab('poster')}
                className={`px-3 py-1 font-label-smallcaps text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activePosterTab === 'poster'
                    ? 'bg-brick text-paper shadow-sm'
                    : 'text-ink hover:text-brick'
                }`}
              >
                Official Poster
              </button>
              <button
                type="button"
                onClick={() => setActivePosterTab('timeline')}
                className={`px-3 py-1 font-label-smallcaps text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                  activePosterTab === 'timeline'
                    ? 'bg-brick text-paper shadow-sm'
                    : 'text-ink hover:text-brick'
                }`}
              >
                Schedule Timeline
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Spectacular Poster Display Column (Left, 5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-4">
              {/* Physical Poster Frame */}
              <div
                className="relative w-full max-w-[380px] bg-card border-2 border-ink shadow-[6px_6px_0px_var(--brick)] overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
                style={{ transform: activePosterTab === 'poster' ? 'rotate(-1deg)' : 'none' }}
                onClick={() => setIsModalOpen(true)}
              >
                {/* Poster header badge */}
                <div className="bg-ink text-paper px-3 py-1 font-complexity-notation text-[10px] uppercase tracking-wider flex items-center justify-between font-bold">
                  <span>Department of ECS × FLUX-ECS</span>
                  <span className="text-brick font-bold">★ OFFICIAL DOCKET</span>
                </div>

                {/* Poster Graphic Container with exact aspect ratio */}
                <div className={`relative w-full ${currentAsset.aspect} bg-tan`}>
                  <Image
                    src={currentAsset.src}
                    alt={currentAsset.label}
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-paper/95 text-ink border-2 border-ink px-3 py-1.5 font-complexity-notation text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                      <span>Click to Enlarge &amp; Scan QR</span>
                    </span>
                  </div>
                </div>

                {/* Poster Card Footer */}
                <div className="p-3 bg-paper border-t-2 border-ink text-center flex items-center justify-between">
                  <span className="font-complexity-notation text-[11px] text-muted font-bold">
                    {activePosterTab === 'poster' ? 'Scan QR on poster to register' : '2-Day Schedule Flow'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsModalOpen(true)
                    }}
                    className="font-label-smallcaps text-xs text-brick font-bold uppercase hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Enlarge [Fullscreen]</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_full</span>
                  </button>
                </div>
              </div>

              {/* Tagline */}
              <div className="text-center space-y-1">
                <p className="font-handwritten text-xl sm:text-2xl text-brick font-bold">
                  &ldquo;Bid smart, play hard, and win big!&rdquo;
                </p>
                <p className="font-complexity-notation text-xs text-muted">
                  Open to FE, SE, TE, and BE students of ECS · Solo or Teams of 3
                </p>
              </div>

              {/* Big-O Complexity Bidding Ribbon (Matches the 3D Cubes on the poster!) */}
              <div className="w-full max-w-[380px] bg-paper border-2 border-ink p-3 shadow-sm">
                <span className="font-complexity-notation text-[10px] uppercase tracking-wider text-muted font-bold block mb-2 text-center">
                  Auction Problem statements by Big-O Tier:
                </span>
                <div className="grid grid-cols-5 gap-1 text-center">
                  {bigOTiers.map((t) => (
                    <div
                      key={t.notation}
                      className="bg-card border border-ink/40 p-1 sm:p-1.5 shadow-[1px_1px_0px_var(--ink)] flex flex-col justify-between"
                    >
                      <span className="font-complexity-notation text-[11px] sm:text-xs font-bold text-ink block truncate">
                        {t.notation}
                      </span>
                      <span className="font-complexity-notation text-[8px] sm:text-[9px] text-muted block mt-0.5 truncate">
                        {t.pts}
                      </span>
                      <span className="font-complexity-notation text-[7px] sm:text-[8px] bg-brick text-paper font-bold mt-1 px-0.5 py-0.2 rounded-xs block truncate">
                        {t.bid}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Event Details & Registration Column (Right, 7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="font-body-lg text-body-lg text-ink leading-relaxed">
                  {algoEvent.intro}
                </p>

                {/* 2-Day Structure Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Day 1 */}
                  <div className="bg-card border-2 border-ink p-4 shadow-[3px_3px_0px_var(--ink)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-ink/20">
                        <span className="bg-brick text-paper font-label-smallcaps text-xs px-2.5 py-0.5 uppercase tracking-wider font-bold">
                          Day 1
                        </span>
                        <span className="font-complexity-notation text-xs font-bold text-ink">
                          {algoEvent.day1.date}
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-base text-ink font-bold mb-2">
                        {algoEvent.day1.label}
                      </h4>
                      <ul className="space-y-1.5 font-body-sm text-xs text-ink">
                        {algoEvent.day1.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="text-brick font-bold">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 pt-2 border-t border-ink/10 text-[11px] font-complexity-notation text-muted">
                      Mentor guided logic rounds
                    </div>
                  </div>

                  {/* Day 2 */}
                  <div className="bg-card border-2 border-ink p-4 shadow-[3px_3px_0px_var(--brick)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-ink/20">
                        <span className="bg-brick text-paper font-label-smallcaps text-xs px-2.5 py-0.5 uppercase tracking-wider font-bold">
                          Day 2
                        </span>
                        <span className="font-complexity-notation text-xs font-bold text-ink">
                          {algoEvent.day2.date}
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-base text-ink font-bold mb-2">
                        {algoEvent.day2.label}
                      </h4>
                      <ul className="space-y-1.5 font-body-sm text-xs text-ink">
                        {algoEvent.day2.items.map((item) => (
                          <li key={item} className="flex items-start gap-1.5">
                            <span className="text-brick font-bold">·</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3 pt-2 border-t border-ink/10 text-[11px] font-complexity-notation text-brick font-bold">
                      Live virtual coin bidding battles
                    </div>
                  </div>
                </div>

                {/* Key Bidding Rules Highlights */}
                <div className="border border-ink/30 bg-tan/40 p-4 space-y-2">
                  <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick font-bold block">
                    Tournament Mechanics:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-body-sm text-xs text-ink">
                    <div className="flex items-start gap-2">
                      <span className="font-complexity-notation text-[11px] px-1 bg-ink text-paper font-bold">
                        R1
                      </span>
                      <span>
                        <strong>Virtual Coin Purse:</strong> Every team receives a purse of coins to bid on problem statements.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-complexity-notation text-[11px] px-1 bg-ink text-paper font-bold">
                        R2
                      </span>
                      <span>
                        <strong>Tiered Points:</strong> Problems are valued from Bronze (100 pts) up to Gold (500 pts).
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-complexity-notation text-[11px] px-1 bg-ink text-paper font-bold">
                        R3
                      </span>
                      <span>
                        <strong>Steal Deal Window:</strong> Unsolved problems become available for live steal bids at discounts.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-complexity-notation text-[11px] px-1 bg-ink text-paper font-bold">
                        R4
                      </span>
                      <span>
                        <strong>Net Scoring:</strong> Final Score = (Passed test cases points) - (Coins spent).
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs & Contacts */}
              <div className="pt-3 border-t-2 border-ink space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold text-center"
                    href={algoEvent.registerUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Register via Google Form</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                  </a>

                  <a
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-ink bg-tan text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold text-center"
                    href={WHATSAPP_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Join WhatsApp Group</span>
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                  </a>

                  <Link
                    href="/events"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 font-label-smallcaps text-xs text-ink hover:text-brick uppercase tracking-wider font-bold text-center"
                  >
                    <span>Full Syllabus &amp; FAQ</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>

                {/* Contact info strip */}
                <div className="border border-ink/20 bg-paper p-3">
                  <span className="font-label-smallcaps text-[11px] uppercase tracking-widest text-muted block mb-2 font-bold">
                    For queries, contact council leads:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 font-complexity-notation text-xs text-ink">
                    {algoEvent.contacts.map((c) => (
                      <div key={c.name} className="flex items-baseline justify-between border-b border-ink/10 pb-1">
                        <span>
                          {c.name} <span className="text-muted">({c.role}):</span>
                        </span>
                        <a href={`tel:${c.phone.replace(/\s+/g, '')}`} className="font-bold text-brick hover:underline">
                          {c.phone}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-paper border-2 border-ink shadow-[10px_10px_0px_var(--brick)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="bg-tan border-b-2 border-ink px-4 py-2.5 flex items-center justify-between">
              <div className="font-complexity-notation text-xs text-ink font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brick inline-block" />
                <span>FLUX-ECS Official Event Poster · High-Resolution Inspection</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-2.5 py-0.5 border border-ink bg-card text-ink hover:bg-brick hover:text-paper font-complexity-notation text-xs font-bold transition-colors cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>

            {/* Modal Asset Display */}
            <div className="relative w-full aspect-[723/1024] max-h-[78vh] bg-ink/5">
              <Image
                src={currentAsset.src}
                alt={currentAsset.label}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Modal Footer with Direct Registration Action */}
            <div className="bg-paper border-t-2 border-ink p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h5 className="font-headline-sm text-sm sm:text-base text-ink font-bold">
                  {currentAsset.label}
                </h5>
                <p className="font-complexity-notation text-xs text-muted mt-0.5">
                  Scan the QR code directly with your mobile phone camera to open the official registration form!
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={algoEvent.registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-ink transition-colors"
                >
                  Open Registration Form ↗
                </a>
                <a
                  href={currentAsset.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-card border border-ink text-ink font-label-smallcaps text-xs uppercase tracking-wider font-bold hover:bg-tan transition-colors"
                >
                  Download Asset ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
