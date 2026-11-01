'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import IntroBoundary from '@/components/ui/intro-boundary'
import LogoFull from '@/components/LogoFull'
import LogoConstruction from './logo-construction'
import { introMedia, introSettings } from '@/data/media'
import {
  playRadio,
  pauseRadio,
  subscribeRadio,
  isRadioPlaying,
} from '@/lib/radio-player'

const CinemaGrainPreloader = dynamic(
  () => import('@/components/ui/cinema-grain-preloader'),
  { ssr: false },
)
const SESSION_KEY = 'fluxecs-intro-seen-v3'

export default function IntroGate() {
  const dialog = useRef<HTMLDialogElement>(null)
  const replay = useRef<HTMLButtonElement>(null)
  const [active, setActive] = useState(false)
  const [stage, setStage] = useState<'cinema' | 'handoff' | 'logo'>('cinema')
  const [sound, setSound] = useState(false)
  const closing = useRef(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return subscribeRadio(isPlaying => {
      setSound(isPlaying)
    })
  }, [])

  const finish = useCallback(() => {
    if (closing.current) return
    closing.current = true
    const el = dialog.current
    if (!el) {
      setActive(false)
      return
    }
    el.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
    el.style.opacity = '0'
    el.style.transform = 'scale(0.98)'

    closeTimer.current = setTimeout(() => {
      el.close()
      el.style.opacity = '1'
      el.style.transform = 'none'
      setActive(false)
      // Note: If intro sound was ON, keep it playing seamlessly via PitRadio!
      // If it was OFF, it remains OFF.
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* Storage is optional. */
      }
      window.dispatchEvent(new Event('flux:intro-complete'))
    }, 450)
  }, [])

  const start = useCallback(() => {
    closing.current = false
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setStage('cinema')
    setActive(true)
    setSound(isRadioPlaying())
    if (dialog.current) {
      dialog.current.style.opacity = '1'
      dialog.current.style.transform = 'none'
      dialog.current.showModal()
    }
    window.dispatchEvent(new Event('flux:intro-start'))
  }, [])

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      /* Keep site accessible. */
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection
    // Storage, device preference and media eligibility are external browser state.
    const timer = window.setTimeout(() => {
      if (!seen && !reduce.matches && !connection?.saveData) start()
    }, 0)
    const change = () => {
      if (reduce.matches) finish()
    }
    reduce.addEventListener('change', change)
    return () => {
      clearTimeout(timer)
      if (closeTimer.current) clearTimeout(closeTimer.current)
      reduce.removeEventListener('change', change)
    }
  }, [start, finish])

  useEffect(() => {
    if (!active) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Independent safety timeout also works if the lazy component fails.
    const timer = setTimeout(finish, introSettings.safetyTimeoutMs)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = previous
    }
  }, [active, finish])

  const showLogo = useCallback(() => {
    // Keep sound playing through the logo construction
    setStage('handoff')
  }, [])

  const toggleSound = useCallback(async () => {
    if (sound) {
      pauseRadio()
      setSound(false)
    } else {
      const ok = await playRadio()
      setSound(ok)
    }
  }, [sound])
  return (
    <>
      <button
        ref={replay}
        className="replay-intro mono"
        type="button"
        onClick={start}
      >
        <span aria-hidden="true">↻</span> Replay intro
      </button>
      <dialog
        ref={dialog}
        className="intro-dialog"
        aria-label="Optional FluxECS cinematic intro"
        onCancel={e => { e.preventDefault(); finish() }}
        onClose={() => {
          if (active) finish()
        }}
      >
        {active && stage !== 'logo' && (
          <div className="intro-cinema-layer">
          <IntroBoundary>
            <CinemaGrainPreloader
              word="FLUX"
              loop={false}
              videoSrc={introMedia.src}
              poster={introMedia.poster}
              shaderPreset="cinema"
              speed={introSettings.speed}
              onExitStart={showLogo}
              onComplete={() => setStage('logo')}
            />
          </IntroBoundary>
          </div>
        )}
        {active && stage !== 'cinema' && <LogoConstruction onComplete={finish} />}
        <div className="intro-top" hidden={stage !== 'cinema'}>
          <span className="intro-official-logo">
            <LogoFull className="w-full h-full" />
          </span>
          <span className="mono">ELECTRONICS & COMPUTER SCIENCE</span>
        </div>
        <div className="intro-controls">
          <span className="mono">FROM CIRCUITS TO CODE / VESIT</span>
          <div>
            <button
              type="button"
              aria-pressed={sound}
              onClick={toggleSound}
              disabled={!introMedia.audioSrc}
            >
              {introMedia.audioSrc
                ? `Sound ${sound ? 'on' : 'off'}`
                : 'Sound off · silent intro'}
            </button>
            <button type="button" autoFocus onClick={finish}>
              Skip intro ↗
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
