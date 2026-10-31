'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { openNewsletterModal } from '@/components/NewsletterModal'

export default function HeroSection() {
  const containerRef = useRef(null)
  const headlineRef = useRef(null)
  const underlineRef = useRef(null)
  const ledgerRef = useRef(null)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      // 1. Headline line reveal & underline draw
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(headlineRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
      }).from(
        underlineRef.current,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.7,
        },
        '-=0.4'
      )

      // 2. Complexity ledger blocks stagger in
      const blocks = ledgerRef.current?.querySelectorAll('.ledger-block')
      if (blocks && blocks.length > 0) {
        gsap.from(blocks, {
          scrollTrigger: {
            trigger: ledgerRef.current,
            start: 'top 85%',
          },
          opacity: 0,
          x: 24,
          stagger: 0.12,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left Column: Typography & Intent */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-space-md pr-0 lg:pr-space-md">
          <div className="inline-flex items-center gap-2 border-2 border-ink bg-card px-3 py-1 shadow-[2px_2px_0px_var(--ink)] w-fit">
            <span className="font-complexity-notation text-[10px] uppercase tracking-widest text-ink">
              Gazette Item &bull; Acad. Year 2026
            </span>
            <span className="text-brick text-xs">&diams;</span>
            <span className="font-complexity-notation text-[10px] uppercase tracking-widest text-ink">
              VESIT Chembur
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-display-hero text-display-hero text-ink leading-none tracking-tight"
          >
            Where ideas flow into{' '}
            <span className="relative inline-block text-brick">
              innovation
              <span
                ref={underlineRef}
                className="absolute left-0 -bottom-2 w-full h-[3px] bg-brick block origin-left"
              />
            </span>
            .
          </h1>

          <p className="font-title-editorial text-title-editorial text-muted max-w-xl">
            The technical club of the Department of Electronics and Computer Science at VESIT.
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
        </div>

        {/* Right Column: Stacked Complexity Blocks Architectural Ledger */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div
            ref={ledgerRef}
            className="w-full max-w-md border-2 border-ink bg-card p-5 shadow-[6px_6px_0px_var(--brick)] relative"
          >
            {/* Letterpress Banner Tag */}
            <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
              <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-ink font-bold">
                Computational Complexity Ledger
              </span>
              <span className="font-complexity-notation text-[11px] text-brick font-bold">
                [AUCTION MATRIX]
              </span>
            </div>

            {/* Complexity Stack Modules */}
            <div className="space-y-2.5">
              {/* Block O(1) */}
              <div className="ledger-block flex items-center justify-between border-2 border-ink bg-paper p-2.5 hover:bg-tan transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-complexity-notation text-complexity-notation px-2 py-0.5 bg-ink text-paper">
                    O(1)
                  </span>
                  <span className="font-body-sm text-body-sm text-ink">
                    Constant-time Direct Index
                  </span>
                </div>
                <span className="font-complexity-notation text-[10px] text-muted border border-ink px-1.5 py-0.5 bg-card">
                  BID &infin;
                </span>
              </div>

              {/* Block O(log n) */}
              <div className="ledger-block flex items-center justify-between border-2 border-ink bg-paper p-2.5 hover:bg-tan transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-complexity-notation text-complexity-notation px-2 py-0.5 bg-ink text-paper">
                    O(log n)
                  </span>
                  <span className="font-body-sm text-body-sm text-ink">
                    Bisection &amp; Binary Divide
                  </span>
                </div>
                <span className="font-complexity-notation text-[10px] text-muted border border-ink px-1.5 py-0.5 bg-card">
                  BID ?
                </span>
              </div>

              {/* Block O(n) */}
              <div className="ledger-block flex items-center justify-between border-2 border-ink bg-paper p-2.5 hover:bg-tan transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-complexity-notation text-complexity-notation px-2 py-0.5 bg-ink text-paper">
                    O(n)
                  </span>
                  <span className="font-body-sm text-body-sm text-ink">
                    Linear Stream Traversal
                  </span>
                </div>
                <span className="font-complexity-notation text-[10px] text-muted border border-ink px-1.5 py-0.5 bg-card">
                  BID ?
                </span>
              </div>

              {/* Block O(n log n) */}
              <div className="ledger-block flex items-center justify-between border-2 border-ink bg-paper p-2.5 hover:bg-tan transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-complexity-notation text-complexity-notation px-2 py-0.5 bg-brick text-paper font-bold">
                    O(n log n)
                  </span>
                  <span className="font-body-sm text-body-sm text-ink">
                    Optimal Pivot Partitioning
                  </span>
                </div>
                <span className="font-complexity-notation text-[10px] text-brick border border-brick px-1.5 py-0.5 bg-card font-bold">
                  BID &bull; KEY
                </span>
              </div>

              {/* Block O(n^2) */}
              <div className="ledger-block flex items-center justify-between border-2 border-ink bg-paper p-2.5 hover:bg-tan transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-complexity-notation text-complexity-notation px-2 py-0.5 bg-brick text-paper font-bold">
                    O(n&sup2;)
                  </span>
                  <span className="font-body-sm text-body-sm text-ink">
                    Exhaustive Quadratic Permutation
                  </span>
                </div>
                <span className="font-complexity-notation text-[10px] text-brick border border-ink px-1.5 py-0.5 bg-card font-bold">
                  EXPENSIVE
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-ink flex justify-between items-center">
              <span className="font-complexity-notation text-[10px] text-muted">
                ARCHITECTURAL SPEC: ARCH-2026
              </span>
              <span className="font-complexity-notation text-[10px] text-ink font-bold">
                &sect; SEC-01
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
