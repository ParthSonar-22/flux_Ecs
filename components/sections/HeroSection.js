'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { openNewsletterModal } from '@/components/NewsletterModal'

export default function HeroSection() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const scribbleRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      // Headline line reveal
      gsap.from(headlineRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left Column: Text */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-space-md pr-0 lg:pr-space-md pt-4 lg:pt-8 z-20">
          <h1
            ref={headlineRef}
            className="font-display-hero text-display-hero text-ink leading-none tracking-tight"
          >
            Where ideas flow into{' '}
            <span className="relative inline-block text-brick whitespace-nowrap">
              innovation
              {/* Hand-drawn marker scribble extending before the word start and beyond the word end */}
              <svg
                ref={scribbleRef}
                className="absolute -bottom-3.5 sm:-bottom-4 -left-4 sm:-left-6 w-[calc(100%+32px)] sm:w-[calc(100%+48px)] h-5 sm:h-6 overflow-visible pointer-events-none"
                viewBox="0 0 320 18"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                {/* Main fluid marker stroke starting before word and reaching beyond */}
                <path
                  className="scribble-underline"
                  d="M 2 10 C 60 4, 130 16, 200 8 C 250 3, 290 12, 318 8"
                  stroke="var(--brick)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Secondary pass for natural hand-drawn marker effect */}
                <path
                  className="scribble-underline"
                  d="M 10 14 C 75 8, 155 17, 225 10 C 265 6, 295 13, 314 10"
                  stroke="var(--brick)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.9"
                  fill="none"
                />
              </svg>
            </span>
            .
          </h1>

          <p className="font-title-editorial text-title-editorial text-muted max-w-xl">
            We are the technical club of the ECS department at VESIT. We run
            events, show our projects and learn from each other.
          </p>

          <div className="pt-space-sm flex flex-wrap items-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[6px_6px_0px_var(--brick)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_var(--brick)] transition-all font-bold"
            >
              Explore Events
            </Link>
            <button
              type="button"
              onClick={openNewsletterModal}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-ink bg-card text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold cursor-pointer"
            >
              Get Updates
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border-2 border-ink bg-tan text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold"
            >
              Contact Us
            </Link>
          </div>

          {/* Small info strip with real facts only */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-muted">
            <span className="font-complexity-notation text-xs font-bold text-ink">Dept. of ECS, VESIT</span>
            <span className="text-brick font-bold">·</span>
            <span className="font-complexity-notation text-xs">Chembur, Mumbai</span>
            <span className="text-brick font-bold">·</span>
            <span className="font-complexity-notation text-xs">Acad. Year 2026–27</span>
          </div>
        </div>

        {/* Right Column: Generous Photo Collage (Covers the right side to eliminate white space) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end w-full pt-6 lg:pt-0">
          <div
            className="relative w-full max-w-[620px] lg:max-w-none h-[420px] sm:h-[460px] lg:h-[480px]"
            style={{ marginBottom: '-20px' }}
          >
            {/* Photo 1 — Lab 201 Hardware (back left) */}
            <div
              className="absolute bg-paper border-2 border-ink p-2 sm:p-2.5 shadow-lg transition-transform hover:z-40 hover:scale-105"
              style={{
                width: '60%',
                top: '15px',
                left: '-8px',
                transform: 'rotate(-3.5deg)',
                zIndex: 10,
              }}
            >
              {/* Tape strip */}
              <div
                className="tape-strip"
                style={{ top: '-10px', left: '30%', transform: 'rotate(-4deg)' }}
              />
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-tan border border-ink/30">
                <Image
                  src="/photos/lab201/lab201-1.jpg"
                  alt="Lab 201 hardware bench at IoTA"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 60vw, 360px"
                  priority
                />
              </div>
              <div className="pt-2 px-1 flex items-baseline justify-between">
                <span className="font-handwritten text-xl text-ink font-bold">Lab 201</span>
                <span className="font-complexity-notation text-[10px] text-brick uppercase font-bold">Hardware &amp; IoT</span>
              </div>
            </div>

            {/* Photo 3 — Lab 215 Senior Talks (back right) */}
            <div
              className="absolute bg-paper border-2 border-ink p-2 sm:p-2.5 shadow-lg transition-transform hover:z-40 hover:scale-105"
              style={{
                width: '56%',
                top: '0px',
                right: '-8px',
                transform: 'rotate(2deg)',
                zIndex: 20,
              }}
            >
              {/* Tape strip */}
              <div
                className="tape-strip"
                style={{ top: '-10px', right: '25%', transform: 'rotate(2deg)' }}
              />
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-tan border border-ink/30">
                <Image
                  src="/photos/lab215/lab215-1.jpg"
                  alt="Lab 215 Senior fresher interaction"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, 340px"
                  priority
                />
              </div>
              <div className="pt-2 px-1 flex items-baseline justify-between">
                <span className="font-handwritten text-xl text-ink font-bold">Lab 215</span>
                <span className="font-complexity-notation text-[10px] text-brick uppercase font-bold">Mentorship</span>
              </div>
            </div>

            {/* Photo 2 — Lab 203 Software (front center/hero of collage) */}
            <div
              className="absolute bg-paper border-2 border-ink p-2.5 sm:p-3 shadow-xl transition-transform hover:z-40 hover:scale-105"
              style={{
                width: '66%',
                bottom: '10px',
                left: '17%',
                transform: 'rotate(-1deg)',
                zIndex: 30,
              }}
            >
              {/* Tape strip */}
              <div
                className="tape-strip"
                style={{ top: '-11px', left: '40%', transform: 'rotate(3deg)' }}
              />
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-tan border border-ink/30">
                <Image
                  src="/photos/lab203/lab203-1.jpg"
                  alt="Lab 203 Software project presentations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 65vw, 380px"
                  priority
                />
              </div>
              <div className="pt-2 px-1 flex items-baseline justify-between">
                <span className="font-handwritten text-xl text-ink font-bold">Lab 203</span>
                <span className="font-complexity-notation text-[10px] text-brick uppercase font-bold">Software &amp; AI</span>
              </div>
            </div>

            {/* Student handwritten sticky tag on the bottom right */}
            <div
              className="absolute -bottom-3 right-0 bg-tan border-2 border-ink px-3 py-1.5 shadow-[2px_2px_0px_var(--ink)] z-35 hidden sm:block"
              style={{ transform: 'rotate(-2.5deg)' }}
            >
              <span className="font-handwritten text-lg text-ink font-bold block leading-none">
                VESIT ECS Labs · 2026–27
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
