'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export default function WhyClub() {
  const containerRef = useRef(null)

  const rows = [
    {
      num: '01',
      title: 'Built by students.',
      desc: 'FLUX-ECS is run by students of the ECS department at VESIT.',
    },
    {
      num: '02',
      title: 'Hardware and software, side by side.',
      desc: 'Our last event had hardware in Lab 201 and software in Labs 203 and 215.',
    },
    {
      num: '03',
      title: 'Open to every year.',
      desc: "Algorithm's Auction is for ECS students across all years, and beginners are welcome.",
    },
    {
      num: '04',
      title: 'Seniors and freshers in the same room.',
      desc: 'IoTA Archives put the new FE batch in front of senior projects and the people who built them.',
    },
    {
      num: '05',
      title: 'Come curious.',
      desc: 'No need to be an expert, just bring curiosity and a competitive spirit.',
    },
  ]

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReducedMotion) return

      const rowElements = containerRef.current?.querySelectorAll('.why-row')
      rowElements?.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.5 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              end: 'top 45%',
              scrub: true,
            },
          }
        )
      })
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="w-full bg-card border-b-2 border-ink py-space-xl px-4 lg:px-margin"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Triple Rule Terminal */}
        <div className="mb-space-lg">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-complexity-notation text-complexity-notation text-brick">
              &para;
            </span>
            <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-muted font-bold">
              Charter &bull; Departmental Mandate
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-ink font-bold">
            Why the club
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-0.5 bg-ink flex-grow"></div>
            <span className="font-complexity-notation text-xs text-ink">&sect;</span>
            <div className="h-[1px] bg-ink flex-grow"></div>
          </div>
        </div>

        {/* Factual Rows 01 to 05 */}
        <div className="divide-y-2 divide-ink border-t-2 border-b-2 border-ink">
          {rows.map((row) => (
            <div
              key={row.num}
              className="why-row group py-5 px-3 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-paper transition-colors cursor-default"
            >
              <div className="flex items-baseline gap-6">
                <span className="font-complexity-notation text-complexity-notation text-brick font-bold">
                  {row.num}
                </span>
                <div>
                  <span className="font-headline-sm text-headline-sm text-ink font-semibold mr-3">
                    {row.title}
                  </span>
                  <span className="font-body-lg text-body-lg text-muted">
                    {row.desc}
                  </span>
                </div>
              </div>
              <div className="self-end md:self-center opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-ink">
                <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
