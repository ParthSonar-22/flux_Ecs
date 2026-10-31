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
      desc: "Events are open to all ECS students. To join the council itself, you need to be in second year or above.",
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
          { opacity: 0.7 },
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
        {/* Simple section header — no fake labels */}
        <div className="mb-space-lg">
          <h2 className="font-headline-lg text-headline-lg text-ink font-bold">
            Why join the club
          </h2>
        </div>

        {/* Rows with thin dividers only */}
        <div className="border-t border-ink/30">
          {rows.map((row) => (
            <div
              key={row.num}
              className="why-row group py-5 px-1 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink/30 hover:bg-paper/40 transition-colors cursor-default"
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
