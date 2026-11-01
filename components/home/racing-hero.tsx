'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Arrow } from '@/components/ui/arrow'
import IntroGate from './intro-gate'
import KineticGrid from '@/components/ui/kinetic-grid'
import styles from './identity-hero.module.css'

export default function RacingHero() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  // Listen to global Pit Radio events to keep hero audio widget synchronized
  useEffect(() => {
    const handleRadioChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>
      if (customEvent?.detail?.isPlaying !== undefined) {
        setIsPlayingAudio(customEvent.detail.isPlaying)
      }
    }

    window.addEventListener('flux:radio-change', handleRadioChange)
    // Query initial state on mount
    window.dispatchEvent(new CustomEvent('flux:query-radio'))

    return () => {
      window.removeEventListener('flux:radio-change', handleRadioChange)
    }
  }, [])

  const toggleGlobalAudio = () => {
    window.dispatchEvent(new CustomEvent('flux:toggle-radio'))
  }

  // GSAP Kinetic Typography & Layout Entrance Timeline
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        gsap.set(`.${styles.lineInner}`, { y: '0%', opacity: 1, rotateZ: 0 })
        gsap.set(`.${styles.leadText}`, { opacity: 1, y: 0 })
        gsap.set(`.${styles.actions}`, { opacity: 1, y: 0 })
        gsap.set(`.${styles.toolbar}`, { opacity: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      })

      // 1. Kinetic headline staggered line mask reveal
      tl.fromTo(
        `.${styles.lineInner}`,
        { y: '120%', opacity: 0, rotateZ: 2.5 },
        {
          y: '0%',
          opacity: 1,
          rotateZ: 0,
          duration: 1.3,
          stagger: 0.16,
          ease: 'power4.out',
        }
      )

      // 2. Editorial lead paragraph reveal
      tl.fromTo(
        `.${styles.leadText}`,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        '-=0.85'
      )

      // 3. CTA Action buttons
      tl.fromTo(
        `.${styles.actions} > *`,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.7'
      )

      // 4. Toolbar footer
      tl.fromTo(
        `.${styles.toolbar}`,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
    },
    { scope: heroRef }
  )

  // Subtle Interactive Mouse Parallax using GSAP
  useEffect(() => {
    const hero = heroRef.current
    const header = headerRef.current
    if (!hero || !header) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const xNorm = (e.clientX - rect.left) / rect.width - 0.5
      const yNorm = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(header, {
        x: xNorm * 18,
        y: yNorm * 12,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(header, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section ref={heroRef} className={styles.hero} id="hero" aria-labelledby="hero-heading">
      {/* Interactive Kinetic Grid Background with subtle moody opacity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 transition-opacity duration-500">
        <KineticGrid
          globalColor="monochrome"
          className="w-full h-full !h-full !min-h-full !bg-transparent"
        />
      </div>

      <div className={styles.heroInner}>
        {/* ==============================================================
            HERO: GSAP KINETIC EDITORIAL TYPOGRAPHY
           ============================================================== */}
        <div ref={headerRef} className={styles.heroHeader}>
          <h1 id="hero-heading" className={styles.headline}>
            <div className={styles.lineMask}>
              <span className={styles.lineInner}>FROM CIRCUITS</span>
            </div>
            <div className={styles.lineMask}>
              <span className={`${styles.lineInner} ${styles.accentWord}`}>TO CODE.</span>
            </div>
          </h1>

          <p className={styles.leadText}>
            The official student branch council for Electronics &amp; Computer Science at VESIT.
            Engineered with motorsport precision: we build hardware, write competitive software,
            and run the engineering community in between.
          </p>

          <div className={styles.actions}>
            <a href="#featured-event" className={styles.primaryButton}>
              <span>Explore Events</span>
              <Arrow />
            </a>
            <Link href="/about" className={styles.secondaryLink}>
              <span>About FluxECS</span>
              <Arrow />
            </Link>
          </div>
        </div>

        {/* ==============================================================
            BOTTOM TOOLBAR WITH INTRO GATE & SYNCED RADIO TOGGLE
           ============================================================== */}
        <footer className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <IntroGate />

            {/* F1 Team Radio Audio Toggle Button (Synced with Global Radio) */}
            <button
              type="button"
              onClick={toggleGlobalAudio}
              className={`${styles.audioWidget} ${isPlayingAudio ? styles.audioActive : ''}`}
              aria-label={isPlayingAudio ? 'Turn radio off' : 'Turn radio on'}
              title="Toggle F1 Soundtrack"
            >
              <span className={styles.audioGlyph}>
                {isPlayingAudio ? (
                  <span className={styles.pauseBars}>
                    <span />
                    <span />
                  </span>
                ) : (
                  <span className={styles.playArrow}>▶</span>
                )}
              </span>

              <span className={styles.audioText}>
                {isPlayingAudio ? 'RADIO ON // LIVE' : 'TEAM RADIO'}
              </span>

              {isPlayingAudio && (
                <span className={styles.equalizerBars}>
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </button>
          </div>

          <span className={styles.councilLabel}>VESIT ECS COUNCIL · 2026</span>

          <a href="#featured-event" className={styles.scrollLink}>
            Scroll to explore ↓
          </a>
        </footer>
      </div>
    </section>
  )
}
