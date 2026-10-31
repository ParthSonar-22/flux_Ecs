'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { openNewsletterModal } from '@/components/NewsletterModal'

const collagePhotos = [
  {
    src: '/iota/lab201.png',
    caption: 'Lab 201',
    rotate: '-3deg',
    zIndex: 1,
    top: '10px',
    left: '0px',
    tape: { top: '-8px', left: '20px', rotate: '-3deg' },
  },
  {
    src: '/iota/lab203.png',
    caption: 'Lab 203',
    rotate: '2deg',
    zIndex: 3,
    top: '40px',
    left: '80px',
    tape: { top: '-8px', right: '20px', rotate: '2deg' },
  },
  {
    src: '/iota/lab215.png',
    caption: 'Lab 215',
    rotate: '-1deg',
    zIndex: 2,
    top: '20px',
    left: '160px',
    tape: null,
  },
]

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
      className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: Text */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-space-md pr-0 lg:pr-space-md pt-8 lg:pt-16">
          <h1
            ref={headlineRef}
            className="font-display-hero text-display-hero text-ink leading-none tracking-tight"
          >
            Where ideas flow into{' '}
            <span className="relative inline-block text-brick">
              innovation
              {/* Hand-drawn SVG scribble underline */}
              <svg
                ref={scribbleRef}
                className="absolute left-0 -bottom-2 w-full overflow-visible"
                height="10"
                viewBox="0 0 200 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  className="scribble-underline"
                  d="M2 6 C30 2, 60 9, 100 5 C140 1, 170 8, 198 5"
                  stroke="var(--brick)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
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
          </div>

          {/* Small info strip with real facts only */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-muted">
            <span className="font-complexity-notation text-xs">Dept. of ECS, VESIT</span>
            <span className="text-brick">·</span>
            <span className="font-complexity-notation text-xs">Chembur, Mumbai</span>
            <span className="text-brick">·</span>
            <span className="font-complexity-notation text-xs">Acad. Year 2026</span>
          </div>
        </div>

        {/* Right Column: Photo Collage */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            className="relative"
            style={{ width: '360px', height: '300px', marginBottom: '-40px' }}
          >
            {/* Photo 1 — Lab 201 */}
            <div
              className="absolute bg-paper border-2 border-ink p-2 shadow-md"
              style={{
                width: '200px',
                top: '10px',
                left: '0px',
                transform: 'rotate(-3deg)',
                zIndex: 1,
              }}
            >
              {/* Tape strip */}
              <div
                className="tape-strip"
                style={{ top: '-9px', left: '50%', transform: 'translateX(-50%) rotate(-3deg)' }}
              />
              <div className="relative w-full h-36 overflow-hidden bg-tan border border-ink/20">
                <Image
                  src="/iota/lab201.png"
                  alt="Lab 201 hardware session"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
              <p className="font-handwritten text-lg text-ink text-center pt-1">Lab 201</p>
            </div>

            {/* Photo 2 — Lab 203 (front) */}
            <div
              className="absolute bg-paper border-2 border-ink p-2 shadow-md"
              style={{
                width: '210px',
                top: '35px',
                left: '105px',
                transform: 'rotate(2deg)',
                zIndex: 3,
              }}
            >
              {/* Tape strip */}
              <div
                className="tape-strip"
                style={{ top: '-9px', right: '20px', transform: 'rotate(2deg)' }}
              />
              <div className="relative w-full h-38 overflow-hidden bg-tan border border-ink/20" style={{ height: '148px' }}>
                <Image
                  src="/iota/lab203.png"
                  alt="Lab 203 software session"
                  fill
                  className="object-cover"
                  sizes="210px"
                />
              </div>
              <p className="font-handwritten text-lg text-ink text-center pt-1">Lab 203</p>
            </div>

            {/* Photo 3 — Lab 215 (back right) */}
            <div
              className="absolute bg-paper border-2 border-ink p-2 shadow-md"
              style={{
                width: '190px',
                top: '0px',
                right: '0px',
                transform: 'rotate(-1deg)',
                zIndex: 2,
              }}
            >
              <div className="relative w-full h-32 overflow-hidden bg-tan border border-ink/20">
                <Image
                  src="/iota/lab215.png"
                  alt="Lab 215 senior talks"
                  fill
                  className="object-cover"
                  sizes="190px"
                />
              </div>
              <p className="font-handwritten text-lg text-ink text-center pt-1">Lab 215</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
