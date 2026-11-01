'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Arrow } from '@/components/ui/arrow'
import IntroGate from './intro-gate'
import styles from './identity-hero.module.css'

const SLIDES = [
  { src: '/photos/iota-lab201-crowd.jpg',        alt: 'Students at an IoTA lab event' },
  { src: '/photos/iota-robotics-chassis-presentation.jpg', alt: 'Robotics chassis presentation' },
  { src: '/photos/iota-lab201-group.jpg',        alt: 'FluxECS group session in Lab 201' },
  { src: '/photos/iota-tinkerers-lab-cohort.jpg', alt: "FluxECS cohort at Tinkerers' Lab" },
  { src: '/photos/iota-lab201-robot-demo.jpg',   alt: 'Robot demonstration in Lab 201' },
]

export interface HeroSlide {
  id?: string
  src: string
  alt: string
  title?: string
  caption?: string
  enabled?: boolean
}

export interface HeroContent {
  overlineDept?: string
  overlineSchool?: string
  headlineLine1?: string
  headlineLine2?: string
  lead?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export default function RacingHero({
  slides: initialSlides,
  content: initialContent,
  onLaunchArcade,
}: {
  slides?: HeroSlide[]
  content?: HeroContent
  onLaunchArcade?: () => void
}) {
  const root = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)

  const activeSlides = (initialSlides && initialSlides.length > 0)
    ? initialSlides.filter(s => s.enabled !== false)
    : SLIDES
  const slides = activeSlides.length > 0 ? activeSlides : SLIDES

  const heroContent = {
    overlineDept: initialContent?.overlineDept || 'Engineering Council',
    overlineSchool: initialContent?.overlineSchool || 'VESIT · Mumbai',
    headlineLine1: initialContent?.headlineLine1 || 'From circuits',
    headlineLine2: initialContent?.headlineLine2 || 'to code.',
    lead: initialContent?.lead || 'A council for the things we build. And the people who build them.',
    primaryCtaText: initialContent?.primaryCtaText || 'Explore events',
    primaryCtaLink: initialContent?.primaryCtaLink || '/events',
    secondaryCtaText: initialContent?.secondaryCtaText || 'Meet FluxECS',
    secondaryCtaLink: initialContent?.secondaryCtaLink || '/about',
  }

  // ── Slideshow ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 5500)
    return () => clearInterval(id)
  }, [slides.length])

  // ── GSAP reveal ───────────────────────────────────────────────────────────
  useEffect(() => {
    let active = true
    let cleanup = () => {}
    import('@/lib/gsap').then(({ gsap }) => {
      if (!active || !root.current) return
      const media = gsap.matchMedia()
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const reveal = () => {
          gsap.fromTo(
            root.current!.querySelectorAll('[data-headline]'),
            { yPercent: 105 },
            { yPercent: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true },
          )
        }
        const timer = setTimeout(() => {
          if (!document.querySelector('.intro-dialog[open]')) reveal()
        }, 100)
        window.addEventListener('flux:intro-complete', reveal)
        return () => {
          clearTimeout(timer)
          window.removeEventListener('flux:intro-complete', reveal)
        }
      }, root)
      cleanup = () => media.revert()
    }).catch(() => {})
    return () => { active = false; cleanup() }
  }, [])

  return (
    <section
      className={styles.hero}
      ref={root}
      aria-labelledby="hero-heading"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Slideshow background ─────────────────────────────────────────── */}
      <div className="fx-hero-slideshow">
        {slides.map((slide, i) => (
          <div key={slide.src + i} className={`fx-hero-slide${i === current ? ' is-active' : ''}`}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
        <div className="fx-hero-shade" />
      </div>

      {/* ── KineticGrid canvas overlay (lazy-loaded) ─────────────────────── */}
      <KineticCanvas />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="fx-container fx-hero-content">
        <div className={styles.overline}>
          <span className="fx-eyebrow">{heroContent.overlineDept}</span>
          <span>{heroContent.overlineSchool}</span>
        </div>
        <div className={styles.composition}>
          <div className={styles.copy}>
            <h1 id="hero-heading" className={styles.headline}>
              <span className={styles.lineMask}><span data-headline>{heroContent.headlineLine1}</span></span>
              <span className={styles.lineMask}>
                <span data-headline>
                  {heroContent.headlineLine2.startsWith('to ') ? (
                    <>to <span className={styles.outline}>{heroContent.headlineLine2.replace(/^to\s*/i, '')}</span></>
                  ) : (
                    heroContent.headlineLine2
                  )}
                </span>
              </span>
            </h1>
            <p className={styles.lead}>{heroContent.lead}</p>
            <div className="fx-actions">
              <Link className="fx-button" href={heroContent.primaryCtaLink}>{heroContent.primaryCtaText} <Arrow /></Link>
              <Link className="fx-link" href={heroContent.secondaryCtaLink}>{heroContent.secondaryCtaText} <Arrow /></Link>
              {onLaunchArcade && (
                <button
                  type="button"
                  onClick={onLaunchArcade}
                  className="fx-arcade-pill"
                  aria-label="Play Flux Grand Prix mini-game"
                >
                  <span className="fx-arcade-flag">🏁</span> Play Flux Grand Prix
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.heroBottom}>
          <IntroGate />
          {/* Slideshow dots */}
          <div className="fx-hero-dots" aria-label="Slideshow progress">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`fx-hero-dot${i === current ? ' is-active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
          <a href="#featured-event" aria-label="Discover our featured event">
            Discover <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// Lazy-loaded kinetic grid canvas — imported dynamically so it never blocks SSR
function KineticCanvas() {
  const [Comp, setComp] = useState<React.ComponentType<{ className?: string }> | null>(null)
  useEffect(() => {
    import('@/components/ui/kinetic-grid')
      .then(m => setComp(() => m.default as unknown as React.ComponentType<{ className?: string }>))
      .catch(() => {})
  }, [])
  if (!Comp) return null
  return (
    <div className="fx-kinetic-canvas" aria-hidden="true">
      {/* @ts-expect-error – dynamic import, globalColor prop typed inside component */}
      <Comp globalColor="monochrome" className="!bg-transparent" />
    </div>
  )
}
